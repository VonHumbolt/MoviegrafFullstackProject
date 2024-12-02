import mongoose from "mongoose";

const Schema = mongoose.Schema

const movieSchema = new Schema({
    _movieId: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    }, 
    rating: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String
    }, 
    movieImage: {
        type: String
    },
    genres: {
        type: mongoose.Schema.Types.Array,
        ref: "Genre"
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Director"
    },
    casts: {
        type: mongoose.Schema.Types.Array,
        ref: "Cast"
    }
})

const Movie = mongoose.model("Movie", movieSchema)

export default Movie