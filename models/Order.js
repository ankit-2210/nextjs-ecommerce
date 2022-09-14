const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: String,
        default: ""
    },
    products: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        default: ""
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Initiated',
        required: true
    },
    deliveryStatus: {
        type: String,
        default: 'unshipped',
        required: true
    }
}, { timestamps: true })

mongoose.models = {}

let orders = mongoose.model("Order", OrderSchema);
export default orders