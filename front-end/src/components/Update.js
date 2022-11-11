import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Update() {
  // const [image, setImage] = useState('')
  const [image, setImage] = useState('')
  const [view, setview] = useState('')
  const [products, setProducts] = useState({
    name: "",
    description: "",
    Company: "",
    price: "",
    category: "",
    image: ""
  })
  let location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    getProductditail()
  }, [])

  const handleData = (event) => {
    setProducts({ ...products, [event.target.name]: event.target.value })
  }
  const handleChnage = (e) => {
    setImage(e.target.files[0])
    setview(URL.createObjectURL(e.target.files[0]))

  }

  const getProductditail = () => {
    try {
      axios.get(`http://localhost:5000/api/products/${location.state.id}`, {
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

  const handleProduct = (e) => {

    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', products.name)
      formData.append('description', products.description)
      formData.append('Company', products.Company)
      formData.append('price', products.price)
      formData.append('category', products.category)
      formData.append('image', image)

      axios.put(`http://localhost:5000/api/products/${location.state.id}`, formData, {
        headers: {
          tokens: Cookies.get('tokens')
        }
      }).then((response) => {
        toast.success('Product add successfully', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
        });
        navigate('/')
        console.log(response.data.product)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex justify-center items-center h-[90vh]'>
        <div className="">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div method="POST" className='w-[650px] '>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label htmlFor="name" className="block text-xl font-medium text-gray-700">First name</label>
                    <input type="text" onChange={handleData} value={products.name} name="name" id="first_name"  className="mt-1 focus:ring-indigo-500 p-2 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-xl font-medium text-gray-700">description</label>
                    <input type="text" onChange={handleData} value={products.description} name="description" id="description"  className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-xl font-medium text-gray-700">price</label>
                    <input type="text" onChange={handleData} value={products.price} name="price" id="price"  className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-xl font-medium text-gray-700">category</label>
                    <input type="text" onChange={handleData} value={products.category} name="category" id="category"  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xl p-2 border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-xl font-medium text-gray-700">category</label>
                    <input type="text" onChange={handleData} value={products.Company} name="category" id="category"  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xl p-2 border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-xl font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className='flex gap-3'>
                      <div className='flex gap-3'>
                        {
                          !view ?
                            <img className='w-[301px] h-[148px] mt-auto  rounded-md border-solid border-2 border-indigo-600' crossOrigin="anonymous" src={`http://localhost:5000/image/${products.image} `} />
                            :
                            <div className='w-[301px] h-[148px] mt-auto rounded-md border-solid border-2 border-indigo-600' style={{ backgroundImage: `url(${view})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center,center" }} />
                        }
                      </div>
                      <label htmlhtmlfor="file-upload" className="w-1/2 ml-auto relative cursor-pointer bg-transparent font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 space-y-1 text-center mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">

                        <div className="">
                          <div className="">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="True">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-xl text-gray-600">
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" onChange={handleChnage} type="file" className="s-only" />
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" onClick={handleProduct} className="inline-flex justify-center w-50 py-3 mb-3  px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                  </button><button type="submit" onClick={()=>{navigate('/')}} className="inline-flex justify-center w-50 py-3 mb-3  px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Update
