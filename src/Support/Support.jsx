import React, { useState, useEffect, useRef } from 'react';
import '../Index/Dashboard.css';
import './Support.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp, faTimes, faStar, faInfoCircle, faEnvelope, faHeadset, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../Images/unnamed.png';
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

const user = {
  name: 'Bhargav',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const languageFlagImages = {
  EN: 'https://flagcdn.com/us.svg',
  FR: 'https://flagcdn.com/fr.svg',
  ES: 'https://flagcdn.com/es.svg',
};

const helpTopics = [
  'Orders',
  'Products',
  'Delivery',
  'Returns',
  'Account',
  'Offers',
  'Technical',
];

const faqs = [
  {
    topic: 'Orders',
    qas: [
      { q: 'How do I track my order?', a: 'Go to Orders > Track Order. You will see the current status and expected delivery date.' },
      { q: 'Can I cancel my order?', a: 'Yes, you can cancel your order before it is shipped from the Orders page.' },
    ]
  },
  {
    topic: 'Products',
    qas: [
      { q: 'Are your fruits and vegetables organic?', a: 'We offer both organic and conventional produce. Check the product label for details.' },
      { q: 'How do I know if a product is in stock?', a: 'All available products are listed on the Products page. Out-of-stock items are marked accordingly.' },
    ]
  },
  {
    topic: 'Delivery',
    qas: [
      { q: 'What are your delivery hours?', a: 'We deliver daily from 8am to 8pm. You can select your preferred slot at checkout.' },
      { q: 'Can I change my delivery address?', a: 'Yes, you can update your address in your Account settings before placing an order.' },
    ]
  },
  {
    topic: 'Returns',
    qas: [
      { q: 'How do I return a product?', a: 'Go to Orders > Return Item and follow the instructions. Returns are accepted within 3 days of delivery.' },
      { q: 'When will I get my refund?', a: 'Refunds are processed within 5-7 business days after the returned item is received.' },
    ]
  },
  {
    topic: 'Account',
    qas: [
      { q: 'How do I reset my password?', a: 'Go to Account > Security and click on Reset Password.' },
      { q: 'How do I update my contact information?', a: 'You can update your phone number and email in Account > Profile.' },
    ]
  },
  {
    topic: 'Offers',
    qas: [
      { q: 'How do I use a promo code?', a: 'Enter your promo code at checkout in the Offers section.' },
      { q: 'Where can I find current offers?', a: 'Visit the Offers page for all active deals and discounts.' },
    ]
  },
  {
    topic: 'Technical',
    qas: [
      { q: 'The website is not loading. What should I do?', a: 'Try refreshing the page or clearing your browser cache. If the issue persists, contact support.' },
      { q: 'How do I report a bug?', a: 'Use the Contact Us form and select Technical as the subject.' },
    ]
  },
];

const contactDetails = {
  phone: '+1 234 567 890',
  email: 'support@fruitsveggies.com',
  whatsapp: '+1 234 567 891',
  hours: 'Mon-Sat: 8am - 8pm',
  address: '123 Fresh Lane, Green City, Country',
};

function Support() {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeHelpTopic, setActiveHelpTopic] = useState('Orders');
  const [faqOpen, setFaqOpen] = useState({});
  const [ticketId, setTicketId] = useState('');
  const [ticketStatus, setTicketStatus] = useState(null);
  const [feedbackStars, setFeedbackStars] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Orders', message: '' });
  const [contactFormStatus, setContactFormStatus] = useState(null);
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

  // Sidebar/Header logic
  const handleUserDropdown = () => setDropdownOpen(d => !d);
  const handleLanguageClick = () => setLanguageDropdown(l => !l);
  const handleLanguageSelect = (lang) => { setLanguage(lang); setLanguageDropdown(false); };

  // Help Topics
  const handleHelpTopic = (topic) => setActiveHelpTopic(topic);

  // FAQ Accordion
  const handleFaqToggle = (topicIdx, qIdx) => {
    setFaqOpen(prev => ({ ...prev, [`${topicIdx}-${qIdx}`]: !prev[`${topicIdx}-${qIdx}`] }));
  };

  // Ticket Status (simulate)
  const handleCheckTicket = (e) => {
    e.preventDefault();
    if (!ticketId) return setTicketStatus('Please enter a Ticket ID.');
    // Simulate status
    const statuses = ['In Progress', 'Resolved', 'Waiting for Customer', 'Closed'];
    setTicketStatus('Status: ' + statuses[Math.floor(Math.random() * statuses.length)]);
    setShowTicketStatusModal(true);
  };

  // Contact Form
  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactFormStatus('Submitting...');
    setTimeout(() => setContactFormStatus('Your request has been submitted!'), 1200);
  };

  // Feedback
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setShowFeedback(false);
    setFeedbackStars(0);
    setFeedbackText('');
    alert('Thank you for your feedback!');
  };

  // Live Chat (UI only)
  const [chatMessages, setChatMessages] = useState([
    { from: 'support', text: 'Hi! How can we help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  // Add state for live chat error popup and shake
  const [chatError, setChatError] = useState(false);
  const [chatShake, setChatShake] = useState(false);
  // Live Chat Dropdowns and Modal State
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showOfficeHours, setShowOfficeHours] = useState(false);
  const [showContactFAQ, setShowContactFAQ] = useState(false);
  // Add ref for live chat messages
  const chatMessagesEndRef = useRef(null);

  // Enhanced ChatGPT-style support replies
  const chatGptReplies = [
    {
      keywords: ['order', 'track'],
      reply: 'To track your order, go to the Orders page and click on the order you wish to track. You will see the current status and expected delivery date. If you need more help, let me know!'
    },
    {
      keywords: ['refund', 'return'],
      reply: 'Refunds are processed within 5-7 business days after we receive your returned item. If you have not received your refund, please contact us with your order ID.'
    },
    {
      keywords: ['not loading', 'website'],
      reply: 'If the website is not loading, try refreshing the page or clearing your browser cache. If the issue persists, please let us know your browser and device details.'
    },
    {
      keywords: ['promo', 'offer', 'discount'],
      reply: 'You can find all current offers on the Offers page. To use a promo code, enter it at checkout. If you have trouble applying a code, please share the code with us.'
    },
    {
      keywords: ['password', 'reset'],
      reply: 'To reset your password, go to Account > Security and click on Reset Password. If you need further assistance, we can send you a password reset link.'
    },
    {
      keywords: ['hello', 'hi', 'hey'],
      reply: 'Hello! 👋 How can I assist you today?'
    },
    {
      keywords: [],
      reply: 'Thank you for your message. Our team will reply soon. If you have more details, please share them!'
    }
  ];

  // Enhanced handleSendChat for ChatGPT-like replies with error validation
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) {
      setChatError(true);
      setChatShake(true);
      setTimeout(() => setChatError(false), 2000);
      setTimeout(() => setChatShake(false), 400);
      return;
    }
    setChatMessages([...chatMessages, { from: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      // Find a matching reply
      const lower = chatInput.toLowerCase();
      const found = chatGptReplies.find(r => r.keywords.some(k => lower.includes(k)));
      setChatMessages(msgs => [
        ...msgs,
        { from: 'support', text: found ? found.reply : chatGptReplies[chatGptReplies.length-1].reply }
      ]);
    }, 900);
  };

  // Scroll to bottom on new message
  useEffect(() => {
    if (showLiveChat && chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, showLiveChat]);

  // Add state for ticket status modal
  const [showTicketStatusModal, setShowTicketStatusModal] = useState(false);

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
            <a className="active" onClick={() => navigate('/support')}
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
          {/* Support Page Content */}
          <div className="dashboard-page-content">
            <h2 className='sup-cen' >Support Center</h2>
            <div className="support-help-topics-nav">
              {helpTopics.map(topic => (
                <button
                  key={topic}
                  className={`support-help-topic-btn${activeHelpTopic === topic ? ' active' : ''}`}
                  onClick={() => handleHelpTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '32px'}}>
              {/* Left: FAQ & Ticket Status */}
              <div style={{flex: 2, minWidth: 320}}>
                {/* FAQ Section */}
                <div className="support-faq-section">
                  <div className="support-faq-header">Frequently Asked Questions</div>
                  <div className="support-faq-list">
                    {faqs.filter(f => f.topic === activeHelpTopic).map((faq, topicIdx) =>
                      faq.qas.map((qa, qIdx) => (
                        <div className="support-faq-item" key={qIdx}>
                          <button className="support-faq-question" onClick={() => handleFaqToggle(topicIdx, qIdx)}>
                            {qa.q}
                            <FontAwesomeIcon icon={faqOpen[`${topicIdx}-${qIdx}`] ? faChevronUp : faChevronDown} />
                          </button>
                          {faqOpen[`${topicIdx}-${qIdx}`] && (
                            <div className="support-faq-answer">{qa.a}</div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {/* Ticket Status */}
                <div className="support-ticket-status-section">
                  <div className="support-faq-header">Check Support Ticket Status</div>
                  <form className="support-ticket-status-form" onSubmit={handleCheckTicket}>
                    <input
                      type="text"
                      placeholder="Enter Ticket ID"
                      value={ticketId}
                      onChange={e => setTicketId(e.target.value)}
                    />
                    <button type="submit" className="support-help-topic-btn">Check Status</button>
                  </form>
                  {ticketStatus && <div className="support-ticket-status-result">{ticketStatus}</div>}
                </div>
              </div>
              {/* Right: Contact, Details, Feedback, Live Chat */}
              <div style={{flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: '18px'}}>
                {/* Contact Us */}
                <button className="support-help-topic-btn" onClick={() => setShowContactModal(true)}>Contact Support</button>
                {/* Live Chat */}
                <button className="support-help-topic-btn" onClick={() => setShowLiveChat(true)}>Live Chat</button>
                {/* Feedback */}
                <button className="support-help-topic-btn" onClick={() => setShowFeedback(true)}>Give Feedback</button>
                {/* Contact Details */}
                <div className="support-contact-details" >
                  <div>
                    <div><b>Phone:</b> {contactDetails.phone}</div>
                    <div><b>Email:</b> {contactDetails.email}</div>
                    <div><b>WhatsApp:</b> {contactDetails.whatsapp}</div>
                    <div><b>Working Hours:</b> {contactDetails.hours}</div>
                  </div>
                  <button className="support-contact-more" style={{marginLeft: 'auto'}} onClick={() => setShowContactDetails(true)}>More Info</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      {/* Contact Us Modal */}
      {showContactModal && (
        <div className="support-modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="support-modal" onClick={e => e.stopPropagation()}>
            <button className="support-modal-close" onClick={() => setShowContactModal(false)}><FontAwesomeIcon icon={faTimes} /></button>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8}}>
              <FontAwesomeIcon icon={faEnvelope} style={{color: '#228B22', fontSize: 24}} />
              <h3 className='lat-for'  style={{margin: 0}}>Contact Support</h3>
            </div>
            <form className="support-contact-form" onSubmit={handleContactSubmit}>
              <label>Name</label>
              <input name="name" value={contactForm.name} onChange={handleContactChange} required  />
              <label>Email</label>
              <input name="email" type="email" value={contactForm.email} onChange={handleContactChange} required  />
              <label>Subject</label>
              <select name="subject" value={contactForm.subject} onChange={handleContactChange} >
                {helpTopics.map(topic => <option key={topic}>{topic}</option>)}
              </select>
              <label>Message</label>
              <textarea name="message" rows={4} value={contactForm.message} onChange={handleContactChange} required  />
              <button type="submit">Submit</button>
              {contactFormStatus && <div style={{marginTop: 8, color: '#059669'}}>{contactFormStatus}</div>}
            </form>
          </div>
        </div>
      )}
      {/* Live Chat Modal */}
      {showLiveChat && (
        <div className="support-modal-overlay" onClick={() => setShowLiveChat(false)}>
          <div className="support-modal live-chat-modal" onClick={e => e.stopPropagation()}>
            <div className="support-live-chat-header" style={{justifyContent: 'center', position: 'relative'}}>
              <FontAwesomeIcon icon={faHeadset} style={{color: '#fff', fontSize: 22, marginRight: 10}} />
              <span>Live Support</span>
              <button className="support-modal-close" style={{right: 18, top: 14, position: 'absolute'}} onClick={() => setShowLiveChat(false)}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
            {chatError && (
              <div className="support-live-chat-error-popup">Message is required to send.</div>
            )}
            <div className="support-live-chat-messages">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`support-live-chat-bubble ${msg.from}`}
                  style={{ textAlign: msg.from === 'user' ? 'right' : 'left', alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={chatMessagesEndRef} />
            </div>
            <form className={`support-live-chat-input-row${chatShake ? ' shake' : ''}`} onSubmit={handleSendChat}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type your message..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
      {/* Contact Details Modal with dropdowns and new content */}
      {showContactDetails && (
        <div className="support-modal-overlay" onClick={() => setShowContactDetails(false)}>
          <div className="support-modal contact-details-modal" onClick={e => e.stopPropagation()}>
            <button className="support-modal-close" onClick={() => setShowContactDetails(false)}><FontAwesomeIcon icon={faTimes} /></button>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20}}>
              <FontAwesomeIcon icon={faInfoCircle} style={{color: '#228B22', fontSize: 26}} />
              <h3 style={{margin: 0}}>Contact Details</h3>
            </div>
            <div className="support-contact-details-content">
              <div><b>Phone:</b> {contactDetails.phone}</div>
              <div><b>Email:</b> {contactDetails.email}</div>
              <div><b>WhatsApp:</b> {contactDetails.whatsapp}</div>
              <div><b>Working Hours:</b> {contactDetails.hours}</div>
              <div><b>Address:</b> {contactDetails.address}</div>
            </div>
            <div className="support-contact-details-dropdown">
              <div className="support-dropdown">
                <button className="support-dropdown-toggle" onClick={() => setShowSocialLinks(s => !s)}>{showSocialLinks ? 'Hide' : 'Show'} Social Links</button>
                {showSocialLinks && (
                  <div className="support-dropdown-content">
                    <div><b>Facebook:</b> <a href="https://facebook.com/fruitsveggies" target="_blank" rel="noopener noreferrer">facebook.com/fruitsveggies</a></div>
                    <div><b>Twitter:</b> <a href="https://twitter.com/fruitsveggies" target="_blank" rel="noopener noreferrer">@fruitsveggies</a></div>
                    <div><b>Instagram:</b> <a href="https://instagram.com/fruitsveggies" target="_blank" rel="noopener noreferrer">@fruitsveggies</a></div>
                  </div>
                )}
              </div>
              <div className="support-dropdown">
                <button className="support-dropdown-toggle" onClick={() => setShowOfficeHours(s => !s)}>{showOfficeHours ? 'Hide' : 'Show'} Office Hours</button>
                {showOfficeHours && (
                  <div className="support-dropdown-content">
                    <div><b>Monday - Friday:</b> 8am - 8pm</div>
                    <div><b>Saturday:</b> 9am - 6pm</div>
                    <div><b>Sunday:</b> Closed</div>
                  </div>
                )}
              </div>
              <div className="support-dropdown">
                <button className="support-dropdown-toggle" onClick={() => setShowContactFAQ(s => !s)}>{showContactFAQ ? 'Hide' : 'Show'} FAQ</button>
                {showContactFAQ && (
                  <div className="support-dropdown-content">
                    <div><b>How do I contact support?</b> Use the Contact Support button or email us at support@fruitsveggies.com.</div>
                    <div><b>Where is your office located?</b> 123 Fresh Lane, Green City, Country.</div>
                    <div><b>Do you offer 24/7 support?</b> Our support is available Mon-Sat, 8am-8pm.</div>
                  </div>
                )}
              </div>
            </div>
            <div className='location-map-s' >
              <b>Location Map:</b> <span className='spa-map'> Map integration coming soon</span>
            </div>
            <div className='lat-for' >
              For urgent queries, call us or use Live Chat for instant help!
            </div>
          </div>
        </div>
      )}
      {/* Feedback Modal */}
      {showFeedback && (
        <div className="support-modal-overlay" onClick={() => setShowFeedback(false)}>
          <div className="support-modal" onClick={e => e.stopPropagation()}>
            <button className="support-modal-close" onClick={() => setShowFeedback(false)}><FontAwesomeIcon icon={faTimes} /></button>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8}}>
              <FontAwesomeIcon icon={faStar} style={{color: '#eab308', fontSize: 24}} />
              <h3 style={{margin: 0}}>Feedback</h3>
            </div>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="support-feedback-stars">
                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    className={`support-feedback-star${feedbackStars >= star ? '' : ' inactive'}`}
                    onClick={() => setFeedbackStars(star)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                ))}
              </div>
              <textarea
                rows={3}
                placeholder="Your feedback..."
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                style={{width: '100%', marginBottom: 12}}
              />
              <button type="submit" className="support-help-topic-btn">Submit</button>
            </form>
          </div>
        </div>
      )}
      {/* Ticket Status Modal */}
      {showTicketStatusModal && (
        <div className="support-modal-overlay" onClick={() => setShowTicketStatusModal(false)}>
          <div className="support-modal" style={{maxWidth: 340}} onClick={e => e.stopPropagation()}>
            <button className="support-modal-close" onClick={() => setShowTicketStatusModal(false)}><FontAwesomeIcon icon={faTimes} /></button>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8}}>
              <FontAwesomeIcon icon={faTicketAlt} style={{color: '#2563eb', fontSize: 22}} />
              <h3 style={{margin: 0}}>Ticket Status</h3>
            </div>
            <div style={{margin: '18px 0', color: '#2563eb', fontWeight: 600, fontSize: '1.1rem'}}>{ticketStatus}</div>
            <button className="support-help-topic-btn" onClick={() => setShowTicketStatusModal(false)}>Close</button>
          </div>
        </div>
      )}
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

export default Support;
