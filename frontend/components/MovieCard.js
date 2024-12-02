"use client"
import { CakeIcon, ClockIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Separator } from './ui/separator'
import { useMovieStore } from '@/store'

function MovieCard({movie, director}) {

  const {addMovieToStore, removeMovieFromStore, user} = useMovieStore()

  const [isMovieInWatchList, setIsMovieInWatchList] = useState(false)

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
      setIsMovieInWatchList(true)
      movie.director = director.firstName + " " + director.lastName
      addMovieToStore(movie)
    }
    else
      setIsMovieInWatchList(false)
  }

  const removeMovieFromWatchList = async () => {
    const requestBody = {
      userId: user.userId,
      movie
    }

    const response = await fetch("http://localhost:5000/api/user/removeMovieFromWatchList/", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
    })
    const json = await response.json()
    
    if(json.isSuccess) {
      setIsMovieInWatchList(false)
      removeMovieFromStore(movie)
    }
    else
      setIsMovieInWatchList(true)
  }

  return (
    <div>
        <div className="mt-12 md:mt-0 p-6 w-[350px] min-h-[380px] bg-gradient-to-b from-white/10 to-white/5 border border-white/5 rounded-t-xl text-white">
            <div className="flex justify-between">
              <h1 className="flex-1 text-3xl font-bold line-clamp-1">{movie?.title}</h1>
              <div className="px-3 py-1 rounded-full flex items-center bg-secondaryOrange space-x-1">
                <StarIcon size={16} fill="white" />
                <p className="text-base font-semibold">{movie?.rating}</p>
              </div>
            </div>

            <h3 className="mt-2 mb-4 text-lg text-lightGrey font-semibold">
              {director?.firstName + " " + director?.lastName}
            </h3>

            <Separator className="bg-lightGrey" />

            <div className="my-5 flex items-center justify-start space-x-12">
              <div className="flex space-x-2 items-center font-bold">
                <ClockIcon size={24} />
                <p>{movie?.duration}</p>
              </div>
              <div className="flex space-x-2 items-center font-bold">
                <CakeIcon size={24} />
                <p>{movie?.publishedYear}</p>
              </div>
            </div>

            <Separator className="bg-lightGrey" />

            <div className="w-full py-5 flex items-center space-x-2">
              {movie?.genres?.map((genre) => (
                <div
                  key={genre._id}
                  className="px-2 py-1 border-2 text-sm border-secondaryPurple rounded-lg line-clamp-1"
                >
                  {genre.genreName}
                </div>
              ))}
            </div>
            
            <Separator className="bg-lightGrey"/>

            <div className="mt-5 space-y-3">
              {movie?.casts?.map((cast) => (
                <div key={cast._id} className="flex items-center space-x-2">
                  <div className="w-11 h-11 relative rounded-full">
                    <Image
                      src={"/movieImagesUpload/" + cast.photo}
                      fill
                      className="rounded-full object-cover"
                      alt='Cast Image'
                    />
                  </div>
                  <p className="font-semibold">
                    {cast.firstName + " " + cast.lastName}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {isMovieInWatchList ? (
            <div
            className="px-6 py-4 bg-gradient-to-b from-secondaryOrange/60 to-secondaryOrange/40 rounded-b-xl mt-3
            border-secondaryOrange/5 border text-white text-center hover:bg-primaryDark cursor-pointer"
            onClick={removeMovieFromWatchList}
            >
            <p className="font-bold">Remove From Watch List</p>
          </div>
          ) : (
            <div
              className="px-6 py-4 bg-gradient-to-b from-white/10 to-white/5 rounded-b-xl mt-3
            border-white/5 border text-white text-center hover:bg-secondaryOrange cursor-pointer"
            onClick={addMovieToWatchList}
            >
              <p className="font-bold">Add To Watch List</p>
            </div>
          )}
          <div className="relative h-7 bg-white/10 rounded-lg mt-7 mx-1 blur-md" />
    </div>
  )
}

export default MovieCard