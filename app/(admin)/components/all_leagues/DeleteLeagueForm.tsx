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
import { League } from "@/types";

interface DeleteLeagueFormProps {
  league: League;
  setData?: React.Dispatch<React.SetStateAction<League[]>>;
}

export default function DeleteLeagueForm({
  league,
  setData,
}: DeleteLeagueFormProps) {
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
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/delete_league/${league.id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok || data.status === "success") {
        Toast.fire({
          icon: "success",
          title: data.message || "League deleted successfully!",
        });

        if (setData) {
          setData((prevData) => prevData.filter((u) => u.id !== league.id));
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
        title: "Error deleting league. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader className="mb-4 md:mb-6">
        <DialogTitle>Delete League</DialogTitle>
      </DialogHeader>
      <div className="flex items-center gap-2 my-2 mb-4">
        <UserAvatar
          src={league.logo}
          alt={league.name?.[0] || ""}
          className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
        />
        <p className="text-sm text-black/50 font-medium">{league.name}</p>
      </div>

      <DialogFooter className="mt-2 sm:mt-3 md:mt-4">
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" type="submit">
          Delete League
        </Button>
      </DialogFooter>
    </form>
  );
}
