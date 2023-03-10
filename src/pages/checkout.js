import React from 'react'
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import Link from 'next/link';
const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
    return (
        <div className="container mx-auto px-24">
            <h1 className='font-bold text-3xl text-center mt-5 my-8'>Checkout</h1>
            <h2 className='font-bold text-xl my-4'>Delivery Details</h2>
            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className="px-2 w-full">
                <div className="mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea type="email" id="email" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" rows={2} cols={30} />
                </div>
            </div>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <h2 className='font-bold text-xl my-4'>Review Cart Items & Pay</h2>

            <div className="w-full sideCart bg-orange-100 px-6 rounded-lg py-2 m-2">

                <ol className="list-decimal font-semibold ">
                    {/* empty cart message */}
                    {Object.keys(cart).length === 0 && <div className="flex flex-col items-center justify-center h-full">
                        <BsBagCheckFill size={50} className='mt-4 text-orange-400' />
                        <h2 className="text-xl font-sm mt-3">Your cart is empty</h2>
                    </div>}

                    {Object.keys(cart).map((k) => {
                        return <li key={k} >
                            <div className="item flex my-5 x">
                                <div className="font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                <div className="flex items-center justify-center w-1/3 font-semibold">
                                    <AiFillMinusCircle onClick={() => { removeFromCart(k) }} className="cursor-pointer text-orange-500" />
                                    <span className="mx-2">{cart[k].qty} </span>
                                    <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-orange-500" /></div>
                            </div>
                        </li>
                    })}

                </ol>

                <span className="font-bold">Subtotal: ???{subTotal}</span>
            </div>
            <div className="mt-4">
                <Link href={'/checkout'} >
                    <button className="flex ml-4 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm"><BsBagCheckFill className="m-1" />Proceed to Pay</button>
                </Link>
            </div>
        </div>
    )
}

export default Checkout