import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    isTrashed: {
        type: Boolean,
        default: false
    },
    trashedAt: {
        type: Date,
        default: null,
        index: true,
        expires: 60 * 60 * 24 * 30
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
    {
        timestamps: true
    }
)

export const Todo = mongoose.model("Todo", todoSchema)