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
const cityLocalTime = document.getElementById("cityLocalTime");
const weatherUpdatedAt = document.getElementById("weatherUpdatedAt");
const humidity = document.getElementById("humidity");

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
  weatherIcon.innerHTML = getWeatherEmoji(0);
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
  const sun = `
    <g stroke="#f59e0b" stroke-width="3" stroke-linecap="round">
      <path d="M32 5v5 M32 46v5 M9 28h5 M50 28h5
               M16 12l4 4 M44 40l4 4
               M16 44l4-4 M44 16l4-4"/>
      <circle cx="32" cy="28" r="12" fill="#fbbf24"/>
    </g>`;

  const cloud = `
    <path d="M16 43h33a10 10 0 0 0 0-20
             15 15 0 0 0-28-3
             12 12 0 0 0-5 23Z"
             fill="#69c9ff" stroke="#1685cf"
             stroke-width="2" stroke-linejoin="round"/>`;

  const rain = `
    <path d="M22 48l-3 7 M34 48l-3 7 M46 48l-3 7"
          stroke="#2196f3" stroke-width="3"
          stroke-linecap="round"/>`;

  const snow = `
    <g fill="#38bdf8">
      <circle cx="21" cy="52" r="3"/>
      <circle cx="33" cy="56" r="3"/>
      <circle cx="45" cy="52" r="3"/>
    </g>`;

  const fog = `
    <path d="M12 48h40 M17 54h30 M22 60h20"
          stroke="#94a3b8" stroke-width="3"
          stroke-linecap="round"/>`;

  const lightning = `
    <path d="M33 39l-8 13h8l-4 11 16-18h-10l5-6Z"
          fill="#facc15" stroke="#d97706"
          stroke-width="1.5" stroke-linejoin="round"/>`;

  let drawing;

  if (code === 0) {
    drawing = sun;
  } else if (code === 1 || code === 2) {
    drawing = sun + cloud;
  } else if (code === 3) {
    drawing = cloud;
  } else if (code === 45 || code === 48) {
    drawing = cloud + fog;
  } else if (
    (code >= 71 && code <= 77) ||
    code === 85 || code === 86
  ) {
    drawing = cloud + snow;
  } else if ([95, 96, 99].includes(code)) {
    drawing = cloud + lightning;
  } else if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    drawing = cloud + rain;
  } else {
    drawing = cloud;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="1em" height="1em" viewBox="0 0 64 64"
         role="img" aria-label="${getWeatherDescription(code)}"
         style="display:inline-block;vertical-align:middle">
      ${drawing}
    </svg>`;
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

  const labels = ["فردا", "پس‌فردا", "سه روز دیگر"];

  // شماره صفر مربوط به امروز است؛ از شماره یک شروع می‌کنیم.
  for (let i = 1; i <= 3; i++) {
    const item = document.createElement("div");
    item.className = "forecast-item";

    const maxTemp = Math.round(daily.temperature_2m_max[i]);
    const minTemp = Math.round(daily.temperature_2m_min[i]);

    item.innerHTML = `
      <div class="fc-emoji">
        ${getWeatherEmoji(daily.weather_code[i])}
      </div>

      <div class="fc-hours">${labels[i - 1]}</div>

      <div class="fc-temperatures">
        <div class="fc-temp-min">
          <span>${minTemp}°</span>
          <small>↓ کمینه</small>
        </div>

        <div class="fc-temp-max">
          <span>${maxTemp}°</span>
          <small>↑ بیشینه</small>
        </div>
      </div>
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
      const normalizedCity = city
  .normalize("NFKC")
  .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
  .replace(/ي/g, "ی")
  .replace(/ك/g, "ک")
  .replace(/\u200C/g, " ")
  .replace(/\s+/g, " ")
  .trim();

// نام جایگزین برای شهرهایی که جست‌وجوی فارسی‌شان مشکل دارد
const cityAliases = {
  "بوشهر": "Bushehr"
};

const searchNames = [normalizedCity];

if (cityAliases[normalizedCity]) {
  searchNames.push(cityAliases[normalizedCity]);
}

let geoData = { results: [] };

for (const searchName of searchNames) {
  const geoUrl =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchName)}&count=1&language=fa&format=json`;

  const geoRes = await fetch(geoUrl);

  if (!geoRes.ok) {
    throw new Error("ارتباط با سرویس جست‌وجوی شهر برقرار نشد.");
  }

  geoData = await geoRes.json();

  if (geoData.results?.length) {
    break;
  }
}

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("شهر پیدا نشد.");
      }

      const location = geoData.results[0];
      latitude = location.latitude;
      longitude = location.longitude;
      displayName = buildDisplayName(location);
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&timeformat=unixtime&forecast_days=4`;
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
    windSpeed.innerHTML = `
  <span>سرعت باد</span>
  <span class="wind-values">
    ${windKmh} km/h
    <small>(${windMs} m/s)</small>
  </span>
`;
    weatherIcon.innerHTML = getWeatherEmoji(code);

    const cityTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
      timeZone: weatherData.timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    });

    if (cityLocalTime) {
      cityLocalTime.textContent =
        `زمان محلی شهر: ${cityTimeFormatter.format(new Date())}`;
    }

    if (weatherUpdatedAt) {
      const dataTime = new Date(weatherData.current.time * 1000);

      weatherUpdatedAt.textContent =
        `زمان دادهٔ هواشناسی: ${cityTimeFormatter.format(dataTime)}`;
    }

    if (humidity) {
      const humidityValue = weatherData.current.relative_humidity_2m;

      humidity.textContent =
        humidityValue == null
          ? "رطوبت: نامشخص"
          : `رطوبت: ${humidityValue}٪`;
    }
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