import './App.css'; import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React from 'react';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CollectionContextProvider from './contexts/CollectionContext';
import CartContextProvider from './contexts/CartContext';

function App() {
  
  return (
    <Router>
      <CartContextProvider>
      <Header />
      <CollectionContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":id" element={<ProductDetail  />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
      </CollectionContextProvider>
      </CartContextProvider>
      <Footer/>
    </Router>
  );
}

export default App;
