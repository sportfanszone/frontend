import { useState } from "react";
import { IconEdit, IconPinned, IconTrash } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import EditClubForm from "@/app/(admin)/components/all_clubs/EditClubForm";
import TogglePinnedClubForm from "@/app/(admin)/components/all_clubs/TogglePinnedClubForm";
import DeleteClubForm from "@/app/(admin)/components/all_clubs/DeleteClubForm";

import { Club } from "@/types";

interface ActionButtonsProps {
  row: Club;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ActionButtons = ({ row, setData }: ActionButtonsProps) => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [dialogType, setDialogType] = useState<
    "edit" | "pin" | "disable" | "delete" | null
  >(null);
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedClub(row);
              setDialogType("edit");
            }}
            className="bg-green-400 hover:bg-green-500 cursor-pointer size-7 flex items-center justify-center rounded-none rounded-tl-lg rounded-bl-lg"
          >
            <IconEdit stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Edit club</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedClub(row);
              setDialogType("pin");
            }}
            className="bg-gray-400 hover:bg-gray-500 cursor-pointer size-7 flex items-center justify-center rounded-none"
          >
            <IconPinned stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Pin club</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedClub(row);
              setDialogType("delete");
            }}
            className="bg-red-500 hover:bg-red-600 cursor-pointer size-7 flex items-center justify-center rounded-none rounded-tr-lg rounded-br-lg"
          >
            <IconTrash stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Delete club</TooltipContent>
      </Tooltip>

      <Dialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <div>
            {dialogType === "edit" ? (
              <EditClubForm setData={setData} club={selectedClub as Club} />
            ) : dialogType === "pin" ? (
              <TogglePinnedClubForm
                club={selectedClub as Club}
                setData={setData}
              />
            ) : dialogType === "delete" ? (
              <DeleteClubForm club={selectedClub as Club} setData={setData} />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
