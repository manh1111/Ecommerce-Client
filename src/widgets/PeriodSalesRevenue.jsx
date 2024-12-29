import React from "react";
import Spring from "@components/Spring";
import InfoBtn from "@ui/InfoBtn";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Trend from "@ui/Trend";

// hooks
import { useWindowSize } from "react-use";

// utils
import dayjs from "dayjs";
import { numFormatter } from "@utils/helpers";

const preprocessData = (revenueData) => {
  console.log("revenueData", revenueData);
  return revenueData.map((item, index, arr) => {
    const currentRevenue = item.totalRevenue;
    const previousRevenue = arr[index - 1]?.totalRevenue || currentRevenue;
    const trend =
      ((currentRevenue - previousRevenue) / Math.abs(previousRevenue || 1)) *
      100;

    // If day is provided, use it; otherwise, use the month
    const date = item.day
      ? new Date(new Date().getFullYear(), item.month - 1, item.day) // Include the day
      : new Date(new Date().getFullYear(), item.month - 1); // Only month

    return {
      date,
      value: currentRevenue,
      trend: parseFloat(trend.toFixed(2)),
    };
  });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const labelString = label instanceof Date ? label.toString() : label;

    const isDayData = labelString.includes(" "); 
    const formattedDate = isDayData
      ? dayjs(labelString).format("DD MMM, YYYY") 
      : dayjs(labelString).format("MMM, YYYY"); 

    return (
      <div className="chart-tooltip px-[14px] py-5 flex flex-col">
        <h6>Doanh thu vào:</h6>
        <span className="my-1">{formattedDate}</span>
        <Trend value={payload[0].payload.trend} />
        <span className="h3 mt-2">
          {numFormatter(payload[0].value, 1)}
        </span>
      </div>
    );
  }

  return null;
};

const PeriodSalesRevenue = ({ revenueData }) => {
  const { width } = useWindowSize();
  const data = preprocessData(revenueData);

  return (
    <Spring className="card flex flex-col h-[300px] md:h-[494px] lg:h-[400px] xl:h-full">
      <div className="flex items-center justify-between mb-8">
        <h4>Doanh thu</h4>
        <InfoBtn />
      </div>
      <div className="flex-1 -mt-5 overflow-hidden">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id="area"
                x1="610.509"
                y1="172.326"
                x2="610.509"
                y2="38.1836"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="var(--accent)" stopOpacity="0.01" />
                <stop
                  offset="1"
                  stopColor="var(--accent)"
                  stopOpacity="0.175261"
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              stroke="var(--input-border)"
              strokeOpacity="0.6"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              dy={9}
              hide={width < 768 || (width >= 1024 && width < 1280)}
              tick={{ fill: "var(--header)" }}
              tickFormatter={(value) => {
                return value.getDate() ? dayjs(value).format("DD/MM") : dayjs(value).format("MM/YYYY");
              }}
            />


            <YAxis
              tickLine={false}
              axisLine={false}
              hide={width < 768}
              dx={-20}
              tickFormatter={(value) => numFormatter(value, 0)}
            />
            <Tooltip
              cursor={{ strokeDasharray: "4 4", stroke: "var(--header)" }}
              content={<CustomTooltip />}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--accent)"
              strokeWidth={6}
              strokeLinecap="round"
              fill="url(#area)"
              dot={{
                r: 4,
                fill: "var(--green)",
                stroke: "var(--header)",
                strokeWidth: 1,
                fillOpacity: 1,
              }}
              activeDot={{
                r: 6,
                fill: "var(--green)",
                stroke: "var(--header)",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Spring>
  );
};

export default PeriodSalesRevenue;
