import React from "react";
import Link from "next/link";
import Product from "models/Product";
import mongoose from "mongoose";
const Hoodies = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <h1 className='text-center font-bold font-mono mx-auto mt-5 text-4xl'>Wear The Code</h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {Object.keys(products).length === 0 && <p>Sorry all the hoodies are currently out of stocks.New stock coming soon. Stay tuned</p>}
            {
              Object.keys(products).map((item) => {
                return <Link key={products[item]._id} href={`product/${products[item].slug}`}>
                  <div className="p-4 w-full cursor-pointer shadow-lg m-1 rounded-md">
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="h-[30vh] m-auto md:h-[36vh] block"
                        src={products[item].image}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[item].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">Rs {products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.includes('S') && <span className='border border-orange-200 px-1 mx-1'>S </span>}
                        {products[item].size.includes('M') && <span className='border border-orange-200 px-1 mx-1'>M </span>}
                        {products[item].size.includes('L') && <span className='border border-orange-200 px-1 mx-1'>L </span>}
                        {products[item].size.includes('XL') && <span className='border border-orange-200 px-1 mx-1'>XL </span>}
                        {products[item].size.includes('XXL') && <span className='border border-orange-200 px-1 mx-1'>XXL </span>}
                      </div>
                      <div className="mt-1">
                        {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      </div>
                    </div>
                  </div>
                </Link>
              })
            }

          </div>
        </div>
      </section>
    </div>
  );
};

// server side rendering
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    // make connection to mongodb
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: "hoodies" });
  let hoodies = {}
  for (let item of products) {
    if (item.titles in hoodies) {
      if (!hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoodies[item.title].color.push(item.color)
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodies[item.title].size.push(item.size)
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color]
        hoodies[item.title].size = [item.size]
      }
    }
  }
  return {
    props: {
      products: JSON.parse(JSON.stringify(hoodies))
    }
  }

}
export default Hoodies;