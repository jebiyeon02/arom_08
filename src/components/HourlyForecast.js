import React from "react";
import { HourlyForecastWrapper, HourlyItem } from "./styles/StyledComponents";
import { getWeatherDescription, formatHourlyData } from "../utils/weather";

const HourlyForecast = ({ weatherData }) => {
  const hourlyData = formatHourlyData(weatherData);

  return (
    <HourlyForecastWrapper>
      {hourlyData.map((data, idx) => (
        <HourlyItem key={idx}>
          <div>
            {new Date(data.time).getHours().toString().padStart(2, "0")}시
          </div>
          <div>{Math.floor(data.temperature)}°C</div>
          {getWeatherDescription(data.weatherCode)}
        </HourlyItem>
      ))}
    </HourlyForecastWrapper>
  );
};

export default HourlyForecast;
