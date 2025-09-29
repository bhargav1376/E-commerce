import React, { useState, useEffect } from 'react';
import './Settings.css';
import '../Index/Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/Bhargav-logo.png';
import notificationicon from '../Images/notifications-png.png';
import cartheadericon from '../Images/cart-header-png.png';
import tagicon from '../Images/tag-png.png';
import usericon from '../Images/user-ico.png';
import settingicon from '../Images/settings-ico.png';
import logouticon from '../Images/logout-ico.png';
import Homeicon from '../Images/Home-png.png';
import producticon from '../Images/Product-png.png';
import ordersicon from '../Images/order-png.webp';
import wishlisticon from '../Images/wishlist-ico.png';
import carticon from '../Images/cart-png.png';
import offericon from '../Images/offers-png.png';
import supporticon from '../Images/support-png.png';

const Settings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [activeTab, setActiveTab] = useState('preferences');
  const [preferences, setPreferences] = useState({
    theme: 'system',
    language: 'en',
    notifications: {
      orderUpdates: true,
      offers: true,
      newsletter: false
    }
  });
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal: '',
    country: 'IN'
  });
  const [payment, setPayment] = useState({
    upi: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const updateProfile = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const updatePref = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const updateNotif = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [headerImage, setHeaderImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [displayName, setDisplayName] = useState('Bhargav');
  const [collapsed, setCollapsed] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem('profile'));
      if (p) {
        setDisplayName(p.firstName || displayName);
        setHeaderImage(p.image || headerImage);
        setProfile({
          name: `${p.firstName || ''} ${p.lastName || ''}`.trim(),
          email: p.email || '',
          phone: p.phone || ''
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const updateCart = () => {
      try {
        const stored = localStorage.getItem('cart');
        const parsed = stored ? JSON.parse(stored) : [];
        setCart(Array.isArray(parsed) ? parsed : []);
      } catch { setCart([]); }
    };
    window.addEventListener('storage', updateCart);
    const interval = setInterval(updateCart, 1000);
    return () => { window.removeEventListener('storage', updateCart); clearInterval(interval); };
  }, []);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Replace with API call if needed
    setShowSuccess(true);
  };
  const languageFlagImages = {
    EN: 'https://flagcdn.com/us.svg',
    FR: 'https://flagcdn.com/fr.svg',
    ES: 'https://flagcdn.com/es.svg',
  };
  const handleLanguageClick = () => {
    setLanguageDropdown(l => !l);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setLanguageDropdown(false);
  };

  return (
    <div className={`dashboard-container${collapsed ? ' collapsed' : ''}`}>
      {/* Sidebar (same links as Dashboard) */}
      <aside className="sidebar">
        <ul className="sidebar-links">
          <li>
            <a className="activ" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#dc2626' }}>
                <img className='icon-pngs' src={Homeicon} />
              </span>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#059669' }}>
                <img className='icon-pngs' src={producticon} />
              </span>
              <span>Products</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/orders')} style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#1d4ed8' }}>
                <img className='icon-pngs' src={ordersicon} />
              </span>
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/wishlist')} style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#f59e42' }}>
                <img className='icon-pngs' src={wishlisticon} />
              </span>
              <span>Wishlist</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/cart')} style={{ cursor: 'pointer', position: 'relative' }}>
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
            <a className="activ" onClick={() => navigate('/offers')} style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#10b981' }}>
                <img className='icon-pngs' src={offericon} />
              </span>
              <span>Offers</span>
            </a>
          </li>
          <li>
            <a className="activ" onClick={() => navigate('/support')} style={{ cursor: 'pointer' }}>
              <span className="nld-sidebar-link-icon" style={{ color: '#3b82f6' }}>
                <img className='icon-pngs' src={supporticon} />
              </span>
              <span>Support</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content with header */}
      <div className="main-content">
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
              }}>{cart.length}</span>
            )}
          </div>
          <div className="icon-wrapper language-icon icon-noft" onClick={handleLanguageClick} style={{position: 'relative', fontSize: '1.1rem', padding: 0, background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
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
          <div className="user-info" onClick={() => setDropdownOpen(d=>!d)} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px'}}>
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
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-tabs">
          {/* Removed Profile tab per request */}
          <button className={`settings-tab-btn ${activeTab==='preferences'?'active':''}`} onClick={()=>setActiveTab('preferences')}>Preferences</button>
          <button className={`settings-tab-btn ${activeTab==='notifications'?'active':''}`} onClick={()=>setActiveTab('notifications')}>Notifications</button>
          <button className={`settings-tab-btn ${activeTab==='security'?'active':''}`} onClick={()=>setActiveTab('security')}>Security</button>
          <button className={`settings-tab-btn ${activeTab==='address'?'active':''}`} onClick={()=>setActiveTab('address')}>Address</button>
          <button className={`settings-tab-btn ${activeTab==='payment'?'active':''}`} onClick={()=>setActiveTab('payment')}>Payment</button>
          <button className={`settings-tab-btn ${activeTab==='privacy'?'active':''}`} onClick={()=>setActiveTab('privacy')}>Privacy</button>
          <button className={`settings-tab-btn ${activeTab==='linked'?'active':''}`} onClick={()=>setActiveTab('linked')}>Linked Accounts</button>
        </div>

        <form className="settings-grid" onSubmit={handleSave}>
          {activeTab==='preferences' && (
          <section className="settings-card">
            <h2 className="settings-section-title">Preferences</h2>
            <div className="form-row">
              <label>Theme</label>
              <select
                value={preferences.theme}
                onChange={(e) => updatePref('theme', e.target.value)}
              >
                <option value="system">System</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="form-row">
              <label>Language</label>
              <select
                value={preferences.language}
                onChange={(e) => updatePref('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
              </select>
            </div>
            <div className="form-row">
              <label>Privacy Level</label>
              <select>
                <option value="standard">Standard</option>
                <option value="strict">Strict</option>
              </select>
            </div>
          </section>
          )}

          {activeTab==='notifications' && (
          <section className="settings-card">
            <h2 className="settings-section-title">Notifications</h2>
            <div className="toggle-row">
              <label htmlFor="notif-order">Order updates</label>
              <input
                id="notif-order"
                type="checkbox"
                checked={preferences.notifications.orderUpdates}
                onChange={(e) => updateNotif('orderUpdates', e.target.checked)}
              />
            </div>
            <div className="toggle-row">
              <label htmlFor="notif-offers">Offers and promotions</label>
              <input
                id="notif-offers"
                type="checkbox"
                checked={preferences.notifications.offers}
                onChange={(e) => updateNotif('offers', e.target.checked)}
              />
            </div>
            <div className="toggle-row">
              <label htmlFor="notif-news">Newsletter</label>
              <input
                id="notif-news"
                type="checkbox"
                checked={preferences.notifications.newsletter}
                onChange={(e) => updateNotif('newsletter', e.target.checked)}
              />
            </div>
          </section>
          )}

          {activeTab==='security' && (
          <section className="settings-card">
            <h2 className="settings-section-title">Security</h2>
            <div className="form-row">
              <label>New Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className="form-row">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <div className="settings-actions" style={{justifyContent:'flex-start'}}>
              <button type="button" className="settings-save-btn" onClick={()=>setShowSecurityModal(true)}>Open Security Modal</button>
            </div>
          </section>
          )}


          {activeTab==='address' && (
          <section className="settings-card">
            <h2 className="settings-section-title">Address</h2>
            <div className="form-row"><label>Address Line 1</label><input value={address.line1} onChange={e=>setAddress(a=>({...a,line1:e.target.value}))} placeholder="House / Flat / Street" /></div>
            <div className="form-row"><label>Address Line 2</label><input value={address.line2} onChange={e=>setAddress(a=>({...a,line2:e.target.value}))} placeholder="Area / Landmark" /></div>
            <div className="form-row"><label>City</label><input value={address.city} onChange={e=>setAddress(a=>({...a,city:e.target.value}))} /></div>
            <div className="form-row"><label>State</label><input value={address.state} onChange={e=>setAddress(a=>({...a,state:e.target.value}))} /></div>
            <div className="form-row"><label>Postal Code</label><input value={address.postal} onChange={e=>setAddress(a=>({...a,postal:e.target.value}))} /></div>
            <div className="form-row"><label>Country</label><input value={address.country} onChange={e=>setAddress(a=>({...a,country:e.target.value}))} /></div>
            <div className="settings-actions" style={{justifyContent:'flex-start'}}>
              <button type="button" className="settings-save-btn" onClick={()=>setShowAddressModal(true)}>Open Address Modal</button>
            </div>
          </section>
          )}

          {activeTab==='payment' && (
          <section className="settings-card">
            <h2 className="settings-section-title">Payment</h2>
            <div className="form-row"><label>UPI ID</label><input value={payment.upi} onChange={e=>setPayment(p=>({...p,upi:e.target.value}))} placeholder="username@upi" /></div>
            <div className="form-row"><label>Name on Card</label><input value={payment.cardName} onChange={e=>setPayment(p=>({...p,cardName:e.target.value}))} /></div>
            <div className="form-row"><label>Card Number</label><input value={payment.cardNumber} onChange={e=>setPayment(p=>({...p,cardNumber:e.target.value}))} placeholder="1234 5678 9012 3456" /></div>
            <div className="form-row"><label>Expiry</label><input value={payment.expiry} onChange={e=>setPayment(p=>({...p,expiry:e.target.value}))} placeholder="MM/YY" /></div>
            <div className="form-row"><label>CVV</label><input value={payment.cvv} onChange={e=>setPayment(p=>({...p,cvv:e.target.value}))} placeholder="***" /></div>
            <div className="settings-actions" style={{justifyContent:'flex-start'}}>
              <button type="button" className="settings-save-btn" onClick={()=>setShowPaymentModal(true)}>Open Payment Modal</button>
            </div>
          </section>
          )}

          {activeTab==='privacy' && (
          <section className="settings-card">
            <h2 className="settings-section-title">Privacy</h2>
            <div className="toggle-row"><label>Share purchase history for offers</label><input type="checkbox" /></div>
            <div className="toggle-row"><label>Personalized recommendations</label><input type="checkbox" defaultChecked /></div>
            <div className="toggle-row"><label>Make profile discoverable</label><input type="checkbox" /></div>
          </section>
          )}

          {activeTab==='linked' && (
          <section className="settings-card">
            <h2 className="settings-section-title">Linked Accounts</h2>
            <div className="form-row"><label>Google</label><button type="button" className="settings-save-btn">Connect</button></div>
            <div className="form-row"><label>Facebook</label><button type="button" className="settings-save-btn">Connect</button></div>
            <div className="form-row"><label>Apple</label><button type="button" className="settings-save-btn">Connect</button></div>
          </section>
          )}

          <div className="settings-actions">
            <button type="submit" className="settings-save-btn">Save Changes</button>
          </div>
        </form>
      </div>
      {showSuccess && (
        <div className="custom-modal-overlay" onClick={()=>setShowSuccess(false)}>
          <div className="payment-success-modal" onClick={e=>e.stopPropagation()}>
            <div className="success-icon">✅</div>
            <h2>Settings Saved</h2>
            <p>Your preferences were updated successfully.</p>
            <button className="close-btn" onClick={()=>setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}
      {showSecurityModal && (
        <div className="custom-modal-overlay" onClick={()=>setShowSecurityModal(false)}>
          <div className="payment-success-modal" onClick={e=>e.stopPropagation()}>
            <h2>Security</h2>
            <p>Change your password and manage your security options here.</p>
            <button className="close-btn" onClick={()=>setShowSecurityModal(false)}>Close</button>
          </div>
        </div>
      )}
      {showAddressModal && (
        <div className="custom-modal-overlay" onClick={()=>setShowAddressModal(false)}>
          <div className="payment-success-modal" onClick={e=>e.stopPropagation()}>
            <h2>Address</h2>
            <p>Manage your default shipping address here.</p>
            <button className="close-btn" onClick={()=>setShowAddressModal(false)}>Close</button>
          </div>
        </div>
      )}
      {showPaymentModal && (
        <div className="custom-modal-overlay" onClick={()=>setShowPaymentModal(false)}>
          <div className="payment-success-modal" onClick={e=>e.stopPropagation()}>
            <h2>Payment</h2>
            <p>Manage saved UPI and cards securely.</p>
            <button className="close-btn" onClick={()=>setShowPaymentModal(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Settings;


