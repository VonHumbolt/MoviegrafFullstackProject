"use client"

import WatchListCard from "@/components/WatchListCard";
import { useMovieStore } from "@/store";
import Image from "next/image";
import React from "react";

function WatchingList({modalStyle}) {
  const { movies } = useMovieStore();

  return (
    <div className="max-w-[3000px] 2xl:mx-auto relative mt-6 md:mt-0 mb-36 md:mb-12">
      {/* Background */}
      <Image
        src={"/movieDetail/movie_detail_bg.png"}
        width={2000}
        height={1000}
        alt="bg_image"
        className="absolute top-1/3 md:-top-1/4 -z-10"
      />
      <div className={`flex flex-col ${modalStyle ? modalStyle : "w-2/3 mx-auto"}`}>
        {movies?.map((movie) => (
          <WatchListCard key={movie._id} movie={movie} />
        ))}
      </div>
      
    </div>
  );
}

export default WatchingList;
