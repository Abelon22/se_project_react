export function classifyWeather(weatherArray) {
  const w = weatherArray?.[0];
  if (!w) return "clear";

  const id = Number(w.id) || 800;

  if (id >= 200 && id < 300) return "stormy";
  if (id >= 300 && id < 600) return "rainy";
  if (id >= 600 && id < 700) return "snowy";
  if (id === 800) return "clear";
  if (id >= 801 && id <= 804) return "cloudy";

  return "cloudy";
}
