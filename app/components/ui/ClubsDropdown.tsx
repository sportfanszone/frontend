"use client";
import { useState, useEffect } from "react";
import clientFetcher from "@/lib/clientFetcher";
import { Club } from "@/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Image from "next/image";

export default function ClubsDropdown({
  value,
  handleChange,
}: {
  value?: string;
  handleChange?: (value: string) => void;
}) {
  const [activeClub, setActiveClub] = useState("Choose club");
  const [clubs, setClubs] = useState<Club[]>([]);

  const getClubs = async () => {
    const data: { clubs: Club[] } = await clientFetcher(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/get_clubs`,
      "GET"
    );

    setClubs(data?.clubs || []);
  };

  useEffect(() => {
    getClubs();
  }, []);

  const handleClubChange = (clubName: string, clubId: string) => {
    setActiveClub(clubName);
    handleChange?.(clubId);
  };

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
          {clubs.length > 0 ? (
            clubs.map((club, index) => (
              <DropdownMenuItem
                onClick={() => handleClubChange(club.name, club.id.toString())}
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
            ))
          ) : (
            <DropdownMenuItem disabled>No clubs available</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
