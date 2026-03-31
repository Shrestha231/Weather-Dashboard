import ReactECharts from "echarts-for-react";

const Charts = ({ data }) => {
  if (!data) return null;

  const w = data.weather;
  const a = data.air;

  const time = w.hourly.time.map((t) => t.slice(11, 16));

  const createOption = (title, seriesData) => ({
    title: { text: title },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: time },
    yAxis: { type: "value" },

    dataZoom: [
      { type: "inside" },   // zoom with mouse
      { type: "slider" },   // scroll bar
    ],

    series: [
      {
        data: seriesData,
        type: "line",
        smooth: true,
      },
    ],
  });

  return (
    <div className="space-y-6">

      <ChartBlock title="Temperature" option={createOption("Temperature", w.hourly.temperature_2m)} />

      <ChartBlock title="Humidity" option={createOption("Humidity", w.hourly.relativehumidity_2m)} />

      <ChartBlock title="Rain" option={createOption("Rain", w.hourly.precipitation)} />

      <ChartBlock title="Wind Speed" option={createOption("Wind Speed", w.hourly.windspeed_10m)} />

      <ChartBlock title="PM2.5" option={createOption("PM2.5", a.hourly.pm2_5)} />

    </div>
  );
};

const ChartBlock = ({ option }) => (
  <div className="bg-white p-4 rounded-2xl shadow h-[350px]">
    <ReactECharts option={option} style={{ height: "100%" }} />
  </div>
);

export default Charts;