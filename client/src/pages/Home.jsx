import React from 'react'
import Hero from '../components/Hero/Hero'
import LatestNotes from '../components/Hero/LatestNotes'
import MostLiked from '../components/Hero/MostLiked'
import Banner from '../components/Hero/Banner'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <LatestNotes></LatestNotes>
      <Banner></Banner>
      <MostLiked></MostLiked>
    </div>
  )
}

export default Home
