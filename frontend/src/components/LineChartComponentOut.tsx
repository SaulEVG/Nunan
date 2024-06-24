import {
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CategoryScale
);

export default function LineChartComponentOut(dataForLineChart: {
  lineChartIncome: Record<string, number>;
}) {
  const [data, setData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { lineChartIncome } = dataForLineChart;
    const chartData: ChartData<"line"> = {
      labels: Object.keys(lineChartIncome),
      datasets: [
        {
          label: "Gastos Diarios",
          data: Object.values(lineChartIncome).map((value) => {
            return -value;
          }),
          borderColor: "rgb(170, 50, 50)",
          tension: 0.1,
        },
      ],
    };
    setData(chartData);
  }, [dataForLineChart]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: "category",
      },
    },
    plugins: {},
  };
  return <Line data={data} options={options} />;
}
