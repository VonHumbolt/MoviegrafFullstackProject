import express from "express"
import { addDirector, getDirectorById, getallDirectors } from "../controllers/directorController.js"
import { requireAdminAuthorization } from "../middleware/requireAdminAuthorization.js"

export const routes = express.Router()

routes.get("/", getallDirectors)

routes.get("/:directorId", getDirectorById)

routes.use(requireAdminAuthorization).post("/", addDirector);