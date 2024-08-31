import React, { useEffect, useState } from 'react'
import{ motion } from 'framer-motion';
import axios from 'axios';
import { SlideUp } from './Hero';
import { Link } from 'react-router-dom';
import { FaThumbsUp } from "react-icons/fa";
import Loader from '../spinner.jsx'

const MostLiked = () => {
    const [Notes,setNotes] = useState([])

    const baseUrl = 'https://class-cache-be.vercel.app/api/get-top-notes';

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
          console.error('Failed to fetch notes after retries:', error);
        }
      };
  
      fetchData();
    }, [baseUrl]);
  return (
<section>
      <div className="py-24 px-10 flex items-center justify-center flex-col gap-6">
          <motion.h3 
          variants={SlideUp(0.5)}
          initial = "hidden"
          whileInView="show"
          className="text-4xl text-center font-league font-semibold uppercase underline py-8">Our MOST LOVED !</motion.h3>
          {Notes && Notes.length > 0 && (
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
           {
            Notes.map((item,i) => {
                return (
                    <div key={i} className="group space-y-3 text-center bg-white/50 shadow-xl p-3 rounded-xl">
                         <img src= {item.dp} alt="" className="w-60 mx-auto img-shadow group-hover:scale-110 transition-all duration-800" />
                         <Link to={`/note-details/${item._id}`}>
                        <button className="mt-8 btn-primary opacity-0 group-hover:opacity-100">
                           Explore Now 
                        </button>
                        </Link>
                        <p className="text-xl font-semibold">{item.title}</p>
                        <div className='flex flex-row items-center justify-center gap-2'>
                        <FaThumbsUp />
                        <p className="text-xl font-semibold">{item.likes}</p>
                        </div>
                        </div>
                )
            }
        )
           }
          </div>
           )}
           {Notes.length === 0 && (
          <>
          <Loader></Loader>
          </>
         )}
      </div>
    </section>
  )
}

export default MostLiked
