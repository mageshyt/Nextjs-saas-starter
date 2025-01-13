import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3">
      {/* Left side image */}
      <div className="relative block h-16 lg:hidden pattern-bg"></div>

      {/* Sign-in Form */}
      <div className="h-full lg:flex flex-col items-center justify-center px-4 col-span-2">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold md:text-3xl text-xl text-gray-900">
            Welcome to Next.js Starter Kit 🚀
          </h1>
          <p className="md:text-base text-sm text-[#7E8CA0]">
            Create your account to get started with Next.js Starter Kit. Build your projects, collaborate, and scale faster.
          </p>
        </div>

        {/* Card */}
        <div className="flex items-center justify-center mt-8 col-start-2">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>

      {/* Right side image */}
      <div className="h-full pattern-bg hidden lg:block"></div>
    </div>
  );
}
