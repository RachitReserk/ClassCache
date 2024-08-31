import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NoteCard from '../NoteCard/NoteCard.jsx'
import {motion} from "framer-motion"
import {SlideUp} from './Hero.jsx'
import Loader from '../spinner.jsx'
const baseUrl = 'https://class-cache-be.vercel.app/api/get-recent-notes'

const LatestNotes = () => {
  const [Notes, setNotes] = useState([])

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, retries - 1, delay);
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithRetry(baseUrl);
        setNotes(data.data);
      } catch (error) {
        console.error('Failed to fetch data after retries:', error);
      }
    };

    fetchData();
  }, [baseUrl]);

  return (
    <div className='flex items-center justify-center flex-col gap-8 mt-8 px-4'>
      <motion.h3
         variants={SlideUp(0)}
         initial = "hidden"
         whileInView= "show"
         className="text-4xl text-center font-league font-semibold uppercase py-8">Recently Added</motion.h3>
         {Notes && Notes.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4'>
        {Notes && Notes.map((item, i) => (
          <div key={i}>
            <NoteCard data={item} />
          </div>
        ))}
        </div>
         )}
         {Notes.length === 0 && (
          <>
          <Loader></Loader>
          </>
         )}
    </div>
  )
}

export default LatestNotes
