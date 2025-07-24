"use client";
import { Button } from "@/app/components/ui/button";
import { DialogFooter, DialogClose } from "@/app/components/ui/dialog";
import UserAvatar from "@/app/components/ui/UserAvatar";

import Swal from "sweetalert2";
import { User } from "@/types";

interface ResetUserPasswordFormProps {
  user: User;
  setData?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ResetUserPasswordForm({
  user,
  setData,
}: ResetUserPasswordFormProps) {
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
      <div className="flex items-center gap-2 my-2 mb-4">
        <UserAvatar
          src={user.profileImageUrl}
          alt={`${user.firstName}${user.middleName}${user.lastName}`}
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
          {user.status === "active" ? "Disable" : "Enable"}
        </Button>
      </DialogFooter>
    </form>
  );
}
