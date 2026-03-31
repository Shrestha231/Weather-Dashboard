import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Charts2 from "../components/Charts2";

const Page2 = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!startDate || !endDate) {
      return alert("Please select both dates");
    }

    setLoading(true);
    setError(null);

    try {
      const lat = 28.61;
      const lon = 77.23;

      const formatDate = (d) => d.toISOString().split("T")[0];

      const [weatherRes, airRes] = await Promise.all([
        axios.get(
          `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formatDate(
            startDate
          )}&end_date=${formatDate(
            endDate
          )}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,windspeed_10m_max,sunrise,sunset`
        ),
        axios.get(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&start_date=${formatDate(
            startDate
          )}&end_date=${formatDate(
            endDate
          )}&hourly=pm10,pm2_5`
        ),
      ]);

      setData({
        weather: weatherRes.data,
        air: airRes.data,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-blue-100 dark:bg-gray-800 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        📊 Weather Analytics (2-Year Data)
      </h1>

      {/* Date Picker */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6 bg-white p-4 rounded-xl shadow">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="p-2 border rounded"
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="p-2 border rounded"
        />

        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {/* Charts */}
      {data && !loading && <Charts2 data={data} />}
    </div>
  );
};

export default Page2;