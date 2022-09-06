async function handler(req, res) {
  if (req.method === "GET") {
    const defauleEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=Hamburg&units=metric&appid=${process.env.WEATHER_API_KEY}`;
    try {
      const response  = await fetch(defauleEndpoint);

      res.status(200)
      res.end(JSON.stringify(response));

      resolve();

    } catch (error) {
      res.status(500).json({ message: "Getting data failed." });
    }
  }
}

/* export async function getStaticProps() {
  const res = await fetch(defauleEndpoint);
  const weather = await res.json();

  return {
    props: {
      weather,
    },
    revalidate: 7200,
  };
} */

export default handler;
