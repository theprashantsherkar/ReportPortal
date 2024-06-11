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
    createdAt: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    }
})

export const Users = mongoose.model("Portal Users", userSchema);
