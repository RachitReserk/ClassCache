import React from "react";
import Banner1 from "/src/assets/banner1.jpg";
import {motion} from "framer-motion";


export const SlideUp  = (delay) => {
  return{
    hidden:{
      y: "100%",
      opacity:0,

    },
    show: {
      y:0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay :delay,
      },
    },
  };
};

const Hero = () => {
  return(
  <main>
    <div className="container min-h-[600px] flex justify-center relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap -24 place-items-center justify-between">
          <div className="space-y-3 mt-14 text-center md:text-left md:mt-0 ml-4">
            <motion.h1 
            variants={SlideUp(0.5)}
             initial = "hidden"
             whileInView = "show"

            className="realtive text-5xl lg:text-7xl xl:text-8xl font-bold uppercase text-outline text-transparent"> Class
            </motion.h1>
            <motion.h1
            variants={SlideUp(1)}
            initial = "hidden"
            whileInView = "show" 
            className=" text-5xl lg:text-7xl xl:text-8xl font-bold uppercase">
                Cache
            </motion.h1>
            <motion.p variants={SlideUp(1.5)}
             initial = "hidden"
             whileInView = "show"
               className="text-m">Your Go-To Resource for Detailed, Effective Study Notes and Insight.</motion.p>
               <div  className="max-w-xs transition duration-300 ease-in-out hover:scale-110">
            </div>
          </div>
        <div>
          <motion.img
          initial = {{opacity: 0 , rotate: 20 , x:200 , y:100}}
          whileInView={{ opacity: 1, rotate: 0, x: 0, y: 0}}
          transition={{
            duration:0.5,
            delay:0.5,
            scale: {duration: 0.5},
        }}
        whileHover={{
          scale:1.1,
          x:0,
          y:0,
      }}
          src={Banner1} alt=""  className="rounded-full w-[300px] md:w-[450px] img-shadow mt-16"/>
        </div>
      </div>     
    </div>           
  </main>
  
)}

export default Hero
