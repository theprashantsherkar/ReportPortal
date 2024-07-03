export const getAssessments = (req, res) => {
    res.status(200).json({
        success: true,
        message:"assessments fetched."
    })
}