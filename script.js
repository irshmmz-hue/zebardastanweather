const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const suggestionsBox = document.getElementById("suggestions");
const message = document.getElementById("message");

const modal = document.getElementById("weatherModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
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
let suggestionRequestId = 0;
let isLoading = false;

// نمایش عدد و علامت درجه به صورت چپ‌به‌راست
function formatTemperature(value) {
  if (value == null || !Number.isFinite(Number(value))) {
    return "نامشخص";
  }

  return `\u2066${Math.round(Number(value))}°\u2069`;
}

function normalizeCityName(value) {
  return value
    .normalize("NFKC")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200C/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// نام جایگزین برای شهرهایی که جست‌وجوی فارسی‌شان مشکل دارد
const cityAliases = {
  "بوشهر": "Bushehr"
};

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
  weatherIcon.innerHTML = "";

  if (feelsLike) feelsLike.textContent = "";
  if (cityLocalTime) cityLocalTime.textContent = "";
  if (weatherUpdatedAt) weatherUpdatedAt.textContent = "";
  if (humidity) humidity.textContent = "";

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
    56: "نم‌نم باران یخ‌زده خفیف",
    57: "نم‌نم باران یخ‌زده شدید",
    61: "باران خفیف",
    63: "باران متوسط",
    65: "باران شدید",
    66: "باران یخ‌زده خفیف",
    67: "باران یخ‌زده شدید",
    71: "برف خفیف",
    73: "برف متوسط",
    75: "برف شدید",
    77: "دانه‌های برف",
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
    code === 85 ||
    code === 86
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
    const cleanAdmin = location.admin1
      .replace(/^استان\s+/, "")
      .trim();

    if (cleanAdmin && cleanAdmin !== location.name) {
      parts.push(cleanAdmin);
    }
  }

  if (location.country && !parts.includes(location.country)) {
    parts.push(location.country);
  }

  return parts.join("، ");
}

async function searchCities(query, count = 10) {
  const normalizedCity = normalizeCityName(query);
  const searchNames = [normalizedCity];

  if (cityAliases[normalizedCity]) {
    searchNames.push(cityAliases[normalizedCity]);
  }

  for (const searchName of searchNames) {
    const url =
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchName)}&count=${count}&language=fa&format=json`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("ارتباط با سرویس جست‌وجوی شهر برقرار نشد.");
    }

    const data = await res.json();

    if (data.results?.length) {
      return data.results;
    }
  }

  return [];
}

async function fetchCitySuggestions(query, requestId) {
  if (requestId !== suggestionRequestId || isLoading) return;

  if (normalizeCityName(query).length < 2) {
    hideSuggestions();
    return;
  }

  try {
    const results = await searchCities(query);

    // پاسخ جست‌وجوی قدیمی نباید جای پاسخ جدید نمایش داده شود.
    if (requestId !== suggestionRequestId || isLoading) return;

    const seen = new Set();

    const filtered = results.filter((item) => {
      const isCity = item.feature_code?.startsWith("PPL");

      if (!isCity) return false;

      const key = `${item.name}|${item.country}|${item.admin1 || ""}`;

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
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
    if (requestId === suggestionRequestId) {
      hideSuggestions();
    }
  }
}

function displayForecast(daily) {
  forecastRow.innerHTML = "";

  if (
    !daily?.time ||
    !daily?.weather_code ||
    !daily?.temperature_2m_max ||
    !daily?.temperature_2m_min
  ) {
    forecastCard.classList.add("hidden");
    return;
  }

  const labels = ["فردا", "پس‌فردا", "سه روز دیگر"];

  // شماره صفر مربوط به امروز است؛ از شماره یک شروع می‌کنیم.
  for (let i = 1; i <= 3 && i < daily.time.length; i++) {
    const item = document.createElement("div");
    item.className = "forecast-item";

    const maxTemp = formatTemperature(daily.temperature_2m_max[i]);
    const minTemp = formatTemperature(daily.temperature_2m_min[i]);
    const code = daily.weather_code[i];

    item.innerHTML = `
      <div class="fc-emoji">
        ${getWeatherEmoji(code)}
      </div>

      <div class="fc-description">
        ${getWeatherDescription(code)}
      </div>

      <div class="fc-hours">${labels[i - 1]}</div>

      <div class="fc-temperatures">
        <div class="fc-temp-min">
          <span>${minTemp}</span>
          <small>↓ کمینه</small>
        </div>

        <div class="fc-temp-max">
          <span>${maxTemp}</span>
          <small>↑ بیشینه</small>
        </div>
      </div>
    `;

    forecastRow.appendChild(item);
  }

  forecastCard.classList.toggle(
    "hidden",
    forecastRow.children.length === 0
  );
}

async function getWeather() {
  if (isLoading) return;

  const city = cityInput.value.trim();

  if (!city) {
    showMessage("لطفاً نام یک شهر را وارد کنید.");
    return;
  }

  isLoading = true;
  getWeatherBtn.disabled = true;

  clearTimeout(debounceTimer);
  suggestionRequestId++;

  showMessage("در حال دریافت اطلاعات...", false);
  clearWeather();
  hideSuggestions();

  try {
    let latitude;
    let longitude;
    let displayName;

    if (selectedLocation) {
      latitude = selectedLocation.lat;
      longitude = selectedLocation.lon;
      displayName = selectedLocation.name;
    } else {
      const results = await searchCities(city);

      if (results.length === 0) {
        throw new Error("شهر پیدا نشد.");
      }

      const location =
        results.find((item) => item.feature_code?.startsWith("PPL")) ||
        results[0];

      latitude = location.latitude;
      longitude = location.longitude;
      displayName = buildDisplayName(location);
    }

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=kmh&timezone=auto&timeformat=unixtime&forecast_days=4`;

    const weatherRes = await fetch(weatherUrl);

    if (!weatherRes.ok) {
      throw new Error("ارتباط با سرویس آب و هوا برقرار نشد.");
    }

    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      throw new Error("اطلاعات آب و هوا دریافت نشد.");
    }

    const current = weatherData.current;
    const code = current.weather_code;

    cityName.textContent = displayName;

    // علامت درجه در سمت راست عدد
    temperature.textContent = formatTemperature(current.temperature_2m);

    // دمای احساسی فقط یک بار نمایش داده می‌شود.
    if (feelsLike) {
      feelsLike.textContent =
        `دمای احساسی: ${formatTemperature(current.apparent_temperature)}`;
    }

    description.textContent = getWeatherDescription(code);
    weatherIcon.innerHTML = getWeatherEmoji(code);

    const rawWindKmh = current.wind_speed_10m;

    if (rawWindKmh == null || !Number.isFinite(Number(rawWindKmh))) {
      windSpeed.textContent = "سرعت باد: نامشخص";
    } else {
      const windKmh = Math.round(Number(rawWindKmh));
      const windMs = (Number(rawWindKmh) / 3.6).toFixed(1);

      windSpeed.innerHTML = `
        <span>سرعت باد</span>
        <span class="wind-values" dir="ltr">
          ${windKmh} km/h
          <small>(${windMs} m/s)</small>
        </span>
      `;
    }

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
      if (current.time == null) {
        weatherUpdatedAt.textContent = "زمان دادهٔ هواشناسی: نامشخص";
      } else {
        const dataTime = new Date(current.time * 1000);

        weatherUpdatedAt.textContent =
          `زمان دادهٔ هواشناسی: ${cityTimeFormatter.format(dataTime)}`;
      }
    }

    if (humidity) {
      const humidityValue = current.relative_humidity_2m;

      humidity.textContent =
        humidityValue == null
          ? "رطوبت: نامشخص"
          : `رطوبت: \u2066${humidityValue}٪\u2069`;
    }

    displayForecast(weatherData.daily);
    openModal();
    showMessage("", false);
  } catch (error) {
    showMessage(error.message || "خطا در دریافت اطلاعات.");
    closeModal();
  } finally {
    isLoading = false;
    getWeatherBtn.disabled = false;
  }
}

getWeatherBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    getWeather();
  }
});

cityInput.addEventListener("input", () => {
  const query = cityInput.value.trim();

  selectedLocation = null;
  clearTimeout(debounceTimer);
  hideSuggestions();

  const requestId = ++suggestionRequestId;

  debounceTimer = setTimeout(() => {
    fetchCitySuggestions(query, requestId);
  }, 300);
});

cityInput.addEventListener("blur", () => {
  setTimeout(() => {
    // اگر کاربر دوباره روی ورودی کلیک کرده، پیشنهادها بسته نشوند.
    if (document.activeElement === cityInput) return;

    clearTimeout(debounceTimer);
    suggestionRequestId++;
    hideSuggestions();
  }, 200);
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    hideSuggestions();
  }
});