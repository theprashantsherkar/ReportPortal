import jwt from "jsonwebtoken";
import db from '../data/database.js'

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.json({
        success: false,
        message: 'user is logged out. login first!'
    })
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const Users = await db.query(`SELECT id from user`);
    req.user = Users.findById(decoded._id);
    next();
}