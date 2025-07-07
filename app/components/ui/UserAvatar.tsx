import { cn } from "@/lib/utils";
import Image from "next/image";

type UserAvatarType = {
  alt: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
};

const UserAvatar = ({
  alt,
  src,
  width = 200,
  height = 200,
  className,
}: UserAvatarType) => {
  const seed = encodeURIComponent(alt);
  const url = src || `https://api.dicebear.com/8.x/initials/svg?seed=${seed}`;

  return (
    <Image
      src={url}
      alt="Profile Photo"
      width={width}
      height={height}
      className={cn("object-cover", className)}
    />
  );
};
export default UserAvatar;
