import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMovieStore } from "@/store";

function AddDirectorDialog({updateDirectors}) {
  const { user } = useMovieStore();

  const [isOpen, setIsOpen] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = async () => {
    const data = {
      firstName,
      lastName,
    };

    const response = await fetch("http://localhost:5000/api/director/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

    const json = await response.json()

    if(json._id) {
        setIsOpen(true)
        updateDirectors()
    }
  };

  return (
    <Dialog
      open={!isOpen}
      onOpenChange={(open) => {
        setIsOpen(!open);
      }}
    >
      <DialogTrigger>
        <CirclePlus className="cursor-pointer" size={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Director</DialogTitle>

          <DialogDescription>
            <p className="text-sm mt-6 my-1 text-primaryDark">First Name</p>
            <Input
              type="text"
              placeholder="Quentin"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="text-sm mt-4 my-1 text-primaryDark">Last Name</p>
            <Input
              type="text"
              placeholder="Tarantino"
              onChange={(e) => setLastName(e.target.value)}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="mt-4 bg-secondaryOrange hover:bg-primaryDark w-1/3"
            onClick={onSubmit}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDirectorDialog;
