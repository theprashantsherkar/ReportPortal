import { Exam } from "../model/examModel.js";
import { Assessment } from "../model/assessments.js";


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
    const { Class } = req.body;
    var exams = await Exam.find({ Class: Class });
    if (!exams) {
        return res.status(404).json({
            success: false,
            message:"no exams are found"
        })
    }
    var assessments = [];

    exams.map((element) => {
        Assessment.find({ parentExam: element._id })
            .then((res) => {
                console.log(res)
                assessments = res
            })
            .catch((err) => {
                console.log(err)
            })
    })
    console.log(assessments)

    if (!assessments || !assessments.length) {
        return res.status(404).json({
            success: false,
            message:"no assessments found."
        })
    }
    const assTitles = [];
    assessments.map((element) => {
        assTitles.push(element.title);
    })
    res.status(200).json({
            success: true,
            message: "Assessments Found",
            assTitles,
    })

}

export const getSubjects = async(req, res, next) => {
    const { title } = req.query;
    const { exam } = req.query;
    console.log(title, exam)
    const assessments = await Assessment.find({ title: title, parentExam: exam });
    if (!assessments) {
        return res.status(404).json({
            success: false,
            message: "no assessments found"
        })
    }

    const subjects = [];
    assessments.map((element) => {
        subjects.push(element.subjects)
    })

    if (!subjects || !subjects.length) {
        return res.status(404).json({
            success: false,
            message: "no subjects found"
        })
    }
    res.status(200).json({
        success: true,
        message: "subjects fetched successfully",
        subjects
    })

}