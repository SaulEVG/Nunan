import { Pie } from "react-chartjs-2";
import {
  ArcElement,
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";

Chart.register(ArcElement, Tooltip, Legend, Title);

const PieChartComponentIn = (dataForPieChart: {
  pieChartoutIncome: Record<string, number>;
}) => {
  const [data, setData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const { pieChartoutIncome } = dataForPieChart;
    const chartData: ChartData<"pie"> = {
      labels: Object.keys(pieChartoutIncome),
      datasets: [
        {
          data: Object.values(pieChartoutIncome),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setData(chartData);
  }, [dataForPieChart]);

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      title: {
        text: "Graficos de Entradas",
        position: "top",
        display: true,
        color: "rgba(255, 159, 64, 1)",
        fullSize: true,
      },
      legend: {
        display: false,
        position: "bottom",
      },
      tooltip: { enabled: true },
    },
  };
  return <Pie data={data} options={options} />;
};

export default PieChartComponentIn;
