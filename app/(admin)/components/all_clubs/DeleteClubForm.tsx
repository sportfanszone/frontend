"use client";
import { Button } from "@/app/components/ui/button";
import {
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import UserAvatar from "@/app/components/ui/UserAvatar";

import Swal from "sweetalert2";
import { Club } from "@/types";

interface DeleteClubFormProps {
  club: Club;
  setData?: React.Dispatch<React.SetStateAction<Club[]>>;
}

export default function DeleteClubForm({ club, setData }: DeleteClubFormProps) {
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
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/delete_club/${club.id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok || data.status === "success") {
        Toast.fire({
          icon: "success",
          title: data.message || "Club deleted successfully!",
        });

        if (setData) {
          setData((prevData) => prevData.filter((u) => u.id !== club.id));
        }
      } else {
        if (data.message) {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
      }
    } catch {
      Toast.fire({
        icon: "error",
        title: "Error deleting club. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader className="mb-4 md:mb-6">
        <DialogTitle>Delete Club</DialogTitle>
      </DialogHeader>
      <div className="flex items-center gap-2 my-2 mb-4">
        <UserAvatar
          src={club.logo}
          alt={club.name?.[0] || ""}
          className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
        />
        <p className="text-sm text-black/50 font-medium">{club.name}</p>
      </div>

      <DialogFooter className="mt-2 sm:mt-3 md:mt-4">
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" type="submit">
          Delete Club
        </Button>
      </DialogFooter>
    </form>
  );
}
