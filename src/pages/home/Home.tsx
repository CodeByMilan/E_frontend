import React from 'react'
import Navbar from '../../globals/components/navbar/Navbar'
import Hero from './components/Hero'
import TopProducts from './components/TopProducts'
import { useAppSelector } from '../../store/hooks'
import Footer from '../../globals/components/footer/Footer'

const Home = () => {
  const {user,status}=useAppSelector((state)=>state.auth)
  console.log(user.token)
  console.log(user)
  console.log(status)
  return (
   <>
   <Navbar/>
   <Hero/>
   <TopProducts/>
   <Footer/>
   </>
  )
}

export default Home