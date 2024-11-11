import React from 'react'
import { Product } from '../../../../storetypes/productTypes'
import { Link } from 'react-router-dom'
interface CardProps{
 data:Product
}

const Card:React.FC<CardProps> = ({data}) => {
  if (!data) return <p>No data to display</p>;
  console.log("hello:",data)
  return (
    
    <>
    <Link className="p-8 max-w-lg border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center"
    to={`/product/${data.id}`}>
    <img src={data?.productImageUrl}className="shadow rounded-lg overflow-hidden border" />
    <div className="mt-8 ">
        <h4 className="font-bold text-xl">{data?.productName}</h4>
        <p className="mt-2 text-gray-600">{data?.price}
        </p>
        <p className="mt-2 text-gray-600">{data?.description}
        </p>
        <div className='flex gap-10'>
        <div className="mt-5">
            <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900">Buy Now</button>
        </div>
        <div className="mt-5 ">
            <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900">Add to Cart</button>
        </div>
    </div>
    </div>
</Link>
    </>
  )
}

export default Card