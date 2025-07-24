import { useState } from "react";
import { IconEdit, IconKey, IconForbid2, IconTrash } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import EditUserForm from "@/app/(admin)/components/all_users/EditUserForm";
import ResetUserPasswordForm from "@/app/(admin)/components/all_users/ResetUserPasswordForm";
import ToggleUserStatusForm from "@/app/(admin)/components/all_users/ToggleUserStatusForm";

import { User } from "@/types";

interface ActionButtonsProps {
  row: any;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ActionButtons = ({ row, setData }: ActionButtonsProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogType, setDialogType] = useState<
    "edit" | "password" | "disable" | "delete" | null
  >(null);
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedUser(row);
              setDialogType("edit");
            }}
            className="bg-green-400 hover:bg-green-500 cursor-pointer size-7 flex items-center justify-center rounded-none rounded-tl-lg rounded-bl-lg"
          >
            <IconEdit stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Edit user</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedUser(row);
              setDialogType("password");
            }}
            className="bg-gray-400 hover:bg-gray-500 cursor-pointer size-7 flex items-center justify-center rounded-none"
          >
            <IconKey stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Edit user password</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedUser(row);
              setDialogType("disable");
            }}
            className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer size-7 flex items-center justify-center rounded-none"
          >
            <IconForbid2 stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Disable user</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            onClick={() => {
              setSelectedUser(row);
              setDialogType("delete");
            }}
            className="bg-red-500 hover:bg-red-600 cursor-pointer size-7 flex items-center justify-center rounded-none rounded-tr-lg rounded-br-lg"
          >
            <IconTrash stroke={3} className="text-white text-4xl" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Delete user</TooltipContent>
      </Tooltip>

      <Dialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <div>
            {dialogType === "edit" ? (
              <EditUserForm setData={setData} user={selectedUser as User} />
            ) : dialogType === "password" ? (
              <ResetUserPasswordForm
                setData={setData}
                user={selectedUser as User}
              />
            ) : dialogType === "disable" ? (
              <ToggleUserStatusForm
                setData={setData}
                user={selectedUser as User}
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionButtons;
