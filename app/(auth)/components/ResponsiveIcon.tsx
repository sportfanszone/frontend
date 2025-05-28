import { useState, useEffect } from "react";
import type { IconType } from "react-icons";

interface ResponsiveIconProps {
  Icon: IconType;
  className?: string;
}

const ResponsivIcon = ({ Icon, className }: ResponsiveIconProps) => {
  const [strokeWidth, setStrokeWidth] = useState(2);

  useEffect(() => {
    const updateStrokeWidth = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setStrokeWidth(1);
      } else if (width < 768) {
        setStrokeWidth(2);
      } else {
        setStrokeWidth(3);
      }
    };

    updateStrokeWidth();
    window.addEventListener("resize", updateStrokeWidth);
    return () => window.removeEventListener("resize", updateStrokeWidth);
  }, []);
  return <Icon className={className} strokeWidth={strokeWidth} />;
};

export default ResponsivIcon;
