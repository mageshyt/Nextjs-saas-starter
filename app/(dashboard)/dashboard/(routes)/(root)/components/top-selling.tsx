"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { formatPrice } from "@/utils/format";

const chartConfig = {
  product: {
    label: "product",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface TopSellingProps {
  products: {
    productName: string;
    earnings: number;
  }[];
}

export const TopSelling = ({ products }: TopSellingProps) => {
  // Get the top 5 products
  const topSellingProducts = products?.slice(0, 5);
  const totalEarnings =
    products?.reduce((acc, product) => acc + product.earnings, 0) || 0;

  // Get the top-selling product
  const topProduct = topSellingProducts?.[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>
          {products.length} products, total earnings: {formatPrice(totalEarnings)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={topSellingProducts}>
            <XAxis dataKey="productName" />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent isPrice indicator="line" />}
            />
            <Bar dataKey="earnings" fill="var(--color-product)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Top-selling product: {topProduct?.productName} -{" "}
          {formatPrice(topProduct?.earnings || 0)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top 5 products
        </div>
      </CardFooter>
    </Card>
  );
};
