"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  product: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Dummy data for the chart
const dummyChartData = [
  { month: "January", product: 200 },
  { month: "February", product: 180 },
  { month: "March", product: 220 },
  { month: "April", product: 260 },
  { month: "May", product: 240 },
  { month: "June", product: 280 },
  { month: "July", product: 300 },
  { month: "August", product: 320 },
  { month: "September", product: 290 },
  { month: "October", product: 310 },
  { month: "November", product: 330 },
  { month: "December", product: 350 },
];

// Function to calculate percentage change
function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 100; // Handle division by zero
  return ((current - previous) / previous) * 100;
}

export const SaleHistory = () => {
  const currentMonthIndex = new Date().getMonth();
  const previousMonthIndex =
    currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

  const currentMonthSales =
    dummyChartData[currentMonthIndex]?.product || 0;
  const previousMonthSales =
    dummyChartData[previousMonthIndex]?.product || 0;

  const percentageChange = calculatePercentageChange(
    currentMonthSales,
    previousMonthSales
  );
  const isTrendingUp = percentageChange >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Monthly Sales</CardTitle>
        <CardDescription>
          Showing total sales for the last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={dummyChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" isPrice />}
            />
            <Area
              dataKey="product"
              type="natural"
              fill="var(--color-product)"
              fillOpacity={0.4}
              stroke="var(--color-product)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {isTrendingUp ? "Trending up" : "Trending down"} by{" "}
              {Math.abs(percentageChange).toFixed(1)}% this month
              {isTrendingUp ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - December 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
