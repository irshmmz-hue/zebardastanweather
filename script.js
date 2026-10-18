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
    saveSettings: "Save & Close",
    inviteBtn: "Invite Friends"
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
    saveSettings: "ذخیره و بستن",
    inviteBtn: "دعوت از دوستان"
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
    saveSettings: "حفظ وإغلاق",
    inviteBtn: "دعوة الأصدقاء"
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
  
  const inviteBtn = document.getElementById("inviteBtn");
  if (inviteBtn) inviteBtn.textContent = t.inviteBtn;
}

function selectInitialLanguage(lang) {
  localStorage.setItem("weatherLang", lang);
  applyLanguage(lang);
  languageScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
}

function previewLanguage(lang) {
  previewLang = lang;
  const tempLang = currentLang;
  applyLanguage(lang);
  currentLang = tempLang; 
}

function previewMethod(method) {
  previewMethodValue = method;
}

function saveSettings() {
  currentLang = previewLang;
  currentMethod = previewMethodValue;
  
  localStorage.setItem("weatherLang", currentLang);
  localStorage.setItem("prayerMethod", currentMethod);
  
  applyLanguage(currentLang); 
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
  const sun = `<g stroke="#f59e0b
