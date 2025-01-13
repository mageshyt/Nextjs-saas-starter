import Navbar from "./navbar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({  children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto pt-8 pb-8 px-4">{children}</div>
    </div>
  );
}
