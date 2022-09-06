import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import Modal from "../sharing/modal";
import styles from "./index.module.scss";

export default function Weather() {
  const [weather, setWeather] = useState();
  const [isLoading, setLoading] = useState(false)

  const [schowModal, setSchowModal] = useState(false);

  const [city, setCity] = useState("Hamburg");
  const [weatherIcon, setWeatherIcon] = useState("01n");
  const [weatherTemperature, setWeatherTemperature] = useState("18");
  const [weatherTemperatureText, setWeatherTemperatureTexty] = useState("Clear");

  const cityRef = useRef();

  useEffect(() => {
    setLoading(true)
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false)
      });
  }, []);

  if (isLoading) return <p>Loading...</p>

  console.log(weather);
  return (
    <div className={styles.weatherContainer}>
      <Image
        src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
        alt="weather"
        width="24"
        height="24"
      />
      {city} / {weatherTemperature}°C {weatherTemperatureText}
      <button
        className={styles.weatherContainer__button}
        onClick={() => {
          setSchowModal(true);
        }}
      >
        <i className="aicon-pencil"></i>
      </button>
      <Modal
        onClose={() => {
          setSchowModal(false);
        }}
        schowModal={schowModal}
        modalHeader="Standardort festlegen"
      >
        <div className={styles.weatherContainer__search}>
          <input
            className={styles.weatherContainer__search__input}
            placeholder="Suche"
            ref={cityRef}
          />
          <button
            className={styles.weatherContainer__search__button}
            onClick={() => {
              setCity(cityRef.current.value), setSchowModal(false);
            }}
          >
            <i className="aicon-search"></i>
          </button>
        </div>
      </Modal>
    </div>
  );
}
