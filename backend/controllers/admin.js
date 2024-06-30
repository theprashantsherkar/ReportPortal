import { Users } from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path, {dirname} from 'path';
import { Student } from '../model/studentsModel.js';
import xlsx from 'xlsx';
import { fileURLToPath } from 'url';




export const loginFunc = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.json({
        success: false,
        message: 'user does not exists, Register first'
    })
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) return res.json({
        successs: false,
        message: "incorrect password",
    })

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: true,
        sameSite: 'Strict'
    }).json({
        success: true,
        message: `welcome back ${user.name}`,
    })
}

export const signinFunc = async (req, res) => {
    const { name, email, password } = req.body;
    const oldUser = await Users.findOne({ email });

    if (oldUser) return res.json({
        success: false,
        message: 'User Already Exists, go and login!'
    });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await Users.create({
        name,
        email,
        password: hashedPass,

    })

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.status(200).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    }).json({
        success: true,
        message: 'user created successfully!'
    })

}


export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,

    }).json({
        success: true,
        message: 'signed out successfully!'
    })
}


export const dashboardAPI = async(req, res, next) => {
    //multer and other api code
    try {
        const __fileName = fileURLToPath(import.meta.url);
        const __dirname = dirname(__fileName);
        const file = req.file;
        if (!file) {
            return res.json({
                success: false,
                message:"no file is uploaded!"
            })
        }
        const workbook = xlsx.readFile(path.join(__dirname,"../",file.path));
        if (!workbook.SheetNames || !workbook.Sheets === 0) {
            return res.json({
                success:false,
                message: "file uploaded is empty",
            })
        }
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const arrayData = xlsx.utils.sheet_to_json(worksheet);

        
        const studentData = await Student.insertMany(arrayData);

        // fs.unlinkSync(file.path);
        res.status(200).json({
            success: true,
            message: "excel file imported successfully",
            data: studentData
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "internal server error",
            issue: error.message,
        })
    }
}





export const changePass = async (req, res) => {
    try {
        const User = req.user;
        const { oldPassword, newPassword, confPassword } = req.body;

        const isMatched = await bcrypt.compare(oldPassword, User.password);
        if (!isMatched) return res.json({
            success: false,
            message: 'incorrect old password.'
        })

        if (newPassword !== confPassword) return res.json({
            success: false,
            message: 'Passowrd not confirmed!'
        })
        const newHashed = await bcrypt.hash(newPassword, 10);

        const result = await Users.updateOne({ email: User.email }, { $set: { password: newHashed } });
        if (result.nModified == 0) return res.json({
            success: false,
            message: "Couldn't find the user."
        })
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

export const getStudents = async(req, res, next) => {
    const allStudents = await Student.find({});
    res.status(200).json({
        success: true,
        message: "students fetched successfully",
        students:allStudents,
    })
}
