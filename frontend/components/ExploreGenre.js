import { MoveRightIcon } from "lucide-react";
import React from "react";
import GenreCard from "./GenreCard";

function ExploreGenre() {
  return (
    <div className="max-w-7xl mx-auto px-10 md:px-36 mt-16 md:mt-36 flex flex-col space-y-6">
      <h1 className="text-3xl md:text-6xl font-bold text-white w-fit lg:w-1/2">
        Explore Endless Genres
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center
        space-y-2 md:space-y-0">
        <p className="text-lightGrey text-base md:text-lg font-medium">
          Our categories provide 1000+ movies. Explore and enjoy different types
          movies.
        </p>
        <div className="flex space-x-2 text-lightGrey self-end cursor-pointer">
          <p className="text-sm md:text-base font-semibold underline decoration-2 decoration-secondaryOrange">All Genres</p>
          <MoveRightIcon size={24} />
        </div>
      </div>

      {/* GenreCard */}
      <div className="flex space-x-4 md:space-x-8 px-4 py-5 overflow-x-scroll scrollbar-hidden">
        <GenreCard title="Science Fiction" count={432} coverImage={"/home/interstellar_movie.png"} />
        <GenreCard title="Adventure" count={541} coverImage={"/home/jungle_cruise.png"} />
        <GenreCard title="Sport" count={122} coverImage={"/home/sport_genre.png"} />
        <GenreCard title="Comedy" count={92} coverImage={"/home/comedy_movie.png"} />
      </div>
    </div>
  );
}

export default ExploreGenre;
