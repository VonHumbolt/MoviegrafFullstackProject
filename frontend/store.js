import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useMovieStore = create(
  devtools(
    persist((set, get) => ({
      movies: [],
      loadMoviesFromDb: (movieList) => {
        set((state) => (
            {movies: movieList}
        ))
      },
      addMovieToStore: (movie) => {
        set((state) => (
            { movies: [...state.movies, movie] }
        ));
      },
      removeMovieFromStore: (movie) => {
        const movieToRemove = get().movies.findIndex(
            m => m._id === movie._id
        )
        set((state) => {
            const newMovies = [...state.movies]

            newMovies.splice(movieToRemove, 1)
            return {movies: newMovies}
        })
      },
      clearMovieStore: () => {
        set((state) => ({movies: []}))
      },

      user: {},
      addUser: (user) => {
        set((state) => (
            {user: user}
        ))
      },
      removeUser: () => {
        set((state) => (
            {user: {}}
        ))
      }
    }))
  )
);
