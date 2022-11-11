import axios from 'axios'
import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [user, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleData = (event) => {
        setData({ ...user, [event.target.name]: event.target.value })
    }

    const handlelogin = async () => {
        if (!user.email || !user.password) {
            return (
                toast.error('Plese enter ditail', {
                    position: "bottom-right",
                    autoClose: 1500,
                })
            )
        }
        await axios.post('http://localhost:5000/api/login', {
            email: user.email,
            password: user.password
        }).then((res) => {
            console.log("🚀 ~ file: Login.js ~ line 31 ~ handlelogin ~ res", res)
            Cookies.set('tokens',`${ res.data.auth}`)
            localStorage.setItem('loginUser', JSON.stringify(res.data.user))
            toast.success('Logine successfully', {
                position: "bottom-right",
                autoClose: 1500,
            });
            navigate('/')
        }).catch(() => {
            toast.error('Plese enter valid ditail', {
                position: "top-right",
                autoClose: 1500,
            });
        })
    }
    return (
        <>
            <div className="min-h-[0vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-lg">
                <div className="w-[28rem] space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>

                    </div>
                    <div className="mt-8 space-y-6" >
                        <input type="hidden" name="remember" defaultValue="True" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className='mb-2'>
                                {/* <p htmlFor="email-address"  className="sr-only text-lg relative w-auto text-black">Email address</p> */}
                                <input onChange={handleData} value={user.email} id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-3" placeholder="Email address" />
                            </div>
                            <div>
                                {/* <label htmlFor="password" className="sr-only">Password</label> */}
                                <input onChange={handleData} value={user.password} id="password" name="password" required className="appearance-none rounded-none relative block w-full px-3 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>

                        <div>
                            <button onClick={handlelogin} type="submit" className="group relative w-full flex justify-center  px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-3">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="True">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login
