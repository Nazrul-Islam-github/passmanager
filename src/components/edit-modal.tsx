"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit } from "lucide-react";

import EditForm from "./edit-form";
import { LoadPasswordProps } from "./load-password";
export function EditModal(props:LoadPasswordProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-11 w-[50%] " variant="secondary">
          <Edit />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:min-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Password</DialogTitle>
          <DialogDescription>
            Enter the necessary information to update the password and save.
          </DialogDescription>
        </DialogHeader>
        <EditForm {...props} />
      </DialogContent>
    </Dialog>
  );
}
