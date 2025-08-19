"use client";
import Searchbar from "@/app/components/ui/Searchbar";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const backgrounds = [
    "/images/heroBackground.jpg",
    "/images/ligue1BackgroundImage.png",
    "/images/arsenalBackgroundImage.png",
    "/images/postImage1.jpg",
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section className="text-white relative w-full h-[60dvh] overflow-hidden">
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentBg ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}
      <div className="w-full h-screen bg-black/70 absolute top-0 left-0"></div>
      <div className="w-full absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center px-10">
        <h1 className="font-extrabold text-5xl md:text-6xl mb-5">
          made for sport lovers
        </h1>
        <p className="mb-6 max-w-100 sm:max-w-full mx-auto text-sm md:text-lg font-light">
          Browse top listings, discover hidden gems, and move in with confidence
        </p>
        <Searchbar
          color="primary"
          className="bg-white text-black rounded-full w-full m-auto flex justify-center items-center mx-auto"
        />
      </div>
    </section>
  );
};

export default HeroSection;
