import { cn } from "@/lib/utils";
import Image from "next/image";

type UserAvatarType = {
  name: string;
  image?: string;
  width?: number;
  height?: number;
  className?: string;
};

const UserAvatar = ({
  name,
  image,
  width = 200,
  height = 200,
  className,
}: UserAvatarType) => {
  const seed = encodeURIComponent(name);
  const url = image || `https://api.dicebear.com/8.x/initials/svg?seed=${seed}`;

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
