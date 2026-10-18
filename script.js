// ============================================
// دیکشنری ترجمه‌ها
// ============================================
const translations = {
  en: {
    welcomeTitle: "Welcome", welcomeSubtitle: "Please select your language",
    appTitle: "Weather App", placeholder: "Enter city name", search: "Get Weather",
    feedbackSummary: "Feedback / Report Issue", feedbackDesc: "If a city is not found or you see a problem, let us know.",
    labelName: "Name (Optional)", placeholderName: "Your name", labelEmail: "Email (Optional)",
    placeholderMessage: "Write your message...", labelMessage: "Message (Required)", sendFeedback: "Send",
    settingsTitle: "Settings", labelLang: "Language:", labelMethod: "Prayer Calculation Method:",
    forecastTitle: "3-Day Forecast", labels: ["Tomorrow", "In 2 Days", "In 3 Days"],
    tempLabel: "Current Temp", feelsLike: "Feels like", humidity: "Humidity", windLabel: "Wind Speed",
    cityTime: "Local time", updatedAt: "Data time", loading: "Loading...", errorEmpty: "Please enter a city name.",
    errorNotFound: "City not found.", hours: "h",
    prayerTimesTitle: "Prayer Times",
    prayers: { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" },
    saveSettings: "Save & Close"
  },
  fa: {
    welcomeTitle: "خوش آمدید", welcomeSubtitle: "لطفاً زبان خود را انتخاب کنید",
    appTitle: "اپلیکیشن آب و هوا", placeholder: "نام شهر را وارد کنید", search: "دریافت آب و هوا",
    feedbackSummary: "ثبت نظر یا گزارش مشکل", feedbackDesc: "اگر نام شهری پیدا نشد یا مشکلی مشاهده کردید، اینجا بنویسید.",
    labelName: "نام شما (اختیاری)", placeholderName: "نام شما", labelEmail: "ایمیل برای پاسخ (اختیاری)",
    placeholderMessage: "نظر، پیشنهاد یا مشکل را بنویسید…", labelMessage: "متن پیام (الزامی)", sendFeedback: "ارسال بازخورد",
    settingsTitle: "تنظیمات", labelLang: "زبان:", labelMethod: "روش محاسبه اوقات شرعی:",
    forecastTitle: "پیش‌بینی ۳ روز آینده", labels: ["فردا", "پس‌فردا", "سه روز دیگر"],
    tempLabel: "دمای فعلی", feelsLike: "دمای احساسی", humidity: "رطوبت", windLabel: "سرعت باد",
    cityTime: "زمان محلی شهر", updatedAt: "زمان دادهٔ هواشناسی", loading: "در حال دریافت اطلاعات...",
    errorEmpty: "لطفاً نام یک شهر را وارد کنید.", errorNotFound: "شهر پیدا نشد.", hours: "ساعت",
    prayerTimesTitle: "اوقات شرعی",
    prayers: { Fajr: "اذان صبح", Dhuhr: "اذان ظهر", Asr: "عصر", Maghrib: "اذان مغرب", Isha: "عشا" },
    saveSettings: "ذخیره و بستن"
  },
  ar: {
    welcomeTitle: "أهلاً بك", welcomeSubtitle: "الرجاء اختيار لغتك",
    appTitle: "تطبيق الطقس", placeholder: "أدخل اسم المدينة", search: "احصل على الطقس",
    feedbackSummary: "ملاحظات / الإبلاغ عن مشكلة", feedbackDesc: "إذا لم يتم العثور على مدينة أو واجهت مشكلة، أخبرنا.",
    labelName: "الاسم (اختياري)", placeholderName: "اسمك", labelEmail: "البريد الإلكتروني (اختياري)",
    placeholderMessage: "اكتب رسالتك...", labelMessage: "الرسالة (مطلوب)", sendFeedback: "إرسال",
    settingsTitle: "الإعدادات", labelLang: "اللغة:", labelMethod: "طريقة حساب أوقات الصلاة:",
    forecastTitle: "توقعات 3 أيام", labels: ["غداً", "بعد غد", "بعد 3 أيام"],
    tempLabel: "درجة الحرارة الحالية", feelsLike: "يشعر وكأنه", humidity: "الرطوبة", windLabel: "سرعة الرياح",
    cityTime: "الوقت المحلي", updatedAt: "وقت البيانات", loading: "جاري التحميل...",
    errorEmpty: "الرجاء إدخال اسم المدينة.", errorNotFound: "المدينة غير موجودة.", hours: "ساعة",
    prayerTimesTitle: "أوقات الصلاة",
    prayers: { Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء" },
    saveSettings: "حفظ وإغلاق"
  }
};

const weatherDescriptions = {
  en: { 0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Rime fog", 51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle", 56: "Freezing drizzle", 57: "Dense freezing drizzle", 61: "Slight rain", 63: "Rain", 65: "Heavy rain", 66: "Freezing rain", 67: "Heavy freezing rain", 71: "Slight snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains", 80: "Rain showers", 81: "Rain showers", 82: "Violent rain showers", 85: "Snow showers", 86: "Heavy snow showers", 95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with heavy hail" },
  fa: { 0: "آسمان صاف", 1: "عمدتاً صاف", 2: "نیمه‌ابری", 3: "ابری", 45: "مه", 48: "مه یخ‌زده", 51: "نم‌نم باران خفیف", 53: "نم‌نم باران متوسط", 55: "نم‌نم باران شدید", 56: "نم‌نم باران یخ‌زده خفیف", 57: "نم‌نم باران یخ‌زده شدید", 61: "باران خفیف", 63: "باران متوسط", 65: "باران شدید", 66: "باران یخ‌زده خفیف", 67: "باران یخ‌زده شدید", 71: "برف خفیف", 73: "برف متوسط", 75: "برف شدید", 77: "دانه‌های برف", 80: "رگبار باران خفیف", 81: "رگبار باران متوسط", 82: "رگبار باران شدید", 85: "رگبار برف خفیف", 86: "رگبار برف شدید", 95: "رعد و برق", 96: "رعد و برق همراه با تگرگ خفیف", 99: "رعد و برق همراه با تگرگ شدید" },
  ar: { 0: "سماء صافية", 1: "صافٍ غالباً", 2: "غائم جزئياً", 3: "غائم", 45: "ضباب", 48: "ضباب متجمد", 51: "رذاذ خفيف", 53: "رذاذ معتدل", 55: "رذاذ كثيف", 56: "رذاذ متجمد خفيف", 57: "رذاذ متجمد كثيف", 61: "مطر خفيف", 63: "مطر معتدل", 65: "مطر غزير", 66: "مطر متجمد خفيف", 67: "مطر متجمد غزير", 71: "تساقط ثلوج خفيف", 73: "تساقط ثلوج معتدل", 75: "تساقط ثلوج غزير", 77: "حبيبات ثلج", 80: "زخات مطر خفيفة", 81: "زخات مطر معتدلة", 82: "زخات مطر عنيفة", 85: "زخات ثلج خفيفة", 86: "زخات ثلج غزيرة", 95: "عاصفة رعدية", 96: "عاصفة رعدية مع حبات برد خفيفة", 99: "عاصفة رعدية مع حبات برد غزيرة" }
};

// ============================================
// متغیرها و عناصر
// ============================================
let currentLang = "en";
let currentMethod = "3";
let previewLang = "en";
let previewMethodValue = "3";
let debounceTimer = null;
let selectedLocation = null;
let suggestionRequestId = 0;
let isLoading = false;
let lastCoords = null;

const languageScreen = document.getElementById("languageScreen");
const appScreen = document.getElementById("appScreen");
const settingsModal = document.getElementById("settingsModal");
const settingsBtn = document.getElementById("settingsBtn");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const methodSelect = document.getElementById("methodSelect");

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

const prayerTimesCard = document.getElementById("prayerTimesCard");
const prayerTimesRow = document.getElementById("prayerTimesRow");

const forecastCard = document.getElementById("forecastCard");
const forecastRow = document.getElementById("forecastRow");

// ============================================
// توابع زبان
// ============================================
function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  
  document.documentElement.dir = (lang === "fa" || lang === "ar") ? "rtl" : "ltr";
  document.documentElement.lang = lang;

  document.getElementById("welcomeTitle").textContent = t.welcomeTitle;
  document.getElementById("welcomeSubtitle").textContent = t.welcomeSubtitle;
  document.getElementById("appTitle").textContent = t.appTitle;
  cityInput.placeholder = t.placeholder;
  getWeatherBtn.textContent = t.search;

  document.getElementById("feedbackSummary").textContent = t.feedbackSummary;
  document.getElementById("feedbackDesc").textContent = t.feedbackDesc;
  document.getElementById("labelName").textContent = t.labelName;
  document.getElementById("feedbackName").placeholder = t.placeholderName;
  document.getElementById("labelEmail").textContent = t.labelEmail;
  document.getElementById("labelMessage").textContent = t.labelMessage;
  document.getElementById("feedbackMessage").placeholder = t.placeholderMessage;
  document.getElementById("sendFeedbackBtn").textContent = t.sendFeedback;

  document.getElementById("settingsTitle").textContent = t.settingsTitle;
  document.getElementById("labelLang").textContent = t.labelLang;
  document.getElementById("labelMethod").textContent = t.labelMethod;
  document.getElementById("forecastTitle").textContent = t.forecastTitle;
  document.getElementById("prayerTimesTitle").textContent = t.prayerTimesTitle;
  saveSettingsBtn.textContent = t.saveSettings;
}

function selectInitialLanguage(lang) {
  localStorage.setItem("weatherLang", lang);
  applyLanguage(lang);
  languageScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
}

function previewLanguage(lang) {
  previewLang = lang;
  applyLanguage(lang); 
}

function previewMethod(method) {
  previewMethodValue = method;
}

function saveSettings() {
  currentLang = previewLang;
  currentMethod = previewMethodValue;
  
  localStorage.setItem("weatherLang", currentLang);
  localStorage.setItem("prayerMethod", currentMethod);
  
  settingsModal.classList.add("hidden");
  
  if (!modal.classList.contains("hidden") && lastCoords) {
    fetchPrayerTimes(lastCoords.lat, lastCoords.lon);
  }
}

// ============================================
// توابع کمکی
// ============================================
function formatTemperature(value) {
  if (value == null || !Number.isFinite(Number(value))) return "N/A";
  return `\u2066${Math.round(Number(value))}°\u2069`;
}

function normalizeCityName(value) {
  return value.normalize("NFKC").replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200C/g, " ").replace(/\s+/g, " ").trim();
}

const cityAliases = { "بوشهر": "Bushehr" };

function showMessage(text, isError = true) {
  message.textContent = text;
  message.style.color = isError ? "#d63031" : "#0984e3";
}

function hideSuggestions() { suggestionsBox.classList.add("hidden"); suggestionsBox.innerHTML = ""; }
function openModal() { modal.classList.remove("hidden"); }
function closeModal() { modal.classList.add("hidden"); }

function clearWeather() {
  cityName.textContent = ""; temperature.textContent = ""; description.textContent = "";
  windSpeed.textContent = ""; weatherIcon.innerHTML = "";
  if (feelsLike) feelsLike.textContent = ""; if (cityLocalTime) cityLocalTime.textContent = "";
  if (weatherUpdatedAt) weatherUpdatedAt.textContent = ""; if (humidity) humidity.textContent = "";
  prayerTimesRow.innerHTML = ""; prayerTimesCard.classList.add("hidden");
  forecastRow.innerHTML = ""; forecastCard.classList.add("hidden");
}

function getWeatherDescription(code) {
  return weatherDescriptions[currentLang][code] || "Unknown";
}

function getWeatherEmoji(code) {
  const sun = `<g stroke="#f59e0b" stroke-width="3" stroke-linecap="round"><path d="M32 5v5 M32 46v5 M9 28h5 M50 28h5 M16 12l4 4 M44 40l4 4 M16 44l4-4 M44 16l4-4"/><circle cx="32" cy="28" r="12" fill="#fbbf24"/></g>`;
  const cloud = `<path d="M16 43h33a10 10 0 0 0 0-20 15 15 0 0 0-28-3 12 12 0 0 0-5 23Z" fill="#69c9ff" stroke="#1685cf" stroke-width="2" stroke-linejoin="round"/>`;
  const rain = `<path d="M22 48l-3 7 M34 48l-3 7 M46 48l-3 7" stroke="#2196f3" stroke-width="3" stroke-linecap="round"/>`;
  const snow = `<g fill="#38bdf8"><circle cx="21" cy="52" r="3"/><circle cx="33" cy="56" r="3"/><circle cx="45" cy="52" r="3"/></g>`;
  const fog = `<path d="M12 48h40 M17 54h30 M22 60h20" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>`;
  const lightning = `<path d="M33 39l-8 13h8l-4 11 16-18h-10l5-6Z" fill="#facc15" stroke="#d97706" stroke-width="1.5" stroke-linejoin="round"/>`;
  let drawing;
  if (code === 0) drawing = sun;
  else if (code === 1 || code === 2) drawing = sun + cloud;
  else if (code === 3) drawing = cloud;
  else if (code === 45 || code === 48) drawing = cloud + fog;
  else if ((code >= 71 && code <= 77) || code === 85 || code === 86) drawing = cloud + snow;
  else if ([95, 96, 99].includes(code)) drawing = cloud + lightning;
  else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) drawing = cloud + rain;
  else drawing = cloud;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64" style="display:inline-block;vertical-align:middle">${drawing}</svg>`;
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

async function searchCities(query, count = 10) {
  const normalizedCity = normalizeCityName(query);
  const searchNames = [normalizedCity];
  if (cityAliases[normalizedCity]) searchNames.push(cityAliases[normalizedCity]);

  for (const searchName of searchNames) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchName)}&count=${count}&language=${currentLang}&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    if (data.results?.length) return data.results;
  }
  return [];
}

async function fetchCitySuggestions(query, requestId) {
  if (requestId !== suggestionRequestId || isLoading) return;
  if (normalizeCityName(query).length < 2) { hideSuggestions(); return; }
  try {
    const results = await searchCities(query);
    if (requestId !== suggestionRequestId || isLoading) return;
    const seen = new Set();
    const filtered = results.filter((item) => {
      const isCity = item.feature_code?.startsWith("PPL");
      if (!isCity) return false;
      const key = `${item.name}|${item.country}|${item.admin1 || ""}`;
      if (seen.has(key)) return false;
      seen.add(key); return true;
    });
    if (filtered.length === 0) { hideSuggestions(); return; }
    
    suggestionsBox.innerHTML = "";
    filtered.slice(0, 5).forEach((item) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = buildDisplayName(item);
      div.addEventListener("click", () => {
        selectedLocation = { lat: item.latitude, lon: item.longitude, name: buildDisplayName(item) };
        cityInput.value = item.name;
        hideSuggestions();
        getWeather();
      });
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.classList.remove("hidden");
  } catch {
    if (requestId === suggestionRequestId) hideSuggestions();
  }
}

// ============================================
// دریافت اوقات شرعی
// ============================================
async function fetchPrayerTimes(lat, lon) {
  try {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const dateStr = `${dd}-${mm}-${yyyy}`;

    const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=${currentMethod}`;
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    
    if (data.code !== 200 || !data.data?.timings) return;

    const timings = data.data.timings;
    const t = translations[currentLang];
    const prayerKeys = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    
    prayerTimesRow.innerHTML = "";
    prayerKeys.forEach(key => {
      if (timings[key]) {
        const div = document.createElement("div");
        div.className = "prayer-item";
        div.innerHTML = `<span class="prayer-name">${t.prayers[key]}</span><span class="prayer-time" dir="ltr">${timings[key]}</span>`;
        prayerTimesRow.appendChild(div);
      }
    });
    
    if (prayerTimesRow.children.length > 0) {
      prayerTimesCard.classList.remove("hidden");
    } else {
      prayerTimesCard.classList.add("hidden");
    }
  } catch (e) {
    console.error("Prayer times error:", e);
    prayerTimesCard.classList.add("hidden");
  }
}

function displayForecast(daily) {
  forecastRow.innerHTML = "";
  if (!daily?.time || !daily?.weather_code || !daily?.temperature_2m_max || !daily?.temperature_2m_min) {
    forecastCard.classList.add("hidden"); return;
  }
  const t = translations[currentLang];
  const labels = t.labels;

  for (let i = 1; i <= 3 && i < daily.time.length; i++) {
    const item = document.createElement("div");
    item.className = "forecast-item";
    const maxTemp = formatTemperature(daily.temperature_2m_max[i]);
    const minTemp = formatTemperature(daily.temperature_2m_min[i]);
    const code = daily.weather_code[i];

    item.innerHTML = `
      <div class="fc-emoji">${getWeatherEmoji(code)}</div>
      <div class="fc-description">${getWeatherDescription(code)}</div>
      <div class="fc-hours">${labels[i - 1]}</div>
      <div class="fc-temperatures">
        <div class="fc-temp-min"><span>${minTemp}</span><small>↓ ${currentLang === 'en' ? 'Min' : (currentLang === 'fa' ? 'کمینه' : 'الصغرى')}</small></div>
        <div class="fc-temp-max"><span>${maxTemp}</span><small>↑ ${currentLang === 'en' ? 'Max' : (currentLang === 'fa' ? 'بیشینه' : 'العظمى')}</small></div>
      </div>
    `;
    forecastRow.appendChild(item);
  }
  forecastCard.classList.toggle("hidden", forecastRow.children.length === 0);
}

async function getWeather() {
  if (isLoading) return;
  const city = cityInput.value.trim();
  const t = translations[currentLang];
  if (!city) { showMessage(t.errorEmpty); return; }

  isLoading = true; getWeatherBtn.disabled = true;
  clearTimeout(debounceTimer); suggestionRequestId++;
  showMessage(t.loading, false); clearWeather(); hideSuggestions();

  try {
    let latitude, longitude, displayName;
    if (selectedLocation) {
      latitude = selectedLocation.lat; longitude = selectedLocation.lon; displayName = selectedLocation.name;
    } else {
      const results = await searchCities(city);
      if (results.length === 0) throw new Error(t.errorNotFound);
      const location = results.find((item) => item.feature_code?.startsWith("PPL")) || results[0];
      latitude = location.latitude; longitude = location.longitude; displayName = buildDisplayName(location);
    }

    lastCoords = { lat: latitude, lon: longitude };
    
    // ✅ ذخیره آخرین شهر جستجو شده در حافظه
    localStorage.setItem("lastCity", JSON.stringify({ lat: latitude, lon: longitude, name: displayName }));

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&wind_speed_unit=kmh&timezone=auto&timeformat=unixtime&forecast_days=4`;
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) throw new Error("Network error");

    const weatherData = await weatherRes.json();
    if (!weatherData.current) throw new Error("Data error");

    const current = weatherData.current;
    const code = current.weather_code;

    cityName.textContent = displayName;
    temperature.textContent = formatTemperature(current.temperature_2m);
    
    if (feelsLike) feelsLike.textContent = `${t.feelsLike}: ${formatTemperature(current.apparent_temperature)}`;
    description.textContent = getWeatherDescription(code);
    weatherIcon.innerHTML = getWeatherEmoji(code);

    const rawWindKmh = current.wind_speed_10m;
    if (rawWindKmh == null || !Number.isFinite(Number(rawWindKmh))) {
      windSpeed.textContent = "N/A";
    } else {
      const windKmh = Math.round(Number(rawWindKmh));
      const windMs = (Number(rawWindKmh) / 3.6).toFixed(1);
      windSpeed.innerHTML = `<span>${t.windLabel}</span><span class="wind-values" dir="ltr">${windKmh} km/h <small>(${windMs} m/s)</small></span>`;
    }

    const dateLocale = currentLang === 'fa' ? 'fa-IR' : (currentLang === 'ar' ? 'ar-EG' : 'en-GB');
    const cityTimeFormatter = new Intl.DateTimeFormat(dateLocale, {
      timeZone: weatherData.timezone, year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    });

    if (cityLocalTime) cityLocalTime.textContent = `${t.cityTime}: ${cityTimeFormatter.format(new Date())}`;

    if (weatherUpdatedAt) {
      if (current.time == null) {
        weatherUpdatedAt.textContent = `${t.updatedAt}: N/A`;
      } else {
        const dataTime = new Date(current.time * 1000);
        weatherUpdatedAt.textContent = `${t.updatedAt}: ${cityTimeFormatter.format(dataTime)}`;
      }
    }

    if (humidity) {
      const humidityValue = current.relative_humidity_2m;
      humidity.textContent = humidityValue == null ? `${t.humidity}: N/A` : `${t.humidity}: \u2066${humidityValue}%\u2069`;
    }

    displayForecast(weatherData.daily);
    
    await fetchPrayerTimes(latitude, longitude);

    openModal();
    showMessage("", false);
  } catch (error) {
    showMessage(error.message || "Error");
    closeModal();
  } finally {
    isLoading = false; getWeatherBtn.disabled = false;
  }
}

// ============================================
// رویدادها
// ============================================
getWeatherBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); getWeather(); } });

cityInput.addEventListener("input", () => {
  selectedLocation = null; clearTimeout(debounceTimer); hideSuggestions();
  const requestId = ++suggestionRequestId;
  debounceTimer = setTimeout(() => fetchCitySuggestions(cityInput.value.trim(), requestId), 300);
});

cityInput.addEventListener("blur", () => {
  setTimeout(() => {
    if (document.activeElement === cityInput) return;
    clearTimeout(debounceTimer); suggestionRequestId++; hideSuggestions();
  }, 200);
});

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

settingsBtn.addEventListener("click", () => {
  previewLang = currentLang;
  previewMethodValue = currentMethod;
  methodSelect.value = currentMethod;
  settingsModal.classList.remove("hidden");
});

closeSettingsBtn.addEventListener("click", () => {
  applyLanguage(currentLang);
  settingsModal.classList.add("hidden");
});

saveSettingsBtn.addEventListener("click", saveSettings);

settingsModal.addEventListener("click", (e) => { 
  if (e.target === settingsModal) {
    applyLanguage(currentLang);
    settingsModal.classList.add("hidden"); 
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { 
    closeModal(); 
    hideSuggestions(); 
    applyLanguage(currentLang);
    settingsModal.classList.add("hidden"); 
  }
});

// ============================================
// شروع برنامه
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("weatherLang");
  const savedMethod = localStorage.getItem("prayerMethod");
  
  if (savedMethod) {
    currentMethod = savedMethod;
    previewMethodValue = savedMethod;
    methodSelect.value = savedMethod;
  }

  if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
    previewLang = savedLang;
    applyLanguage(savedLang);
    languageScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");

    // ✅ بررسی آخرین شهر ذخیره شده
    const lastCityStr = localStorage.getItem("lastCity");
    if (lastCityStr) {
      try {
        const lastCity = JSON.parse(lastCityStr);
        if (lastCity && lastCity.lat && lastCity.lon) {
          // پر کردن اینپوت و تنظیم موقعیت
          cityInput.value = lastCity.name;
          selectedLocation = { lat: lastCity.lat, lon: lastCity.lon, name: lastCity.name };
          
          // دریافت خودکار آب و هوا
          getWeather();
        }
      } catch (e) {
        console.error("Error loading last city", e);
      }
    }

  } else {
    languageScreen.classList.remove("hidden");
    appScreen.classList.add("hidden");
  }
});