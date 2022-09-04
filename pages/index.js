import { Fragment } from "react";
import StartingPage from "../components/startingPage/startingPage";


export default function Home({weather}) {
  return (
    <Fragment>
      <StartingPage weather={weather} />
    </Fragment>
  );
}

const defauleEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=Hamburg&units=metric&appid=${process.env.API_KEY}`;

export async function getStaticProps() {
  const res = await fetch(defauleEndpoint);
  const weather = await res.json();

  return {
    props: {
      weather,
    },
    revalidate: 10800
  };
}