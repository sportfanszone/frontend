"use client";
import { useState, useEffect } from "react";
import clientFetcher from "@/lib/clientFetcher";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Image from "next/image";

import { Club } from "@/types";

export default function ClubsDropdown() {
  const [activeClub, setActiveClub] = useState("Choose club");
  const [clubs, setClubs] = useState<Club[]>([]);

  const getClubs = async () => {
    const data: { clubs: Club[] } = await clientFetcher(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/get_clubs`,
      "GET"
    );

    setClubs(data?.clubs || []);

    console.log("Clubs:", data);
  };

  useEffect(() => {
    getClubs();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="text-sm font-bold text-primary border-[0.5px] border-primary w-fit rounded-lg hover:bg-primary/20 transition-all cursor-pointer p-2 px-4">
          {activeClub}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Select club</DropdownMenuLabel>

        <DropdownMenuGroup>
          {clubs.map((club, index) => (
            <DropdownMenuItem
              onClick={() => setActiveClub(club.name)}
              key={index}
            >
              <div className="flex justify-start items-center gap-3">
                <Image
                  src={club.logo}
                  width={200}
                  height={200}
                  alt={club.name}
                  className="h-10 w-10 object-cover rounded-full"
                />
                <span className="text-sm">{club.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
