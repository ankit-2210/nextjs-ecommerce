import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const profile = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [pincode, setPincode] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [npassword, setNpassword] = useState("");
    const [user, setUser] = useState({ value: null });

    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem("myuser"));
        if (!myuser) {
            router.push("/");
        }

        if (myuser && myuser.token) {
            setUser(myuser);
            setEmail(myuser.email);
            fetchData(myuser.token);
        }
    }, [])

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
    }

    const handleUserSubmit = async () => {
        // console.log("click");
        let data = { token: user.token, address, name, phone, pincode };
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateUser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let res = await a.json();
        // console.log(res);
        toast.success("Successfully Updated Details", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const handlePasswordSubmit = async () => {
        let res;
        if (npassword == cpassword) {
            let data = { token: user.token, password, cpassword, npassword };
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            res = await a.json();
        }
        else {
            res = { success: false }
        }

        if (res.success) {
            toast.success("Successfully Updated Password!", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error("Error Updating Password!", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setPassword("");
        setCpassword("");
        setNpassword("");
    }



    const handleChange = async (e) => {
        if (e.target.name == "name") {
            setName(e.target.value);
        }
        else if (e.target.name == "address") {
            setAddress(e.target.value);
        }
        else if (e.target.name == "phone") {
            setPhone(e.target.value);
        }
        else if (e.target.name == "pincode") {
            setPincode(e.target.value);
        }
        else if (e.target.name == "password") {
            setPassword(e.target.value);
        }
        else if (e.target.name == "cpassword") {
            setCpassword(e.target.value);
        }
        else if (e.target.name == "npassword") {
            setNpassword(e.target.value);
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
            <h1 className="font-bold text-3xl my-10 text-center">Update your Account</h1>
            <div className='container md:px-24'>
                <h2 className="text-xl font-bold mt-20 mb-6">1. Delivery Details</h2>
                <div className='mx-auto flex'>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4">
                            <label htmlFor='full-name' className="leading-7 text-sm text-gray-600 mb-3">Full Name</label>
                            <input onChange={handleChange} value={name} type="text" id="full-name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
                        <textarea onChange={handleChange} value={address} id="address" name="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" ></textarea>
                    </div>
                </div>


                <div className='mx-auto flex'>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4 mt-4">
                            <label htmlFor='phone' className="leading-7 text-sm text-gray-600 mb-3">Phone Number</label>
                            <input onChange={handleChange} value={phone} type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4 mt-4">
                            <label htmlFor='pincode' className="leading-7 text-sm text-gray-600">Pincode</label>
                            <input onChange={handleChange} value={pincode} type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <div>
                    <button onClick={handleUserSubmit} className="flex mt-3 mr-2 text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">Update</button>
                </div>


                <h2 className="text-xl font-bold mt-20 mb-6">2. Change Password</h2>
                <div className='mx-auto flex'>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4">
                            <label htmlFor='password' className="leading-7 text-sm text-gray-600 mb-3">Password</label>
                            <input onChange={handleChange} value={password} type="text" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className='px-2 w-1/2'>
                        <div className="mb-4">
                            <label htmlFor='npassword' className="leading-7 text-sm text-gray-600 mb-3">New Password</label>
                            <input onChange={handleChange} value={npassword} type="text" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className='px-2 w-1/2'>
                        <div className="mb-4">
                            <label htmlFor='cpassword' className="leading-7 text-sm text-gray-600 mb-3">Confirm New Password</label>
                            <input onChange={handleChange} value={cpassword} type="text" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>

                <div>
                    <button onClick={handlePasswordSubmit} className="flex mt-3 mr-2 text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">Update Password</button>
                </div>

            </div>

        </div>
    )
}

export default profile