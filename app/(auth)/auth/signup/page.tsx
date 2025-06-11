"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ResponsiveIcon from "@/app/(auth)/components/ResponsiveIcon";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    tremsAndConditions: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    console.log(form);
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok || data.status === "success") {
      router.push("/auth/otp");
    } else {
      const data = await res.json();
      // setDefaultResultOrder(data.error)
    }
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
        <form onSubmit={handleLogin}>
          <div className="formGroup">
            <label className="formLabel" htmlFor="firstName">
              First Name
            </label>
            <input
              className="formInput"
              id="firstName"
              type="text"
              placeholder="Your First Name"
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              value={form.firstName}
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
              onChange={(e) => setForm({ ...form, middleName: e.target.value })}
              value={form.middleName}
            />
          </div>
          <div className="formGroup">
            <label className="formLabel" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="formInput"
              id="lastName"
              type="text"
              placeholder="Your Middle Name"
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              value={form.lastName}
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
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              value={form.username}
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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
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
            <label className="formLabel" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              className="formInput"
              id="passwordConfirm"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Your Password"
              onChange={(e) =>
                setForm({ ...form, passwordConfirm: e.target.value })
              }
              value={form.passwordConfirm}
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
              onChange={(e) =>
                setForm({ ...form, tremsAndConditions: e.target.value })
              }
              value={form.tremsAndConditions}
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
