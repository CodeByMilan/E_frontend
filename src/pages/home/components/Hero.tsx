import React from 'react'

const Hero = () => {
  return (
   <>
   <div className="relative w-full h-[320px]" id="home">
    <div className="absolute inset-0 opacity-70">
        <img src="https://image1.jdomni.in/banner/13062021/0A/52/CC/1AF5FC422867D96E06C4B7BD69_1623557926542.png" alt="Background Image" className="object-cover object-center w-full h-full" />

    </div>
    <div className="absolute inset-9 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-4 md:mb-0">
            <h1 className="text-grey-700 font-medium text-4xl md:text-5xl leading-tight mb-2">Bappa Flour mill</h1>
            <p className="font-regular text-xl mb-8 mt-4">One stop solution for flour grinding services</p>
            <a href="#contactUs"
                className="px-6 py-3 bg-[#c8a876] text-white font-medium rounded-full hover:bg-[#c09858]  transition duration-200">Contact
                Us</a>
        </div>
    </div>
</div>
   </>
  )
}

export default Hero