"use client";

import DirectorMovieCard from "@/components/DirectorMovieCard";
import MovieCard from "@/components/MovieCard";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function MovieDetail({ params: { movieId } }) {
  const [movie, setMovie] = useState();
  const [director, setDirector] = useState();
  const [directorOtherMovies, setDirectorOtherMovies] = useState([]);

  useEffect(() => {
    getMovieDetail(movieId);
  }, []);

  const getMovieDetail = async (movieId) => {
    const response = await fetch("http://localhost:5000/api/movie/" + movieId);
    const json = await response.json();
    setMovie(json);

    await getDirectorDetail(json.director);
  };

  const getDirectorDetail = async (directorId) => {
    const response = await fetch(
      "http://localhost:5000/api/director/" + directorId
    );
    const json = await response.json();
    setDirector(json);

    const otherMovies = json.movies?.filter((m) => m._id != movieId);
    setDirectorOtherMovies(otherMovies);
  };

  return (
    <div className="max-w-[3000px] mx-auto relative">
      {/* Background */}
      <Image
        src={"/movieDetail/movie_detail_bg.png"}
        width={2000}
        height={1000}
        alt="bg_image"
        className="absolute -top-1/4 -z-10 rounded-xl"
      />
      <div className="px-8 md:px-16 mt-10 flex flex-col md:flex-row justify-center items-center md:space-x-12">
        <div>
          <Image
            src={"/movieImagesUpload/" + movie?.coverImage}
            width={330}
            height={500}
            alt="Cover Image"
          />
          <div className="relative h-7 rounded-lg mt-6 mx-1 blur-md">
            <Image
              src={"/movieImagesUpload/" + movie?.coverImage}
              layout="fill"
              alt="Shadow"
            />
          </div>
        </div>

        <div>
          <MovieCard movie={movie} director={director} />
        </div>
      </div>

      <div className="relative mt-36">
        {/* Background - 2 */}
        <Image
          src={"/movieDetail/movie_detail_bg2.png"}
          width={2000}
          height={1000}
          alt="bg_image_2"
          className="absolute -top-10 -z-10"
        />

        <div className="px-8 md:px-16 mt-10 flex flex-col md:flex-row justify-center items-center
           md:space-x-12">
          <div>
            <div className="p-6 w-[350px] h-[450px] max-h-[450px] bg-gradient-to-b from-white/5 to-white/5 border border-white/5 rounded-xl text-white">
              <h1 className="text-3xl font-bold decoration-[5px] decoration-secondaryOrange underline">
                Storyline
              </h1>
              <p className="mt-6 max-h-[330px] overflow-y-scroll scrollbar-hidden">
                {movie?.description}
              </p>
            </div>
            <div className="relative h-7 bg-white/10 rounded-lg mt-7 mx-1 blur-md" />
          </div>

          {/* Movie Image */}
          <div>
            <Image
              src={"/movieImagesUpload/" + movie?.movieImage}
              width={330}
              height={500}
              alt="Movie Image"
              className="rounded-xl mt-10 md:mt-0"
            />
            <div className="relative h-7 rounded-lg mt-6 mx-1 blur-md">
              <Image
                src={"/movieImagesUpload/" + movie?.movieImage}
                layout="fill"
                alt="Shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {directorOtherMovies?.length > 0 && (
        <div className="md:px-16 mb-12 md:mb-0 mt-36 text-white flex flex-col items-center max-w-7xl mx-auto">
          <div className="px-8 md:px-0 flex items-center w-full md:w-2/3">
            <h1 className="text-3xl font-bold flex-1">
              Director's Other Movies
            </h1>
            <div className="flex space-x-2">
              <CircleArrowLeft size={32} className="cursor-pointer" />
              <CircleArrowRight size={32} className="cursor-pointer" />
            </div>
          </div>
          {/* Director Movies Scrollbar */}
          <div className="w-full md:justify-center mb-8 flex space-x-4 md:space-x-8 mt-8 px-4 ml-10 py-5 overflow-x-scroll scrollbar-hidden">
            {directorOtherMovies.map(({_id, title, coverImage}) => (
              <DirectorMovieCard
                key={_id}
                movieId={_id}
                title={title}
                coverImage={coverImage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
