
"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { FC } from "react";
import ClientWrapper from "../wrapper/client-wrapper";

interface LogoProps {
  height?: number;
  width?: number;
  mode?: "light" | "dark";
}

const Logo: FC<LogoProps> = ({ height = 26, width = 26, mode }) => {
  const { theme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark" || mode === "dark" || theme === "dark";


  const logo = isDark ? "/logo.svg" : "/logo.svg";

  return (
    <ClientWrapper>
      <Image
        height={height}
        width={width}
        src={logo}
        alt="Logo"
      />
    </ClientWrapper>
  );
};

export default Logo;
