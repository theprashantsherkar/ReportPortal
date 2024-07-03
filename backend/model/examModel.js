import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    Class: {
        type: String,
        required:true
    },
    session: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required:true
    },
    teacher: {
        type: String,
        required: true,

    },
    subjects: {
        type: [String],
        default:[],
    },
    madeBy: {
        type: mongoose.Schema.Types.String,
        ref:"PortalUsers"
    },
    createdAt: {
        type: String,
        default:`${new Date(Date.now()).getDate()}-${new Date(Date.now()).getMonth()}-${new Date(Date.now()).getFullYear()}`
    }
})


export const Exam = mongoose.model('Exam data', examSchema);