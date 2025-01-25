import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";


interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
}

export const DocsPageHeader = ({
  heading,
  text,
  className,
  ...props
}: DocsPageHeaderProps) => {
  return (
    <>
      <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <div className="truncate">Docs</div>
        <ChevronRight className="size-4" />
        <div className="font-medium dark:text-white">
          {heading}
        </div>
      </div>

      <div className={cn("space-y-2", className)} {...props}>
        <h1 className="inline-block scroll-m-20 font-heading text-4xl">
          {heading}
        </h1>
        {text && (
          <p className="text-balance text-lg text-muted-foreground">{text}</p>
        )}
      </div>
    </>
  );
}
