import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillHandbagFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md'
import { useRouter } from 'next/router';


const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal, user, logout, key }) => {
    // console.log(addToCart, removeFromCart, clearCart, subTotal);
    const [dropDown, setdropDown] = useState(false);
    const [sideBar, setsideBar] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (Object.keys(cart).length !== 0) {
            setsideBar(true)
        }

        let emented = ['/checkout', '/order', '/orders', '/profile'];
        if (emented.includes(router.pathname)) {
            setsideBar(false);
        }

    }, []);

    const ref = useRef();
    const toggleCart = () => {
        setsideBar(!sideBar);
        // if (ref.current.classList.contains("translate-x-full")) {
        // ref.current.classList.remove("translate-x-full");
        // ref.current.classList.add("translate-x-0");
        // }
        // else if (!ref.current.classList.contains("translate-x-full")) {
        // ref.current.classList.remove("translate-x-0");
        // ref.current.classList.add("translate-x-full");
        // }
    }

    return (
        <header className='sticky top-0 bg-white z-10'>
            <div className="text-gray-600 body-font shadow-xl">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium  items-center text-gray-900 mb-4 md:mb-0 mr-auto">
                        <Link href={'/'}><Image src="/logo.jpg" width={100} height={72} /></Link>
                        <span className="pr-10 text-xl text-green-800 font-bold">Tailblocks</span>
                    </a>
                    <nav className="md:ml-auto md:mr-auto space-x-6 flex flex-wrap items-center  text-base font-bold text-lg text-green-600 justify-center" style={{ marginLeft: 0 }}>
                        <Link href={'/tshirts'} className="mr-5"><a className='hover:text-green-800'>Tshirts</a></Link>
                        <Link href={'/hoodies'} className="mr-5"><a className='hover:text-green-800'>Hoodies</a></Link>
                        <Link href={'/stickers'} className="mr-5"><a className='hover:text-green-800'>Stickers</a></Link>
                        <Link href={'/mugs'} className="mr-5"><a className='hover:text-green-800'>Mugs</a></Link>
                    </nav>
                </div>
            </div>
            <button className="flex cursor-pointer cart absolute right-0 top-10 mx-5">
                <span onMouseOver={() => { setdropDown(true) }} onMouseLeave={() => { setdropDown(false) }}>
                    {dropDown && <div onMouseOver={() => { setdropDown(true) }} onMouseLeave={() => { setdropDown(false) }}
                        className="absolute right-12 bg-white shadow-lg border top-6 rounded-md w-36">
                        <ul className='py-4'>
                            <Link href={'/profile'}><a ><li className="py-2 text-md hover:text-green-700 font-bold">Profile</li></a></Link>
                            <Link href={'/orders'}><a><li className="py-2 text-md hover:text-green-700 font-bold">My Orders</li></a></Link>
                            <i className="fa fa-sign-out" aria-hidden="true"></i><li onClick={logout} className="py-2 text-md hover:text-green-700 font-bold">Logout</li>
                        </ul>
                    </div>}
                    {user.value && <MdAccountCircle className='text-3xl md:text-4xl mx-4 text-green-800' />}
                </span>
                {!user.value && <Link href={'/login'}>
                    <a>
                        <button className="flex mr-5 text-white bg-green-500 border-0 py-2 px-7 focus:outline-none hover:bg-green-600 rounded text-lg">Login</button>
                    </a>
                </Link>}

                <AiOutlineShoppingCart onClick={toggleCart} className="text-3xl md:text-4xl text-green-800" />
            </button>


            <div ref={ref} className={`w-100 sideCart overflow-y-scroll absolute top-10 bg-green-100 p-8 transition-all ${sideBar ? 'right-0' : '-right-96'}`}>
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className='absolute top-2 right-1 text-3xl cursor-pointer text-green-500'><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold'>
                    {
                        Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>
                    }
                    {
                        Object.keys(cart).map((k) => {
                            return (
                                <li key={k}>
                                    <div className='item flex my-5'>
                                        <div className='w-2/3 font-semibold'>{cart[k].name} ({cart[k].size} / {cart[k].variant})</div>
                                        <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
                                            <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-green-500' />
                                            <span className='mx-2 text-sm'>{cart[k].qty}</span>
                                            <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-green-500' />
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ol>
                <div className='font-bold mt-12'>SubTotal: ₹{subTotal}</div>
                <div className='flex'>
                    <Link href={'/checkout'}><button disabled={Object.keys(cart).length == 0} className="disabled:bg-green-300 flex mt-8 mr-2 text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"><BsFillHandbagFill className='m-1 mx-2' />Checkout</button></Link>
                    <button disabled={Object.keys(cart).length == 0} onClick={clearCart} className="disabled:bg-green-300 flex mt-8 mr-2 text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">Clear Cart</button>
                </div>
            </div>

        </header>
    )
}

export default Navbar