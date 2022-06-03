import React from 'react'
import { CollectionContext } from '../contexts/CollectionContext';
import { useContext } from 'react';

export default function Categories({ coll }) {
    const [collection, setCollection] = useContext(CollectionContext);
    return (
        <li onClick={() => setCollection(coll.collection_id)} >
            <div  className= {collection===coll.collection_id ? 
                'max-w-xs m-3 shadow-md selectedCat ' : 
                'max-w-xs m-3 shadow-md  '}>
                <img className="p-2 rounded-t-lg hidden sm:block m-auto" src={coll.default_product_image.src} width="200" alt={coll.title} />
                <div className="px-5 pb-5">
                    <h4 className="text-l font-semibold tracking-tight pt-3 text-gray-900 text-center">
                        {coll.title}
                    </h4>
                    
                </div>
            </div>
        </li>
    )
}
