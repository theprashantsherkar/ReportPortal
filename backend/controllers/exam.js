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
    const exam = await Exam.findOne(req.params.id);
    if (!exam) {
        return res.json({
            success: false,
            message: "exam not found."
        })
    }
    await exam.deleteOne();
    req.status(200).json({
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
