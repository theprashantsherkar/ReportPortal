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

export const printReport = async(req, res, next) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "student not found"
            })
        }
        const result = await Result.find({ student: student._id })
        const pdf = await PDFDocument.create();
        const page = pdf.addPage([600, 800]);
        const { width, height } = page.getSize();

        const fontSize = 13;
        page.drawText('Report Card', { x: 50, y: height - 4 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
        page.drawText(`Student Name: ${student.name}`, { x: 50, y: height - 6 * fontSize, size: fontSize, color: rgb(0, 0, 0) })
        page.drawText(`Class: ${student.Class}`, { x: 50, y: height - 8 * fontSize, size: fontSize, color: rgb(0, 0, 0) });


        //todo: add result here after download is tested


        const finalPDF = await pdf.save();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="report_card_${student.name}.pdf"`);
        res.send(pdf);


    } catch (error) {
        console.log(error);
    }

}