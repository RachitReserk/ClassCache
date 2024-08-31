import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NoteCard from '../components/NoteCard/NoteCard.jsx'
import {motion} from "framer-motion"
import {SlideUp} from '../components/Hero/Hero.jsx'
import Loader from '../components/spinner.jsx'

const SearchContent = () => {
    const [notes,setNotes] = useState([])
    const [loading,setLoading] = useState(true)
    const[search,setSearch] = useState("")
    const [Copy , setCopy] = useState([])
    const {branch}=useParams()
    const {semester}=useParams()

    useEffect(() => {
        setTimeout(async () => {
            const notes = await axios.get(`https://class-cache-be.vercel.app/api/get-note/${branch}/${semester}`)
            setNotes(notes.data.data)
            setCopy(notes.data.data)
            setLoading(false) 
          },700)
    },[])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        }

  return (
    <div className='mt-4 h-screen w-screen px-4 overflow-scroll overflow-x-hidden mb-8'>
  <div className="flex flex-col items-center justify-center">
  <motion.h3
     variants={SlideUp(0)}
     initial = "hidden"
     whileInView= "show"
     className="text-4xl text-center font-league font-semibold underline uppercase py-8">STORE</motion.h3>
     <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search..."
        className="w-full mb-4  md:mb:0 md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {loading && (
      <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
    )}

  {search === "" && notes.length > 0 && (
    <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4'>
    {notes.map((item, i) => (
      <div key={i}>
        <NoteCard data={item} />
      </div>
    ))}
    </div>
)}

{search !== "" && Copy.filter(note => note.title.toLowerCase().includes(search.toLowerCase())).length > 0 && (
      <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4'>
        {Copy.filter(note => note.title.toLowerCase().includes(search.toLowerCase())).map((item,i) => (
          <div key={i}>
            <NoteCard data={item}></NoteCard>
          </div>
        ))}
      </div>
    )}
  
  {(Copy.filter(note => note.title.toLowerCase().includes(search.toLowerCase())).length === 0 || Copy.length === 0) && (
      <div className='mt-12'>
       <NoteCard data={null}></NoteCard>
      </div>
    )}

  </div>
  )
}

export default SearchContent
