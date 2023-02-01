import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
const Nabvar = () => {
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center  py-3 shadow-md'>
            <div className="logo mx-5">
                <Image src="/vercel.svg" width={100} height={100} alt='Vercel Image' />
            </div>
            <div className="nav">
                <ul className='flex items-center space-x-6 font-bold md:text-md'>
                    <Link href={'/tshirt'}><li>Tshirt</li></Link>
                    <Link href={'/hoodies'}><li>Hoodies</li></Link>
                    <Link href={'/stickers'}><li>Stickers</li></Link>
                    <Link href={'/mugs'}><li>Mugs</li></Link>
                </ul>
            </div>
            <div className="cart absolute right-0 top-4 pr-7">
                <AiOutlineShoppingCart className='text-xl md:text-3xl' />
            </div>
        </div>
    )
}

export default Nabvar