import React, { useState, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faUser, faFingerprint, faChevronUp, faTimes, faStar, faShieldAlt, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
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
import logo from '../Images/Bhargav-logo.png';
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

function Profile() {
  // Tab state
  const [activeTab, setActiveTab] = useState('account');

  // Security info for tab
  const securityInfo = [
    { icon: faShieldAlt, label: 'Account Protection', value: 'Strong', color: '#10b981' },
    { icon: faLock, label: 'Password Strength', value: 'Very Strong', color: '#2563eb' },
    { icon: faKey, label: '2FA Enabled', value: 'Yes', color: '#f59e42' },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [cartCount, setCartCount] = useState(() => {
    const stored = localStorage.getItem('cart');
    if (!stored) return 0;
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.reduce((sum, item) => sum + (item.qty || 0), 0) : 0;
    } catch {
      return 0;
    }
  });
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('profile');
    return saved ? JSON.parse(saved) : {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      address: '',
      pin: '',
      state: '',
      image: user.image,
    };
  });
  // Handle image upload
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = ev => {
        setProfile(prev => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Show name and image in header, fallback to user.name and user.image, update only after Update
  const [displayName, setDisplayName] = useState(() => profile.firstName || user.name);
  const [headerImage, setHeaderImage] = useState(() => profile.image || user.image);

  // Validation state
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(null);
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
  // Validate inputs
  const validate = () => {
    const newErrors = {};
    if (!profile.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!profile.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!profile.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(profile.email)) newErrors.email = 'Invalid email';
    if (!profile.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(profile.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!profile.gender) newErrors.gender = 'Gender is required';
    if (!profile.address.trim()) newErrors.address = 'Address is required';
    if (!profile.pin.trim()) newErrors.pin = 'Pin code is required';
    else if (!/^\d{6}$/.test(profile.pin)) newErrors.pin = 'Pin code must be 6 digits';
    if (!profile.state) newErrors.state = 'State is required';
    return newErrors;
  };

  const handleUpdate = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('profile', JSON.stringify(profile));
      setDisplayName(profile.firstName || user.name);
      setHeaderImage(profile.image || user.image);
    }
  };

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
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

  return (
    <div className={`dashboard-container${collapsed ? ' collapsed' : ''}`}> 
      {/* Sidebar */}
      <aside className="sidebar">
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
                        <span className="sidebar-cart-badge">{cart && cart.length}</span>
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
      {/* Header Only */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <img src={logo} alt="Logo" className="header-logo" />
            <button className="header-bars-btn" onClick={() => setCollapsed(c => !c)}>
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
            <div className="icon-wrapper icon-noft ">
              <img className='icon-header' src={notificationicon} />
            </div>
            <div className="icon-wrapper" style={{position: 'relative', cursor: 'pointer'}} onClick={() => navigate('/cart')}>
              <img className='icon-header' src={cartheadericon} />
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
                  }}>{cart && cart.length}</span>
                )}
            </div>
            <div className="icon-wrapper language-icon icon-noft " onClick={handleLanguageClick} style={{position: 'relative', fontSize: '1.1rem', padding: 0, background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
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

        <div className="dashboard-content">
          <div className="profile-main-tabs">
            <div className="profile-tabs-left">
              <button className={`profile-tab-btn${activeTab === 'account' ? ' active' : ''}`} onClick={() => setActiveTab('account')}>
                <FontAwesomeIcon icon={faUser} style={{marginRight:'10px', fontSize:'1.1em', verticalAlign:'middle'}} />
                Account Details
              </button>
              <button className={`profile-tab-btn${activeTab === 'security' ? ' active' : ''}`} onClick={() => setActiveTab('security')}>
                <FontAwesomeIcon icon={faShieldAlt} style={{marginRight:'10px', fontSize:'1.1em', verticalAlign:'middle' }} />
                Security
              </button>
              </div>
            <div className="profile-tab-content">
              {activeTab === 'account' ? (
                <div className="profile-card-content">
                  <form className="profile-form" onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
                    <div className="profile-image-section">
                      <div style={{position:'relative', display:'inline-block'}}>
                        <img src={profile.image || user.image} alt="User" className="profile-image" />
                        <label htmlFor="profile-image-upload" className="profile-image-upload">
                          <span style={{fontSize:22, color:'#fff', fontWeight:700, marginTop:'-5px'}}>+</span>
                          <input id="profile-image-upload" type="file" accept="image/*" style={{display:'none'}} onChange={handleImageChange} />
                        </label>
                      </div>
                    </div>
                    <div className="profile-fields">
                      <div className="profile-row">
                        <div className="profile-field">
                          <label>First Name</label>
                          <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First Name" />
                          {errors.firstName && <span className="profile-error">{errors.firstName}</span>}
                        </div>
                        <div className="profile-field">
                          <label>Last Name</label>
                          <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last Name" />
                          {errors.lastName && <span className="profile-error">{errors.lastName}</span>}
                        </div>
                      </div>
                      <div className="profile-row">
                        <div className="profile-field">
                          <label>Email</label>
                          <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
                          {errors.email && <span className="profile-error">{errors.email}</span>}
                        </div>
                        <div className="profile-field">
                          <label>Phone</label>
                          <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
                          {errors.phone && <span className="profile-error">{errors.phone}</span>}
                        </div>
                      </div>
                      <div className="profile-row">
                        <div className="profile-field">
                          <label>Gender</label>
                          <select name="gender" value={profile.gender} onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.gender && <span className="profile-error">{errors.gender}</span>}
                        </div>
                        <div className="profile-field">
                          <label>Address</label>
                          <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
                          {errors.address && <span className="profile-error">{errors.address}</span>}
                        </div>
                      </div>
                      <div className="profile-row">
                        <div className="profile-field">
                          <label>Pin Code</label>
                          <input type="text" name="pin" value={profile.pin} onChange={handleChange} placeholder="Pin Code" />
                          {errors.pin && <span className="profile-error">{errors.pin}</span>}
                        </div>
                        <div className="profile-field">
                          <label>State</label>
                          <select name="state" value={profile.state} onChange={handleChange}>
                            <option value="">Select State</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                          </select>
                          {errors.state && <span className="profile-error">{errors.state}</span>}
                        </div>
                      </div>
                      <div className="profile-update-row">
                        <button type="submit" className="profile-update-btn">
                          <span className="profile-update-icon">&#x21bb;</span> Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="profile-security-tab-content">
                  <h3 className='class-name-m' >
                    <FontAwesomeIcon icon={faFingerprint} className='security-title-icon' style={{marginRight:'10px', color:'#8b5cf6', fontSize:'1.3em', verticalAlign:'middle'}} />
                    Security Overview
                  </h3>
                  <div className='flex-main-cs' >
                    {securityInfo.map((sec, idx) => (
                      <div key={sec.label} className='flex-cs' >
                        <FontAwesomeIcon icon={sec.icon} className='icon-d-ui' style={{fontSize:'2.8em', color:sec.color, marginBottom:'10px'}} />
                        <span className=' label-span '>{sec.label}</span>
                        <span className='label-values'  style={{color:sec.color}}>{sec.value}</span>
                        <p className='label-description-p' >
                          {sec.label === 'Account Protection' && 'Your account is protected with advanced security measures, including encrypted data and regular security audits.'}
                          {sec.label === 'Password Strength' && 'Your password is very strong. We recommend updating it regularly and never sharing it with anyone.'}
                          {sec.label === '2FA Enabled' && 'Two-factor authentication is enabled, adding an extra layer of security to your account.'}
                        </p>
                        <button className='label-button-vi-b' style={{ background: sec.color}} onClick={() => setModalOpen(idx)}>View Details</button>
                      </div>
                    ))}
                  </div>
                  {modalOpen !== null && (
                    <div className="security-modal-overlay" >
                      <div className="security-modal" >
                        <button className='close-modal-btn-c'  onClick={() => setModalOpen(null)}>&times;</button>
                       <div className='security-modal-content'>
                         <FontAwesomeIcon icon={securityInfo[modalOpen].icon} className='modal-icon-d' style={{color:securityInfo[modalOpen].color, }} />
                        </div>

                        <h2 className='name-info-s' >{securityInfo[modalOpen].label}</h2>
                        <span style={{fontWeight:500, color:securityInfo[modalOpen].color, fontSize:'1.1em'}}>{securityInfo[modalOpen].value}</span>
                        <div style={{marginTop:'18px', fontSize:'1em', color:'#444'}}>
                          {securityInfo[modalOpen].label === 'Account Protection' && (
                            <>
                              <p>Your account uses encrypted storage and secure authentication protocols. We regularly audit our systems to ensure your data is safe.</p>
                              <ul style={{margin:'10px 0 0 18px'}}>
                                <li>Encrypted data at rest and in transit</li>
                                <li>Regular security audits</li>
                                <li>Suspicious activity monitoring</li>
                                <li>Automatic logout after inactivity</li>
                              </ul>
                            </>
                          )}
                          {securityInfo[modalOpen].label === 'Password Strength' && (
                            <>
                              <p>Your password meets all recommended criteria for length and complexity.</p>
                              <ul style={{margin:'10px 0 0 18px'}}>
                                <li>Minimum 8 characters</li>
                                <li>Includes uppercase, lowercase, numbers, and symbols</li>
                                <li>No known breaches</li>
                                <li>Change password regularly for best security</li>
                              </ul>
                            </>
                          )}
                          {securityInfo[modalOpen].label === '2FA Enabled' && (
                            <>
                              <p>Two-factor authentication (2FA) is active on your account.</p>
                              <ul style={{margin:'10px 0 0 18px'}}>
                                <li>Login requires both password and OTP</li>
                                <li>OTP sent via SMS or authenticator app</li>
                                <li>Prevents unauthorized access</li>
                                <li>Can be managed in account settings</li>
                              </ul>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
