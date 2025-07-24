"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import UserAvatar from "@/app/components/ui/UserAvatar";

import Swal from "sweetalert2";
import { User } from "@/types";

interface ToggleUserStatusFormProps {
  user: User;
  setData?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ToggleUserStatusForm({
  user,
  setData,
}: ToggleUserStatusFormProps) {
  const [userStatus, setUserStatus] = useState<string>(
    user.status === "active" ? "active" : "blocked"
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/toggle_user_status/${user.id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok || data.status === "success") {
        Toast.fire({
          icon: "success",
          title: data.message || "Password reset successfully!",
        });

        if (setData) {
          setData((prevData) =>
            prevData.map((u) =>
              u.id === user.id
                ? {
                    ...u,
                    status: u.status === "active" ? "blocked" : "active",
                  }
                : u
            )
          );
          setUserStatus((prevData) =>
            prevData === "active" ? "blocked" : "active"
          );
        }
      } else {
        if (data.message) {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: `Error ${
          user.status === "active" ? "Disabl" : "Enabl"
        }ing user. Please try again.`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader className="mb-4 md:mb-6">
        <DialogTitle>
          {userStatus === "active" ? "Disable User" : "Enable User"}
        </DialogTitle>
      </DialogHeader>
      <div className="flex items-center gap-2 my-2 mb-4">
        <UserAvatar
          src={user.profileImageUrl}
          alt={`${user.firstName?.[0]}${user.lastName?.[0]}`}
          className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
        />
        <p className="text-sm text-black/50 font-medium">
          {user.firstName} {user.middleName} {user.lastName}
        </p>
      </div>

      <DialogFooter className="mt-2 sm:mt-3 md:mt-4">
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button variant="default" type="submit">
          {userStatus === "active" ? "Disable User" : "Enable User"}
        </Button>
      </DialogFooter>
    </form>
  );
}
