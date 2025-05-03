import { FiSearch } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section className="text-white relative bg-[url('/images/heroBackground.jpg')] bg-cover bg-center w-full h-screen">
      <div className="w-full h-screen bg-black/70 absolute top-0 left-0"></div>
      <div className="w-full absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center px-10">
        <h1 className="font-semibold text-5xl md:text-6xl mb-5">
          find your dream home
        </h1>
        <p className="mb-6 max-w-100 sm:max-w-full mx-auto text-sm md:text-lg font-light">
          Browse top listings, discover hidden gems, and move in with confidence
        </p>
        <div className="bg-white text-black rounded-full w-fit m-auto flex justify-center items-center mx-auto">
          <input
            className="py-3.5 px-4 sm:w-100 md:w-160 outline-none"
            type="text"
            placeholder="Search your interest"
          />
          <button className="bg-[tomato] text-white p-2.5 mr-1 rounded-full cursor-pointer">
            <FiSearch className="size-5.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
