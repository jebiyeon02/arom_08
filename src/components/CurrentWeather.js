import React from "react";
import {
  CurrentWeatherWrapper,
  Temperature,
  WeatherCode,
} from "./styles/StyledComponents";
import { getWeatherDescription } from "../utils/weather";

const CurrentWeather = ({ weatherData, isLoading }) => {
  if (isLoading) {
    return <div>현재날씨 로딩중...</div>;
  }
  const currentData = weatherData.current;

  return (
    <CurrentWeatherWrapper>
      <h3>현재 위치 : 서울</h3>
      <Temperature>{Math.floor(currentData.temperature2m)}°C</Temperature>
      <WeatherCode>
        {getWeatherDescription(weatherData.current.weatherCode)}
      </WeatherCode>
    </CurrentWeatherWrapper>
  );
};

export default CurrentWeather;
