const https = require('https');
const PaytmChecksum = require('paytmchecksum');
import Order from "../../models/Order"
import Product from "../../models/Product"
import connectDB from "../../middleware/mongoose"
import pincodes from '../../pincodes.json'

const handler = async (req, res) => {
    if (req.method == "POST") {

        // check if the pincodes is serviable
        if (!Object.keys(pincodes).includes(req.body.pincode)) {
            res.status(200).json({ success: false, "error": "The pincode you have entered is not serviceable", cartClear: false });
            return;
        }

        // Check if the cart is tampered or not
        // { "req.body[i].slug100": { "qty": 2, "price": 500, "name": "Wear the code", "size": "M", "variant": "pink" } 
        let subTotal = 0;
        let cart = req.body.cart;

        // checking if the subtotal is 0 then no need of payment
        if (req.body.subTotal == 0) {
            res.status(200).json({ success: false, "error": "Cart is Empty! Please build your cart and try again!", cartClear: true });
            return;
        }

        // checking if some tampered(ammount) occurs in cart 
        for (let item in cart) {
            console.log(item);
            subTotal += cart[item].price * cart[item].qty;

            let product = await Product.findOne({ slug: item });
            // check if the cart is out of stock
            if (product.availableQty < cart[item].qty) {
                res.status(200).json({ success: false, "error": "Some items in your cart is out of stock. Please Try again!", cartClear: true });
                return;
            }

            if (product.price != cart[item].price) {
                res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please Try again!", cartClear: true });
                return;
            }
        }

        // checking if the subtotal is valid according to the actual amount
        if (subTotal != req.body.subTotal) {
            res.status(200).json({ success: false, "error": "The price of some items in your cart have changed. Please Try again!", cartClear: true });
            return;
        }

        if (req.body.phone.length != 10) {
            res.status(200).json({ success: false, "error": "Please enter your 10 Digit phone number!", cartClear: false });
            return;
        }
        if (req.body.pincode.length != 6) {
            res.status(200).json({ success: false, "error": "Please enter your 6 Digit pincode number!", cartClear: false });
            return;
        }

        // Initiate an order to database according to orderId
        let order = new Order({
            email: req.body.email,
            name: req.body.name,
            orderId: req.body.oid,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            phone: req.body.phone,
            amount: req.body.subTotal,
            products: req.body.cart
        })

        await order.save();

        // payment
        var paytmParams = {};
        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.subTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };

        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY);

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        const requestAsync = async () => {
            return new Promise((resolve, reject) => {
                var options = {
                    hostname: 'securegw-stage.paytm.in',
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        // console.log('Response: ', response);
                        let temp = JSON.parse(response).body
                        temp.success = true
                        temp.cartClear = false
                        resolve(temp)
                    });
                });

                post_req.write(post_data);
                post_req.end();

            })
        }

        let myr = await requestAsync();
        res.status(200).json(myr);

    }
}

export default connectDB(handler);