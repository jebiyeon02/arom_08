import React, { useState, useEffect } from "react";
import { Container } from "./components/styles/StyledComponents";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import { fetchWeatherApi } from "openmeteo";

function App() {
  const API_URL =
    "https://api.open-meteo.com/v1/forecast?latitude=37.566&longitude=126.9784&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=Asia%2FTokyo&forecast_days=7";

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchWeather() {
    const params = {
      latitude: 37.566,
      longitude: 126.9784,
      daily: ["weather_code", "temperature_2m_max"],
      hourly: ["temperature_2m", "weather_code"],
      models: "kma_seamless",
      current: ["temperature_2m", "weather_code"],
      timezone: "Asia/Tokyo",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    try {
      const responses = await fetchWeatherApi(url, params);

      const response = responses[0];

      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();
      const latitude = response.latitude();
      const longitude = response.longitude();

      const current = response.current();
      const hourly = response.hourly();
      const daily = response.daily();

      const Data = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature2m: current.variables(0).value(),
          weatherCode: current.variables(1).value(),
        },
        hourly: {
          time: [
            ...Array(
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature2m: hourly.variables(0).valuesArray(),
          weatherCode: hourly.variables(1).valuesArray(),
        },
        daily: {
          time: [
            ...Array(
              (Number(daily.timeEnd()) - Number(daily.time())) /
                daily.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(daily.time()) +
                  i * daily.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          weatherCode: daily.variables(0).valuesArray(),
          temperature2mMax: daily.variables(1).valuesArray(),
        },
      };
      console.log(Data);
      setWeatherData(Data); // 이걸 해줘야 렌더링 가능
      setIsLoading(false); // 로딩 끝났다고 알려주기
    } catch (err) {
      console.log("에러 발생asdasdds:", err);
      setIsLoading(false); // 에러가 나도 로딩은 끝내야 함
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Container>
      <CurrentWeather weatherData={weatherData} isLoading={isLoading} />
      {!isLoading && weatherData && (
        <>
          <HourlyForecast weatherData={weatherData} />
          <DailyForecast weatherData={weatherData} />
        </>
      )}
    </Container>
  );
}

export default App;
