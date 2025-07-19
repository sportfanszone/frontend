import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { FiSearch, FiBell, FiMenu, FiArrowRight, FiPlus } from "react-icons/fi";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import UserAvatar from "@/app/components/ui/UserAvatar";
import ClubsDropdown from "@/app/components/ui/ClubsDropdown";

const CreatePost = ({ user }: { user: User }) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="text-[0.9em] flex items-center justify-between  cursor-pointer">
            <span className="bg-primary sm:bg-transparent text-white sm:text-black rounded-full p-1 flex items-center justify-center ml-2">
              <FiPlus />
            </span>
            <span className="hidden sm:inline text-[0.8em] ">Create</span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-15 h-15 rounded-full overflow-hidden">
                <UserAvatar
                  alt={`${user.firstName} ${user.middleName} ${user.lastName}`}
                  src={user.profileImageUrl}
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              </div>
              <ClubsDropdown />
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="p-2 hover:bg-primary/20 rounded-lg transition-all cursor-pointer">
                  <FiSearch />
                </div>
                <div className="p-2 hover:bg-primary/20 rounded-lg transition-all cursor-pointer">
                  <FiBell />
                </div>
                <div className="p-2 hover:bg-primary/20 rounded-lg transition-all cursor-pointer">
                  <FiMenu />
                </div>
                <div className="p-2 hover:bg-primary/20 rounded-lg transition-all cursor-pointer">
                  <FiArrowRight />
                </div>
              </div>

              <Button
                type="submit"
                className="bg-primary text-white cursor-pointer hover:bg-primary/80 hover:text-white transition-all"
              >
                Post
                <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreatePost;
