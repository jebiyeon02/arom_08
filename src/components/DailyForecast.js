import React from "react";
import { DailyForecastWrapper, DailyItem } from "./styles/StyledComponents";
import { getWeatherDescription, formatDailyData } from "../utils/weather";

const DailyForecast = ({ weatherData }) => {
  const dailyData = formatDailyData(weatherData);
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <DailyForecastWrapper>
      {dailyData.map((data, idx) => (
        <DailyItem key={idx}>
          <div>
            {`${new Date(data.time).getMonth() + 1}월 ${new Date(
              data.time
            ).getDate()}일 (${days[new Date(data.time).getDay()]})`}
          </div>
          <div>{getWeatherDescription(data.weatherCode)}</div>
          <div>{Math.floor(data.temperature)}°C</div>
        </DailyItem>
      ))}
    </DailyForecastWrapper>
  );
};

export default DailyForecast;
