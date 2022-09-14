import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Order from "../models/Order"
import connectDB from "../middleware/mongoose"

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const router = useRouter();
    useEffect(() => {
        const fetchorders = async () => {
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
            })

            let res = await a.json();
            setOrders(res.orders);
            // console.log(res);
        }

        if (!localStorage.getItem("myuser")) {
            router.push("/");
        }
        else {
            fetchorders();
        }
    }, [])

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-4/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Animated Night Hill Illustrations</h1>
                            <p className="leading-relaxed mb-4">Your order has been successfully placed.</p>

                            <div className="flex mb-4">
                                <a className="flex-grow border-b-2 py-2 text-lg">Order Id</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg text-center">Email</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg text-right">Amount</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg text-right">Details</a>
                            </div>

                            {
                                orders.map((item) => {
                                    return (
                                        <div key={item._id} className="flex border-t border-gray-200 py-2">
                                            <span className="text-gray-500">{item.orderId}</span>
                                            <span className="text-gray-500 ml-auto">{item.email}</span>
                                            <span className="ml-auto text-gray-900">₹{item.amount}</span>
                                            <span className="ml-auto text-gray-900"><Link href={'/order?id=' + item._id}><a>Details</a></Link></span>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}



export default Orders