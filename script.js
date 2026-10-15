const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const suggestionsBox = document.getElementById("suggestions");
const message = document.getElementById("message");

const modal = document.getElementById("weatherModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

const forecastCard = document.getElementById("forecastCard");
const forecastRow = document.getElementById("forecastRow");

let debounceTimer = null;
let selectedLocation = null;

function showMessage(text, isError = true) {
  message.textContent = text;
  message.style.color = isError ? "#d63031" : "#0984e3";
}

function hideSuggestions() {
  suggestionsBox.classList.add("hidden");
  suggestionsBox.innerHTML = "";
}

function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function clearWeather() {
  cityName.textContent = "";
  temperature.textContent = "";
  description.textContent = "";
  windSpeed.textContent = "";
  weatherIcon.textContent = "☀️";
  forecastRow.innerHTML = "";
  forecastCard.classList.add("hidden");
}

function getWeatherDescription(code) {
  const map = {
    0: "آسمان صاف",
    1: "عمدتاً صاف",
    2: "نیمه‌ابری",
    3: "ابری",
    45: "مه",
    48: "مه یخ‌زده",
    51: "نم‌نم باران خفیف",
    53: "نم‌نم باران متوسط",
    55: "نم‌نم باران شدید",
    56: "باران یخ‌زده خفیف",
    57: "باران یخ‌زده شدید",
    61: "باران خفیف",
    63: "باران متوسط",
    65: "باران شدید",
    71: "برف خفیف",
    73: "برف متوسط",
    75: "برف شدید",
    80: "رگبار باران خفیف",
    81: "رگبار باران متوسط",
    82: "رگبار باران شدید",
    85: "رگبار برف خفیف",
    86: "رگبار برف شدید",
    95: "رعد و برق",
    96: "رعد و برق همراه با تگرگ خفیف",
    99: "رعد و برق همراه با تگرگ شدید"
  };
  return map[code] || "نامشخص";
}

function getWeatherEmoji(code) {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌦️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95) return "⛈️";
  return "🌡️";
}

function buildDisplayName(location) {
  const parts = [location.name];
  if (location.admin1 && location.admin1 !== location.name) {
    const cleanAdmin = location.admin1.replace(/^استان\s+/, "").trim();
    if (cleanAdmin && cleanAdmin !== location.name) parts.push(cleanAdmin);
  }
  if (location.country && !parts.includes(location.country)) parts.push(location.country);
  return parts.join("، ");
}

async function fetchCitySuggestions(query) {
  if (query.length < 3) {
    hideSuggestions();
    return;
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=fa&format=json`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      hideSuggestions();
      return;
    }

    const seen = new Set();
    const filtered = data.results.filter((item) => {
      const isCity = item.feature_code && item.feature_code.startsWith("PPL");
      const key = `${item.name}|${item.country}|${item.admin1 || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return isCity;
    });

    if (filtered.length === 0) {
      hideSuggestions();
      return;
    }

    suggestionsBox.innerHTML = "";

    filtered.slice(0, 5).forEach((item) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      const fullName = buildDisplayName(item);
      div.textContent = fullName;

      div.addEventListener("click", () => {
        selectedLocation = {
          lat: item.latitude,
          lon: item.longitude,
          name: fullName
        };
        cityInput.value = item.name;
        hideSuggestions();
        getWeather();
      });

      suggestionsBox.appendChild(div);
    });

    suggestionsBox.classList.remove("hidden");
  } catch {
    hideSuggestions();
  }
}

function displayForecast(daily) {
  forecastRow.innerHTML = "";
  const labels = ["روز اول", "روز دوم", "روز سوم"];

  for (let i = 0; i < 3; i++) {
    const item = document.createElement("div");
    item.className = "forecast-item";
    item.innerHTML = `
      <div class="fc-emoji">${getWeatherEmoji(daily.weather_code[i])}</div>
      <div class="fc-hours">${labels[i]}</div>
      <div class="fc-temp-max">${Math.round(daily.temperature_2m_max[i])}°</div>
      <div class="fc-temp-min">${Math.round(daily.temperature_2m_min[i])}°</div>
    `;
    forecastRow.appendChild(item);
  }

  forecastCard.classList.remove("hidden");
}

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    showMessage("لطفاً نام یک شهر را وارد کنید.");
    return;
  }

  getWeatherBtn.disabled = true;
  showMessage("در حال دریافت اطلاعات...", false);
  clearWeather();
  hideSuggestions();

  try {
    let latitude, longitude, displayName;

    if (selectedLocation) {
      latitude = selectedLocation.lat;
      longitude = selectedLocation.lon;
      displayName = selectedLocation.name;
    } else {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fa&format=json`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("شهر پیدا نشد.");
      }

      const location = geoData.results[0];
      latitude = location.latitude;
      longitude = location.longitude;
      displayName = buildDisplayName(location);
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      throw new Error("اطلاعات آب و هوا دریافت نشد.");
    }

    const temp = Math.round(weatherData.current.temperature_2m);
    const code = weatherData.current.weather_code;
    const windKmh = Math.round(weatherData.current.wind_speed_10m);
    const windMs = (windKmh / 3.6).toFixed(1);

    cityName.textContent = displayName;
    temperature.textContent = `${temp}°`;
    description.textContent = getWeatherDescription(code);
    windSpeed.innerHTML = `${windKmh} km/h <small style="color:#666">(${windMs} m/s)</small>`;
    weatherIcon.textContent = getWeatherEmoji(code);

    displayForecast(weatherData.daily);
    openModal();
    showMessage("", false);
  } catch (error) {
    showMessage(error.message || "خطا در دریافت اطلاعات.");
    closeModal();
  } finally {
    getWeatherBtn.disabled = false;
  }
}

getWeatherBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") getWeather();
});

cityInput.addEventListener("input", () => {
  const query = cityInput.value.trim();
  selectedLocation = null;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => fetchCitySuggestions(query), 300);
});

cityInput.addEventListener("blur", () => {
  setTimeout(() => hideSuggestions(), 200);
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});