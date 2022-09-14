import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == "POST") {
        const token = req.body.token;
        const user = jsonwebtoken.verify(token, 'jwtsecret');

        let dbuser = await User.findOne({ email: user.email });
        var bytes = CryptoJS.AES.decrypt(dbuser.password, 'secret123');
        var decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptPassword == req.body.password && req.body.npassword == req.body.cpassword) {
            let dbuseru = await User.findOneAndUpdate({ email: dbuser.email }, { password: CryptoJS.AES.encrypt(req.body.cpassword, 'secret123').toString() })
            res.status(200).json({ success: true });
            return;
        }
        res.status(200).json({ success: false });
    }
    else {
        res.status(400).json({ error: "error" });
    }
}

export default connectDB(handler);