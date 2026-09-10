# Mausam AI 🌤️

**Smart India Hackathon Prototype**  
A persona-driven Progressive Web App (PWA) delivering actionable, hyper-local weather intelligence. 

Instead of presenting passive meteorological data, Mausam AI translates live weather conditions into proactive decisions tailored specifically for **Farmers** and **Urban Commuters** across India.

## 🚀 Core Features

*   **Persona-Based Intelligence:** Distinct dashboards reorder widgets based on user needs. Farmers receive crop-spraying wind drift and rain risk metrics, while commuters see live AQI and UV transit index data.
*   **Global Geocoding with India-Strict Filtering:** Integrates the Open-Meteo Geocoding API with a live autocomplete search, strictly filtered to surface Indian districts and municipalities.
*   **Dynamic Route Forecasting:** Commuters can input a start and destination city to scan for rain, fog, or hazardous conditions along their transit route.
*   **Community "Waze-for-Weather" Reporting:** Users can instantly report hyper-local issues (e.g., severe waterlogging, fallen trees), injecting real-time red alerts into local users' dashboards.
*   **Vernacular Voice Assistant:** Built-in Web Speech API integration reads AI-generated field advisories out loud, ensuring accessibility for users with limited literacy or visual impairments.
*   **Dynamic Weather Art:** The UI automatically shifts themes (Day, Night, Cloudy, Rain with animated CSS drops) by interpreting real-time WMO weather codes.

## 🛠️ Tech Stack

*   **Frontend:** Vanilla HTML5, CSS3 (Custom Design System), JavaScript (ES6)
*   **APIs:** Open-Meteo API (Live Weather & Precipitation), Open-Meteo Geocoding API (Location Search)
*   **Architecture:** Progressive Web App (PWA) compliant, offline-ready via Service Workers.

## ⚙️ Installation & Usage

Because this project relies entirely on client-side rendering and public APIs, there is no complex build pipeline or `npm install` required.

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/mausam-ai.git](https://github.com/yourusername/mausam-ai.git)
