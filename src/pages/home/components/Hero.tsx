import { Link } from 'react-router-dom'

const Hero = () => {
  return (
   <>
   <div className="relative w-full h-[600px]" id="home">
   <div className="absolute inset-0 opacity-100">
    <video
        src="https://videos.pexels.com/video-files/7287304/7287304-sd_640_360_25fps.mp4"
        className="object-cover object-center w-full h-full"
        autoPlay
        loop
        muted
        playsInline
    />
</div>

    <div className="absolute inset-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-4 md:mb-0">
            <h1 className="text-grey-700 font-medium text-4xl md:text-5xl leading-tight mb-2">Sajha Pasal</h1>
            <p className="font-regular text-2xl mb-8 mt-5">Our unity and cooperation create our shared market, where opportunities and prosperity await everyone.</p>
            <Link to="#contactUs"
                className="px-5 py-5 bg-yellow-500 text-white font-medium rounded-3xl hover:bg-[#c09858]  transition duration-200">Shop With Us</Link>
        </div>
    </div>
</div>
   </>
  )
}

export default Hero