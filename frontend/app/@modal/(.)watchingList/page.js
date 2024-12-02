"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import WatchingList from "@/app/watchingList/page";
import { useMovieStore } from "@/store";

function WatchingListInterception() {
  const { movies } = useMovieStore();

  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };
  return (
    <Dialog
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) onDismiss();
      }}
    >
      <DialogContent
        className="h-4/5 w-full overflow-y-scroll border-none scrollbar-hidden
      max-w-3xl bg-primaryDark text-white flex flex-col"
      >
        <DialogHeader className="h-fit">
          <DialogTitle className="text-xl">Watching List</DialogTitle>
          <DialogDescription>
            <p className="text-lightGrey">
              Movies in your watching list - {" "}
              <span className="font-semibold underline decoration-2 decoration-secondaryOrange">
                {movies.length} Movies
              </span>
            </p>
          </DialogDescription>
        </DialogHeader>

        <WatchingList modalStyle={"w-full"} />
      </DialogContent>
    </Dialog>
  );
}

export default WatchingListInterception;
