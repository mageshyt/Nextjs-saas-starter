import "@/app/styles/pattern.css";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Layout",
  description: "Auth layout for Next.js Starter Kit",
}



const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen bg-white overflow-hidden text-left">{children}</div>;
};

export default AuthLayout;
