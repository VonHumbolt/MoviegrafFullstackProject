import mongoose from "mongoose";

const Schema = mongoose.Schema

const castSchema = new Schema({
    _castId: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
},{
    timestamps: true // createdAt, updatedAt is autmotaically filled!
})

const Cast = mongoose.model("Cast", castSchema);

export default Cast;