import React from "react"
import Logo from '/src/assets/main-logo.png'
import { FaUserLarge } from "react-icons/fa6";
import {motion } from 'framer-motion';
import { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from 'hamburger-react'
import { useSelector } from "react-redux";

const NavMenu = [
    {
        id:1,
        title: "Home",
        path:"/",
        delay:0.3,
    },{
        id:2,
        title: "Store",
        path:"/store",
        delay:0.3,
    },{
        id:3,
        title: "About Us",
        path:"/about",
        delay:0.3,
    },{
        id:4,
        title: "Contribute",
        path:"/contribute",
        delay:0.3,
    },
]

const Slidedown = (delay) => {
    return{
        initial:{
            y:"-100%",
            opacity: 0,
        },
        animate :{
            y:0,
            opacity: 1,
            transition:{
                duration: 0.6,
                delay: delay,
            },
        },
    };
};

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const user = useSelector(state => state.auth.isLoggedIn)
  if(user)
  return <nav>
    <div className="z-[50] container mx-auto flex justify-between items-center font-league">
        <a href="/"><motion.img
        initial = {{opacity : 0}}
        animate = {{opacity : 1}}
        transition={{duration : 0.8,delay : 0.5}}
        src={Logo}
        alt=""
        className="ml-4 w-24 block scale-200"
        /></a>
         <div className= "hidden md:block">
           <ul className= "flex gap-12">
            {
              NavMenu.map((menu) => {
                return(
                    <motion.li
                       variants={Slidedown(menu.delay)}
                       initial = "initial"
                       animate = "animate"
                       
                       key={menu.id}
                       className="nav-menu"
                       date-delay = {menu.delay}
                       >
                        <Link to={menu.path} className="inline-block px-2 py-2 text-2xl max-w-xs transition duration-300 ease-in-out hover:scale-110"
                        >
                            {menu.title}
                            </Link>
                       </motion.li>
                );
              }
            )
            }
            </ul> 
         </div>
        <div className="flex gap-6 hidden md:flex">
        <Link to='/profile'>
        <motion.div variants={Slidedown(1)}
        initial = "initial" animate = "animate">
            <button className= "max-w-xs transition duration-300 ease-in-out hover:scale-110 h-[50px] w-[50px] grid place-items-center rounded-full text-white bg-black">
                <FaUserLarge className="h-[18px] w-[18px]" /></button>
        </motion.div>
        </Link>
        </div>
        <div className="md:hidden w-[80px] h-[80px] rounded-3xl mt-5 mr-3">
                <div className="flex mt-4">
                <Hamburger size={40} toggled={isOpen} toggle={setOpen}></Hamburger>
                </div>
            </div>
    </div>
    {isOpen ? 
      <div className="h-[50] md:hidden rounded font-league z-[40] flex flex-col top-0 left-0 bg-orange-200 items-center gap-12 justify-between">
      {
              NavMenu.map((menu) => {
                return(
                    <motion.li
                       variants={Slidedown(menu.delay)}
                       initial = "initial"
                       animate = "animate"
                       
                       key={menu.id}
                       className="nav-menu list-none border-b-2 mt-5 mb-5"
                       date-delay = {menu.delay}
                       >
                        <Link to={menu.path} onClick={() => setOpen(!isOpen)} className="text-4xl max-w-xs transition duration-300 ease-in-out hover:scale-110"
                        >
                            {menu.title}
                            </Link>
                       </motion.li>
                );
              }
            )
            }
            <div className="flex gap-6 mb-5">
        <Link onClick={() => setOpen(!isOpen)} to='/profile'>
        <motion.div variants={Slidedown(1)}
        initial = "initial" animate = "animate">
            <button className= "max-w-xs transition duration-300 ease-in-out hover:scale-110 h-[50px] w-[50px] grid place-items-center rounded-full text-white bg-black">
                <FaUserLarge className="h-[18px] w-[18px]" /></button>
        </motion.div>
        </Link>
        </div>
      </div> 
      :
       <div></div>}
  </nav>;

else
    return <nav>
      <div className="z-[50] container mx-auto flex justify-between items-center font-league">
      <a href="/"><motion.img
          initial = {{opacity : 0}}
          animate = {{opacity : 1}}
          transition={{duration : 0.8,delay : 0.5}}
          src={Logo}
          alt=""
          className="ml-4 w-24 block scale-200"
          /></a>
           <div className= "hidden md:block">
             <ul className= "flex gap-12">
              {
                NavMenu.map((menu) => {
                  return(
                      <motion.li
                         variants={Slidedown(menu.delay)}
                         initial = "initial"
                         animate = "animate"
                         
                         key={menu.id}
                         className="nav-menu"
                         date-delay = {menu.delay}
                         >
                          <Link to={menu.path} className="inline-block px-2 py-2 text-2xl max-w-xs transition duration-300 ease-in-out hover:scale-110"
                          >
                              {menu.title}
                              </Link>
                         </motion.li>
                  );
                }
              )
              }
              </ul>
           </div>
           <div className="hidden md:block">
           <motion.li variants={Slidedown(1)}
                         initial = "initial"
                         animate = "animate"
                         className="nav-menu flex gap-6"
                         date-delay = {0.3}>
                        <Link to="/signin" className="inline-block px-4 py-2 text-2xl border-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 bg-blue-200 rounded">Login</Link>
                        <Link to="/signup" className="inline-block px-2 py-2 text-2xl border-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 rounded">Sign-up</Link>
                         </motion.li>
            </div>
            <div className="md:hidden w-[80px] h-[80px] rounded-3xl mt-5 mr-3">
                <div className="flex mt-4">
                <Hamburger size={40} toggled={isOpen} toggle={setOpen}></Hamburger>
                </div>
            </div>
      </div>
      {isOpen ? 
      <div className="h-[50] md:hidden rounded font-league z-[40] flex flex-col top-0 left-0 bg-orange-200 items-center gap-12 justify-between">
      {
              NavMenu.map((menu) => {
                return(
                    <motion.li
                       variants={Slidedown(menu.delay)}
                       initial = "initial"
                       animate = "animate"
                       
                       key={menu.id}
                       className="nav-menu list-none border-b-2 mt-5 mb-5"
                       date-delay = {menu.delay}
                       >
                        <Link to={menu.path} onClick={() => setOpen(!isOpen)} className="text-4xl max-w-xs transition duration-300 ease-in-out hover:scale-110"
                        >
                            {menu.title}
                            </Link>
                       </motion.li>
                );
              }
            )
            }
            <div className="mb-5">
           <motion.li variants={Slidedown(1)}
                         initial = "initial"
                         animate = "animate"
                         className="nav-menu flex gap-6"
                         date-delay = {0.3}>
                        <Link onClick={() => setOpen(!isOpen)} to="/signin" className="inline-block px-4 py-2 text-2xl border-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 bg-blue-200 rounded">Login</Link>
                        <Link onClick={() => setOpen(!isOpen)} to="/signup" className="inline-block px-2 py-2 text-2xl border-2 max-w-xs transition duration-300 ease-in-out hover:scale-110 rounded">Sign-up</Link>
                         </motion.li>
            </div>
      </div> 
      :
       <div></div>}
    </nav>;

};

export default Navbar
