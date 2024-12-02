import express from "express";
import {
  login,
  signup,
  addMovieToWatchList,
  removeMovieFromWatchList,
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const routes = express.Router();

routes.post("/login", login);

routes.post("/signup", signup);

routes.use(requireAuth).post("/addMovieToWatchList", addMovieToWatchList);

routes.use(requireAuth).post("/removeMovieFromWatchList", removeMovieFromWatchList);
