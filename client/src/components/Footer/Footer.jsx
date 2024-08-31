import React from "react";
import Logo from "/src/assets/main-logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col md:flex-row items-center justify-center bg-gray-400 text-lg md:text-3xl font-league uppercase"
    >
      <div className="container py-8 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
          <div className="space-y-3 lg:max-w-[300px]">
            <a href="/">
              <img src={Logo} alt="Logo" className="w-24 mx-auto md:ml-4 scale-200" />
            </a>
            <p className="inline-block mt-6 text-2xl">
              Your go-to source for comprehensive class notes and academic support.
            </p>
          </div>
          <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h1 className="hidden md:block text-3xl font-semibold">Quick Links</h1>
              <ul className="space-y-3 text-xl mt-6">
                <li className="footer-link">
                  <Link to="/">Home</Link>
                </li>
                <li className="footer-link">
                  <Link to="/about">About</Link>
                </li>
                <li className="footer-link">
                  <Link to="/contribute">Contribute</Link>
                </li>
                <li className="footer-link">
                  <Link to="/store">Store</Link>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="hidden md:block text-xl font-semibold">Contact</h1>
              <div className="space-y-3 mt-1 flex items-center">
                <MdEmail className="mt-[13px] mr-2" size={20} />
                <a href="mailto:trachit752@gmail.com?subject=Subject%20of%20the%20Email&body=Body%20of%20the%20Email">
                <p className="footer-link text-base">trachit752@gmail.com</p>
                </a>
              </div>
              <div className="space-y-3 mt-1 flex items-center">
                <FaLinkedin className="mr-2 mt-[10px]" size={20} />
                <a href="https://www.linkedin.com/in/rachit-tiwari-58a77727b/" target="_blank" className="footer-link text-base">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
