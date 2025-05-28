"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="p-7 font-medium max-w-400 mx-auto min-h-screen pt-35">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-7 sm:mb-8 md:mb-10">
          Sign up
        </h1>

        {/* Google button */}
        <div className="flex items-center justify-center gap-4 mx-auto px-4 py-3 sm:py-4 md:py-5 rounded-full border-2 border-black/20 hover:border-gray-500 transition-all duration-200 cursor-pointer  mb-7 sm:mb-8 md:mb-10">
          <Image
            className="width-6 h-6 sm:w-6 sm:h-6 md:w-7.5 md:h-7.5"
            src="/svgs/google-icon-logo.svg"
            alt="Google logo"
            width={25}
            height={25}
          />
          <span className="text-sm sm:text-md md:text-lg font-bold">
            Continue with Google
          </span>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4  mb-7 sm:mb-8 md:mb-10">
          <hr className="border-b w-full border-black/20" />
          <span className="md:text-lg">or</span>
          <hr className="border-b w-full border-black/20" />
        </div>

        {/* Form */}
        <form action="">
          <div className="border-2 border-black/20 rounded-full relative bg-black/3 mb-5 sm:mb-6 md:mb-8.5">
            <label
              className="text-sm sm:text-md md:text-lg font-bold absolute top-0 left-4 md:left-7 -translate-y-[50%]"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="text-xs sm:text-md md:text-lg w-full p-3 sm:p-3 md:p-4 outline-none bg-transparent"
              id="firstName"
              type="text"
              placeholder="Your First Name"
            />
          </div>
          <div className="border-2 border-black/20 rounded-full relative bg-black/3 mb-5 sm:mb-6 md:mb-8.5">
            <label
              className="text-sm sm:text-md md:text-lg font-bold absolute top-0 left-4 md:left-7 -translate-y-[50%]"
              htmlFor="middleName"
            >
              Middle Name
            </label>
            <input
              className="text-xs sm:text-md md:text-lg w-full p-3 sm:p-3 md:p-4 outline-none bg-transparent"
              id="middleName"
              type="text"
              placeholder="Your Middle Name"
            />
          </div>
          <div className="border-2 border-black/20 rounded-full relative bg-black/3 mb-5 sm:mb-6 md:mb-8.5">
            <label
              className="text-sm sm:text-md md:text-lg font-bold absolute top-0 left-4 md:left-7 -translate-y-[50%]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="text-xs sm:text-md md:text-lg w-full p-3 sm:p-3 md:p-4 outline-none bg-transparent"
              id="username"
              type="text"
              placeholder="Your Eamil"
            />
          </div>
          <div className="border-2 border-black/20 rounded-full relative bg-black/3 mb-5 sm:mb-6 md:mb-8.5">
            <label
              className="text-sm sm:text-md md:text-lg font-bold absolute top-0 left-4 md:left-7 -translate-y-[50%]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="text-xs sm:text-md md:text-lg w-full p-3 sm:p-3 md:p-4 outline-none bg-transparent"
              id="email"
              type="text"
              placeholder="Your Eamil"
            />
          </div>
          <div className="flex items-center justify-between border-2 border-black/20 rounded-full relative bg-black/3 mb-5 sm:mb-6 md:mb-8.5">
            <label
              className="text-sm sm:text-md md:text-lg font-bold absolute top-0 left-4 md:left-7 -translate-y-[50%]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="text-xs sm:text-md md:text-lg w-full p-3 sm:p-3 md:p-4 outline-none bg-transparent"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
            />
            <button
              className="text-xl font-bold p-2 mr-2 cursor-pointer"
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <FiEye strokeWidth={3} />
              ) : (
                <FiEyeOff strokeWidth={3} />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between border-2 border-black/20 rounded-full relative bg-black/3 mb-5 sm:mb-6 md:mb-8.5">
            <label
              className="text-sm sm:text-md md:text-lg font-bold absolute top-0 left-4 md:left-7 -translate-y-[50%]"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="text-xs sm:text-md md:text-lg w-full p-3 sm:p-3 md:p-4 outline-none bg-transparent"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Your Password"
            />
            <button
              className="text-xl font-bold p-2 mr-2 cursor-pointer"
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <FiEye strokeWidth={3} />
              ) : (
                <FiEyeOff strokeWidth={3} />
              )}
            </button>
          </div>

          <label
            htmlFor="rememberMe"
            className="font-bold text-center mb-6 flex items-center justify-center gap-2 cursor-pointer text-sm text-gray-700"
          >
            <input
              id="rememberMe"
              type="checkbox"
              className="w-5 h-5 accent-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="text-sm sm:text-md md:text-lg">
              Accept{" "}
              <Link className="text-green-500" href="#">
                terms and conditions
              </Link>
            </span>
          </label>
        </form>

        <button className="text-white flex items-center justify-center gap-4 w-full mx-auto p-3 sm:p-3 md:p-4 rounded-full bg-green-500 transition-all duration-200 cursor-pointer  mb-7 sm:mb-8 md:mb-10">
          <span className="text-sm sm:text-md md:text-lg font-bold">
            Sign Up
          </span>
        </button>

        <div className="text-sm sm:text-md md:text-lg font-bold flex items-center justify-center gap-4 mb-6">
          <span>Already have an account?</span>

          <Link className="text-green-500" href="/auth/login">
            Login Now
          </Link>
        </div>
      </div>
    </main>
  );
}
