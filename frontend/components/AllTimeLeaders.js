import React from "react";
import LeaderCard from "./LeaderCard";
import Image from "next/image";

function AllTimeLeaders() {
  return (
    <div className="max-w-7xl mx-auto relative px-8 md:px-16 mt-16 md:mt-36 flex flex-col space-y-6">
      <Image
        src="/home/movie_of_week.png"
        className="object-contain absolute top-1/3"
        width={1000}
        height={1000}
        alt="bg_blur"
      />
      <h1 className="text-3xl md:text-5xl font-bold text-white text-center z-10">
        All Time Leaders
      </h1>

      <p className="text-lightGrey md:text-lg z-10 w-full md:w-2/3 self-center text-center font-medium">
        Most rated and reviewed movies of all time. 1000+ users reviewed and
        rated these movies
      </p>

      <div className="flex space-x-4 px-2 pt-6 pb-2 overflow-x-scroll scrollbar-hidden">
        {/* All Time Leader Card */}
        <LeaderCard
          title="Lord Of The Rings"
          coverImage={"/home/lord_of_the_kings.png"}
          marginTop="mt-2 md:mt-16"
        />
        <LeaderCard
          title="Braveheart"
          coverImage={"/home/brave_heart.png"}
          marginTop="mt-2 md:mt-0"
        />
        <LeaderCard
          title="Godfather"
          coverImage={"/home/godfather.png"}
          marginTop="mt-2 md:mt-16"
        />
        <LeaderCard
          title="Shrek"
          coverImage={"/home/shrek.png"}
          marginTop="mt-2 md:mt-0"
        />
        <LeaderCard
          title="Pulp Fiction"
          coverImage={"/home/pulp_fiction.png"}
          marginTop="mt-2 md:mt-16"
        />
      </div>
    </div>
  );
}

export default AllTimeLeaders;
