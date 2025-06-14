"use client";
import { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import Swal from "sweetalert2";

export default function OtpVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    const res = await fetch("http://localhost:3001/api/auth/verify_otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: code }),
    });

    const data = await res.json();

    if (res.ok && data.status === "success") {
      router.push("/topics");
      Toast.fire({
        icon: "success",
        title: "OTP verified successfully!",
      });
    } else {
      setError(data.message || "Invalid OTP. Please try again.");
    }
  };

  const resendOtp = async () => {
    const res = await fetch("http://localhost:3001/api/auth/resend_otp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok && data.status === "success") {
      setError("");
      setOtp(["", "", "", "", "", ""]);
      Toast.fire({
        icon: "success",
        title: "OTP has been resent to your email.",
      });
    } else {
      setError(data.message || "Failed to resend OTP. Please try again.");
      Toast.fire({
        icon: "error",
        title: "Failed to resend OTP. Please try again.",
      });
    }
  };

  return (
    <main className="p-7 font-medium max-w-400 mx-auto min-h-screen pt-21 sm:pt-27 md:pt-35">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Enter OTP
        </h1>
        <p className="text-sm sm:text-md md:text-lg text-gray-700 mb-6">
          We've sent a 6-digit code to your email. Please enter it below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 sm:gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-10 sm:w-12 md:w-14 h-12 sm:h-14 text-center border border-gray-400 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 font-semibold">{error}</p>
          )}

          <button className="formButton">Verify</button>
        </form>

        <div className="text-sm sm:text-md md:text-lg font-bold mt-6">
          <span>Didn't receive a code? </span>
          <button
            type="button"
            onClick={() => resendOtp()}
            className="text-green-500 cursor-pointer hover:underline"
          >
            Resend
          </button>
        </div>
      </div>
    </main>
  );
}
