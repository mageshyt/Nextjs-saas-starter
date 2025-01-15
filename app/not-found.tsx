'use client';

import { Button } from '@/components/ui/button';
import { HomeIcon, ArrowLeft, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -left-1/4 -bottom-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-lg w-full">
        <div className="relative">
          {/* Main content */}
          <div className="text-center space-y-6">
            {/* 404 with animated compass */}
            <div className="relative inline-block">
              <Compass className="w-32 h-32 mx-auto text-primary animate-[spin_4s_linear_infinite]" />
              <h1 className="text-8xl font-black text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                404
              </h1>
            </div>

            {/* Text content with gradient */}
            <div className="space-y-3 mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                Lost in Space?
              </h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                The page you're looking for has drifted into another dimension. Let's get you back on track.
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
        </div>

        {/* Footer text */}
        <p className="text-muted-foreground/60 text-sm text-center mt-12">
          Don't worry, even the best explorers get lost sometimes.
        </p>
      </div>
    </div>
  );
}
