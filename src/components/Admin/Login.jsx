import InputField from "./InputField"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BackButton from '../basic/BackButton';
import axios from "axios"
import { CgSpinner } from "react-icons/cg"
import { motion } from 'framer-motion';



const Login = () => {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)

    axios.post(`${API_URL}/login`, { email, password })
      .then((result) => {
        toast.success('Admin Login Successful')
        sessionStorage.setItem('loggedIn', true)
        navigate('/admin')
      }).catch((err) => {
        toast.error(`${err?.message}`)
        console.log(err);
        setIsLoading(false)
      });
  }

  return (
    <div className="w-screen h-screen bg-gray-200 flex flex-col justify-center items-center">
      <BackButton />

      <div className="w-3/4 p-3 rounded-lg bg-white">
        <form className="flex flex-col">
          <InputField label={'Email'} type={'email'} placeholder={'Admin Email'} required value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <InputField label={'Password'} type={'password'} placeholder={'Admin Password'} required value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <button onClick={handleSubmit} className="bg-primary text-white rounded-lg p-[10px_30px] mt-5 flex justify-center items-center">
            {isLoading ?
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <CgSpinner />
              </motion.div>
              : 'Login'}
          </button>
        </form>
      </div>

      <ToastContainer position='top-right' limit={2} hideProgressBar closeOnClick={true} />
    </div>
  )
}

export default Login