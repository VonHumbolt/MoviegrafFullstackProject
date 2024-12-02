import { useToast } from "@/hooks/use-toast";
import { useMovieStore } from "@/store";
import { MoveRight, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ToastAction } from "./ui/toast";

function WatchListCard({ movie }) {
  const { addMovieToStore, removeMovieFromStore, user } = useMovieStore();
  const { toast } = useToast();

  const removeMovieFromWatchList = async () => {
    const requestBody = {
      userId: user.userId,
      movie,
    };

    const response = await fetch(
      "http://localhost:5000/api/user/removeMovieFromWatchList/",
      {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      }
    );
    const json = await response.json();

    if (json.isSuccess) {
      removeMovieFromStore(movie);
      toast({
        title: "Removed: " + movie.title,
        description: "Movie was removed from the list",
        action: (
          <ToastAction altText="Undo the changes" onClick={addMovieToWatchList}>
            Undo
          </ToastAction>
        ),
      });
    }
  };

  const addMovieToWatchList = async () => {
    const requestBody = {
      userId: user.userId,
      movie
    }

    const response = await fetch("http://localhost:5000/api/user/addMovieToWatchList/", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
    })
    const json = await response.json()
    
    if(json.isSuccess) {
      addMovieToStore(movie)
    }
  }

  return (
    <div
      className="p-4 md:p-6 mb-3 bg-gradient-to-b from-white/10 to-white/5 w-full max-w-5xl mx-auto
        border border-white/10 rounded-xl flex flex-col md:flex-row space-y-4 
        md:space-y-0 md:space-x-6 text-white items-center"
    >
      <Image
        src={"/movieImagesUpload/" + movie?.coverImage}
        width={140}
        height={200}
        alt="Movie Image"
        className="w-fit md:w-[140px]"
      />

      <div className="flex-1 w-full px-5 md:px-0">
        <div className="flex items-center justify-between space-x-2 md:space-x-0">
          <h1 className="text-lg md:text-xl font-bold">{movie?.title}</h1>
          <div className="px-3 py-1 rounded-full flex items-center bg-secondaryOrange space-x-1">
            <StarIcon size={14} fill="white" />
            <p className="text-sm font-semibold">{movie?.rating}</p>
          </div>
        </div>
        <h3 className="text-lightGrey font-semibold mt-1">{movie?.director}</h3>
        <p className="text-lightGrey">{movie?.publishedYear}</p>
        <div
          className="px-3 py-2 bg-gradient-to-b from-white/10 to-white/5 rounded-lg mt-4 md:mt-8
           border-white/5 border text-white text-center md:w-1/2
            hover:bg-secondaryOrange cursor-pointer"
          onClick={removeMovieFromWatchList}
        >
          <p className="font-semibold text-sm">Remove From List</p>
        </div>

        <Link href={"/movie/" + movie?._id}>
          <div className="flex space-x-2 items-center justify-center md:justify-end mt-6 cursor-pointer">
            <p className="text-sm underline decoration-2 decoration-secondaryOrange">
              Movie Detail
            </p>
            <MoveRight size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default WatchListCard;
