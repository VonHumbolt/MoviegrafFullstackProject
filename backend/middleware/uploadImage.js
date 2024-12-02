import multer from "multer";
import randomstring from "randomstring"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public/movieImagesUpload/')
    },
    filename: function (req, file, cb) {
        const imageExtension = file.originalname.split(".")[1]
      cb(null, `${randomstring.generate()}.${imageExtension}`)
    }
})

export const upload = multer({storage: storage}).fields(
    [
        {name: "coverImage"},
        {name: "movieImage"}
    ]
)