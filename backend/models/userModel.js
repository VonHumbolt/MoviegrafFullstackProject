import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema

const userSchema = new Schema({
    _userId: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "USER"
    },
    watchingList: {
        type: mongoose.Schema.Types.Array,
        ref: "Movie",
        default: []
    }
})

userSchema.statics.signup = async function (username, email, password) {
    if(!username || !email || !password)
        throw Error("All field must not be empty!")

    if(!validator.isEmail(email))
        throw Error("Email must be email!")

    const isUserExists = await this.findOne({email})

    if(isUserExists)
        throw Error("Email already in use")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, password: hash})

    return user
}

userSchema.statics.login = async function (email, password) {
    if(!email || !password)
        throw Error("Email and password must not be null!")

    const user = await this.findOne({email})
    if(!user)
        throw Error("Incorrect email")

    const match = await bcrypt.compare(password, user.password)

    if(!match)
        throw Error("Email or password is wrong!")

    return user
}

const User = mongoose.model("User", userSchema)

export default User