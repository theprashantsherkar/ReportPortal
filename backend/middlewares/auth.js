// import jwt from "jsonwebtoken"
// import { Users } from "../model/userModel.js"


// export const isAuthenticated = async (req, res, next) => {

//     const { token } = req.cookies
//     if (!token) return res.status(404).json({
//         success: false,
//         message: "login first"
//     })

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = await Users.findById(decoded._id)

//     next()


// }


import jwt from 'jsonwebtoken';
import { Users } from '../model/userModel.js'

export const isAuthenticated = async(req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.json({
        success: false,
        message:"login first!"
    })
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await Users.findById(decoded._id);
    next()
}