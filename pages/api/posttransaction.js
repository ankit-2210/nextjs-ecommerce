import Order from "../../models/Order"
import Product from "../../models/Product"
import connectDB from "../../middleware/mongoose"
import PaytmChecksum from "paytmchecksum"

const handler = async (req, res) => {

    // validate paytm checksum
    var paytmChecksum = "";
    var paytmParams = {};

    const received_data = req.body;
    for (var key in received_data) {
        if (key == "CHECKSUMHASH") {
            paytmChecksum = received_data[key];
        } else {
            paytmParams[key] = received_data[key];
        }
    }

    var isValidChecksum = PaytmChecksum.verifySignature(paytmParams, process.env.PAYTM_MKEY, paytmChecksum);
    if (!isValidChecksum) {
        res.status(500).send("Some Error Occurred");
        return;
    }


    // updating status int Order database after checking the transaction status
    let order;
    if (req.body.STATUS == 'TXN_SUCCESS') {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Paid', paymentInfo: JSON.stringify(req.body), transactionId: req.body.TXNID })

        // decrementing the quality of stock
        let products = order.products;
        for (let slug in products) {
            console.log(products[slug].qty);
            await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": -products[slug].qty } })
        }
    }
    else if (req.body.STATUS == 'PENDING') {
        order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Pending', paymentInfo: JSON.stringify(req.body), transactionId: req.body.TXNID })
    }

    // console.log(order);

    res.redirect('/order?clearCart=1&id=' + order._id, 200);
}


export default connectDB(handler);