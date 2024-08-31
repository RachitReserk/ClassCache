import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { makeStyles, styled } from '@mui/material/styles';
import Loader from '../components/spinner'

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));


const SignUp = () => {
  const [userInfo,setuserInfo] = useState({
    username:"",
    email:"",
    password:"",
    address:""})
    const navigate = useNavigate()
  const change = (event) => {
    const {name , value} = event.target
    setuserInfo({...userInfo,[name]:value})
  }
  const [loader,setLoader] = useState(0)
  const [confirmPass,setconfirmPass] = useState("")

  const submit = async (e) => {
    e.preventDefault();
  try {
    if(userInfo.username === '' || userInfo.password === '' || userInfo.email === '')
      toast("❌ All fields are required")
    else if(userInfo.password !== confirmPass)
      toast("❌ Passwords do not match !")
    else{
    setLoader(1)
    const response = await axios.post('https://class-cache-be.vercel.app/api/sign-up',userInfo)
    navigate('/')
    toast("✅ Verification email sent !")
  }
  } catch (error) {
    toast(error.response.data.message)
    setLoader(0)
    console.log(error.response.data)
  }
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation.getCurrentPosition(success, error))
    } else {
      console.log("Geolocation not supported");
    }
  }

  const success = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    const loca = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
    console.log(loca)
    setuserInfo({...userInfo,address:loca.data.error_message})
  }

  function error() {
    console.log("Unable to retrieve your location");
    console.log()
  }
  if(loader === 0)
  return (
    <div className='bg-yellow-100 lg:h-screen h-auto py-8 px-12 flex items-center justify-center'>
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
     <p className='text-4xl'>Sign-Up</p>
     <div className='mt-4'>
      <div>
        <label htmlFor='' className=''>
          Username
        </label>
        <LightTooltip title={userInfo.username.length > 4 ? "✅ username should be greater than 4":"❌ username should be greater than 4"} placement='left'>
        <input 
        type='text'
        className='w-full mt-2 p-2 outline-none'
        placeholder='username'
        name='username'
        required
        value={userInfo.username}
        onChange={change}
        ></input>
        </LightTooltip>
      </div>
      <div className='mt-4'>
        <label htmlFor=''>
        Password
        </label>
        <LightTooltip title={userInfo.password.length > 4 ? "✅ password should be greater than 4":"❌ password should be greater than 4"} placement='left'>
        <input 
        type='password'
        className='w-full mt-2 p-2 outline-none'
        placeholder='password'
        name='password'
        value={userInfo.password}
        onChange={change}
        > 
        </input>
        </LightTooltip>
        <LightTooltip title={userInfo.password === confirmPass && confirmPass !== "" ? "✅":"❌"} placement='left'>
        <input 
        type='password'
        className='w-full mt-2 p-2 outline-none'
        placeholder='confirm password'
        name='confirmPassword'
        value={confirmPass}
        onChange={(event) => setconfirmPass(event.target.value)}
        > 
        </input>
        </LightTooltip>
      </div>
      <div className='mt-4'>
        <label htmlFor=''>
        Email
        </label>
        <LightTooltip title={"Email must belong to JUIT's domain and unique"} placement='left'>
        <input 
        type='email'
        className='w-full mt-2 p-2 outline-none'
        placeholder='231030000@juitsolan.in'
        name='email'
        value={userInfo.email}
        onChange={change}
        > 
        </input>
        </LightTooltip>
      </div>
      <div className='mt-4'>
        <button type="submit" className='transition duration-300 ease-in-out hover:scale-110 w-full bg-yellow-300 font-semibold py-2 rounded'>
          Sign-Up</button>
      </div>
     </div>
     </motion.h1>
     </form>
     </div>   
  )
  else
  return(
  <div className='flex h-screen items-center justify-center bg-yellow-100'>
   <Loader></Loader>
  </div>
  )
}

export default SignUp

