import { Assessment } from "../model/assessments.js"
import { Exam } from "../model/examModel.js"
import mongoose from "mongoose";

export const getAssessments = async(req, res) => {

    const assessments = await Assessment.find({})
    res.status(200).json({
        success: true,
        message: "assessments fetched.",
        assessments
    })
}

export const newAss = async (req, res) => {
    try {

        const exam = await Exam.findById({ _id: req.params.id });

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "Exam not found"
            });
        }

        const { title, term, type, maxMarks, rubrics, subs } = req.body;
        if (!title || !term || !type || !maxMarks || !rubrics || !subs) {
            return res.status(400).json({
                success: false,
                message: "Enter all fields first"
            });
        }

        subs.forEach(element => {
            Assessment.create({
                title,
                term,
                type,
                maxMarks,
                rubrics,
                subjects: element,
                parentExam: exam._id
            }).then()
                .catch(err => console.log(err))
        });
        const assessments = await Assessment.find({ parentExam: exam._id });

        res.status(200).json({
            success: true,
            message: "Assessment created successfully",
            assessments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const getExamsAss = async(req, res, next) => {
    const exam = await Exam.findById({ _id: req.params.id })
    // console.log(req.params)
    // console.log(exam)
    if ((!exam) || (exam.length == 0)) {
        return res.status(404).json({
            success: false,
            message:"no exam found for the given id."
        })
    }
    const assessments = await Assessment.find({ parentExam: exam._id })
    // console.log(assessments)
    if (!assessments || assessments.length == 0) {
        return res.status(404).json({
            success: false,
            message:"no assessments added yet"
        })
    }
    res.status(200).json({
        success: true,
        message: "assessments fetched",
        assessments
    })
}


export const DeleteExam =async(req, res, next) => {
    const assessment = await Assessment.findById({ _id: req.params.id })
    if (!assessment) {
        return res.status(404).json({
            success: false,
            message:"no assessment found"
        })
    }
    const isDeleted = await assessment.deleteOne();
    if (!isDeleted) {
        return res.status(500).json({
            success: false,
            message: "delete operation failed",
            
        })
    }
    return res.status(200).json({
        success: true,
        message:"assessment deleted successfully"
    })
}