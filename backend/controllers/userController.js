import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = async (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { noTimestamp: true });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = await createToken(user._id);
    res
      .status(200)
      .json({ userId: user._id, email, token, username: user.username, watchingList: user.watchingList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    const token = await createToken(user._id);
    res
      .status(200)
      .json({ userId: user._id, email, token, username: user.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addMovieToWatchList = async (req, res) => {
  const { userId, movie } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) res.status(400).json({ message: "The user is not exists!" });

    user.watchingList.push(movie);

    const response = await User.updateOne({ _id: userId }, user);
    if (response.modifiedCount > 0)
      res
        .status(200)
        .json({ isSuccess: true, message: "Movie added in watch list" });
    else res.status(400).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeMovieFromWatchList = async (req, res) => {
  const { userId, movie } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) res.status(400).json({ message: "The user is not exists!" });

    const watchlist = user.watchingList.filter((m) => m._id != movie._id);

    const response = await User.updateOne(
      { _id: userId },
      { watchingList: watchlist }
    );

    if (response.modifiedCount > 0)
      res
        .status(200)
        .json({ isSuccess: true, message: "Movie removed from watch list" });
    else res.status(400).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
