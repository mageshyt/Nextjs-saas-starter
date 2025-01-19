import Footer from "./components/footer";
import Navbar from "./components/navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Navbar />
      <main className='mt-4 mx-auto p-4 flex-1'>{children}</main>
      <Footer />
    </>
  );
}
