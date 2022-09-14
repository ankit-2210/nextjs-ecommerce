import User from "../../models/User"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method == "POST") {
        const token = req.body.token;
        const user = jsonwebtoken.verify(token, 'jwtsecret');

        let dbuser = await User.findOne({ email: user.email })
        // console.log(user);
        const { name, email, address, pincode, phone, } = dbuser;
        console.log({ name, email, address, pincode, phone });

        res.status(200).json({ name, email, address, pincode, phone });
    }
    else {
        res.status(400).json({ error: "error" });
    }
}

export default connectDB(handler);