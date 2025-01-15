import { cn } from "@/lib/utils";


interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gap?: string;
  deirection?: "horizontal" | "vertical";
}

export const DottedSeparator = ({
  className = "",
  color = "#d4d4d8",
  height = "2px",
  dotSize = "2px",
  gap = "4px",
  deirection = "horizontal",
}: DottedSeparatorProps) => {
  const isHorizontal = deirection === "horizontal";

  return (
    <div
      className={cn(
        isHorizontal ? "w-full flex items-center" : "h-full flex flex-col items-center",
        className
      )}
    >
      <div className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={{
          width: isHorizontal ? '100%' : height,
          height: isHorizontal ? height : '100%',
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundRepeat: isHorizontal ? 'repeat-x' : 'repeat-y',
          backgroundPosition: "center",
          backgroundSize: isHorizontal ? `${parseInt(dotSize) + parseInt(gap)}px ${height}` : `${height} ${parseInt(dotSize) + parseInt(gap)}px`,

        }}
      />
    </div >
  )

}
