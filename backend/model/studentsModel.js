import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        

    },
    rollNum: {
        type: Number,
        required: true,
      

    },
    createdAt:{
        type: Date,
        required: true,
        default:Date.now()

    }
})


export const Student = mongoose.model("students", studentSchema);