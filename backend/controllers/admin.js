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
    const user = await db.query(`SELECT * FROM user WHERE email= ?`,[email]);
    if (!user) return res.json({
        success: false,
        message: 'user does not exists, Register first'
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

    const [rows] = await db.query("SELECT email FROM user WHERE email=?", [email])
    const oldUser = rows[1];
    console.log(oldUser);
    if (oldUser) return res.json({
        success: false,
        message: 'User Already Exists, go and login!'
    });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await db.query(`INSERT INTO user SET ?`, { name: name, email: email, password: hashedPass });

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.cookie("token", token, {
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

export const dashboardAPI = (req, res) => {
    //input of the excel sheet, read its content and list it
}

export const changePass = (req, res) => {
    try {
        const { oldPassoword, newPassword, confPassword } = req.body;
        const originalPass = db.query(``);
        if (oldPassoword !== originalPass) return res.json({
            success: false,
            message: 'Incorrect old password.'
        })
        if (newPassword !== confPassword) return res.json({
            success: false,
            message: 'Passowrd not confirmed!'
        })

        db.query(`UPDATE user SET password = ? WHERE email = ?`, [newPassword, req.user.email]);
        res.json({
            success: true,
            message: 'Password changed successfully.'
        })
    } catch (error) {
        console.log(error);
    }
}

export const profile = (req, res, next) => {
    const User = req.user;
    if (!User) return res.json({
        success: false,
        message: 'login first!'
    })
    res.json({
        success: true,
        message: `welcome ${User.name}`,
        User,
    })
}