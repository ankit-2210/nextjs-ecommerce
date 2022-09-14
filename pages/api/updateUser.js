import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method == "POST") {
        const token = req.body.token;
        const user = jsonwebtoken.verify(token, 'jwtsecret');

        let dbuser = await User.findOneAndUpdate({ email: user.email }, { address: req.body.address, pincode: req.body.pincode, phone: req.body.phone, name: req.body.name })

        res.status(200).json({ dbuser });
    }
    else {
        res.status(400).json({ error: "error" });
    }
}

export default connectDB(handler);