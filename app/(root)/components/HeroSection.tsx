import { FiSearch } from "react-icons/fi";

const HeroSection = () => {
  return (
    <section className="text-white relative bg-[url('/images/heroBackground.jpg')] bg-cover bg-center w-full h-screen ">
      <div className="w-full h-screen bg-black/70 absolute top-0 left-0"></div>
      <div className="w-full absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center">
        <h1 className="font-semibold text-6xl mb-5">find your dream home</h1>
        <p className="mb-5">
          Browse top listings, discover hidden gems, and move in with confidence
        </p>
        <div className="bg-white text-black rounded-full w-fit m-auto flex justify-center items-center">
          <input
            className="py-3.5 px-4 w-160 outline-none"
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
