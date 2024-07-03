import { Assessment } from "../model/assessments.js"

export const getAssessments = (req, res) => {
    res.status(200).json({
        success: true,
        message:"assessments fetched."
    })
}


export const newAss = async(req, res) => {
    const { title, term, type, maxMarks, rubrics, subs } = req.body
    if (!title || !term || !type || !maxMarks || !rubrics || !subs) {
        return res.json({
            success: false,
            message:"enter all fields first"
        })
    }
    subs.forEach(element => {
        const newAssessment = Assessment.create({
            title,
            term,
            type,
            maxMarks,
            rubrics,
            subjects: element
        }).then()
            .catch(err => console.log(err))
    });

    const assessment = await Assessment.find({});

    res.status(200).json({
        success: true,
        message: "Assessment created successfully",
        asses:assessment
    })

}