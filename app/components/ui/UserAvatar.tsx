import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

type UserAvatarType = {
  alt: string;
  src?: string;
  className?: string;
};

function getColorFromString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
}

const UserAvatar = ({ alt, src, className }: UserAvatarType) => {
  const fallbackColor = getColorFromString(alt);

  return (
    <Avatar>
      <AvatarImage className={className} src={src} />
      <AvatarFallback
        className={className}
        style={{ backgroundColor: fallbackColor, color: "#000" }}
      >
        {alt}
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
