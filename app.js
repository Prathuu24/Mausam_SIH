// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// Global Application State
let currentUser = JSON.parse(localStorage.getItem('mausam_user')) || null;
let currentPersona = localStorage.getItem('mausam_persona') || null;

// Reference scale for the wind instrument dial (km/h at which the ring reads 100%)
const WIND_GAUGE_MAX = 30;
// Static AQI reading used for the commuter dial
const STATIC_AQI = 214;
const AQI_GAUGE_MAX = 500;

// Initialize the autocomplete listeners when the app loads
window.addEventListener('DOMContentLoaded', () => {
  setupAutocomplete('user-city', 'user-city-dropdown');
  setupAutocomplete('route-start', 'route-start-dropdown');
  setupAutocomplete('route-dest', 'route-dest-dropdown');
  
  if (currentUser && currentPersona) {
    launchDashboard();
  } else if (currentUser) {
    showScreen('onboarding-screen');
  } else {
    showScreen('login-screen');
  }
});

// Screen Switcher Helper
function showScreen(screenId) {
  ['login-screen', 'onboarding-screen', 'dashboard-screen'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(screenId).classList.remove('hidden');

  const logoutBtn = document.getElementById('logout-btn');
  const fabBtn = document.getElementById('report-fab');

  if (screenId === 'dashboard-screen') {
    logoutBtn.classList.remove('hidden');
    if (fabBtn) fabBtn.classList.remove('hidden');
  } else {
    logoutBtn.classList.add('hidden');
    if (fabBtn) fabBtn.classList.add('hidden');
  }
}

// 1. Handle Login (Upgraded for Global Search & Autocomplete)
async function handleLogin(e) {
  e.preventDefault();
  const name = document.getElementById('user-name').value.trim();
  const phone = document.getElementById('user-phone').value.trim();
  const cityInput = document.getElementById('user-city').value.trim();

  const btn = document.getElementById('login-submit-btn');
  const originalText = btn.innerText;
  btn.innerText = "Locating...";
  btn.style.opacity = "0.7";
  btn.disabled = true;

  try {
    const locationData = await getCoordinates(cityInput);
    
    if (!locationData) {
      alert("Location not found in India. Please select a valid city from the dropdown suggestions.");
      btn.innerText = originalText;
      btn.style.opacity = "1";
      btn.disabled = false;
      return;
    }

    // Save the dynamically fetched coordinates directly to the user profile
    currentUser = { 
      name, 
      phone, 
      location: locationData // contains { lat, lon, name }
    };
    
    localStorage.setItem('mausam_user', JSON.stringify(currentUser));
    showScreen('onboarding-screen');
    
  } catch (err) {
    alert("Error connecting to location services.");
  } finally {
    btn.innerText = originalText;
    btn.style.opacity = "1";
    btn.disabled = false;
  }
}

// 2. Select Persona
function selectPersona(persona) {
  currentPersona = persona;
  localStorage.setItem('mausam_persona', persona);
  launchDashboard();
}

// 3. Launch Dashboard & Fetch Data
async function launchDashboard() {
  showScreen('dashboard-screen');

  // Set greetings & tags
  document.getElementById('user-greeting').innerText = `Hi, ${currentUser.name}`;
  document.getElementById('location-badge').innerText = currentUser.location.name;
  const coords = currentUser.location;

  // Toggle Persona Specific UI
  if (currentPersona === 'Farmer') {
    document.getElementById('farmer-widgets').classList.remove('hidden');
    document.getElementById('commuter-widgets').classList.add('hidden');
  } else {
    document.getElementById('farmer-widgets').classList.add('hidden');
    document.getElementById('commuter-widgets').classList.remove('hidden');
    setGaugeFill('aqi-gauge', (STATIC_AQI / AQI_GAUGE_MAX) * 100);
  }

  // Fetch Live Weather for User's Dynamic City
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=precipitation_probability,relative_humidity_2m`;
    const res = await fetch(url);
    const data = await res.json();

    const temp = Math.round(data.current_weather.temperature);
    const wind = data.current_weather.windspeed;
    const weatherCode = data.current_weather.weathercode;
    const isDay = data.current_weather.is_day; // Gets 1 for day, 0 for night

    // UPDATE UI ARTWORK DYNAMICALLY
    updateWeatherArt(isDay, weatherCode);

    document.getElementById('temp-display').innerText = `${temp}°`;
    document.getElementById('weather-desc').innerText = `Wind: ${wind} km/h • Humidity: ${data.hourly.relative_humidity_2m[0]}%`;

    document.getElementById('farmer-wind').innerText = `${wind}`;
    document.getElementById('rain-probability').innerText = `${data.hourly.precipitation_probability[0]}%`;

    const windPct = (wind / WIND_GAUGE_MAX) * 100;
    setGaugeFill('wind-gauge', windPct, wind > 15);

    generateAdvisory(currentPersona, temp, wind);

  } catch (err) {
    document.getElementById('temp-display').innerText = "--°";
    document.getElementById('weather-desc').innerText = "Offline Mode / Error fetching API";
  }
}

// Helper: fill a circular instrument dial (0-100%) and toggle its alert state
function setGaugeFill(gaugeId, percent, alert = false) {
  const gauge = document.getElementById(gaugeId);
  if (!gauge) return;
  const clamped = Math.max(0, Math.min(100, percent));
  gauge.style.setProperty('--pct', clamped);
  gauge.classList.toggle('gauge--alert', alert);
}

// 4. Contextual Persona-Based Advisory
function generateAdvisory(persona, temp, wind) {
  const advisoryEl = document.getElementById('ai-advisory');

  if (persona === 'Farmer') {
    if (wind > 15) {
      advisoryEl.innerText = `Wind speeds are high (${wind} km/h). Postpone pesticide/fertilizer spraying to avoid chemical drift. Soil retention remains stable.`;
    } else {
      advisoryEl.innerText = `Favorable micro-climate detected. Winds are calm (${wind} km/h) and temperature is ${temp}°C. Ideal conditions for sowing and field inspection.`;
    }
  } else {
    if (temp > 35) {
      advisoryEl.innerText = `High heat warning (${temp}°C) during peak transit. Carry water, stay hydrated, and plan evening commutes post 6:00 PM.`;
    } else {
      advisoryEl.innerText = `Normal transit conditions. Weather is clear across primary road networks with zero significant rain delay risks.`;
    }
  }
}

// Switch Persona without logging out
function switchProfile() {
  localStorage.removeItem('mausam_persona');
  showScreen('onboarding-screen');
}

// Reset everything
function logout() {
  localStorage.clear();
  currentUser = null;
  currentPersona = null;
  showScreen('login-screen');
}


// --- NEW FEATURE 1: VOICE ASSISTANT ---
function readAdvisoryOutLoud() {
  const advisoryText = document.getElementById('ai-advisory').innerText;
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); 
    
    const speech = new SpeechSynthesisUtterance(advisoryText);
    speech.lang = 'en-IN'; 
    speech.rate = 0.9;     
    speech.pitch = 1.0;
    
    window.speechSynthesis.speak(speech);
  } else {
    alert("Voice feature is not supported in this browser.");
  }
}

// --- NEW FEATURE 2: CROWDSOURCED WAZE FOR WEATHER ---
function toggleReportModal(show) {
  const modal = document.getElementById('report-modal');
  if (show) {
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

function submitReport(issueType) {
  toggleReportModal(false);
  
  const containerId = currentPersona === 'Farmer' ? 'farmer-widgets' : 'commuter-widgets';
  const container = document.getElementById(containerId);

  const alertBanner = document.createElement('div');
  alertBanner.className = "notice-card notice-card--alert screen"; 
  alertBanner.innerHTML = `
    <span class="material-icons">notification_important</span>
    <div>
      <h4>Community Alert: ${issueType}</h4>
      <p>Reported by a user near ${currentUser.location.name} just now.</p>
    </div>
  `;

  const sectionLabel = container.querySelector('.section-label');
  sectionLabel.after(alertBanner);
}


// --- UPGRADED FEATURE 3: DYNAMIC ROUTE-BASED WEATHER ---
async function getCoordinates(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=10&language=en&format=json`;
  const res = await fetch(url);
  const data = await res.json();
  
  if (!data.results || data.results.length === 0) return null;
  
  // Strict Indian location filter
  const indiaMatch = data.results.find(place => place.country === "India");
  if (!indiaMatch) return null;
  
  return {
    lat: indiaMatch.latitude,
    lon: indiaMatch.longitude,
    name: indiaMatch.name
  };
}

async function calculateRoute() {
  const startVal = document.getElementById('route-start').value.trim();
  const destVal = document.getElementById('route-dest').value.trim();

  if (!startVal || !destVal) {
    alert("Please enter both start and destination locations.");
    return;
  }

  document.getElementById('route-result').classList.remove('hidden');
  document.getElementById('route-advice').innerText = "Locating coordinates & scanning route...";
  document.getElementById('route-start-name').innerText = "Searching...";
  document.getElementById('route-dest-name').innerText = "Searching...";

  try {
    const startCoords = await getCoordinates(startVal);
    const destCoords = await getCoordinates(destVal);

    if (!startCoords || !destCoords) {
      document.getElementById('route-advice').innerText = "Location not found in India. Please select a valid city from the suggestions.";
      document.getElementById('route-dest-icon').innerText = 'error';
      document.getElementById('route-dest-icon').style.color = 'var(--brick)';
      return;
    }

    document.getElementById('route-start-name').innerText = startCoords.name;
    document.getElementById('route-dest-name').innerText = destCoords.name;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${destCoords.lat}&longitude=${destCoords.lon}&current_weather=true&hourly=precipitation_probability`;
    const res = await fetch(weatherUrl);
    const data = await res.json();

    const destRain = data.hourly.precipitation_probability[0];
    const destCode = data.current_weather.weathercode;

    let icon = 'wb_sunny';
    let iconColor = 'var(--marigold)';
    let advice = 'Clear route. Optimal transit conditions.';

    if (destRain > 30 || [51,53,55,61,63,65,80,81,82].includes(destCode)) {
      icon = 'water_drop';
      iconColor = 'var(--sky-mid)';
      advice = `Rain expected at destination (${destRain}% risk). Speed reduction advised.`;
    } 
    else if ([45, 48].includes(destCode)) {
       icon = 'foggy';
       iconColor = 'var(--ink-soft)';
       advice = 'Low visibility (Fog) expected. Keep headlights on.';
    }

    document.getElementById('route-dest-icon').innerText = icon;
    document.getElementById('route-dest-icon').style.color = iconColor;
    document.getElementById('route-advice').innerText = advice;

  } catch(e) {
    document.getElementById('route-advice').innerText = "Route scan failed. Please check connection.";
  }
}

// --- NEW FEATURE 4: LIVE AUTOCOMPLETE (INDIA RESTRICTED) ---
function setupAutocomplete(inputId, dropdownId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(dropdownId);
  if (!input || !dropdown) return;
  
  let timeout = null;

  input.addEventListener('input', (e) => {
    clearTimeout(timeout);
    const query = e.target.value.trim();

    if (query.length < 3) {
      dropdown.classList.add('hidden');
      return;
    }

    timeout = setTimeout(async () => {
      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.results) {
          dropdown.classList.add('hidden');
          return;
        }

        // Filter: Keep only results where the country is India
        const indiaResults = data.results.filter(place => place.country === "India");

        if (indiaResults.length === 0) {
          dropdown.classList.add('hidden');
          return;
        }

        dropdown.innerHTML = ''; 
        
        // Only show up to 5 filtered Indian results
        indiaResults.slice(0, 5).forEach(place => {
          const item = document.createElement('div');
          item.className = 'autocomplete-item';
          
          const locationString = [place.name, place.admin1].filter(Boolean).join(', ');
          item.innerText = locationString;
          
          item.onclick = () => {
            input.value = place.name; 
            dropdown.classList.add('hidden');
          };
          
          dropdown.appendChild(item);
        });
        
        dropdown.classList.remove('hidden');
      } catch (err) {
        console.error("Autocomplete error:", err);
      }
    }, 400); 
  });

  document.addEventListener('click', (e) => {
    if (e.target !== input && e.target !== dropdown) {
      dropdown.classList.add('hidden');
    }
  });
}

// --- NEW FEATURE 5: DYNAMIC WEATHER ARTWORK ---
function updateWeatherArt(isDay, weatherCode) {
  const hero = document.querySelector('.dash-hero');
  if (!hero) return;

  // Reset all themes first
  hero.classList.remove('is-night', 'is-rainy', 'is-cloudy');

  // 0 = Night, 1 = Day
  if (isDay === 0) {
    hero.classList.add('is-night');
  }

  // WMO Codes for Drizzle, Rain, and Thunderstorms (51 to 99)
  if ([51,53,55,61,63,65,66,67,80,81,82,95,96,99].includes(weatherCode)) {
    hero.classList.add('is-rainy');
  } 
  // WMO Codes for Overcast and Fog (2, 3, 45, 48)
  else if ([2, 3, 45, 48].includes(weatherCode)) {
    hero.classList.add('is-cloudy');
  }
}