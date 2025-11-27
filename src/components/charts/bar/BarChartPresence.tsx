// Solución para problemas de tipos con react-apexcharts
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { TimeRange } from '@/hooks/useChartFilters';
import { generateDateLabels } from '@/utils/chartUtils';

interface BarChartPresenceProps {
  timeRange?: TimeRange;
}

export default function BarChartPresence({ timeRange = '7d' }: BarChartPresenceProps) {
  // Function to get filtered data based on time range
  const getFilteredData = () => {
    const categories = generateDateLabels(timeRange);

    switch (timeRange) {
      case '1d':
        return {
          categories,
          presenceData: [12, 8, 15, 22, 18, 10],
          movementData: [8, 5, 10, 15, 12, 6]
        };
      case '7d':
        return {
          categories,
          presenceData: [42, 45, 38, 40, 43, 39, 41],
          movementData: [22, 25, 18, 20, 23, 19, 21]
        };
      case '30d':
        return {
          categories,
          presenceData: [52, 48, 44, 50],
          movementData: [28, 24, 26, 30]
        };
      case '90d':
        return {
          categories,
          presenceData: [48, 44, 46],
          movementData: [28, 24, 26]
        };
      case '1y':
      default:
        return {
          categories,
          presenceData: [45, 52, 38, 48, 42, 35, 30, 38, 44, 50, 48, 46],
          movementData: [25, 28, 22, 26, 24, 20, 18, 22, 26, 30, 28, 26]
        };
    }
  };

  const { categories, presenceData, movementData } = getFilteredData();
  const options: ApexOptions = {
    colors: ["#10B981", "#F59E0B"], // Verde para presencia detectada, amarillo para sin presencia
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
        text: "Presence Detections",
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
          return val + " detections";
        },
      },
    },
  };
  
  const series = [
    {
      name: "Presence Detected",
      data: presenceData,
    },
    {
      name: "Movement Detected", 
      data: movementData,
    },
  ];
  
  return (
    <div className="w-full">
      <div className="mb-2 text-xs text-gray-500">
        Current filter: {timeRange} | Data points: {categories.length}
      </div>
      <div id="chartPresence" className="w-full">
        <ReactApexChart options={options} series={series} type="bar" height={200} />
      </div>
    </div>
  );
}