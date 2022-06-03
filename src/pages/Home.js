import React from 'react'
import { NavLink } from 'react-router-dom'
import Categories from '../components/Categories'
import { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { CollectionContext } from '../contexts/CollectionContext';
import ReactPaginate from 'react-paginate';

export default function Home() {
  const [collection, setCollection] = useContext(CollectionContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [collectionListings, setCollectionListings] = useState([]);
  const [filter, setFilter] = useState('')
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const itemsPerPage = 8;

  function sortByVendor() {
    console.log('click')
    setFilter('vendor')
    setProducts([...products].sort((a, b) => (a.vendor > b.vendor) ? 1 : -1));
    setItemOffset(0);
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems([...products].slice(itemOffset, endOffset))
  }

  function sortByTitle() {
    setFilter('title')
    setProducts([...products].sort((a, b) => (a.title > b.title) ? 1 : -1));
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItemOffset(0);
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems([...products].slice(itemOffset, endOffset))
  }, [products])

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_URL}collection_listings.json`)
      .then(res => res.json())
      .then(data => {
        setCollectionListings(data.collection_listings);
        if (collection === '') { setCollection(data.collection_listings[0].collection_id) }
        setLoading(false);
      })
      .catch(error => { setCollectionListings([]); setLoading(false); setError(error) })
  }, [])

  useEffect(() => {
    if (collection) {
      fetch(`${process.env.REACT_APP_URL}collections/${collection}/products.json`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          const endOffset = itemOffset + itemsPerPage;
          setCurrentItems(data.products.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(data.products.length / itemsPerPage));
        })
        .catch(error => { setProducts([]) })
    }
  }, [collection])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset])


  return (
    <div className='flex flex-col sm:flex-row '>
      <div className='w-full  sm:w-1/5  '>
        <p className='mx-4 font-bold text-lg text-center'>Categories</p>
        <ul className="flex flex-row flex-wrap sm:flex-col justify-center ">
          
          {
            collectionListings.map((coll) => {
              return (
                <Categories key={coll.collection_id} coll={coll} />
              )
            })
          }
        </ul>
      </div>



      {
        products.length === 0
          ? <div></div>
          :
          <div className="flex flex-col text-center" >
            
            <div className='w-fit m-auto'>Filter by
              <span className={filter === "title" ? "font-bold italic " : ""}>
                <span onClick={sortByTitle} className=" mx-1 italic text-gray-500 cursor-pointer">
                  Name
                </span>
              </span>
              <span className={filter === "vendor" ? "font-bold italic " : ""}>
                <span onClick={sortByVendor} className=" mx-1 italic text-gray-500 cursor-pointer">
                  Company
                </span>
              </span>
            </div>
              <ReactPaginate className=' text-md w-4/6 m-auto flex flex-row justify-around'
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
              />
            <div className='flex flex-row flex-wrap  justify-center mb-10'>
              {
                currentItems.map((product) => {
                  return (
                    <ProductCard key={product.id} product={product} />
                  )
                })
              }
            </div>
          </div>
      }
    </div >
  )
}
