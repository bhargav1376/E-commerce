import React, { useState, useEffect } from 'react';
import './Products.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faCheckCircle, faShoppingCart, faHeart, faChevronRight  ,faHome, faUser, faTag, faCog, faBars, faChevronLeft, faChevronDown, faChevronUp, faSignOutAlt, faGlobe, faBell, faSearch, faTrash, faFire, faChartLine, faStar, faExpand, faCompress, faHeart as faHeartFilled, faQuestionCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import logo from '../Images/unnamed.png';
import { useLocation, useNavigate } from 'react-router-dom';
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

const allProducts = [
  {
    id: 1,
    name: 'Apple',
    category: 'Fruits',
    images: [
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    ],
    price: 150,
    desc: 'Fresh and juicy apples.',
    discount: 10,
    rating: 4.2,
    reviews: 876,
    stock: 12,
    quantity: '1kg', // <-- added
    about: 'Apples are one of the most popular and delicious fruits on the planet. They are rich in fiber, vitamins, and minerals.',
    benefits: [
      'Rich in dietary fiber for digestive health',
      'Contains Vitamin C for immune support',
      'May help reduce cholesterol',
      'Low in calories and fat',
      'Good for heart health',
    ],
    extra: 'Best enjoyed fresh, in salads, or as juice. Store in a cool, dry place.'
  },
  {
    id: 2,
    name: 'Banana',
    category: 'Fruits',
    images: [
      'https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/5a22eec9-fbe7-4ba2-b603-d0f6e1217a98/Banana-Nendran.jpeg',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80',
    ],
    price: 70,
    desc: 'Sweet bananas.',
    stock: 0,
    rating: 4.5,
    reviews: 1203,
    quantity: '1 dozen', // <-- added
    about: 'Bananas are a staple fruit, loved for their sweet taste and convenience.',
    benefits: [
      'High in potassium for heart health',
      'Provides quick energy',
      'Supports digestive health',
      'Contains Vitamin B6',
      'Helps regulate blood pressure',
    ],
    extra: 'Perfect for smoothies, snacks, and desserts. Store at room temperature.'
  },
  {
    id: 3,
    name: 'Orange',
    category: 'Fruits',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-900-900,pr-true,f-auto,q-80/inventory/product/c3aa00c2-6d2b-4c50-8005-ef59bcf9fd6a-29995b32-2f3c-4633-b103-801138d27e22.jpeg',
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80',
    ],
    price: 55,
    desc: 'Citrus oranges.',
    rating: 4.0,
    reviews: 2345,
    stock: 8,
    quantity: '1kg', // <-- added
    about: 'Oranges are citrus fruits known for their refreshing taste and high vitamin C content.',
    benefits: [
      'Boosts immune system',
      'Rich in antioxidants',
      'Promotes skin health',
      'Supports heart health',
      'Aids iron absorption',
    ],
    extra: 'Enjoy as juice, in fruit salads, or as a snack. Store in refrigerator for longer freshness.'
  },
  {
    id: 4,
    name: 'Grapes',
    category: 'Fruits',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-500-357,pr-true,f-auto,q-80/inventory/product/640a9531-ad5a-4e2a-88cc-3ab461154895-d1edf8d4-76cb-450e-836b-8ceaaa79025d.jpeg',
    ],
    price: 78,
    desc: 'Seedless grapes.',
    discount: 5,
    rating: 4.7,
    reviews: 312,
    stock: 5,
    quantity: '500g', // <-- added
    about: 'Grapes are small, sweet fruits packed with nutrients and antioxidants.',
    benefits: [
      'Supports heart health',
      'Contains resveratrol for anti-aging',
      'Good source of Vitamin K',
      'May help lower blood pressure',
      'Hydrating and low calorie',
    ],
    extra: 'Great for snacking, salads, or making juice. Store refrigerated.'
  },
  {
    id: 5,
    name: 'Pineapple',
    category: 'Fruits',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/19885a90-eef8-4b09-b17d-3ecf3200caf7.jpeg',
    ],
    price: 112,
    desc: 'Tropical pineapple.',
    rating: 4.3,
    reviews: 1987,
    stock: 3,
    quantity: '1 piece', // <-- added
    about: 'Pineapples are tropical fruits with a unique sweet and tangy flavor.',
    benefits: [
      'Rich in Vitamin C',
      'Contains bromelain for digestion',
      'Anti-inflammatory properties',
      'Boosts immunity',
      'Supports eye health',
    ],
    extra: 'Enjoy fresh, grilled, or in desserts. Store cut pineapple in refrigerator.'
  },
  {
    id: 6,
    name: 'Mango',
    category: 'Fruits',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/0d9b644c-00e3-4f3a-8b7c-bb8824f00607.jpeg',
      'https://mangomaniaus.com/cdn/shop/files/MangoMania_Alphonso-Compressed_3a8a2152-47c0-4272-b759-fbddf9d3541c.png?v=1737966186',
      'https://5.imimg.com/data5/SELLER/Default/2023/3/293132097/LU/AH/IP/42519708/organic-kesar-mango-1000x1000.jpg',
    ],
    price: 150,
    desc: 'Sweet mangoes.',
    discount: 20,
    rating: 4.9,
    reviews: 4012,
    quantity: '1kg', // <-- added
    about: 'Mangoes are known as the king of fruits, loved for their sweetness and aroma.',
    benefits: [
      'High in Vitamin A and C',
      'Supports eye health',
      'Boosts immunity',
      'Promotes healthy skin',
      'Aids digestion',
    ],
    extra: 'Best enjoyed fresh, in smoothies, or as chutney. Store ripe mangoes in refrigerator.'
  },
  {
    id: 7,
    name: 'Strawberry',
    category: 'Fruits',
    images: [
      'https://www.jiomart.com/images/product/original/590001814/strawberry-small-pack-180-g-product-images-o590001814-p590116964-1-202412161658.jpg?im=Resize=(1000,1000)',
    ],
    price: 200,
    desc: 'Fresh strawberries.',
    rating: 4.1,
    reviews: 1502,
    quantity: '250g', // <-- added
    about: 'Strawberries are bright red, juicy, and packed with nutrients.',
    benefits: [
      'Rich in Vitamin C and antioxidants',
      'Supports heart health',
      'Promotes skin health',
      'May help regulate blood sugar',
      'Low calorie snack',
    ],
    extra: 'Perfect for desserts, salads, or smoothies. Store refrigerated.'
  },
  {
    id: 8,
    name: 'Blueberry',
    category: 'Fruits',
    images: [
      'https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/3874781d-377e-48b2-a617-bd2070d9de40/Blueberry.jpeg',
    ],
    price: 350,
    desc: 'Blueberries.',
    stock: 0,
    rating: 4.4,
    reviews: 2104,
    quantity: '125g', // <-- added
    about: 'Blueberries are small, sweet, and highly nutritious berries.',
    benefits: [
      'High in antioxidants',
      'Supports brain health',
      'May improve heart health',
      'Promotes healthy skin',
      'Low in calories',
    ],
    extra: 'Great for snacking, baking, or smoothies. Store refrigerated.'
  },
  {
    id: 9,
    name: 'Watermelon',
    category: 'Fruits',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/d684d49f-850e-4c4a-bed3-2f5ec4ba9c3c.jpeg',
    ],
    price: 110,
    desc: 'Juicy watermelon.',
    rating: 4.6,
    reviews: 1890,
    stock: 7,
    quantity: '1 piece', // <-- added
    about: 'Watermelon is a hydrating fruit, perfect for hot days.',
    benefits: [
      'High water content for hydration',
      'Rich in Vitamin C and A',
      'Contains lycopene for heart health',
      'Low calorie',
      'May help reduce muscle soreness',
    ],
    extra: 'Enjoy chilled, in salads, or as juice. Store cut watermelon in refrigerator.'
  },
  {
    id: 10,
    name: 'Papaya',
    category: 'Fruits',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/2d835650-5530-4e70-bb6f-2876f65610fc.jpeg',
    ],
    price: 95,
    desc: 'Fresh papaya.',
    rating: 4.0,
    reviews: 1345,
    quantity: '1 piece', // <-- added
    about: 'Papaya is a tropical fruit known for its sweet taste and digestive benefits.',
    benefits: [
      'Contains papain for digestion',
      'Rich in Vitamin C and A',
      'Supports immune system',
      'Promotes skin health',
      'Low calorie',
    ],
    extra: 'Best enjoyed fresh or in salads. Store ripe papaya in refrigerator.'
  },
  {
    id: 11,
    name: 'Kiwi',
    category: 'Fruits',
    images: [
      'https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2012/10/thumb_720_450_Kiwi_shutterstock_84220885-1.jpg',
    ],
    price: 120,
    desc: 'Fresh Kiwi.',
    quantity: '3 pieces', // <-- added
    about: 'Kiwi is a small, fuzzy fruit packed with nutrients.',
    benefits: [
      'High in Vitamin C',
      'Supports immune health',
      'Aids digestion',
      'Promotes heart health',
      'Good source of fiber',
    ],
    extra: 'Enjoy fresh, in salads, or as juice. Store refrigerated.'
  },
  {
    id: 12,
    name: 'Pomegranate',
    category: 'Fruits',
    images: [
      'https://toneopeats.com/_next/image?url=https%3A%2F%2Ftoneopeats-strapi-prod.s3.ap-south-1.amazonaws.com%2FPomegranate_Benefits_1c9932b0cc.jpg&w=1920&q=75',
    ],
    price: 130,
    desc: 'Fresh Pomegranate.',
    rating: 4.2,
    reviews: 576,
    quantity: '1 piece', // <-- added
    about: 'Pomegranate is a nutrient-rich fruit with juicy seeds.',
    benefits: [
      'Rich in antioxidants',
      'Supports heart health',
      'May help lower blood pressure',
      'Promotes healthy skin',
      'Good source of Vitamin C',
    ],
    extra: 'Enjoy fresh, as juice, or in salads. Store refrigerated.'
  },
  {
    id: 13,
    name: 'Cherry',
    category: 'Fruits',
    images: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/fruit/w/v/h/-original-imag3nyrgscxzrdk.jpeg?q=70&crop=false',
    ],
    price: 180,
    desc: 'Fresh Cherry.',
    discount: 3,
    rating: 4.0,
    reviews: 401,
    quantity: '250g', // <-- added
    about: 'Cherries are small, round fruits with a sweet and tart flavor.',
    benefits: [
      'Rich in antioxidants',
      'May help improve sleep',
      'Supports heart health',
      'Anti-inflammatory properties',
      'Good source of Vitamin C',
    ],
    extra: 'Enjoy fresh, in desserts, or as juice. Store refrigerated.'
  },
// Vegetables
  {
    id: 14,
    name: 'Carrot',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/2e55b6ac-f95b-4edb-b3f4-63fa824afe9d.jpeg',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80',
    ],
    price: 70,
    desc: 'Organic carrots.',
    discount: 15,
    rating: 4.4,
    reviews: 945,
    stock: 2,
    quantity: '500g', // <-- added
    about: 'Carrots are root vegetables known for their sweet flavor and vibrant color.',
    benefits: [
      'Rich in beta-carotene for eye health',
      'Supports immune system',
      'Good source of fiber',
      'Promotes healthy skin',
      'Low calorie snack',
    ],
    extra: 'Enjoy raw, cooked, or in salads. Store refrigerated.'
  },
  {
    id: 15,
    name: 'Broccoli',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/b1ee4ed5-9953-433e-b88c-11b0f85a805a.jpg',
    ],
    price: 50,
    desc: 'Fresh broccoli.',
    rating: 4.2,
    reviews: 576,
    quantity: '250g', // <-- added
    about: 'Broccoli is a cruciferous vegetable packed with nutrients.',
    benefits: [
      'High in Vitamin C and K',
      'Supports bone health',
      'Contains antioxidants',
      'May help lower cholesterol',
      'Promotes healthy digestion',
    ],
    extra: 'Best steamed or stir-fried. Store refrigerated.'
  },
  {
    id: 16,
    name: 'Spinach',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/583dfd94-07f6-4c7f-bae1-c1d64c645bc9.jpeg',
    ],
    price: 45,
    desc: 'Leafy spinach.',
    rating: 4.3,
    reviews: 489,
    quantity: '250g', // <-- added
    about: 'Spinach is a leafy green vegetable rich in iron and vitamins.',
    benefits: [
      'High in iron and folate',
      'Supports eye health',
      'Boosts immunity',
      'Promotes bone health',
      'Low calorie',
    ],
    extra: 'Great for salads, smoothies, or cooked dishes. Store refrigerated.'
  },
  {
    id: 17,
    name: 'Potato',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-0.98,h-0.98,f-auto/cms/product_variant/2c019898-ece5-4c06-b3e9-e3b45ce56f4a1H50IeGqD071K_adujPaMKTTUx0UzuYay.jpeg',
    ],
    price: 30,
    desc: 'Farm potatoes.',
    rating: 4.1,
    reviews: 612,
    quantity: '1kg', // <-- added
    about: 'Potatoes are versatile root vegetables used worldwide.',
    benefits: [
      'Good source of potassium',
      'Provides energy',
      'Supports digestive health',
      'Contains Vitamin C',
      'Gluten-free',
    ],
    extra: 'Enjoy boiled, baked, or fried. Store in a cool, dry place.'
  },
  {
    id: 18,
    name: 'Tomato',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/270711b9-d545-44a6-a984-98e0fae2cd55.jpeg',
    ],
    price: 60,
    desc: 'Red tomatoes.',
    rating: 4.2,
    reviews: 789,
    quantity: '1kg', // <-- added
    about: 'Tomatoes are juicy fruits used as vegetables in cooking.',
    benefits: [
      'Rich in lycopene for heart health',
      'Supports skin health',
      'Contains Vitamin C and K',
      'Low calorie',
      'Promotes healthy digestion',
    ],
    extra: 'Use in salads, sauces, or cooked dishes. Store at room temperature.'
  },
  {
    id: 19,
    name: 'Onion',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/e8998223-e1e7-4392-a987-48922cd9467f.jpeg',
    ],
    price: 55,
    desc: 'Fresh onions.',
    rating: 4.0,
    reviews: 534,
    quantity: '500g', // <-- added
    about: 'Onions are flavorful bulbs used in many cuisines.',
    benefits: [
      'Contains antioxidants',
      'Supports heart health',
      'May help regulate blood sugar',
      'Promotes healthy digestion',
      'Low calorie',
    ],
    extra: 'Use raw or cooked. Store in a cool, dry place.'
  },
  {
    id: 20,
    name: 'Cucumber',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/9d2489fc-9897-4e48-ac9d-41ee75e7da87.jpeg',
    ],
    price: 34,
    desc: 'Cool cucumbers.',
    rating: 4.3,
    reviews: 412,
    quantity: '250g', // <-- added
    about: 'Cucumbers are hydrating vegetables with a crisp texture.',
    benefits: [
      'High water content for hydration',
      'Supports skin health',
      'Low calorie',
      'Contains Vitamin K',
      'Promotes healthy digestion',
    ],
    extra: 'Enjoy raw, in salads, or as juice. Store refrigerated.'
  },
  {
    id: 21,
    name: 'Cauliflower',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/41dac350-b4a0-434a-9653-2ea45fe9887e.jpeg',
    ],
    price: 50,
    desc: 'Cauliflower.',
    stock: 0,
    rating: 4.1,
    reviews: 321,
    quantity: '500g', // <-- added
    about: 'Cauliflower is a versatile vegetable used in many dishes.',
    benefits: [
      'Rich in Vitamin C and K',
      'Supports bone health',
      'Low calorie',
      'Contains antioxidants',
      'Promotes healthy digestion',
    ],
    extra: 'Use in curries, salads, or roasted. Store refrigerated.'
  },
  {
    id: 22,
    name: 'Peas',
    category: 'Vegetables',
    images: [
      'https://cdn.mos.cms.futurecdn.net/nM7yvvsfznDNaG2xAGV3T6.jpg',
    ],
    price: 54,
    desc: 'Green peas.',
    rating: 4.2,
    reviews: 278,
    quantity: '250g', // <-- added
    about: 'Peas are small, sweet green vegetables.',
    benefits: [
      'Good source of plant protein',
      'Supports heart health',
      'Contains fiber',
      'Promotes healthy digestion',
      'Low calorie',
    ],
    extra: 'Use in curries, salads, or soups. Store refrigerated.'
  },
  {
    id: 23,
    name: 'Capsicum',
    category: 'Vegetables',
    images: [
      'https://cdn.zeptonow.com/production/tr:w-1280,ar-3000-3000,pr-true,f-auto,q-80/cms/product_variant/306748be-1d90-49d8-9971-0ce3eae190a8.jpg',
    ],
    price: 35,
    desc: 'Colorful capsicum.',
    rating: 4.3,
    reviews: 198,
    quantity: '250g', // <-- added
    about: 'Capsicum is a colorful vegetable used in many cuisines.',
    benefits: [
      'Rich in Vitamin C',
      'Supports eye health',
      'Contains antioxidants',
      'Low calorie',
      'Promotes healthy digestion',
    ],
    extra: 'Use raw, grilled, or in curries. Store refrigerated.'
  },
  {
    id: 24,
    name: 'Beetroot',
    category: 'Vegetables',
    images: [
      'https://m.media-amazon.com/images/I/71XsyPm+xZL.jpg',
    ],
    price: 55,
    desc: 'Fresh beetroot.',
    discount: 4,
    rating: 4.1,
    reviews: 156,
    quantity: '500g', // <-- added
    about: 'Beetroot is a root vegetable with a deep red color.',
    benefits: [
      'Rich in folate and iron',
      'Supports heart health',
      'Contains antioxidants',
      'May help lower blood pressure',
      'Promotes healthy digestion',
    ],
    extra: 'Enjoy raw, cooked, or as juice. Store refrigerated.'
  },
  {
    id: 25,
    name: 'Radish',
    category: 'Vegetables',
    images: [
      'https://m.media-amazon.com/images/I/51ATDQTsNQL._UF1000,1000_QL80_.jpg',
    ],
    price: 70,
    desc: 'Crunchy radish.',
    rating: 4.0,
    reviews: 98,
    quantity: '250g', // <-- added
    about: 'Radish is a crunchy root vegetable with a peppery flavor.',
    benefits: [
      'Supports digestive health',
      'Low calorie',
      'Contains Vitamin C',
      'Promotes healthy skin',
      'Hydrating',
    ],
    extra: 'Enjoy raw, in salads, or pickled. Store refrigerated.'
  },
  {
    id: 26,
    name: 'Turnip',
    category: 'Vegetables',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1TCynDQh2q7XyY9SenLAxroEmEncp90TyvA&s',
    ],
    price: 77,
    desc: 'Juicy turnip.',
    rating: 4.1,
    reviews: 67,
    quantity: '500g', // <-- added
    about: 'Turnip is a root vegetable with a mild, sweet flavor.',
    benefits: [
      'Rich in Vitamin C',
      'Supports immune health',
      'Low calorie',
      'Contains fiber',
      'Promotes healthy digestion',
    ],
    extra: 'Enjoy cooked, roasted, or in soups. Store refrigerated.'
  },
  // Electronics
  {
    id: 27,
    name: 'MOTOROLA g05 (Forest Green, 64 GB) (4 GB RAM)',
    category: 'Electronics',
    images: ['https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/j/a/b/-original-imah83eztbdcsknu.jpeg?q=70&crop=false'],
    price: 12499,
    desc: 'Latest smartphone.',
    discount: 5,
    rating: 4.3,
    reviews: 812,
    quantity: '',
    about: 'The MOTOROLA g05 offers a powerful performance with 4GB RAM and 64GB storage in a stylish Forest Green color.',
    benefits: [
      'Long battery life',
      'Fast processor for smooth multitasking',
      'High-resolution camera',
      'Expandable storage',
      'Dual SIM support',
    ],
    extra: 'Ideal for daily use, gaming, and photography. Comes with a 1-year warranty.'
  },
  {
    id: 28,
    name: 'Boult Flex 80Hrs Battery',
    category: 'Electronics',
    images: ['https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/o/p/6/-original-imahc6hz2ykaquzc.jpeg?q=70&crop=false'],
    price: 1499,
    desc: 'Noise-cancelling headphones.',
    rating: 4.4,
    reviews: 654,
    quantity: '',
    about: 'Boult Flex headphones deliver immersive sound and up to 80 hours of battery life.',
    benefits: [
      'Active noise cancellation',
      'Comfortable fit for long use',
      'Bluetooth connectivity',
      'Quick charge feature',
      'Built-in microphone',
    ],
    extra: 'Perfect for travel, work, and music lovers. Includes carrying case.'
  },
  {
    id: 29,
    name: 'HP MSO 2024 Intel Core i5 13th Gen 1334U',
    category: 'Electronics',
    images: ['https://rukminim2.flixcart.com/image/832/832/xif0q/computer/6/v/h/-original-imahcd9mxamzrfmm.jpeg?q=70&crop=false'],
    price: 56899,
    desc: 'High performance laptop.',
    rating: 4.6,
    reviews: 312,
    quantity: '',
    about: 'HP MSO 2024 laptop features the latest Intel Core i5 13th Gen processor for top performance.',
    benefits: [
      'Fast SSD storage',
      'Full HD display',
      'Long battery life',
      'Lightweight and portable',
      'Pre-installed Windows 11',
    ],
    extra: 'Great for professionals, students, and gamers. 2-year warranty included.'
  },
  {
    id: 30,
    name: 'REDMI Pad SE 8 GB RAM 128 GB ROM 11.0 inch',
    category: 'Electronics',
    images: ['https://rukminim2.flixcart.com/image/832/832/xif0q/tablet/k/e/v/-original-imah4ycjkznp6usf.jpeg?q=70&crop=false'],
    price: 23299,
    desc: 'Portable tablet.',
    rating: 4.2,
    reviews: 489,
    quantity: '',
    about: 'REDMI Pad SE offers a large 11-inch display and ample storage for entertainment and productivity.',
    benefits: [
      'High-resolution screen',
      'Expandable storage',
      'Long battery life',
      'Lightweight design',
      'Multi-user support',
    ],
    extra: 'Ideal for reading, streaming, and work. Includes charger and case.'
  },
  {
    id: 31,
    name: 'Fire-Boltt Ninja Calling Pro',
    category: 'Electronics',
    images: ['https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/products/pictures/item/free/resize-w:450/rq-VbRuXMr-fire-boltt-ninja-call-pro-plus-smart-watch-image-493664720-i-1-1200wx1200h.jpeg'],
    price: 1299,
    desc: 'Fitness smartwatch.',
    rating: 4.1,
    reviews: 312,
    quantity: '',
    about: 'Fire-Boltt Ninja Calling Pro is a feature-rich smartwatch for fitness and productivity.',
    benefits: [
      'Bluetooth calling',
      'Multiple sports modes',
      'Heart rate monitoring',
      'Water-resistant',
      'Long battery life',
    ],
    extra: 'Compatible with Android and iOS. Includes charging cable.'
  },
  {
    id: 32,
    name: 'Portronics Soundpot Wireless Bluetooth Speaker',
    category: 'Electronics',
    images: ['https://img4.gadgetsnow.com/gd/images/products/additional/large/G669771_View_1/accessories/bluetooth-speakers/portronics-soundpot-por-280-20w-wireless-bluetooth-v5-3-portable-speaker-with-360-immersive-sound-black-.jpg'],
    price: 599,
    desc: 'Portable speaker.',
    rating: 4.3,
    reviews: 198,
    quantity: '',
    about: 'Portronics Soundpot delivers 360° immersive sound in a compact design.',
    benefits: [
      'Bluetooth 5.3 connectivity',
      'Long battery life',
      'Compact and portable',
      'Built-in microphone',
      'Easy controls',
    ],
    extra: 'Perfect for parties, travel, and outdoor use. Includes charging cable.'
  },
  {
    id: 33,
    name: 'Canon Dslr 700d with 18-55mm Lens',
    category: 'Electronics',
    images: ['https://camnext.in/wp-content/uploads/2024/09/shopping.webp'],
    price: 599,
    desc: 'DSLR camera.',
    stock: 0,
    rating: 4.5,
    reviews: 98,
    quantity: '',
    about: 'Canon 700d DSLR is perfect for photography enthusiasts and professionals.',
    benefits: [
      'High-resolution sensor',
      'Interchangeable lenses',
      'Full HD video recording',
      'Easy-to-use controls',
      'Durable build',
    ],
    extra: 'Includes 18-55mm lens and camera bag. 1-year warranty.'
  },
  {
    id: 34,
    name: '27" UltraGear™ FHD 180Hz gaming monitor',
    category: 'Electronics',
    images: ['https://www.lg.com/content/dam/channel/wcms/uk/monitor/gaming/27gs50f-b/gallery/ultragear-27gs50f-gallery-01-2010.jpg/_jcr_content/renditions/thum-1600x1062.jpeg'],
    price: 11159,
    desc: 'HD monitor.',
    rating: 4.4,
    reviews: 156,
    quantity: '',
    about: 'UltraGear™ FHD monitor offers a smooth gaming experience with 180Hz refresh rate.',
    benefits: [
      'High refresh rate for smooth visuals',
      'Full HD resolution',
      'Low input lag',
      'Adjustable stand',
      'Multiple connectivity options',
    ],
    extra: 'Ideal for gaming and professional use. Includes HDMI cable.'
  },
  {
    id: 35,
    name: 'RPM Euro Games Gaming Keyboard Wired ',
    category: 'Electronics',
    images: ['https://m.media-amazon.com/images/I/41rcVdtmKAL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 29,
    desc: 'Mechanical keyboard.',
    rating: 4.2,
    reviews: 78,
    quantity: '',
    about: 'RPM Euro Games keyboard is designed for gamers and typists.',
    benefits: [
      'Mechanical keys for tactile feedback',
      'RGB lighting',
      'Ergonomic design',
      'Durable build',
      'Plug and play',
    ],
    extra: 'Compatible with Windows and Mac. 6-month warranty.'
  },
  {
    id: 36,
    name: 'Mouse',
    category: 'Electronics',
    images: ['https://m.media-amazon.com/images/I/41gVECjYPRL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 19,
    desc: 'Wireless mouse.',
    discount: 8,
    rating: 4.1,
    reviews: 56,
    quantity: '',
    about: 'Wireless mouse for smooth navigation and productivity.',
    benefits: [
      'Wireless connectivity',
      'Ergonomic design',
      'Long battery life',
      'High precision sensor',
      'Plug and play',
    ],
    extra: 'Compatible with laptops and desktops. Includes battery.'
  },
  {
    id: 37,
    name: 'Oneplus Bullets Z2 Anc Boomin - Black ',
    category: 'Electronics',
    images: ['https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/caf27162-5a1e-4602-8fe6-e113b5b55fed/Oneplus-Bullets-Z2-Anc-Boomin-Black.jpg'],
    price: 429,
    desc: 'wireless bluetooth.',
    rating: 4.3,
    reviews: 112,
    quantity: '',
    about: 'Oneplus Bullets Z2 offers high-quality sound and ANC for immersive listening.',
    benefits: [
      'Active noise cancellation',
      'Long battery life',
      'Fast charging',
      'Comfortable fit',
      'Bluetooth 5.0',
    ],
    extra: 'Ideal for music, calls, and workouts. Includes charging cable.'
  },
  {
    id: 38,
    name: 'boAt Nirvana Ion Anc Pro',
    category: 'Electronics',
    images: ['https://cdn.zeptonow.com/production/ik-seo/tr:w-1280,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/ede6feb9-5a32-46e4-835f-be49a38dd79a/boAt-Nirvana-Ion-Anc-Pro-W-Hi-Res-Audio-With-Ldac-Anc-120-Hrs-Rose-Quartz-.jpeg'],
    price: 219,
    desc: 'W Hi-Res Audio With Ldac, Anc, 120 Hrs (Rose Quartz).',
    discount: 1,
    rating: 4.2,
    reviews: 89,
    quantity: '',
    about: 'boAt Nirvana Ion Anc Pro delivers hi-res audio and long battery life.',
    benefits: [
      'Hi-Res audio quality',
      'Active noise cancellation',
      '120 hours battery life',
      'Bluetooth connectivity',
      'Comfortable fit',
    ],
    extra: 'Perfect for travel and music lovers. Includes charging cable.'
  },
  {
    id: 39,
    name: 'Samsung 32" Full HD LED Smart TV',
    category: 'Electronics',
    images: ['https://clefdesol.com/cdn/shop/products/501973_1_600x.jpg?v=1656339064'],
    price: 31239,
    desc: 'Samsung 32" TV.',
    rating: 4.5,
    reviews: 234,
    quantity: '',
    about: 'Samsung 32" Full HD LED Smart TV offers vibrant visuals and smart features.',
    benefits: [
      'Full HD LED display',
      'Smart TV features',
      'Multiple HDMI/USB ports',
      'Energy efficient',
      'Built-in WiFi',
    ],
    extra: 'Ideal for home entertainment. Includes remote and wall mount.'
  },
  
  // Home
  {
    id: 40,
    name: 'Toaster',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/717nwkwO+CL._SX679_.jpg'],
    price: 2125,
    desc: '2-slice toaster.',
    discount: 5,
    rating: 4.2,
    reviews: 576,
    quantity: '',
    about: 'A compact 2-slice toaster for quick and easy breakfasts.',
    benefits: [
      'Even toasting',
      'Adjustable browning control',
      'Easy to clean',
      'Cool-touch exterior',
      'Auto shut-off',
    ],
    extra: 'Perfect for bread, bagels, and more. 1-year warranty included.'
  },
  {
    id: 41,
    name: 'Prestige Mixer Grinder',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/51089QVhlzL._SX679_.jpg'],
    price: 3049,
    desc: 'Multi-purpose mixer.',
    rating: 4.3,
    reviews: 489,
    quantity: '',
    about: 'Prestige Mixer Grinder is ideal for grinding, blending, and mixing.',
    benefits: [
      'Powerful motor',
      'Multiple jars',
      'Easy to clean',
      'Overload protection',
      'Durable build',
    ],
    extra: 'Suitable for all kitchen needs. 2-year warranty.'
  },
  {
    id: 42,
    name: 'Tefal Eco Master Iron',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/31mfVp4RpJL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 1519,
    desc: 'Steam iron.',
    rating: 4.1,
    reviews: 312,
    quantity: '',
    about: 'Tefal Eco Master Iron provides efficient and eco-friendly ironing.',
    benefits: [
      'Quick heating',
      'Non-stick soleplate',
      'Steam burst function',
      'Lightweight design',
      'Energy efficient',
    ],
    extra: 'Ideal for all fabrics. 1-year warranty.'
  },
  {
    id: 43,
    name: 'Wet and Dry Vacuum Cleaner',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/71WvLsRGIrL._SX679_.jpg'],
    price: 3289,
    desc: 'Handheld vacuum cleaner.',
    rating: 4.2,
    reviews: 278,
    quantity: '',
    about: 'Wet and Dry Vacuum Cleaner for versatile home cleaning.',
    benefits: [
      'Powerful suction',
      'Wet and dry cleaning',
      'Easy to maneuver',
      'Large capacity',
      'Low noise operation',
    ],
    extra: 'Suitable for carpets, floors, and cars. 1-year warranty.'
  },
  {
    id: 44,
    name: 'Havells Ventil Air Exhaust Fan',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/51k-U26z8LL._SX679_.jpg'],
    price: 629,
    desc: 'Table fan.',
    rating: 4.0,
    reviews: 156,
    quantity: '',
    about: 'Havells Ventil Air Exhaust Fan keeps your space cool and ventilated.',
    benefits: [
      'High-speed motor',
      'Low power consumption',
      'Easy installation',
      'Durable build',
      'Quiet operation',
    ],
    extra: 'Ideal for kitchens and bathrooms. 2-year warranty.'
  },
  {
    id: 45,
    name: 'omesake® Lamp, Table Lamp',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/41ys9f7hMGL._SY445_SX342_QL70_FMwebp_.jpg'],
    price: 515,
    desc: 'LED lamp.',
    rating: 4.2,
    reviews: 98,
    quantity: '',
    about: 'omesake® Table Lamp provides bright and energy-efficient lighting.',
    benefits: [
      'LED technology',
      'Adjustable brightness',
      'Modern design',
      'Low power consumption',
      'Long lifespan',
    ],
    extra: 'Perfect for study, work, or bedside. 1-year warranty.'
  },
  {
    id: 46,
    name: 'Wakefit Classic Memory Foam Mattress',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/41uv2+9eelL._SY300_SX300_.jpg'],
    price: 999,
    desc: 'Comfortable mattress.',
    rating: 4.3,
    reviews: 156,
    quantity: '',
    about: 'Wakefit Classic Memory Foam Mattress offers superior comfort and support.',
    benefits: [
      'Memory foam for body support',
      'Breathable fabric',
      'Anti-dust mite',
      'Durable build',
      'Easy to clean',
    ],
    extra: 'Ideal for restful sleep. 5-year warranty.'
  },
  {
    id: 47,
    name: 'Decor Modern Wave Curtains',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/81EdoMnAyCL._SX679_.jpg'],
    price: 224,
    desc: 'Window curtains.',
    rating: 4.1,
    reviews: 78,
    quantity: '',
    about: 'Decor Modern Wave Curtains add style and privacy to your home.',
    benefits: [
      'High-quality fabric',
      'Easy to install',
      'Blocks sunlight',
      'Machine washable',
      'Modern design',
    ],
    extra: 'Suitable for living rooms and bedrooms.'
  },
  {
    id: 48,
    name: 'MY ARMOR Cervical Pillow',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/619+Gb5UBsL._SX679_.jpg'],
    price: 312,
    desc: 'Soft pillow.',
    rating: 4.2,
    reviews: 56,
    quantity: '',
    about: 'MY ARMOR Cervical Pillow provides ergonomic support for neck and spine.',
    benefits: [
      'Ergonomic design',
      'Soft and comfortable',
      'Breathable fabric',
      'Anti-allergy',
      'Easy to clean',
    ],
    extra: 'Ideal for restful sleep and neck pain relief.'
  },
  {
    id: 49,
    name: 'Roseate Flower Super Soft',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/51zK-+vI5yL._SY300_SX300_.jpg'],
    price: 699,
    desc: 'Comfortable mattress.',
    rating: 4.1,
    reviews: 67,
    quantity: '',
    about: 'Roseate Flower Super Soft mattress offers plush comfort and support.',
    benefits: [
      'Plush surface',
      'Breathable material',
      'Durable build',
      'Easy to clean',
      'Anti-dust mite',
    ],
    extra: 'Perfect for restful sleep. 3-year warranty.'
  },
  {
    id: 50,
    name: 'Crafts Beautiful Fold-able Table',
    category: 'Home',
    images: ['https://images-na.ssl-images-amazon.com/images/I/31NJkTq39ZL._SY300_SX300_QL70_FMwebp_.jpg'],
    price: 524,
    desc: 'Foldable table.',
    rating: 4.2,
    reviews: 34,
    quantity: '',
    about: 'Crafts Beautiful Fold-able Table is convenient for small spaces and easy storage.',
    benefits: [
      'Foldable design',
      'Lightweight',
      'Durable build',
      'Easy to clean',
      'Multi-purpose use',
    ],
    extra: 'Ideal for study, work, or dining.'
  },
  {
    id: 51,
    name: 'Meditating Sitting Buddha Statue',
    category: 'Home',
    images: ['https://m.media-amazon.com/images/I/51avZ+t0T9L._SY300_SX300_.jpg'],
    price: 212,
    desc: 'Decorative statue.',
    rating: 4.3,
    reviews: 12,
    quantity: '',
    about: 'Meditating Sitting Buddha Statue brings peace and positivity to your home.',
    benefits: [
      'Handcrafted design',
      'Durable material',
      'Elegant finish',
      'Easy to clean',
      'Symbol of peace',
    ],
    extra: 'Perfect for living rooms, meditation spaces, or gifting.'
  },
  {
    id: 52,
    name: 'Blender',
    category: 'Home',
    images: ['https://www.vidiem.in/uploads/images/Zap_Pro_Hand_blender_11.jpg'],
    price: 1139,
    desc: 'Powerful kitchen blender.',
    discount: 10,
    rating: 4.2,
    reviews: 89,
    quantity: '',
    about: 'Blender is a powerful kitchen appliance for smoothies, soups, and more.',
    benefits: [
      'High-speed motor',
      'Easy to clean',
      'Multiple speed settings',
      'Durable build',
      'Compact design',
    ],
    extra: 'Includes blending jar and accessories. 1-year warranty.'
  },
  
  
  // Dairy
 {
  id: 53,
  name: 'Heritage Toned Fresh Milk',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/815V9EawbJL._AC_UL480_FMwebp_QL65_.jpg'],
  price: 60,
  desc: 'Fresh dairy milk.',
  rating: 4.3,
  reviews: 112,
  quantity: '1L',
  about: 'Heritage Toned Fresh Milk is rich in calcium and protein, perfect for daily nutrition.',
  benefits: [
    'High in calcium for bone health',
    'Good source of protein',
    'Supports growth and development',
    'Fresh and pure',
    'Versatile for cooking and drinking',
  ],
  extra: 'Store refrigerated. Best for tea, coffee, and desserts.'
},
{
  id: 54,
  name: 'Amul Cheese Easy Open Chiple',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/71JIA49IdYL._SX679_.jpg'],
  price: 300,
  desc: 'Cheddar cheese.',
  discount: 10,
  rating: 4.4,
  reviews: 89,
  quantity: '200g',
  about: 'Amul Cheese is a delicious cheddar cheese, easy to open and use.',
  benefits: [
    'Rich in calcium',
    'Good source of protein',
    'Enhances flavor of dishes',
    'Easy to use packaging',
    'Versatile for cooking',
  ],
  extra: 'Perfect for sandwiches, pizzas, and snacks.'
},
{
  id: 55,
  name: 'Amul Butter Salted',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/61duEBwvXdL._SX679_.jpg'],
  price: 122,
  desc: 'Creamy butter.',
  discount: 5,
  rating: 4.2,
  reviews: 76,
  quantity: '500g',
  about: 'Amul Butter Salted is creamy and delicious, perfect for spreading and cooking.',
  benefits: [
    'Rich flavor',
    'Easy to spread',
    'Enhances taste of food',
    'Good source of fat',
    'Versatile for baking and cooking',
  ],
  extra: 'Store refrigerated. Use for toast, baking, and curries.'
},
{
  id: 56,
  name: 'Milky Mist Greek Yogurt',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/41l9uB8x+WL._SY300_SX300_.jpg'],
  price: 205,
  desc: 'Natural yogurt.',
  rating: 4.5,
  reviews: 54,
  quantity: '400g',
  about: 'Milky Mist Greek Yogurt is thick, creamy, and packed with probiotics.',
  benefits: [
    'Supports digestive health',
    'High in protein',
    'Low in fat',
    'Contains probiotics',
    'Great for breakfast and snacks',
  ],
  extra: 'Store refrigerated. Enjoy plain or with fruits.'
},
{
  id: 57,
  name: 'Amul Fresh Paneer Block Pouch',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/81hD14MN91L._SX679_.jpg'],
  price: 97,
  desc: 'Fresh paneer.',
  rating: 4.4,
  reviews: 32,
  quantity: '200g',
  about: 'Amul Fresh Paneer is soft and nutritious, ideal for Indian dishes.',
  benefits: [
    'High in protein',
    'Supports muscle growth',
    'Soft texture',
    'Versatile for cooking',
    'Low in fat',
  ],
  extra: 'Store refrigerated. Use in curries, snacks, and salads.'
},
{
  id: 58,
  name: 'Amul Fresh Cream',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/71MNq8ICMNL._SY879_.jpg'],
  price: 230,
  desc: 'Rich cream.',
  rating: 4.3,
  reviews: 21,
  quantity: '1L',
  about: 'Amul Fresh Cream is rich and smooth, perfect for desserts and curries.',
  benefits: [
    'Enhances texture of dishes',
    'Rich and creamy',
    'Easy to use',
    'Good source of fat',
    'Versatile for cooking',
  ],
  extra: 'Store refrigerated. Use for desserts, curries, and baking.'
},
{
  id: 59,
  name: 'ROSIER A2 Gir Cow Ghee',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/71pYpkxrg4L._SX679_.jpg'],
  price: 600,
  desc: 'Pure ghee.',
  rating: 4.5,
  reviews: 67,
  quantity: '1kg',
  about: 'ROSIER A2 Gir Cow Ghee is pure and aromatic, made from Gir cow milk.',
  benefits: [
    'Rich in healthy fats',
    'Supports digestion',
    'Enhances flavor of food',
    'Good for cooking and frying',
    'Aromatic and pure',
  ],
  extra: 'Store in a cool place. Use for cooking, frying, and desserts.'
},
{
  id: 60,
  name: 'Amul Kool Liquid Lassi',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/71yyhsMFmTL._SX679_.jpg'],
  price: 70,
  desc: 'Sweet lassi.',
  rating: 4.2,
  reviews: 45,
  quantity: '200ml',
  about: 'Amul Kool Liquid Lassi is a refreshing and sweet yogurt drink.',
  benefits: [
    'Supports digestive health',
    'Refreshing taste',
    'Low in fat',
    'Good source of calcium',
    'Ready to drink',
  ],
  extra: 'Store refrigerated. Enjoy chilled.'
},
{
  id: 61,
  name: 'Godrej Jersey Curd Pouch',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/71CHr8OZQ5L._SX679_.jpg'],
  price: 40,
  desc: 'Homemade curd.',
  rating: 4.3,
  reviews: 29,
  quantity: '500ml',
  about: 'Godrej Jersey Curd is thick and creamy, perfect for Indian meals.',
  benefits: [
    'Supports digestive health',
    'High in calcium',
    'Creamy texture',
    'Low in fat',
    'Versatile for cooking',
  ],
  extra: 'Store refrigerated. Use for curries, snacks, and desserts.'
},
{
  id: 62,
  name: 'Heritage Strawberry Milkshake',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/51YWJgtQNNL._SX679_.jpg'],
  price: 35,
  desc: 'Strawberry milkshake.',
  rating: 4.4,
  reviews: 18,
  quantity: '200ml',
  about: 'Heritage Strawberry Milkshake is a delicious and refreshing drink.',
  benefits: [
    'Rich in calcium',
    'Refreshing taste',
    'Low in fat',
    'Ready to drink',
    'Good source of energy',
  ],
  extra: 'Store refrigerated. Enjoy chilled.'
},
{
  id: 63,
  name: 'Kwality Walls Cornetto Ice Cream',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/31VkVoYXbIL._SX300_SY300_QL70_FMwebp_.jpg'],
  price: 40,
  desc: 'Chocolate ice cream.',
  rating: 4.5,
  reviews: 56,
  quantity: '120ml',
  about: 'Kwality Walls Cornetto Ice Cream is creamy and delicious, perfect for dessert.',
  benefits: [
    'Rich and creamy texture',
    'Delicious chocolate flavor',
    'Ready to eat',
    'Good source of energy',
    'Perfect for summer',
  ],
  extra: 'Store frozen. Enjoy as a treat or dessert.'
},
{
  id: 64,
  name: 'Puramate Whipped Cream Powder',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/61HRl1174YL._SX679_.jpg'],
  price: 100,
  desc: 'Fresh whipped cream.',
  rating: 4.2,
  reviews: 34,
  quantity: '100g',
  about: 'Puramate Whipped Cream Powder makes light and fluffy whipped cream easily.',
  benefits: [
    'Easy to prepare',
    'Light and fluffy texture',
    'Enhances desserts',
    'Good source of fat',
    'Versatile for baking',
  ],
  extra: 'Store in a cool place. Use for cakes, pastries, and desserts.'
},
{
  id: 65,
  name: 'Milkmaid Nestle Condensed',
  category: 'Dairy',
  images: ['https://m.media-amazon.com/images/I/71-YmW3qseL._SX679_.jpg'],
  price: 135,
  desc: 'Sweet condensed milk.',
  rating: 4.3,
  reviews: 22,
  quantity: '400g',
  about: 'Milkmaid Nestle Condensed is sweet and creamy, perfect for desserts.',
  benefits: [
    'Enhances flavor of desserts',
    'Rich and creamy',
    'Easy to use',
    'Good source of energy',
    'Versatile for baking',
  ],
  extra: 'Store in a cool place. Use for cakes, sweets, and beverages.'
},

  // Bakery
  {
    id: 66,
    name: 'Britannia Brown Bread',
    category: 'Bakery',
    images: ['https://m.media-amazon.com/images/I/41fpnNq+aEL._SY300_SX300_.jpg'],
    price: 70,
    desc: 'Soft bakery bread.',
    stock: 0,
    rating: 4.2,
    reviews: 56,
    quantity: '400g', // <-- added
    about: 'Britannia Brown Bread is soft, healthy, and perfect for sandwiches.',
    benefits: [
      'High in fiber',
      'Low in fat',
      'Soft texture',
      'No added preservatives',
      'Good for breakfast and snacks',
    ],
    extra: 'Store in a cool, dry place. Use for sandwiches and toast.'
  },
  {
    id: 67,
    name: 'Merba Nougatelli Cookies',
    category: 'Bakery',
    images: ['https://m.media-amazon.com/images/I/51vGoGPUafL._SY300_SX300_QL70_FMwebp_.jpg'],
    price: 400,
    desc: 'Buttery croissant.',
    rating: 4.3,
    reviews: 34,
    quantity: '200g', // <-- added
    about: 'Merba Nougatelli Cookies are rich, buttery, and filled with nougat.',
    benefits: [
      'Rich flavor',
      'Soft and chewy texture',
      'No artificial colors',
      'Perfect for tea time',
      'Ready to eat',
    ],
    extra: 'Store in an airtight container. Enjoy as a snack.'
  },
  {
    id: 68,
    name: 'Urban Platter Everything Bagel Seasoning',
    category: 'Bakery',
    images: ['https://m.media-amazon.com/images/I/71tYMXmPmCL._AC_UL480_FMwebp_QL65_.jpg'],
    price: 250,
    desc: 'Fresh bagel.',
    rating: 4.4,
    reviews: 21,
    about: 'Urban Platter Everything Bagel Seasoning adds flavor to bagels and more.',
    benefits: [
      'Enhances taste',
      'Versatile seasoning',
      'No added MSG',
      'Easy to use',
      'Perfect for baking',
    ],
    extra: 'Store in a cool, dry place. Use for bagels, breads, and snacks.'
  },
  {
    id: 69,
    name: 'Skippi Eggless Muffins',
    category: 'Bakery',
    images: ['https://m.media-amazon.com/images/I/71OnK3DDFmL._SX679_PIbundle-8,TopRight,0,0_SX679SY587SH20_.jpg'],
    price: 299,
    desc: 'Chocolate muffin.',
    rating: 4.5,
    reviews: 18,
    quantity: '200g', // <-- added
    about: 'Skippi Eggless Muffins are soft, moist, and perfect for dessert.',
    benefits: [
      'Eggless recipe',
      'Rich chocolate flavor',
      'Soft and moist texture',
      'No artificial flavors',
      'Ready to eat',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack or dessert.'
  },
  {
    id: 70,
    name: 'kidys Bakery Donut Cake',
    category: 'Bakery',
    images: ['https://m.media-amazon.com/images/I/51BLcUjvEeL._SX679_.jpg'],
    price: 199,
    desc: 'Chocolate donut.',
    rating: 4.2,
    reviews: 45,
    quantity: '1 piece', // <-- added
    about: 'kidys Bakery Donut Cake is a delicious chocolate donut for sweet cravings.',
    benefits: [
      'Rich chocolate flavor',
      'Soft texture',
      'No artificial colors',
      'Ready to eat',
      'Perfect for parties',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a treat.'
  },
  {
    id: 71,
    name: 'Bun',
    category: 'Bakery',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Sesame_seed_hamburger_buns.jpg/500px-Sesame_seed_hamburger_buns.jpg'],
    price: 29,
    desc: 'Soft bun.',
    rating: 4.3,
    reviews: 29,
    quantity: '4 pieces', // <-- added
    about: 'Soft bun is perfect for burgers, sandwiches, and snacks.',
    benefits: [
      'Soft texture',
      'No added preservatives',
      'Versatile use',
      'Low in fat',
      'Ready to eat',
    ],
    extra: 'Store in a cool, dry place. Use for burgers and sandwiches.'
  },
  {
    id: 72,
    name: 'Rose Paradise Chocolate Cake',
    category: 'Bakery',
    images: ['https://www.fnp.com//images/pr/l/v20241007112108/rose-paradise-chocolate-cake-half-kg_1.jpg'],
    price: 499,
    desc: 'Chocolate cake.',
    discount: 10,
    rating: 4.4,
    reviews: 67,
    quantity: '500g', // <-- added
    about: 'Rose Paradise Chocolate Cake is rich, moist, and perfect for celebrations.',
    benefits: [
      'Rich chocolate flavor',
      'Moist texture',
      'No artificial flavors',
      'Perfect for parties',
      'Ready to eat',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a dessert.'
  },
  {
    id: 73,
    name: 'Bakery Fresh 8 Inch Apple Pie',
    category: 'Bakery',
    images: ['https://www.kroger.com/product/images/xlarge/front/0001111027011'],
    price: 80,
    desc: 'Apple pie.',
    rating: 4.2,
    reviews: 34,
    quantity: '1 pie', // <-- added
    about: 'Bakery Fresh 8 Inch Apple Pie is filled with juicy apples and a flaky crust.',
    benefits: [
      'Juicy apple filling',
      'Flaky crust',
      'No artificial flavors',
      'Ready to eat',
      'Perfect for dessert',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a dessert or snack.'
  },
  {
    id: 74,
    name: 'Chatpata Aloo Cheese Puff',
    category: 'Bakery',
    images: ['https://cdn.uengage.io/uploads/7175/image-U8F561-1687353758.jpg'],
    price: 29,
    desc: 'Veg puff.',
    rating: 4.3,
    reviews: 21,
    quantity: '2 pieces', // <-- added
    about: 'Chatpata Aloo Cheese Puff is a spicy and cheesy snack for all ages.',
    benefits: [
      'Spicy potato filling',
      'Cheesy flavor',
      'Flaky pastry',
      'Ready to eat',
      'Perfect for tea time',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  {
    id: 75,
    name: 'Bakery Swiss Roll Cake',
    category: 'Bakery',
    images: ['https://drivemehungry.com/wp-content/uploads/2019/01/swiss-roll-cake-recipe.jpg'],
    price: 45,
    desc: 'Swiss roll.',
    rating: 4.4,
    reviews: 18,
    quantity: '200g', // <-- added
    about: 'Bakery Swiss Roll Cake is soft, creamy, and perfect for dessert.',
    benefits: [
      'Soft sponge cake',
      'Creamy filling',
      'No artificial flavors',
      'Ready to eat',
      'Perfect for parties',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a dessert.'
  },
  {
    id: 76,
    name: 'Chocolate Chip Cookies',
    category: 'Bakery',
    images: ['https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg'],
    price: 55,
    desc: 'Chocolate chip cookies.',
    rating: 4.2,
    reviews: 45,
    quantity: '200g', // <-- added
    about: 'Chocolate Chip Cookies are loaded with chocolate chips and baked to perfection.',
    benefits: [
      'Loaded with chocolate chips',
      'Soft and chewy texture',
      'No artificial flavors',
      'Ready to eat',
      'Perfect for snacks',
    ],
    extra: 'Store in an airtight container. Enjoy as a snack.'
  },
  {
    id: 77,
    name: 'Chocolate Brownie',
    category: 'Bakery',
    images: ['https://icecreambakery.in/wp-content/uploads/2024/12/Brownie-Recipe-with-Cocoa-Powder.jpg'],
    price: 89,
    desc: 'Fudgy brownie.',
    discount: 3,
    rating: 4.3,
    reviews: 29,
    quantity: '150g', // <-- added
    about: 'Chocolate Brownie is rich, fudgy, and perfect for chocolate lovers.',
    benefits: [
      'Rich chocolate flavor',
      'Fudgy texture',
      'No artificial flavors',
      'Ready to eat',
      'Perfect for dessert',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a dessert.'
  },
  {
    id: 78,
    name: 'Eggless Black Forest Pastry',
    category: 'Bakery',
    images: ['https://j6e2i8c9.delivery.rocketcdn.me/wp-content/uploads/2021/05/Eggless-Black-forest-Pastry-recipe-1.jpg'],
    price: 70,
    desc: 'Fresh pastry.',
    rating: 4.4,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'Eggless Black Forest Pastry is soft, creamy, and topped with cherries.',
    benefits: [
      'Eggless recipe',
      'Soft sponge cake',
      'Creamy filling',
      'Topped with cherries',
      'Ready to eat',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a dessert.'
  },
  // Snacks
  {
    id: 79,
    name: 'Bingo! Original Style Chilli',
    category: 'Snacks',
    images: ['https://m.media-amazon.com/images/I/51J5yUMLdgL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 30,
    desc: 'Crunchy potato chips.',
    discount: 20,
    rating: 4.4,
    reviews: 56,
    quantity: '150g', // <-- added
    about: 'Bingo! Original Style Chilli chips are spicy, crunchy, and perfect for snacking.',
    benefits: [
      'Spicy flavor',
      'Crunchy texture',
      'Ready to eat',
      'No artificial colors',
      'Perfect for parties',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  {
    id: 80,
    name: 'Bingo Nachos Cheese',
    category: 'Snacks',
    images: ['https://m.media-amazon.com/images/I/81suaNppDXL._SX679_.jpg'],
    price: 35,
    desc: 'Cheesy nachos.',
    rating: 4.3,
    reviews: 34,
    quantity: '150g', // <-- added
    about: 'Bingo Nachos Cheese are crispy nachos with a cheesy flavor.',
    benefits: [
      'Cheesy taste',
      'Crunchy texture',
      'No artificial flavors',
      'Ready to eat',
      'Perfect for movie nights',
    ],
    extra: 'Store in a cool, dry place. Enjoy with dips.'
  },
  {
    id: 81,
    name: 'Popcorn, Microwave Bag, Butter',
    category: 'Snacks',
    images: ['https://m.media-amazon.com/images/I/51DCUsx1lzL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 35,
    desc: 'Butter popcorn.',
    rating: 4.2,
    reviews: 21,
    quantity: '100g', // <-- added
    about: 'Microwave Butter Popcorn is easy to prepare and perfect for movie time.',
    benefits: [
      'Buttery flavor',
      'Quick to prepare',
      'No artificial colors',
      'Ready to eat',
      'Perfect for parties',
    ],
    extra: 'Store in a cool, dry place. Enjoy hot.'
  },
  {
    id: 82,
    name: 'Peanut Butter cookies',
    category: 'Snacks',
    images: ['https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/bltcc24f9240bd22739/678fe6b18926c55970037196/cookie-types-peanut-butter-cookies.webp?q=70&width=1920&auto=webp'],
    price: 69,
    desc: 'Butter cookies.',
    rating: 4.3,
    reviews: 18,
    quantity: '200g', // <-- added
    about: 'Peanut Butter cookies are soft, chewy, and packed with peanut flavor.',
    benefits: [
      'Rich peanut flavor',
      'Soft texture',
      'No artificial flavors',
      'Ready to eat',
      'Perfect for snacks',
    ],
    extra: 'Store in an airtight container. Enjoy as a snack.'
  },
  {
    id: 83,
    name: 'Indian Punjabi Samosa Recipe',
    category: 'Snacks',
    images: ['https://www.cubesnjuliennes.com/wp-content/uploads/2020/08/Best-Indian-Punjabi-Samosa-Recipe.jpg'],
    price: 69,
    desc: 'Crispy samosa.',
    rating: 4.4,
    reviews: 45,
    quantity: '4 pieces', // <-- added
    about: 'Indian Punjabi Samosa is a crispy, spicy snack filled with potatoes and peas.',
    benefits: [
      'Spicy filling',
      'Crispy pastry',
      'Ready to eat',
      'Perfect for tea time',
      'No artificial colors',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  {
    id: 84,
    name: 'Mixture',
    category: 'Snacks',
    images: ['https://www.gracebakery.in/_next/image?url=%2Fimages%2Fmixture.webp&w=1080&q=75'],
    price: 59,
    desc: 'Spicy mixture.',
    rating: 4.2,
    reviews: 29,
    quantity: '200g', // <-- added
    about: 'Mixture is a spicy, crunchy blend of sev, nuts, and spices.',
    benefits: [
      'Spicy flavor',
      'Crunchy texture',
      'Ready to eat',
      'No artificial colors',
      'Perfect for snacks',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  {
    id: 85,
    name: 'Murukku',
    category: 'Snacks',
    images: ['https://www.yummytummyaarthi.com/wp-content/uploads/2014/08/1-42.jpg'],
    price: 69,
    desc: 'South Indian murukku.',
    rating: 4.3,
    reviews: 34,
    quantity: '200g', // <-- added
    about: 'Murukku is a traditional South Indian snack, crunchy and savory.',
    benefits: [
      'Crunchy texture',
      'Savory flavor',
      'No artificial colors',
      'Ready to eat',
      'Perfect for tea time',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  {
    id: 86,
    name: 'Kurkure',
    category: 'Snacks',
    images: ['https://www.quickpantry.in/cdn/shop/products/kurkure-masala-munch-45-g-quick-pantry.jpg?v=1710539165'],
    price: 19,
    desc: 'Masala kurkure.',
    rating: 4.2,
    reviews: 21,
    quantity: '45g', // <-- added
    about: 'Kurkure is a spicy, crunchy snack loved by all ages.',
    benefits: [
      'Spicy flavor',
           'Crunchy texture',
      'Ready to eat',
      'No artificial colors',
      'Perfect for parties',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  {
    id: 87,
    name: 'Haldirams Nagpur Whole Salted Peanuts',
    category: 'Snacks',
    images: ['https://m.media-amazon.com/images/I/51MZjk+zs8L._SY300_SX300_.jpg'],
    price: 59,
    desc: 'Salted Peanuts.',
    rating: 4.3,
    reviews: 18,
    quantity: '200g', // <-- added
    about: 'Haldirams Nagpur Whole Salted Peanuts are crunchy and perfectly salted.',
    benefits: [
      'Crunchy texture',
      'Rich in protein',
      'Ready to eat',
      'No artificial colors',
      'Perfect for snacks',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  {
    id: 88,
    name: 'Sev',
    category: 'Snacks',
    images: ['https://www.seema.com/wp-content/uploads/2022/06/Sev-Recipe.jpg'],
    price: 89,
    desc: 'Crispy sev.',
    rating: 4.4,
    reviews: 45,
    quantity: '200g', // <-- added
    about: 'Sev is a crispy, savory snack made from gram flour.',
    benefits: [
      'Crispy texture',
      'Savory flavor',
      'No artificial colors',
      'Ready to eat',
      'Perfect for snacks',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack or topping.'
  },
  {
    id: 89,
    name: 'Haldiram Namkeen',
    category: 'Snacks',
    images: ['https://www.haldiramuk.com/cdn/shop/files/fop_2fe2367c-a74a-4197-af7a-3af902c6ead0.png?v=1718873956'],
    price: 45,
    desc: 'Mixed namkeen.',
    rating: 4.2,
    reviews: 29,
    quantity: '150g', // <-- added
    about: 'Haldiram Namkeen is a mix of crunchy, spicy snacks for all occasions.',
    benefits: [
      'Spicy flavor',
      'Crunchy texture',
      'Ready to eat',
      'No artificial colors',
      'Perfect for parties',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  {
    id: 90,
    name: 'Nutella Biscuits',
    category: 'Snacks',
    images: ['https://maverickessentials.in/cdn/shop/products/Nutella-Biscuits-414g-Image-1-Zoom-image_510x_2x.progressive_ade61f81-0230-4c33-bc3c-ec9fbe47e7d3.webp?v=1674393210'],
    price: 50,
    desc: 'Sweet biscuits.',
    rating: 4.3,
    reviews: 34,
    quantity: '150g', // <-- added
    about: 'Nutella Biscuits are sweet, crunchy, and filled with Nutella cream.',
    benefits: [
      'Nutella cream filling',
      'Crunchy texture',
      'No artificial flavors',
      'Ready to eat',
      'Perfect for snacks',
    ],
    extra: 'Store in an airtight container. Enjoy as a snack.'
  },
  {
    id: 91,
    name: 'Dukes Waffy Chocolate Wafers',
    category: 'Snacks',
    images: ['https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/5/27/e8e1ba4c-e976-44d2-95e4-b3145a07902c_330_1.png'],
    price: 1.39,
    desc: 'Crispy wafers.',
    discount: 2,
    rating: 4.2,
    reviews: 18,
    quantity: '100g', // <-- added
    about: 'Dukes Waffy Chocolate Wafers are crispy, chocolatey, and perfect for snacking.',
    benefits: [
      'Chocolate flavor',
      'Crispy texture',
      'No artificial colors',
      'Ready to eat',
      'Perfect for snacks',
    ],
    extra: 'Store in a cool, dry place. Enjoy as a snack.'
  },
  // Beverages
  {
    id: 92,
    name: 'Real Apple Fruit Juice -1L',
    category: 'Beverages',
    images: ['https://m.media-amazon.com/images/I/81aOnfUcb6L._SX679_.jpg'],
    price: 199,
    desc: 'Fresh fruit juice.',
    rating: 4.5,
    reviews: 42,
    quantity: '1L', // <-- added
    about: 'Real Apple Fruit Juice is made from fresh apples, rich in vitamins and antioxidants.',
    benefits: [
      'Rich in Vitamin C',
      'No added preservatives',
      'Refreshing taste',
      'Supports hydration',
      'Great for breakfast',
    ],
    extra: 'Shake well before use. Refrigerate after opening.'
  },
  {
    id: 93,
    name: 'Kinley Strong Soda Original',
    category: 'Beverages',
    images: ['https://m.media-amazon.com/images/I/41akRAbexAL._SX679_.jpg'],
    price: 20,
    desc: 'Sparkling soda.',
    rating: 4.2,
    reviews: 18,
    quantity: '700ml', // <-- added
    about: 'Kinley Strong Soda is a refreshing, sparkling beverage perfect for mixing.',
    benefits: [
      'Sparkling refreshment',
      'No added sugar',
      'Great mixer',
      'Zero calories',
      'Ready to drink',
    ],
    extra: 'Serve chilled. Store in a cool place.'
  },
  {
    id: 94,
    name: 'Thums Up Cola',
    category: 'Beverages',
    images: ['https://m.media-amazon.com/images/I/31HIT7xFnOL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 19,
    desc: 'Chilled cola.',
    rating: 4.3,
    reviews: 29,
    quantity: '200ml', // <-- added
    about: 'Thums Up Cola is a bold, fizzy drink with a unique taste.',
    benefits: [
      'Bold flavor',
      'Fizzy refreshment',
      'Ready to drink',
      'Perfect for parties',
      'Serve chilled',
    ],
    extra: 'Best served cold. Store in a cool place.'
  },
  {
    id: 95,
    name: 'Lemonie Sugar-free Lemonade',
    category: 'Beverages',
    images: ['https://m.media-amazon.com/images/I/417Rotzl7iL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 299,
    desc: 'Refreshing lemonade.',
    discount: 5,
    rating: 4.4,
    reviews: 34,
    quantity: '50ml', // <-- added
    about: 'Lemonie Sugar-free Lemonade is a refreshing, guilt-free drink.',
    benefits: [
      'Sugar-free',
      'Refreshing taste',
      'Low calorie',
      'Supports hydration',
      'Ready to drink',
    ],
    extra: 'Serve chilled. Store in a cool place.'
  },
  {
    id: 96,
    name: 'Lemon Mint Ice Tea',
    category: 'Beverages',
    images: ['https://e-srdc.com/api/assets/item_images/18-1-min'],
    price: 49,
    desc: 'Lemon tea.',
    rating: 4.3,
    reviews: 21,
    quantity: '50ml', // <-- added
    about: 'Lemon Mint Ice Tea is a cool, refreshing blend of lemon and mint.',
    benefits: [
      'Refreshing taste',
      'Contains antioxidants',
      'Supports hydration',
      'Ready to drink',
      'Serve chilled',
    ],
    extra: 'Shake well before use. Refrigerate after opening.'
  },
  {
    id: 97,
    name: 'Cappuccino Coffee Premix ',
    category: 'Beverages',
    images: ['https://i0.wp.com/www.amashaamasala.com/wp-content/uploads/2024/06/coffee_its_benefits_898_1_.jpg?fit=898%2C898&ssl=1'],
    price: 159,
    desc: 'Hot coffee.',
    discount: 2,
    rating: 4.5,
    reviews: 38,
    quantity: '70g', // <-- added
    about: 'Cappuccino Coffee Premix is a rich, creamy instant coffee blend.',
    benefits: [
      'Rich coffee flavor',
      'Easy to prepare',
      'Contains antioxidants',
      'Perfect for mornings',
      'Ready in minutes',
    ],
    extra: 'Store in a cool, dry place. Add hot water to prepare.'
  },
  {
    id: 98,
    name: 'Chocolate Milkshake',
    category: 'Beverages',
    images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbWlsa3NoYWtlfGVufDB8fDB8fHww'],
    price: 149,
    desc: 'Cholocate milkshake.',
    rating: 4.4,
    reviews: 27,
    quantity: '200ml', // <-- added
    about: 'Chocolate Milkshake is a creamy, delicious drink for all ages.',
    benefits: [
      'Rich chocolate flavor',
      'Creamy texture',
      'Ready to drink',
      'Perfect for summer',
      'Serve chilled',
    ],
    extra: 'Shake well before use. Refrigerate after opening.'
  },
  {
    id: 99,
    name: 'Tropical Dragon Fruit Smoothie',
    category: 'Beverages',
    images: ['https://emilylaurae.com/wp-content/uploads/2022/02/finished-dragon-fruit-smoothie.jpg'],
    price: 99,
    desc: 'Fruit smoothie.',
    rating: 4.3,
    reviews: 19,
    quantity: '250ml', // <-- added
    about: 'Tropical Dragon Fruit Smoothie is a vibrant, nutritious drink.',
    benefits: [
      'Rich in antioxidants',
      'Vibrant color',
      'Supports hydration',
      'Ready to drink',
      'Serve chilled',
    ],
    extra: 'Shake well before use. Refrigerate after opening.'
  },
  {
    id: 100,
    name: 'Nandini GoodLife Spiced Buttermilk',
    category: 'Beverages',
    images: ['https://www.jiomart.com/images/product/original/492851036/nandini-goodlife-spiced-buttermilk-180-ml-product-images-o492851036-p598143043-0-202411131812.jpg?im=Resize=(420,420)'],
    price: 29,
    desc: 'Chilled buttermilk.',
    rating: 4.2,
    reviews: 14,
    quantity: '180ml', // <-- added
    about: 'Nandini GoodLife Spiced Buttermilk is a cool, spicy drink for summer.',
    benefits: [
      'Spiced flavor',
      'Supports digestion',
      'Ready to drink',
      'Serve chilled',
      'No added preservatives',
    ],
    extra: 'Shake well before use. Refrigerate after opening.'
  },
  {
    id: 101,
    name: 'Red Bull Energy Drink ',
    category: 'Beverages',
    images: ['https://www.jiomart.com/images/product/original/490005091/red-bull-energy-drink-250-ml-product-images-o490005091-p490005091-0-202410101157.jpg?im=Resize=(360,360)'],
    price: 125,
    desc: 'Energy drink.',
    discount: 15,
    rating: 4.4,
    reviews: 32,
    quantity: '250ml', // <-- added
    about: 'Red Bull Energy Drink boosts energy and alertness.',
    benefits: [
      'Boosts energy',
      'Supports alertness',
      'Ready to drink',
      'Serve chilled',
      'Popular worldwide',
    ],
    extra: 'Best served cold. Store in a cool place.'
  },
  {
    id: 102,
    name: 'Simple Hot Cocoa for One',
    category: 'Beverages',
    images: ['https://assets.epicurious.com/photos/61eb09dfb37c8d2963dd7bde/1:1/w_1920,c_limit/HotCocoaForOne_RECIPE_012022_086_VOG_final.jpg'],
    price: 129,
    desc: 'Rich hot chocolate.',
    rating: 4.5,
    reviews: 25,
    quantity: '1 serving',
    about: 'Simple Hot Cocoa for One is a rich, comforting chocolate drink.',
    benefits: [
      'Rich chocolate flavor',
      'Comforting drink',
      'Easy to prepare',
      'Perfect for winter',
      'Ready in minutes',
    ],
    extra: 'Add hot water or milk. Stir well.'
  },
  {
    id: 103,
    name: 'Green Tea',
    category: 'Beverages',
    images: ['https://www.news-medical.net/image-handler/picture/2021/9/shutterstock_251566309.jpg'],
    price: 19,
    desc: 'Healthy green tea.',
    rating: 4.3,
    reviews: 19,
    quantity: '70ml', // <-- added
    about: 'Green Tea is a healthy, antioxidant-rich beverage.',
    benefits: [
      'Rich in antioxidants',
      'Supports metabolism',
      'Ready to drink',
      'Perfect for mornings',
      'No added sugar',
    ],
    extra: 'Add hot water. Steep for 2-3 minutes.'
  },
  {
    id: 104,
    name: 'Mother Dairy Lassi',
    category: 'Beverages',
    images: ['https://www.bbassets.com/media/uploads/p/l/40004525_6-mother-dairy-lassi-mango-asli-refreshment.jpg'],
    price: 20,
    desc: 'Sweet mango lassi.',
    rating: 4.4,
    reviews: 22,
    quantity: '200ml', // <-- added
    about: 'Mother Dairy Lassi is a sweet, refreshing mango drink.',
    benefits: [
      'Sweet mango flavor',
      'Supports digestion',
      'Ready to drink',
      'Serve chilled',
      'No added preservatives',
    ],
    extra: 'Shake well before use. Refrigerate after opening.'
  },
  // Personal Care
  {
    id: 105,
    name: 'Tresemme Lamellar Gloss Shampoo',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/31pgcLmGDTL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 299,
    desc: 'Herbal shampoo.',
    discount: 8,
    rating: 4.5,
    reviews: 41,
    quantity: '200ml', // <-- added
    about: 'Tresemme Lamellar Gloss Shampoo provides a glossy finish and deep nourishment for hair.',
    benefits: [
      'Glossy hair',
      'Deep nourishment',
      'Herbal ingredients',
      'Suitable for all hair types',
      'Reduces frizz',
    ],
    extra: 'Apply to wet hair, massage, and rinse thoroughly.'
  },
  {
    id: 106,
    name: 'Pears Pure & Gentle Soap Bar',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/41kSCw2xBXL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 349,
    desc: 'Natural soap.',
    rating: 4.4,
    reviews: 32,
    quantity: '225g', // <-- added
    about: 'Pears Pure & Gentle Soap Bar is made with natural oils for gentle cleansing.',
    benefits: [
      'Gentle cleansing',
      'Natural oils',
      'Suitable for sensitive skin',
      'Moisturizes skin',
      'Mild fragrance',
    ],
    extra: 'Use daily for best results.'
  },
  {
    id: 107,
    name: 'Colgate MaxFresh Toothpaste',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/61fFhFnhIvL._SX679_.jpg'],
    price: 206,
    desc: 'Mint toothpaste.',
    rating: 4.5,
    reviews: 38,
    quantity: '150g', // <-- added
    about: 'Colgate MaxFresh Toothpaste provides long-lasting freshness and cavity protection.',
    benefits: [
      'Minty freshness',
      'Cavity protection',
      'Whitens teeth',
      'Fights plaque',
      'Suitable for daily use',
    ],
    extra: 'Brush twice daily for best results.'
  },
  {
    id: 108,
    name: 'Colgate ZigZag Toothbrush',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/31I-iQm81aL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 29,
    desc: 'Soft toothbrush.',
    rating: 4.3,
    reviews: 21,
    quantity: '1 piece', // <-- added
    about: 'Colgate ZigZag Toothbrush has soft bristles for gentle cleaning.',
    benefits: [
      'Soft bristles',
      'Gentle cleaning',
      'Ergonomic handle',
      'Removes plaque',
      'Suitable for sensitive gums',
    ],
    extra: 'Replace every 3 months.'
  },
  {
    id: 109,
    name: 'NIVEA MEN Dark Face Wash',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/31OXne3bsKL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 249,
    desc: 'Gentle face wash.',
    rating: 4.4,
    reviews: 27,
    quantity: '150ml', // <-- added
    about: 'NIVEA MEN Dark Face Wash gently cleanses and brightens skin.',
    benefits: [
      'Gentle cleansing',
      'Brightens skin',
      'Removes impurities',
      'Suitable for daily use',
      'Dermatologically tested',
    ],
    extra: 'Use twice daily for best results.'
  },
  {
    id: 110,
    name: 'NIVEA Body Lotion Natural ',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/21nbemAX+qL._SY300_SX300_.jpg'],
    price: 399,
    desc: 'Moisturizing lotion.',
    rating: 4.5,
    reviews: 34,
    quantity: '200ml', // <-- added
    about: 'NIVEA Body Lotion Natural deeply moisturizes and nourishes skin.',
    benefits: [
      'Deep moisturization',
      'Nourishes skin',
      'Suitable for all skin types',
      'Non-greasy formula',
      'Mild fragrance',
    ],
    extra: 'Apply daily for soft, smooth skin.'
  },
  {
    id: 111,
    name: 'NIVEA Men Fresh Active ',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/31mI1FHmgUL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 159,
    desc: 'Long-lasting deodorant.',
    rating: 4.4,
    reviews: 29,
    quantity: '150ml', // <-- added
    about: 'NIVEA Men Fresh Active provides long-lasting freshness and odor protection.',
    benefits: [
      'Long-lasting freshness',
      'Odor protection',
      'Dermatologically tested',
      'Suitable for daily use',
      'Mild fragrance',
    ],
    extra: 'Apply to underarms for best results.'
  },
  {
    id: 112,
    name: 'Dettol Foaming Handwash',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/51ztkcyUFaL._SX679_.jpg'],
    price: 129,
    desc: 'Antibacterial handwash.',
    rating: 4.5,
    reviews: 32,
    quantity: '200ml', // <-- added
    about: 'Dettol Foaming Handwash kills germs and provides gentle cleansing.',
    benefits: [
      'Kills germs',
      'Gentle cleansing',
      'Foaming formula',
      'Dermatologically tested',
      'Mild fragrance',
    ],
    extra: 'Use regularly for clean hands.'
  },
  {
    id: 113,
    name: 'TRESemme Hair Fall Defence',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/31CovvctSAL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 229,
    desc: 'Hair conditioner.',
    rating: 4.4,
    reviews: 27,
    quantity: '200ml', // <-- added
    about: 'TRESemme Hair Fall Defence strengthens hair and reduces hair fall.',
    benefits: [
      'Strengthens hair',
      'Reduces hair fall',
      'Suitable for all hair types',
      'Herbal ingredients',
      'Non-greasy formula',
    ],
    extra: 'Apply after shampooing, leave for 2 minutes, rinse.'
  },
  {
    id: 114,
    name: 'Kesh King Ayurvedic Anti Hairfall',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/516bbFWgVKL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 404,
    desc: 'Nourishing hair oil.',
    rating: 4.5,
    reviews: 34,
    quantity: '100ml', // <-- added
    about: 'Kesh King Ayurvedic Anti Hairfall oil nourishes scalp and reduces hair fall.',
    benefits: [
      'Nourishes scalp',
      'Reduces hair fall',
      'Ayurvedic ingredients',
      'Strengthens roots',
      'Non-sticky formula',
    ],
    extra: 'Massage into scalp, leave overnight, wash next day.'
  },
  {
    id: 115,
    name: 'Lakme Sun Expert SPF 50 Gel',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/313-QLQlP+L._SY300_SX300_.jpg'],
    price: 449,
    desc: 'SPF 50 sunscreen.',
    rating: 4.4,
    reviews: 29,
    quantity: '50g', // <-- added
    about: 'Lakme Sun Expert SPF 50 Gel provides high sun protection and a non-greasy finish.',
    benefits: [
      'SPF 50 protection',
      'Non-greasy finish',
      'Suitable for all skin types',
      'Lightweight formula',
      'Dermatologically tested',
    ],
    extra: 'Apply before sun exposure. Reapply as needed.'
  },
  {
    id: 116,
    name: 'Wild Stone Ultra Sensual',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/51M73SOIdhL._SX679_.jpg'],
    price: 311,
    desc: 'Masculine Fragrances.',
    rating: 4.3,
    reviews: 21,
    quantity: '120ml', // <-- added
    about: 'Wild Stone Ultra Sensual is a masculine fragrance for long-lasting freshness.',
    benefits: [
      'Long-lasting fragrance',
      'Masculine scent',
      'Suitable for daily use',
      'Mild formula',
      'Dermatologically tested',
    ],
    extra: 'Spray on pulse points for best results.'
  },
  {
    id: 117,
    name: 'Gillette Venus Breeze Hair',
    category: 'Personal Care',
    images: ['https://m.media-amazon.com/images/I/41Uf97JwWBL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 299,
    desc: 'Disposable razor.',
    discount: 5,
    rating: 4.4,
    reviews: 29,
    quantity: '1 piece', // <-- added
    about: 'Gillette Venus Breeze Hair razor provides a smooth, comfortable shave.',
    benefits: [
      'Smooth shave',
      'Comfortable grip',
      'Disposable blades',
      'Suitable for sensitive skin',
      'Easy to use',
    ],
    extra: 'Replace blade after use for best results.'
  },
  // Stationery
  {
    id: 118,
    name: 'amazon basics Undated 2025 Diary',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/4180LJrbE+L._SY300_SX300_.jpg'],
    price: 229,
    desc: 'A5 ruled notebook.',
    discount: 6,
    rating: 4.5,
    reviews: 32,
    quantity: '1 piece', // <-- added
    about: 'Undated 2025 Diary with A5 size, ruled pages for notes and planning.',
    benefits: [
      'A5 size',
      'Ruled pages',
      'Durable cover',
      'Perfect for planning',
      'Undated for flexibility',
    ],
    extra: 'Ideal for students and professionals.'
  },
  {
    id: 119,
    name: 'Parker Classic Matte Black CT Ball Pen',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/71x7WPNtUZL._SX679_.jpg'],
    price: 460,
    desc: 'Black ink pen.',
    rating: 4.4,
    reviews: 21,
    quantity: '1 piece', // <-- added
    about: 'Parker Classic Matte Black CT Ball Pen offers smooth writing and elegant design.',
    benefits: [
      'Smooth writing',
      'Elegant design',
      'Durable build',
      'Comfortable grip',
      'Refillable',
    ],
    extra: 'Perfect for office and gifting.'
  },
  {
    id: 120,
    name: 'Flair Creative Series Pastela 2B',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/31tXxCooM6L._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 79,
    desc: 'HB pencil.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'Flair Creative Series Pastela 2B pencil is perfect for writing and sketching.',
    benefits: [
      'Smooth writing',
      'Break-resistant',
      'Comfortable grip',
      'Ideal for sketching',
      'Non-toxic',
    ],
    extra: 'Suitable for students and artists.'
  },
  {
    id: 121,
    name: 'Staedtler Mars Plastic Combi Eraser',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/71bKL2dArnL._SY879_.jpg'],
    price: 49,
    desc: 'Soft eraser.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'Staedtler Mars Plastic Combi Eraser is soft and gentle for clean erasing.',
    benefits: [
      'Soft texture',
      'Clean erasing',
      'Non-abrasive',
      'Dual purpose',
      'Long-lasting',
    ],
    extra: 'Ideal for pencils and ink.'
  },
  {
    id: 122,
    name: 'Staedtler 510 20BK Double Hole Metal',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/41B+tZxVm+L._SY300_SX300_.jpg'],
    price: 159,
    desc: 'Steel sharpener.',
    rating: 4.5,
    reviews: 21,
    quantity: '1 piece', // <-- added
    about: 'Staedtler Double Hole Metal Sharpener is durable and sharpens pencils efficiently.',
    benefits: [
      'Double hole',
      'Durable metal',
      'Efficient sharpening',
      'Compact design',
      'Long-lasting',
    ],
    extra: 'Suitable for all pencil sizes.'
  },
  {
    id: 123,
    name: 'BRUSTRO Twin Tip Alcohol Based Marker',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/31KyAgf1CUL._SY300_SX300_QL70_FMwebp_.jpg'],
    price: 99,
    desc: 'Green  highlighter.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'BRUSTRO Twin Tip Alcohol Based Marker is perfect for highlighting and coloring.',
    benefits: [
      'Twin tip',
      'Alcohol based',
      'Vibrant color',
      'Quick drying',
      'Non-toxic',
    ],
    extra: 'Ideal for students and artists.'
  },
  {
    id: 124,
    name: 'Faber-Castell Fine Permanent Marker Pen',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/319L2bQ7C+L.jpg'],
    price: 49,
    desc: 'Black Marker.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'Faber-Castell Fine Permanent Marker Pen writes smoothly and dries quickly.',
    benefits: [
      'Fine tip',
      'Permanent ink',
      'Quick drying',
      'Non-toxic',
      'Long-lasting',
    ],
    extra: 'Perfect for labeling and art.'
  },
  {
    id: 125,
    name: 'Nataraj Scale, 30 cm ',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/71+ik77bEuL._SX522_.jpg'],
    price: 19,
    desc: '30cm scale.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'Nataraj Scale is a durable 30cm ruler for precise measurements.',
    benefits: [
      'Durable',
      'Precise measurements',
      'Clear markings',
      'Lightweight',
      'Flexible',
    ],
    extra: 'Ideal for school and office.'
  },
  {
    id: 126,
    name: 'M Post-it Sticky Note Cube, 200 Sheets',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/41yNejBMf+L._SY300_SX300_.jpg'],
    price: 165,
    desc: 'Sticky notes pad.',
    discount: 10,
    rating: 4.4,
    reviews: 14,
    quantity: '200 sheets', // <-- added
    about: 'M Post-it Sticky Note Cube offers 200 sheets for notes and reminders.',
    benefits: [
      '200 sheets',
      'Strong adhesive',
      'Bright colors',
      'Easy to use',
      'Removable',
    ],
    extra: 'Perfect for home, school, and office.'
  },
  {
    id: 127,
    name: 'NSSP 2D Ring Binder File| Durable ',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/61q-MIa93GL._SX679_.jpg'],
    price: 400,
    desc: 'Document file.',
    rating: 4.5,
    reviews: 21,
    quantity: '1 piece', // <-- added
    about: 'NSSP 2D Ring Binder File is durable and perfect for organizing documents.',
    benefits: [
      'Durable',
      '2D ring binder',
      'Easy to organize',
      'Large capacity',
      'Professional look',
    ],
    extra: 'Ideal for office and school.'
  },
  {
    id: 128,
    name: 'amazon basics AB-82MS 240 Functions ',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/41bqj1j7QFL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 599,
    desc: 'Scientific calculator.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'amazon basics AB-82MS Scientific Calculator offers 240 functions for calculations.',
    benefits: [
      '240 functions',
      'Large display',
      'Durable build',
      'Easy to use',
      'Battery operated',
    ],
    extra: 'Perfect for students and professionals.'
  },
  {
    id: 129,
    name: '3M Scotch White Glue Stick',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/21ni1zDlUdL.jpg'],
    price: 189,
    desc: 'Non-toxic glue stick.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: '3M Scotch White Glue Stick is non-toxic and provides strong adhesion.',
    benefits: [
      'Non-toxic',
      'Strong adhesion',
      'Easy to use',
      'Dries clear',
      'Long-lasting',
    ],
    extra: 'Ideal for school and crafts.'
  },
  {
    id: 130,
    name: 'Scotch 6-inches Stainless Steel ',
    category: 'Stationery',
    images: ['https://m.media-amazon.com/images/I/41LSMx4-i1L._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 199,
    desc: 'Sharp scissors.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'Scotch 6-inches Stainless Steel scissors are sharp and durable for precise cutting.',
    benefits: [
      'Sharp blades',
      'Stainless steel',
      'Comfortable grip',
      'Precise cutting',
      'Long-lasting',
    ],
    extra: 'Perfect for home, school, and office.'
  },
  // Toys
  {
    id: 131,
    name: 'JOY JUNCTION Porche Model Car',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/41g-IhWJaAL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 999,
    desc: 'Mini toy car.',
    discount: 7,
    rating: 4.5,
    reviews: 32,
    quantity: '1 piece', // <-- added
    about: 'Porche Model Car is a detailed mini toy car for kids and collectors.',
    benefits: [
      'Realistic design',
      'Durable build',
      'Smooth wheels',
      'Great for play and display',
      'Safe for kids',
    ],
    extra: 'Ideal for ages 3 and up.'
  },
  {
    id: 132,
    name: 'Barbie Fun & Fancy Doll & Accessories',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/31RFbe+qvQL._SY300_SX300_.jpg'],
    price: 1199,
    desc: 'Cute doll.',
    rating: 4.4,
    reviews: 21,
    quantity: '1 piece', // <-- added
    about: 'Barbie Fun & Fancy Doll comes with accessories for imaginative play.',
    benefits: [
      'Imaginative play',
      'Includes accessories',
      'Durable material',
      'Safe for kids',
      'Great gift option',
    ],
    extra: 'Suitable for ages 3 and up.'
  },
  {
    id: 133,
    name: 'ABYZ Wooden Jigsaw Animated Dragon',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/51mNrScKb9L._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 849,
    desc: 'Puzzle game.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'Wooden Jigsaw Animated Dragon is a fun puzzle game for kids.',
    benefits: [
      'Improves problem-solving',
      'Colorful design',
      'Durable wood',
      'Safe for kids',
      'Educational',
    ],
    extra: 'Recommended for ages 4 and up.'
  },
  {
    id: 134,
    name: 'RUTV Building Block Game',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/41UL9bO8B4L._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 199,
    desc: 'Building blocks.',
    discount: 5,
    rating: 4.4,
    reviews: 14,
    quantity: '1 set', // <-- added
    about: 'RUTV Building Block Game encourages creativity and motor skills.',
    benefits: [
      'Encourages creativity',
      'Improves motor skills',
      'Colorful blocks',
      'Safe for kids',
      'Durable material',
    ],
    extra: 'Suitable for ages 3 and up.'
  },
  {
    id: 135,
    name: 'Toyshine Rubber Edu-Sports Kids',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/4139TLh3sPL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 3.99,
    desc: 'Kids Toy Gift Sports.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'Toyshine Rubber Edu-Sports Kids is a fun sports toy for active play.',
    benefits: [
      'Promotes active play',
      'Safe rubber material',
      'Bright colors',
      'Durable',
      'Great for outdoor fun',
    ],
    extra: 'Recommended for ages 3 and up.'
  },
  {
    id: 136,
    name: 'MONOPOLY Board Game (Multicolor)',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/51Rg6SxtpjL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 2199,
    desc: 'Fun board game.',
    rating: 4.5,
    reviews: 32,
    quantity: '1 set', // <-- added
    about: 'MONOPOLY Board Game is a classic family game for hours of fun.',
    benefits: [
      'Classic board game',
      'Family fun',
      'Improves strategy',
      'Colorful pieces',
      'Durable board',
    ],
    extra: 'Recommended for ages 8 and up.'
  },
  {
    id: 137,
    name: 'The WOLV-Erine Anime Action',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/41Cq58-7yQL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 799,
    desc: 'Superhero action figure.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'The WOLV-Erine Anime Action is a superhero figure for imaginative play.',
    benefits: [
      'Imaginative play',
      'Durable material',
      'Colorful design',
      'Safe for kids',
      'Great gift option',
    ],
    extra: 'Suitable for ages 4 and up.'
  },
  {
    id: 138,
    name: 'Mirana Block Rider Toy Train Set',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/51kMjqgAaEL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 949,
    desc: 'Toy train set.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 set', // <-- added
    about: 'Mirana Block Rider Toy Train Set is a fun train set for kids.',
    benefits: [
      'Encourages creativity',
      'Durable build',
      'Colorful blocks',
      'Safe for kids',
      'Easy to assemble',
    ],
    extra: 'Recommended for ages 3 and up.'
  },
  {
    id: 139,
    name: 'Rechargeable Remote Control Car Toy',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/41gVoT3yLuL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 15.99,
    desc: 'Remote control car.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'Rechargeable Remote Control Car Toy offers fast and fun remote-controlled action.',
    benefits: [
      'Rechargeable battery',
      'Fast speed',
      'Durable build',
      'Easy to control',
      'Safe for kids',
    ],
    extra: 'Suitable for ages 6 and up.'
  },
  {
    id: 140,
    name: 'Fine Quality YoYo Spinner Toy ',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/71+Q6MhbLyL._SX679_.jpg'],
    price: 199,
    desc: 'Classic yo-yo.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'Fine Quality YoYo Spinner Toy is a classic yo-yo for tricks and fun.',
    benefits: [
      'Classic design',
      'Smooth spinning',
      'Durable material',
      'Safe for kids',
      'Improves coordination',
    ],
    extra: 'Recommended for ages 5 and up.'
  },
  {
    id: 141,
    name: 'Lovable Cute Soft Teddy Bear',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/41pJYlZmG2L._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 299,
    desc: 'Soft teddy bear.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'Lovable Cute Soft Teddy Bear is a cuddly plush toy for kids.',
    benefits: [
      'Soft and cuddly',
      'Safe for kids',
      'Durable stitching',
      'Great gift option',
      'Washable',
    ],
    extra: 'Suitable for all ages.'
  },
  {
    id: 142,
    name: 'VGRASSP Bot Robot Pioneer Colorful',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/51P4TwHd3wL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 699,
    desc: 'Interactive robot.',
    rating: 4.5,
    reviews: 21,
    quantity: '1 piece', // <-- added
    about: 'VGRASSP Bot Robot Pioneer is a colorful interactive robot for kids.',
    benefits: [
      'Interactive play',
      'Colorful design',
      'Durable build',
      'Safe for kids',
      'Educational',
    ],
    extra: 'Recommended for ages 5 and up.'
  },
  {
    id: 143,
    name: 'KARP Children Deluxe Art Drawing',
    category: 'Toys',
    images: ['https://m.media-amazon.com/images/I/51INfAei51L._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 7.49,
    desc: 'Complete art set.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 set', // <-- added
    about: 'KARP Children Deluxe Art Drawing is a complete art set for creative kids.',
    benefits: [
      'Complete art set',
      'Encourages creativity',
      'Safe materials',
      'Durable case',
      'Great gift option',
    ],
    extra: 'Suitable for ages 4 and up.'
  },
  // Pet Supplies
  {
    id: 144,
    name: 'Pedigree Adult Dry Dog Food',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/41AKS4l+J8L._SY300_SX300_.jpg'],
    price: 1299,
    desc: 'Nutritious dog food.',
    discount: 9,
    rating: 4.5,
    reviews: 32,
    quantity: '3kg', // <-- added
    about: 'Pedigree Adult Dry Dog Food provides complete nutrition for adult dogs.',
    benefits: [
      'Complete nutrition',
      'Supports healthy coat',
      'Easy to digest',
      'Rich in protein',
      'No artificial flavors',
    ],
    extra: 'Store in a cool, dry place.'
  },
  {
    id: 145,
    name: 'Whiskas Adult  Dry Cat Food',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/4133XseLJyL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 1199,
    desc: 'Healthy cat food.',
    rating: 4.4,
    reviews: 21,
    quantity: '1.2kg', // <-- added
    about: 'Whiskas Adult Dry Cat Food is formulated for adult cats with essential nutrients.',
    benefits: [
      'Essential nutrients',
      'Supports healthy skin',
      'Tasty flavor',
      'Easy to digest',
      'No artificial colors',
    ],
    extra: 'Store in a cool, dry place.'
  },
  {
    id: 146,
    name: 'Boltz Adult Bird Food ',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/71AexbEE1AL._SX679_.jpg'],
    price: 1149,
    desc: 'Bird seed mix.',
    rating: 4.3,
    reviews: 18,
    quantity: '1kg', // <-- added
    about: 'Boltz Adult Bird Food is a nutritious seed mix for adult birds.',
    benefits: [
      'Nutritious seed mix',
      'Supports healthy feathers',
      'Easy to eat',
      'No artificial flavors',
      'Rich in vitamins',
    ],
    extra: 'Store in a cool, dry place.'
  },
  {
    id: 147,
    name: 'Boost  Koi Fish Food',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/51XoKx0jT1L._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 1529,
    desc: 'Fish flakes.',
    rating: 4.4,
    reviews: 14,
    quantity: '500g', // <-- added
    about: 'Boost Koi Fish Food is a balanced diet for koi fish.',
    benefits: [
      'Balanced diet',
      'Supports vibrant colors',
      'Easy to digest',
      'No artificial colors',
      'Rich in protein',
    ],
    extra: 'Store in a cool, dry place.'
  },
  {
    id: 148,
    name: 'Tug of War Interactive Dog',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/31JWXParXNL._SY300_SX300_QL70_FMwebp_.jpg'],
    price: 599,
    desc: 'Chew toy for dogs.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'Tug of War Interactive Dog toy is durable and fun for active dogs.',
    benefits: [
      'Durable material',
      'Promotes active play',
      'Safe for dogs',
      'Bright colors',
      'Easy to clean',
    ],
    extra: 'Supervise play for safety.'
  },
  {
    id: 149,
    name: 'Foodie Puppies Cat Teaser ',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/61hlRTDKy+L._AC_UL480_FMwebp_QL65_.jpg'],
    price: 399,
    desc: 'Catnip toy.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'Foodie Puppies Cat Teaser is a fun catnip toy for playful cats.',
    benefits: [
      'Catnip infused',
      'Promotes active play',
      'Safe for cats',
      'Durable material',
      'Bright colors',
    ],
    extra: 'Supervise play for safety.'
  },
  {
    id: 150,
    name: 'Bscly Neem Herbal Dog Shampoo ',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/61ddTfTxknL._AC_UL480_FMwebp_QL65_.jpg'],
    price: 499,
    desc: 'Pet shampoo.',
    rating: 4.5,
    reviews: 21,
    quantity: '200ml', // <-- added
    about: 'Bscly Neem Herbal Dog Shampoo cleans and nourishes pet fur.',
    benefits: [
      'Neem herbal formula',
      'Cleans fur',
      'Nourishes skin',
      'Safe for pets',
      'Mild fragrance',
    ],
    extra: 'Use as directed for best results.'
  },
  {
    id: 151,
    name: 'Tie-Out Cable/Leash for Dogs',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/41pchqypCxL._SY300_SX300_QL70_FMwebp_.jpg'],
    price: 799,
    desc: 'Dog leash.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'Tie-Out Cable/Leash for Dogs is strong and safe for outdoor walks.',
    benefits: [
      'Strong cable',
      'Safe for dogs',
      'Easy to use',
      'Durable material',
      'Comfortable grip',
    ],
    extra: 'Use under supervision.'
  },
  {
    id: 152,
    name: 'Large Elevated Cooling Pet Dog Cot',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/31ewRrLBa1S._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 999,
    desc: 'Comfortable pet bed.',
    rating: 4.5,
    reviews: 21,
    quantity: '1 piece', // <-- added
    about: 'Large Elevated Cooling Pet Dog Cot provides comfort and cooling for pets.',
    benefits: [
      'Elevated design',
      'Cooling effect',
      'Durable material',
      'Easy to clean',
      'Comfortable for pets',
    ],
    extra: 'Suitable for indoor and outdoor use.'
  },
  {
    id: 153,
    name: 'Foodie Puppies Stainless  Paw Bone',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/31jj9Y1IOCL._SY300_SX300_QL70_FMwebp_.jpg'],
    price: 349,
    desc: 'Food bowl for pets.',
    rating: 4.3,
    reviews: 18,
    quantity: '1 piece', // <-- added
    about: 'Foodie Puppies Stainless Paw Bone bowl is durable and easy to clean.',
    benefits: [
      'Stainless steel',
      'Easy to clean',
      'Durable',
      'Non-slip base',
      'Safe for pets',
    ],
    extra: 'Wash regularly for hygiene.'
  },
  {
    id: 154,
    name: 'PAWPRO HANDMADE Personalized Black',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/41Gaksuh0QL._SX300_SY300_QL70_FMwebp_.jpg'],
    price: 899,
    desc: 'Adjustable pet collar.',
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'PAWPRO HANDMADE Personalized Black collar is adjustable and stylish.',
    benefits: [
      'Adjustable size',
      'Handmade design',
      'Durable material',
      'Comfortable fit',
      'Safe for pets',
    ],
    extra: 'Adjust to fit your pet.'
  },
  {
    id: 155,
    name: 'BARK OUT LOUD - Multivitamin Dog',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/41ib7MobP+L._SY300_SX300_.jpg'],
    price: 549,
    desc: 'Delicious pet treats.',
    rating: 4.5,
    reviews: 21,
    quantity: '1 pack', // <-- added
    about: 'BARK OUT LOUD Multivitamin Dog treats support overall health.',
    benefits: [
      'Multivitamin formula',
      'Supports immunity',
      'Tasty flavor',
      'Easy to digest',
      'No artificial colors',
    ],
    extra: 'Feed as directed.'
  },
  {
    id: 156,
    name: 'Two Door Top Load Pet Kennel',
    category: 'Pet Supplies',
    images: ['https://m.media-amazon.com/images/I/41G9kMafEeL._SY300_SX300_QL70_FMwebp_.jpg'],
    price: 499,
    desc: 'Travel pet carrier.',
    discount: 5,
    rating: 4.4,
    reviews: 14,
    quantity: '1 piece', // <-- added
    about: 'Two Door Top Load Pet Kennel is a safe and comfortable travel carrier for pets.',
    benefits: [
      'Two door design',
      'Safe for travel',
      'Comfortable interior',
      'Durable material',
      'Easy to clean',
    ],
    extra: 'Use for travel and vet visits.'
  },
  // Add more mango products for Mango Mania
  {
    id: 157,
    name: 'Alphonso Mango',
    category: 'Fruits',
    images: ['https://mangomaniaus.com/cdn/shop/files/MangoMania_Alphonso-Compressed_3a8a2152-47c0-4272-b759-fbddf9d3541c.png?v=1737966186'],
    price: 250,
    desc: 'Premium Alphonso mangoes.',
    discount: 15,
    rating: 4.7,
    reviews: 52,
    quantity: '1 kg', // <-- added
    about: 'Alphonso Mango is known for its rich flavor and creamy texture.',
    benefits: [
      'Rich in vitamins',
      'Creamy texture',
      'Sweet aroma',
      'Perfect for desserts',
      'High antioxidant content',
    ],
    extra: 'Store in a cool place. Consume fresh.'
  },
  {
    id: 158,
    name: 'Kesar Mango',
    category: 'Fruits',
    images: ['https://5.imimg.com/data5/SELLER/Default/2023/3/293132097/LU/AH/IP/42519708/organic-kesar-mango-1000x1000.jpg'],
    price: 220,
    desc: 'Sweet Kesar mangoes.',
    discount: 10,
    rating: 4.6,
    reviews: 41,
    quantity: '1 kg', // <-- added
    about: 'Kesar Mango is famous for its saffron color and sweet taste.',
    benefits: [
      'Saffron color',
      'Sweet taste',
      'Rich in fiber',
      'Good for juices',
      'High vitamin C',
    ],
    extra: 'Best for juice and desserts.'
  },
  {
    id: 159,
    name: 'Dasheri Mango',
    category: 'Fruits',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dosehri.JPG/500px-Dosehri.JPG'],
    price: 180,
    desc: 'Juicy Dasheri mangoes.',
    rating: 4.5,
    reviews: 36,
    quantity: '1 kg', // <-- added
    about: 'Dasheri Mango is juicy and aromatic, perfect for eating fresh.',
    benefits: [
      'Juicy texture',
      'Aromatic flavor',
      'Rich in vitamins',
      'Good for digestion',
      'Perfect for salads',
    ],
    extra: 'Consume fresh for best taste.'
  },
  {
    id: 160,
    name: 'Langra Mango',
    category: 'Fruits',
    images: ['https://mangobazaar.in/wp-content/uploads/2025/03/Langra-mango-MangoBazaar.png'],
    price: 170,
    desc: 'Tasty Langra mangoes.',
    rating: 4.4,
    reviews: 29,
    quantity: '1 kg', // <-- added
    about: 'Langra Mango is known for its unique taste and green skin.',
    benefits: [
      'Unique taste',
      'Green skin',
      'Rich in fiber',
      'Good for smoothies',
      'High vitamin A',
    ],
    extra: 'Store in a cool place.'
  },
  {
    id: 161,
    name: 'Badami Mango',
    category: 'Fruits',
    images: ['https://alphonsomango.co.uk/cdn/shop/articles/where_are_badami_mangoes_from_image_355dda9f-6dbd-4619-9a4a-259ec0ddb83a.jpg?v=1750423912&width=1100'],
    price: 210,
    desc: 'Delicious Badami mangoes.',
    rating: 4.5,
    reviews: 32,
    quantity: '1 kg', // <-- added
    about: 'Badami Mango is delicious and widely used for making pulp.',
    benefits: [
      'Delicious flavor',
      'Soft pulp',
      'Rich in nutrients',
      'Perfect for shakes',
      'High antioxidant content',
    ],
    extra: 'Use for pulp and shakes.'
  },
  {
    id: 162,
    name: 'Totapuri Mango',
    category: 'Fruits',
    images: ['https://plantsbazar.com/media/catalog/product/cache/1/thumbnail/800x/221956c5889d06f3e386d4083fb81582/t/o/totapuri-mango-plant-_grafted_.jpg'],
    price: 160,
    desc: 'Totapuri mangoes for salads.',
    rating: 4.4,
    reviews: 29,
    quantity: '1 kg', // <-- added
    about: 'Totapuri Mango is tangy and ideal for salads and pickles.',
    benefits: [
      'Tangy flavor',
      'Firm texture',
      'Good for pickles',
      'Rich in vitamin C',
      'Low sugar content',
    ],
    extra: 'Best for salads and pickles.'
  },
  {
    id: 163,
    name: 'Neelam Mango',
    category: 'Fruits',
    images: ['https://indiangloriousnursery.com/wp-content/uploads/2023/04/419Zfo0yAkL.jpg'],
    price: 190,
    desc: 'Aromatic Neelam mangoes.',
    rating: 4.5,
    reviews: 32,
    quantity: '1 kg', // <-- added
    about: 'Neelam Mango is aromatic and sweet, perfect for desserts.',
    benefits: [
      'Aromatic flavor',
      'Sweet taste',
      'Rich in vitamins',
      'Good for desserts',
      'High fiber',
    ],
    extra: 'Store in a cool place.'
  },
  {
    id: 164,
    name: 'Pairi Mango',
    category: 'Fruits',
    images: ['https://paradiseflowers.in/wp-content/uploads/2021/08/paheri.jpg'],
    price: 200,
    desc: 'Pairi mangoes for juice.',
    rating: 4.4,
    reviews: 29,
    quantity: '1 kg', // <-- added
    about: 'Pairi Mango is juicy and best for making mango juice.',
    benefits: [
      'Juicy texture',
      'Sweet flavor',
      'Rich in nutrients',
      'Perfect for juice',
      'High vitamin C',
    ],
    extra: 'Use for fresh juice.'
  },
  {
    id: 165,
    name: 'Himsagar Mango',
    category: 'Fruits',
    images: ['https://images.meesho.com/images/products/439222200/ivagf_512.webp'],
    price: 230,
    desc: 'Himsagar mangoes from Bengal.',
    rating: 4.5,
    reviews: 32,
    quantity: '1 kg',
    about: 'Himsagar Mango is a Bengal specialty, juicy and aromatic.',
    benefits: [
      'Juicy texture',
      'Aromatic flavor',
      'Rich in vitamins',
      'Good for desserts',
      'High fiber',
    ],
    extra: 'Consume fresh for best taste.'
  },
  {
    id: 166,
    name: 'Raspuri Mango',
    category: 'Fruits',
    images: ['https://www.bbassets.com/media/uploads/p/l/10000300_8-fresho-raspurigola-mango.jpg'],
    price: 175,
    desc: 'Raspuri mangoes from Karnataka.',
    rating: 4.4,
    reviews: 29,
    quantity: '1 kg', // <-- added
    about: 'Raspuri Mango is a Karnataka favorite, juicy and sweet.',
    benefits: [
      'Juicy texture',
      'Sweet flavor',
      'Rich in nutrients',
      'Perfect for juice',
      'High vitamin C',
    ],
    extra: 'Use for fresh juice.'
  },
  {
    id: 167,
    name: 'Banganapalli Mango',
    category: 'Fruits',
    images: ['https://www.bbassets.com/media/uploads/p/l/10000299_7-fresho-banganapalli-mango.jpg'],
    price: 195,
    desc: 'Banganapalli mangoes.',
    rating: 4.5,
    reviews: 32,
    quantity: '1 kg', // <-- added
    about: 'Banganapalli Mango is large, sweet, and perfect for eating fresh.',
    benefits: [
      'Large size',
      'Sweet taste',
      'Rich in vitamins',
      'Good for desserts',
      'High fiber',
    ],
    extra: 'Consume fresh for best taste.'
  },
  {
    id: 168,
    name: 'Imam Pasand Mango',
    category: 'Fruits',
    images: ['https://rajaiorchards.com/wp-content/uploads/2024/04/Imam-Pasand-Mango.png'],
    price: 240,
    desc: 'Imam Pasand mangoes.',
    rating: 4.6,
    reviews: 41,
    quantity: '1 kg', // <-- added
    about: 'Imam Pasand Mango is rare and highly prized for its flavor.',
    benefits: [
      'Rare variety',
      'Highly prized flavor',
      'Rich in nutrients',
      'Perfect for desserts',
      'High antioxidant content',
    ],
    extra: 'Store in a cool place.'
  },
  {
    id: 169,
    name: 'Mallika Mango',
    category: 'Fruits',
    images: ['https://indiangloriousnursery.com/wp-content/uploads/2023/04/Mango-Mallika-Plant_03.jpg'],
    price: 185,
    desc: 'Mallika mangoes.',
    rating: 4.4,
    reviews: 29,
    quantity: '1 kg', // <-- added
    about: 'Mallika Mango is a hybrid variety, sweet and aromatic.',
    benefits: [
      'Hybrid variety',
      'Sweet taste',
      'Aromatic flavor',
      'Rich in vitamins',
      'Good for desserts',
    ],
    extra: 'Consume fresh for best taste.'
  },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Products() {
  // Language flag images mapping
  const languageFlagImages = {
    EN: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    FR: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
    ES: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg',
  };
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    try {
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [notified, setNotified] = useState({});
  const [showCartModal, setShowCartModal] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });
  const [wishlistMsg, setWishlistMsg] = useState('');
  const [showWishlistMsg, setShowWishlistMsg] = useState(false);
  const navigate = useNavigate();
  const [productModal, setProductModal] = useState(null);
  // Image slider state for product modal
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);

  // Get category from URL parameters
  const query = useQuery();
const categoryFromUrl = query.get('category');

let categoryParam = null;
let productNameFromUrl = null;

if (categoryFromUrl) {
  const parts = categoryFromUrl.split('=');
  // Try to match the category from the categories array (case-insensitive, ignore spaces)
  const rawCategory = decodeURIComponent(parts[0] || '');
  // categories array is defined below, so we need to use a fallback if not available yet
  // We'll use a localCategories array for this parsing
  const localCategories = [
    'All', 'New Arrivals', 'Mango Mania', 'Saver Combo',
    'Fruits', 'Vegetables', 'Electronics', 'Home', 'Dairy', 'Bakery', 'Snacks', 'Beverages',
    'Personal Care', 'Stationery', 'Toys', 'Pet Supplies'
  ];
  categoryParam = localCategories.find(cat => cat.replace(/\s+/g, '').toLowerCase() === rawCategory.replace(/\s+/g, '').toLowerCase()) || null;

  // If product name is also present (e.g., Mango Mania=carrot)
  if (parts.length > 1) {
    productNameFromUrl = decodeURIComponent(parts[1]);
  }
}


  // Set initial category from URL if present, and open modal for product if present
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Open modal for product if productNameFromUrl is present, but do NOT filter the grid
  useEffect(() => {
    if (productNameFromUrl) {
      let match = null;
      // Always use the selectedCategory (which is set by categoryParam above)
      match = allProducts.find(
        p => p.category.toLowerCase() === (categoryParam ? categoryParam.toLowerCase() : selectedCategory.toLowerCase()) && p.name.toLowerCase() === productNameFromUrl.toLowerCase()
      );
      // If not found in category, or no category, search all categories
      if (!match) {
        match = allProducts.find(
          p => p.name.toLowerCase() === productNameFromUrl.toLowerCase()
        );
      }
      if (match) setProductModal(match);
    }
    // Only run on mount or when category/productNameFromUrl changes
    // eslint-disable-next-line
  }, [categoryParam, productNameFromUrl, selectedCategory]);

  // Open modal for product if productNameFromUrl is present, but do NOT filter the grid
  useEffect(() => {
    if (productNameFromUrl) {
      let match = null;
      if (categoryParam) {
        match = allProducts.find(
          p => p.category.toLowerCase() === categoryParam.toLowerCase() && p.name.toLowerCase() === productNameFromUrl.toLowerCase()
        );
      }
      // If not found in category, or no category, search all categories
      if (!match) {
        match = allProducts.find(
          p => p.name.toLowerCase() === productNameFromUrl.toLowerCase()
        );
      }
      if (match) setProductModal(match);
    }
    // Only run on mount or when category/productNameFromUrl changes
    // eslint-disable-next-line
  }, [categoryParam, productNameFromUrl]);

  // Auto-close cart modal when cart becomes empty
  useEffect(() => {
    if (cart.length === 0 && showCartModal) {
      setShowCartModal(false);
    }
  }, [cart.length, showCartModal]);

  // Filter products by category if selected
  const productsByCategory = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});
  const allCategories = Object.keys(productsByCategory);
  const categories = ['All', 'New Arrivals', 'Mango Mania', 'Saver Combo', ...allCategories];

  // --- Top Discount, Trending Product, and Best Seller logic ---
  const productsInCategory = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

  // Find Top Discount (highest discount)
  const topDiscountProduct = productsInCategory.reduce((max, p) =>
    (p.discount || 0) > (max.discount || 0) ? p : max, { discount: 0 }
  );

  // Find New Arrival (latest added product - for now, pick the last product in category)
const newArrivalProduct = productsInCategory.length > 0 
  ? productsInCategory[productsInCategory.length - 1] 
  : null;

// Find Most Reviewed (highest reviews)
const mostReviewedProduct = productsInCategory.reduce((max, p) =>
  (p.reviews || 0) > (max.reviews || 0) ? p : max, { reviews: 0 }
);

// Find Top Rated (highest rating)
const topRatedProduct = productsInCategory.reduce((max, p) =>
  (p.rating || 0) > (max.rating || 0) ? p : max, { rating: 0 }
);



  // Find Trending Product (highest price, not Top Discount)
  const trendingProduct = productsInCategory
    .filter(p => p.id !== topDiscountProduct.id)
    .reduce((max, p) => p.price > max.price ? p : max, { price: 0 });

  // Find Best Seller (second highest discount, not Top Discount or Trending Product)
  const bestSellerProduct = productsInCategory
    .filter(p => p.id !== topDiscountProduct.id && p.id !== trendingProduct.id)
    .reduce((max, p) => (p.discount || 0) > (max.discount || 0) ? p : max, { discount: 0 });


    

  // Build summary cards, ensuring uniqueness and filling with placeholders if needed
  const summaryCards = [
  {
    title: 'Top Discount',
    product: topDiscountProduct && topDiscountProduct.discount > 0 ? topDiscountProduct : null,
    placeholder: 'No Discount Product'
  },
  {
    title: 'Trending Product',
    product: trendingProduct && trendingProduct.name ? trendingProduct : null,
    placeholder: 'No Trending Product'
  },
  {
    title: 'Best Seller',
    product: bestSellerProduct && bestSellerProduct.discount > 0 ? bestSellerProduct : null,
    placeholder: 'No Best Seller'
  },
  {
    title: 'New Arrival',
    product: newArrivalProduct && newArrivalProduct.name ? newArrivalProduct : null,
    placeholder: 'No New Arrival'
  },
  {
    title: 'Most Reviewed',
    product: mostReviewedProduct && mostReviewedProduct.reviews > 0 ? mostReviewedProduct : null,
    placeholder: 'No Reviewed Product'
  },
  {
    title: 'Top Rated',
    product: topRatedProduct && topRatedProduct.rating > 0 ? topRatedProduct : null,
    placeholder: 'No Rated Product'
  }
];



  // --- End filtering logic ---

  // Exclude summary card products from the grid
  const summaryProductIds = summaryCards.map(card => card.product && card.product.id).filter(Boolean);
  let filteredProducts;
  if (selectedCategory === 'New Arrivals') {
    // ...existing code...
    const latestProducts = allProducts.filter(product => product.id > allProducts.length - 13);
    const latestIds = new Set(latestProducts.map(p => p.id));
    const categoriesSet = new Set(allProducts.map(p => p.category));
    const oneFromEachCategory = Array.from(categoriesSet).map(cat =>
      allProducts.find(p => p.category === cat && !latestIds.has(p.id))
    ).filter(Boolean);
    const allNewArrivals = [...latestProducts, ...oneFromEachCategory];
    const seen = new Set();
    filteredProducts = allNewArrivals.filter(p => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  } else if (selectedCategory === 'Mango Mania') {
    filteredProducts = allProducts.filter(product => product.name.toLowerCase().includes('mango'));
  } else if (selectedCategory === 'Saver Combo') {
    filteredProducts = allProducts.filter(product => product.discount && product.discount >= 10);
  } else {
    filteredProducts = allProducts.filter(product => {
      let matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesCategory && product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            && !summaryProductIds.includes(product.id);  // <- This removes them
    });
  }

  function addToCart(product) {
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
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
    }
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.qty * (item.discount ? (item.price * (1 - item.discount / 100)) : item.price), 0).toFixed(2);
  }

  function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
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

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        setWishlistMsg('Removed from wishlist');
        setShowWishlistMsg(true);
        setTimeout(() => setShowWishlistMsg(false), 1500);
        return prev.filter(id => id !== productId);
      } else {
        setWishlistMsg('Added to wishlist');
        setShowWishlistMsg(true);
        setTimeout(() => setShowWishlistMsg(false), 1500);
        return [...prev, productId];
      }
    });
  };

  // Add this mapping for category images
  const categoryImages = {
    All: 'https://img.freepik.com/free-photo/assortment-healthy-food_23-2148742192.jpg?auto=format&fit=crop&w=600&q=80',
    'New Arrivals': 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    'Mango Mania': 'https://mangomaniaus.com/cdn/shop/files/MangoMania_Alphonso-Compressed_3a8a2152-47c0-4272-b759-fbddf9d3541c.png?v=1737966186',
    'Saver Combo': 'https://img.freepik.com/free-photo/assortment-healthy-food_23-2148742192.jpg?auto=format&fit=crop&w=600&q=80',
    Fruits: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80',
    Vegetables: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80',
    Electronics: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    Home: 'https://bergnerhome.in/cdn/shop/articles/Header-Banner-1.png?v=1718542473&width=400',
    Dairy: 'https://t4.ftcdn.net/jpg/01/45/60/21/360_F_145602173_05uVexifBuCvWIKvsHGCHSvlcL2wrLUDD.jpg',
    Bakery: 'https://img.freepik.com/free-photo/sweet-pastry-assortment-top-view_23-2148516578.jpg?semt=ais_hybrid&w=400',
    Snacks: 'https://www.distacart.com/cdn/shop/files/71-FCdmBdeL._SL1080_1280x.jpg?v=1727265991',
    Beverages: 'https://www.hotelwelkinresidency.com/wp-content/uploads/2018/01/softdrinks.jpg',
    'Personal Care': 'https://t3.ftcdn.net/jpg/02/72/37/20/360_F_272372012_2aOGqAOdrJaFmaqlkGCHSvlcL2wrLUDD.jpg',
    Stationery: 'https://assets.entrepreneur.com/content/3x2/2000/1691225116-Hithere1.png?format=pjeg&auto=webp&crop=16:9&width=400',
    Toys: 'https://storio.in/cdn/shop/files/419j_9HBzFL.jpg?v=1712374499&width=400',
    'Pet Supplies': 'https://dfvc2y3mjtc8v.cloudfront.net/104100595/cover-HaXq6F/EM7mAnt-200x200.jpg',
  };

  // Slideshow images for New Arrivals
  const newArrivalsSlides = [
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    'https://mangomaniaus.com/cdn/shop/files/MangoMania_Alphonso-Compressed_3a8a2152-47c0-4272-b759-fbddf9d3541c.png?v=1737966186',
    'https://img.freepik.com/free-photo/assortment-healthy-food_23-2148742192.jpg?auto=format&fit=crop&w=600&q=80',
  ];
  const [slideIdx, setSlideIdx] = useState(0);

  // Reset modal image index when modal opens/closes or product changes
  useEffect(() => {
    setModalImgIdx(0);
  }, [productModal]);

  // Auto-slide for product modal image slider
  useEffect(() => {
    if (!productModal || !productModal.images || productModal.images.length <= 1) return;
    const timer = setInterval(() => {
      setModalImgIdx(idx => (idx + 1) % productModal.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [productModal]);

  // Keyboard navigation for gallery modal
  useEffect(() => {
    if (!galleryOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') setGalleryIdx(idx => (idx - 1 + productModal.images.length) % productModal.images.length);
      if (e.key === 'ArrowRight') setGalleryIdx(idx => (idx + 1) % productModal.images.length);
      if (e.key === 'Escape') setGalleryOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [galleryOpen, productModal]);

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
            <a className="active" onClick={() => navigate('/products')}
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
      {/* Category sidebar */}
      <aside className={`category-sidebar${collapsed ? ' collapsed' : ''}`}>
        <div className="category-cards-vertical">
          {categories.map(cat => {
            // Use categoryParam from URL if present, otherwise fallback to selectedCategory state
            const isSelected = (categoryParam ? categoryParam : selectedCategory) === cat;
            return (
              <div
                key={cat}
                className={`category-card-vertical${isSelected ? ' selected' : ''}`}
                onClick={() => {
                  navigate(`/products?category=${encodeURIComponent(cat)}`);
                }}
              >
                <img src={categoryImages[cat] || categoryImages['All']} alt={cat} className="category-card-img-vertical" />
                <span className="category-card-name-vertical">{cat}</span>
              </div>
            );
          })}
        </div>
      </aside>
      {/* Main Content */}
      <div className={`main-content with-category-sidebar${collapsed ? ' collapsed' : ''}`}>
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
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
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
        <div className="products-page-content">
          {/* Wishlist pop message */}
          {showWishlistMsg && (
            <div className="wishlist-pop-message">
              {wishlistMsg} <a href="/wishlist" style={{color:'#1d4ed8', marginLeft:8, textDecoration:'underline'}}>Go to Wishlist</a>
            </div>
          )}
          {/* --- Category summary section --- */}
             {/* Slideshow for New Arrivals */}
          {/* {selectedCategory === 'New Arrivals' && (
            <>
              <div className="new-arrivals-slideshow" style={{marginBottom: 24, position: 'relative', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                <img src={newArrivalsSlides[slideIdx]} alt="New Arrival Slide" style={{width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 4px 24px rgba(70,130,169,0.10)'}} />
                <div style={{position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8}}>
                  {newArrivalsSlides.map((_, idx) => (
                    <span key={idx} style={{width: 12, height: 12, borderRadius: '50%', background: idx === slideIdx ? '#228B22' : '#e0e7ef', display: 'inline-block', cursor: 'pointer', border: idx === slideIdx ? '2px solid #fff' : 'none'}} onClick={() => setSlideIdx(idx)}></span>
                  ))}
                </div>
                <button style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} onClick={() => setSlideIdx((slideIdx - 1 + newArrivalsSlides.length) % newArrivalsSlides.length)}>&lt;</button>
                <button style={{position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} onClick={() => setSlideIdx((slideIdx + 1) % newArrivalsSlides.length)}>&gt;</button>
              </div>
            </>
          )} */}
          {['All', 'Fruits', 'Vegetables', 'Electronics', 'Home', 'Dairy', 'Bakery', 'Snacks', 'Beverages', 'Personal Care', 'Stationery', 'Toys', 'Pet Supplies'].includes(selectedCategory) && (
            <div className="category-summary">
              <div className="summary-cards-row large">
                <Slider 
                    className="summary-slider"
                    arrows={true}
                    dots={false}
                    infinite={true}
                    speed={500}
                    slidesToShow={3}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={1800}
                  >
                    {summaryCards.map(({ title, product, placeholder }) => (
                        <SummaryProductCard
                          key={title}
                          title={title}
                          product={product}
                          placeholder={placeholder}
                          notified={notified}
                          setNotified={setNotified}
                          addToCart={addToCart}
                          cart={cart}
                          updateQty={updateQty}
                          wishlist={wishlist}
                          handleWishlist={handleWishlist}
                          setProductModal={setProductModal} 
                        />
                    ))}
                  </Slider>
              </div>
            </div>
          )}
          {/* --- End Category summary section --- */}
          {/* --- Products grid --- */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#b91c1c', fontWeight: 600, fontSize: '1.2rem', marginTop: 40 }}>No products found</div>
          ) : (
            <div className={`products-grid${collapsed ? ' sidebar-collapsed' : ''}`}> 
              {filteredProducts.map(product => {
                const cartItem = cart.find(item => item.id === product.id);
                const inWishlist = wishlist.includes(product.id);
                return (
                  <div className={`product-card${product.stock === 0 ? ' out-of-stock' : ''}`} key={product.id}
                    onClick={e => {
                      // Prevent modal open if clicking wishlist or add-to-cart
                      if (
                        e.target.closest('.wishlist-heart-btn') ||
                        e.target.closest('.add-to-cart-btn') ||
                        e.target.closest('.cart-qty-controls')
                      ) return;
                      setProductModal(product);
                    }}
                    style={{cursor:'pointer'}}
                  >
                    <div className="product-img-wrapper" style={{position:'relative'}}>
                      <img src={product.images[0]} alt={product.name} className="product-img" />
                      {/* Wishlist Heart Icon */}
                      <button
                        className="wishlist-heart-btn"
                        style={{position:'absolute', bottom:10, right:10, border:'none', background: inWishlist ? 'rgba(255,255,255,0.85)' : 'rgba(255,182,182,1)' , borderRadius:'50%', padding:7, cursor:'pointer', boxShadow:'0 1px 4px rgba(0,0,0,0.10)'}}
                        onClick={e => { e.stopPropagation(); handleWishlist(product.id); }}
                        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <FontAwesomeIcon icon={inWishlist ? faHeartFilled : faHeart} style={{color: inWishlist ? '#ef4444' : '#fff', fontSize:'1.3em' }}/>
                      </button>
                      {product.discount && (
                        <span className="product-discount-badge">{product.discount}% OFF</span>
                      )}
                      {product.stock === 0 && (
                        <span className="product-outofstock-badge">Out of Stock</span>
                      )}
                      {product.stock > 0 && product.stock <= 10 && (
                        <span className="product-lowstock-badge">Only {product.stock} left</span>
                      )}
                    </div>
                    <div className="product-info">
                      <div className="product-title-row">
                        <span className="product-name">{product.name}</span>
                      </div>

                      <div className="product-price-row-quantity">
                         <div className="product-price-row">
                              <span className="product-price">
                                {product.discount ? (
                                  <>
                                    <span className="old-price">₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span> ₹{(product.price * (1 - product.discount / 100)).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                                  </>
                                ) : (
                                  <>₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</>
                                )}
                              </span>
                          </div>
                          <div className="product-quantity">
                            <span className={product.quantity ? 'product-stock' : 'product-other'}>
                              {product.quantity || ''}
                            </span>
                          </div>
                        </div>  

                      <div className="product-desc">{product.desc}</div>
                      <div className="product-rating-row">
                        <span className="product-rating-star">★ {product.rating || 4.5}</span>
                        <span className="product-rating-reviews">({product.reviews ? product.reviews.toLocaleString() : '1,234'} reviews)</span>
                      </div>
                      {cartItem && cartItem.qty > 0 ? (
                        <div className="cart-qty-controls">
                          <button onClick={e => { e.stopPropagation(); updateQty(product.id, cartItem.qty - 1); }} disabled={product.stock === 0 || cartItem.qty === 0}>-</button>
                          <span>{cartItem.qty}</span>
                          <button onClick={e => { e.stopPropagation(); updateQty(product.id, cartItem.qty + 1); }} disabled={product.stock === 0}>+</button>
                        </div>
                      ) : (
                        product.stock === 0 ? (
                          <button
                            className="add-to-cart-btn notify-btn"
                            onClick={e => { e.stopPropagation(); setNotified(prev => ({ ...prev, [product.id]: true })); }}
                            disabled={!!notified[product.id]}
                          >
                            {notified[product.id] ? 'Alert Activated ' : 'Notify Me'}
                          </button>
                        ) : (
                          <button
                            className="add-to-cart-btn"
                            onClick={e => { e.stopPropagation(); addToCart(product); }}
                          >
                            Add to Cart
                          </button>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* --- End products grid --- */}
          {/* Bottom Fixed Cart Summary - Inside products-page-content */}
          {/* {cart.length > 0 && (
            <div className="bottom-cart-summary-inline">
              <div className="cart-summary-content">
                <div className="cart-summary-left">
                  <div className="cart-items-count">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>{getTotalItems()} items</span>
                  </div>
                  <div className="cart-total-amount">
                    Total: ₹{getTotal()}
                  </div>
                </div>
                <div className="cart-summary-right">
                  <button 
                    className="expand-cart-btn"
                    onClick={() => setShowCartModal(true)}
                    title="View Cart Details"
                  >
                    <FontAwesomeIcon icon={faExpand} />
                  </button>
                  <button className="checkout-btn-bottom" onClick={() => navigate('/cart', { state: { cart } })}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
        {/* Cart Modal */}
        {showCartModal && (
          <div className="cart-modal-overlay" onClick={() => setShowCartModal(false)}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
              <div className="cart-modal-header">
                <h3>Cart Details</h3>
                <button 
                  className="close-modal-btn"
                  onClick={() => setShowCartModal(false)}
                >
                  <FontAwesomeIcon icon={faCompress} />
                </button>
              </div>
              <div className="cart-modal-content">
                <ul className="cart-modal-list">
                  {cart.map(item => (
                    <li key={item.id} className="cart-modal-item">
                      <div className="cart-modal-item-img">
                        <img src={item.images[0]} alt={item.name} />
                      </div>
                      <div className="cart-modal-item-details">
                        <span className="cart-modal-item-name">{item.name}</span>
                        <span className="cart-modal-item-price">
                          {item.discount ? (
                            <>
                              <span className="old-price">₹{item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span> ₹{(item.price * (1 - item.discount / 100)).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                            </>
                          ) : (
                            <>₹{item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</>
                          )}
                        </span>
                      </div>
                      <div className="cart-modal-item-qty">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty === 0}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <div className="cart-modal-item-total">
                        ₹{((item.discount ? (item.price * (1 - item.discount / 100)) : item.price) * item.qty).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                      </div>
                      <button 
                        className="cart-modal-remove-btn" 
                        onClick={() => removeFromCart(item.id)}
                        title="Remove"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cart-modal-footer">
                <div className="cart-modal-total">
                  <span>Total ({getTotalItems()} items):</span>
                  <span className="cart-modal-total-amount">₹{getTotal()}</span>
                </div>
                <button className="cart-modal-checkout-btn" onClick={() => navigate('/cart', { state: { cart } })}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {productModal && (
        <div className="product-modal-overlay" onClick={() => setProductModal(null)}>
          <div className="product-modal" onClick={e => e.stopPropagation()} >
            <button className="close-modal-btn" style={{position:'absolute', top:10, right:14, background:'red', color:'#fff', zIndex:1000}} onClick={() => setProductModal(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          
            <div
              className="product-modal-slider-wrapper"
              style={{width:'50%', height:'400px' , position:'relative', marginBottom:0, borderRadius:12, overflow:'hidden', flexShrink:0}}
              onMouseEnter={e => e.currentTarget.classList.add('hovered')}
              onMouseLeave={e => e.currentTarget.classList.remove('hovered')}
            >
              <img
                src={productModal.images[modalImgIdx]}
                alt={productModal.name}
                style={{width:'100%', height:'100%',  borderRadius:12, cursor:'pointer'}}
                onClick={() => { setGalleryOpen(true); setGalleryIdx(modalImgIdx); }}
              />
              {/* Discount badge top-left */}
              {productModal.discount && (
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'linear-gradient(90deg,#ef4444 60%,#f59e42 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 15,
                    borderRadius: 8,
                    padding: '4px 12px',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                  }}
                >
                  {productModal.discount}% OFF
                </span>
              )}
              {/* Out of stock badge top-right */}
              {productModal.stock === 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 36,
                    background: 'linear-gradient(90deg,#b91c1c 60%,#64748b 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 15,
                    borderRadius: 8,
                    padding: '4px 12px',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                  }}
                >
                  Out of Stock
                </span>
              )}
              {/* Low stock badge bottom-left */}
              {productModal.stock > 0 && productModal.stock <= 10 && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    background: 'linear-gradient(90deg,#fee2e2 60%,#fee2e2 100%)',
                    color: '#b91c1c',
                    fontWeight: 700,
                    fontSize: 15,
                    borderRadius: 8,
                    padding: '4px 12px',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                  }}
                >
                  Only {productModal.stock} left in stock!
                </span>
              )}
              {productModal.images.length > 1 && (
                <>
                  {/* Left arrow (FontAwesome) */}
                  <button
                    className="slider-arrow left"
                    style={{position:'absolute', top:'50%', left:10, transform:'translateY(-50%)', background:'#228B22', color:'#fff', border:'none', borderRadius:'50%',  fontSize:18, padding:'6px 12px', fontWeight:700, cursor:'pointer', display:'none'}}
                    onClick={e => { e.stopPropagation(); setModalImgIdx(idx => (idx - 1 + productModal.images.length) % productModal.images.length); }}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  {/* Right arrow (FontAwesome) */}
                  <button
                    className="slider-arrow right"
                    style={{position:'absolute', top:'46.5%', right:0, transform:'translateX(-50%)', background:'#228B22', color:'#fff', border:'none', borderRadius:'50%',  fontSize:18, padding:'6px 12px', fontWeight:700, cursor:'pointer', display:'none'}}
                    onClick={e => { e.stopPropagation(); setModalImgIdx(idx => (idx + 1) % productModal.images.length); }}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                  {/* Dots */}
                  <div style={{position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6}}>
                    {productModal.images.map((img, idx) => (
                      <span
                        key={idx}
                        style={{width:10, height:10, borderRadius:'50%', background: idx === modalImgIdx ? '#228B22' : '#e0e7ef', display:'inline-block', cursor:'pointer', border: idx === modalImgIdx ? '2px solid #fff' : 'none'}}
                        onClick={e => { e.stopPropagation(); setModalImgIdx(idx); }}
                      ></span>
                    ))}
                  </div>
                </>
              )}
              {/* Show arrows on hover via CSS */}
              <style>{`
                .product-modal-slider-wrapper.hovered .slider-arrow { display: block !important; }
              `}</style>
            </div>
            {/* Right side: text and details */}
            <div style={{flex:1, minWidth:220, display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
              <div className="product-modal-title-row" >
                <h2 style={{margin:0, color:'#185a9d', fontWeight:700, fontSize:'1.3rem'}}>{productModal.name}</h2>
                <div className="old-new-price">
                  {productModal.discount ? (
                 <>
                   <span className="old-price">₹{productModal.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span> <span className="sales-new-price">₹{(productModal.price * (1 - productModal.discount / 100)).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                 </>
               ) : (
                 <> <span className='sales-new-price'> ₹{productModal.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></>
               )}
                  </div>
                  <div className="product-modal-quantity-row" >
                       <span className={productModal.quantity ? 'product-stock-quantity' : 'product-other-quantity'}>
                          {productModal.quantity || ''}
                        </span>
                  </div>
              </div>
              <div className="product-modal-rating-row" style={{display:'flex', alignItems:'center', gap:8, marginBottom:10}}>
                <span style={{color:'#f59e42', fontWeight:700, fontSize:18}}>★ {productModal.rating || 4.5}</span>
                <span style={{color:'#64748b', fontSize:14}}>({productModal.reviews ? productModal.reviews.toLocaleString() : '1,234'} reviews)</span>
              </div>
              <div className="product-modal-desc" style={{color:'#444', fontSize:15, marginBottom:14}}>{productModal.desc || 'No description available.'}</div>
              {/* Extra product details: about, benefits, extra */}
              {productModal.about && (
                <div style={{
                  color: '#185a9d',
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 8,
                  padding: '6px 0',
                  marginBottom: 8,
                }}>
                  <span style={{fontWeight:700, color:'#185a9d'}}>About:</span> {productModal.about}
                </div>
              )}
              {productModal.benefits && productModal.benefits.length > 0 && (
                <div style={{
                  color: '#059669',
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 8,
                  padding: '6px 0',
                  marginBottom: 8,
                }}>
                  <span style={{fontWeight:700, color:'#059669'}}>Benefits:</span>
                  <ul style={{margin: '8px 0 0 0', paddingLeft: 18, color:'#059669', fontWeight:500}}>
                    {productModal.benefits.map((b, i) => (
                      <li key={i} style={{marginBottom:2}}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
              {productModal.extra && (
                <div style={{
                  color: '#228B22',
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 8,
                  padding: '6px 0',
                  marginBottom: 8,
                }}>
                  <span style={{fontWeight:700, color:'#228B22'}}>Extra:</span> {productModal.extra}
                </div>
              )}
              {/* Add-to-cart or notify button in modal */}
              {(() => {
                const cartItem = cart.find(item => item.id === productModal.id);
                // Case 1: Out of stock
                if (productModal.stock === 0) {
                  return (
                    <button
                      className="add-to-cart-btn notify-btn"
                      style={{ width: '100%', marginTop: 8 }}
                      onClick={() => {
                        setNotified(prev => ({ ...prev, [productModal.id]: true }));
                      }}
                      disabled={!!notified[productModal.id]}
                    >
                      {notified[productModal.id] ? 'Alert Activated' : 'Notify Me'}
                    </button>
                  );
                }
                // Case 2: In stock and already in cart
                if (cartItem) {
                  return (
                    <div className="cart-qty-controls" style={{ justifyContent: 'center', marginTop: '8px' }}>
                      <button onClick={() => updateQty(productModal.id, cartItem.qty - 1)}>-</button>
                      <span>{cartItem.qty}</span>
                      <button onClick={() => updateQty(productModal.id, cartItem.qty + 1)}>+</button>
                    </div>
                  );
                }
                // Case 3: In stock and NOT in cart
                return (
                  <button
                    className="checkout-btn"
                    style={{ width: '100%', marginTop: 8 }}
                    onClick={() => {
                      addToCart(productModal);
                      setProductModal(null); // Close modal on add
                    }}
                  >
                    Add to Cart
                  </button>
                );
              })()}
            </div>
            
          </div>
          {/* Full-screen gallery modal */}
          {galleryOpen && productModal && (
            <div className="gallery-modal-overlay" onClick={() => setGalleryOpen(false)} style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.92)', zIndex:4000, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <div className="gallery-modal" onClick={e => e.stopPropagation()} style={{
                position: 'relative',
                width: '80vw',
                height: '80vh',
                maxWidth: '80vw',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
              }}>
                 <button className="close-modal-btn" style={{position:'absolute', top:10, right:14, background:'red', color:'#fff', zIndex:2}} onClick={() => setGalleryOpen(false)}>
                   <FontAwesomeIcon icon={faTimes} />
                 </button>
                 <img
                   src={productModal.images[galleryIdx]}
                   alt={productModal.name}
                   style={{
                     width: '100%',
                     height: '100%',
                    //  objectFit: 'cover',
                     borderRadius: 16,
                     boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                     marginBottom: 18,
                     background: '#fff',
                   }}
                 />
                 {productModal.images.length > 1 && (
                   <>
                     {/* Left arrow */}
                     <button
                       className="slider-arrow left"
                       style={{position:'absolute', top:'50%', left:10, transform:'translateY(-50%)', background:'#228B22', color:'#fff', border:'none', borderRadius:'50%', fontSize:18, padding:'6px 12px', fontWeight:700, cursor:'pointer', cursor:'pointer', zIndex:2}}
                       onClick={e => { e.stopPropagation(); setGalleryIdx(idx => (idx - 1 + productModal.images.length) % productModal.images.length); }}
                     >
                      <FontAwesomeIcon icon={faChevronLeft} />
                     </button>
                     {/* Right arrow */}
                     <button
                       className="slider-arrow right"
                       style={{position:'absolute', top:'50%', right:10, transform:'translateY(-50%)', background:'#228B22', color:'#fff', border:'none', borderRadius:'50%', fontSize:18, padding:'6px 12px', fontWeight:700, cursor:'pointer', cursor:'pointer', zIndex:2}}
                       onClick={e => { e.stopPropagation(); setGalleryIdx(idx => (idx + 1) % productModal.images.length); }}
                     >
                       <FontAwesomeIcon icon={faChevronRight} />
                     </button>
                     {/* Dots */}
                     <div style={{position:'absolute', bottom:18, left:'50%', transform:'translateX(-50%)', display:'flex', gap:8, zIndex:2}}>
                       {productModal.images.map((img, idx) => (
                         <span
                           key={idx}
                           style={{width:14, height:14, borderRadius:'50%', background: idx === galleryIdx ? '#fff' : '#64748b', display:'inline-block', cursor:'pointer', border: idx === galleryIdx ? '2px solid #228B22' : 'none'}}
                           onClick={e => { e.stopPropagation(); setGalleryIdx(idx); }}
                         ></span>
                       ))}
                     </div>
                   </>
                 )}
               </div>
             </div>
           )}
         </div>
       )}
     </div>
   );
 }

function SummaryProductCard({ title, product, placeholder, notified, setNotified, addToCart, cart, updateQty, wishlist, handleWishlist, setProductModal }) {
  // Choose icon and badge color based on card type
  let icon, badgeColor, badgeBg;

if (title === 'Top Discount') {
  icon = faFire;
  badgeColor = '#fff';
  badgeBg = '#ef4444'; // red
} 
else if (title === 'Trending Product') {
  icon = faChartLine;
  badgeColor = '#fff';
  badgeBg = '#3b82f6'; // blue
} 
else if (title === 'Best Seller') {
  icon = faStar;
  badgeColor = '#fff';
  badgeBg = '#f59e0b'; // amber
} 
else if (title === 'New Arrival') {
  icon = faTag;
  badgeColor = '#fff';
  badgeBg = '#10b981'; // green
} 
else if (title === 'Most Reviewed') {
  icon = faCheckCircle;
  badgeColor = '#fff';
  badgeBg = '#8b5cf6'; // purple
} 
else if (title === 'Top Rated') {
  icon = faHeart;
  badgeColor = '#fff';
  badgeBg = '#ec4899'; // pink
}

  const inWishlist = wishlist && product ? wishlist.includes(product?.id) : false;
  if (!product) {
    return (
      <div className="summary-card large placeholder sales-summary-card">
        <div className="sales-badge" style={{background: '#e5e7eb', color: '#6b7280'}}>{title}</div>
        <div className="summary-product-placeholder">{placeholder}</div>
      </div>
    );
  }
  const cartItem = cart.find(item => item.id === product.id);
   return (
     <div  className={`summary-card large sales-summary-card${product.stock === 0 ? ' out-of-stock' : ''}`} key={product.id}
                    onClick={e => {
                      // Prevent modal open if clicking wishlist or add-to-cart
                      if (
                        e.target.closest('.wishlist-heart-btn') ||
                        e.target.closest('.add-to-cart-btn') ||
                        e.target.closest('.cart-qty-controls')
                      ) return;
                      setProductModal(product);
                    }}
                    style={{cursor:'pointer'}}
                  >
     
       <div className="sales-badge" style={{background: badgeBg, color: badgeColor}}>
         <FontAwesomeIcon icon={icon} style={{marginRight: 6}} /> {title}
       </div>
       <div className="summary-img-wrapper">
         <>
           <img src={product.images[0]} alt={product.name} className="summary-img large" />
           {product.discount && (
             <span className="product-discount-badge">{product.discount}% OFF</span>
           )}
           {product.stock === 0 && (
             <span className="summary-outofstock-badge">Out of Stock</span>
           )}
         </>
         <div className="summary-product-rating-row">
        <button
            className="wishlist-heart-btn"
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              border: 'none',
              background: inWishlist ? 'rgba(255,255,255,0.85)' : 'rgba(255,182,182,1)',
              borderRadius: '50%',
              padding: 7,
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.10)'
            }}
            onClick={e => { e.stopPropagation(); handleWishlist(product.id); }}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <FontAwesomeIcon
              icon={inWishlist ? faHeartFilled : faHeart}
              style={{ color: inWishlist ? '#ef4444' : '#fff', fontSize: '1.3em' }}
            />
          </button>

       </div>
       </div>
       
       <div className="summary-product-name">{product.name}</div>
       <div className="summary-product-row-flex sales-flex-row">
         <div className="summary-product-left-block">
           <div className="summary-product-price-row">
             <span className="summary-product-price sales-price">
               {product.discount ? (
                 <>
                   <span className="summary-old-price">₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span> <span className="summary-sales-new-price-one">₹{(product.price * (1 - product.discount / 100)).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                 </>
               ) : (
                 <> <span className='summary-sales-new-price'> ₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></>
               )}
             </span>
           </div>
           <div className="summary-product-quantity">
              <span className={product.quantity ? 'summary-product-stock' : 'summary-product-other'}>
                {product.quantity || ''}
              </span>
           </div>
           <div className="summary-product-about">
             {product.desc || 'A great product for your needs.'}
           </div>
         </div>
         <div className="summary-product-btn-row">
           {cartItem && cartItem.qty > 0 ? (
             <div className="cart-qty-controls">
               <button onClick={() => updateQty(product.id, cartItem.qty - 1)} disabled={product.stock === 0 || cartItem.qty === 0}>-</button>
               <span>{cartItem.qty}</span>
               <button onClick={() => updateQty(product.id, cartItem.qty + 1)} disabled={product.stock === 0}>+</button>
             </div>
           ) : (
             product.stock === 0 ? (
               <button
                 className="add-to-cart-btn notify-btn"
                 onClick={() => setNotified(prev => ({ ...prev, [product.id]: true }))}
                 disabled={!!notified[product.id]}
               >
                 {notified[product.id] ? (
                   <>
                     <FontAwesomeIcon icon={faCheckCircle} style={{color:'#16a34a'}} /> 
                   </>
                 ) : (
                   <>
                     <FontAwesomeIcon icon={faBell} style={{color:'#fff'}} /> 
                   </>
                 )}
               </button>
             ) : (
               <button
                 className="add-to-cart-btn icon-btn"
                 onClick={() => addToCart(product)}
                 title="Add to Cart"
               >
                 <FontAwesomeIcon icon={faShoppingCart} style={{fontSize: '1.2em'}} />
               </button>
             )
           )}
         </div>
       </div>
     </div>
   );
 }

// line no 3674 &&  return matchesCategory && product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
//       && !summaryProductIds.includes(product.id);
// replace to this 
//  return matchesCategory && product.name.toLowerCase().includes(searchTerm.toLowerCase())

 export { allProducts };
 export default Products;
