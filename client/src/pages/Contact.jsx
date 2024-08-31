import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { SlideUp } from '../components/Hero/Hero'
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/spinner'

const Contact = () => {
  const [title,setTitle] = useState("")
  const [branch,setBranch] = useState("")
  const [semester,setSemester] = useState("")
  const [subject,setSubject] = useState("")
  const [message,setMessage] = useState("")
  const [email,setEmail] = useState("")
  const [file, setFile] = useState()
  const [thanks,setThanks] = useState("no")
  const navigate = useNavigate()

  const log = useSelector((state) => state.auth.isLoggedIn)
  const MAX_SIZE = 10085760

  const submit = async(event) => {
    event.preventDefault()
    const User = await axios.get('https://class-cache-be.vercel.app/api/userInfo',{withCredentials: true})
    setEmail(User.data.email)

    const info= {
      titlex:title,
      branchx:branch,
      semesterx:semester,
      subjectx:subject,
      messagex:message,
      emailx:email
    }
    
    const response = await axios.post('https://class-cache-be.vercel.app/api/add-contri',info,{withCredentials: true});

    const url = `https://api.cloudinary.com/v1_1/dvtkckhxk/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset',"ml_default");
    setThanks("yes")
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      toast('THANK YOU <3 !')
      setTimeout(() => {
        navigate('/')
        },500)
    } catch (error) {
      console.error('Error uploading file:', error);
      toast('Error uploading file')
    }
  }  

  function handleChange(event) {
    if(event.target.files[0].size > MAX_SIZE)
    {
      alert('File size greater than 10Mb !')
      event.target.value = ''
    }
    else{
      setFile(event.target.files[0])
    }
    
  }
  if(thanks === "no" && log == true)
  return (
    <div className='bg-yellow-100 overflow-hidden  h-auto py-8 px-12 flex items-center justify-center'>
    <form onSubmit={submit} className='bg-yellow-200 rounded-lg px-8 py-5 md:w-3/6 lg:w-2/6'>
    <motion.h1
          initial = {{opacity: 0 , rotate: 20 , x:200 , y:100}}
          whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
          transition={{
            duration:0.5,
            delay:0.5,
            scale: {duration: 0.5},
        }}>
          <div className='bg-white flex flex-col h-auto rounded-lg' >
    <p className='mt-2 ml-2 text-2xl'>Contribution Form</p>
    <p className='ml-2 underline mb-4 mr-2'>We appreciate your contribution!.Thank you for making a difference!</p>
    </div>
    <div className='mt-4'>
     <div>
       <label htmlFor='' className=''>
         Title
       </label>
       <input 
       type='text'
       className='w-full mt-2 p-2 outline-none'
       placeholder='Title'
       name='Title'
       required
       value={title}
       onChange={(e) => setTitle(e.target.value)}
       ></input>
     </div>
     <div className='mt-4'>
       <label htmlFor=''>
       Branch
       </label>
       <input 
       type='text'
       className='w-full mt-2 p-2 outline-none'
       placeholder='Branch'
       required
       name='branch'
       value={branch}
       onChange={(e) => setBranch(e.target.value)}
       > 
       </input>
     </div>
     <div className='mt-4'>
       <label htmlFor=''>
       Semester
       </label>
       <input 
       type='text'
       className='w-full mt-2 p-2 outline-none'
       placeholder='Semester'
       required
       name='semester'
       value={semester}
       onChange={(e) => setSemester(e.target.value)}
       > 
       </input>
     </div>
     <div className='mt-4'>
       <label htmlFor=''>
       Subject
       </label>
       <input 
       type='text'
       className='w-full mt-2 p-2 outline-none'
       placeholder='Subject'
       required
       name='subject'
       value={subject}
       onChange={(e) => setSubject(e.target.value)}
       > 
       </input>
     </div>
     <div className='mt-4'>
       <label htmlFor=''>
       Message
       </label>
       <textarea 
       type='text'
       className='w-full h-[30vh] mt-2 p-2 outline-none'
       placeholder="Details regarding the submission, such as the year, teacher, etc."
       name='message'
       value={message}
       onChange={(e) => setMessage(e.target.value)}
       > 
       </textarea>
     </div>
     <div className='p-1 pb-2 bg-yellow-300 w-fit h-auto rounded-lg'>
     <div className=''>
         <h1>Select Notes</h1><p>max size:10mb</p>
         <input type="file"required onChange={handleChange}/>
     </div>
     </div>
     <div className='mt-4'>
       <button className='transition duration-300 ease-in-out hover:scale-110 w-full bg-yellow-300 font-semibold py-2 rounded' type="submit">SUBMIT</button>
     </div>
    </div>
    </motion.h1>
    </form>
    </div>  
  )
  else if(thanks === "yes" && log === true)
    return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
    )
  else
  return (
  <div className='h-screen flex items-center justify-center'>
    <motion.h1
          initial = {{opacity: 0 , rotate: 20 , x:200 , y:100}}
          whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
          transition={{
            duration:0.5,
            delay:0.5,
            scale: {duration: 0.5},
        }}>
    <p className='text-2xl text-center rounded-lg mx-10 h-64 w-64 flex items-center justify-center align-middle font-mono bg-yellow-200 md:h-96 md:w-96'>Login to verify and start contributing!</p>
    </motion.h1>
  </div>
  )
}

export default Contact
