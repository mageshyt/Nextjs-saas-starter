import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="grid min-h-screen overflow-hidden grid-cols-1 lg:grid-cols-3">
      {/* image */}
      <div className="pattern-bg relative block h-16 lg:hidden   "></div>
      {/* sign-in */}
      <div className="col-span-2 h-full flex-col items-center justify-center px-4 lg:flex">
        <div className="space-y-4 pt-16 text-center">
          <h1 className="text-muted-[#2E2A47] text-3xl font-bold dark:text-white">
            Welcome to NestJs Starter Kit 🚀
          </h1>
          <p className="text-base  text-[#7E8CA0]">
            Login to your account to get started
          </p>
        </div>
        {/* card */}
        <div className="col-start-2 mt-8 flex items-center justify-center">
          <ClerkLoaded>
            <SignIn path="/sign-in" forceRedirectUrl={"/dashboard"} />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>

      {/* image */}
      <div className="pattern-bg hidden h-full lg:block "></div>
    </div>
  );
}
