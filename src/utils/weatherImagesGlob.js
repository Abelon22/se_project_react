const allImages = import.meta.glob("../assets/images/**/*.png", {
  eager: true,
  as: "url",
});

function buildPath(token, time) {
  return `../assets/images/${time}/weather_${token}_time_${time}.png`;
}

const typeToToken = {
  clear: "clear",
  cloudy: "cloud",
  rainy: "rain",
  stormy: "storm",
  snowy: "snow",
};

export function getWeatherImageUrl(type, isDayTime) {
  const time = isDayTime ? "day" : "night";
  const token = typeToToken[type] || "clear";
  const path = buildPath(token, time);
  return allImages[path];
}
