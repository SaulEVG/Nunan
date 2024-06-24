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

export default function LineChartComponentIn(dataForLineChart: {
  lineChartIncome: Record<string, number>;
}) {
  const [data, setData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  const { lineChartIncome } = dataForLineChart;
  useEffect(() => {
    const chartData: ChartData<"line"> = {
      labels: Object.keys(lineChartIncome),
      datasets: [
        {
          label: "Entradas Diarios",
          data: Object.values(lineChartIncome),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    setData(chartData);
  }, [lineChartIncome]);

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
