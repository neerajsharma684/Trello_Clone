import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    Email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ],
    },
    Password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Your password must be at least 8 characters long"],
        select: false
    },
},
{
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
});

module.exports = mongoose.model("User", userSchema);
