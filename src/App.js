import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Index/Dashboard';
import Products from './Products/Products';
import Cart from'./Cart/Cart';
import Orders from './Orders/Orders';
import Wishlist from './Wishlist/Wishlist';
import Offers from './Offers/Offers';
import Support from './Support/Support';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/offers' element={<Offers/>} />
        <Route path='/support' element={<Support/>} />
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
