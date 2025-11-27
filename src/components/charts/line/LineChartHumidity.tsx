// Solución para problemas de tipos con react-apexcharts
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { TimeRange } from '@/hooks/useChartFilters';
import { generateDateLabels } from '@/utils/chartUtils';

interface LineChartHumidityProps {
  timeRange?: TimeRange;
}

export default function LineChartHumidity({ timeRange = '7d' }: LineChartHumidityProps) {
  // Function to get filtered data based on time range
  const getFilteredData = () => {
    const categories = generateDateLabels(timeRange);

    switch (timeRange) {
      case '1d':
        return {
          categories,
          maxData: [75, 78, 72, 68, 70, 76],
          minData: [45, 48, 42, 38, 40, 46]
        };
      case '7d':
        return {
          categories,
          maxData: [82, 85, 78, 80, 83, 77, 79],
          minData: [38, 42, 35, 37, 40, 34, 36]
        };
      case '30d':
        return {
          categories,
          maxData: [88, 85, 82, 79],
          minData: [45, 42, 38, 35]
        };
      case '90d':
        return {
          categories,
          maxData: [85, 78, 82],
          minData: [42, 35, 38]
        };
      case '1y':
      default:
        return {
          categories,
          maxData: [85, 88, 82, 79, 75, 70, 68, 72, 78, 82, 86, 89],
          minData: [45, 48, 42, 38, 35, 30, 28, 32, 38, 42, 46, 49]
        };
    }
  };

  const { categories, maxData, minData } = getFilteredData();
  const options: ApexOptions = {
    colors: ["#1E40AF", "#3B82F6"], // Azul oscuro para humedad máxima, azul claro para mínima
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line", // Cambio a gráfico de líneas
      height: 200, // Aumentar ligeramente para equilibrar con temperatura
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth", // Líneas suaves para crear efecto de onda
      width: [3, 3], // Grosor de las líneas
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    markers: {
      size: 0, // Sin marcadores para efecto más suave
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      labels: {
        colors: ["#374151"],
      },
    },
    yaxis: {
      title: {
        text: "Humidity (%)",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      y: {
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
  };
  const series = [
    {
      name: "Maximum Humidity (%)",
      data: maxData,
    },
    {
      name: "Minimum Humidity (%)",
      data: minData,
    },
  ];
  return (
    <div className="w-full">
      <div className="mb-2 text-xs text-gray-500">
        Current filter: {timeRange} | Data points: {categories.length}
      </div>
      <div id="chartOne" className="w-full">
        <ReactApexChart options={options} series={series} type="area" height={200} />
      </div>
    </div>
  );
}
