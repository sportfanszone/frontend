"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function BackButton() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="grid place-items-center w-10 h-10 bg-gray-200 rounded-full"
    >
      <FiArrowLeft className="text-2xl cursor-pointer" />
    </div>
  );
}
