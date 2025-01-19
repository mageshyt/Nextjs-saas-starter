"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ArrowLeft, HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      
      <Image
        src="/_static/illustrations/rocket-crashed.svg"
        alt="404"
        width={400}
        height={400}
        className="pointer-events-none mb-5 mt-6 dark:invert"
      />
      {/* Text content with gradient */}
      <div className="space-y-3 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
          Lost in Space?
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          The page you&apos;re looking for has drifted into another dimension. Let&apos;s get you back on track.
        </p>
      </div>

      {/* Buttons with hover effects */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          variant="default"
          onClick={() => router.push('/')}
          className="group relative px-6 py-2 text-sm transition-all duration-200 ease-in-out hover:scale-105"
        >
          <div className="relative flex items-center gap-2">
            <HomeIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span>Return Home</span>
          </div>
        </Button>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="group relative px-6 py-2 text-sm transition-all duration-200 ease-in-out hover:scale-105"
        >
          <div className="relative flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Go Back</span>
          </div>
        </Button>
      </div>
    </div>
  );
}