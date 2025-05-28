"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="p-10 font-medium max-w-400 mx-auto min-h-screen pt-35">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-semibold mb-10">Welcome Back</h1>

        {/* Google button */}
        <div className="flex items-center justify-center gap-4 mx-auto px-20 py-5 rounded-full border-2 border-black/20 hover:border-gray-500 transition-all duration-200 cursor-pointer mb-10">
          <Image
            src="/svgs/google-icon-logo.svg"
            alt="Google logo"
            width={25}
            height={25}
          />
          <span className="text-lg font-bold">Login with Google</span>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <hr className="border-b w-full border-black/20" />
          <span>or</span>
          <hr className="border-b w-full border-black/20" />
        </div>

        {/* Form */}
        <form action="">
          <div className="border-2 border-black/20 rounded-full relative bg-black/5 mb-8.5">
            <label
              className="text-lg font-bold absolute top-0 left-7 -translate-y-[50%]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-4 outline-none bg-transparent"
              id="email"
              type="email"
              placeholder="Your Eamil"
            />
          </div>
          <div className="flex items-center justify-between border-2 border-black/20 rounded-full relative bg-black/5 mb-8.5">
            <label
              className="text-lg font-bold absolute top-0 left-7 -translate-y-[50%]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-4 outline-none bg-transparent"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your Eamil"
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

          <div className="font-bold flex items-center justify-between mb-6">
            <label
              htmlFor="rememberMe"
              className="flex items-center space-x-2 cursor-pointer text-sm text-gray-700"
            >
              <input
                id="rememberMe"
                type="checkbox"
                className="w-5 h-5 accent-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-lg">Remember me</span>
            </label>

            <Link className="text-lg text-green-500" href="#">
              Forgot Password
            </Link>
          </div>
        </form>

        <button className="text-white flex items-center justify-center gap-4 w-full mx-auto p-4 rounded-full bg-green-500 transition-all duration-200 cursor-pointer mb-10">
          <span className="text-lg font-bold">Login</span>
        </button>

        <div className="font-bold flex items-center justify-center gap-4 mb-6">
          <span>Don't have an account?</span>

          <Link className="text-green-500" href="/auth/signup">
            Sign Up Now
          </Link>
        </div>
      </div>
    </main>
  );
}
