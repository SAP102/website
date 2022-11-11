import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Viewpage from '../pages/Viewpage';
import Delpopup from '../pages/Delpopup';


function Home({ searchField }) {
    const [product, setProduct] = useState([])
    const [viewPage, setViewPage] = useState(false)
    const [delPage, setDelPage] = useState(false)
    const [id, setId]= useState('')
    const navigate = useNavigate();

    const getAllProducts = () => {
        try {
            axios.get('http://localhost:5000/api/products', {
                headers: {
                    tokens: Cookies.get('tokens')
                }
            })
                .then((response) => {
                    setProduct(response.data.products)
                })
        } catch (error) {
            console.log("error")
        }
    }

    const deletProduct = (id) => {
        setId(id)
        setDelPage(!delPage)
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    const ViewPage = (id) => {
        setId(id)
        setViewPage(!viewPage)
    }

    const editHandler = (id, name) => {
        navigate('/update', { state: { id: id } })
    }
    return (
        <>
            <div className="overflow-x-auto">
                <div className="min-w-screen mt-20  flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-auto lg:w-5/6">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-[1200px] table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-lg text-center">sr.no</th>
                                        <th className="py-3 px-6 text-lg text-center">Name</th>
                                        <th className="py-3 px-6 text-lg text-center">Price</th>
                                        <th className="py-3 px-6 text-lg text-center">Category</th>
                                        {/* <th className="py-3 px-6 min-w-[20px] text-lg text-center">Company</th> */}
                                        <th className="py-3 px-6 text-lg text-center  min-w-[20px]">Actions</th>
                                    </tr>
                                </thead>
                                {
                                    product.filter((val) => {
                                        if (searchField === "") {
                                            return val;
                                        } else if (val.name.toLowerCase().includes(searchField.toLowerCase())) {
                                            return val;
                                        } else {
                                            return false;
                                        }
                                    }).map((item, index) =>
                                        <tbody key={item._id} className="text-gray-600 text-lg font-light">
                                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    {item.name}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    {item.price}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <span className="bg-purple-200 text-lg text-purple-600 py-1 px-3 rounded-full">{item.category}</span>
                                                </td>

                                                <td className="py-3 text-center">
                                                    <div className="flex item-center justify-center">
                                                        <button className="w-5 mr-5 transform hover:text-purple-500 hover:scale-110" onClick={() => ViewPage(item._id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <div className="w-5 mr-5 transform hover:text-purple-500 hover:scale-110">
                                                            <button className='w-5' onClick={() => editHandler(item._id, item.name)} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <button className="w-5 mr-5 transform hover:text-purple-500 hover:scale-110" onClick={() => { deletProduct(item._id) }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                                <ToastContainer />
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {
                viewPage && <Viewpage viewPage={viewPage} setViewPage={setViewPage} id={id} />
            }
            {
                delPage && <Delpopup delPage={delPage} setDelPage={setDelPage} id={id}/>
            }
        </>
    )
}
export default Home
