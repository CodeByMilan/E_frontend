import React, { useEffect, useState } from 'react'
import Card from './elements/Card'
import { useAppDispatch } from '../../../store/hooks'
import { useAppSelector } from '../../../store/hooks'
import { fetchProducts } from '../../../store/productSlice'
import { authStatus } from '../../../storetypes/storeTypes'


const TopProducts = () => {
  const dispatch = useAppDispatch()
  const { status, product } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  if (status == authStatus.loading) {
    return <div>Loading...</div>
  }
  console.log(product)
  return (
    <>
      <section className="py-10" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Customer favourite</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-2 p-2">
  {product.length > 0 &&
    product.map((pd) => (
      <div key={pd.id}>
        <Card data={pd} />
      </div>
    ))}
</div>
      </section>
    </>
  )
}

export default TopProducts