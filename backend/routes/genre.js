import express from "express"
import { addGenre, getallGenre } from "../controllers/genreController.js"
import {requireAdminAuthorization} from "../middleware/requireAdminAuthorization.js"

export const routes = express.Router()

routes.get("/", getallGenre);

routes.use(requireAdminAuthorization).post("/", addGenre);
