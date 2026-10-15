// ============================================
// تنظیمات و عناصر صفحه
// ============================================

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");

const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const windSpeed = document.getElementById("windSpeed");

const suggestionsBox = document.getElementById("suggestions");

// ============================================
// متغیرهای جهانی
// ============================================

let debounceTimer = null;
let selectedLocation = null;

// ============================================
// توابع کمکی
// ============================================

function showMessage(text, isError = true) {
  message.textContent = text;
  message.style.color = isError ? "#d63031" : "#0984e3";
}

function clearWeather() {
  weatherCard.classList.add("hidden");
  cityName.textContent = "";
  temperature.textContent = "";
  description.textContent = "";
  windSpeed.textContent = "";
}

function hideSuggestions() {
  suggestionsBox.classList.add("hidden");
  suggestionsBox.innerHTML = "";
}

// تبدیل کد وضعیت هوا به متن فارسی
function getWeatherDescription(code) {
  const weatherMap = {
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
    66: "باران یخ‌زده خفیف",
    67: "باران یخ‌زده شدید",
    71: "بارش برف خفیف",
    73: "بارش برف متوسط",
    75: "بارش برف شدید",
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

  return weatherMap[code] || "نامشخص";
}

// تبدیل کد وضعیت هوا به ایموجی
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

// تبدیل m/s به km/h
function msToKmh(ms) {
  return Math.round(ms * 3.6);
}

// ============================================
// ساخت نام نمایشی شهر (بدون تکرار و بدون "استان")
// ============================================

function buildDisplayName(location) {
  const parts = [location.name];
  
  // اگر admin1 وجود دارد و با name یکی نیست، اضافه کن
  // اما اگر admin1 با "استان" شروع می‌شود، آن را حذف کن
  if (location.admin1 && location.admin1 !== location.name) {
    // حذف کلمه "استان" از ابتدای نام
    const cleanAdmin = location.admin1.replace(/^استان\s+/, "").trim();
    
    // فقط اگر بعد از پاکسازی خالی نبود و با name یکی نبود، اضافه کن
    if (cleanAdmin && cleanAdmin !== location.name) {
      parts.push(cleanAdmin);
    }
  }
  
  // اضافه کردن کشور (اگر تکراری نباشد)
  if (location.country && !parts.includes(location.country)) {
    parts.push(location.country);
  }
  
  return parts.join("، ");
}

// ============================================
// دریافت پیشنهاد شهرها
// ============================================

async function fetchCitySuggestions(query) {
  if (query.length < 3) {
    hideSuggestions();
    return;
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=10&language=fa&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      hideSuggestions();
      return;
    }

    const seen = new Set();
    const filteredResults = data.results.filter((item) => {
      const isCity = item.feature_code && item.feature_code.startsWith("PPL");
      const key = `${item.name}|${item.country}|${item.admin1 || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return isCity;
    });

    if (filteredResults.length === 0) {
      hideSuggestions();
      return;
    }

    suggestionsBox.innerHTML = "";

    filteredResults.slice(0, 5).forEach((item) => {
      const fullName = buildDisplayName(item);

      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = fullName;

      div.addEventListener("click", () => {
        cityInput.value = item.name;
        selectedLocation = {
          lat: item.latitude,
          lon: item.longitude,
          name: fullName,
        };
        hideSuggestions();
        
        // ✅ تغییر: بعد از انتخاب از پیشنهاد، مستقیم آب و هوا را بگیر
        getWeather();
      });

      suggestionsBox.appendChild(div);
    });

    suggestionsBox.classList.remove("hidden");
  } catch (error) {
    hideSuggestions();
  }
}

// ============================================
// رویدادهای input
// ============================================

cityInput.addEventListener("input", () => {
  const query = cityInput.value.trim();
  selectedLocation = null;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchCitySuggestions(query);
  }, 300);
});

cityInput.addEventListener("blur", () => {
  setTimeout(() => {
    hideSuggestions();
  }, 200);
});

// ============================================
// دریافت آب و هوا
// ============================================

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    showMessage("لطفاً نام یک شهر را وارد کنید.");
    clearWeather();
    return;
  }

  getWeatherBtn.disabled = true;
  showMessage("در حال دریافت...", false);
  clearWeather();
  hideSuggestions();

  try {
    let latitude, longitude, displayName;

    if (selectedLocation) {
      latitude = selectedLocation.lat;
      longitude = selectedLocation.lon;
      displayName = selectedLocation.name;
    } else {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=fa&format=json`;

      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("شهر پیدا نشد. لطفاً نام شهر را بررسی کنید.");
      }

      const location = geoData.results[0];
      latitude = location.latitude;
      longitude = location.longitude;
      displayName = buildDisplayName(location);
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (!weatherData.current) {
      throw new Error("اطلاعات آب و هوا دریافت نشد.");
    }

    const temp = Math.round(weatherData.current.temperature_2m);
    const feelsLike = Math.round(weatherData.current.apparent_temperature);
    const weatherCode = weatherData.current.weather_code;
// مقدار برگشتی Open-Meteo به طور پیش‌فرض در واحد km/h است
const windKmh = Math.round(weatherData.current.wind_speed_10m);
// تبدیل به m/s برای نمایش دومی
const windMs = (windKmh / 3.6).toFixed(1);
    cityName.textContent = displayName;
    temperature.textContent = `${temp}°C (احساس: ${feelsLike}°C)`;
    description.textContent = `${getWeatherEmoji(weatherCode)} ${getWeatherDescription(weatherCode)}`;
    
    // نمایش سرعت باد در دو خط
    windSpeed.innerHTML = `${windKmh} km/h<br><small style="color:#666">${windMs} m/s</small>`;

    weatherCard.classList.remove("hidden");
    message.textContent = "";
  } catch (error) {
    showMessage(error.message || "خطا در دریافت اطلاعات آب و هوا.");
    clearWeather();
  } finally {
    getWeatherBtn.disabled = false;
  }
}

// ============================================
// رویدادها
// ============================================

getWeatherBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather();
  }
});