import Cast from "../models/castModel.js";

export const addCast = async (req, res) => {
  const { firstName, lastName } = req.body;
  const photo = req.files.coverImage[0].filename;

  try {
    const cast = await Cast.create({ firstName, lastName, photo });
    res.status(200).json(cast);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCasts = async (req, res) => {
  const casts = await Cast.find();
  res.status(200).json(casts);
};
