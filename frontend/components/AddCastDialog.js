import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CirclePlus, Image as ImageIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { useMovieStore } from "@/store";

function AddCastDialog({ updateCasts }) {

  const { user } = useMovieStore();

  const [isOpen, setIsOpen] = useState(true);
  const [castImage, setCastImage] = useState();
  const [castImageFile, setCastImageFile] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const imageRef = useRef();

  const onCastImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCastImageFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCastImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("coverImage", castImageFile);

    const response = await fetch("http://localhost:5000/api/cast/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (json._id) {
      setFirstName("")
      setLastName("")
      setCastImage(null)
      setCastImageFile(null)
      setIsOpen(true);
      updateCasts()
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
          <DialogTitle>Add New Cast</DialogTitle>

          <DialogDescription>
            {castImage ? (
              <div
                className="relative mt-6 w-full h-52 rounded-xl"
                onClick={() => imageRef.current.click()}
              >
                <Image
                  src={castImage}
                  layout="fill"
                  className="object-cover rounded-xl"
                  alt="Cast Image"
                />
              </div>
            ) : (
              <div
                className="mt-6 px-4 h-52 bg-lightGrey rounded-xl flex items-center justify-center
                cursor-pointer"
                onClick={() => imageRef.current.click()}
              >
                <ImageIcon size={72} />
              </div>
            )}
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={onCastImageChange}
            />
            <p className="mx-1 text-sm mt-4 my-1 text-primaryDark">
              First Name
            </p>
            <Input
              type="text"
              placeholder="Robert"
              className="mx-1"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="mx-1 text-sm mt-4 my-1 text-primaryDark">Last Name</p>
            <Input
              type="text"
              placeholder="Downey Jr."
              className="mx-1"
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

export default AddCastDialog;
