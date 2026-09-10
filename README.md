<div align="center">

<!-- You can replace this placeholder with a real banner image later -->
<img src="https://via.placeholder.com/1000x250/1E2A46/E8A33D?text=Mausam+AI+🌤️" alt="Mausam Banner" width="100%">

# Mausam AI 🌤️

**Smart India Hackathon Prototype**  
*Hyper-Local, Persona-Driven Weather Intelligence*

<p align="center">
  <img src="https://img.shields.io/badge/PWA-Ready-1E2A46?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA Ready">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS">
  <img src="https://img.shields.io/badge/API-Open_Meteo-2E7D6B?style=for-the-badge&logo=json&logoColor=white" alt="Open Meteo API">
  <img src="https://img.shields.io/badge/UI-Custom_CSS-C24A3B?style=for-the-badge&logo=css3&logoColor=white" alt="Custom CSS">
</p>

> Normal apps tell you the weather. **Mausam AI tells you what to do about it.**

</div>

---

## ⚡ The Vision

India's diverse workforce requires distinct environmental data. A corporate worker in Delhi and a farmer in Punjab shouldn't be looking at the same generic weather app. Mausam AI bypasses traditional passive meteorological data by employing **dynamic logic matrices** to reduce cognitive load—translating live weather conditions into proactive, actionable decisions.

---

## 👥 Persona-Driven Dashboards

| 🌾 For the Farmer (Kisan) | 🏢 For the Urban Commuter |
| :--- | :--- |
| **Spray Drift Index:** Wind velocity gauges to prevent pesticide chemical drift. | **Route Scanning:** Enter a start and end destination to scan the route for rain or fog. |
| **Rain Risk (24h):** Hyper-local precipitation probability for sowing windows. | **Transit Health:** Live Air Quality Index (AQI) and peak UV tracking. |
| **Crop Health Notice:** Humidity-driven early warnings for pest development. | **Commute Windows:** Safe transit time recommendations and flood alerts. |

---

## 🚀 Showstopper Features

### 🎙️ Vernacular Voice Assistant
Built for maximum digital inclusion. Using the native Web Speech API, Mausam AI reads complex field advisories out loud, ensuring accessibility for users with limited literacy or visual impairments.

### 🚨 "Waze-for-Weather" (Crowdsourcing)
Satellites can't see a flooded street. Mausam includes a Floating Action Button (FAB) for users to report hyper-local ground truth (e.g., Severe Waterlogging, Fallen Trees). This instantly injects **Red Alert banners** into the dashboards of local users.

### 🎨 Dynamic Atmospheric UI
The app interface reacts to the API. Using real-time WMO weather codes, the UI seamlessly shifts between **Day, Night, Cloudy, and Stormy** themes—complete with animated CSS rain droplets.

### 🌍 Global Geocoding with Strict Indian Filters
Integrated with a live autocomplete search powered by the Open-Meteo Geocoding API. To suit the SIH problem statement, search results are strictly filtered to Indian municipalities and districts via asynchronous JavaScript arrays.

---

## 🛠️ Architecture & Tech Stack

This project is built for speed, accessibility, and zero-dependency deployment.

*   **Frontend Ecosystem:** Vanilla HTML5, CSS3 (Custom Design System), JavaScript (ES6).
*   **Data Pipelines:** Open-Meteo Weather API & Open-Meteo Geocoding API.
*   **State Management:** LocalStorage API for persistent user authentication and UI state.
*   **Deployment:** Progressive Web App (PWA) compliant with fully configured `manifest.json` and `sw.js` (Service Worker) for offline fallback. Ready for immediate `.apk` wrapping via PWABuilder.

---

## ⚙️ How to Run Locally

Because this project relies entirely on client-side rendering and public APIs, there is no complex build pipeline, server configuration, or `npm install` required.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/mausam-ai.git](https://github.com/yourusername/mausam-ai.git)
