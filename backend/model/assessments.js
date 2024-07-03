import mongoose from "mongoose"


const AssessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    maxMarks: {
        type: Number,
    },
    rubrics: {
        type: String,

    },
    subjects: {
        type: mongoose.Schema.Types.Array,
        ref:"exam datas"
    }
})

export const Assessment = mongoose.model("Assessments", AssessmentSchema);