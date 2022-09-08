import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import Modal from "../sharing/modal";
import styles from "./index.module.scss";

export default function Weather() {
  const [isLoading, setLoading] = useState(false);
  const [schowModal, setSchowModal] = useState(false);

  const [weatherIcon, setWeatherIcon] = useState();
  const [userCity, setUserCity] = useState();
  const [weatherTemparature, setWeatherTemparature] = useState();
  const [weatherTemparatureText, setWeatherTemparatureText] = useState();

  const cityRef = useRef();

  useEffect(() => {
    setLoading(true);
    if (typeof window !== 'undefined')  {
      let USER_CITY = localStorage.getItem("USER_CITY");
      if (USER_CITY === null) {
        navigator.geolocation.getCurrentPosition(function (position) {
           getWeatherData(
            position.coords.latitude,
            position.coords.longitude,
            "Hamburg"
          ); 
        });
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const USER_CITY = localStorage.getItem("USER_CITY");
    const WEATHER_ICON = localStorage.getItem("WEATHER_ICON");
    const WEATHER_TEMPARATURE = localStorage.getItem("WEATHER_TEMPARATURE");
    const WEATHER_TEMPARATURE_TEXT = localStorage.getItem("WEATHER_TEMPARATURE_TEXT");

    if (USER_CITY !== null) {
      setUserCity(JSON.parse(USER_CITY));
      setWeatherIcon(JSON.parse(WEATHER_ICON));
      setWeatherTemparature(JSON.parse(WEATHER_TEMPARATURE));
      setWeatherTemparatureText(JSON.parse(WEATHER_TEMPARATURE_TEXT));
    }
  }, []);

  const changeCityName = (cityName) => {
    setLoading(true);
    getWeatherData(0, 0, cityName);
    setSchowModal(false);
    setLoading(false);
  };
 
  const getWeatherData = (latUser, lonUser, city) => {
    fetch(`${process.env.ABSOLUT_URL}/api/weather?` +
        new URLSearchParams({
          city: city,
          latUser: latUser,
          lonUser: lonUser,
        }))
      .then((res) => res.json())
      .then((data) => {
        if (data.weather) {
        setWeatherIcon(data.weather[0].icon);
        setUserCity(data.name);
        setWeatherTemparature(data.main.temp);
        setWeatherTemparatureText(data.weather[0].main);
      }
      if (typeof window !== 'undefined' && data.weather){
          localStorage.setItem("USER_CITY", JSON.stringify(data.name));
          localStorage.setItem(
            "WEATHER_ICON",
            JSON.stringify(data.weather[0].icon)
          );
          localStorage.setItem(
            "WEATHER_TEMPARATURE",
            JSON.stringify(data.main.temp)
          );
          localStorage.setItem(
            "WEATHER_TEMPARATURE_TEXT",
            JSON.stringify(data.weather[0].main)
          );
        }
      })
  };

  if (isLoading || !weatherIcon) {
    getWeatherData();
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.weatherContainer}>
      <Image
        src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
        alt="weather"
        width="24"
        height="24"
        priority="true"
      />
      <span className={styles.weatherContainer__city}>{userCity}</span> /{" "}
      {Math.round(weatherTemparature)}°C {weatherTemparatureText}
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
              changeCityName(cityRef.current.value);
            }}
          >
            <i className="aicon-search"></i>
          </button>
        </div>
      </Modal>
    </div>
  );
}
