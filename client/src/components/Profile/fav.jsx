import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoteCard from '../NoteCard/NoteCard'
import {motion} from "framer-motion"
import { SlideUp } from '../Hero/Hero'
import { TbMoodEmpty } from "react-icons/tb"
import Loader from '../spinner'

const fav = () => {
  const [FavNote,setFavNote] = useState()
  const [size,setSize] = useState()
useEffect(() => {
  const fetch = async () => {
  const response = await axios.get('https://class-cache-be.vercel.app/api/get-fav',{withCredentials: true})
  setSize(response.data.data.length)
  setFavNote(response.data.data)
  }
  fetch()
},[])

  if(!FavNote)
   return (
   <div className='flex text-7xl h-screen font-league flew-col items-center justify-center'>
    <Loader></Loader>
   </div>
  )

  else if(FavNote && size === 0)
  return ( 
    <div>
        <div className='flex text-7xl md:h-screen font-league flew-col items-center justify-center'>
        <TbMoodEmpty size={90}/>No Favourites? sad
        </div>
    </div>
  )

  else{
    return (
      <div>
      <motion.h3
         variants={SlideUp(0)}
         initial = "hidden"
         whileInView= "show"
         className="text-4xl text-center font-league font-semibold underline uppercase">Favourites</motion.h3>
         <div className='my-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4'>
    {FavNote && FavNote.map((items,i) => (
      <div key={i}>
      <NoteCard data={items}></NoteCard>
      </div>
    ))}
     </div>
    </div>
    )
  }
}

export default fav
