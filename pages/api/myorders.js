import Order from "../../models/Order"
import connectDB from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken";
// var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    const token = req.body.token;
    // console.log(token);
    const data = jsonwebtoken.verify(token, 'jwtsecret');
    // console.log(data);
    let orders = await Order.find({ email: data.email, status: 'Paid' })
    res.status(200).json({ orders })
}

export default connectDB(handler);