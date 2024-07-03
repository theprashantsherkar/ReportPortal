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
        teacher
    })

    res.status(200).json({
        success: true,
        message: 'Exam created!',
        exam: arrayData,
    })

}


export const addSubs = async (req, res) => {
    const exam = await Exam.findOne({ _id: req.params.id })
    if (!exam) {
        return res.send({
            success: false,
            message: "no exam found."
        })
    }
    const subs = req.body;
    // console.log(req.body);
    const subjects = [];
    subs.forEach((element => {
        subjects.push(element.title);
    }));

    if (subjects.includes(undefined)) {
        return res.json({
            success: false,
            message:"subjects not added."
        })
    }
    const uniqueSubjects = [...new Set(subjects)];
    const updatedSubjects = [...new Set([...exam.subjects, ...uniqueSubjects])];
    exam.subjects = updatedSubjects;
    const isAdded = await exam.save();
    if ((!isAdded) || (!exam.subjects)) {
        return res.json({
            success: false,
            message:"subjects not added."
        })
    }
    res.status(200).json({
        success: true,
        message: "subjects added successfully",
        subjects: exam.subjects,

    })

}


export const updateExam = async(req, res) => {
    try {
        const exam = await Exam.findOne({ _id: req.params.id })
        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "exam not found."
            })
        }
        const updatedSubjects = [];
        exam.Class = req.body.Class;
        exam.session = req.body.session;
        exam.section = req.body.section;
        exam.teacher = req.body.teacher;

        const bodySubs = req.body.subjects
        bodySubs.forEach((element) => {
            updatedSubjects.push(element)
        })

        if (updatedSubjects.includes(undefined)) {
            return res.json({
                success: false,
                message: "subjects not added/updated",
            })
        }
        // const uniqueSubjs = [...new Set(updatedSubjects)];
        // const finalSubs = [...new Set(...exam.subjects,...uniqueSubjs)];
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