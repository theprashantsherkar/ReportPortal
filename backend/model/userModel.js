import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
    },
    role: {
        type: [String],
        enum: ["admin", "teacher"],
        default:["admin"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    }
})

export const Users = mongoose.model("PortalUsers", userSchema);
