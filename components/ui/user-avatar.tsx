import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  imageUrl: string | undefined;
  alt: string;
  className?: string;
  fallback?: string;
  fallbackStyle?: string;
}
const UserAvatar: FC<UserAvatarProps> = ({
  imageUrl,
  alt,
  className,
  fallback,
  fallbackStyle,
}) => {
  return (
    <Avatar className={cn("w-10 h-10 select-none", className)}>
      <AvatarImage src={imageUrl} alt={alt} />
      <AvatarFallback
        className={cn(
          " font-semibold uppercase  text-neutral-200  bg-black  dark:bg-white dark:text-black ",
          fallbackStyle
        )}
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
