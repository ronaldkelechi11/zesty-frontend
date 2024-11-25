import InputField from '../Admin/InputField';
import { useState } from 'react';
import axios from 'axios';
import { isEmpty } from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import { CgSpinner } from 'react-icons/cg';
import { motion } from 'framer-motion';


const Trackform = ({ setPackageDetails }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [trackingId, setTrackingId] = useState('')
    const API_URL = import.meta.env.VITE_API_URL

    const handleSubmit = () => {
        setIsLoading(true)
        if (isEmpty(trackingId)) {
            toast.error('Invalid Tracking Code')
            setIsLoading(false)
            return false;
        }


        axios.post(API_URL, { trackingId })
            .then((result) => {
                setPackageDetails(result.data.trackingPackage)
                setIsLoading(false)
                toast.success('Package Found')
            }).catch((err) => {
                toast.error(`${err.message}`)
                setIsLoading(false)
            });
    }

    return (
        <div className='bg-white text-black font-grotesk p-3'>
            <ToastContainer position='top-right' limit={2} hideProgressBar closeOnClick={true} />

            <p className='font-extrabold text-center py-2 text-3xl uppercase'>Enter your tracking Code</p>
            <InputField type={'text'} placeholder={'Tracking Code'} value={trackingId}
                onChange={({ target }) => { setTrackingId(target.value) }} />
            <button className="p-[10px_20px] text-sm text-white font-grotesk cursor-pointer rounded-lg bg-primary w-full md:w-auto flex justify-center items-center" onClick={handleSubmit}>
                {isLoading ?
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <CgSpinner />
                    </motion.div>
                    : 'Track'}
            </button>
        </div >
    )
}

export default Trackform