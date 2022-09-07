export default async function handler(req, res) {
  if (req.method === "GET") {
    let endpoint;

    if (req.query.latUser == 0) {
      endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    } else {
      endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.latUser}&lon=${req.query.lonUser}&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    }

    try {
      const response = await fetch(endpoint);
      const weather = await response.json();

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "max-age=180000");
      res.end(JSON.stringify(weather));
    } catch (error) {
      res.status(500).json({ message: "Getting data failed." });
    }
  }
}
