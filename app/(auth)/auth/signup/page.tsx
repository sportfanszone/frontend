"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ResponsiveIcon from "@/app/(auth)/components/ResponsiveIcon";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="p-7 font-medium max-w-400 mx-auto min-h-screen pt-21 sm:pt-27 md:pt-35">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-7 md:mb-10">
          Sign up
        </h1>

        {/* Google button */}
        <div className="googleButtonContainer">
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
        <div className="flex items-center justify-center gap-4 mb-6 sm:mb-7 md:mb-10">
          <hr className="border-b w-full border-black/20" />
          <span className="md:text-lg">or</span>
          <hr className="border-b w-full border-black/20" />
        </div>

        {/* Form */}
        <form action="">
          <div className="formGroup">
            <label className="formLabel" htmlFor="firstName">
              First Name
            </label>
            <input
              className="formInput"
              id="firstName"
              type="text"
              placeholder="Your First Name"
            />
          </div>
          <div className="formGroup">
            <label className="formLabel" htmlFor="middleName">
              Middle Name
            </label>
            <input
              className="formInput"
              id="middleName"
              type="text"
              placeholder="Your Middle Name"
            />
          </div>
          <div className="formGroup">
            <label className="formLabel" htmlFor="username">
              Username
            </label>
            <input
              className="formInput"
              id="username"
              type="text"
              placeholder="Your Eamil"
            />
          </div>
          <div className="formGroup">
            <label className="formLabel" htmlFor="email">
              Email
            </label>
            <input
              className="formInput"
              id="email"
              type="text"
              placeholder="Your Eamil"
            />
          </div>
          <div className="formGroup flex items-center justify-between">
            <label className="formLabel" htmlFor="password">
              Password
            </label>
            <input
              className="formInput"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
            />
            <button
              className="formInputIcon"
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <ResponsiveIcon Icon={FiEye} className="text-inherit" />
              ) : (
                <ResponsiveIcon Icon={FiEyeOff} className="text-inherit" />
              )}
            </button>
          </div>
          <div className="formGroup flex items-center justify-between">
            <label className="formLabel" htmlFor="password">
              Confirm Password
            </label>
            <input
              className="formInput"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Your Password"
            />
            <button
              className="formInputIcon"
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <ResponsiveIcon Icon={FiEye} className="text-inherit" />
              ) : (
                <ResponsiveIcon Icon={FiEyeOff} className="text-inherit" />
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
              className="w-5 h-5 accent-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
            />
            <span className="text-sm sm:text-md md:text-lg">
              Accept{" "}
              <Link className="text-green-500" href="#">
                terms and conditions
              </Link>
            </span>
          </label>

          <button className="formButton">Sign Up</button>
        </form>

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
