// Destination & Attraction Dataset for YatraAI Smart Tourism System
window.DESTINATIONS_DATA = {
  jaipur: {
    id: "jaipur",
    name: "Jaipur, Rajasthan",
    tagline: "The Pink City — Royal Palaces, Forts & Vibrant Bazaars",
    image: "assets/jaipur.jpg",
    hubName: "MI Road / Jaipur City Center",
    dailyStay: { budget: 900, standard: 2200, comfort: 4000 },
    dailyMeals: { budget: 500, standard: 1100, comfort: 2000 },
    tip: "Carry your college student ID at Amber Fort, Jantar Mantar, and City Palace for discounted entry tickets.",
    places: [
      { id: 0, code: "HUB", name: "MI Road City Hub", x: 340, y: 210, category: "food", fee: 0, hours: 1.0, rating: 4.5, bestTime: "08:30 AM", tags: ["food", "shopping"], desc: "Central starting point famous for traditional lassi and breakfast cafes." },
      { id: 1, code: "HAWA", name: "Hawa Mahal", x: 460, y: 180, category: "heritage", fee: 50, hours: 1.5, rating: 4.8, bestTime: "09:00 AM", tags: ["heritage", "photography"], desc: "Iconic five-story pink sandstone Palace of Winds with 953 intricate windows." },
      { id: 2, code: "CITY", name: "City Palace", x: 420, y: 130, category: "heritage", fee: 300, hours: 2.0, rating: 4.7, bestTime: "10:30 AM", tags: ["heritage", "photography"], desc: "Grand royal residence featuring courtyards, museums, and Rajput architecture." },
      { id: 3, code: "JANT", name: "Jantar Mantar", x: 495, y: 135, category: "heritage", fee: 50, hours: 1.2, rating: 4.6, bestTime: "12:00 PM", tags: ["heritage"], desc: "UNESCO World Heritage astronomical observatory with the world's largest stone sundial." },
      { id: 4, code: "JAL", name: "Jal Mahal", x: 545, y: 80, category: "nature", fee: 20, hours: 1.0, rating: 4.6, bestTime: "04:30 PM", tags: ["nature", "photography"], desc: "Scenic Water Palace set in the middle of Man Sagar Lake surrounded by Aravalli hills." },
      { id: 5, code: "AMBR", name: "Amber Fort", x: 635, y: 45, category: "heritage", fee: 100, hours: 2.5, rating: 4.9, bestTime: "08:30 AM", tags: ["heritage", "adventure", "photography"], desc: "Majestic hilltop fort overlooking Maota Lake, famous for the Sheesh Mahal." },
      { id: 6, code: "NAHR", name: "Nahargarh Fort", x: 250, y: 70, category: "nature", fee: 50, hours: 2.0, rating: 4.8, bestTime: "05:15 PM", tags: ["nature", "heritage", "photography"], desc: "Hilltop fort along the Aravalli ridge offering panoramic sunset views over Jaipur." },
      { id: 7, code: "ALBT", name: "Albert Hall & Masala Chowk", x: 430, y: 275, category: "food", fee: 100, hours: 1.5, rating: 4.7, bestTime: "06:30 PM", tags: ["heritage", "food"], desc: "Stunning Indo-Saracenic museum right next to Jaipur's open-air local street food court." },
      { id: 8, code: "BAPU", name: "Bapu Bazaar", x: 350, y: 310, category: "shopping", fee: 300, hours: 2.0, rating: 4.5, bestTime: "07:00 PM", tags: ["shopping", "food"], desc: "Bustling market for Rajasthani block-print textiles, handicrafts, and mojari shoes." }
    ],
    roads: [
      { from: 0, to: 1, km: 3.2, mins: 14 },
      { from: 0, to: 2, km: 3.0, mins: 13 },
      { from: 0, to: 6, km: 6.5, mins: 22 },
      { from: 0, to: 7, km: 2.4, mins: 10 },
      { from: 0, to: 8, km: 2.1, mins: 9 },
      { from: 1, to: 2, km: 0.8, mins: 5 },
      { from: 1, to: 3, km: 0.6, mins: 4 },
      { from: 1, to: 4, km: 4.5, mins: 15 },
      { from: 1, to: 7, km: 2.2, mins: 10 },
      { from: 2, to: 3, km: 0.4, mins: 3 },
      { from: 2, to: 6, km: 5.2, mins: 18 },
      { from: 3, to: 4, km: 4.8, mins: 16 },
      { from: 4, to: 5, km: 4.2, mins: 12 },
      { from: 4, to: 6, km: 6.8, mins: 22 },
      { from: 5, to: 6, km: 9.5, mins: 28 },
      { from: 7, to: 8, km: 1.5, mins: 7 }
    ]
  },
  goa: {
    id: "goa",
    name: "Goa Coastal Circuit",
    tagline: "Golden Beaches, Portuguese Heritage & Water Sports",
    image: "assets/goa.jpg",
    hubName: "Panjim Fontainhas Quarter",
    dailyStay: { budget: 1100, standard: 2600, comfort: 4800 },
    dailyMeals: { budget: 600, standard: 1300, comfort: 2400 },
    tip: "Renting a scooter in Panjim is the most budget-friendly way to hop between North Goa beaches and forts.",
    places: [
      { id: 0, code: "PANJ", name: "Panjim & Fontainhas Hub", x: 330, y: 205, category: "heritage", fee: 0, hours: 1.5, rating: 4.7, bestTime: "09:00 AM", tags: ["heritage", "food", "photography"], desc: "Colorful Portuguese Latin Quarter with heritage bakeries and riverfront walks." },
      { id: 1, code: "AGUA", name: "Fort Aguada & Lighthouse", x: 205, y: 115, category: "heritage", fee: 50, hours: 1.5, rating: 4.8, bestTime: "04:30 PM", tags: ["heritage", "nature", "photography"], desc: "17th-century Portuguese fort overlooking the Arabian Sea and Sinquerim beach." },
      { id: 2, code: "BAGA", name: "Baga Beach Water Sports", x: 235, y: 65, category: "adventure", fee: 600, hours: 2.5, rating: 4.6, bestTime: "10:00 AM", tags: ["adventure", "food", "nature"], desc: "Lively beach hub for parasailing, jet-skiing, and coastal shacks." },
      { id: 3, code: "CHAP", name: "Chapora Fort & Vagator Cliff", x: 350, y: 45, category: "nature", fee: 0, hours: 1.5, rating: 4.8, bestTime: "05:15 PM", tags: ["nature", "photography"], desc: "Scenic red-laterite cliff fort famous for golden hour views over Vagator beach." },
      { id: 4, code: "ANJN", name: "Anjuna Flea Market & Cafes", x: 295, y: 90, category: "shopping", fee: 250, hours: 2.0, rating: 4.5, bestTime: "03:30 PM", tags: ["shopping", "food"], desc: "Vibrant coastal market known for handicrafts, souvenirs, and beach cafes." },
      { id: 5, code: "BOMJ", name: "Basilica of Bom Jesus", x: 475, y: 200, category: "heritage", fee: 0, hours: 1.5, rating: 4.8, bestTime: "11:00 AM", tags: ["heritage", "photography"], desc: "UNESCO World Heritage baroque church in historic Old Goa." },
      { id: 6, code: "SPIC", name: "Tropical Spice Plantation", x: 560, y: 250, category: "food", fee: 400, hours: 2.0, rating: 4.6, bestTime: "01:00 PM", tags: ["nature", "food"], desc: "Guided organic spice garden tour with a traditional Goan lunch." },
      { id: 7, code: "DUDH", name: "Dudhsagar Falls Trail", x: 645, y: 310, category: "adventure", fee: 800, hours: 3.5, rating: 4.9, bestTime: "08:30 AM", tags: ["nature", "adventure", "photography"], desc: "Spectacular four-tiered waterfall nestled inside Bhagwan Mahaveer Sanctuary." },
      { id: 8, code: "DONA", name: "Dona Paula Viewpoint", x: 255, y: 295, category: "nature", fee: 50, hours: 1.2, rating: 4.5, bestTime: "06:00 PM", tags: ["nature", "photography"], desc: "Breezy seafront promenade where the Mandovi and Zuari rivers meet the Arabian Sea." }
    ],
    roads: [
      { from: 0, to: 1, km: 14.5, mins: 28 },
      { from: 0, to: 2, km: 16.0, mins: 32 },
      { from: 0, to: 5, km: 10.2, mins: 20 },
      { from: 0, to: 8, km: 7.0, mins: 15 },
      { from: 1, to: 2, km: 4.8, mins: 12 },
      { from: 2, to: 4, km: 5.2, mins: 14 },
      { from: 3, to: 4, km: 4.0, mins: 10 },
      { from: 2, to: 3, km: 8.5, mins: 20 },
      { from: 0, to: 4, km: 18.5, mins: 36 },
      { from: 5, to: 6, km: 16.0, mins: 28 },
      { from: 6, to: 7, km: 32.0, mins: 55 },
      { from: 5, to: 8, km: 16.5, mins: 30 }
    ]
  },
  manali: {
    id: "manali",
    name: "Manali, Himachal Pradesh",
    tagline: "Snow Peaks, Cedar Forests & Alpine Adventure",
    image: "assets/manali.jpg",
    hubName: "Manali Mall Road Center",
    dailyStay: { budget: 850, standard: 2000, comfort: 3800 },
    dailyMeals: { budget: 450, standard: 1000, comfort: 1800 },
    tip: "Start early for Solang Valley and Atal Tunnel to enjoy clear mountain skies and smooth traffic.",
    places: [
      { id: 0, code: "MALL", name: "Mall Road Central Hub", x: 350, y: 240, category: "shopping", fee: 0, hours: 1.5, rating: 4.5, bestTime: "06:30 PM", tags: ["shopping", "food"], desc: "Lively mountain town center with woolen markets, Himachali siddu stalls, and cafes." },
      { id: 1, code: "HIDM", name: "Hidimba Devi Temple", x: 265, y: 195, category: "heritage", fee: 30, hours: 1.5, rating: 4.8, bestTime: "09:00 AM", tags: ["heritage", "nature", "photography"], desc: "16th-century wooden pagoda temple surrounded by towering cedar forests." },
      { id: 2, code: "OLDM", name: "Old Manali Cafe Trail", x: 220, y: 140, category: "food", fee: 300, hours: 2.0, rating: 4.7, bestTime: "01:30 PM", tags: ["food", "shopping"], desc: "Charming riverside village with apple orchards and cozy mountain cafes." },
      { id: 3, code: "VASH", name: "Vashisht Hot Springs", x: 425, y: 175, category: "nature", fee: 20, hours: 1.5, rating: 4.6, bestTime: "10:30 AM", tags: ["nature", "heritage"], desc: "Natural geothermal sulfur springs and historic stone temples overlooking Beas valley." },
      { id: 4, code: "JOGN", name: "Jogini Waterfall Trek", x: 470, y: 120, category: "adventure", fee: 0, hours: 2.5, rating: 4.8, bestTime: "11:00 AM", tags: ["nature", "adventure", "photography"], desc: "Scenic pine forest trek leading to a cascading 160-foot Himalayan waterfall." },
      { id: 5, code: "SOLG", name: "Solang Valley Adventure", x: 340, y: 85, category: "adventure", fee: 900, hours: 3.0, rating: 4.9, bestTime: "09:30 AM", tags: ["adventure", "nature", "photography"], desc: "Alpine meadow famous for paragliding, ropeway rides, and snow views." },
      { id: 6, code: "ATAL", name: "Atal Tunnel & Sissu Valley", x: 395, y: 35, category: "nature", fee: 200, hours: 3.0, rating: 4.9, bestTime: "10:00 AM", tags: ["nature", "adventure", "photography"], desc: "High-altitude highway tunnel opening into Lahaul's dramatic Sissu waterfall and peaks." },
      { id: 7, code: "NAGR", name: "Naggar Castle", x: 535, y: 305, category: "heritage", fee: 50, hours: 2.0, rating: 4.7, bestTime: "03:00 PM", tags: ["heritage", "photography"], desc: "Medieval stone-and-timber Himalayan castle overlooking the Kullu Valley." },
      { id: 8, code: "VANV", name: "Van Vihar Nature Park", x: 310, y: 295, category: "nature", fee: 30, hours: 1.2, rating: 4.5, bestTime: "04:30 PM", tags: ["nature"], desc: "Peaceful riverside park along the Beas River shaded by tall deodar trees." }
    ],
    roads: [
      { from: 0, to: 1, km: 2.5, mins: 10 },
      { from: 0, to: 3, km: 3.2, mins: 12 },
      { from: 0, to: 8, km: 0.8, mins: 4 },
      { from: 0, to: 7, km: 21.0, mins: 42 },
      { from: 1, to: 2, km: 1.8, mins: 8 },
      { from: 2, to: 3, km: 3.5, mins: 14 },
      { from: 2, to: 5, km: 11.5, mins: 26 },
      { from: 3, to: 4, km: 2.0, mins: 15 },
      { from: 3, to: 5, km: 10.5, mins: 24 },
      { from: 5, to: 6, km: 17.5, mins: 32 },
      { from: 7, to: 8, km: 20.2, mins: 40 }
    ]
  }
};

window.TRANSPORT_MODES = {
  bus: { label: "Public Bus / Shared Transit", ratePerKm: 4 },
  scooter: { label: "Rental Scooter / Bike", ratePerKm: 9 },
  cab: { label: "Private AC Cab", ratePerKm: 18 }
};
