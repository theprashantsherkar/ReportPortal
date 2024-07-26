import { Exam } from "../model/examModel.js";
import { Assessment } from "../model/assessments.js";
import { Student } from "../model/studentsModel.js";
import { PDFDocument, rgb } from 'pdf-lib';
import { Result } from "../model/results.js";


export const getClass = async (req, res, next) => {
    const { teacher } = req.body;
    var exams = await Exam.find({ teacher: teacher });
    if (!exams) {
        return res.json({
            success: false,
            message: "no teacher found"
        })
    }
    const Classes = [];

    exams.map((element) => {
        Classes.push(element.Class);
    })



    res.status(200).json({
        success: true,
        message: "here are the exams",
        names: Classes,
        Exams: exams,
    })
}

export const getAssessmentsForTeacher = async (req, res, next) => {
    const { Class, teacher } = req.body;
    var exams = await Exam.find({ Class: Class, teacher:teacher});
    if (!exams) {
        return res.status(404).json({
            success: false,
            message: "no exams are found"
        })
    }
    var assessments = [];

    await Promise.all(exams.map(async (element) => {
        const ass = await Assessment.find({ parentExam: element._id });
        assessments = ass;
        
    })
    )

    if (!assessments || !assessments.length) {
        return res.json({
            success: false,
            message: "no assessments found."
        })
    }
    const assTitles = [];
    assessments.map((element) => {
        assTitles.push({ title: element.title, subjects: element.subjects });
    })



    res.status(200).json({
        success: true,
        message: "Assessments Found",
        assTitles,
        assessments,
    })

}

export const getStudents = async (req, res, next) => {
    const { Class } = req.query;
    const students = await Student.find({ Class: Class });
    if (!students) {
        return res.status(404).json({
            success: false,
            message:"no students added for this class"
        })
    }
    res.status(200).json({
        success: true,
        message: "students fetched successfully",
        strength:students.length,
        students
    })

}

