import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import {routes as castRoutes} from "./routes/cast.js"
import {routes as userRoutes} from "./routes/user.js"
import {routes as genreRoutes} from "./routes/genre.js"
import {routes as directorRoutes} from "./routes/director.js"
import {routes as movieRoutes} from "./routes/movie.js"

const app = express()
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use("/api/user/", userRoutes)
app.use("/api/cast/", castRoutes)
app.use("/api/genre/", genreRoutes)
app.use("/api/director/", directorRoutes)
app.use("/api/movie/", movieRoutes)

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log("🚀 Server is running on --> ", PORT)
    })
}).catch((error) => {
    console.log("Database error --> ", error)
})
