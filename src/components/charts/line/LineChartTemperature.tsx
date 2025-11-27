import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { TimeRange } from '@/hooks/useChartFilters';
import { generateDateLabels } from '@/utils/chartUtils';

interface LineChartTemperatureProps {
  timeRange?: TimeRange;
}

export default function LineChartTemperature({ timeRange = '7d' }: LineChartTemperatureProps) {
  // Function to get filtered data based on time range
  const getFilteredData = () => {
    const categories = generateDateLabels(timeRange);
    
    switch (timeRange) {
      case '1d':
        return {
          categories,
          maxData: [18, 16, 22, 28, 26, 20],
          minData: [12, 10, 16, 22, 20, 14]
        };
      case '7d':
        return {
          categories,
          maxData: [22, 24, 26, 25, 23, 28, 27],
          minData: [8, 10, 12, 11, 9, 14, 13]
        };
      case '30d':
        return {
          categories,
          maxData: [28, 32, 30, 26],
          minData: [15, 19, 17, 13]
        };
      case '90d':
        return {
          categories,
          maxData: [25, 30, 28],
          minData: [12, 17, 15]
        };
      case '1y':
      default:
        return {
          categories,
          maxData: [15, 18, 22, 25, 30, 35, 38, 36, 32, 25, 20, 16],
          minData: [2, 4, 8, 12, 16, 20, 22, 21, 17, 12, 7, 3]
        };
    }
  };

  const { categories, maxData, minData } = getFilteredData();

  const options: ApexOptions = {
    legend: {
      show: true, // Mostrar leyenda para distinguir temperaturas
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: ["#374151"], // Color de texto de la leyenda
      },
    },
    colors: ["#EF4444", "#3B82F6"], // Rojo para temperatura máxima, azul para mínima
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 220, // Reducir altura para hacer más compacto
      type: "line", // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: "straight", // Define the line style (straight, smooth, or step)
      width: [2, 2], // Line width for each dataset
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: "#fff", // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    tooltip: {
      enabled: true, // Enable tooltip
      shared: true,
      intersect: false,
      y: {
        formatter: function (val: number) {
          return val + "°C";
        },
      },
    },
    xaxis: {
      type: "category", // Category-based x-axis
      categories: categories,
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", // Adjust font size for y-axis labels
          colors: ["#6B7280"], // Color of the labels
        },
      },
      title: {
        text: "Temperature (°C)", // Título del eje Y para temperatura
        style: {
          fontSize: "10px",
          color: "#6B7280",
        },
      },
    },
  };

  const series = [
    {
      name: "Maximum Temperature (°C)",
      data: maxData,
    },
    {
      name: "Minimum Temperature (°C)",
      data: minData,
    },
  ];
  return (
    <div className="w-full">
      <div className="mb-2 text-xs text-gray-500">
        Current filter: {timeRange} | Data points: {categories.length}
      </div>
      <div id="chartEight" className="w-full">
        <ReactApexChart options={options} series={series} type="area" height={220} />
      </div>
    </div>
  );
}
