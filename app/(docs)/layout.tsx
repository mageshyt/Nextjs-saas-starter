import Footer from "@/app/(marketing)/components/footer";
import { MaxWidthWrapper } from "@/components/global/max-width-wrapper";
import DocsNavBar from "@/components/docs/navbar";
import { NavMobile } from "@/components/docs/mobile-nav";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex flex-col">
      <NavMobile />
      <DocsNavBar />
      <MaxWidthWrapper className="min-h-screen" large>
        {children}
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}

