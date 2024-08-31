import React from 'react';
import{ motion } from 'framer-motion';
import{SlideUp} from "../Hero/Hero";
import { Link } from 'react-router-dom';
import { TbMoodEmpty } from "react-icons/tb"

const NoteCard = ({ data }) => {
  if(data === null){
  return (
    <div className="group bg-white/50 shadow-md p-3 flex justify-center items-center gap-3">
    <TbMoodEmpty className="w- image-shadow group-hover:scale-110 transition-all duration-500" size={90}></TbMoodEmpty>
    No Notes ? SAD
    </div>
  )
  }
  else
  return (
    <div>
    <Link to={`/note-details/${data._id}`}>
      <motion.div
                            variants={SlideUp(data.delay)}
                            initial = "hidden"
                            whileInView="show"
                             className="bg-white/50 shadow-md p-3 flex items-center gap-3">
                              <img src={data.dp} alt="" 
                              className="md:w-[150px] w-[100px] image-shadow group-hover:scale-110 transition-all duration-500"/> 
                              <div>
                                <h3 className = "text-xl font-semibold">{data.title}</h3>
                                <p className="text-l">by {data.author}</p>
                                <p className="text-l">Semester-{data.semester}</p>
                                <p className="text-l">Branch-{data.branch}</p>
                                <p className="text-l">Subject-{data.subject}</p>
                              </div> 
                            </motion.div>
    </Link>
    </div>
  );
};

export default NoteCard;