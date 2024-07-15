import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    rollNum: {
        type: Number,
        required: true,
        unique: true,

    },
    Class: {
        type: String,
        required: true,
    },
    createdAt:{
        type: String,
        required: true,
        default: `${new Date(Date.now()).getDate()}-${new Date(Date.now()).getMonth()}-${new Date(Date.now()).getFullYear()}`

    }
})


export const Student = mongoose.model("students", studentSchema);