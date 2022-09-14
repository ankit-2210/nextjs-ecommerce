import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Order from "../models/Order"
import connectDB from "../middleware/mongoose"
import mongoose from 'mongoose';
import Error from 'next/error'

const order = ({ order, clearCart, error }) => {
    // console.log(error);
    const router = useRouter();
    const products = order.products;

    const [date, setDate] = useState();


    useEffect(() => {
        const dt = new Date(order.createdAt);
        setDate(dt);

        if (router.query.clearCart == 1) {
            clearCart();
        }
    }, [])

    // if (error == 404) {
    // return <Error statusCode={404} />
    // }

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
                        <p className="leading-relaxed mb-4">Your order has been successfully placed.</p>
                        <p className="leading-relaxed mb-4">Order place on: {date && date.toLocaleDateString("en-US", {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })} </p>
                        <p className="leading-relaxed mb-4">Your Payment Status is : <span className='text-green-400 font-semibold'>{order.status}</span></p>
                        <div className="flex mb-4">
                            <a className="flex-grow text-green-500 border-b-2 border-green-500 py-2 text-lg px-1">Description</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
                            <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
                        </div>

                        {Object.keys(products).map((item) => {
                            return (
                                <div key={item} className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">{products[item].name}</span>
                                    <span className="ml-auto text-gray-900">{products[item].qty}</span>
                                    <span className="ml-auto text-gray-900">₹{products[item].price} X {products[item].qty} =  ₹{products[item].price}*{products[item].qty}</span>
                                </div>
                            )
                        })
                        }


                        <div className="flex-row py-5">
                            <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order.amount}</span>
                        </div>
                        <div className='py-2'>
                            <button className="ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">Button</button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>

    )
}


export async function getServerSideProps(context) {
    let error = null;
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    let order = await Order.findById(context.query.id);
    // console.log(order);
    // if (order.products == null) {
    // return {
    // props: { error: 404 }
    // }
    // }

    return {
        props: { error: error, order: JSON.parse(JSON.stringify(order)) }, // will be passed to the page component as props
    }
}

export default order