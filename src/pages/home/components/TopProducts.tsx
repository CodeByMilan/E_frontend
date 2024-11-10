import React from 'react'
import Card from './elements/Card'

const TopProducts = () => {
  return (
    <>
<section className="py-10" id="services">
    <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Top Products</h2>
    </div>
    <div className='flex m-2 p-2 space-x-4'>
    <Card/>
    <Card/>
    <Card/>
    </div>
</section>
    </>
  )
}

export default TopProducts