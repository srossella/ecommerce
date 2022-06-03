import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);
  const [cartSingleItems, setSingleItems] = useState([]);
  useEffect(() => {
    setSingleItems([...new Set(cart)])
  }, [cart])

  const addOne = (product) => {
    setCart([...cart, product])
  }
  const removeOne = (product) => {
    let copyOfArr = [...cart]
    const i = cart.findIndex(x => x.id === product.id)
    copyOfArr.splice(i, 1)
    setCart([...copyOfArr])
  }

  if (cart.length === 0) {
    return <div className='flex flex-row flex-wrap  justify-center capitalize text-xl mt-10'> cart empty</div>
  } else {
    return (
      <div className='flex flex-row flex-wrap  justify-center'>
        {
          cartSingleItems.map((product) => {
            let count = 0;
            cart.forEach(element => {
              if (element.id === product.id) {
                count += 1;
              }
            });

            return (
              <div className='flex flex-col mb-10'>
                <ProductCard key={product.id} product={product} />
                <p className='ml-3'> No. of items:
                  <span className='cursor-pointer border w-fit p-1 m-1 bg-black text-white' onClick={() => removeOne(product)}>-</span>
                  <span className='border w-fit p-2 font-bold'> {count}</span>
                  <span className='cursor-pointer border w-fit p-1 m-1 bg-black text-white' onClick={() => addOne(product)}>+</span></p>
              </div >
            )
          })
        }
      </div>
    )
  }
}
