import db from '../data/database.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const landing = (req, res) => {
    res.send({
        success: true,
        message:"app started!"
    })
}

export const loginFunc = async(req, res) => {
    const { email, password } = req.body;
    const user = await db.query(`SELECT * FROM adminDb WHERE email= ?`[email]);
    if (!user) return res.json({
        success: false,
        message: 'user does not exists, login first'
    })
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.json({
        successs:false,
        message:"incorrect password",
    })
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);


    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,

    }).json({
        success: true,
        message: `welcome back ${user.name}`,
    })
}

export const signinFunc = async(req, res) => {
    const { name, email, password } = req.body;
    const oldUser = await db.query(`SELECT * FROM adminDb WHERE email=?`[email]);

    if (oldUser) return res.json({
        success: false,
        message: 'User Already Exists, go and login!'
    }).redirect('/login');

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await db.query(`INSERT INTO admin (name, email, password) VALUES (?,?,?)`,
        [name, email, hashedPass]);

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    if (user) return res.cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    }).json({
        success: true,
        message:'user created successfully!'
    })

}


export const logout = (req, res) => { 
    res.cookie("token", null, {
        httpOnly: true, 
        maxAge: new Date(Date.now()),

    }).json({
        success: true,
        message:'signed out successfully!'
    })
}

