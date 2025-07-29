import React, { useState, useEffect } from 'react';
import './Orders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faShoppingCart, faBars, faChevronLeft, faCog, faChevronDown, faChevronUp, faUser, faSignOutAlt, faTag, faSearch, faHome, faBell, faEye, faDownload, faTimes, faMapMarkerAlt, faBoxOpen, faCheckCircle, faTimesCircle, faClock, faRedo, faSyncAlt, faFilter, faHeart, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../Images/unnamed.png';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
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

// User-facing order statuses
const statusMap = {
  completed: { label: 'Delivered', icon: faCheckCircle, color: '#059669', bg: '#d1fae5' },
  pending: { label: 'Pending', icon: faClock, color: '#d97706', bg: '#fef3c7' },
  processing: { label: 'On the way', icon: faBoxOpen, color: '#2563eb', bg: '#dbeafe' },
  cancelled: { label: 'Cancelled', icon: faTimesCircle, color: '#dc2626', bg: '#fee2e2' },
};

// Helper to get date string for today, yesterday, etc.
function getDateStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// Sample orders data (same as before, with friend fields)
const sampleOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john.doe@email.com',
      isOrderForFriend: false
    },
    items: [
      { name: 'Fresh Apples', qty: 2, price: 120, img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop' },
      { name: 'Organic Bananas', qty: 1, price: 80, img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=100&h=100&fit=crop' },
      { name: 'Fresh Carrots', qty: 3, price: 60, img: 'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/2e55b6ac-f95b-4edb-b3f4-63fa824afe9d.jpeg' }
    ],
    status: 'completed',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-16',
    total: 440,
    paymentMethod: 'UPI',
    deliveryAddress: {
      type: 'Home',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    deliveryInstructions: 'Please deliver in the evening after 6 PM',
    subtotal: 440,
    deliveryFee: 30,
    tax: 22,
    discount: 0,
    grandTotal: 492
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      phone: '+91 87654 32109',
      email: 'jane.smith@email.com',
      isOrderForFriend: true,
      friendName: 'Emma Wilson'
    },
    items: [
      { name: 'Fresh Tomatoes', qty: 2, price: 90, img: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=100&h=100&fit=crop' },
      { name: 'Organic Spinach', qty: 1, price: 70, img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop' }
    ],
    status: 'pending',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-17',
    total: 250,
    paymentMethod: 'Card',
    deliveryAddress: {
      type: 'Office',
      address: '456 Business Park, Floor 3',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001'
    },
    deliveryInstructions: 'Leave with security if not available',
    subtotal: 250,
    deliveryFee: 25,
    tax: 13.75,
    discount: 25,
    grandTotal: 263.75
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Mike Johnson',
      phone: '+91 76543 21098',
      email: 'mike.johnson@email.com',
      isOrderForFriend: false
    },
    items: [
      { name: 'Fresh Oranges', qty: 3, price: 100, img: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=100&h=100&fit=crop' },
      { name: 'Organic Grapes', qty: 2, price: 150, img: 'https://cdn.zeptonow.com/production/tr:w-1280,ar-500-357,pr-true,f-auto,q-80/inventory/product/640a9531-ad5a-4e2a-88cc-3ab461154895-d1edf8d4-76cb-450e-836b-8ceaaa79025d.jpeg' },
      { name: 'Fresh Onions', qty: 1, price: 40, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop' }
    ],
    status: 'processing',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-15',
    total: 590,
    paymentMethod: 'COD',
    deliveryAddress: {
      type: 'Home',
      address: '789 Residential Complex, Block A',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001'
    },
    deliveryInstructions: 'Call before delivery',
    subtotal: 590,
    deliveryFee: 35,
    tax: 31.25,
    discount: 0,
    grandTotal: 656.25
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Sarah Wilson',
      phone: '+91 65432 10987',
      email: 'sarah.wilson@email.com',
      isOrderForFriend: true,
      friendName: 'David Brown'
    },
    items: [
      { name: 'Fresh Potatoes', qty: 2, price: 80, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop' },
      { name: 'Organic Broccoli', qty: 1, price: 120, img: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=100&h=100&fit=crop' }
    ],
    status: 'cancelled',
    orderDate: '2024-01-12',
    deliveryDate: '2024-01-14',
    total: 280,
    paymentMethod: 'UPI',
    deliveryAddress: {
      type: 'Home',
      address: '321 Garden Colony, House 5',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001'
    },
    deliveryInstructions: 'Ring doorbell twice',
    subtotal: 280,
    deliveryFee: 30,
    tax: 15.5,
    discount: 0,
    grandTotal: 325.5
  },
  // New: Today
  {
    id: 'ORD-005',
    customer: {
      name: 'Bhargav',
      phone: '+91 90000 00001',
      email: 'bhargav@email.com',
      isOrderForFriend: false
    },
    items: [
      { name: 'Fresh Mangoes', qty: 2, price: 150, img: 'https://mangomaniaus.com/cdn/shop/files/MangoMania_Alphonso-Compressed_3a8a2152-47c0-4272-b759-fbddf9d3541c.png?v=1737966186' },
      { name: 'Organic Lemons', qty: 1, price: 40, img: 'https://media.healthyfood.com/wp-content/uploads/2017/03/In-season-August-Lemons.jpg' }
    ],
    status: 'completed',
    orderDate: getDateStr(0),
    deliveryDate: getDateStr(0),
    total: 340,
    paymentMethod: 'UPI',
    deliveryAddress: {
      type: 'Home',
      address: '12 Park Lane',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001'
    },
    deliveryInstructions: '',
    subtotal: 340,
    deliveryFee: 20,
    tax: 17,
    discount: 0,
    grandTotal: 377
  },
  // New: Yesterday
  {
    id: 'ORD-006',
    customer: {
      name: 'Bhargav',
      phone: '+91 90000 00002',
      email: 'bhargav@email.com',
      isOrderForFriend: true,
      friendName: 'Amit Kumar'
    },
    items: [
      { name: 'Fresh Pineapple', qty: 1, price: 90, img: 'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/19885a90-eef8-4b09-b17d-3ecf3200caf7.jpeg' },
      { name: 'Organic Papaya', qty: 2, price: 60, img: 'https://megagrico.com/wp-content/uploads/2020/12/du-du-vang-600x429.jpg' }
    ],
    status: 'processing',
    orderDate: getDateStr(-1),
    deliveryDate: getDateStr(0),
    total: 210,
    paymentMethod: 'Card',
    deliveryAddress: {
      type: 'Office',
      address: '88 Tech Park',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001'
    },
    deliveryInstructions: 'Leave at reception',
    subtotal: 210,
    deliveryFee: 15,
    tax: 10,
    discount: 0,
    grandTotal: 235
  },
  // New: 2 days ago
  {
    id: 'ORD-007',
    customer: {
      name: 'Bhargav',
      phone: '+91 90000 00003',
      email: 'bhargav@email.com',
      isOrderForFriend: false
    },
    items: [
      { name: 'Fresh Watermelon', qty: 1, price: 120, img: 'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/d684d49f-850e-4c4a-bed3-2f5ec4ba9c3c.jpeg' }
    ],
    status: 'pending',
    orderDate: getDateStr(-2),
    deliveryDate: getDateStr(-1),
    total: 120,
    paymentMethod: 'COD',
    deliveryAddress: {
      type: 'Home',
      address: '7 Green Street',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600002'
    },
    deliveryInstructions: '',
    subtotal: 120,
    deliveryFee: 10,
    tax: 6,
    discount: 0,
    grandTotal: 136
  },
  // New: 3 days ago, friend order
  {
    id: 'ORD-008',
    customer: {
      name: 'Bhargav',
      phone: '+91 90000 00004',
      email: 'bhargav@email.com',
      isOrderForFriend: true,
      friendName: 'Priya Singh'
    },
    items: [
      { name: 'Fresh Strawberries', qty: 2, price: 180, img: 'https://www.jiomart.com/images/product/original/590001814/strawberry-small-pack-180-g-product-images-o590001814-p590116964-1-202412161658.jpg?im=Resize=(1000,1000)' }
    ],
    status: 'cancelled',
    orderDate: getDateStr(-3),
    deliveryDate: getDateStr(-2),
    total: 360,
    paymentMethod: 'UPI',
    deliveryAddress: {
      type: 'Home',
      address: '22 Blossom Ave',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560002'
    },
    deliveryInstructions: '',
    subtotal: 360,
    deliveryFee: 20,
    tax: 18,
    discount: 0,
    grandTotal: 398
  },
];

function Orders() {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
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

  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [orderIdSearch, setOrderIdSearch] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ status: 'all', date: 'all', fromDate: '', toDate: '', orderId: '' });

  // Date helpers
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

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

  // Apply filter button handler
  const handleApplyFilter = () => {
    setAppliedFilters({
      status: statusFilter,
      date: dateFilter,
      fromDate,
      toDate,
      orderId: orderIdSearch.trim(),
    });
  };

  const handleResetFilter = () => {
    setStatusFilter('all');
    setDateFilter('all');
    setFromDate('');
    setToDate('');
    setOrderIdSearch('');
    setAppliedFilters({ status: 'all', date: 'all', fromDate: '', toDate: '', orderId: '' });
  };

  // Filter orders based on applied filters
  const filteredOrders = sampleOrders
    .filter(order => {
      // Status
      const matchesStatus = appliedFilters.status === 'all' || order.status === appliedFilters.status;
      // Date range
      let matchesDate = true;
      if (appliedFilters.fromDate) {
        matchesDate = matchesDate && (order.orderDate >= appliedFilters.fromDate);
      }
      if (appliedFilters.toDate) {
        matchesDate = matchesDate && (order.orderDate <= appliedFilters.toDate);
      }
      // Order ID search
      let matchesOrderId = true;
      if (appliedFilters.orderId) {
        matchesOrderId = order.id.toLowerCase().includes(appliedFilters.orderId.toLowerCase());
      }
      return matchesStatus && matchesDate && matchesOrderId;
    })
    .sort((a, b) => b.orderDate.localeCompare(a.orderDate));

  // Handle view order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Replace handleDownloadOrder with PDF logic
  const handleDownloadOrder = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Order #${order.id.replace('ORD-', '')} Invoice`, 14, 18);
    doc.setFontSize(12);
    doc.text(`Order Date: ${new Date(order.orderDate).toLocaleDateString()}`, 14, 30);
    doc.text(`Status: ${statusMap[order.status].label}`, 14, 38);
    doc.text(`Total Paid: ₹${order.grandTotal}`, 14, 46);
    let y = 58;
    doc.setFontSize(14);
    doc.text('Delivery Address:', 14, y);
    doc.setFontSize(12);
    y += 8;
    doc.text(`${order.deliveryAddress.type}`, 14, y);
    y += 7;
    doc.text(`${order.deliveryAddress.address}`, 14, y);
    y += 7;
    doc.text(`${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.pincode}`, 14, y);
    y += 10;
    if (order.customer.isOrderForFriend) {
      doc.text(`Order for: ${order.customer.friendName}`, 14, y);
      y += 8;
    }
    if (order.deliveryInstructions) {
      doc.text(`Instructions: ${order.deliveryInstructions}`, 14, y);
      y += 8;
    }
    doc.setFontSize(14);
    doc.text('Items:', 14, y);
    y += 8;
    doc.setFontSize(12);
    order.items.forEach(item => {
      doc.text(`- ${item.name} (x${item.qty}) - ₹${item.price * item.qty}`, 14, y);
      y += 7;
      if (y > 270) { doc.addPage(); y = 20; }
    });
    y += 5;
    doc.setFontSize(14);
    doc.text('Bill Summary:', 14, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(`Items Total: ₹${order.subtotal}`, 14, y);
    y += 7;
    doc.text(`Delivery Fee: ₹${order.deliveryFee}`, 14, y);
    y += 7;
    doc.text(`Tax: ₹${order.tax}`, 14, y);
    y += 7;
    if (order.discount > 0) {
      doc.text(`Discount: -₹${order.discount}`, 14, y);
      y += 7;
    }
    doc.text(`Total Paid: ₹${order.grandTotal}`, 14, y);
    doc.save(`Order-${order.id.replace('ORD-', '')}.pdf`);
  };

  // User-facing status info
  const getStatusInfo = (status) => statusMap[status] || { label: status, icon: faClock, color: '#6b7280', bg: '#f3f4f6' };

  // Reorder handler (stub)
  const handleReorder = (order) => {
    alert('Reorder placed for the same items! (Demo)');
  };

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
            <a className="active" onClick={() => navigate('/orders')}
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
                    placeholder="Search orders..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
          
          {/* Page Content */}
          <div className="dashboard-page-content">
            <div className="orders-container">
              <h1>My Orders</h1>
              {/* Filters Section */}
              <div className="orders-filters">
                <div className="filter-group">
                  <label>Status:</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="processing">On the way</option>
                    <option value="completed">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>From Date:</label>
                  <input
                    type="date"
                    className="filter-select"
                    value={fromDate}
                    max={toDate ? toDate : todayStr}
                    onChange={e => setFromDate(e.target.value)}
                  />
                </div>
                <div className="filter-group">
                  <label>To Date:</label>
                  <input
                    type="date"
                    className="filter-select"
                    value={toDate}
                    min={fromDate}
                    max={todayStr}
                    onChange={e => setToDate(e.target.value)}
                  />
                </div>
                <div className="filter-group">
                  <label>Order ID:</label>
                  <input
                    type="text"
                    className="filter-select"
                    placeholder="Search by Order ID"
                    value={orderIdSearch}
                    onChange={e => setOrderIdSearch(e.target.value)}
                  />
                </div>
                <div className="filter-actions">
                  <button
                    className="view-btn"
                    style={{padding: '10px 24px', minWidth: 120, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8}}
                    onClick={handleApplyFilter}
                  >
                    <FontAwesomeIcon icon={faFilter} />
                    Apply
                  </button>
                  <button
                    className="download-btn"
                    style={{padding: '10px 24px', minWidth: 100, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8}}
                    onClick={handleResetFilter}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faSyncAlt} />
                    Reset
                  </button>
                </div>
              </div>
              {/* Orders Cards */}
              <div className="orders-cards">
                {filteredOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <div className="order-id-section">
                          <h3>Order #{order.id.replace('ORD-', '')}</h3>
                          <span className="order-date">
                            {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="order-status" style={{ backgroundColor: statusInfo.bg, color: statusInfo.color }}>
                          <FontAwesomeIcon icon={statusInfo.icon} style={{marginRight: 6}} />
                          {statusInfo.label}
                        </div>
                      </div>
                      <div className="order-card-content">
                        {order.customer.isOrderForFriend ? (
                          <div className="customer-details">
                            <p className="friend-order">
                              <FontAwesomeIcon icon={faUser} /> For: {order.customer.friendName}
                            </p>
                          </div>
                        ) : (
                          <div style={{ height: '28px' }} />
                        )}
                        <div className="order-items-preview">
                          <div className="items-grid">
                            {order.items.slice(0, 3).map((item, index) => (
                              <div key={index} className="item-preview">
                                <img src={item.img} alt={item.name} />
                                <span>{item.name}</span>
                                <small>Qty: {item.qty}</small>
                              </div>
                            ))}
                            {order.items && order.items.length > 3 && (
                              <div className="more-items">
                                +{order.items && order.items.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="order-summary">
                          <div className="summary-row">
                            <span>Total Paid:</span>
                            <span className="amount">₹{order.grandTotal}</span>
                          </div>
                          <div className="summary-row">
                            <span>Delivered to:</span>
                            <span className="delivery-info">
                              <FontAwesomeIcon icon={faMapMarkerAlt} />
                              {order.deliveryAddress.type}, {order.deliveryAddress.city}
                            </span>
                          </div>
                        </div>
                        <div className="order-card-actions">
                          <button 
                            className="view-btn"
                            onClick={() => handleViewOrder(order)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                            View Details
                          </button>
                          <button 
                            className="download-btn"
                            onClick={() => handleDownloadOrder(order)}
                          >
                            <FontAwesomeIcon icon={faDownload} />
                            Download Invoice
                          </button>
                          <button 
                            className="reorder-btn"
                            onClick={() => handleReorder(order)}
                          >
                            <FontAwesomeIcon icon={faRedo} />
                            Reorder
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {filteredOrders.length === 0 && (
                <div className="no-orders">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <h3>No orders found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="order-details-modal-overlay" onClick={() => setShowOrderDetails(false)}>
          <div className="order-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order #{selectedOrder.id.replace('ORD-', '')}</h2>
              <button className="close-btn" onClick={() => setShowOrderDetails(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-content">
              <div className="detail-section">
                <h3>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  {getStatusInfo(selectedOrder.status).label}
                </h3>
                <div className="customer-details-grid">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>Bhargav</span>
                  </div>
                  {selectedOrder.customer.isOrderForFriend && (
                    <div className="detail-item">
                      <label>Order For:</label>
                      <span>{selectedOrder.customer.friendName}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <label>Order Date:</label>
                    <span>{new Date(selectedOrder.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="detail-item">
                    <label>Delivered to:</label>
                    <span>{selectedOrder.deliveryAddress.type}, {selectedOrder.deliveryAddress.city}</span>
                  </div>
                </div>
              </div>
              <div className="detail-section">
                <h3>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  Delivery Address
                </h3>
                <div className="address-details">
                  <div className="address-type">{selectedOrder.deliveryAddress.type}</div>
                  <div className="address-text">
                    {selectedOrder.deliveryAddress.address}<br />
                    {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} {selectedOrder.deliveryAddress.pincode}
                  </div>
                  {selectedOrder.deliveryInstructions && (
                    <div className="delivery-instructions">
                      <strong>Instructions:</strong> {selectedOrder.deliveryInstructions}
                    </div>
                  )}
                </div>
              </div>
              <div className="detail-section">
                <h3>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Items
                </h3>
                <div className="order-items-list">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.img} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.qty}</p>
                        <p>Subtotal: ₹{item.qty * item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail-section">
                <h3>
                  <FontAwesomeIcon icon={faTag} />
                  Bill Summary
                </h3>
                <div className="bill-summary">
                  <div className="bill-row">
                    <span>Items Total:</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="bill-row">
                    <span>Delivery Fee:</span>
                    <span>₹{selectedOrder.deliveryFee}</span>
                  </div>
                  <div className="bill-row">
                    <span>Tax:</span>
                    <span>₹{selectedOrder.tax}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="bill-row discount">
                      <span>Discount:</span>
                      <span>-₹{selectedOrder.discount}</span>
                    </div>
                  )}
                  <div className="bill-row total">
                    <span>Total Paid:</span>
                    <span>₹{selectedOrder.grandTotal}</span>
                  </div>
                </div>
              </div>
              <div className="detail-section" style={{textAlign: 'center'}}>
                <p style={{color: '#2563eb', fontWeight: 500, fontSize: 16, marginBottom: 8}}>
                  Need help with this order? <a href="#support" style={{color: '#2563eb', textDecoration: 'underline'}}>Contact Support</a>
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="download-btn"
                onClick={() => handleDownloadOrder(selectedOrder)}
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Invoice
              </button>
              <button 
                className="reorder-btn"
                onClick={() => handleReorder(selectedOrder)}
              >
                <FontAwesomeIcon icon={faRedo} />
                Reorder
              </button>
              <button 
                className="close-btn"
                onClick={() => setShowOrderDetails(false)}
              >
                Close
              </button>
            </div>
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

export default Orders;
