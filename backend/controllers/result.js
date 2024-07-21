import { Result } from "../model/results.js";
import { Student } from "../model/studentsModel.js";
import { Exam } from "../model/examModel.js";
import { Assessment } from "../model/assessments.js";

export const sendMarks = async (req, res) => {
    const { studentId, examId, assessmentId } = req.query;
    const { marks, remarks } = req.body;

    const student = await Student.findById(studentId);
    const exam = await Exam.findById(examId);
    const assessment = await Assessment.findById(assessmentId);

    if (!marks || !remarks) {
        return res.status(400).json({
            success: false,
            message: "Enter Marks and Remarks first"
        })
    }
    if (student.Class !== exam.Class) {
        return res.status(500).json({
            success: false,
            message: "Student is in different class and exam is of different Class"
        })
    }

    const resultAdded = await Result.create({
        student: student._id,
        exam: exam._id,
        assessment: assessment._id,
        Class: student.Class,
        marks: marks,
        remarks: remarks,
        credentials: {
            name: student.name,
            Class: student.Class,
            roll: student.rollNum,
            assessment: assessment.title,
            subject: assessment.subjects,
        }
    })
    if (!resultAdded) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Please try later."
        })
    }
    res.status(200).json({
        success: true,
        message: "Marks Added Successfully.",
        result: resultAdded,

    })

}

export const sendGrades = async (req, res) => {
    const { studentId, examId, assessmentId } = req.query;
    const { grade } = req.body;

    if (!grade) {
        return res.status(400).json({
            success: false,
            message: "Enter Grades first"
        })
    }

    const student = await Student.findById(studentId);
    const exam = await Exam.findById(examId);
    const assessment = await Assessment.findById(assessmentId);

    const grades = assessment.rubrics.reduce((acc, curr, index) => {
        acc[curr] = grade[index];
        return acc;
    }, {});

    const resultAdded = await Result.create({
        student: student._id,
        exam: exam._id,
        assessment: assessment._id,
        Class: student.Class,
        grade: grades,
    })
    if (!resultAdded) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Please try later."
        })
    }
    res.status(200).json({
        success: true,
        message: "Grades Added Successfully.",
        result: resultAdded,

    })

}


