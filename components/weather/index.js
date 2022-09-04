import React, { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./index.module.scss";

export default function Weather({weather}) {
    
 const weatherIcon = weather.weather[0].icon
 const weatherTemperature = weather.main.temp
 const weatherTemperatureText = weather.weather[0].main

  return (
    <div className={styles.weatherContainer}>
      <Image
        src={`https://openweathermap.org/img/wn/${weatherIcon}.png`}
        alt="weather"
        width="24"
        height="24"
      />
      Hamburg / {weatherTemperature}°C {weatherTemperatureText}
      <button className={styles.weatherContainer__button}>
        <i className="aicon-pencil"></i>
      </button>
    </div>
  );
}
  