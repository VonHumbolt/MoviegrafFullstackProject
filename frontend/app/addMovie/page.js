"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus, ImagePlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMovieStore } from "@/store";
import { useRouter } from "next/navigation";
import AddDirectorDialog from "@/components/AddDirectorDialog";
import AddCastDialog from "@/components/AddCastDialog";
import AddGenreDialog from "@/components/AddGenreDialog";

function AddMovie() {
  const { user } = useMovieStore();
  const router = useRouter();

  const [directors, setDirectors] = useState([]);
  const [casts, setCasts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [movieImage, setMovieImage] = useState(null);

  // Form Items
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [director, setDirector] = useState("");
  const [movieCasts, setMovieCasts] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [coverImageFile, setCoverImageFile] = useState();
  const [movieImageFile, setMovieImageFile] = useState();

  const coverImageRef = useRef(null);
  const movieImageRef = useRef(null);

  useEffect(() => {
    getallDirectors();
    getallCasts();
    getallGenres();
  }, []);

  const getallDirectors = async () => {
    const response = await fetch("http://localhost:5000/api/director/");
    const json = await response.json();
    setDirectors(json);
  };

  const getallCasts = async () => {
    const response = await fetch("http://localhost:5000/api/cast/");
    const json = await response.json();
    setCasts(json);
  };

  const getallGenres = async () => {
    const response = await fetch("http://localhost:5000/api/genre/");
    const json = await response.json();
    setGenres(json);
  };

  const onCoverImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImageFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onMovieImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setMovieImageFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMovieImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const addCastToCastList = (cast) => {
    const itemInList = movieCasts.filter((c) => c._id == cast._id)[0];
    if (!itemInList) {
      setMovieCasts([...movieCasts, cast]);
    }
  };

  const addGenreToList = (genre) => {
    const itemInList = movieGenres.filter((g) => g._id == genre._id)[0];
    if (!itemInList) {
      setMovieGenres([...movieGenres, genre]);
    }
  };

  const removeCastFromCastList = (cast) => {
    const index = movieCasts.findIndex((c) => c._id == cast._id)
    movieCasts.splice(index, 1)
    setMovieCasts([...movieCasts])
  }
 
  const removeGenreFromGenreList = (genre) => {
    const index = movieGenres.findIndex((m) => m._id == genre._id)
    movieGenres.splice(index, 1)
    setMovieGenres([...movieGenres])
  }

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("rating", rating);
    formData.append("description", description);
    formData.append("publishedYear", releaseDate);
    formData.append("duration", duration);
    formData.append("genres", JSON.stringify(movieGenres));
    formData.append("casts", JSON.stringify(movieCasts));
    formData.append("director", director);
    formData.append("coverImage", coverImageFile);
    formData.append("movieImage", movieImageFile);

    const response = await fetch("http://localhost:5000/api/movie/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    router.push("/movie/" + json._id);
  };

  return (
    <div className="relative mb-36 md:mb-0">
      <Image
        className="absolute -top-1/5 md:-top-1/4 -z-10 mx-auto"
        src={"/login/login_bg.png"}
        width={2000}
        height={2000}
        alt="Login Background"
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-white flex flex-col items-center mt-12">
          {/* Card */}
          <div
            className="w-fit max-w-md md:w-1/3 bg-gradient-to-b from-white/10 to-white/5
             border border-white/5 rounded-xl "
          >
            <div
              className=" bg-lightGrey grid grid-cols-2 divide-x-[1px] divide-black/10
                          text-primaryDark rounded-t-xl cursor-pointer"
            >
              {coverImage ? (
                <div
                  className="relative w-full h-52 rounded-tl-xl"
                  onClick={() => coverImageRef.current.click()}
                >
                  <Image
                    src={coverImage}
                    layout="fill"
                    className="object-cover rounded-tl-xl"
                    alt="Cover Image"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center px-10 py-14 rounded-t-xl"
                  onClick={() => coverImageRef.current.click()}
                >
                  <ImagePlus size={40} />
                  <p className="font-bold mt-1">Cover Image</p>
                </div>
              )}

              {movieImage ? (
                <div
                  className="relative w-full h-52 rounded-tr-xl"
                  onClick={() => movieImageRef.current.click()}
                >
                  <Image
                    src={movieImage}
                    layout="fill"
                    className="object-cover rounded-tr-xl"
                    alt="Movie Image"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center px-10 py-14 rounded-tr-xl"
                  onClick={() => movieImageRef.current.click()}
                >
                  <ImagePlus size={40} />
                  <p className="font-bold mt-1">Movie Image</p>
                </div>
              )}
            </div>

            <input
              ref={coverImageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onCoverImageChange}
            />

            <input
              ref={movieImageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onMovieImageChange}
            />

            <div className="flex items-center w-full border-b-[1px] border-lightGrey/20">
              <div className="flex-1 border-r-[1px] border-lightGrey/20 p-4">
                <p className="text-sm">Title</p>
                <input
                  className="bg-transparent text-sm outline-none mt-1"
                  placeholder="Name of the movie"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="p-4 w-1/3">
                <p className="text-sm">Rating</p>
                <input
                  type="number"
                  className="bg-transparent text-sm outline-none mt-1 w-full"
                  placeholder="9.2"
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 border-b-[1px] border-lightGrey/20">
              <p className="text-sm">Description</p>
              <input
                className="bg-transparent text-sm outline-none mt-1 w-full"
                placeholder="Topic of the movie"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center w-full border-b-[1px] border-lightGrey/20">
              <div className="flex-1 border-r-[1px] border-lightGrey/20 p-4">
                <p className="text-sm">Release Date</p>
                <input
                  className="bg-transparent text-sm outline-none mt-1"
                  placeholder="1995"
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </div>
              <div className="p-4">
                <p className="text-sm">Duration</p>
                <input
                  type="text"
                  className="bg-transparent text-sm outline-none mt-1 w-full"
                  placeholder="2h 26m"
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 border-b-[1px] border-lightGrey/20">
              <div className="flex items-center ">
                <p className="text-sm flex-1">Director</p>
                {/* Add Director */}
                <AddDirectorDialog updateDirectors={getallDirectors} />
              </div>
              <Select onValueChange={(value) => setDirector(value)}>
                <SelectTrigger>
                  <SelectValue
                    className="text-sm text-lightGrey"
                    placeholder="Choose director"
                  />
                </SelectTrigger>
                <SelectContent>
                  {directors?.map((director) => (
                    <SelectItem key={director._id} value={director._id}>
                      {director.firstName + " " + director.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 border-b-[1px] border-lightGrey/20">
              {movieCasts?.map((cast) => (
                <Badge
                  key={cast._id}
                  className={
                    "text-xs py-2 px-3 mr-1 bg-secondaryOrange cursor-pointer"
                  }
                  onClick={() => removeCastFromCastList(cast)}
                >
                  {cast.firstName + " " + cast.lastName}
                </Badge>
              ))}
              <Dialog>
                <DialogTrigger>
                  <Badge className={"py-2 px-4 mr-1 my-1 cursor-pointer"}>
                    Add Casts +
                  </Badge>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-lg">
                        Select Movie's Casts
                      </p>
                      {/* Add Cast Dialog */}
                      <AddCastDialog updateCasts={getallCasts} />
                    </div>
                    <DialogDescription className="h-64 overflow-y-scroll scrollbar-hidden">
                      {casts?.map((cast) => (
                        <div
                          className="py-2 px-3 border rounded-lg my-2 mx-1 cursor-pointer
                           hover:bg-secondaryOrange/80 group"
                          key={cast._id}
                          onClick={() => addCastToCastList(cast)}
                        >
                          <p className="text-gray-700 text-sm group-hover:text-white">
                            {cast.firstName + " " + cast.lastName}
                          </p>
                        </div>
                      ))}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            <div className="p-4 border-lightGrey/20 ">
              {movieGenres?.map((genre) => (
                <Badge
                  key={genre._id}
                  className={
                    "text-xs my-1 py-2 px-3 mr-1 bg-secondaryOrange cursor-pointer"
                  }
                  onClick={() => removeGenreFromGenreList(genre)}
                >
                  {genre.genreName}
                </Badge>
              ))}
              <Dialog>
                <DialogTrigger>
                  <Badge className={"py-2 px-4 mr-1 my-1 cursor-pointer"}>
                    Add Genre +
                  </Badge>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-lg">Select Genre</p>
                      {/* Add Genre Dialog */}
                      <AddGenreDialog updateGenres={getallGenres} />
                    </div>
                    <DialogDescription className="h-64 overflow-y-scroll scrollbar-hidden">
                      {genres?.map((genre) => (
                        <div
                          className="py-2 px-3 border rounded-lg my-2 mx-1 cursor-pointer
                            hover:bg-secondaryOrange/80 group"
                          key={genre._id}
                          onClick={() => addGenreToList(genre)}
                        >
                          <p className="text-gray-700 text-sm group-hover:text-white">
                            {genre.genreName}
                          </p>
                        </div>
                      ))}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Button
            className="w-1/3 mt-6 py-6 rounded-xl bg-gradient-to-b from-white/10
          to-white/5 border border-white/5 hover:bg-secondaryOrange/90"
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
