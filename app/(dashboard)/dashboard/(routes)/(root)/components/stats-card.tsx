
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string | number
  title: string
  description?: string
  icon?: LucideIcon
}
const StatCard = ({ value, title, description, icon: Icon }: StatCardProps) => {
  return (
    <Card className='lg:w-[20rem]  w-full dark:bg-zinc-950'>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {Icon && <Icon className="size-6" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export default StatCard
