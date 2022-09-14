import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillHandbagFill } from 'react-icons/bs';
import Head from 'next/head'
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [pincode, setPincode] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [user, setUser] = useState({ value: null });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"));
        if (myuser && myuser.token) {
            setUser(myuser);
            setEmail(myuser.email);
            fetchData(myuser.token);
        }
    }, [])

    useEffect(() => {
        if (name.length > 3 && email.length > 3 && phone.length > 3 && address.length > 3 && pincode.length > 3) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [name, email, phone, pincode, address])


    const getPincode = async (pin) => {
        // console.log(pin);
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        // console.log(pinJson);
        if (Object.keys(pinJson).includes(pin)) {
            setCity(pinJson[pin][0])
            setState(pinJson[pin][1]);
            console.log(pinJson[pin][0]);
        }
        else {
            setCity('');
            setState('');
        }
    }


    const fetchData = async (token) => {
        let data = { token: token };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let res = await a.json();
        // console.log(res);
        setName(res.name);
        setAddress(res.address);
        setPincode(res.pincode);
        setPhone(res.phone);

        getPincode(res.pincode);
    }


    const handleChange = async (e) => {
        if (e.target.name == "name") {
            setName(e.target.value);
        }
        else if (e.target.name == "email") {
            setEmail(e.target.value);
        }
        else if (e.target.name == "address") {
            setAddress(e.target.value);
        }
        else if (e.target.name == "phone") {
            setPhone(e.target.value);
        }
        else if (e.target.name == "pincode") {
            setPincode(e.target.value);

            if (e.target.value.length == 6) {
                getPincode(e.target.value);
            }
            else {
                setCity('');
                setState('');
            }
        }

    }


    // payment method
    const initiatePayment = async () => {
        let oid = Math.floor(Math.random() * Date.now());
        // console.log(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`);

        const data = { cart, subTotal, oid, email, name, address, pincode, phone, state, city };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let txnRes = await a.json();
        console.log(txnRes);

        if (txnRes.success) {
            let txnToken = txnRes.txnToken;

            var config = {
                "root": "",
                "flow": "DEFAULT",
                "data": {
                    "orderId": oid, /* update order id */
                    "token": txnToken, /* update token value */
                    "tokenType": "TXN_TOKEN",
                    "amount": subTotal /* update amount */
                },
                "handler": {
                    "notifyMerchant": function (eventName, data) {
                        console.log("notifyMerchant handler function called");
                        console.log("eventName => ", eventName);
                        console.log("data => ", data);
                    }
                }
            }

            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                // after successfully updating configuration, invoke JS Checkout
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("error => ", error);
            })
        }
        else {
            if (txnRes.cartClear) {
                clearCart();
            }
            toast.error(txnRes.error, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className='container m-auto'>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />

            <h1 className="font-bold text-3xl my-10 text-center">Checkout</h1>
            <div className='container md:px-24'>
                <h2 className="text-xl font-bold mt-20 mb-6">1. Delivery Details</h2>
                <div className='mx-auto flex'>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4">
                            <label htmlFor='full-name' className="leading-7 text-sm text-gray-600 mb-3">Full Name</label>
                            <input onChange={handleChange} value={name} placeholder="Enter your name" type="text" id="full-name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className='px-2 w-1/2'>
                        <div className="mb-4">
                            <label htmlFor='email' className="leading-7 text-sm text-gray-600">Email</label>
                            {user && user.token ?
                                <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
                                : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            }
                        </div>
                    </div>

                </div>

                <div className='px-2 w-full'>
                    <div className="mb-4 mt-4">
                        <label htmlFor='address' className="leading-7 text-sm text-gray-600">Address</label>
                        <textarea onChange={handleChange} value={address} placeholder="Enter your address" id="address" name="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
                    </div>
                </div>


                <div className='mx-auto flex'>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4 mt-4">
                            <label htmlFor='phone' className="leading-7 text-sm text-gray-600 mb-3">Phone Number</label>
                            <input onChange={handleChange} value={phone} placeholder="Enter 10 digit number" type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4 mt-4">
                            <label htmlFor='pincode' className="leading-7 text-sm text-gray-600">Pincode</label>
                            <input onChange={handleChange} value={pincode} placeholder="Enter your pincode" type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <div className='mx-auto flex'>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4 mt-4">
                            <label htmlFor='state' className="leading-7 text-sm text-gray-600 mb-3">State</label>
                            <input onChange={handleChange} type="text" value={state} id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4 mt-4">
                            <label htmlFor='city' className="leading-7 text-sm text-gray-600">City</label>
                            <input onChange={handleChange} type="text" value={city} id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <h2 className="text-xl font-bold mt-20 mb-6">2. Review Cart Items & Pay</h2>
                <div className='w-100 sideCart bg-green-100 p-10'>
                    <ol className='list-decimal font-semibold'>
                        {
                            Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>
                        }
                        {
                            Object.keys(cart).map((k) => {
                                return (
                                    <li key={k}>
                                        <div className='item flex my-5'>
                                            <div className='font-semibold'>{cart[k].name} ({cart[k].size} / {cart[k].variant})</div>
                                            <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
                                                <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].name, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-green-500' />
                                                <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                                <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].name, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-green-500' />
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }


                    </ol>
                    <span className='font-bold'>SubTotal: ₹{subTotal}</span>

                </div>
                <div>
                    <Link href={'/checkout'}><button disabled={disabled} onClick={initiatePayment} className="disabled:bg-green-300 flex mt-3 mr-2 text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"><BsFillHandbagFill className='m-1 mx-2' />Pay Bill</button></Link>
                </div>
            </div>

        </div>
    )
}

export default checkout