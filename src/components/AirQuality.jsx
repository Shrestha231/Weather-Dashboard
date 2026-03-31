const AirQuality = ({ data }) => {
  if (!data) return null;

  const a = data.air;

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Air Quality</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <p>PM10: {a.hourly.pm10[0]}</p>
        <p>PM2.5: {a.hourly.pm2_5[0]}</p>
        <p>CO: {a.hourly.carbon_monoxide[0]}</p>
        <p>NO2: {a.hourly.nitrogen_dioxide[0]}</p>
        <p>SO2: {a.hourly.sulphur_dioxide[0]}</p>
      </div>
    </div>
  );
};

export default AirQuality;