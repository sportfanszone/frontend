import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import UserAvatar from "@/app/components/ui/UserAvatar";

export default function ClubsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="text-sm font-bold text-primary border-[0.5px] border-primary w-fit rounded-lg hover:bg-primary/20 transition-all cursor-pointer p-2 px-4">
          Choose club
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Choose club</DropdownMenuLabel>
        <DropdownMenuGroup>
          {[...Array(5)].map((_, index) => (
            <DropdownMenuItem>
              <div className="flex flex-col justify-center">
                <div className="flex justify-start items-center gap-3">
                  <UserAvatar
                    width={200}
                    height={200}
                    alt="Avatar"
                    className="h-10 w-10 object-cover rounded-full"
                  />
                  <span className="text-sm">@username</span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
