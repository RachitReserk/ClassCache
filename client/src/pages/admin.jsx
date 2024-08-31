import React, { useEffect, useState } from 'react'
import axios from 'axios'

const admin = () => {
    const [url,setUrl] = useState()
    const [dp,setDp] = useState()
    const [title,setTitle] = useState()
    const [author,setAuthor] = useState()
    const [semester,setSem] = useState()
    const [branch,setBranch] = useState()
    const [subject,setSubject] = useState()
    const [desc,setDesc] = useState()
    const [role,setRole] = useState()
    
    useEffect(()=>{
        const fetch= async () => {
        try {
            const response = await axios.get('https://class-cache-be.vercel.app/api/userInfo',{ withCredentials: true })
            setRole(response.data.role)
        } catch (error) {
            console.log(error)
        }
    }
    fetch()
    },[])

   const submit = async (e) => {
   e.preventDefault()
   try {
   const note = {
    url:url,
    dp:dp,
    title:title,
    semester:semester,
    author:author,
    branch:branch,
    subject:subject,
    desc:desc
   }
   await axios.post('https://class-cache-be.vercel.app/api/add-notes',note,{withCredentials:true})
   } catch (error) {
   console.log(error) 
   }
   }

  if(role === "admin")
  return (
    <div className='bg-yellow-100 h-screen py-8 px-12 flex items-center justify-center'>
      <form onSubmit={submit} className='flex flex-col gap-4'>
        <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder='url'>
        </input>
        <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder='url'>
        </input>
        <input
        value={dp}
        onChange={(e) => setDp(e.target.value)}
        placeholder='dp'>
        </input>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='title'>
        </input>
        <input
        value={semester}
        onChange={(e) => setSem(e.target.value)}
        placeholder='sem'>
        </input>
        <input
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        placeholder='branch'>
        </input>
        <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder='subject'>
        </input>
        <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder='Desc'>
        </input>
        <button type='submit' className='btn-primary'>Submit</button>
      </form>
    </div>
  )
  else
  return(
    <div className='flex h-screen items-center justify-center bg-yellow-100'>
    <p>NO ACCESS !!</p>
   </div> 
)
}

export default admin
