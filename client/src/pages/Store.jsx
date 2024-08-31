import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoteCard from '../components/NoteCard/NoteCard.jsx'
import {motion} from "framer-motion"
import {SlideUp} from '../components/Hero/Hero.jsx'
import { Navigate, useNavigate } from 'react-router-dom'

const TempStore = () => {
  const [filters, setFilters] = useState({
    sem:"",
    branch:""
  });

  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)
  const[search,setSearch] = useState("")
  const [Copy , setCopy] = useState([])
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/store/${filters.branch}/${filters.sem}`)
  };

return (
  <motion.h1
  initial = {{opacity: 0 , rotate: 20 , x:200 , y:100}}
  whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
  transition={{
    duration:0.5,
    delay:0.5,
    scale: {duration: 0.5},
}}>
  <div className='h-screen flex flex-col items-center justify-center'>
    <div className='bg-yellow-100 mx-4 md:mx-0 mb-24 px-12 py-12 rounded-lg flex flex-col items-center justify-center'>
    <h1 className='text-red-400 mb-4 text-8xl font-league underline'>GET STARTED</h1>
<form className="mx-auto mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
  <select className='p-2 w-[250px] md:w-[400px]' 
  value={filters.branch}
  onChange={(e) => setFilters({...filters,branch:e.target.value})}
  required>
    <option value="">Select Branch</option>
    <option value="CSE">CSE</option>
    <option value="AI">AI</option>
    <option value="DS">DS</option>
    <option value="IT">IT</option>
    <option value="ECE">ECE</option>
    <option value="BSC">BSC</option>
    <option value="BBA">BBA</option>
    <option value="Mtech">Mtech</option>
    <option value="Phd">Phd</option>
  </select>
  <select className='p-2 w-[250px] md:w-[400px]'
   value={filters.sem}
   onChange={(e) => setFilters({...filters,sem:e.target.value})}
   required>
    <option value="">Select Semester</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
  </select>
  <button type="submit" className='text-lg bg-yellow-200 p-3 px-8 rounded-lg hover:bg-yellow-400 mt-8'>Submit</button>
</form>
</div>
  </div>
  </motion.h1>
)

}

export default TempStore
