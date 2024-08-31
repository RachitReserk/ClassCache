import React from 'react'
import { motion } from 'framer-motion'
import BannerPng from '../../assets/banner2.jpg'
import { SlideUp } from './Hero'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <section>
        <div className="overflow-hidden container py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap -24 place-items-center justify-between">
             <div className="">
                <motion.img 
                initial = {{
                    opacity: 0,
                    x: -100,
                    y: 100,
                }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                }}

                whileHover={{
                    scale:1.2,
                    x:0,
                    y:0,
                }}

                transition={{
                    duration:0.5,
                    delay:0.5,
                    scale: {duration: 0.5},
                }}
                src = {BannerPng} alt="" className="rounded-full w-[300px] md:w-[450px] img-shadow mt-16" />

             </div>

            
             
             <div className="ml-4 space-y-5 lg:max-w-[400px]">
                <motion.h1 
                 variants={SlideUp(1)}
                 initial = "hidden"
                 whileInView="show"
                className="text-6xl uppercase font-semibold font-league">Your Success, Our Notes!</motion.h1>
                <motion.p variants={SlideUp(1.2)}
                 initial = "hidden"
                 whileInView="show">Transforming Study Sessions with High-Quality, Expert-Curated Class Notes!</motion.p>
                 <div className='hover:scale-110'>
                 <Link to="/store">
            <motion.button variants={SlideUp(1.8)}
             initial = "hidden"
             whileInView = "show" className="ml-[100px] justify-center items-center btn-primary inline-block  !mt-10">
              Explore Now
            </motion.button>
            </Link>
            </div>
             </div>
            </div>
        </div>
    </section>
  )
}

export default Banner
