import React, { useState, useEffect } from 'react';
import '../Index/Dashboard.css';
import './Offers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faTimes, faStar } from '@fortawesome/free-solid-svg-icons';
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
import logo from '../Images/unnamed.png';
import { useNavigate } from 'react-router-dom';

const user = {
  name: 'Bhargav',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const languageFlagImages = {
  EN: 'https://flagcdn.com/us.svg',
  FR: 'https://flagcdn.com/fr.svg',
  ES: 'https://flagcdn.com/es.svg',
};

function Offers() {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
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
  const navigate = useNavigate();

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

  // Example offers data
  const hotDeals = [
    {
      img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      title: 'New Arrivals',
      desc: 'Check out the latest 13 arrivals in our store!',
      badge: 'New',
      type: 'Hot Deal',
    },
    {
      img: 'https://mangomaniaus.com/cdn/shop/files/MangoMania_Alphonso-Compressed_3a8a2152-47c0-4272-b759-fbddf9d3541c.png?v=1737966186',
      title: 'Mango Mania',
      desc: 'Get 20% off on all mango varieties!',
      badge: '20% OFF',
      type: 'Hot Deal',
    },
    {
      img: 'https://img.freepik.com/free-photo/assortment-healthy-food_23-2148742192.jpg?auto=format&fit=crop&w=600&q=80',
      title: 'Super Saver Combo',
      desc: 'Combo packs at 30% off for a limited time!',
      badge: '30% OFF',
      type: 'Hot Deal',
    },
  ];
  const limitedTime = [
    {
      img: 'https://www.jiomart.com/images/product/original/590001814/strawberry-small-pack-180-g-product-images-o590001814-p590116964-1-202412161658.jpg?im=Resize=(1000,1000)',
      title: 'Strawberry Fest',
      desc: 'Buy 1 Get 1 Free on strawberries!',
      badge: 'BOGO',
      type: 'Limited Time',
      timer: 'Ends in 03:21:10',
      name : 'strawberry',
      category: 'Fruits',
    },
  ];
  const recommended = [
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/2e55b6ac-f95b-4edb-b3f4-63fa824afe9d.jpeg',
      title: 'Carrot Bonanza',
      desc: 'Save 10% on fresh carrots.',
      badge: '10% OFF',
      type: 'Recommended',
    },
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/19885a90-eef8-4b09-b17d-3ecf3200caf7.jpeg',
      title: 'Pineapple Party',
      desc: 'Flat ₹50 off on pineapples.',
      badge: '₹50 OFF',
      type: 'Recommended',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80',
      title: 'Apple Delight',
      desc: 'Special price on apples for members.',
      badge: 'Member Deal',
      type: 'Recommended',
    },
  ];

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

  // Helper to get navigation path based on offer
  function getOfferNavPath(offer) {
    // Example: for real app, use offer.category or id
    if (offer.title.toLowerCase().includes('new arrivals')) return '/products?category=New%20Arrivals';
    if (offer.title.toLowerCase().includes('mango mania')) return '/products?category=Mango%20Mania';
    if (offer.title.toLowerCase().includes('super saver combo')) return '/products?category=Super%20Saver%20Combo';
    if (offer.title.toLowerCase().includes('mango')) return '/products?category=Mango%20Mania';
    if (offer.title.toLowerCase().includes('vegetable')) return '/products?category=Vegetables';
    if (offer.title.toLowerCase().includes('strawberry')) return '/products?category=Fruits';
    if (offer.title.toLowerCase().includes('carrot')) return '/products?category=Vegetables';
    if (offer.title.toLowerCase().includes('pineapple')) return '/products?category=Fruits';
    if (offer.title.toLowerCase().includes('apple')) return '/products?category=Fruits';
    if (offer.title.toLowerCase().includes('combo')) return '/products?category=Super%20Saver%20Combo';
    return '/products';
  }

  let displayName = user.name;
  try {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile && profile.firstName) displayName = profile.firstName;
  } catch {}

  const [headerImage, setHeaderImage] = useState(() => {
      try {
        const profile = JSON.parse(localStorage.getItem('profile'));
        return (profile && profile.image) ? profile.image : user.image;
      } catch {
        return user.image;
      }
    });

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
            <a className="activ" onClick={() => navigate('/wishlist')}
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
            <a className="active" onClick={() => navigate('/offers')}
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
              {/* You can use a PNG for bars if you have one, else keep as is */}
              <span style={{fontSize: 22, fontWeight: 700}}>&#9776;</span>
            </button>
          </div>
          <div className="header-search">
            <div className="search-bar-outer">
              <div className="search-bar-with-icon">
                <span style={{fontSize: 18, color: '#64748b', marginRight: 8, position:'absolute', marginLeft:5}}>&#128269;</span>
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
              <img src={headerImage} alt="User" className="user-image" />
              <span className="user-name">{displayName}</span>
              <span className="user-badge">Premium</span>
              <FontAwesomeIcon icon={dropdownOpen ? faChevronUp : faChevronDown} className="dropdown-icon" />
            </div>
            {dropdownOpen && (
              <div className="user-dropdown">
                <a onClick={() => navigate('/profile')}><img className='icon-pngs-header' src={usericon} /> Profile</a>
                <a onClick={() => navigate('/settings')}><img className='icon-pngs-header' src={settingicon}/> Settings</a>
                <button className="logout-btn"><img className='icon-pngs-header' src={logouticon} /> Logout</button>
              </div>
            )}
          </div>
        </header>
        {/* Offers Content */}
        <div className="dashboard-page-content offers-page-content">
          <h2 className="offers-main-title">🔥 Today's Best Deals & Offers</h2>

          {/* Hot Deals Section */}
          <section className="offers-section">
            <h3 className="offers-section-title">Hot Deals</h3>
            <div className="offers-grid">
              {hotDeals.map((offer, idx) => (
                <div className="offer-card hot" key={idx} style={{cursor:'pointer'}} onClick={() => navigate(getOfferNavPath(offer))}>
                  <div className="offer-img-wrap">
                    <img src={offer.img} alt={offer.title} className="offer-img" />
                    <span className="offer-badge hot-badge">{offer.badge}</span>
                  </div>
                  <div className="offer-content">
                    <h4 className="offer-title">{offer.title}</h4>
                    <p className="offer-desc">{offer.desc}</p>
                    <button className="offer-btn" onClick={e => {e.stopPropagation(); navigate(getOfferNavPath(offer));}}>Get Deal</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Limited Time Offers Section */}
          <section className="offers-section">
            <h3 className="offers-section-title">⏰ Limited Time Offers</h3>
            <div className="offers-grid">
              {limitedTime.map((offer, idx) => (
                <div className="offer-card limited" key={idx} style={{cursor:'pointer'}} onClick={() => {
                  if (offer.title && offer.title.toLowerCase().includes('strawberry')) {
                    navigate(`/products?category=${encodeURIComponent(offer.category)}=${encodeURIComponent(offer.name)}`);
                  } else {
                    navigate(`/products?category=${encodeURIComponent(offer.category)}=${encodeURIComponent(offer.name)}`);
                  }
                }}>
                  <div className="offer-img-wrap heig-og ">
                    <img src={offer.img} alt={offer.title} className="offer-img" />
                    <span className="offer-badge limited-badge">{offer.badge}</span>
                    <span className="offer-timer">{offer.timer}</span>
                  </div>
                  <div className="offer-content">
                    <h4 className="offer-title">{offer.title}</h4>
                    <p className="offer-desc">{offer.desc}</p>
                    <button className="offer-btn" onClick={e => {e.stopPropagation();  navigate(`/products?category=${encodeURIComponent(offer.category)}=${encodeURIComponent(offer.name)}`);
}}>Get Deal</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended for You Section */}
          <section className="offers-section">
            <h3 className="offers-section-title">💡 Recommended for You</h3>
            <div className="offers-grid">
              {recommended.map((offer, idx) => (
                <div className="offer-card recommended" key={idx} style={{cursor:'pointer'}} onClick={() => navigate(getOfferNavPath(offer))}>
                  <div className="offer-img-wrap">
                    <img src={offer.img} alt={offer.title} className="offer-img" />
                    <span className="offer-badge recommended-badge">{offer.badge}</span>
                  </div>
                  <div className="offer-content">
                    <h4 className="offer-title">{offer.title}</h4>
                    <p className="offer-desc">{offer.desc}</p>
                    <button className="offer-btn" onClick={e => {e.stopPropagation(); navigate(getOfferNavPath(offer));}}>Get Deal</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Offers;
