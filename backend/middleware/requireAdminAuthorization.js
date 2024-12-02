import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

export const requireAdminAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "Authorization token required!" });

  const token = authorization.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id });
    if(user.role == 'ADMIN')
        next()
    else
        res.status(403).json({error: "Access denied! You are unauthorized for this request"})

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized!" });
  }
};