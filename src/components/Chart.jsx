import React, { PureComponent } from "react";
import { useSelector } from "react-redux";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const WeatherDaily = useSelector((state) => state.weatherDaily);

  const data = [
    WeatherDaily?.list.map((el) => {
      return { name: el.dt_txt, "°C": el.main.temp - 273 };
    }),
  ];
  console.log(data);
  return (
    <>
      {data && (
        <ResponsiveContainer width="80%" height="100%">
          <AreaChart
            className="pt-5 ps-5"
            width={500}
            height={400}
            data={WeatherDaily?.list
              .filter((el, i) => i % 8 === 0)
              .map((el) => {
                return { name: el.dt_txt, "°C": el.main.temp - 273 };
              })}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="°C"
              stroke="#b02215"
              fill="#b02215"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default Chart;
