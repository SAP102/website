import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import Cookies from 'js-cookie'

import { toast } from 'react-toastify'

export default function Viewpage({ id, setViewPage, viewPage }) {

    const [products, setProducts] = useState({
        name: "",
        description: "",
        Company: "",
        price: "",
        category: "",
        image: ""
    })
    const cancelButtonRef = useRef(null)


    useEffect(() => {
        getProductditail()
    }, [])

    const getProductditail = () => {
        try {
            axios.get(`http://localhost:5000/api/products/${id}`, {
                headers: {
                    tokens: Cookies.get('tokens')
                }
            })
                .then((response) => {
                    setProducts(response.data.product)
                })
        } catch {
            toast.success('Product add successfully', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
            });
        }
    }

    return (
        <Transition.Root show={viewPage} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setViewPage}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-[32%]">
                                <div className='min-w-screen mt-20  flex items-center justify-center font-sans overflow-hidden"'>
                                    <div className="">
                                        <div className="mt-5 md:mt-0 md:col-span-2">
                                            <div className='w-[650px] '>
                                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                                        <div>
                                                            <label htmlFor="name" className="block text-xl font-medium text-gray-700">First name</label>
                                                            <label htmlFor="name" className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md">{products?.name}</label>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="description" className="block text-xl font-medium text-gray-700">description</label>
                                                            <label htmlFor="name" className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md">{products?.description}</label>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="Company" className="block text-xl font-medium text-gray-700">Company</label>
                                                            <label htmlFor="name" className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md">{products?.Company}</label>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="price" className="block text-xl font-medium text-gray-700">price</label>
                                                            <label htmlFor="name" className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md">{products?.price}</label>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="category" className="block text-xl font-medium text-gray-700">category</label>
                                                            <label htmlFor="name" className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md">{products?.category}</label>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xl font-medium text-gray-700">
                                                                IMAGE
                                                            </label>
                                                            <div className='flex gap-3'>
                                                                <img className='w-[301px] h-[148px] mt-auto m-auto rounded-md border-solid border-2 border-indigo-600' crossOrigin="anonymous" src={products && products.image && `http://localhost:5000/image/${products.image}`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setViewPage(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
