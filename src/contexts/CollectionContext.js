
import React, { createContext, useState } from 'react';

export const CollectionContext = createContext();

const CollectionContextProvider = (props) => {
    const [collection, setCollection] = useState('');
    return (
        <CollectionContext.Provider value={[collection, setCollection]}>
            {props.children}
        </CollectionContext.Provider>
    );
}

export default CollectionContextProvider;