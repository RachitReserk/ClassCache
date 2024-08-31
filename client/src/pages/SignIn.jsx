import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {authActions} from '../store/auth.js'
import {useDispatch} from 'react-redux'

const SignIn = () => {
  
  const [userInfo,setuserInfo] = useState({
    username:"",
    password:"",
     })
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const change = (event) => {
    const {name , value} = event.target
    setuserInfo({...userInfo,[name]:value})
  }
  const submit = async (e) => {
    e.preventDefault();
  try {
    if(userInfo.username === '' || userInfo.password === '')
      toast("All fields are required")
    else{
    const response = await axios.post('https://class-cache-be.vercel.app/api/sign-in',userInfo,{withCredentials: true})
    navigate('/')  
    toast("✅ Login successful")
    dispatch(authActions.login())
  }
  } catch (error) {
    toast(error.response.data.message)
  }
  }

  return (
    <div className='bg-yellow-100 h-screen py-8 px-12 flex items-center justify-center'>
     <form onSubmit={submit} className='bg-yellow-200 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
     <motion.h1
            initial = {{opacity: 0 , rotate: 20 , x:200 , y:100}}
            whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
            transition={{
              duration:0.5,
              delay:0.5,
              scale: {duration: 0.5},
          }}
            className="">
     <p className='text-3xl'>Login</p>
     <div className='mt-4'>
      <div>
        <label htmlFor='' className=''>
          Username
        </label>
        <input 
        type='text'
        className='w-full mt-2 p-2 outline-none'
        placeholder='username'
        name='username'
        required
        value={userInfo.username}
        onChange={change}
        ></input>
      </div>
      <div className='mt-4'>
        <label htmlFor=''>
        Password
        </label>
        <input 
        type='password'
        className='w-full mt-2 p-2 outline-none'
        placeholder='password'
        name='password'
        value={userInfo.password}
        onChange={change}
        > 
        </input>
        <div className='mt-2 hover:text-blue-400'>
        <a href='/signin/recovery' target='_blank'>Forgotten account ?</a>
        </div>
      </div>
      <div className='mt-4'>
        <button className='transition duration-300 ease-in-out hover:scale-110 w-full bg-yellow-300 font-semibold py-2 rounded' type="submit">Login</button>
      </div>
      <div className='mt-4 flex items-center justify-center'>
        or
      </div>
      <div className='mt-3 flex items-center justify-center'>
        <div className='flex flex-row gap-2'>
        Don't have an account ? <div className='underline transition duration-300 ease-in-out hover:scale-110 '><Link to='/signup'>Sign-Up</Link></div>
        </div>
      </div>
     </div>
     </motion.h1>
     </form>
     </div>      
  )
}

export default SignIn
