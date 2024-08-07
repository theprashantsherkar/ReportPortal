import { Assessment } from "../model/assessments.js"
import { Exam } from "../model/examModel.js"


export const getAssessments = async (req, res) => {

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

        const { title, term, type, maxMarks, isRubrics, subs } = req.body;
        if (!title || !term || !type  || !subs) {
            return res.status(400).json({
                success: false,
                message: "Enter all fields first"
            });
        }
        

        const assessments = await Assessment.create({
            title,
            term,
            type,
            maxMarks,
            isRubrics,
            subjects: subs,
            parentExam: exam._id,
            Class: exam.Class,

        })
        //todo:if vivek sir allows then this approach or else commented approach
        
        // subs.forEach(element => {
        //     Assessment.create({
        //         title,
        //         term,
        //         type,
        //         maxMarks,
        //         isRubrics,
        //         subjects: element,
        //         parentExam: exam._id
        //     }).then()
        //         .catch(err => console.log(err))
        // });
        // const assessments = await Assessment.find({ parentExam: exam._id });

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

export const getExamsAss = async (req, res, next) => {
    const exam = await Exam.findById({ _id: req.params.id })

    if ((!exam) || (exam.length == 0)) {
        return res.status(404).json({
            success: false,
            message: "no exam found for the given id."
        })
    }
    const assessments = await Assessment.find({ parentExam: exam._id })

    res.status(200).json({
        success: true,
        message: "assessments fetched",
        assessments
    })
}


export const DeleteExam = async (req, res, next) => {
    const assessment = await Assessment.findById({ _id: req.params.id })
    if (!assessment) {
        return res.status(404).json({
            success: false,
            message: "no assessment found"
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
        message: "assessment deleted successfully"
    })
}


export const UpdateAss = async (req, res, next) => {
    const assessment = await Assessment.findById({ _id: req.params.id })
    if (!assessment) {
        return res.status(404).json({
            success: false,
            message: "no assessment found"
        })
    }
    const { title, term, type, maxMarks, isRubrics } = req.body;

    title ? assessment.title = title : assessment.title
    term ? assessment.term = term : assessment.term
    type ? assessment.type = type : assessment.type
    maxMarks ? assessment.maxMarks = maxMarks : assessment.maxMarks
    isRubrics ? assessment.isRubrics = isRubrics : assessment.isRubrics

    const isUpdated = await assessment.save();
    if (!isUpdated) {
        return res.status(500).json({
            success: false,
            message: "Couldn't Update, Internal Server Error!"
        })
    }

    res.status(200).json({
        success: true,
        message: "Updated successully",
        assessment
    })
}

export const addRubrics = async (req, res, next) => {

    if (!req.params.id || req.params.id == undefined) {
        return res.json({
            success: false,
            message: "empty params!"
        })
    }
    const assessment = await Assessment.findById({ _id: req.params.id });

    if (!assessment) {
        return res.status(404).json({
            success: false,
            message: "no assessment found",
        })
    }
    const { rubrics } = req.body;

    assessment.rubrics = rubrics;
    const isUpdated = await assessment.save();

    if (!isUpdated) {
        return res.status(500).json({
            success: false,
            message: "Rubrics not added."
        })
    }
    res.status(200).json({
        success: true,
        message: "Rubrics added Successfully",
        rubrics: assessment.rubrics
    })
}

export const sendSubs = async (req, res, next) => {
    const { id } = req.params;
    const exam = await Exam.findById(id);
    if (!exam) {
        return res.json({
            success: false,
            message: "no exam found"
        })
    }
    const subjects = exam.subjects;
    if (!subjects) {
        return res.json({
            success: false,
            message: "select subjects first!"
        })

    }
    res.status(200).json({
        success: true,
        message: "subjects sent",
        subjects
    })
}