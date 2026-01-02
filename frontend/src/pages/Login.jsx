import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';

const Login = () => {
  
  const [show , setShow] = useState(false);
  const navigate = useNavigate();
  const [loading , setLoading] = useState(false);

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const handleLogin = async ()=>{
    setLoading(true)
    try {
      const result  = await axios.post(serverUrl + "/api/auth/login" , 
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )

      setLoading(false)
      console.log(result.data)
      navigate('/')
      toast.success("login successfully")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }
  
  
    return (
      <div>
        <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
           <form onSubmit={(e)=>{e.preventDefault()}} className='w-[90%] md:w-200 h-150 bg-[white] shadow-xl rounded-2xl flex'>
              {/* left div */}
  
              <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                <div>
                  <h1 className='font-semibold text-[black] text-2xl'>Wellcome back</h1>
                  <h2 className='text-[#999797] text-[18px]'>Login in your account</h2>
                </div>
  
                <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                  
                  <label htmlFor="email" className='font-semibold' >Email</label>
                  <input onChange={(e)=>{setEmail(e.target.value)}} value={email} id='email' type='email' className=' border-[1px] w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Enter your email' />
                  <label htmlFor="password" className='font-semibold' >Password</label>
                  <input onChange={(e)=>{setPassword(e.target.value)}} value={password} id='password' type= { show ? "text" : "password" } className=' border-[1px] w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Enter your password' />
                  
                  {
                    show ? <FaEye onClick={()=>{setShow(false)}} className="absolute w-[20px] h-[20px] cursor-pointer right-[6%] bottom-[5%]"/>
                    :
                     <FaEyeSlash onClick={()=>{setShow(true)}} className="absolute w-[20px] h-[20px] cursor-pointer right-[6%] bottom-[5%]"/>
                  }
  
                </div>
  
                
  
                <button onClick={handleLogin} className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex  items-center justify-center rounded-[5px]' disabled =  {loading}> {loading ? <ClipLoader /> : "Login"} </button>
                <span className='text-[15px] cursor-pointer text-[#585757]'>Forget password ?</span>
  
                <div className='w-[80%] flex items-center gap-2'>
                  <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                  <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center' >Or Continue</div>
                  <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                </div>
  
                <div className='w-[80%] h-[40px] border-[1px] border-black rounded-[5px] flex items-center justify-center cursor-pointer' >
                  <img src={assets.google} alt="google" className='w-[25px]' />
                  <span className='text-[18px] text-gray-500'>oogle</span>
                </div>
                <div className='text-[#6f6f6f] '>
                  Don't have an account ? <span className='cursor-pointer' onClick={()=>{navigate('/signup')}}>SignUp</span>
                </div>
                
              </div>
  
              {/* right div */}
  
              <div className='w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden'>
                <img src={assets.logo} alt="logo" className='w-30 shadow-2xl' />
                <span className='text-2xl text-white'>VIRTUAL COURSES</span>
              </div>
           </form>
  
        </div>
      </div>
    )
}

export default Login
