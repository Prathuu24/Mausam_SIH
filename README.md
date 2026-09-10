# Mausam AI 🌤️

> **Smart India Hackathon 2026 Prototype**

A persona-driven Progressive Web App (PWA) delivering **actionable, hyper-local weather intelligence** for India.

Instead of presenting passive meteorological data, **Mausam AI** translates live weather conditions into proactive decisions tailored specifically for **Farmers** and **Urban Commuters**.

---

## 🚀 Why Mausam AI?

Weather apps usually tell users **what the weather is**.

Mausam AI focuses on **what the user should do about it**.

For example:

* 🌾 **Farmer:** *"Rain probability is high and wind conditions may affect spraying. Consider postponing pesticide application."*
* 🚗 **Commuter:** *"Heavy rain is expected along your route. Allow additional travel time and watch for waterlogging."*

The goal is to convert raw weather data into **simple, contextual and actionable intelligence**.

---

## ✨ Core Features

### 👤 Persona-Based Intelligence

Mausam AI provides different experiences depending on the user's needs.

#### 🌾 Farmer Dashboard

* Rain probability and precipitation risk
* Wind conditions for crop spraying
* Wind drift awareness
* Weather-based field advisories
* Voice-read advisories for accessibility

#### 🚗 Urban Commuter Dashboard

* Live weather conditions
* AQI information
* UV transit index
* Route-based weather forecasting
* Alerts for potentially hazardous conditions

---

### 📍 India-Strict Location Search

Mausam AI uses the **Open-Meteo Geocoding API** to provide live location search.

The autocomplete system:

* Searches locations dynamically
* Filters results to India
* Surfaces Indian districts and municipalities
* Makes selecting a precise location easier

---

### 🛣️ Dynamic Route Forecasting

Commuters can enter:

**Start → Destination**

Mausam AI analyzes weather conditions along the journey and highlights potential problems such as:

* 🌧️ Rain
* 🌫️ Fog
* ⚠️ Hazardous weather
* 🌊 Potential waterlogging conditions

This turns a normal weather forecast into a **route-aware travel forecast**.

---

### 🚨 Community Weather Reports

Mausam AI introduces a community-driven **"Waze-for-Weather"** concept.

Users can report hyper-local problems such as:

* 🌊 Severe waterlogging
* 🌳 Fallen trees
* 🚧 Weather-related road problems
* ⚠️ Other local hazards

Reports can appear as **red alerts** for users in the affected area.

---

### 🔊 Vernacular Voice Assistant

Weather advisories can be read aloud using the browser's **Web Speech API**.

This improves accessibility for:

* Users with limited literacy
* Users who prefer listening over reading
* Visually impaired users
* Users who prefer regional-language interaction

---

### 🎨 Dynamic Weather Interface

The interface responds to real-time weather conditions.

Themes dynamically adapt according to:

* ☀️ Day
* 🌙 Night
* ☁️ Cloudy conditions
* 🌧️ Rain

Rain conditions can also trigger animated CSS effects to make the weather state immediately recognizable.

Weather conditions are interpreted using **WMO weather codes**.

---

## 🧠 How It Works

```text
                    ┌──────────────────┐
                    │     User         │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │  Select Persona     │
                  │ Farmer / Commuter   │
                  └─────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  Location Search     │
                 │ Open-Meteo Geocoding │
                 └──────────┬───────────┘
                            │
                            ▼
                  ┌─────────────────────┐
                  │   Weather Data      │
                  │    Open-Meteo       │
                  └─────────┬───────────┘
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
      ┌───────────────┐           ┌────────────────┐
      │ Farmer        │           │ Urban Commuter │
      │ Intelligence  │           │ Intelligence   │
      └───────┬───────┘           └───────┬────────┘
              │                           │
              └──────────────┬────────────┘
                             ▼
                   ┌──────────────────┐
                   │ Actionable       │
                   │ Weather Advice   │
                   └──────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript (ES6)**

### APIs

* **Open-Meteo Weather API** — Live weather and precipitation data
* **Open-Meteo Geocoding API** — Location search and coordinates

### Architecture

* **Progressive Web App (PWA)**
* Service Worker
* Offline-ready architecture
* Client-side rendering

---

## 🌐 APIs Used

### Open-Meteo

Mausam AI uses Open-Meteo for weather and geocoding data.

No complex backend or API-key setup is required for the prototype.

---

## ⚙️ Installation & Usage

Mausam AI is designed to run directly in the browser and does not require a traditional build pipeline.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mausam-ai.git
cd mausam-ai
```

### 2. Run the project

Because the application uses a Service Worker and PWA functionality, it is recommended to serve the project through a local HTTP server rather than opening `index.html` directly.

For example, using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### 3. Use Mausam AI

1. Select your persona.
2. Search for an Indian location.
3. View the weather intelligence dashboard.
4. Check relevant alerts and advisories.
5. Commuters can enter a route to view weather conditions along the journey.
6. Users can submit community weather reports.
7. Use the voice assistant to hear advisories.

---

## 📱 Progressive Web App

Mausam AI is built as a **PWA**, allowing it to provide an app-like experience through a browser.

The architecture includes:

* Service Worker support
* Offline-ready functionality
* Responsive interface
* Mobile-friendly design
* Installable web-app architecture

---

## 🎯 Target Users

| Persona               | Key Problems Addressed                         |
| --------------------- | ---------------------------------------------- |
| 🌾 Farmers            | Rain risk, wind conditions, spraying decisions |
| 🚗 Urban Commuters    | Route weather, rain, fog, AQI and UV           |
| 🏘️ Local Communities | Hyper-local weather-related incidents          |
| ♿ Accessibility Users | Voice-based weather advisories                 |

---

## 🇮🇳 Designed for India

Mausam AI is designed around Indian users and locations.

The platform focuses on:

* Indian districts
* Indian municipalities
* Hyper-local weather conditions
* Regional accessibility
* Vernacular voice interaction
* Rural and urban use cases

---

## 💡 Future Scope

Potential future improvements include:

* 🤖 AI-powered personalized advisories
* 🌾 Crop-specific recommendations
* 📍 More granular location-based alerts
* 🗺️ Interactive weather and hazard maps
* 🛰️ Satellite/weather radar integration
* 📲 Push notifications
* 🗣️ More Indian regional languages
* 👥 Improved community-report verification
* 🚦 Traffic-aware route recommendations
* 📊 Historical weather analytics
* 🔔 Severe-weather notification system

---

## 🏆 Smart India Hackathon

**Mausam AI** is developed as a prototype for **Smart India Hackathon 2026**.

The project focuses on using accessible web technologies and live weather data to transform conventional weather information into **persona-specific, actionable intelligence**.

---

## 👨‍💻 Project Structure

```text
mausam-ai/
│
├── index.html
├── style.css
├── script.js
│
├── manifest.json
├── service-worker.js
│
├── assets/
│   ├── icons/
│   └── images/
│
└── README.md
```

---

## 📄 License

This project is currently a prototype developed for educational and hackathon purposes.

---

## 🌤️ Mausam AI

**Don't just check the weather.
Understand what it means for you.**
