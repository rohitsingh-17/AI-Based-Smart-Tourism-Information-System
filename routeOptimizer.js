// Smart Route & Personalized Itinerary Engine
// Uses shortest-path graph routing (Dijkstra) behind the scenes to order daily stops efficiently.

window.SmartPlannerEngine = {
  buildGraph: function (city) {
    const adj = {};
    city.places.forEach((p) => {
      adj[p.id] = [];
    });
    city.roads.forEach((r) => {
      adj[r.from].push({ to: r.to, km: r.km, mins: r.mins });
      adj[r.to].push({ to: r.from, km: r.km, mins: r.mins });
    });
    return adj;
  },

  findShortestLeg: function (city, startId, endId) {
    const adj = this.buildGraph(city);
    const dist = {};
    const mins = {};
    const prev = {};
    const visited = {};

    city.places.forEach((p) => {
      dist[p.id] = Infinity;
      mins[p.id] = 0;
      prev[p.id] = null;
    });
    dist[startId] = 0;

    const queue = [{ id: startId, d: 0 }];
    while (queue.length > 0) {
      queue.sort((a, b) => a.d - b.d);
      const curr = queue.shift();
      if (visited[curr.id]) continue;
      visited[curr.id] = true;
      if (curr.id === endId) break;

      (adj[curr.id] || []).forEach((edge) => {
        if (!visited[edge.to]) {
          const newDist = +(dist[curr.id] + edge.km).toFixed(1);
          if (newDist < dist[edge.to]) {
            dist[edge.to] = newDist;
            mins[edge.to] = mins[curr.id] + edge.mins;
            prev[edge.to] = curr.id;
            queue.push({ id: edge.to, d: newDist });
          }
        }
      });
    }

    const pathIds = [];
    let u = endId;
    if (dist[u] < Infinity) {
      while (u !== null) {
        pathIds.unshift(u);
        u = prev[u];
      }
    }

    return {
      pathIds: pathIds,
      km: dist[endId] < Infinity ? dist[endId] : 0,
      mins: mins[endId] || 15
    };
  },

  scoreAttraction: function (place, selectedInterests) {
    if (place.id === 0) return 100;
    let matches = 0;
    place.tags.forEach((tag) => {
      if (selectedInterests.has(tag)) matches += 1;
    });
    if (selectedInterests.has(place.category)) matches += 1;
    return Math.min(99, Math.round(62 + matches * 14 + (place.rating - 4.5) * 20));
  },

  formatClock: function (totalMinutes) {
    const h24 = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    const ampm = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return (h12 < 10 ? "0" + h12 : h12) + ":" + (m < 10 ? "0" + m : m) + " " + ampm;
  },

  generatePlan: function (options) {
    const city = window.DESTINATIONS_DATA[options.cityId];
    const days = options.days;
    const budget = options.budget;
    const style = options.travelStyle;
    const transport = window.TRANSPORT_MODES[options.transportMode];

    const stayCost = city.dailyStay[style] * days;
    const foodCost = city.dailyMeals[style] * days;
    const bufferCost = Math.round(budget * 0.05);
    const availableForActivities = Math.max(400, budget - stayCost - foodCost - bufferCost);

    const candidates = city.places
      .filter((p) => p.id !== 0 && !options.excludedIds.has(p.id))
      .map((p) => ({
        ...p,
        matchScore: this.scoreAttraction(p, options.interests)
      }))
      .sort((a, b) => b.matchScore - a.matchScore);

    const maxAttractions = Math.min(candidates.length, days * 3);
    const picked = [];
    let runningActivityCost = 0;

    for (let i = 0; i < candidates.length && picked.length < maxAttractions; i++) {
      const item = candidates[i];
      if (runningActivityCost + item.fee <= availableForActivities || picked.length < days * 2) {
        picked.push(item);
        runningActivityCost += item.fee;
      }
    }

    const dayGroups = Array.from({ length: days }, () => []);
    picked.forEach((place, index) => {
      dayGroups[index % days].push(place);
    });

    let totalKm = 0;
    let totalTickets = 0;
    const routeEdges = [];
    const itineraryDays = [];

    dayGroups.forEach((group, dayIndex) => {
      const remaining = new Set(group.map((p) => p.id));
      let currentId = 0; // Start each day from city hub
      let clockMins = 9 * 60; // 9:00 AM
      let dayKm = 0;
      const stops = [];

      while (remaining.size > 0) {
        let nearestId = null;
        let bestLeg = null;

        remaining.forEach((targetId) => {
          const leg = this.findShortestLeg(city, currentId, targetId);
          if (!bestLeg || leg.km < bestLeg.km) {
            bestLeg = leg;
            nearestId = targetId;
          }
        });

        if (nearestId === null) break;
        remaining.delete(nearestId);

        const placeObj = group.find((p) => p.id === nearestId);
        clockMins += bestLeg.mins;
        const arrivalTime = this.formatClock(clockMins);
        clockMins += Math.round(placeObj.hours * 60);
        const departureTime = this.formatClock(clockMins);

        dayKm = +(dayKm + bestLeg.km).toFixed(1);
        totalTickets += placeObj.fee;

        for (let k = 0; k < bestLeg.pathIds.length - 1; k++) {
          routeEdges.push({ from: bestLeg.pathIds[k], to: bestLeg.pathIds[k + 1], day: dayIndex + 1 });
        }

        const routeNames = bestLeg.pathIds.map((pid) => city.places[pid].name.split(" ")[0]).join(" → ");
        stops.push({
          place: placeObj,
          routeSummary: routeNames,
          legKm: bestLeg.km,
          legMins: bestLeg.mins,
          legCost: Math.round(bestLeg.km * transport.ratePerKm),
          arrivalTime: arrivalTime,
          departureTime: departureTime
        });

        currentId = nearestId;
      }

      totalKm = +(totalKm + dayKm).toFixed(1);
      itineraryDays.push({
        day: dayIndex + 1,
        dayKm: dayKm,
        stops: stops
      });
    });

    const transportCost = Math.round(totalKm * transport.ratePerKm);
    const totalEstimatedCost = stayCost + foodCost + transportCost + totalTickets;
    const avgMatch = picked.length
      ? Math.round(picked.reduce((sum, p) => sum + p.matchScore, 0) / picked.length)
      : 90;

    return {
      city: city,
      days: days,
      budget: budget,
      totalEstimatedCost: totalEstimatedCost,
      stayCost: stayCost,
      foodCost: foodCost,
      transportCost: transportCost,
      totalTickets: totalTickets,
      totalKm: totalKm,
      selectedCount: picked.length,
      avgMatch: avgMatch,
      itineraryDays: itineraryDays,
      routeEdges: routeEdges
    };
  }
};
