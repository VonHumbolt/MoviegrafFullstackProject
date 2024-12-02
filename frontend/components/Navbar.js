"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LogOut, MenuIcon, SearchIcon, TvMinimal } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import SearchCard from "./SearchCard";
import { useMovieStore } from "@/store";
import { useRouter } from "next/navigation";
import MenuDropdown from "./MenuDropdown";

function Navbar() {
  const { movies, user, removeUser, clearMovieStore } = useMovieStore();

  const router = useRouter()

  const [movieList, setMovieList] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  const searchMovie = useDebouncedCallback(async (value) => {
    if (value.trim().length > 0) {
      const response = await fetch(
        "http://localhost:5000/api/movie/search/" + value
      );
      const json = await response.json();
      setMovieList(json);
    } else {
      setMovieList([]);
    }
  }, 2000);

  const clearSearchBar = () => {
    setSearchParam("");
    setMovieList([]);
  };

  const logout = () => {
    removeUser()
    clearMovieStore()
    router.push("/")
  }

  return (
    <div className="py-2 md:py-5 px-5 md:px-10">
      <div
        className="max-w-7xl mx-auto bg-gradient-to-b from-white/5 to-white/5
         shadow-md border border-white/5 rounded-xl py-2 md:py-4 px-4 md:px-8 flex items-center justify-between"
      >
        <Link href={"/"}>
          <div className="flex space-x-2 items-center">
            <Image
              src="/home/app_icon.png"
              width={32}
              height={32}
              alt="app_icon"
            />
            <h1 className="text-white font-bold text-base md:text-xl">
              Moviegraf
            </h1>
          </div>
        </Link>

        <div className="flex md:space-x-4 items-center text-white text-sm">
          <Link href={"/"}>
            <p className="hidden md:flex cursor-pointer">Home</p>
          </Link>
          <Link href={"/"}>
            <p className="hidden md:flex cursor-pointer">Top 250 Movies</p>
          </Link>
          <Link href={"/"}>
            <p className="hidden md:flex cursor-pointer">Best Reviews</p>
          </Link>
          <div
            className="hidden md:flex hover:bg-gradient-to-b from-white/20 to-white/10 rounded-lg hover:border border-white/10
           w-36 hover:w-52 focus:w-52 transform transition-all duration-300 ease-in-out items-center"
          >
            <SearchIcon className="ml-2" size={20} />
            <input
              className="py-1 px-2 text-sm w-full h-full focus:w-52
              rounded-lg bg-transparent placeholder:text-white text-white"
              placeholder="Search Movies"
              onChange={(e) => {
                searchMovie(e.target.value);
                setSearchParam(e.target.value);
              }}
              value={searchParam}
            />
          </div>

          <div
            className="md:hidden hover:bg-gradient-to-b from-white/20 to-white/10 rounded-lg hover:border border-white/10
            mx-4"
          >
            <input
              className="py-1 px-3 md:px-2 text-sm w-full text-center md:text-start focus:text-start
              rounded-lg bg-transparent placeholder:text-white text-white"
              placeholder="Search Movies"
              onChange={(e) => {
                searchMovie(e.target.value);
                setSearchParam(e.target.value);
              }}
              value={searchParam}
            />
          </div>
        </div>

        {Object.keys(user).length > 0 ? (
          <div className="flex md:space-x-4 items-center text-white text-sm">
            <Link href={"/watchingList"}>
              <div className="flex flex-col items-center cursor-pointer relative">
                {movies.length > 0 && (
                  <div className="px-2 py-1 -top-4 right-3 absolute bg-secondaryOrange text-white rounded-full">
                    <p className="text-xs">{movies.length > 9 ? "9+" : movies.length}</p>
                  </div>
                )}
                <TvMinimal size={20} />
                <p className="text-xs text-center">Watching List</p>
              </div>
            </Link>
            
            <div className="hidden md:flex flex-col items-center cursor-pointer"
              onClick={logout}>
              <LogOut size={20} />
              <p className="text-xs">Logout</p>
            </div>
            <MenuDropdown user={user} />
          </div>
        ) : (
          <div className="flex md:space-x-4 items-center text-white text-sm">
            <Link href={"/login"}>
              <p className="hidden md:inline-block text-sm cursor-pointer">Login</p>
            </Link>
            <Link href={"/signup"}>
              <div
                className="hidden md:inline-block bg-gradient-to-b from-white/10 to-white/5 cursor-pointer
                  shadow-md border border-white/10 py-2 px-4 rounded-lg"
              >
                <p className="text-sm">Sign Up</p>
              </div>
            </Link>
            <MenuDropdown user={user} />
          </div>
        )}
      </div>

      {movieList?.length > 0 && (
        <div
          className="w-full md:w-1/2 mx-auto p-6 absolute left-1/2 transform -translate-x-1/2 z-30 
        bg-[#343A40] border border-white/10 rounded-lg max-h-[500px] overflow-y-scroll scrollbar-hidden"
        >
          {movieList?.map((movie) => (
            <SearchCard
              key={movie._id}
              movie={movie}
              clearSearchBar={clearSearchBar}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
