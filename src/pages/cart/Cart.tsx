import React, { useState } from 'react'
import Navbar from '../../globals/components/navbar/Navbar'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { deleteCartItem, updateCartItem } from '../../store/cartSlice'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { items } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  console.log(items)

  const handleDelete = (productId: string) => {
    dispatch(deleteCartItem(productId))
  }
  //to fix: the cart quantity is increasing for one product but when i add next the quantity is not increasing
  const handleUpdate = (productId: string, quantity: number) => {
    dispatch(updateCartItem(productId, quantity))

  }

  const totalItemIncart = items.reduce((total, item) => item?.quantity + total, 0)
  const totalPriceINCart = items.reduce((total, item) => item?.Product?.price * item?.quantity + total, 0)
  return (
    <>

      <Navbar />

      <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
            <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
            <hr className="border-gray-300 mt-4 mb-8" />
            {items.length > 0 && items.map((item) => {
              return (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <div className="col-span-2 flex items-center gap-4">
                        <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                          <img src={item?.Product?.productImageUrl} className="w-full h-full object-contain" />
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-gray-800">{item?.Product?.productName}</h3>
                          <h6 className="text-xs text-red-500 cursor-pointer mt-0.5" onClick={() => handleDelete(item?.Product?.id)}>Remove</h6>

                          <div className="flex gap-4 mt-4">
                            <div className="relative group">
                              <button type="button"
                                className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                XL
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-gray-500 inline ml-2.5" viewBox="0 0 24 24">
                                  <path fill-rule="evenodd"
                                    d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                    clip-rule="evenodd" data-original="#000000" />
                                </svg>
                              </button>

                              <ul className='group-hover:block hidden absolute rounded-md min-w-[80px] shadow-lg bg-white z-[1000]'>
                                <li className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>SM</li>
                                <li className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>MD</li>
                                <li className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>XL</li>
                                <li className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>XXL</li>
                              </ul>
                            </div>

                       
                              <div className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs bg-transparent rounded-md">
                                <div className="w-2.5 fill-current cursor-pointer" onClick={() => handleUpdate(item?.Product?.id,  item?.quantity - 1)}>
                                  <span>-</span>
                                </div>

                                <span className="mx-2.5">{item?.quantity}</span>

                                <div className="w-2.5 fill-current cursor-pointer" onClick={() => handleUpdate(item?.Product?.id, item?.quantity + 1)}>
                                  <span>+</span>
                                </div>
                              </div>


                           
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <h4 className="text-base font-bold text-gray-800">$ {item?.Product?.price}</h4>
                      </div>
                    </div>

                  </div>
                </>
              )
            })
            }
          </div>

          <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
            <div className="flex border border-blue-600 overflow-hidden rounded-md">
              <input type="email" placeholder="Promo code"
                className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5" />
              <button type='button' className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white">
                Apply
              </button>
            </div>

            <ul className="text-gray-800 mt-8 space-y-4">
              <li className="flex flex-wrap gap-4 text-base">Total Items:<span className="ml-auto font-bold">{totalItemIncart} </span></li>
              <li className="flex flex-wrap gap-4 text-base">SubTotal <span className="ml-auto font-bold">Rs {totalPriceINCart}</span></li>

              <li className="flex flex-wrap gap-4 text-base">Shipping <span className="ml-auto font-bold">Rs 100</span></li>

              <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">Rs {totalPriceINCart + 100}</span></li>
            </ul>

            <div className="mt-8 space-y-2">
              
           <Link to="/checkout"> 
           <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md" >Checkout</button>
           </Link>
              <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Cart