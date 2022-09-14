const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ""
    },
    pincode: {
        type: Number,
        default: ""
    },
    phone: {
        type: Number,
        default: ""
    },
    name: {
        type: String,
        required: true
    },

}, { timestamps: true })

mongoose.models = {}

let users = mongoose.model("User", UserSchema);
export default users