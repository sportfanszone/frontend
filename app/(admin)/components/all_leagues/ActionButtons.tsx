import { useState } from "react";
import { IconEdit, IconPinned, IconTrash } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import EditLeagueForm from "@/app/(admin)/components/all_leagues/EditLeagueForm";
import TogglePinnedLeagueForm from "@/app/(admin)/components/all_leagues/TogglePinnedLeagueForm";
import ResetUserPasswordForm from "@/app/(admin)/components/all_users/ResetUserPasswordForm";
import ToggleUserStatusForm from "@/app/(admin)/components/all_users/ToggleUserStatusForm";
import DeleteUserForm from "@/app/(admin)/components/all_users/DeleteUserForm";

import { League } from "@/types";

interface ActionButtonsProps {
  row: any;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ActionButtons = ({ row, setData }: ActionButtonsProps) => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [dialogType, setDialogType] = useState<
    "edit" | "pin" | "disable" | "delete" | null
  >(null);
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedLeague(row);
              setDialogType("edit");
            }}
            className="bg-green-400 hover:bg-green-500 cursor-pointer size-7 flex items-center justify-center rounded-none rounded-tl-lg rounded-bl-lg"
          >
            <IconEdit stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Edit league</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedLeague(row);
              setDialogType("pin");
            }}
            className="bg-gray-400 hover:bg-gray-500 cursor-pointer size-7 flex items-center justify-center rounded-none"
          >
            <IconPinned stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Pin league</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedLeague(row);
              setDialogType("delete");
            }}
            className="bg-red-500 hover:bg-red-600 cursor-pointer size-7 flex items-center justify-center rounded-none rounded-tr-lg rounded-br-lg"
          >
            <IconTrash stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Delete league</TooltipContent>
      </Tooltip>

      <Dialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <div>
            {dialogType === "edit" ? (
              <EditLeagueForm
                setData={setData}
                league={selectedLeague as League}
              />
            ) : dialogType === "pin" ? (
              <TogglePinnedLeagueForm
                league={selectedLeague as League}
                setData={setData}
              />
            ) : dialogType === "delete" ? (
              // <DeleteUserForm setData={setData} user={selectedLeague as User} />
              <></>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
