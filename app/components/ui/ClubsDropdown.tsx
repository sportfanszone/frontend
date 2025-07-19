"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Image from "next/image";

export default function ClubsDropdown() {
  const [activeClub, setActiveClub] = useState("Choose club");

  const clubs = [
    { id: 1, name: "Chelsea", logo: "/images/chelsea.png" },
    { id: 2, name: "Arsenal", logo: "/images/arsenalLogo.png" },
    { id: 3, name: "Liverpool", logo: "/images/liverpool.png" },
    { id: 4, name: "Manchester City", logo: "/images/manchesterCityLogo.png" },
    { id: 5, name: "Manchester United", logo: "/images/manchesterUnited.png" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="text-sm font-bold text-primary border-[0.5px] border-primary w-fit rounded-lg hover:bg-primary/20 transition-all cursor-pointer p-2 px-4">
          {activeClub}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{activeClub}</DropdownMenuLabel>
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
