import {
  WiThermometer,
  WiHumidity,
  WiSunrise,
  WiSunset,
  WiStrongWind,
  WiRain,
  WiDaySunny,
} from "react-icons/wi";

const WeatherCard = ({ data }) => {
  if (!data || !data.weather) return null;

  const w = data.weather;

  // 🔥 HANDLE BOTH APIs (IMPORTANT)
  const temp =
    w.current_weather?.temperature ??
    w.daily?.temperature_2m_max?.[0];

  const wind =
    w.current_weather?.windspeed ??
    w.daily?.windspeed_10m_max?.[0];

  const humidity = w.hourly?.relativehumidity_2m?.[0];
  const rain = w.hourly?.precipitation?.[0];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">
        Weather Details
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-200">

        <p className="flex items-center gap-2">
          <WiThermometer size={24} /> {temp ?? "--"}°C
        </p>

        <p className="flex items-center gap-2">
          <WiThermometer size={24} /> Min: {w.daily?.temperature_2m_min?.[0] ?? "--"}°C
        </p>

        <p className="flex items-center gap-2">
          <WiThermometer size={24} /> Max: {w.daily?.temperature_2m_max?.[0] ?? "--"}°C
        </p>

        <p className="flex items-center gap-2">
          <WiHumidity size={24} /> {humidity ?? "--"}%
        </p>

        <p className="flex items-center gap-2">
          <WiRain size={24} /> {rain ?? "--"}
        </p>

        <p className="flex items-center gap-2">
          <WiStrongWind size={24} /> {wind ?? "--"} km/h
        </p>

        <p className="flex items-center gap-2">
          <WiDaySunny size={24} /> UV: {w.daily?.uv_index_max?.[0] ?? "--"}
        </p>

        <p className="flex items-center gap-2">
          <WiSunrise size={24} />{" "}
          {w.daily?.sunrise?.[0]?.slice(11, 16) ?? "--"}
        </p>

        <p className="flex items-center gap-2">
          <WiSunset size={24} />{" "}
          {w.daily?.sunset?.[0]?.slice(11, 16) ?? "--"}
        </p>

        <p className="flex items-center gap-2">
          <WiRain size={24} /> Rain %:{" "}
          {w.daily?.precipitation_probability_max?.[0] ?? "--"}%
        </p>

      </div>
    </div>
  );
};

export default WeatherCard;