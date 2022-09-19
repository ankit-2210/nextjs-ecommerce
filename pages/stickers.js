import React from 'react'
import Link from 'next/link'
import Product from "../models/Product"
import mongoose from "mongoose";
import Image from 'next/image'

const Stickers = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 text-center justify-center">
                        {Object.keys(products).length == 0 && <h3 className='font-bold text-xl mt-10 mb-8'>Sorry! All the mugs are currenty out of stock. New Stock coming soon. Stay Tunned !</h3>}

                        {Object.keys(products).map((item) => {
                            return (
                                <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`} >
                                    <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-4">
                                        <a className="block relative  rounded overflow-hidden">
                                            <img alt="ecommerce" className="w-full h-full block md:m-4" src={products[item].img} />
                                        </a>
                                        <div className="mt-4 text-center">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                                            <p className="mt-1">₹ {products[item].price}</p>
                                            <div className='mt-1'>
                                                {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                                                {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                                                {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                                            </div>
                                            <div className='mt-1'>
                                                {products[item].color.includes('red') && <button className='border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                                                {products[item].color.includes('blue') && <button className='border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                                                {products[item].color.includes('black') && <button className='border-2 border-gray-300 ml-1 bg-black-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                                                {products[item].color.includes('green') && <button className='border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                                                {products[item].color.includes('yellow') && <button className='border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                                                {products[item].color.includes('pink') && <button className='border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none'></button>}

                                            </div>
                                        </div>
                                    </div>

                                </Link>
                            )
                        })
                        }

                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    let products = await Product.find({ category: 'stickers' });
    let stickers = {};
    for (let item of products) {
        if (item.title in stickers) {
            if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
                stickers[item.title].color.push(item.color);
            }
            if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
                stickers[item.title].size.push(item.size);
            }
        }
        else {
            stickers[item.title] = JSON.parse(JSON.stringify(item));

            if (item.availableQty > 0) {
                stickers[item.title].color = [item.color];
                stickers[item.title].size = [item.size];
            }
            else {
                stickers[item.title].color = [];
                stickers[item.title].size = [];
            }
        }
    }


    return {
        props: { products: JSON.parse(JSON.stringify(stickers)) }, // will be passed to the page component as props
    }
}



export default Stickers