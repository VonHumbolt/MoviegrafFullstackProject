import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function SearchCard({ movie, clearSearchBar }) {
  return (
    <Link 
      href={{
        pathname: "/movie/" + movie._id,
      }} 
      onClick={clearSearchBar}>
      <div
        className="flex min-h-[120px] items-center space-x-6 bg-gradient-to-b from-white/20 to-white/10
       border border-white/10 p-4 mb-2 text-white rounded-lg cursor-pointer shadow-lg
       hover:shadow-lg hover:scale-105 duration-300 transition-all ease-in-out"
      >
        <Image
          src={"/movieImagesUpload/" + movie.coverImage}
          width={60}
          height={75}
          className="rounded-lg"
        />
        <div className="w-full">
          <div className="flex items-center">
            <h1 className="flex-1 font-semibold text-xl line-clamp-1">{movie.title}</h1>
            <div className="px-2 py-1 rounded-full flex items-center bg-secondaryOrange space-x-1">
              <StarIcon size={16} fill="white" />
              <p className="text-sm font-medium">{movie?.rating}</p>
            </div>
          </div>
          <p className="font-medium text-sm">{movie.publishedYear}</p>
        </div>
      </div>
    </Link>
  );
}

export default SearchCard;
