import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Charts from "../components/Charts";
import WeatherCard from "../components/WeatherCard";
import AirQuality from "../components/AirQuality";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const Page1 = () => {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [coords, setCoords] = useState(null);

  // 🔥 FIX: useRef must be declared at top level
  const dateRef = useRef(null);

  // 📍 get location once
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  }, []);

  // 🔄 fetch data when location or date changes
  useEffect(() => {
    if (!coords) return;
    fetchWeather(selectedDate);
  }, [coords, selectedDate]);

  const fetchWeather = async (date) => {
    const { lat, lon } = coords;

    const formatDate = (d) => d.toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    const selected = formatDate(date);

    try {
      let weatherRes;

      // 👉 today → forecast API
      if (selected === today) {
        weatherRes = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true`
        );
      } else {
        // 👉 past → archive API
        weatherRes = await axios.get(
          `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${selected}&end_date=${selected}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`
        );
      }

      const airRes = await axios.get(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide`
      );

      setData({
        weather: weatherRes.data,
        air: airRes.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-blue-100 dark:bg-gray-800 text-black dark:text-white p-4">
      
      <h1 className="text-3xl font-bold text-center mb-6">
        Weather Dashboard
      </h1>

      {/* 📅 Date Picker with Icon */}
      <div className="flex justify-center mb-6 items-center gap-3">

        {/* Hidden DatePicker */}
        <DatePicker
          ref={dateRef}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          maxDate={new Date()}
          popperPlacement="bottom"
          customInput={<div />} // 🔥 important trick
        />

        {/* Custom Button */}
        <button
          onClick={() => dateRef.current?.setOpen(true)}
          className="flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-lg border hover:scale-105 transition"
        >
          <FaCalendarAlt className="text-blue-500" />
          <span>{selectedDate.toDateString()}</span>
        </button>

      </div>

      <div className="max-w-5xl mx-auto">
        <WeatherCard data={data} />
        <AirQuality data={data} />
        <Charts data={data} />
      </div>
    </div>
  );
};

export default Page1;