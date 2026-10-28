// Main UI Controller for YatraAI Smart Tourism Website
(function () {
  const state = {
    activeSection: "planner",
    cityId: "jaipur",
    budget: 15000,
    days: 3,
    travelStyle: "budget",
    transportMode: "scooter",
    interests: new Set(["heritage", "nature", "food"]),
    excludedIds: new Set(),
    selectedDayFilter: "all",
    currentPlan: null
  };

  function updatePlannerUI() {
    const plan = window.SmartPlannerEngine.generatePlan(state);
    state.currentPlan = plan;

    // Update Summary Metrics
    document.getElementById("stat-total-cost").textContent = "₹" + plan.totalEstimatedCost.toLocaleString("en-IN");
    const budgetBadge = document.getElementById("stat-budget-note");
    if (plan.totalEstimatedCost <= state.budget) {
      const saved = state.budget - plan.totalEstimatedCost;
      budgetBadge.textContent = "✓ Within budget (₹" + saved.toLocaleString("en-IN") + " left)";
      budgetBadge.className = "text-xs font-medium text-emerald-600 mt-1";
    } else {
      const over = plan.totalEstimatedCost - state.budget;
      budgetBadge.textContent = "⚠ ₹" + over.toLocaleString("en-IN") + " over target budget";
      budgetBadge.className = "text-xs font-medium text-amber-600 mt-1";
    }

    document.getElementById("stat-total-km").textContent = plan.totalKm + " km";
    document.getElementById("stat-places-count").textContent = plan.selectedCount + " Places";
    document.getElementById("stat-match-score").textContent = plan.avgMatch + "% Match";
    document.getElementById("city-travel-tip").textContent = plan.city.tip;

    // Render Budget Breakdown Bars
    const breakdownItems = [
      { label: "Stay & Hotels", amount: plan.stayCost, color: "bg-sky-500" },
      { label: "Food & Local Dining", amount: plan.foodCost, color: "bg-indigo-500" },
      { label: "Local Transport (" + plan.totalKm + " km)", amount: plan.transportCost, color: "bg-emerald-500" },
      { label: "Entry Tickets & Activities", amount: plan.totalTickets, color: "bg-amber-500" }
    ];

    const breakdownHTML = breakdownItems.map((item) => {
      const pct = Math.min(100, Math.round((item.amount / Math.max(1, plan.totalEstimatedCost)) * 100));
      return (
        '<div>' +
          '<div class="flex justify-between text-xs font-medium text-slate-700 mb-1">' +
            '<span>' + item.label + '</span>' +
            '<span>₹' + item.amount.toLocaleString("en-IN") + ' (' + pct + '%)</span>' +
          '</div>' +
          '<div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">' +
            '<div class="' + item.color + ' h-full rounded-full" style="width:' + pct + '%"></div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
    document.getElementById("budget-bars-container").innerHTML = breakdownHTML;

    // Render Day Filter Buttons
    const dayFilterContainer = document.getElementById("day-filter-tabs");
    let dayBtns = '<button type="button" data-day="all" class="day-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ' +
      (state.selectedDayFilter === "all" ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200") +
      '">All Days (' + plan.days + ')</button>';

    plan.itineraryDays.forEach((d) => {
      const isSelected = String(state.selectedDayFilter) === String(d.day);
      dayBtns += '<button type="button" data-day="' + d.day + '" class="day-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ' +
        (isSelected ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200") +
        '">Day ' + d.day + ' (' + d.dayKm + ' km)</button>';
    });
    dayFilterContainer.innerHTML = dayBtns;

    // Render Day-by-Day Itinerary Cards
    const visibleDays = state.selectedDayFilter === "all"
      ? plan.itineraryDays
      : plan.itineraryDays.filter((d) => String(d.day) === String(state.selectedDayFilter));

    const timelineContainer = document.getElementById("itinerary-list");
    timelineContainer.innerHTML = visibleDays.map((d) => {
      const stopsHTML = d.stops.map((s, idx) => {
        return (
          '<div class="relative pl-6 pb-4 border-l-2 border-sky-200 last:pb-0">' +
            '<div class="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-sky-600"></div>' +
            '<div class="text-[11px] font-medium text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-md inline-block mb-2">' +
              '🚗 Optimal Route: ' + s.routeSummary + ' • ' + s.legKm + ' km (' + s.legMins + ' mins, ₹' + s.legCost + ')' +
            '</div>' +
            '<div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">' +
              '<div>' +
                '<div class="flex flex-wrap items-center gap-2">' +
                  '<span class="text-xs font-bold text-sky-600">' + s.arrivalTime + ' – ' + s.departureTime + '</span>' +
                  '<h4 class="text-sm font-bold text-slate-900">' + (idx + 1) + '. ' + s.place.name + '</h4>' +
                  '<span class="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">' + s.place.matchScore + '% Match</span>' +
                '</div>' +
                '<p class="text-xs text-slate-600 mt-1">' + s.place.desc + '</p>' +
                '<div class="flex flex-wrap gap-3 text-[11px] text-slate-500 mt-1.5">' +
                  '<span>⭐ ' + s.place.rating + '</span>' +
                  '<span>🎟️ Entry: ₹' + s.place.fee + '</span>' +
                  '<span>⏰ Best Time: ' + s.place.bestTime + '</span>' +
                '</div>' +
              '</div>' +
              '<button type="button" data-remove-id="' + s.place.id + '" class="remove-stop-btn text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-lg font-medium shrink-0 self-start sm:self-center">' +
                'Skip Place' +
              '</button>' +
            '</div>' +
          '</div>'
        );
      }).join("");

      return (
        '<div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">' +
          '<div class="flex items-center justify-between border-b border-slate-200 pb-2">' +
            '<div class="flex items-center gap-2">' +
              '<span class="px-2.5 py-1 rounded-md bg-sky-600 text-white text-xs font-bold">Day ' + d.day + '</span>' +
              '<span class="text-xs text-slate-600 font-medium">Starts from ' + plan.city.hubName + '</span>' +
            '</div>' +
            '<span class="text-xs font-semibold text-slate-700">Total Travel: ' + d.dayKm + ' km</span>' +
          '</div>' +
          '<div class="pt-1 space-y-3">' +
            (stopsHTML || '<p class="text-xs text-slate-500">No stops scheduled for this day.</p>') +
          '</div>' +
        '</div>'
      );
    }).join("");

    drawRouteMap(plan);
  }

  function drawRouteMap(plan) {
    const canvas = document.getElementById("routeMapCanvas");
    const container = document.getElementById("route-map-wrapper");
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    const scaleX = w / 740;
    const scaleY = h / 360;
    const city = plan.city;

    const activeEdgeKeys = new Set();
    plan.routeEdges.forEach((e) => {
      if (state.selectedDayFilter === "all" || String(e.day) === String(state.selectedDayFilter)) {
        activeEdgeKeys.add(Math.min(e.from, e.to) + "-" + Math.max(e.from, e.to));
      }
    });

    // Draw city roads
    city.roads.forEach((r) => {
      const p1 = city.places[r.from];
      const p2 = city.places[r.to];
      const x1 = p1.x * scaleX, y1 = p1.y * scaleY;
      const x2 = p2.x * scaleX, y2 = p2.y * scaleY;
      const key = Math.min(r.from, r.to) + "-" + Math.max(r.from, r.to);
      const isHighlighted = activeEdgeKeys.has(key);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isHighlighted ? "#0284c7" : "#cbd5e1";
      ctx.lineWidth = isHighlighted ? 3.5 : 1.5;
      ctx.stroke();

      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      ctx.font = "600 10px Inter, sans-serif";
      const label = r.km + " km";
      const tw = ctx.measureText(label).width + 8;
      ctx.fillStyle = isHighlighted ? "#0284c7" : "#f1f5f9";
      ctx.fillRect(mx - tw / 2, my - 7, tw, 14);
      ctx.fillStyle = isHighlighted ? "#ffffff" : "#64748b";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, mx, my);
    });

    // Draw attraction pins
    city.places.forEach((p) => {
      const x = p.x * scaleX;
      const y = p.y * scaleY;
      const isHub = p.id === 0;
      const isSkipped = state.excludedIds.has(p.id);

      ctx.beginPath();
      ctx.arc(x, y, 13, 0, Math.PI * 2);
      ctx.fillStyle = isHub ? "#10b981" : isSkipped ? "#94a3b8" : "#0284c7";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      ctx.fillStyle = "#0f172a";
      ctx.font = "600 11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(p.name.split(" ")[0], x, y + 22);
    });

    ctx.restore();
  }

  function renderPlacesDirectory() {
    const city = window.DESTINATIONS_DATA[state.cityId];
    const searchVal = (document.getElementById("place-search-input").value || "").toLowerCase().trim();
    const catVal = document.getElementById("place-category-select").value;

    const filtered = city.places.filter((p) => {
      const matchText = !searchVal || p.name.toLowerCase().includes(searchVal) || p.desc.toLowerCase().includes(searchVal);
      const matchCat = catVal === "all" || p.category === catVal || p.tags.includes(catVal);
      return matchText && matchCat;
    });

    const grid = document.getElementById("places-directory-grid");
    grid.innerHTML = filtered.map((p) => {
      const isExcluded = state.excludedIds.has(p.id);
      return (
        '<div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3">' +
          '<div>' +
            '<div class="flex items-center justify-between gap-2 mb-1">' +
              '<span class="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full">' + p.category + '</span>' +
              '<span class="text-xs font-semibold text-amber-600">⭐ ' + p.rating + '</span>' +
            '</div>' +
            '<h3 class="text-base font-bold text-slate-900">' + p.name + '</h3>' +
            '<p class="text-xs text-slate-600 mt-1 leading-relaxed">' + p.desc + '</p>' +
          '</div>' +
          '<div class="pt-3 border-t border-slate-100 space-y-3">' +
            '<div class="flex justify-between text-xs text-slate-500">' +
              '<span>🎟️ Entry Fee: <strong class="text-slate-800">₹' + p.fee + '</strong></span>' +
              '<span>⏰ Best Time: <strong class="text-slate-800">' + p.bestTime + '</strong></span>' +
            '</div>' +
            (p.id === 0
              ? '<div class="text-center py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold">📍 Starting City Hub</div>'
              : '<button type="button" data-toggle-place="' + p.id + '" class="toggle-place-btn w-full py-2 rounded-xl text-xs font-semibold transition-all ' +
                (isExcluded ? "bg-sky-600 text-white hover:bg-sky-500" : "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600") + '">' +
                (isExcluded ? "+ Add to My Trip" : "✓ Included in Trip (Click to Remove)") +
              '</button>') +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  function switchSection(sectionId) {
    state.activeSection = sectionId;
    ["planner", "explore", "about"].forEach((id) => {
      const sec = document.getElementById("section-" + id);
      const btn = document.getElementById("nav-btn-" + id);
      if (id === sectionId) {
        sec.classList.remove("hidden");
        btn.classList.add("active-nav");
      } else {
        sec.classList.add("hidden");
        btn.classList.remove("active-nav");
      }
    });
    if (sectionId === "planner") updatePlannerUI();
    if (sectionId === "explore") renderPlacesDirectory();
  }

  function selectCity(cityId) {
    state.cityId = cityId;
    state.excludedIds.clear();
    state.selectedDayFilter = "all";
    document.getElementById("top-city-select").value = cityId;

    document.querySelectorAll(".city-card").forEach((card) => {
      if (card.dataset.city === cityId) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }
    });

    updatePlannerUI();
    if (state.activeSection === "explore") renderPlacesDirectory();
  }

  window.addEventListener("DOMContentLoaded", function () {
    // Navigation buttons
    document.querySelectorAll(".nav-section-btn").forEach((btn) => {
      btn.addEventListener("click", () => switchSection(btn.dataset.section));
    });

    // City selectors
    document.getElementById("top-city-select").addEventListener("change", (e) => selectCity(e.target.value));
    document.querySelectorAll(".city-card").forEach((card) => {
      card.addEventListener("click", () => selectCity(card.dataset.city));
    });

    // Budget slider
    const budgetInput = document.getElementById("budget-slider");
    budgetInput.addEventListener("input", (e) => {
      state.budget = Number(e.target.value);
      document.getElementById("budget-label").textContent = "₹" + state.budget.toLocaleString("en-IN");
      updatePlannerUI();
    });

    // Trip Days, Style, Transport
    document.getElementById("select-days").addEventListener("change", (e) => {
      state.days = Number(e.target.value);
      state.selectedDayFilter = "all";
      updatePlannerUI();
    });

    document.getElementById("select-style").addEventListener("change", (e) => {
      state.travelStyle = e.target.value;
      updatePlannerUI();
    });

    document.getElementById("select-transport").addEventListener("change", (e) => {
      state.transportMode = e.target.value;
      updatePlannerUI();
    });

    // Interest tags
    document.getElementById("interests-wrapper").addEventListener("click", (e) => {
      const btn = e.target.closest(".interest-tag");
      if (!btn) return;
      const tag = btn.dataset.tag;
      if (state.interests.has(tag)) {
        if (state.interests.size > 1) {
          state.interests.delete(tag);
          btn.classList.remove("selected");
        }
      } else {
        state.interests.add(tag);
        btn.classList.add("selected");
      }
      updatePlannerUI();
    });

    document.getElementById("btn-recalculate").addEventListener("click", updatePlannerUI);
    document.getElementById("btn-reset-all").addEventListener("click", () => {
      state.excludedIds.clear();
      state.budget = 15000;
      state.days = 3;
      state.travelStyle = "budget";
      state.transportMode = "scooter";
      document.getElementById("budget-slider").value = "15000";
      document.getElementById("budget-label").textContent = "₹15,000";
      document.getElementById("select-days").value = "3";
      document.getElementById("select-style").value = "budget";
      document.getElementById("select-transport").value = "scooter";
      updatePlannerUI();
    });

    // Day filter clicks
    document.getElementById("day-filter-tabs").addEventListener("click", (e) => {
      const btn = e.target.closest(".day-tab-btn");
      if (!btn) return;
      state.selectedDayFilter = btn.dataset.day;
      updatePlannerUI();
    });

    // Remove stop from timeline
    document.getElementById("itinerary-list").addEventListener("click", (e) => {
      const btn = e.target.closest(".remove-stop-btn");
      if (!btn) return;
      state.excludedIds.add(Number(btn.dataset.removeId));
      updatePlannerUI();
    });

    // Explore directory search & filter
    document.getElementById("place-search-input").addEventListener("input", renderPlacesDirectory);
    document.getElementById("place-category-select").addEventListener("change", renderPlacesDirectory);
    document.getElementById("places-directory-grid").addEventListener("click", (e) => {
      const btn = e.target.closest(".toggle-place-btn");
      if (!btn) return;
      const pid = Number(btn.dataset.togglePlace);
      if (state.excludedIds.has(pid)) {
        state.excludedIds.delete(pid);
      } else {
        state.excludedIds.add(pid);
      }
      updatePlannerUI();
      renderPlacesDirectory();
    });

    // Export Itinerary Modal
    document.getElementById("btn-open-export").addEventListener("click", () => {
      const p = state.currentPlan;
      if (!p) return;
      const lines = [
        "YatraAI — Personalized Trip Itinerary",
        "=====================================",
        "Destination : " + p.city.name,
        "Duration    : " + p.days + " Days",
        "Total Cost  : ₹" + p.totalEstimatedCost.toLocaleString("en-IN") + " (Budget: ₹" + p.budget.toLocaleString("en-IN") + ")",
        "Total Route : " + p.totalKm + " km"
      ];
      p.itineraryDays.forEach((d) => {
        lines.push("\nDay " + d.day + " (" + d.dayKm + " km):");
        d.stops.forEach((s, idx) => {
          lines.push("  " + (idx + 1) + ". [" + s.arrivalTime + " - " + s.departureTime + "] " + s.place.name + " (Entry: ₹" + s.place.fee + ")");
          lines.push("     Route: " + s.routeSummary + " (" + s.legKm + " km, " + s.legMins + " mins)");
        });
      });
      document.getElementById("export-summary-text").textContent = lines.join("\n");
      document.getElementById("export-modal").classList.remove("hidden");
    });

    document.getElementById("btn-close-export").addEventListener("click", () => {
      document.getElementById("export-modal").classList.add("hidden");
    });

    document.getElementById("btn-copy-itinerary").addEventListener("click", () => {
      const text = document.getElementById("export-summary-text").textContent;
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      const msg = document.getElementById("copy-status-msg");
      msg.classList.remove("opacity-0");
      setTimeout(() => msg.classList.add("opacity-0"), 2000);
    });

    window.addEventListener("resize", () => {
      if (state.currentPlan && state.activeSection === "planner") {
        drawRouteMap(state.currentPlan);
      }
    });

    updatePlannerUI();
  });
})();
