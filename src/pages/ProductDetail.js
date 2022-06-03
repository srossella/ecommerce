import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({})
  const [error, setError] = useState('');

  const addToCart = () => {
    setCart([...cart, product])
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}products/${id}.json`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(error => { setProduct({}); setLoading(false); setError(error) })
  }, [])

  return (
    <>
      {loading
        ?
        <div></div>
        :
        <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 ">
          <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">

            <img src={product.image.src} className="w-full" alt={product.title} />


          </div>
          <div className="md:hidden ">

            <img src={product.image.src} className="w-full" alt={product.title} />

            <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
            </div>
          </div>
          <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
            <div className="border-b border-gray-200 pb-6">
              <p className="text-sm leading-none text-gray-600"></p>
              <h1
                className="
            lg:text-2xl
            text-xl
            font-semibold
            lg:leading-6
            leading-7
            text-gray-800
            mt-2
          "
              >
                {product.title}
              </h1>
            </div>



            <div>
              <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-4">
                <p dangerouslySetInnerHTML={{ __html: product.body_html }} />
              </p>
              <p className="text-base leading-4 mt-7 text-gray-600">Product Code: {product.id}</p>
              <p className="text-base leading-4 mt-4 text-gray-600 mb-5">Vendor: {product.vendor}</p>
            </div>
            <div className='flex flex-row justify-between '>

              <p className=' text-2xl md:text-3xl font-bold mr-10 w-2/4'>€ {product.variants[0].price}</p>


              <button
                className="
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
          text-base
          flex
          items-center
          justify-center
          leading-none
          text-white
          bg-gray-800
          w-full
          py-4
          
          hover:bg-gray-700
        "
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
            <div>
              <div className="border-t border-b py-4 mt-7 border-gray-200">
                <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
                  <p className="text-base leading-4 text-gray-800">Shipping and returns</p>
                  <button
                    className="
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                rounded
              "
                    aria-label="show or hide"
                  >
                    <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                  You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable
                </div>
              </div>
            </div>
            <div>
              <div className="border-b py-4 border-gray-200">
                <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
                  <p className="text-base leading-4 text-gray-800">Contact us</p>
                  <button
                    className="
                cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                rounded
              "
                    aria-label="show or hide"
                  >
                    <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
                  If you have any questions on how to return your item to us, contact us.
                </div>
              </div>
            </div>
          </div>
        </div>

      }
    </>

  );
};

