import React from 'react'
import InputField from '../components/Admin/InputField'

const Track = () => {
    return (
        <div className='text-black body-font bg-gray-100 w-screen h-screen'>
            <div className="container mx-auto flex px-5 py-24 flex-col">
                <p className='text-6xl font-extrabold'>Track a package</p>
                <h3 className="tracking-widest mt-4 text-primary text-xs font-medium title-font">
                    Use Tracking code provided to you to check status of your package
                </h3>
                <InputField placeholder={'Tracking Code(G-CARGO)'} />
                <button className="bg-primary rounded-xl py-3 px-10 text-white self-start">Search</button>
            </div>
        </div>
    )
}

export default Track