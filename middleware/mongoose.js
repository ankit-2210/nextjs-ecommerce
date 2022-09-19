import mongoose from "mongoose";

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return handler(req, res);
}

export default connectDB;

// MONGO_URI=mongodb://localhost:27017/ecommerceNext
