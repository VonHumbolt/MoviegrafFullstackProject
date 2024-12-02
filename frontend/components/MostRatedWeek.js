import { UsersIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import RatedMovieCard from "./RatedMovieCard";
import Link from "next/link";

function MostRatedWeek() {
  return (
    <div className="px-8 md:px-16 mt-16 md:mt-36 items-center flex flex-col space-y-6 relative">
      <Image
        src="/home/movie_of_week.png"
        className="object-contain absolute top-1/3"
        width={2000}
        height={1000}
        alt="bg_blur"
      />
      <h1 className="text-3xl md:text-5xl font-bold w-full md:w-1/2 2xl:w-1/3 text-white text-center z-10">
        The Most Rated Movies Of The Week
      </h1>

      <p className="text-lightGrey md:text-lg z-10 w-full md:w-2/3 2xl:w-1/3 text-center font-medium">
        Watch, comment and rate the movies. Read other audience’s reviews and
        create your personal watching list.
      </p>

      <div className="flex flex-col md:flex-row md:space-x-16 z-10 md:py-12">
        <RatedMovieCard
          title="Star Wars"
          director="George Lucas"
          count={986}
          coverImage={"/home/star_wars.png"}
          cardStyle={"bg-gradient-to-b from-white/10 to-white/5 mt-2 md:mt-16"}
        />
        <Link href={"/movie/6737943e61fa7f3887681be6"}>
          <RatedMovieCard
            title="Indiana Jones"
            director="Steven Spielberg"
            count={1232}
            coverImage={"/home/indiana_jones.png"}
            cardStyle={"bg-gradient-to-b from-white/20 to-white/10 mt-8 md:mt-0"}
          />
        </Link>
        <RatedMovieCard
          title="Back To Future"
          director="Robert Zerneckis"
          count={648}
          coverImage={"/home/backto_future.png"}
          cardStyle={"bg-gradient-to-b from-white/20 to-white/10 mt-8 md:mt-16"}
        />
      </div>
    </div>
  );
}

export default MostRatedWeek;
