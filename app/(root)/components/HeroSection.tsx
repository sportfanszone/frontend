"use client";
import Searchbar from "@/app/components/ui/Searchbar";
import { useState, useEffect } from "react";

import clientFetcher from "@/lib/clientFetcher";

const HeroSection = () => {
  const [sliderImages, setSliderImages] = useState<
    { id: string; url: string }[]
  >([]);

  const sliderImageFetcher = async () => {
    try {
      const response: { data: { id: string; url: string }[] } =
        await clientFetcher(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/slider`,
          "GET"
        );
      return response.data;
    } catch (error) {
      console.error("Error fetching background images:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const images = await sliderImageFetcher();
      setSliderImages(images);
    };
    fetchImages();
  }, []);

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <section className="text-white relative w-full h-[60dvh] overflow-hidden">
      {sliderImages.map((bg, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentBg ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${bg.url})` }}
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
          autoSearch={false}
          className="bg-white text-black rounded-full w-full m-auto flex justify-center items-center mx-auto"
        />
      </div>
    </section>
  );
};

export default HeroSection;
