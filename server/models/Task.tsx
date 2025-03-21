import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, "Please enter a title"],
        trim: true
    },
    Description: {
        type: String,
        required: [true, "Please enter a description"],
        trim: true
    },
    Status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed"],
        default: "To Do"
    },
    DueDate: {
        type: Date
    },
    Priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);