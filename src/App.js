import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Index/Dashboard';
import Products from './Products/Products';
import Cart from'./Cart/Cart';
import Orders from './Orders/Orders';
import Wishlist from './Wishlist/Wishlist';
import Offers from './Offers/Offers';
import Support from './Support/Support';
import Profile from './Profile/Profile'; 
import Signup  from './Loginpages/Signup/Signup';
import Settings from './Settings/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard  />} />
       
        <Route path="/products" element={<Products />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/offers' element={<Offers/>} />
        <Route path='/support' element={<Support/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/settings' element={<Settings />} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
