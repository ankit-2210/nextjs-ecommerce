import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Forget = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/");
        }
    }, [])

    const resetPassword = async () => {
        if (password == cpassword) {
            let data = {
                password,
                sendMail: false
            }

            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgetPassword`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            let res = await a.json();
            if (res.success) {
                console.log("Password has been changed");
            }
            else {
                console.log("error");
            }
        }
        else {

        }
    }

    const sendResetEmail = async () => {
        let data = {
            email,
            sendMail: true
        }

        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgetPassword`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let res = await a.json();
        if (res.success) {
            console.log("Password reset");
        }
        else {
            console.log("error");
        }
    }

    const handleChange = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value);
        }
        if (e.target.name == "password") {
            setPassword(e.target.value);
        }
        if (e.target.name == "cpassword") {
            setCpassword(e.target.value);
        }
    }

    return (
        <div>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img src="/logo.jpg" className="text-center justify-center h-24 w-40 mx-auto w-auto" />
                        {/* <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" /> */}
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-900">Forget Password</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            <Link href={'/login'}><a href="#" className="font-medium text-red-600 hover:text-red-500 text-xl"> Login </a></Link>
                        </p>
                    </div>


                    {router.query.token &&
                        <div>
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label For="password" className="sr-only">New Password</label>
                                    <input value={password} onChange={handleChange} id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New Password" />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label For="cpassword" className="sr-only">Conform Password</label>
                                    <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Conform New  Password" />
                                </div>
                            </div>

                            <div className="mt-4">
                                <button onClick={resetPassword} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-white-500 group-hover:text-white-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Submit
                                </button>
                            </div>
                            { }
                            {password && password != cpassword &&
                                <span className='text-red-600'>Passwords dont match</span>}
                            {password && password == cpassword &&
                                <span className='text-green-600'>Passwords matched </span>}

                        </div>
                    }

                    {!router.query.token &&
                        <div>
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label For="email" className="sr-only">Email address</label>
                                    <input value={email} onChange={handleChange} id="email" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <button onClick={sendResetEmail} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-white-500 group-hover:text-white-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Continue
                                </button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Forget