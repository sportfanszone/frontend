"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import * as motion from "motion/react-client";
import { Club } from "@/types";
import formatRelativeTime from "@/lib/formatRelativeTime";
import { useState } from "react";
import Swal from "sweetalert2";

const ClubCard = ({
  club: {
    id,
    name,
    topicCount,
    lastAccess,
    description,
    logo,
    backgroundImage,
    followedByUser,
  },
}: {
  club: Club;
}) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isMember, setIsMember] = useState(followedByUser);

  const handleToggleMembership = async () => {
    setIsJoining(true);
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
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/toggle_club/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { status, message, followed } = await res.json();

      if (res.ok && status === "success") {
        setIsMember(followed);
        Toast.fire({
          icon: "success",
          title: message || "Success!",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: message || "Failed to toggle like",
        });
      }
    } catch (err: any) {
      console.error("Error toggling like:", err);
      Toast.fire({
        icon: "error",
        title: "Error toggling like",
      });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-card hover:shadow-card-active hover:scale-102 rounded-3xl p-4 sm:p-6 w-10 max-w-sm min-w-[16rem] sm:min-w-[20rem] cursor-pointer transition-all duration-150 ease-in-out mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/topics/?club=${id}`}>
        <div
          className="mb-4 shadow-card rounded-3xl px-4 py-5 sm:px-5 sm:py-6 text-white bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <h1 className="font-bold text-lg sm:text-xl truncate">{name}</h1>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex flex-col justify-center">
            <span className="text-gray-500 text-xs sm:text-sm mb-1">
              TOPICS
            </span>
            <span className="font-bold text-base sm:text-lg">{topicCount}</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-gray-500 text-xs sm:text-sm mb-1">
              LAST ACTIVITY
            </span>
            <span className="font-bold text-base sm:text-lg">
              {formatRelativeTime(lastAccess)}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center mb-4">
          <span className="text-gray-500 text-xs sm:text-sm mb-1">
            DESCRIPTION
          </span>
          <div className="flex justify-start items-center gap-3">
            <Image
              src={logo}
              width={40}
              height={40}
              alt="Club logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-cover rounded-full flex-shrink-0"
            />
            <span className="text-xs sm:text-sm line-clamp-3">
              {description}
            </span>
          </div>
        </div>
      </Link>

      <Button
        className={`w-full ${
          isMember
            ? "text-blue-700 bg-transparent border-2 border-blue-700 hover:text-white hover:bg-blue-700"
            : "text-white bg-blue-700 hover:bg-blue-700"
        } py-2 px-4 rounded-xl transition-colors duration-200 text-sm sm:text-base font-medium`}
        onClick={handleToggleMembership}
        disabled={isJoining}
      >
        {isJoining
          ? isMember
            ? "Unfollowing..."
            : "Following..."
          : isMember
          ? "Unfollow"
          : "Follow"}
      </Button>
    </motion.div>
  );
};

export default ClubCard;
