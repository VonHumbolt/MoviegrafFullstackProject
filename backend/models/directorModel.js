import mongoose from "mongoose";

const Schema = mongoose.Schema

const directorSchema = new Schema({
    _directorId: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    movies: {
        type: mongoose.Schema.Types.Array,
        ref: "Movie"
    }
})

const Director = mongoose.model("Director", directorSchema)

export default Director