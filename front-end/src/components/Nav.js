import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Nav({setSearchField}) {
  const navigate = useNavigate()
  let location = useLocation();

  const searchHandler = (event) => {
    setSearchField(event.target.value)
  }

  const logout = () => {
    try {
      axios.get('http://localhost:5000/api/logout')
      localStorage.removeItem('loginUser')
      toast.success('Logout successfully', {
        position: "bottom-right",
        autoClose: 1500,
      });
      navigate('/login')
    } catch (error) {
      console.log(error)
    }

  }

  const data = Cookies.get("tokens")
  const logiData = localStorage.getItem("loginUser")
  return (
    <>
      <div>
        <nav className="relative rounded-lg px-4 py-3 mt-[1.5rem] ml-[30px] mr-[30px] flex justify-between items-center shadow bg-white">
          <a className="text-3xl font-bold leading-none" href="/">
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          </a>

          <ul>
            {
              data && logiData ?
                <>
                  <div className='hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:ju lg:items-center lg:w-auto lg:space-x-6'>
                    <li><Link className="text-2xl capitalize text-blue-600 font-bold" to="/">home</Link></li>
                    <li className="text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </li>
                    <li><Link className="text-2xl capitalize text-blue-600 font-bold" to="/add">add</Link></li>
                    <li className="text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </li>
                    <li><Link className="text-2xl capitalize text-blue-600 font-bold" to="/Update">Update</Link></li>
                    <li className="text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </li>
                    <li><Link className="text-2xl capitalize text-blue-600 font-bold" to="/Profile">Profile</Link></li>
                  </div>
                  <div className='flex ml-auto items-center'>
                    <div className="relative flex mr-7 items-cente border-2 r w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                      <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>

                      <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        onChange={searchHandler}
                        id="search"
                        disabled = {location.pathname === "/" ? false: true}
                        placeholder={location.pathname === "/" ? " Search something.." : " " + " Disabled"} />
                    </div>
                    <li><Link onClick={logout} className="text-2xl capitalize text-blue-600 font-bold" to="/login">LogeOut</Link></li>
                  </div>
                </>
                :
                <>
                  <Link className=" lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-blue-600 text-2xl capitalize text-white font-bold  rounded-xl transition duration-200" to="/login">Sign In</Link>
                  <Link className=" lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-2xl capitalize text-white font-bold rounded-xl transition duration-200" to="/signup">Sign up</Link>
                </>
            }
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Nav
