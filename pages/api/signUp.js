// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == "POST") {
        // console.log(req.body);
        const { name, email } = req.body;
        const user = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, 'secret123').toString() });
        await user.save();

        res.status(200).json({ success: "success" });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectDB(handler);