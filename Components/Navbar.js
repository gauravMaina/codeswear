import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { BsBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useRef } from "react";
const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const [dropdown, setDropdown] = useState(false)
    const toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full")
            ref.current.classList.add("translate-x-0")
        }
        else if (!ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-0")
            ref.current.classList.add("translate-x-full")
        }
    }
    const ref = useRef()
    return (
        <div className="shadow-md flex flex-col md:flex-row md:justify-start justify-center items-center py-3 sticky top-0 z-10 bg-white">
            <div className="logo mx-5">
                <Link href="/">
                    <Image
                        src="/logo.jpg"
                        height={40}
                        width={170}
                        alt="Loading..."
                        className="w-full h-12"
                    />
                </Link>
            </div>
            <div className="nav">
                <ul className="flex space-x-2 font-bold md:text-sm">
                    <Link href="/tshirts" className="hover:text-orange-500">
                        <li>T-Shirts</li>
                    </Link>
                    <Link href="/hoodies" className="mr-5 hover:text-orange-500">
                        <li>Hoodies</li>
                    </Link>
                    <Link href="/mugs" className="mr-5 hover:text-orange-500">
                        <li>Mugs</li>
                    </Link>
                    <Link href="/stickers" className="mr-5 hover:text-orange-500">
                        <li>Stickers</li>
                    </Link>
                </ul>
            </div>
            <div className="flex cart absolute right-0 mx-5 cursor-pointer">
                <button onClick={toggleCart} className="cart inline-flex items-center py-1 px-3 focus:outline-none text-xl my-auto md:mt-0">Cart <AiOutlineShoppingCart className='ml-2 text-2xl' /></button>
                <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
                    {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="dropdown absolute top-9 right-2 bg-orange-600 rounded-md px-5 w-36 py-3">
                        <ul>
                            <Link passHref href={'/myaccount'}><li className='py-1 hover:underline hover:text-orange-100 cursor-pointer text-white font-bold font-mono'>My Account</li></Link>
                            <Link passHref href={'/orders'}><li className='py-1 hover:underline hover:text-orange-100 cursor-pointer text-white font-bold font-mono'>Orders</li></Link>
                            <li onClick={() => logout()} className='py-1 hover:underline hover:text-orange-100 cursor-pointer text-white font-bold font-mono'>Logout</li>
                        </ul>
                    </div>}
                    {user.value && <MdAccountCircle className='ml-2 text-3xl mx-2 cursor-pointer' />}
                </div>
                {!user.value && <Link href={'/login'}><button className='bg-orange-300 rounded-xl px-3 py-2 text-black hover:bg-orange-200 my-auto'>Login</button></Link>}

            </div>

            <div ref={ref} className={`w-72 h-[100vh] sideCart absolute overflow-y-scroll bg-orange-100 top-0 right-0 py-10 px-8 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
                <span onClick={toggleCart} className="absolute top-3 right-2 cursor-pointer text-2xl text-orange-500"><AiFillCloseCircle /></span>

                <ol className="list-decimal font-semibold">
                    {/* empty cart message */}
                    {Object.keys(cart).length === 0 && <div className="flex flex-col items-center justify-center h-full">
                        <BsBagCheckFill size={50} className='mt-4 text-orange-400' />
                        <h2 className="text-xl font-sm mt-3">Your cart is empty</h2>
                    </div>}

                    {/* displaying cart */}
                    {Object.keys(cart).map((k) => {
                        return <li key={k} >
                            <div className="item flex my-5">
                                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                <div className="flex items-center justify-center w-1/3 font-semibold">
                                    <AiFillMinusCircle onClick={() => { removeFromCart(k) }} className="cursor-pointer text-orange-500" />
                                    <span className="mx-2">{cart[k].qty} </span>
                                    <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="cursor-pointer text-orange-500" /></div>
                            </div>
                        </li>
                    })}

                </ol>

                {(Object.keys(cart).length !== 0) && <div className="flex">
                    <Link href={'/checkout'} >
                        <button className="flex mx-auto mr-2 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm"><BsBagCheckFill className="m-1" />Checkout</button>
                    </Link>
                    {/* clear cart button */}
                    <button onClick={clearCart} className="flex mx-auto mr-2 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm">Clear Cart</button>
                </div>
                }
            </div>
        </div >
    );
};

export default Navbar;