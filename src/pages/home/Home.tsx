import React from 'react'
import Navbar from '../../globals/components/navbar/Navbar'
import Hero from './components/Hero'
import TopProducts from './components/TopProducts'

const Home = () => {
  return (
   <>
   <Navbar/>
   <Hero/>
   <TopProducts/>
   </>
  )
}

export default Home