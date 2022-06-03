import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
    return (
        <div className="max-w-xs bg-white shadow-md m-3 pb-4 ">
            <img className="p-6 object-cover w-full h-3/4"  src={product.image.src} alt="product" />
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                </h5>
                <div className="flex justify-between items-center">
                    <span className="text-sm  text-gray-900"> by {product.vendor}</span>
                    <Link to={`/${product.id}`} style={{ textDecoration: 'none' }} >
                        <button className="
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
                        text-base
                        flex
                        items-center
                        justify-center
                        leading-none
                        text-white
                        bg-gray-800
                        w-full
                        p-3
                        mt-2
                        hover:bg-gray-700
                        ">
                            Show details
                        </button>
                    </Link>
                </div>
            </div>
        </div>


    )
}
