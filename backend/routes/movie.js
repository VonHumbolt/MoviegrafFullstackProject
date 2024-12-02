import express from "express"
import { addMovie, getMovieDetail, searhMovieByName } from "../controllers/movieController.js"
import { upload } from "../middleware/uploadImage.js"
import { requireAdminAuthorization } from "../middleware/requireAdminAuthorization.js"

export const routes = express.Router()

routes.get("/:id", getMovieDetail)

// search movie by name
routes.get("/search/:name", searhMovieByName)

// get movie by genre id
routes.use(upload).use(requireAdminAuthorization).post("/", addMovie)


