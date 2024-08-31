import React, { useState } from 'react'
import Loader from '../components/spinner'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

const Recovery = () => {
    const [email,setEmail] = useState("")
    const [loader,setLoader] = useState(0)
    const navigate = useNavigate()

    const submit = async(e) =>{
        e.preventDefault()
        try {
            setLoader(1)
            const req = await axios.get(`https://class-cache-be.vercel.app/api/recover-account/${email}`)
            setLoader(0)
            toast("✅ "+req.data.message)
            navigate('/')
        } catch (error) {
          setLoader(0)
          toast("❌ "+error.response.data.message)
        }
    }

  if(loader === 0)
  return (
    <div className='bg-yellow-100 h-screen py-8 px-14 flex items-center justify-center'>
        <div className='bg-yellow-200 pt-4 pb-4 rounded-lg w-auto'>
            <div className='border-b-2 border-black p-4'> 
            <h1 className='text-4xl'>Find Your Account</h1>
            </div>
            <div className='border-b-2 pb-4 mt-4 border-black'> 
            <p className='px-2'>Please enter your email address to search for your account.</p>
            </div>
            <form onSubmit={submit}>
            <div className='p-4 border-b-2 border-black'>
        <input 
        type='email'
        className='w-full h-[60px] rounded-lg mt-2 p-2 '
        placeholder='Email address'
        name='email'
        value={email}
        required
        onChange={(e) => {setEmail(e.target.value)
        }}
        > 
        </input>
      </div>
      <div className='mt-4 p-2 flex justify-end'>
        <button type="submit" className='btn-primary'>Submit</button>
      </div>
      </form>
        </div>
    </div>
  )
  else
  return(
  <div className='flex h-screen items-center justify-center bg-yellow-100'>
   <Loader></Loader>
  </div>
  )
}

export default Recovery
