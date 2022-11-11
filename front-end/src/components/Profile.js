import React from 'react'

function Profile() {
    const data = localStorage.getItem("loginUser")

    return (<>
        <div>
            <div className="p-16">
                <div className="p-8 bg-white shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-3">

                        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 mt-[10rem] flex items-center justify-center text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>

                    </div>
                    <div className="mt-20 text-center border-b pt-5 pb-12">
                        <h1 className="text-4xl font-medium text-gray-700">...</h1>
                        <p className="font-light text-gray-600 mt-3">{JSON.parse(data).email}</p>
                        <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                        <p className="mt-2 text-gray-500">University of Computer Science</p>
                    </div>  <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
                        <button className="hidden text-indigo-500 py-2 px-4  font-medium mt-4">  Show more</button>
                    </div>
                </div>
            </div>

        </div>
    </>
    )
}

export default Profile
