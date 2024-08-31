import React from 'react'
import BannerPng from "../assets/about.png";
import { motion } from "framer-motion";
import { SlideUp } from "../components/Hero/Hero";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="space-y-6 continer py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 place-items-center">
      <div>
          <motion.img
          initial = {{opacity: 0 , rotate: 20 , x:200 , y:100}}
          whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
          transition={{
            duration:1,
            delay:1,
            scale: {duration: 1},
        }}
        whileHover={{
          scale:1.1,
          x:0,
          y:0,
      }}
          src={BannerPng} alt=""  className="rounded-full w-[300px] md:w-[450px] img-shadow mt-16"/>
        </div>
        <div className="space-y-8 mr-16 lg:max-w-[800px]">
            <motion.h1 
             variants={SlideUp(1)}
             initial = "hidden"
             whileInView="show"
            className=" text-center md:ml-0 ml-16 underline text-5xl uppercase font-league">About Us</motion.h1>

            <motion.h2 
             variants={SlideUp(0.5)}
             initial = "hidden"
             whileInView="show"
            className="text-3xl uppercase font-league md:ml-0 underline ml-2">Welcome to ClassCache</motion.h2>

            <motion.p variants={SlideUp(0.1)}
             initial = "hidden"
             className='text-xl md:ml-0 ml-2'
             whileInView="show">Welcome to ClassCache, the student-driven platform for sharing and accessing class notes at Jaypee University Of Information Technology! Supported by our vibrant community of students, Class Cache aims to enhance your academic experience by offering a space where notes from various courses are shared freely. By contributing your own notes and accessing those of your peers, you help create a collaborative environment that fosters collective success. Join us in supporting each other’s academic growth!</motion.p>

            <Link to='/store'>
            <motion.button
              variants={SlideUp(0.5)}
              initial = "hidden"
              whileInView="show"
            className="btn-primary mt-8 ml-4">
                Explore
            </motion.button>
            </Link>
         </div>

      </div>
    </div>
  )
}

export default About
