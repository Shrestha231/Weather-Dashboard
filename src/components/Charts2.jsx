import ReactECharts from "echarts-for-react";

const Charts2 = ({ data }) => {
  const w = data.weather.daily;
  const a = data.air.hourly;

  const dates = w.time;

  const pm25Daily = a.pm2_5.filter((_, i) => i % 24 === 0);
  const pm10Daily = a.pm10.filter((_, i) => i % 24 === 0);

  const convertTime = (t) =>
    new Date(t).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const createOption = (title, series) => ({
    title: { text: title },
    tooltip: { trigger: "axis" },
    legend: {},
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value" },
    dataZoom: [{ type: "inside" }, { type: "slider" }],
    series,
  });

  return (
    <div className="space-y-6">

      {/* Temperature */}
      <Chart
        option={createOption("Temperature", [
          { data: w.temperature_2m_max, type: "line", name: "Max" },
          { data: w.temperature_2m_min, type: "line", name: "Min" },
          { data: w.temperature_2m_mean, type: "line", name: "Mean" },
        ])}
      />

      {/* Precipitation */}
      <Chart
        option={createOption("Precipitation", [
          { data: w.precipitation_sum, type: "bar" },
        ])}
      />

      {/* Wind */}
      <Chart
        option={createOption("Wind Speed", [
          { data: w.windspeed_10m_max, type: "line" },
        ])}
      />

      {/* PM Data */}
      <Chart
        option={createOption("Air Quality", [
          { data: pm25Daily, type: "line", name: "PM2.5" },
          { data: pm10Daily, type: "line", name: "PM10" },
        ])}
      />

      {/* Sunrise Sunset */}
      <Chart
        option={createOption("Sunrise & Sunset (IST)", [
          {
            data: w.sunrise.map(convertTime),
            type: "line",
            name: "Sunrise",
          },
          {
            data: w.sunset.map(convertTime),
            type: "line",
            name: "Sunset",
          },
        ])}
      />

    </div>
  );
};

const Chart = ({ option }) => (
  <div className="bg-white p-4 rounded-2xl shadow h-[350px]">
    <ReactECharts option={option} style={{ height: "100%" }} />
  </div>
);

export default Charts2;