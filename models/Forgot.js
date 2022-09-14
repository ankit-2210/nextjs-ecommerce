const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    },

}, { timestamps: true })

mongoose.models = {}

let Forgot = mongoose.model("Forgot", ForgotSchema);
export default Forgot