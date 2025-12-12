import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faCarrot, faShoppingCart, faBars, faChevronLeft, faChevronDown, faChevronUp, faUser, faCog, faSignOutAlt, faGlobe, faTag, faQuestionCircle, faSearch, faHome, faCaretLeft, faCaretRight, faBell, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../Images/Bhargav-logo.png';
import { useNavigate } from 'react-router-dom';
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
import { allProducts } from '../Products/Products.jsx';


const user = {
  name: 'Bhargav',
  image: 'https://raw.githubusercontent.com/bhargavchintha/About-Me/872b6bcaaa2984045283b79015828f8c67bfbc27/Images/favicon.png',
};

// Slideshow images and content
const slides = [
  {
    img: 'https://c4.wallpaperflare.com/wallpaper/437/455/804/food-fruit-strawberries-blood-orange-wallpaper-preview.jpg',
    title: 'Fresh Fruits',
    desc: 'Enjoy the best seasonal fruits delivered to your door.',
    link: 'Fruits'
  },
  {
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    title: 'Organic Vegetables',
    desc: 'Handpicked organic vegetables for a healthy lifestyle.',
    link: 'Vegetables'
  },
  {
    img: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?_gl=1*1pdz7zk*_ga*MTEyNjM3NjE4My4xNzUxNjIzMjY1*_ga_8JE65Q40S6*czE3NTE2MjMyNjQkbzEkZzEkdDE3NTE2MjMyNjckajU3JGwwJGgw',
    title: 'Latest Electronics',
    desc: 'Shop the newest gadgets and electronics at unbeatable prices.',
    link: 'Electronics'
  },
  {
    img: 'https://d3mbwbgtcl4x70.cloudfront.net/new_home_essentials_01_496d1c58c5.webp',
    title: 'Home Essentials',
    desc: 'Everything you need for a comfortable and stylish home.',
    link: 'Home'
  },
  {
    img: 'https://cdn.prod.website-files.com/60414b21f1ffcdbb0d5ad688/669978bc57aa97a3f12a1d99_AD_4nXcwNZ5JMRunPbzQcg1jyKNJ7s8PQP_DkmrtP5hqcraFYbKppUUseD0-kaEYQgBDEZOyKVzma3KbJ1Aq3LkzcPrCq7F0saB29jyU7JLLwAEES8H48ZNL_7-ecxztCZz64CbBEAMiHSWdxKlSVBRqGqGAx1Xy.jpeg',
    title: 'Farm to Table',
    desc: 'Direct from local farms, always fresh and tasty.',
    link: 'Vegetables'
  }
];

const cardSections = [
  {
    header: 'Hot Deals',
    cards: [
      {
        img: 'https://mangomaniaus.com/cdn/shop/files/MangoMania_Alphonso-Compressed_3a8a2152-47c0-4272-b759-fbddf9d3541c.png?v=1737966186',
        title: 'Mango Mania',
        desc: 'Get 20% off on all mango varieties!',
        badge: 'Hot Deal'
      },
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMMDgofWkyi6-0pVZ4ifRc4FGy4UDLiirNZw&s',
        title: 'Grocerys',
        desc: 'Best prices on daily essentials and groceries.',
        badge: 'Hot Deal'
      },
      {
        img: 'https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg',
        title: 'Vegetables',
        desc: 'Fresh vegetables at unbeatable prices!',
        badge: 'Hot Deal'
      },
      {
        img: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/32599/images/ec0547c-576-8207-beb8-fe808be00fb_img_22_fruits_1533625008.jpeg',
        title: 'Fruits',
        desc: 'Seasonal fruits, always fresh and juicy.',
        badge: 'Hot Deal'
      }
    ]
  },
  {
    header: 'Electronics',
    cards: [
      {
        img: 'https://www.gizbot.com/img/2024/09/flipkart-big-billion-days-2024-sale-smartphone-deals-1727266633.jpg',
        title: 'Smartphone Sale',
        desc: 'Latest smartphones at amazing prices.',
        badge: 'Electronics'
      },
      {
        img: 'https://down-id.img.susercontent.com/file/id-11134207-7qul3-lfkpnr5fi63151',
        title: 'Headphones Bonanza',
        desc: 'Top headphones with up to 40% off.',
        badge: 'Electronics'
      }
    ]
  },
  {
    header: 'Home & Decor',
    cards: [
      {
        img: 'https://bergnerhome.in/cdn/shop/articles/Header-Banner-1.png?v=1718542473&width=2048',
        title: 'Kitchen Essentials',
        desc: 'Upgrade your kitchen with top-rated appliances.',
        badge: 'Home'
      },
      {
        img: 'https://hips.hearstapps.com/hmg-prod/images/sarah-storms-photo-by-brian-wetzel-01-76-6682ea910395c.jpg?crop=0.668xw:1.00xh;0.159xw,0&resize=640:*',
        title: 'Home Decor',
        desc: 'Trendy home decor for every style.',
        badge: 'Home'
      }
    ]
  },
  {
    header: 'New Arrivals',
    cards: [
      {
        img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        title: 'New Arrivals',
        desc: 'Check out the latest additions to our store.',
        badge: 'New'
      },
      {
        img: 'https://www.shutterstock.com/image-photo/pictures-natural-fresh-fruit-juice-260nw-2335482853.jpg',
        title: 'Fresh Juices',
        desc: 'Natural juices for a healthy you.',
        badge: 'Fresh'
      }
    ]
  }
];

const categoryImages = [
  {
    img: 'https://static.vecteezy.com/system/resources/previews/042/729/203/non_2x/a-bountiful-selection-of-fresh-vibrant-fruits-are-scattered-artfully-on-the-pristine-white-background-photo.jpg',
    label: 'Fruits',
    className: 'fruits'
  },
  {
    img: 'https://images.ctfassets.net/0dkgxhks0leg/4LaYoCoepR6ZwEkAmQFh2F/e82fa8e3c87f0e4cdb3e914b3e766fa0/blog-large-2020veg.jpg',
    label: 'Vegetables',
    className: 'vegetables'
  },
  {
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80',
    label: 'Electronics',
    className: 'electronics'
  },
  {
    img: 'https://numalis.com/wp-content/uploads/2023/10/Maxx-Studio-Shutterstock.jpg',
    label: 'Home',
    className: 'home'
  },
  {
    img: 'https://t4.ftcdn.net/jpg/01/45/60/21/360_F_145602173_05uVexifBuCvWIKvsHGWNuIpPtp5ShkI.jpg',
    label: 'Dairy',
    className: 'dairy'
  },
  {
    img: 'https://img.freepik.com/free-photo/sweet-pastry-assortment-top-view_23-2148516578.jpg?semt=ais_hybrid&w=740',
    label: 'Bakery',
    className: 'bakery'
  },
  // Additional categories for slider demo
  {
    img: 'https://www.distacart.com/cdn/shop/files/71-FCdmBdeL._SL1080_1280x.jpg?v=1727265991',
    label: 'Snacks',
    className: 'snacks'
  },
  {
    img: 'https://www.hotelwelkinresidency.com/wp-content/uploads/2018/01/softdrinks.jpg',
    label: 'Beverages',
    className: 'beverages'
  },
  {
    img: 'https://t3.ftcdn.net/jpg/02/72/37/20/360_F_272372012_2aOGqAOdrJaFmaqlkGCHSvlcL2wrLUDD.jpg',
    label: 'Personal Care',
    className: 'personal-care'
  },
  {
    img: 'https://assets.entrepreneur.com/content/3x2/2000/1691225116-Hithere1.png?format=pjeg&auto=webp&crop=16:9&width=675&height=380',
    label: 'Stationery',
    className: 'stationery'
  },
  {
    img: 'https://storio.in/cdn/shop/files/419j_9HBzFL.jpg?v=1712374499&width=696',
    label: 'Toys',
    className: 'toys'
  },
  {
    img: 'https://dfvc2y3mjtc8v.cloudfront.net/104100595/cover-HaXq6F/EM7mAnt-200x200.jpg',
    label: 'Pet Supplies',
    className: 'pet-supplies'
  },
];

// Helper for language flag images
const languageFlagImages = {
  EN: 'https://flagcdn.com/us.svg',
  FR: 'https://flagcdn.com/fr.svg',
  ES: 'https://flagcdn.com/es.svg',
};



const whyShop = [
  { key: 'fresh', icon: faAppleAlt, title: 'Freshest Produce', desc: 'Direct from farms, always fresh.' },
  { key: 'easy', icon: faShoppingCart, title: 'Easy Shopping', desc: 'Seamless and secure checkout.' },
  { key: 'deals', icon: faTag, title: 'Best Deals', desc: 'Unbeatable prices and offers.' },
  { key: 'support', icon: faQuestionCircle, title: '24/7 Support', desc: 'We are here to help you anytime.' },
];

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect( () =>{
      const mediaQuery = window.matchMedia("(max-width: 700px)");
         setCollapsed(mediaQuery.matches);
       const handleResize = (e) => {
      setCollapsed(e.matches);
    };
     mediaQuery.addEventListener("change", handleResize);
      return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const [msgDropdown, setMsgDropdown] = useState(false);
  const [helpDropdown, setHelpDropdown] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [slideIdx, setSlideIdx] = useState(0);
  const [isSlideHovered, setIsSlideHovered] = useState(false);
  const [categoryStartIdx, setCategoryStartIdx] = useState(0);
  // Show 7 cards when sidebar is open, 8 when collapsed
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(7);
  const [showCategoryArrows, setShowCategoryArrows] = useState(false);
  const navigate = useNavigate();
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

  // Only toggle dropdown, do not change user image
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

  // Slideshow navigation
  const nextSlide = () => setSlideIdx((slideIdx + 1) % (slides ? slides.length : 0));
  const prevSlide = () => setSlideIdx((slideIdx - 1 + (slides ? slides.length : 0)) % (slides ? slides.length : 0));
  const goToSlide = idx => setSlideIdx(idx);

  // Auto slide show
  useEffect(() => {
    if (isSlideHovered) return;
    const timer = setTimeout(() => {
      setSlideIdx(idx => (idx + 1) % (slides ? slides.length : 0));
    }, 3000);
    return () => clearTimeout(timer);
  }, [slideIdx, isSlideHovered]);

  useEffect(() => {
    const calculateVisibleCount = () => {
      const width = window.innerWidth;

      let count;
      if (collapsed) {
        if (width >= 1200) count = 8;
        else if (width >= 992) count = 6;
        else if (width >= 880) count = 7;
        else if (width >= 768) count = 6;
        else if (width >= 730) count = 5;
        else if (width >= 600) count = 5; 
        else if (width >= 400) count = 3; 
        else count = 3;
      } else {
        if (width >= 1200) count = 7;
        else if (width >= 992) count = 5;
        else if (width >= 880) count = 6;
        else if (width >= 768) count = 5;
        else if (width >= 750) count = 4;
        else if (width >= 730) count = 4;
        else if (width >= 600) count = 3;
        else if (width >= 400) count = 2; 
        else count = 2;
      }

      setVisibleCategoryCount(count);
    };

    calculateVisibleCount();

    window.addEventListener('resize', calculateVisibleCount);
    return () => window.removeEventListener('resize', calculateVisibleCount);
  }, [collapsed]);

  // Next slide
  const nextCategorySlide = () => {
    setCategoryStartIdx(idx =>
      idx + visibleCategoryCount < (categoryImages?.length ?? 0) ? idx + 1 : idx
    );
  };

  // Previous slide
  const prevCategorySlide = () => {
    setCategoryStartIdx(idx => (idx > 0 ? idx - 1 : 0));
  };

  // Add modal state
  const [testimonialModal, setTestimonialModal] = useState(null);
  const [whyShopModal, setWhyShopModal] = useState(null);
  const [newsletterModal, setNewsletterModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Add a helper for card click navigation
  const handleCardClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  // Modal content for why shop
  const getWhyShopModalContent = (modalKey) => {
    if (!modalKey) return null;
    if (modalKey === 'fresh') {
      // Show a few fruit/vegetable images and a description
      const freshProducts = allProducts.filter(p => p.category === 'Fruits' || p.category === 'Vegetables').slice(0, 4);
      return (
        <>
          <div style={{display:'flex', gap:16, justifyContent:'center', marginBottom:18, flexWrap:'wrap'}}>
            {freshProducts.map(p => {
              const imgSrc = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : p.img;
              return (
                <div
                  key={p.id}
                  style={{textAlign:'center', cursor:'pointer'}}
                  onClick={() => navigate(`/products?category=${encodeURIComponent(p.category)}=${encodeURIComponent(p.name)}`)}
                >
                  <img
                    src={imgSrc}
                    alt={p.name}
                    style={{width:70, height:70, objectFit:'cover', borderRadius:10, marginBottom:6, background:'#fff'}}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/70?text=No+Image'; }}
                  />
                  <div style={{fontWeight:600, color:'#185a9d', fontSize:14}}>{p.name}</div>
                </div>
              );
            })}
          </div>
          <div style={{fontSize:16, color:'#319795', marginBottom:10}}>
            Enjoy the freshest fruits and vegetables, handpicked daily from trusted farms. Our produce is delivered quickly to preserve taste and nutrition.
          </div>
          <div style={{fontSize:15, color:'#444', marginBottom:18}}>Experience the difference of farm-to-table freshness in every order!</div>
          <button className="whyshop-modal-btn"  onClick={()=>navigate('/products?category=Fruits')}>Go to Fruits</button>
        </>
      );
    }
    if (modalKey === 'easy') {
      // Show shopping-related images and text
      // Find a toaster product in Home category
      const easyProduct = allProducts.find(p => p.category === 'Home' && /toaster/i.test(p.name));
      const imgSrc = easyProduct && Array.isArray(easyProduct.images) && easyProduct.images.length > 0 ? easyProduct.images[0] : (easyProduct ? easyProduct.img : '');
      return (
        <>
          <div style={{display:'flex', justifyContent:'center', marginBottom:18}}>
            {easyProduct && (
              <div style={{cursor:'pointer'}} onClick={() => navigate(`/products?category=${encodeURIComponent(easyProduct.category)}=${encodeURIComponent(easyProduct.name)}`)}>
                <img
                  src={imgSrc}
                  alt={easyProduct.name}
                  style={{width:70, height:70, objectFit:'cover', borderRadius:10, marginBottom:6, background:'#fff'}}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/70?text=No+Image'; }}
                />
                <div style={{fontWeight:600, color:'#185a9d', fontSize:14}}>{easyProduct.name}</div>
              </div>
            )}
          </div>
          <div style={{fontSize:16, color:'#319795', marginBottom:10}}>
            Our platform is designed for a smooth, hassle-free shopping experience. Add items to your cart, checkout securely, and track your orders easily.
          </div>
          <div style={{fontSize:15, color:'#444', marginBottom:18}}>Shop from anywhere, anytime, with just a few clicks!</div>
          <button className="whyshop-modal-btn"  onClick={()=>navigate('/products?category=Home')}>Go to Home Essentials</button>
        </>
      );
    }
    if (modalKey === 'deals') {
      // Show best deal product images and text
      const dealProducts = allProducts.filter(p => p.discount && p.discount >= 10).slice(0, 3);
      return (
        <>
          <div style={{display:'flex', gap:16, justifyContent:'center', marginBottom:18, flexWrap:'wrap'}}>
            {dealProducts.map(p => {
              const imgSrc = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : p.img;
              return (
                <div key={p.id} style={{textAlign:'center', cursor:'pointer'}}  onClick={() => navigate(`/products?category=${encodeURIComponent(p.category)}=${encodeURIComponent(p.name)}`)} >
                  <img src={imgSrc} alt={p.name} style={{width:70, height:70, objectFit:'cover', borderRadius:10, marginBottom:6, background:'#fff'}} />
                  <div style={{fontWeight:600, color:'#185a9d', fontSize:14}}>{p.name}</div>
                  <div style={{color:'#ef4444', fontWeight:700, fontSize:13}}>{p.discount}% OFF</div>
                </div>
              );
            })}
          </div>
          <div style={{fontSize:16, color:'#319795', marginBottom:10}}>
            Save more with our exclusive deals and discounts. We bring you the best prices on top-quality products every day.
          </div>
          <div style={{fontSize:15, color:'#444', marginBottom:18}}>Check back often for new offers and limited-time savings!</div>
          <button className="whyshop-modal-btn"  onClick={()=>navigate('/products?category=Fruits')}>Go to Fruits</button>
        </>
      );
    }
    if (modalKey === 'support') {
      // Show support icon and text
      return (
        <>
          <div style={{display:'flex', justifyContent:'center', marginBottom:18}}>
            <FontAwesomeIcon icon={faQuestionCircle} style={{fontSize:60, color:'#43cea2'}} />
          </div>
          <div style={{fontSize:16, color:'#319795', marginBottom:10}}>
            Our customer support team is available 24/7 to assist you with any questions or issues. We are committed to your satisfaction.
          </div>
          <div style={{fontSize:15, color:'#444', marginBottom:18}}>Reach out anytime—help is just a click away!</div>
          <button className="whyshop-modal-btn" onClick={()=>navigate('/support')}>Go to Support</button>
        </>
      );
    }
    return null;
  };

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
    <>
      <div className={`dashboard-container${collapsed ? ' collapsed' : ''}`}> 
        {/* Sidebar */}
        <aside className="sidebar">
          {/* <div className="sidebar-header">
            <button className="collapse-btn" onClick={() => setCollapsed(c => !c)}>
              <FontAwesomeIcon icon={collapsed ? faBars : faChevronLeft} />
            </button>
            <span className="sidebar-title">Fruits & Veg CRM</span>
          </div> */}
        <ul className="sidebar-links">
          <li>
            <a className="active" onClick={() => navigate('/')}
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
              {cart && cart.length > 0 && (
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
              <div className="icon-wrapper icon-noft ">
                <img className='icon-header' src={notificationicon} />
              </div>
              <div className="icon-wrapper">
              <div className="icon-wrapper" style={{position: 'relative', cursor: 'pointer'}} onClick={() => navigate('/cart')}>
                <img className='icon-header' src={cartheadericon} />
                {/* {cartCount > 0 && (
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
                  }}>{cartCount}</span>
                )} */}
                {cart && cart.length > 0 && (
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
              </div>
              {/* <div className="icon-wrapper language-icon  icon-noft " onClick={handleLanguageClick} style={{position: 'relative', fontSize: '1.1rem', padding: 0, background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
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
              </div> */}
              <div className="icon-wrapper icon-noft ">
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
          {/* Page Content */}
          <div className="dashboard-page-content">
            {/* Slideshow */}
            <div className="dashboard-slideshow new-slideshow-design"
              onMouseEnter={() => setIsSlideHovered(true)}
              onMouseLeave={() => setIsSlideHovered(false)}
             
            >
              <div className="slide-nav-top" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '12px'}}>
                <button className="slide-arrow new-top-arrow left" onClick={prevSlide} style={{marginRight: '18px'}}>
                  <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <div className="slide-dots new-top-dots" style={{display: 'flex', gap: '10px'}}>
                  {slides.map((_, idx) => (
                    <span key={idx} className={idx === slideIdx ? 'dot active' : 'dot'} onClick={() => goToSlide(idx)}></span>
                  ))}
                </div>
                <button className="slide-arrow new-top-arrow right" onClick={nextSlide} style={{marginLeft: '18px'}}>
                  <FontAwesomeIcon icon={faCaretRight} />
                </button>
              </div>
              <div className="slide-img-overlay-wrap">
                <div  onClick={() => navigate(`/products?category=${encodeURIComponent(slides[slideIdx].link)}`)}  className="slide-img-hover-group" style={{position:'relative', width:'100%', height:'100%', cursor:'pointer'}}>
                  <img
                    src={slides[slideIdx].img}
                    alt={slides[slideIdx].title}
                    className="slide-img new-top-slide-img"
                    style={{cursor:'pointer'}}
                    onClick={() => navigate(`/products?category=${encodeURIComponent(slides[slideIdx].link)}`)}
                  />
                  {/* <button
                    className="slide-img-go-btn"
                   
                    style={{position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', zIndex:3, display:'none'}}
                  >Go to {slides[slideIdx].title}</button> */}
                  <div className="slide-img-overlay" />
                  <div className="slide-content new-top-slide-content overlay-content">
                    <h3 className='h-tag-detail' >{slides[slideIdx].title}</h3>
                    <p className='p-tag-detail' >{slides[slideIdx].desc}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Shop by Category */}
            <div
              className="quick-categories-section category-slider-hover-area"
              style={{position: 'relative', width: '100%'}}
              onMouseEnter={() => setShowCategoryArrows(true)}
              onMouseLeave={() => setShowCategoryArrows(false)}
            >
              <h3 className="quick-categories-header">Shop by Category</h3>
              {showCategoryArrows && (
                <button
                  className="category-arrow left"
                  onClick={prevCategorySlide}
                  disabled={categoryStartIdx === 0}
                  style={{position: 'absolute', left: 0, top: '60%', transform: 'translateY(-50%)', zIndex: 2}}
                ><FontAwesomeIcon icon={faCaretLeft} /></button>
              )}
              <div className="quick-categories-row" style={{width: '100%', margin: 0, justifyContent: 'center'}}>
                {categoryImages.slice(categoryStartIdx, categoryStartIdx + visibleCategoryCount).map(cat => (
                  <div
                    className={`quick-category-card ${cat.className}`}
                    key={cat.label}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/products?category=${encodeURIComponent(cat.label)}`)}
                  >
                    <img src={cat.img} alt={cat.label} className="quick-category-img" />
                    <span>{cat.label}</span>
                  </div>
                ))}
              </div>
              {showCategoryArrows && (
                <button
                  className="category-arrow right"
                  onClick={nextCategorySlide}
                  disabled={categoryStartIdx + visibleCategoryCount >= (categoryImages ? categoryImages.length : 0)}
                  style={{position: 'absolute', right: 0, top: '60%', transform: 'translateY(-50%)', zIndex: 2}}
                ><FontAwesomeIcon icon={faCaretRight} /></button>
              )}
            </div>
            {/* Cards Sections */}
            {/* Hot Deals (full width) */}
            <div className="dashboard-cards-section">
              <h3 className="cards-section-header">{cardSections[0].header}</h3>
              <div className="dashboard-cards-row">
                {cardSections[0].cards.map((card, cidx) => {
                  // Make Mango Mania, Grocerys, Vegetables, Fruits clickable
                  const clickable = ['Mango Mania', 'Grocerys', 'Vegetables', 'Fruits'].includes(card.title);
                  return (
                    <div
                      className="dashboard-card"
                      key={cidx}
                      style={clickable ? { cursor: 'pointer', border: '2px solid #43cea2' } : {}}
                      onClick={clickable ? () => handleCardClick(card.title === 'Grocerys' ? 'All' : card.title) : undefined}
                    >
                      <div className="card-img-wrap">
                        <img src={card.img} alt={card.title} className="card-img" />
                        <span className="card-badge">{card.badge}</span>
                      </div>
                      <div className="card-content">
                        <h4>{card.title}</h4>
                        <p>{card.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Electronics & Home & Decor side by side */}
            <div className="cards-sections-row">
              {[cardSections[1], cardSections[2]].map((section, idx) => (
                <div key={idx} className="dashboard-cards-section">
                  <h3 className="cards-section-header">{section.header}</h3>
                  <div className="dashboard-cards-row">
                    {section.cards.map((card, cidx) => {
                      // Make Smartphone Sale, Headphones Bonanza, Kitchen Essentials, Home Decor clickable
                      const clickable = [
                        'Smartphone Sale',
                        'Headphones Bonanza',
                        'Kitchen Essentials',
                        'Home Decor',
                      ].includes(card.title);
                      return (
                        <div
                          className="dashboard-card"
                          key={cidx}
                          style={clickable ? { cursor: 'pointer', border: '2px solid #43cea2' } : {}}
                          onClick={clickable ? () => handleCardClick(card.title === 'Smartphone Sale' || card.title === 'Headphones Bonanza' ? 'Electronics' : 'Home') : undefined}
                        >
                          <div className="card-img-wrap">
                            <img src={card.img} alt={card.title} className="card-img" />
                            <span className="card-badge">{card.badge}</span>
                          </div>
                          <div className="card-content">
                            <h4>{card.title}</h4>
                            <p>{card.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* New Arrivals & Shop by Category side by side */}
            <div className="cards-sections-row">
              {/* New Arrivals */}
              {/* <div className="dashboard-cards-section">
                <h3 className="cards-section-header">{cardSections[3].header}</h3>
                <div className="dashboard-cards-row">
                  {cardSections[3].cards.map((card, cidx) => (
                    <div className="dashboard-card" key={cidx}>
                      <div className="card-img-wrap">
                        <img src={card.img} alt={card.title} className="card-img" />
                        <span className="card-badge">{card.badge}</span>
                      </div>
                      <div className="card-content">
                        <h4>{card.title}</h4>
                        <p>{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
              {/* Shop by Category */}
              {/* <div className="quick-categories-section">
                <h3 className="quick-categories-header">Shop by Category</h3>
                <div className="quick-categories-row">
                  {categoryImages.map(cat => (
                    <div className={`quick-category-card ${cat.className}`} key={cat.label}>
                      <img src={cat.img} alt={cat.label} className="quick-category-img" />
                      <span>{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* --- New Section: Why Shop With Us --- */}
            <div className="why-shop-section">
              <h3 className="section-header">Why Shop With Us?</h3>
              <div className="why-shop-row">
                {whyShop.map((item, idx) => (
                  <div className="why-shop-card" key={idx} onClick={() => setWhyShopModal(item.key)} style={{cursor:'pointer'}}>
                    <FontAwesomeIcon icon={item.icon} className="why-shop-icon" />
                    <div className="why-shop-title">{item.title}</div>
                    <div className="why-shop-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Why Shop Modal */}
            {whyShopModal && (
              <div className="modal-overlay" onClick={() => setWhyShopModal(null)}>
                <div className="modal-content" onClick={e => e.stopPropagation()} style={{position:'relative'}}>
                  <button className="whyshop-close-btn" onClick={() => setWhyShopModal(null)} >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <div style={{marginTop:10}}>
                    {getWhyShopModalContent(whyShopModal)}
                  </div>
                </div>
              </div>
            )}
            {/* --- New Section: Newsletter Signup --- */}
            <div className="newsletter-section">
              <h3 className="section-header">Stay Updated!</h3>
              <div className="newsletter-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button className="newsletter-btn" onClick={() => { setNewsletterModal(true); setNewsletterSuccess(false); }}>Subscribe</button>
              </div>
            </div>
            {/* Newsletter Modal */}
            {newsletterModal && (
              <div className="modal-overlay" onClick={() => setNewsletterModal(false)}>
                <div className="modal-content newsletter-modal-animated" onClick={e => e.stopPropagation()} style={{position:'relative'}}>
                  <button className="newsletter-close-btn" onClick={() => setNewsletterModal(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  {!newsletterSuccess ? (
                    <>
                      <h4>Subscribe to our Newsletter</h4>
                      <p>Get the latest updates, offers, and more!</p>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={newsletterEmail}
                        onChange={e => setNewsletterEmail(e.target.value)}
                        className="newsletter-input"
                      />
                      <button className="newsletter-btn letter-btn-ne" onClick={() => setNewsletterSuccess(true)}>Subscribe</button>
                    </>
                  ) : (
                    <>
                      <h4>Thank you for subscribing!</h4>
                      <p>You will now receive our latest news and offers.</p>
                    </>
                  )}
                  {/* Remove the old close button */}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <span>© {new Date().getFullYear()} Fruits & Vegetables CRM. All rights reserved.</span>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Dashboard;