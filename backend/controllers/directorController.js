import Director from "../models/directorModel.js";

export const addDirector = async (req, res) => {
    const {firstName, lastName} = req.body

    try {
        const director = await Director.create({firstName, lastName})
        res.status(200).json(director)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const getDirectorById = async (req, res) => {
    const {directorId} = req.params

    const director = await Director.findById(directorId);

    if(!director)
        res.status(404).json({ error: "Director was not found with given ID" });

    res.status(200).json(director);
}

export const getallDirectors = async (req, res) => {
    
    try {
        const directors = await Director.find()
        res.status(200).json(directors)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}