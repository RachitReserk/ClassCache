import React, { useEffect, useState } from 'react'
import Loader from '../components/spinner'
import { useParams } from 'react-router-dom'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { makeStyles, styled } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom'

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

const ResetPassword = () => {
  const {token} = useParams()
  const [loader,setLoader] = useState(0)
  const [password,setPassword]=useState("")
  const [cpassword,csetPassword]=useState("")
  const navigate = useNavigate()
  
  const submit = async (e) => {
    e.preventDefault()
    try {
        setLoader(1)
        const req = await axios.post(`https://class-cache-be.vercel.app/api/verify-reset/${token}`,{password})
        toast("✅ "+req.data.message)
        navigate('/')
    } catch (error) {
        setLoader(0)
        console.log(error)
        toast("❌ "+error.response.data.message)
    }
     }

  if(loader === 0)
  return (
    <div className='bg-yellow-100 h-screen py-8 px-14 flex items-center justify-center'>
    <div className='bg-yellow-200 pt-4 pb-4 rounded-lg w-auto p-8 '>
    <form onSubmit={submit}>   
     <div className=''>
        <label className='text-3xl underline' htmlFor=''>
        Reset Password
        </label>
        <LightTooltip title={password.length > 4 ? "✅ password should be greater than 4":"❌ password should be greater than 4"} placement='left'>
        <input 
        type='password'
        className='w-full mt-6 p-2 outline-none'
        placeholder='New password'
        name='password'
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        required
        /> 
        </LightTooltip>
        <LightTooltip title={password === cpassword && cpassword !== "" ? "✅":"❌"} placement='left'>
        <input 
        type='password'
        className='w-full mt-2 p-2 outline-none'
        placeholder='Confirm password'
        name='confirmPassword'
        required
        value={cpassword}
        onChange={(e) => {csetPassword(e.target.value)}}
        /> 
        </LightTooltip>
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

export default ResetPassword
