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
import { League } from "@/types";

interface ToggleLeagueStatusFormProps {
  league: League;
  setData?: React.Dispatch<React.SetStateAction<League[]>>;
}

export default function ToggleLeagueStatusForm({
  league,
  setData,
}: ToggleLeagueStatusFormProps) {
  const [leagueStatus, setLeagueStatus] = useState<boolean>(
    league.pinned ?? false
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
        `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/toggle_pinned_league/${league.id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok || data.status === "success") {
        Toast.fire({
          icon: "success",
          title:
            data.message ||
            `League ${leagueStatus ? "unpinned" : "pinned"} successfully!`,
        });

        if (setData) {
          setData((prevData) =>
            prevData.map((u) =>
              u.id === league.id
                ? {
                    ...u,
                    pinned: !leagueStatus,
                  }
                : u
            )
          );
          setLeagueStatus(!leagueStatus);
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
        title: `Error ${
          leagueStatus ? "unpinning" : "pinning"
        } league. Please try again.`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader className="mb-4 md:mb-6">
        <DialogTitle>
          {leagueStatus ? "Unpin League" : "Pin League"}
        </DialogTitle>
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
        <Button variant="default" type="submit">
          {leagueStatus ? "Unpin League" : "Pin League"}
        </Button>
      </DialogFooter>
    </form>
  );
}
