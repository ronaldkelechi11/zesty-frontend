import InputField from "./InputField"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import BackButton from '../basic/BackButton';
import axios from "axios"


const Login = () => {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Loading...');
    console.log(API_URL + "/login");


    axios.post(API_URL + "/login", { email, password })
      .then((result) => {
        toast.success('Admin Login Successful')
        sessionStorage.setItem('loggedIn', true)
        navigate('/admin')
      }).catch((err) => {
        toast.error(`${err?.message}`)
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
          <button onClick={handleSubmit} className="bg-primary text-white rounded-lg p-[10px_30px] mt-5">Login</button>
        </form>
      </div>

      <ToastContainer position='top-right' limit={2} hideProgressBar closeOnClick={true} />
    </div>
  )
}

export default Login