const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

mongoose.models = {}

let AdminUsers = mongoose.model("AdminUser", AdminUserSchema);
export default AdminUsers