import mongoose from "mongoose";
import { Exam } from "../model/examModel.js";

export const prevExams = async (req, res, next) => {
    const allExams = await Exam.find({});
    res.status(200).json({
        success: true,
        message: "Exams fetched",
        exam: allExams,
    })
}

export const removeExam = async (req, res, next) => {
    const exam = await Exam.findOne({ _id: req.params.id });
    if (!exam) {
        return res.json({
            success: false,
            message: "exam not found."
        })
    }
    await exam.deleteOne();
    res.status(200).json({
        success: true,
        message: "Exam deleted successfully"
    })

}


export const createExam = async (req, res, next) => {
    const { Class, section, session, teacher } = req.body;
    if (!Class || !section || !session || !teacher) {
        return res.status(500).json({
            success: false,
            message: "enter all required fields!"
        })
    }
    const arrayData = await Exam.create({
        Class,
        section,
        session,
        teacher,

    })

    res.status(200).json({
        success: true,
        message: 'Exam created!',
        exam: arrayData,
    })

}



export const updateExam = async(req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid exam ID."
            });
        }

        const exam = await Exam.findById(id);
        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "exam not found."
            })
        }

        const {Class, session, section, subjects, teacher} = req.body
        const updatedSubjects = [];
        Class ? (exam.Class = Class) : exam.Class
        session ? (exam.session = session) : exam.session
        section ? (exam.section = section) : exam.section
        teacher ? (exam.teacher = teacher) : exam.teacher
        let bodySubs = [];
        subjects ? (bodySubs = subjects) : exam.subjects;

        bodySubs.forEach((element) => {
            updatedSubjects.push(element)
        })

        if (updatedSubjects.includes(undefined)) {
            return res.json({
                success: false,
                message: "subjects not added/updated",
            })
        }
        exam.subjects = updatedSubjects;
        const isAdded = await exam.save();
        if (!isAdded) {
            return res.json({
                success: false,
                message: "subjects not added, try again."
            })
        }

        const updatedExam = exam

        res.status(200).json({
            success: true,
            message: "Exam updated successfully",
            details: updatedExam

        })
    } catch (error) {
        console.log(error)

    }

}