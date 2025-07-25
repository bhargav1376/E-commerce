import React, { useState, useEffect, useRef } from 'react';
import '../Index/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faShoppingCart, faBars, faChevronLeft, faChevronDown, faChevronUp, faUser, faCog, faSignOutAlt, faTag, faSearch, faHome, faBell, faTimes, faPlus, faChevronRight, faHeart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import logo from '../Images/unnamed.png';
import { useNavigate, useLocation } from 'react-router-dom';
// Import allProducts from Products.jsx for add-ons
import { allProducts } from '../Products/Products.jsx';
import './Cart.css'
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

function getRandomAddOns(cart, count = 5) {
  // Exclude items already in cart and out of stock
  const cartIds = cart.map(item => item.id);
  const available = allProducts.filter(p => !cartIds.includes(p.id) && (p.stock === undefined || p.stock > 0));
  // Shuffle and pick count
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  return available.slice(0, count);
}

function Cart() {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const navigate = useNavigate();
  const location = useLocation();
  const initialCartData = location.state && location.state.cart ? location.state.cart : [];
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    if (stored) return JSON.parse(stored);
    if (location.state && location.state.cart) return location.state.cart;
    return [];
  });
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  const handleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  // Checkout logic
  const [showCheckout, setShowCheckout] = useState(false);
  // Replace static addOns with dynamic
  const [addOns, setAddOns] = useState([]);
  const [addOnPool, setAddOnPool] = useState([]);
  const [visibleAddOns, setVisibleAddOns] = useState(5);
  const addOnsScrollRef = useRef(null);
  const [showAddOnArrows, setShowAddOnArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    // Exclude items in cart from the pool
    const cartIds = cart.map(item => item.id);
    const pool = allProducts.filter(p => !cartIds.includes(p.id) && (p.stock === undefined || p.stock > 0));
    setAddOnPool(pool);
    setAddOns(pool.slice(0, 20)); // Show up to 20 add-ons
  }, []);

  // When cart changes, update the pool and addOns to avoid showing already added items
  useEffect(() => {
    const cartIds = cart.map(item => item.id);
    const pool = allProducts.filter(p => !cartIds.includes(p.id) && (p.stock === undefined || p.stock > 0));
    // Remove any addOns that are now in the cart
    setAddOns(prev => prev.filter(item => !cartIds.includes(item.id)));
    setAddOnPool(pool);
  }, [cart]);

  // Update arrow visibility based on scroll position
  const updateAddOnScrollArrows = () => {
    const el = addOnsScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateAddOnScrollArrows();
  }, [addOns]);

  const handleAddOnsScroll = () => {
    updateAddOnScrollArrows();
  };

  const scrollAddOns = (direction) => {
    const el = addOnsScrollRef.current;
    if (!el) return;
    const card = el.querySelector('.checkout-addon-card');
    const scrollAmount = card ? card.offsetWidth + 18 : 120; // 18px gap
    if (direction === 'left') {
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  // Add updateQty function
  function updateQty(id, qty) {
    setCart(prev => {
      if (qty <= 0) {
        return prev.filter(item => item.id !== id);
      } else {
        return prev.map(item => item.id === id ? { ...item, qty } : item);
      }
    });
  }
  const [addToCart, setAddToCart] = useState(null);

  // Coupon logic
  const [couponModal, setCouponModal] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponSearch, setCouponSearch] = useState('');
  const coupons = [
    { code: 'SAVE20', name: 'Save 20% on Fruits', discount: 0.2 },
    { code: 'FRESH10', name: '10% Off on Vegetables', discount: 0.1 },
    { code: 'WELCOME', name: 'Welcome Offer', discount: 0.15 },
  ];
  // Tip logic
  const [tip, setTip] = useState(0);
  const [tipOther, setTipOther] = useState(false);
  const [tipInput, setTipInput] = useState('');
  const [tipError, setTipError] = useState('');
  const [customTip, setCustomTip] = useState(null);
  // Address logic
  const [selectedAddress, setSelectedAddress] = useState('home');
  const addresses = [
    { id: 'home', label: 'Home', details: '123 Main St, City, 123456' },
    { id: 'office', label: 'Office', details: '456 Office Park, City, 654321' },
  ];
  // Payment logic
  const [paymentMode, setPaymentMode] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [upiInput, setUpiInput] = useState('');
  const [cardInput, setCardInput] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [paymentError, setPaymentError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  // Error popup logic
  const [errorPopup, setErrorPopup] = useState('');
  const errorTimeout = useRef();
  useEffect(() => {
    if (errorPopup) {
      clearTimeout(errorTimeout.current);
      errorTimeout.current = setTimeout(() => setErrorPopup(''), 2500);
    }
    return () => clearTimeout(errorTimeout.current);
  }, [errorPopup]);
  // Coupon apply handler
  const handleApplyCoupon = (code) => {
    const found = coupons.find(c => c.code.toLowerCase() === code.trim().toLowerCase());
    if (!found) {
      setCouponError('Coupon not valid');
      setErrorPopup('Coupon not valid');
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(found);
    setCouponModal(false);
    setCouponError('');
    setErrorPopup('');
  };
  // Tip handler
  const handleTipAmountClick = (amount) => {
    if (tip === amount) {
      setTip(0);
      setCustomTip(null);
      setTipOther(false);
    } else {
      setTip(amount);
      setCustomTip(null);
      setTipOther(false);
    }
  };
  const handleTipOther = () => {
    setTipOther(true);
    setTip(0);
    setCustomTip(null);
    setTipInput('');
    setTipError('');
  };
  const handleTipInput = (val) => {
    setTipInput(val);
    setTipError('');
  };
  const handleAddCustomTip = () => {
    const val = Number(tipInput);
    if (isNaN(val) || val <= 0) {
      setTipError('Enter a valid amount');
      return;
    }
    if (val > 1000) {
      setTipError('Tip must be under 1000');
      return;
    }
    setTip(val);
    setCustomTip(val);
    setTipOther(false);
    setTipInput('');
    setTipError('');
  };
  const handleCustomTipClick = () => {
    setTip(0);
    setCustomTip(null);
    setTipOther(true);
  };
  // Bill calculation
  const itemTotal = cart.reduce((sum, item) => sum + (item.qty * (item.price || 100)), 0);
  const couponDiscount = appliedCoupon ? Math.round(itemTotal * appliedCoupon.discount) : 0;
  const handlingFee = 20;
  const deliveryTip = tip;
  const gst = Math.round((itemTotal - couponDiscount + handlingFee) * 0.05);
  const charges = 10;
  const grandTotal = itemTotal - couponDiscount + handlingFee + deliveryTip + gst + charges;
  // Payment handler
  const handleProceedPayment = () => {
    if (!paymentMode) return;
    setShowPayment(true);
    setPaymentError('');
  };
  const handlePay = () => {
    if (paymentMode === 'UPI') {
      if (!upiInput.match(/^[\w.-]+@[\w.-]+$/)) {
        setPaymentError('Enter a valid UPI ID');
        setErrorPopup('Enter a valid UPI ID');
        return;
      }
      setOrderSuccess(true);
    } else if (paymentMode === 'CARD') {
      if (!cardInput.number || !cardInput.name || !cardInput.expiry || !cardInput.cvv) {
        setPaymentError('Fill all card details');
        setErrorPopup('Fill all card details');
        return;
      }
      setOrderSuccess(true);
    } else if (paymentMode === 'COD') {
      // Only show success after clicking OK, not immediately
      setOrderSuccess(false);
      setShowPayment(false);
      setTimeout(() => setOrderSuccess(true), 100); // show after modal closes
    }
  };

  // Add-to-cart logic for add-ons
  function handleAddOnToCart(product) {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
    setAddOns(prev => {
      // Remove the added item
      const filtered = prev.filter(item => item.id !== product.id);
      // Find a new item from the pool that is not in addOns or cart
      const cartIds = cart.map(item => item.id).concat([product.id]);
      const addOnIds = filtered.map(item => item.id);
      const newCandidate = addOnPool.find(p => !cartIds.includes(p.id) && !addOnIds.includes(p.id));
      if (newCandidate) {
        return [...filtered, newCandidate];
      }
      return filtered;
    });
  }

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

  const [upiAppModal, setUpiAppModal] = useState(null); // { app: 'GPay'|'PhonePe'|'Paytm' } or null
  const [upiAppResult, setUpiAppResult] = useState(null); // 'success' | 'cancelled' | null

  // In UPI modal, handle app button click
  const handleUpiAppClick = (app) => {
    setUpiAppModal({ app });
  };
  const handleUpiAppConfirm = (result) => {
    setUpiAppModal(null);
    setUpiAppResult(result);
    if (result === 'success') {
      setTimeout(() => {
        setShowPayment(false);
        setOrderSuccess(true);
        setUpiAppResult(null);
      }, 1200);
    } else {
      setTimeout(() => setUpiAppResult(null), 1200);
    }
  };

  // After successful checkout, clear cart from localStorage
  useEffect(() => {
    if (orderSuccess) {
      setCart([]);
      localStorage.removeItem('cart');
    }
  }, [orderSuccess]);

  function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  const [addonModal, setAddonModal] = useState(null); // { product: ... } or null

  return (
    <>
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
            <a className="activ" onClick={() => navigate('/wishlist')}
              style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#f59e42' }}>
                <img className='icon-pngs' src={wishlisticon} />
              </span>
              <span>Wishlist</span>
            </a>
          </li>
          <li>
            <a className="active" onClick={() => navigate('/cart')}
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
                    placeholder="Search..."
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
                {/* {getTotalItems() > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: '#dc2626',
                    color: '#fff',
                    borderRadius: '50%',
                    minWidth: 20,
                    height: 20,
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 6px',
                    zIndex: 2,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
                  }}>{getTotalItems()}</span>
                )} */}
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
          {/* Checkout Content (no modal) */}
          {cart.length === 0 ? (
            <div style={{textAlign: 'center', margin: '60px auto', maxWidth: 500}}>
              <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty Cart" style={{width: 120, marginBottom: 24, opacity: 0.7}} />
              <h2 style={{color: '#b91c1c', marginBottom: 12}}>Your cart is empty</h2>
              <p style={{color: '#64748b', marginBottom: 24}}>Looks like you haven't added anything to your cart yet.</p>
              <button className="checkout-btn" style={{background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer'}} onClick={() => navigate('/products')}>
                Browse Products
              </button>
            </div>
          ) : (
            <div className="checkout-modal-content" style={{margin: '32px auto', maxWidth: 800}}>
              {/* Cart Items */}
              <div className="checkout-cart-items">
                <h4>Your Items</h4>
                <ul className="checkout-cart-list">
                  {cart.map(item => (
                    <li key={item.id} className="checkout-cart-item">
                      <img src={item.images && item.images[0]} alt={item.name} className="checkout-cart-img" />
                      <span className="checkout-cart-name" >{item.name}</span>
                      <div className="checkout-cart-qty-controls">
                        <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <span className="checkout-cart-item-price">
                        {item.discount ? (
                          <>
                            <span style={{textDecoration: 'line-through', color: '#b91c1c', marginRight: 6, fontWeight: 400}}>
                              ₹{(item.price * item.qty).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                            </span>
                            ₹{(item.price * (1 - item.discount / 100) * item.qty).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                          </>
                        ) : (
                          <>₹{(item.price * item.qty).toLocaleString('en-IN', {minimumFractionDigits: 2})}</>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Last Minute Add-ons */}
              <div className="checkout-addons-section">
                <h4>Last Minute Add-ons</h4>
                <div
                  className="checkout-addons-slider-wrapper"
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setShowAddOnArrows(true)}
                  onMouseLeave={() => setShowAddOnArrows(false)}
                >
                  {showAddOnArrows && canScrollLeft && (
                    <button
                      className="addons-arrow left"
                      style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: '#fff', border: 'none', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => scrollAddOns('left')}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                  )}
                  {showAddOnArrows && canScrollRight && (
                    <button
                      className="addons-arrow right"
                      style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: '#fff', border: 'none', borderRadius: '50%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', width: 36, height: 36, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => scrollAddOns('right')}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  )}
                  <div
                    className="checkout-addons-scroll"
                    ref={addOnsScrollRef}
                    onScroll={handleAddOnsScroll}
                    style={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '0 40px' }}
                  >
                    {addOns.map(item => (
                      <div key={item.id} className="checkout-addon-card" style={{ display: 'inline-block' }}>
                        <img src={item.images && item.images[0]} alt={item.name} className="checkout-addon-img" onClick={() => setAddonModal(item)} style={{cursor:'pointer'}} />
                        <div className="checkout-addon-price">₹{item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                        <div className="cart-qty-unit" style={{marginTop: '2px', marginBottom: '2px'}}>{item.quantity || '1kg'}</div>
                        <button className="checkout-addon-plus" onClick={() => handleAddOnToCart(item)}>
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Hide scrollbar with CSS */}
              <style>{`.checkout-addons-scroll::-webkit-scrollbar { display: none; }`}</style>
              {/* Side by side Coupons & Tip Section */}
              <div className="checkout-row-flex">
                {/* Coupons Section */}
                <div className="checkout-coupons-section">
                  <div style={{
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    minHeight: 70,
                    margin: '0 auto',
                    maxWidth: 420
                  }}>
                    <FontAwesomeIcon icon={faTag} style={{fontSize: 28, color: '#1d4ed8', background: '#e0e7ff', borderRadius: '8px', padding: 10}} />
                    <div style={{flex: 1}}>
                      {/* <h4 style={{margin: 0, color: '#1d4ed8', fontWeight: 600, fontSize: 18}}>Coupons</h4> */}
                      {appliedCoupon ? (
                        <div className="applied-coupon-row" style={{marginTop: 6}}>
                          <span className="applied-coupon-name">{appliedCoupon.name} ({appliedCoupon.code})</span>
                          <button className="remove-coupon-btn" onClick={() => setAppliedCoupon(null)}>Remove</button>
                        </div>
                      ) : (
                        <button className="add-coupon-btn" onClick={() => setCouponModal(true)} style={{marginTop: 6}}>Add Coupon</button>
                      )}
                      {couponError && <div className="coupon-error-msg">{couponError}</div>}
                    </div>
                  </div>
                </div>
                {/* Tip Section */}
                <div className="checkout-tip-section-card">
                  <div className="tip-card" style={{
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
                    padding: '18px 24px',
                    minHeight: 70,
                    margin: '0 auto',
                    maxWidth: 420
                  }}>
                    <div className="checkout-tip-section" style={{margin: 0}}>
                      <h4 style={{margin: 0, color: '#26282A', fontWeight: 600, fontSize: 18, marginBottom:10}}>Say Thanks with a Tip</h4>
                      <div className="tip-btn-row">
                        {[10, 20, 50].map(amount => (
                          <button
                            key={amount}
                            className={`tip-btn${tip === amount ? ' selected' : ''}`}
                            onClick={() => handleTipAmountClick(amount)}
                          >
                            ₹{amount}
                          </button>
                        ))}
                        {customTip && !tipOther ? (
                          <button
                            className={`tip-btn selected`}
                            onClick={handleCustomTipClick}
                          >
                            ₹{customTip}
                          </button>
                        ) : (
                          <button className={`tip-btn${tipOther ? ' selected' : ''}`} onClick={handleTipOther}>Other</button>
                        )}
                      </div>
                      {tipOther && (
                        <div className="tip-other-row" style={{flexDirection: 'column', alignItems: 'flex-start', gap: 0}}>
                          {customTip === null ? (
                            <>
                              <input
                                type="number"
                                className="tip-other-input"
                                placeholder="Enter tip (max 1000)"
                                value={tipInput}
                                onChange={e => handleTipInput(e.target.value)}
                                style={{marginBottom: 6}}
                              />
                              <button className="add-coupon-btn" style={{padding: '6px 18px', fontSize: 15, marginBottom: 0}} onClick={handleAddCustomTip}>Add</button>
                              {tipError && <span className="tip-error-msg" style={{marginTop: 4}}>{tipError}</span>}
                            </>
                          ) : (
                            <button
                              className={`tip-btn selected`}
                              onClick={handleCustomTipClick}
                              style={{marginTop: 0}}
                            >
                              ₹{customTip}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Coupon Modal */}
              {couponModal && (
                <div className="coupon-modal-overlay" onClick={() => setCouponModal(false)}>
                  <div className="coupon-modal new-coupon-modal" onClick={e => e.stopPropagation()} style={{boxShadow: '0 8px 32px rgba(37,99,235,0.18)', borderRadius: 18, maxWidth: 500, width: '95vw', padding: '32px 28px'}}>
                    <div className="coupon-modal-header" style={{borderBottom: 'none', padding: 0, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <h4 style={{color: '#1d4ed8', fontWeight: 700, fontSize: 20, margin: 0}}>Apply Coupon</h4>
                      <button className="close-modal-btn" onClick={() => setCouponModal(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                    <div className="coupon-modal-content" style={{padding: 0, marginTop: 10}}>
                      <input
                        type="text"
                        className="coupon-search-input"
                        placeholder="Enter coupon code"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        style={{marginBottom: 12, border: '1.5px solid #1d4ed8', borderRadius: 8, fontSize: 17, padding: '10px 14px'}}
                      />
                      <button
                        className="apply-coupon-btn"
                        onClick={() => handleApplyCoupon(couponInput)}
                      >
                        Apply
                      </button>
                      {couponError && <div className="coupon-error-msg" style={{marginTop: 8}}>{couponError}</div>}
                      {/* Show up to 5 available coupons below */}
                      <div style={{marginTop: 18}}>
                        <h5 style={{color: '#1d4ed8', fontWeight: 600, fontSize: 15, margin: '0 0 8px 0'}}>Available Coupons</h5>
                        {coupons.slice(0, 5).map(c => (
                          <div key={c.code} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f1f5f9', borderRadius: 8, padding: '10px 14px', marginBottom: 8, boxShadow: '0 1px 4px rgba(37,99,235,0.06)'}}>
                            <div>
                              <span style={{fontWeight: 600, color: '#222'}}>{c.name}</span>
                              <span style={{color: '#64748b', marginLeft: 8, fontSize: 13}}>({c.code})</span>
                            </div>
                            <button
                              className="apply-coupon-btn"
                              onClick={() => handleApplyCoupon(c.code)}
                            >
                              Apply
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Address Section */}
              <div className="checkout-address-section">
                <h4>Delivery Address</h4>
                <div className="address-list-col">
                  {addresses.map(addr => (
                    <label key={addr.id} className="address-radio-label-card">
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="address-radio-input"
                      />
                      <div className="address-radio-details">
                        <span className="address-label-main">{addr.label}</span>
                        <span className="address-details">{addr.details}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* Bill Details Section */}
              <div className="checkout-bill-section-card">
                <div style={{
                  background: '#fff',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
                  padding: '22px 28px',
                  margin: '0 auto',
                  marginTop: 18
                }}>
                  <h4 style={{margin: 0, color: '#1d4ed8', fontWeight: 700, fontSize: 19, marginBottom: 18, letterSpacing: 0.2}}>Bill Details</h4>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                    <div className="bill-row"><span>Items Total</span><span>₹{itemTotal}</span></div>
                    {appliedCoupon && <div className="bill-row"><span>Coupon Discount</span><span style={{color: '#059669'}}>-₹{couponDiscount}</span></div>}
                    <div className="bill-row"><span>Handling Fee</span><span>₹{handlingFee}</span></div>
                    <div className="bill-row"><span>Delivery Tip</span><span>₹{deliveryTip}</span></div>
                    <div className="bill-row"><span>GST (5%)</span><span>₹{gst}</span></div>
                    <div className="bill-row"><span>Other Charges</span><span>₹{charges}</span></div>
                    <div style={{borderTop: '1.5px solid #e5e7eb', margin: '10px 0 0 0'}}></div>
                    <div className="bill-row total" style={{background: '#f1f5f9', borderRadius: 8, padding: '10px 0', fontSize: 18, color: '#1d4ed8', fontWeight: 700, marginTop: 0,  padding: '12px 28px',}}>
                      <span>Grand Total</span><span>₹{grandTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Note Section */}
              <div className="checkout-note-section-ad" style={{margin: '18px 0'}}>
                <div style={{
                  background: 'linear-gradient(90deg, #fef9c3 0%, #fde68a 100%)',
                  borderRadius: 10,
                  boxShadow: '0 2px 8px rgba(251,191,36,0.10)',
                  padding: '16px 22px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  // maxWidth: 600,
                  margin: '0 auto',
                  border: '1.5px solid #fde68a'
                }}>
                  <span style={{fontSize: 22, color: '#f59e42', marginTop: 2, flexShrink: 0}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <div>
                    <div style={{fontWeight: 700, color: '#b45309', fontSize: 16, marginBottom: 2}}>Important!</div>
                    <span style={{color: '#92400e', fontSize: 15, fontWeight: 500}}>
                      Orders cannot be cancelled and are non-refundable once packed for delivery.
                    </span>
                  </div>
                </div>
              </div>
              {/* Payment Section */}
              <div className="checkout-payment-section">
                <h4>Payment Mode</h4>
                <div className="payment-modes-row-cards" style={{display: 'flex', gap: 18, marginBottom: 10}}>
                  {['UPI', 'CARD', 'COD'].map(mode => (
                    <button
                      key={mode}
                      className={`payment-mode-card${paymentMode === mode ? ' selected' : ''}`}
                      onClick={() => setPaymentMode(mode)}
                      style={{
                        background: paymentMode === mode ? '#2563eb' : '#f1f5f9',
                        color: paymentMode === mode ? '#fff' : '#222',
                        border: paymentMode === mode ? '2px solid #2563eb' : '2px solid #e5e7eb',
                        borderRadius: 10,
                        padding: '14px 32px',
                        fontSize: 17,
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: paymentMode === mode ? '0 2px 12px rgba(37,99,235,0.10)' : 'none',
                        transition: 'all 0.15s',
                        outline: 'none',
                        minWidth: 110
                      }}
                    >
                      {mode === 'UPI' && 'UPI'}
                      {mode === 'CARD' && 'Card'}
                      {mode === 'COD' && 'Cash on Delivery'}
                    </button>
                  ))}
                </div>
                <div className="payment-proceed-row">
                  <button
                    className="proceed-payment-btn"
                    onClick={handleProceedPayment}
                    disabled={!paymentMode}
                    style={{opacity: paymentMode ? 1 : 0.5, cursor: paymentMode ? 'pointer' : 'not-allowed'}}
                  >
                    Proceed & Pay ₹{grandTotal}
                  </button>
                </div>
                {showPayment && paymentMode && (
                  <div className="payment-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.25)', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="payment-details-modal" style={{background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', width: '95vw', maxWidth: 520, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'fadeIn 0.2s', position: 'relative'}}>
                      <button className="close-modal-btn" style={{position: 'absolute', top: 12, right: 16, zIndex: 2}} onClick={() => setShowPayment(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                      {paymentMode === 'UPI' && (
                        <div className="upi-details-row">
                          <label>Enter UPI ID:</label>
                          <input type="text" className="upi-input" placeholder="yourupi@bank" value={upiInput} onChange={e => setUpiInput(e.target.value)} />
                          <button className="pay-btn" onClick={handlePay}>Pay ₹{grandTotal}</button>
                          {paymentError && <span className="payment-error-msg">{paymentError}</span>}
                          <div className="upi-apps-row">
                            <span>Or select an app:</span>
                            <button className="upi-app-btn" onClick={() => handleUpiAppClick('GPay')}>GPay</button>
                            <button className="upi-app-btn" onClick={() => handleUpiAppClick('PhonePe')}>PhonePe</button>
                            <button className="upi-app-btn" onClick={() => handleUpiAppClick('Paytm')}>Paytm</button>
                          </div>
                        </div>
                      )}
                      {paymentMode === 'CARD' && (
                        <div className="card-details-row">
                          <label>Card Number:</label>
                          <input type="text" className="card-input" placeholder="Card Number" value={cardInput.number} onChange={e => setCardInput({ ...cardInput, number: e.target.value })} />
                          <label>Name on Card:</label>
                          <input type="text" className="card-input" placeholder="Name" value={cardInput.name} onChange={e => setCardInput({ ...cardInput, name: e.target.value })} />
                          <label>Expiry:</label>
                          <input type="text" className="card-input" placeholder="MM/YY" value={cardInput.expiry} onChange={e => setCardInput({ ...cardInput, expiry: e.target.value })} />
                          <label>CVV:</label>
                          <input type="password" className="card-input" placeholder="CVV" value={cardInput.cvv} onChange={e => setCardInput({ ...cardInput, cvv: e.target.value })} />
                          <button className="pay-btn" onClick={handlePay}>Pay ₹{grandTotal}</button>
                          {paymentError && <span className="payment-error-msg">{paymentError}</span>}
                        </div>
                      )}
                      {paymentMode === 'COD' && (
                        <div className="cod-success-row">
                          <span>Click OK to place your order.</span>
                          <button className="pay-btn" onClick={handlePay}>OK</button>
                        </div>
                      )}
                    </div>
                    {/* UPI App Confirmation Modal */}
                    {upiAppModal && (
                      <div className="payment-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.25)', zIndex: 1300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div className="payment-details-modal" style={{background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', width: '95vw', maxWidth: 340, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', textAlign: 'center'}}>
                          <div style={{fontWeight: 600, fontSize: 18, marginBottom: 16}}>Open {upiAppModal.app} for payment?</div>
                          <div style={{display: 'flex', gap: 18, marginTop: 8, justifyContent: 'center'}}>
                            <button className="pay-btn" style={{background: '#22c55e'}} onClick={() => handleUpiAppConfirm('success')}>Yes</button>
                            <button className="pay-btn" style={{background: '#b91c1c'}} onClick={() => handleUpiAppConfirm('cancelled')}>No</button>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* UPI App Result Modal */}
                    {upiAppResult && (
                      <div className="payment-modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.25)', zIndex: 1400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div className="payment-details-modal" style={{background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', width: '95vw', maxWidth: 340, maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 24px', textAlign: 'center'}}>
                          {upiAppResult === 'success' ? (
                            <>
                              <div style={{fontWeight: 700, color: '#22c55e', fontSize: 20, marginBottom: 8}}>Payment Successful!</div>
                              <div style={{color: '#222', fontSize: 16}}>Thank you for your payment.</div>
                            </>
                          ) : (
                            <>
                              <div style={{fontWeight: 700, color: '#b91c1c', fontSize: 20, marginBottom: 8}}>Payment Cancelled</div>
                              <div style={{color: '#222', fontSize: 16}}>You cancelled the payment.</div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Error Popup */}
              {errorPopup && <div className="checkout-error-popup">{errorPopup}</div>}
              {/* Order Success Modal */}
              {orderSuccess && (
                <div className="order-success-modal-overlay">
                  <div className="order-success-modal">
                    <h2>Order Successful!</h2>
                    <p>Thank you for your order. Your order will be delivered soon.</p>
                    <button className="close-modal-btn" onClick={() => { setOrderSuccess(false); setShowCheckout(false); }}>Close</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Add-on Modal */}
      {addonModal && (
        <div className="addon-modal-overlay" onClick={() => setAddonModal(null)}>
          <div className="addon-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" style={{position:'absolute', top:3, right:5}} onClick={() => setAddonModal(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img src={addonModal.images && addonModal.images[0]} alt={addonModal.name} style={{width:'100%', height:180, objectFit:'cover', borderRadius:12, marginBottom:18}} />
            <div className="addon-modal-title-row">
               <div className="addon-names-title">
                  <h3 style={{margin:'8px 0 4px 0', color:'#185a9d', fontWeight:600, fontSize:'1.15rem'}}>{addonModal.name}</h3>
                  <div style={{color:'#444', fontSize:15, marginBottom:10}}>{addonModal.desc || 'No description available.'}</div>
               </div>
              <div className='addon-price-title'>
                  <span className="addon-modal-price">₹{addonModal.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
              </div>
            </div>
           
            <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16}}>
              <span style={{color:'#f59e42', fontWeight:700, fontSize:18}}>★ {addonModal.rating || 4.5}</span>
              <span style={{color:'#64748b', fontSize:14}}>({addonModal.reviews ? addonModal.reviews.toLocaleString() : '1,234'} ratings)</span>
            </div>
            <button className="checkout-btn" style={{width:'100%', marginTop:8}} onClick={() => { handleAddOnToCart(addonModal); setAddonModal(null); }}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
