# YatraAI — AI-Based Smart Tourism Information System

A clean, user-friendly, and scalable **Smart Tourism Information System** web application built for a college engineering project. Tourists can generate personalized day-by-day trip itineraries based on their specific interests, duration, and budget, complete with shortest-route sequencing and live cost breakdowns.

## ✨ Key Features

- **Personalized AI Trip Planner**: Recommends top tourist attractions in **Jaipur**, **Goa**, and **Manali** tailored to the traveler's interests (*Heritage, Nature, Adventure, Food, Shopping, Photography*).
- **Smart Budget Breakdown**: Automatically estimates accommodation, food, local transit, and entry ticket costs and checks if the plan fits within the user's target budget.
- **Optimal Route Sequencing**: Uses graph shortest-path routing (`js/routeOptimizer.js`) behind the scenes to order daily stops along the shortest travel path, minimizing travel distance and transit fare.
- **Interactive Route Map**: Visualizes city attractions and highlights the optimal daily route on an interactive HTML5 canvas map.
- **Explore & Customize**: Search and filter attractions by category and add or skip stops with instant itinerary recalculation.
- **Save & Share**: Copy a clean text summary of the generated itinerary with a single click.

## 📁 Project Folder Structure

```text
yatra-ai-smart-tourism/
├── index.html              # Main responsive web application entry point
├── css/
│   └── style.css           # Custom styling and interactive states
├── js/
│   ├── destinations.js     # Multi-city tourist attractions & road network data
│   ├── routeOptimizer.js   # Interest scoring & shortest-route itinerary engine
│   └── app.js              # UI controller, map renderer, and event listeners
├── assets/
│   ├── hero.jpg            # Hero banner image
│   ├── jaipur.jpg          # Jaipur destination thumbnail
│   ├── goa.jpg             # Goa destination thumbnail
│   └── manali.jpg          # Manali destination thumbnail
├── .gitignore
└── README.md
```

## 🚀 How to Run Locally or Host on GitHub Pages

1. **Run Locally**:
   - Clone or download this repository.
   - Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox, Safari) or use the **VS Code Live Server** extension.
2. **Deploy on GitHub Pages**:
   - Upload all files in this folder to a new GitHub repository.
   - Go to **Settings → Pages**, select the `main` branch (`/` root), and click **Save**.
   - Your website will be live at `https://<your-username>.github.io/<repo-name>/`.
