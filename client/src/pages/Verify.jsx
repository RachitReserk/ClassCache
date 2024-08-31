import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { MdOutlineVerified } from "react-icons/md";
import { motion } from 'framer-motion'

const Verify = () => {
    const token = useParams()
    const navigate = useNavigate()
    useEffect(()=> {
        const fetch = async () => {
            const req = axios.get(`https://class-cache-be.vercel.app/api/verify-email/${token.token}`)
        }
        fetch()
    setTimeout(() => {
        navigate('/signin')
    },3000)
    },[])
  return (
    <motion.h1
    initial = {{opacity: 0 , rotate: 20 , x:200 , y:100}}
    whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
    transition={{
      duration:0.5,
      delay:0.5,
      scale: {duration: 0.5},
  }}
    className="">
    <div className='h-screen flex items-center justify-center flex-col md:flex-row gap-4'>   
      <MdOutlineVerified size={100} color='lime' text /> 
      <p className='text-3xl'>Account verified !</p>
    </div>
    </motion.h1>
  )
}

export default Verify
