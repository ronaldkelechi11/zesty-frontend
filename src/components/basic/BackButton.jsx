import { ArrowLeft } from '@iconsans/react/linear'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <div className="fixed top-3 left-3 w-12 h-12 bg-red-500 text-3xl flex justify-center items-center text-white rounded-lg cursor-pointer hover:scale-105" onClick={() => { navigate(-1) }}>
            <ArrowLeft />
        </div>
    )
}

export default BackButton
