import React, { useEffect, useState } from 'react'
import Card from './elements/Card'
import { useAppDispatch } from '../../../store/hooks'
import { useAppSelector } from '../../../store/hooks'
import { fetchProducts } from '../../../store/productSlice'


const TopProducts = () => {
  const dispatch = useAppDispatch()
  const { status, product } = useAppSelector((state) => state.products)
  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

   console.log(product)
  return (
    <>
      <section className="py-10" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Top Products</h2>
        </div>
        <div className='flex m-2 p-2 space-x-4'>
          { product.length > 0 && (
            product.map((pd) => (
              <Card key={pd.id} data={pd} />
            ))
    
          )}
        </div>
      </section>
    </>
  )
}

export default TopProducts