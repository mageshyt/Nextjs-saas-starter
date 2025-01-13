import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import ToastProvider from "@/components/providers/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Starter Kit - Build Fast and Modern Apps",
  description:
    "Kickstart your web development with our Next.js Starter Kit. Optimized for performance and scalability, it features pre-configured setups, best practices, and reusable components to streamline your workflow.",
  keywords: [
    "Next.js Starter Kit",
    "Next.js templates",
    "web development",
    "modern web apps",
    "frontend development",
    "React starter kit",
    "scalable web apps",
  ],
  openGraph: {
    title: "Next.js Starter Kit - Build Fast and Modern Apps",
    description:
      "Get a head start on your Next.js projects with our comprehensive Starter Kit. Includes optimized performance, reusable components, and modern design.",
    // TODO: Replace the URL and images with your own
    url: "https://your-nextjs-starter-kit-url.com",
    images: [
      {
        url: "https://your-nextjs-starter-kit-url.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Next.js Starter Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Starter Kit - Build Fast and Modern Apps",
    description:
      "Streamline your web development process with our Next.js Starter Kit. Optimized for speed and scalability with modern design principles.",
    images: ["https://your-nextjs-starter-kit-url.com/twitter-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider >
              <ToastProvider />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html >
    </AuthWrapper>
  );
}
