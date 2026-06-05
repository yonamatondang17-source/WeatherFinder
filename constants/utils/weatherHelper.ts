// constants/utils/weatherHelper.ts

export const getWeatherInfo = (code: number, isDay: number = 1) => {
  const weatherMap: Record<number, { label: string; emoji: string }> = {
    0: { label: "Cerah", emoji: isDay ? "☀️" : "🌙" },
    1: { label: "Sebagian Cerah", emoji: "🌤️" },
    2: { label: "Berawan Sebagian", emoji: "⛅" },
    3: { label: "Mendung", emoji: "☁️" },
    45: { label: "Berkabut", emoji: "🌫️" },
    48: { label: "Kabut Beku", emoji: "🌫️" },
    51: { label: "Gerimis Ringan", emoji: "🌦️" },
    53: { label: "Gerimis", emoji: "🌦️" },
    55: { label: "Gerimis Lebat", emoji: "🌧️" },
    61: { label: "Hujan Ringan", emoji: "🌧️" },
    63: { label: "Hujan", emoji: "🌧️" },
    65: { label: "Hujan Lebat", emoji: "🌧️" },
    71: { label: "Salju Ringan", emoji: "🌨️" },
    73: { label: "Salju", emoji: "❄️" },
    75: { label: "Salju Lebat", emoji: "❄️" },
    77: { label: "Butiran Salju", emoji: "🌨️" },
    80: { label: "Hujan Shower", emoji: "🌦️" },
    81: { label: "Shower Sedang", emoji: "🌧️" },
    82: { label: "Shower Lebat", emoji: "⛈️" },
    95: { label: "Badai Petir", emoji: "⛈️" },
    96: { label: "Petir + Hujan Es", emoji: "⛈️" },
    99: { label: "Petir + Hujan Es Lebat", emoji: "🌩️" },
  };
  return weatherMap[code] || { label: "Tidak Diketahui", emoji: "❓" };
};

export const getWindDirection = (degree: number): string => {
  const directions = ["U", "TL", "T", "TG", "S", "BD", "B", "BL"];
  return directions[Math.round(degree / 45) % 8];
};

export const fetchCoordinates = async (
  cityName: string,
  signal: AbortSignal,
) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=id`;
  const response = await fetch(url, { signal });
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`Kota "${cityName}" tidak ditemukan`);
  }
  return data.results[0];
};

export const fetchWeather = async (
  latitude: number,
  longitude: number,
  signal: AbortSignal,
) => {
  // Tambah precipitation_sum, sunrise, sunset ke daily params
  const daily = [
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "sunrise",
    "sunset",
  ].join(",");

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}&longitude=${longitude}` +
    `&current_weather=true` +
    `&daily=${daily}` +
    `&timezone=auto` +
    `&windspeed_unit=kmh`;

  const response = await fetch(url, { signal });
  const data = await response.json();

  if (!data.current_weather) {
    throw new Error("Data cuaca tidak tersedia");
  }
  return data;
};
