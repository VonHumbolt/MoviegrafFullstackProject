import Genre from "../models/genreModel.js"

export const addGenre = async(req, res) => {
    const {genreName} = req.body;

    try {
        const genre = await Genre.create({genreName});
        res.status(200).json(genre)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

export const getallGenre = async(req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres)
}