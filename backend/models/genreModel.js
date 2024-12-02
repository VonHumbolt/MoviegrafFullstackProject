import mongoose from "mongoose";

const Schema = mongoose.Schema;

const genreSchema = new Schema({
    _genreId: mongoose.Schema.Types.ObjectId,
    genreName: {
        type: String,
        required: true,
        unique: true
    },
    movies: {
        type: mongoose.Schema.Types.Array,
        ref: "Movie"
    }
})

const Genre = mongoose.model("Genre", genreSchema)

export default Genre