const { color } = require('framer-motion')
const { Container } = require('postcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          lightyellow: "#f6d876",
          white2: "#fffbf2",
          darkGreen:"#05ab54",
          dark:"#1e1e1e",
        },
        fontFamily:{
          sans: ["Roboto Mono"],
          league:["League Gothic"],
        },
        scale:{
        '200': '2',
        },
        Container:{
          center: true,
          padding:{
            DEFAULT:"1rem",
            sm:"2rem",
            lg: "4rem",
            xl: "5rem",
            "2xl" : "6rem",
          },
        },
      },
    },
  plugins: [],
};

