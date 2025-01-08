import Navbar from "./components/navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Navbar/>
      <main className='mx-auto mt-4 p-4 flex-1 overflow-hidden'>{children}</main>
    </>
  );
}
