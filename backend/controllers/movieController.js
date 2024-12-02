import Movie from "../models/movieModel.js";

export const addMovie = async (req, res) => {
  const {
    title,
    description,
    publishedYear,
    duration,
    rating,
    genres,
    director,
    casts,
  } = req.body;
  const coverImage = req.files.coverImage[0].filename;
  const movieImage = req.files.movieImage[0].filename;
  const parsedGenres = JSON.parse(genres);
  const parsedCasts = JSON.parse(casts);

  try {
    const movie = await Movie.create({
      title,
      description,
      publishedYear,
      duration,
      rating,
      genres: parsedGenres,
      director,
      casts: parsedCasts,
      coverImage,
      movieImage
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMovieDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) 
        res.status(404).json({ error: "Movie was not found with given ID" });

    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

export const searhMovieByName = async (req, res) => {
  const {name} = req.params

  const movies = await Movie.find({title: {$regex: name, $options: 'i'}})
  
  res.status(200).json(movies)
}
