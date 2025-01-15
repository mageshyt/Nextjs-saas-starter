import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ProductLabel, ProductPriority, ProductStatus } from "@/types"



  

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        [ProductStatus.todo]: "bg-yellow-100 text-yellow-800",
        [ProductStatus.inProgress]: "bg-blue-100 text-blue-800",
        [ProductStatus.done]: "bg-green-100 text-green-800",
        [ProductStatus.canceled]: "bg-gray-100 text-gray-800",

        [ProductLabel.bug]: "bg-purple-100 text-purple-800",
        [ProductLabel.feature]: "bg-purple-100 text-purple-800",
        [ProductLabel.documentation]: "bg-purple-100 text-purple-800",
        [ProductLabel.enhancement]: "bg-purple-100 text-purple-800",

        [ProductPriority.high]: "bg-red-100 text-red-800",
        [ProductPriority.medium]: "bg-orange-100 text-orange-800",
        [ProductPriority.low]: "bg-green-100 text-green-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
