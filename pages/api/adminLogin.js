import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ "email": req.body.email });
        // var bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        // var decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(decryptPassword);

        if (user.password == req.body.password) {

            res.status(200).json({ success: true, email: user.email });
        }
        else {
            res.status(400).json({ success: false, error: "No user found" });
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectDB(handler);