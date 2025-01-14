import { cn } from "@/lib/utils";
import Navbar from "./navbar";

interface ContentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({ children, className }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className={cn("container mx-auto pt-8 pb-8 px-4", className)}>{children}</div>
    </div>
  );
}
