import express from "express"
import {addCast, getCasts} from "../controllers/castController.js"
import { upload } from "../middleware/uploadImage.js"
import { requireAdminAuthorization } from "../middleware/requireAdminAuthorization.js"

export const routes = express.Router()

routes.get("/", getCasts)

// create cast
routes.use(upload).use(requireAdminAuthorization).post("/", addCast)