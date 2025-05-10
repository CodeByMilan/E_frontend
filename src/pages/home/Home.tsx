import Footer from '../../globals/components/footer/Footer'
import Navbar from '../../globals/components/navbar/Navbar'
import { useAppSelector } from '../../store/hooks'
import Hero from './components/Hero'
import Review from './components/Review'
import TopProducts from './components/TopProducts'

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
   <Review/>
   <Footer/>
   </>
  )
}

export default Home