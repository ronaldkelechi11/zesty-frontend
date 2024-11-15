import { ArrowLeft } from "@iconsans/react/bold"
import InputField from "./InputField"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    toast('Hello')
  }

  return (
    <div className="w-screen h-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="fixed top-3 left-3 w-10 h-10 bg-red-500 text-3xl flex justify-center items-center text-white rounded-lg cursor-pointer hover:scale-105" onClick={() => { navigate(-1) }}>
        <ArrowLeft />
      </div>

      <div className="w-3/4 p-3 rounded-lg bg-white">
        <form className="flex flex-col">
          <InputField label={'Email'} type={'email'} placeholder={'Admin Email'} required value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <InputField label={'Password'} type={'password'} placeholder={'Admin Password'} required value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <button onClick={handleSubmit} className="bg-purple-500 text-white rounded-lg p-[10px_30px] mt-5">Login</button>
        </form>
      </div>

      <ToastContainer
        hideProgressBar={true} position="top-right" closeOnClick="true" limit={3} />
    </div>
  )
}

export default Login