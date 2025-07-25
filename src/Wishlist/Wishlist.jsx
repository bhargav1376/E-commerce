import React, { useState, useEffect } from 'react';
import '../Index/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faShoppingCart, faBars, faChevronLeft, faChevronDown, faChevronUp, faUser, faCog, faSignOutAlt, faTag, faSearch, faHome, faBell, faHeart as faHeartFilled, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart as faCartIcon } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import logo from '../Images/unnamed.png';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../Products/Products.jsx';
import './Wishlist.css';
import Homeicon from '../Images/Home-png.png';
import producticon from '../Images/Product-png.png';
import ordersicon from '../Images/order-png.webp';
import wishlisticon from '../Images/wishlist-ico.png';
import carticon from '../Images/cart-png.png';
import offericon from '../Images/offers-png.png';
import supporticon from '../Images/support-png.png';
import usericon from '../Images/user-ico.png';
import settingicon from '../Images/settings-ico.png';
import logouticon from '../Images/logout-ico.png';
import notificationicon from '../Images/notifications-png.png';
import cartheadericon from '../Images/cart-header-png.png';
import tagicon from '../Images/tag-png.png';

const user = {
  name: 'Bhargav',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const languageFlagImages = {
  EN: 'https://flagcdn.com/us.svg',
  FR: 'https://flagcdn.com/fr.svg',
  ES: 'https://flagcdn.com/es.svg',
};

function Wishlist() {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });
  const navigate = useNavigate();
  const [popMsg, setPopMsg] = useState('');
  const [showPopMsg, setShowPopMsg] = useState(false);
  const [notified, setNotified] = useState({});
  // Cart state for badge (unique products)
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const updateCart = () => {
      const stored = localStorage.getItem('cart');
      if (!stored) return setCart([]);
      try {
        const parsed = JSON.parse(stored);
        setCart(Array.isArray(parsed) ? parsed : []);
      } catch {
        setCart([]);
      }
    };
    window.addEventListener('storage', updateCart);
    const interval = setInterval(updateCart, 1000);
    return () => {
      window.removeEventListener('storage', updateCart);
      clearInterval(interval);
    };
  }, []);

  // Add to Cart handler
  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const found = cart.find(item => item.id === product.id);
    if (found) {
      cart = cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setPopMsg(`Added to cart: ${product.name}`);
    setShowPopMsg(true);
    setTimeout(() => setShowPopMsg(false), 2000);
  };

  // Notify Me handler
  const handleNotify = (product) => {
    setNotified(prev => ({ ...prev, [product.id]: true }));
    setPopMsg(`Alert Activated for ${product.name}`);
    setShowPopMsg(true);
    setTimeout(() => setShowPopMsg(false), 2000);
  };

  const handleWishlist = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    setWishlist(prev => {
      const isInWishlist = prev.includes(productId);
      if (isInWishlist) {
        setPopMsg(`Removed from wishlist: ${product.name}`);
        setShowPopMsg(true);
        setTimeout(() => setShowPopMsg(false), 2000);
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleUserDropdown = () => {
    setDropdownOpen(d => !d);
  };
  const handleLanguageClick = () => {
    setLanguageDropdown(l => !l);
  };
  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setLanguageDropdown(false);
  };

  const wishlistProducts = allProducts.filter(p => wishlist.includes(p.id));

  return (
    <div className={`dashboard-container${collapsed ? ' collapsed' : ''}`}> 
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="sidebar-links">
          <li>
            <a className="activ" onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#dc2626' }}>
                <img className='icon-pngs' src={Homeicon} />
              </span>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/products')}
              style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#059669' }}>
                <img className='icon-pngs' src={producticon} />
              </span>
              <span>Products</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/orders')}
              style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#1d4ed8' }}>
                <img className='icon-pngs' src={ordersicon} />
              </span>
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a className="active" onClick={() => navigate('/wishlist')}
              style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#f59e42' }}>
                <img className='icon-pngs' src={wishlisticon} />
              </span>
              <span>Wishlist</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/cart')}
              style={{ cursor: 'pointer', position: 'relative' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#fbbf24' }}>
                <img className='icon-pngs' src={carticon} />
              </span>
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="sidebar-cart-badge">{cart.length}</span>
              )}
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/offers')}
              style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#10b981' }}>
                <img className='icon-pngs' src={offericon} />
              </span>
              <span>Offers</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/support')}
              style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#3b82f6' }}>
                <img className='icon-pngs' src={supporticon} />
              </span>
              <span>Support</span>
            </a>
          </li>
        </ul>
      </aside>
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <img src={logo} alt="Logo" className="header-logo" />
            <button className="header-bars-btn" onClick={() => setCollapsed(c => !c)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="header-search">
            <div className="search-bar-outer">
              <div className="search-bar-with-icon">
                {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
                <span style={{fontSize: 18, color: '#64748b', marginRight: 8, position:'absolute', marginLeft:7}}>&#128269;</span>
                <input 
                  type="text"
                  placeholder="Search wishlist..."
                  className="search-input"
                />
              </div>
            </div>
          </div>
          <div className="header-icons">
            <div className="icon-wrapper">
            <img className='icon-header' src={notificationicon} />
            </div>
            <div className="icon-wrapper" style={{position: 'relative', cursor: 'pointer'}} onClick={() => navigate('/cart')}>
              <img className='icon-header' src={cartheadericon} />
              {cart.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: '#dc2626',
                    color: '#fff',
                    borderRadius: '50%',
                    minWidth: 17,
                    height: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 6px',
                    zIndex: 2,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
                  }}>{cart.length}</span>
                )}
            </div>
            <div className="icon-wrapper language-icon" onClick={handleLanguageClick} style={{position: 'relative', fontSize: '1.1rem', padding: 0, background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
              <img src={languageFlagImages[language]} alt={language} className="language-flag-img" style={{width: '22px', height: '16px', objectFit: 'cover', borderRadius: '3px', marginRight: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)'}} />
              <span className="language-name">{language}</span>
              {languageDropdown && (
                <div className="language-dropdown">
                  <div className="language-option" onClick={() => handleLanguageSelect('EN')}>
                    <img src={languageFlagImages['EN']} alt="EN" className="language-flag-img" style={{width: '22px', height: '16px', objectFit: 'cover', borderRadius: '3px', marginRight: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', verticalAlign: 'middle'}} /> English
                  </div>
                  <div className="language-option" onClick={() => handleLanguageSelect('FR')}><img src={languageFlagImages['FR']} alt="FR" className="language-flag-img" style={{width: '22px', height: '16px', objectFit: 'cover', borderRadius: '3px', marginRight: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', verticalAlign: 'middle'}} /> French</div>
                  <div className="language-option" onClick={() => handleLanguageSelect('ES')}><img src={languageFlagImages['ES']} alt="ES" className="language-flag-img" style={{width: '22px', height: '16px', objectFit: 'cover', borderRadius: '3px', marginRight: '6px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', verticalAlign: 'middle'}} /> Spanish</div>
                </div>
              )}
            </div>
            <div className="icon-wrapper">
            <img className='icon-header' src={tagicon} />
            </div>
            <div className="user-info" onClick={handleUserDropdown} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px'}}>
              <img src={user.image} alt="User" className="user-image" />
              <span className="user-name">{user.name}</span>
              <span className="user-badge">Premium</span>
              <FontAwesomeIcon icon={dropdownOpen ? faChevronUp : faChevronDown} className="dropdown-icon" />
            </div>
            {dropdownOpen && (
              <div className="user-dropdown">
                <a href="#profile"><img className='icon-pngs-header' src={usericon} /> Profile</a>
                <a href="#settings"><img className='icon-pngs-header' src={settingicon}/> Settings</a>
                <button className="logout-btn"><img className='icon-pngs-header' src={logouticon} /> Logout</button>
              </div>
            )}
          </div>
        </header>
        <div className="wishlist-page-content">
          {/* Pop message for add/remove actions */}
          {showPopMsg && (
            <div className="wishlist-pop-message">
              {popMsg}
              {popMsg.startsWith('Added to cart') && (
                <span>
                  {' '}
                  <button className="wishlist-pop-link" onClick={() => navigate('/cart')}>Click to view</button>
                </span>
              )}
            </div>
          )}
          <h2 className="wishlist-header">My Wishlist</h2>
          {wishlistProducts.length === 0 ? (
            <div className="wishlist-empty">
              <img src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="Empty Wishlist" style={{width: 120, marginBottom: 24, opacity: 0.7}} />
              <h3>Your wishlist is empty</h3>
              <p>Browse products and add your favorites to your wishlist.</p>
              <button className="wishlist-browse-btn" onClick={() => navigate('/products')}>Browse Products</button>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlistProducts.map(product => (
                <div className="wishlist-product-card" key={product.id}>
                  <div className="wishlist-product-img-wrapper" style={{position:'relative'}}>
                    <img src={product.images && product.images.length > 0 ? product.images[0] : ''} alt={product.name} className="wishlist-product-img" />
                    <button
                      className="wishlist-heart-btn"
                      style={{position:'absolute', bottom:10, right:10, background:'rgba(255,255,255,0.85)', border:'none', borderRadius:'50%', padding:7, cursor:'pointer', boxShadow:'0 1px 4px rgba(0,0,0,0.10)'}}
                      onClick={() => handleWishlist(product.id)}
                      title={'Remove from Wishlist'}
                    >
                      <FontAwesomeIcon icon={faHeartFilled} style={{color:'#ef4444', fontSize:'1.3em'}} />
                    </button>
                    {product.discount && (
                      <span className="product-discount-badge">{product.discount}% OFF</span>
                    )}
                    {product.stock === 0 && (
                      <span className="product-outofstock-badge">Out of Stock</span>
                    )}
                  </div>
                  {/* Info below image */}
                  <div className="wishlist-product-info" >
                    <span className="wishlist-product-name">{product.name}</span>
                    <span className="wishlist-product-price">
                      {product.discount ? (
                        <>
                          <span className="old-price">₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span> ₹{(product.price * (1 - product.discount / 100)).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                        </>
                      ) : (
                        <>₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</>
                      )}
                    </span>
                    <div className="wishlist-product-desc">{product.desc}</div>
                    {product.stock === 0 ? (
                      <button
                        className="wishlist-notify-btn"
                        onClick={() => handleNotify(product)}
                        disabled={!!notified[product.id]}
                        style={{marginTop:12, background:'#f59e42', color:'#fff', border:'none', borderRadius:6, padding:'8px 18px', fontWeight:600, fontSize:'1rem', cursor: notified[product.id] ? 'not-allowed' : 'pointer', width:'100%'}}
                      >
                        {notified[product.id] ? 'Alert Activated' : 'Notify Me'}
                      </button>
                    ) : (
                    <button className="wishlist-add-to-cart-btn" onClick={() => handleAddToCart(product)} >
                      <FontAwesomeIcon icon={faCartIcon} style={{fontSize:'1.1em'}} /> Add to Cart
                    </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
