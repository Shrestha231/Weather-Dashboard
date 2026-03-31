import { useEffect, useState } from "react";
import axios from "axios";
import Charts from "../components/Charts";
import WeatherCard from "../components/WeatherCard";
import AirQuality from "../components/AirQuality";

const Page1 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const [weatherRes, airRes] = await Promise.all([
        axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,windspeed_10m_max&current_weather=true`
        ),
        axios.get(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide`
        ),
      ]);

      setData({
        weather: weatherRes.data,
        air: airRes.data,
      });
    });
  }, []);

  if (!data) return <h2>Loading...</h2>;

 return (
  <div className="min-h-screen bg-blue-100 dark:bg-gray-800 text-black dark:text-white p-4">
    <h1 className="text-3xl font-bold text-center mb-6">
      Weather Dashboard
    </h1>

    <div className="max-w-5xl mx-auto">
      <WeatherCard data={data} />
      <AirQuality data={data} />
      <Charts data={data} />
    </div>
  </div>
);
};

export default Page1;