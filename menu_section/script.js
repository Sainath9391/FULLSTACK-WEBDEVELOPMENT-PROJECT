/**
 * @typedef {Object} MenuItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} currency - Currency symbol (e.g., "₹")
 * @property {string} category
 * @property {string} [subcategory]
 * @property {string} image
 * @property {string} description
 * @property {boolean} [isVeg]
 * @property {boolean} [isPopular]
 * @property {boolean} [isHealthy]
 * @property {boolean} [isChefSpecial]
 * @property {number} [spiceLevel]
 * @property {string[]} [customization]
 */

/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} currency - Currency symbol (e.g., "₹")
 * @property {string} image
 * @property {number} quantity
 */

// Global variables
let cart = [];
let activeCategory = 'all';
let activeSubcategory = null;

// DOM Elements
const menuContainer = document.getElementById('menu');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total-price');
const categoriesContainer = document.getElementById('categories');
const subcategoriesContainer = document.getElementById('subcategories-container');
const cartElement = document.getElementById('cart');
const cartToggleButton = document.getElementById('cart-toggle');
const closeCartButton = document.getElementById('close-cart');
const placeOrderButton = document.getElementById('place-order');
const tableNumberInput = document.getElementById('tableNumber');
const phoneNumberInput = document.getElementById('phoneNumber');

// Categories data
const categories = [
  {
    id: "breads",
    name: "Breads & Rotis",
    description: "Traditional Indian breads",
    subcategories: ["naan", "roti", "paratha", "kulcha"]
  },
  {
    id: "rice",
    name: "Rice Specialties",
    description: "Aromatic rice preparations",
    subcategories: ["plain", "pulao", "fried"]
  },
  {
    id: "chicken",
    name: "Chicken Delicacies",
    description: "Tender chicken preparations",
    subcategories: ["curry", "tandoor", "stir-fry"]
  },
  {
    id: "biryani",
    name: "Signature Biryanis",
    description: "Fragrant rice preparations with meat or vegetables",
    subcategories: ["chicken", "vegetarian", "mutton", "seafood"]
  },
  {
    id: "vegetarian",
    name: "Vegetarian Curries",
    description: "Flavorful vegetarian dishes",
    subcategories: ["paneer", "legumes", "vegetables"]
  },
  {
    id: "starters",
    name: "Appetizers",
    description: "Start your meal right",
    subcategories: ["vegetarian", "non-vegetarian"]
  },
  {
    id: "seafood",
    name: "Seafood",
    description: "Fresh seafood delicacies",
    subcategories: ["curry", "tandoor", "specialty"]
  },
  {
    id: "desserts",
    name: "Sweet Endings",
    description: "Traditional Indian desserts",
    subcategories: ["hot", "cold", "specialty"]
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Refreshing drinks",
    subcategories: ["hot", "cold", "alcoholic"]
  }
];

// Menu items data
const menuItems = [
  // Breads & Rotis
  {
    id: 1,
    name: "Butter Naan",
    price: 3.99,
    category: "breads",
    subcategory: "naan",
    image: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
    description: "Soft and buttery leavened bread",
    isVeg: true,
    isPopular: true,
    customization: ["Butter", "Garlic", "Plain"]
  },
  {
    id: 2,
    name: "Garlic Naan",
    price: 4.49,
    category: "breads",
    subcategory: "naan",
    image: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
    description: "Naan bread topped with garlic and herbs",
    isVeg: true,
    customization: ["Extra Garlic", "Butter", "Chili"]
  },
  {
    id: 3,
    name: "Tandoori Roti",
    price: 2.99,
    category: "breads",
    subcategory: "roti",
    image: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
    description: "Whole wheat bread cooked in tandoor",
    isVeg: true,
    isHealthy: true
  },
  {
    id: 4,
    name: "Laccha Paratha",
    price: 4.99,
    category: "breads",
    subcategory: "paratha",
    image: "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    description: "Flaky layered bread with butter",
    isVeg: true,
    isPopular: true
  },
  {
    id: 5,
    name: "Aloo Paratha",
    price: 5.49,
    category: "breads",
    subcategory: "paratha",
    image: "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg",
    description: "Stuffed potato flatbread",
    isVeg: true,
    spiceLevel: 2
  },
  {
    id: 6,
    name: "Amritsari Kulcha",
    price: 5.99,
    category: "breads",
    subcategory: "kulcha",
    image: "https://media.istockphoto.com/id/1432760289/photo/aloo-paratha-or-potato-stuffed-flat-bread-on-a-wooden-background-served-with-curd-and-sauce.webp?a=1&b=1&s=612x612&w=0&k=20&c=hf5y4uIoh-WgagzfAhBHvyByF6e_jgB4_OB5zZZKVk0=",
    description: "Stuffed bread with spiced potatoes and onions",
    isVeg: true,
    isChefSpecial: true,
    spiceLevel: 2
  },

  // Rice Specialties
  {
    id: 7,
    name: "Jeera Rice",
    price: 6.99,
    category: "rice",
    subcategory: "plain",
    image: "https://media.istockphoto.com/id/1205482227/photo/indian-traditional-dal-fry-and-jeera-rice-also-known-as-dal-chawal-cooked-lentils-served-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=2tI4k1UE92zo6VF0eEf8sjf1ALUZHOYD-T501A3gDIQ=",
    description: "Basmati rice with cumin tempering",
    isVeg: true,
    spiceLevel: 1
  },
  {
    id: 8,
    name: "Veg Pulao",
    price: 8.99,
    category: "rice",
    subcategory: "pulao",
    image: "https://media.istockphoto.com/id/2008143481/photo/veg-biryani-or-veg-pulav-fried-rice-indian-food-vegetable-biryani.webp?a=1&b=1&s=612x612&w=0&k=20&c=-Pw4pSTRILBzRydB1zHvYaqM65EzZJCG9DKx6Z7E1F4=",
    description: "Rice cooked with mixed vegetables and aromatic spices",
    isVeg: true,
    isHealthy: true,
    spiceLevel: 2
  },
  {
    id: 9,
    name: "Mushroom Rice",
    price: 9.99,
    category: "rice",
    subcategory: "pulao",
    image: "https://www.themealdb.com/images/media/meals/ssyqwr1511451678.jpg",
    description: "Rice cooked with mushrooms and herbs",
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 10,
    name: "Egg Fried Rice",
    price: 10.99,
    category: "rice",
    subcategory: "fried",
    image: "https://www.themealdb.com/images/media/meals/yrstur1511816601.jpg",
    description: "Stir-fried rice with eggs and vegetables",
    spiceLevel: 2
  },

  // Chicken Delicacies
  {
    id: 11,
    name: "Butter Chicken",
    price: 14.99,
    category: "chicken",
    subcategory: "curry",
    image: "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg",
    description: "Tender chicken in rich tomato-butter gravy",
    isPopular: true,
    spiceLevel: 2,
    customization: ["Spice Level", "Extra Gravy"]
  },
  {
    id: 12,
    name: "Chicken Tikka",
    price: 12.99,
    category: "chicken",
    subcategory: "tandoor",
    image: "https://media.istockphoto.com/id/1286704566/photo/image-of-turquoise-blue-cooking-pan-filled-with-butter-chicken-tikka-curry-large-chunks-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=_UHYNHAOBxEoOrzqLgi3iRN9S03FrsKhDWPgubpSdg4=",
    description: "Marinated and grilled chicken pieces",
    isPopular: true,
    spiceLevel: 3
  },
  {
    id: 13,
    name: "Kadai Chicken",
    price: 13.99,
    category: "chicken",
    subcategory: "curry",
    image: "https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg",
    description: "Spicy chicken with bell peppers",
    spiceLevel: 4
  },
  {
    id: 14,
    name: "Chicken Korma",
    price: 14.49,
    category: "chicken",
    subcategory: "curry",
    image: "https://media.istockphoto.com/id/1289789761/photo/image-of-blue-plate-filled-with-butter-chicken-tikka-curry-large-chunks-of-chicken-breast.webp?a=1&b=1&s=612x612&w=0&k=20&c=lQC4EKqGdMOLpNisMCQDlxt1hOtazECAMRAieOb0MrI=",
    description: "Chicken in creamy cashew and yogurt sauce",
    spiceLevel: 2,
    isChefSpecial: true
  },
  {
    id: 15,
    name: "Chilli Chicken",
    price: 13.49,
    category: "chicken",
    subcategory: "stir-fry",
    image: "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg",
    description: "Indo-Chinese style spicy chicken",
    isPopular: true,
    spiceLevel: 4
  },

  // Biryani Varieties
  {
    id: 16,
    name: "Hyderabadi Chicken Biryani",
    price: 15.99,
    category: "biryani",
    subcategory: "chicken",
    image: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
    description: "Aromatic rice with spiced chicken, traditional style",
    isPopular: true,
    spiceLevel: 3,
    customization: ["Spice Level", "Extra Raita"]
  },
  {
    id: 17,
    name: "Veg Biryani",
    price: 12.99,
    category: "biryani",
    subcategory: "vegetarian",
    image: "https://www.themealdb.com/images/media/meals/qqwypw1504642429.jpg",
    description: "Mixed vegetables and rice with aromatic spices",
    isVeg: true,
    spiceLevel: 2
  },
  {
    id: 18,
    name: "Mutton Biryani",
    price: 16.99,
    category: "biryani",
    subcategory: "mutton",
    image: "https://media.istockphoto.com/id/1486585180/photo/mutton-biriyani-close-up-image-in-a-restaurant-food-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=Iu_qWPew6hv4w4MJD4aSJ7dLJgH3ZQK1vaRlV8uwx7g=",
    description: "Traditional mutton biryani with tender meat",
    isChefSpecial: true,
    spiceLevel: 3
  },
  {
    id: 19,
    name: "Prawn Biryani",
    price: 17.99,
    category: "biryani",
    subcategory: "seafood",
    image: "https://media.istockphoto.com/id/1334383289/photo/prawn-or-shrimp-biryani-fish-biryani-spicy-and-delicious-malabar-biryani-pulao-basmati-rice.webp?a=1&b=1&s=612x612&w=0&k=20&c=dKyw0WKP83K5vtkOfHa0f8oOkTrOsI5pYzv3HLGG6G8=",
    description: "Fragrant rice with marinated prawns",
    spiceLevel: 3,
    isChefSpecial: true
  },

  // Vegetarian Curries
  {
    id: 20,
    name: "Paneer Butter Masala",
    price: 12.99,
    category: "vegetarian",
    subcategory: "paneer",
    image: "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg",
    description: "Cottage cheese cubes in rich tomato gravy",
    isVeg: true,
    isPopular: true,
    spiceLevel: 2
  },
  {
    id: 21,
    name: "Dal Makhani",
    price: 10.99,
    category: "vegetarian",
    subcategory: "legumes",
    image: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
    description: "Creamy black lentils slow-cooked to perfection",
    isVeg: true,
    isPopular: true,
    spiceLevel: 2
  },
  {
    id: 22,
    name: "Aloo Gobi",
    price: 11.49,
    category: "vegetarian",
    subcategory: "vegetables",
    image: "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
    description: "Potatoes and cauliflower cooked with spices",
    isVeg: true,
    isHealthy: true,
    spiceLevel: 2
  },
  {
    id: 23,
    name: "Palak Paneer",
    price: 12.49,
    category: "vegetarian",
    subcategory: "paneer",
    image: "https://media.istockphoto.com/id/1250399530/photo/vegetarian-palak-paneer.webp?a=1&b=1&s=612x612&w=0&k=20&c=2euIGtU3mYxSOh3_23NS0K0b0lh3BooXrHU1y4Q2ZIA=",
    description: "Cottage cheese in spinach gravy",
    isVeg: true,
    isHealthy: true,
    spiceLevel: 1
  },

  // Starters
  {
    id: 24,
    name: "Paneer Tikka",
    price: 10.99,
    category: "starters",
    subcategory: "vegetarian",
    image: "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg",
    description: "Grilled cottage cheese with spices",
    isVeg: true,
    isPopular: true,
    spiceLevel: 2
  },
  {
    id: 25,
    name: "Chicken 65",
    price: 11.99,
    category: "starters",
    subcategory: "non-vegetarian",
    image: "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
    description: "Spicy deep-fried chicken",
    isPopular: true,
    spiceLevel: 4
  },
  {
    id: 26,
    name: "Vegetable Samosa",
    price: 6.99,
    category: "starters",
    subcategory: "vegetarian",
    image: "https://media.istockphoto.com/id/980106992/photo/samosa-snack-served-with-tomato-ketchup-and-mint-chutney.webp?a=1&b=1&s=612x612&w=0&k=20&c=kLqY6RY-uvHPdGqExrUzas9n4V6GOgoa3XY7ApquWmM=",
    description: "Crispy pastry filled with spiced potatoes and peas",
    isVeg: true,
    isPopular: true,
    spiceLevel: 2
  },
  {
    id: 27,
    name: "Onion Bhaji",
    price: 5.99,
    category: "starters",
    subcategory: "vegetarian",
    image: "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
    description: "Crispy onion fritters with spices",
    isVeg: true,
    spiceLevel: 2
  },

  // Seafood
  {
    id: 28,
    name: "Fish Curry",
    price: 15.99,
    category: "seafood",
    subcategory: "curry",
    image: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
    description: "Fish cooked in tangy curry sauce",
    spiceLevel: 3
  },
  {
    id: 29,
    name: "Tandoori Prawns",
    price: 16.99,
    category: "seafood",
    subcategory: "tandoor",
    image: "https://www.themealdb.com/images/media/meals/vvstvq1487342592.jpg",
    description: "Marinated prawns cooked in clay oven",
    isChefSpecial: true,
    spiceLevel: 2
  },
  {
    id: 30,
    name: "Goan Fish Curry",
    price: 16.49,
    category: "seafood",
    subcategory: "curry",
    image: "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
    description: "Coconut-based fish curry with Goan spices",
    isChefSpecial: true,
    spiceLevel: 4
  },
  {
    id: 31,
    name: "Prawn Masala",
    price: 17.99,
    category: "seafood",
    subcategory: "specialty",
    image: "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg",
    description: "Prawns cooked in spicy tomato-based gravy",
    spiceLevel: 3
  },

  // Desserts
  {
    id: 32,
    name: "Gulab Jamun",
    price: 5.99,
    category: "desserts",
    subcategory: "hot",
    image: "https://media.istockphoto.com/id/1188000786/photo/gulab-jamun-in-bowl-on-wooden-background-indian-dessert-or-sweet-dish.webp?a=1&b=1&s=612x612&w=0&k=20&c=4kVDa_BP4pypOSvfDSL2mmLNO3SYdoAs1VG-qi4WAtI=",
    description: "Sweet milk dumplings in sugar syrup",
    isVeg: true,
    isPopular: true
  },
  {
    id: 33,
    name: "Rasmalai",
    price: 6.99,
    category: "desserts",
    subcategory: "cold",
    image: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
    description: "Soft cottage cheese dumplings in sweet milk",
    isVeg: true,
    isChefSpecial: true
  },
  {
    id: 34,
    name: "Kheer",
    price: 5.49,
    category: "desserts",
    subcategory: "cold",
    image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    description: "Rice pudding with cardamom and nuts",
    isVeg: true
  },
  {
    id: 35,
    name: "Gajar Ka Halwa",
    price: 6.49,
    category: "desserts",
    subcategory: "hot",
    image: "https://www.themealdb.com/images/media/meals/qxuqtt1511724269.jpg",
    description: "Carrot pudding with nuts and cardamom",
    isVeg: true,
    isPopular: true,
    isChefSpecial: true
  },
  {
    id: 36,
    name: "Jalebi",
    price: 4.99,
    category: "desserts",
    subcategory: "hot",
    image: "https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg",
    description: "Crispy sweet spirals soaked in sugar syrup",
    isVeg: true
  },

  // Beverages
  {
    id: 37,
    name: "Masala Chai",
    price: 3.49,
    category: "beverages",
    subcategory: "hot",
    image: "https://media.istockphoto.com/id/1297483389/photo/masala-tea-chai.webp?a=1&b=1&s=612x612&w=0&k=20&c=oADtFh9itSkSjVfi22qwDklh736CtbxsnAxmz2rPzas=",
    description: "Spiced Indian tea with milk",
    isVeg: true,
    isPopular: true
  },
  {
    id: 38,
    name: "Mango Lassi",
    price: 4.99,
    category: "beverages",
    subcategory: "cold",
    image: "https://media.istockphoto.com/id/1136089414/photo/buttermilk-mango-and-turmeric-indian-beverage.webp?a=1&b=1&s=612x612&w=0&k=20&c=CbAahpBvz9o7kqq1TQx__FPjeTq6VZeO41KiJM-CcwM=",
    description: "Sweet yogurt drink with mango pulp",
    isVeg: true,
    isPopular: true
  },
  {
    id: 39,
    name: "Sweet Lassi",
    price: 3.99,
    category: "beverages",
    subcategory: "cold",
    image: "https://www.themealdb.com/images/media/meals/rvypwy1503069308.jpg",
    description: "Sweet yogurt drink with cardamom",
    isVeg: true
  },
  {
    id: 40,
    name: "Indian Beer",
    price: 6.99,
    category: "beverages",
    subcategory: "alcoholic",
    image: "https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg",
    description: "Refreshing lager beer",
    isPopular: true
  }
];

// Initialize the menu
function init() {
  initializeCategories();
  displayMenu();
  setupEventListeners();
}

// Initialize category buttons
function initializeCategories() {
  let categoryButtonsHTML = `
    <button class="category-btn active" data-category="all">All Items</button>
  `;
  
  categories.forEach(category => {
    categoryButtonsHTML += `
      <button class="category-btn" data-category="${category.id}">${category.name}</button>
    `;
  });
  
  categoriesContainer.innerHTML = categoryButtonsHTML;
}

// Display menu items based on active category and subcategory
function displayMenu() {
  menuContainer.innerHTML = '';
  
  const filteredItems = getFilteredItems();
  
  if (filteredItems.length === 0) {
    menuContainer.innerHTML = '<p class="empty-menu-message">No items found in this category.</p>';
    return;
  }
  
  filteredItems.forEach(item => {
    const menuItemElement = document.createElement('div');
    menuItemElement.className = `menu-item ${item.isPopular ? 'popular' : ''}`;
    
    menuItemElement.innerHTML = `
      ${item.isPopular ? '<span class="popular-badge">Popular</span>' : ''}
      <img src="${item.image}" alt="${item.name}">
      <div class="menu-item-info">
        <h3>${item.name}</h3>
        ${renderDietaryInfo(item)}
        <p class="menu-item-description">${item.description}</p>
        ${renderSpiceLevel(item)}
        <div class="price-section">
          <p class="menu-item-price">₹${item.price.toFixed(2)}</p>
          ${renderCustomizationOptions(item)}
        </div>
        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
      </div>
    `;
    
    menuContainer.appendChild(menuItemElement);
  });
}

// Filter menu items by category and subcategory
function getFilteredItems() {
  if (activeCategory === 'all') {
    return menuItems;
  }
  
  return menuItems.filter(item => {
    if (item.category !== activeCategory) return false;
    if (activeSubcategory && item.subcategory !== activeSubcategory) return false;
    return true;
  });
}

// Display subcategories for the active category
function displaySubcategories() {
  if (activeCategory === 'all') {
    subcategoriesContainer.style.display = 'none';
    return;
  }
  
  const category = categories.find(cat => cat.id === activeCategory);
  if (!category || category.subcategories.length === 0) {
    subcategoriesContainer.style.display = 'none';
    return;
  }
  
  let subcategoryButtonsHTML = `
    <button class="subcategory-btn ${activeSubcategory === null ? 'active' : ''}" data-subcategory="all">
      All ${category.name}
    </button>
  `;
  
  category.subcategories.forEach(subcategory => {
    const subcategoryName = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
    subcategoryButtonsHTML += `
      <button class="subcategory-btn ${activeSubcategory === subcategory ? 'active' : ''}" data-subcategory="${subcategory}">
        ${subcategoryName}
      </button>
    `;
  });
  
  subcategoriesContainer.innerHTML = subcategoryButtonsHTML;
  subcategoriesContainer.style.display = 'flex';
}

// Render dietary information badges
function renderDietaryInfo(item) {
  let html = '<div class="dietary-info">';
  
  if (item.isVeg) {
    html += '<span class="dietary-badge veg-badge">Veg</span>';
  }
  
  if (item.isHealthy) {
    html += '<span class="dietary-badge healthy-badge">Healthy</span>';
  }
  
  if (item.isChefSpecial) {
    html += '<span class="dietary-badge special-badge">Chef\'s Special</span>';
  }
  
  html += '</div>';
  
  return html;
}

// Render spice level indicators
function renderSpiceLevel(item) {
  if (!item.spiceLevel) return '';
  
  const maxLevel = 5;
  let html = '<div class="spice-level">';
  
  for (let i = 0; i < maxLevel; i++) {
    html += `<span class="spice-icon ${i < item.spiceLevel ? 'active' : ''}">🌶️</span>`;
  }
  
  html += '</div>';
  
  return html;
}

// Render customization options
function renderCustomizationOptions(item) {
  if (!item.customization || item.customization.length === 0) return '';
  
  let html = '<select class="customize-select">';
  html += '<option value="">Customize</option>';
  
  item.customization.forEach(option => {
    html += `<option value="${option}">${option}</option>`;
  });
  
  html += '</select>';
  
  return html;
}

// Add item to cart
function addToCart(itemId) {
  const item = menuItems.find(item => item.id === itemId);
  if (!item) return;
  
  const existingItem = cart.find(cartItem => cartItem.id === itemId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  }
  
  updateCart();
}

// Update item quantity in cart
function updateQuantity(itemId, change) {
  const itemIndex = cart.findIndex(item => item.id === itemId);
  if (itemIndex === -1) return;
  
  cart[itemIndex].quantity += change;
  
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }
  
  updateCart();
}

// Update cart display
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
  
  // Update cart items
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
  } else {
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.className = 'cart-item';
      
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
        </div>
      `;
      
      cartItemsContainer.appendChild(cartItemElement);
    });
  }
  
  // Update total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Toggle cart visibility
function toggleCart() {
  cartElement.classList.toggle('active');
}

// Place order
function placeOrder() {
  const tableNumber = tableNumberInput.value;
  const phoneNumber = phoneNumberInput.value;
  
  if (!tableNumber || !phoneNumber) {
    alert('Please enter table number and phone number');
    return;
  }
  
  if (cart.length === 0) {
    alert('Please add items to your cart');
    return;
  }
  
  const orderDetails = {
    tableNumber,
    phoneNumber,
    items: cart,
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };
  
  // Here you would typically send this to a server
  console.log('Order placed:', orderDetails);
  alert(`Order placed successfully!\nTable: ${tableNumber}\nTotal: ₹${orderDetails.total.toFixed(2)}`);
  
  // Clear cart and form
  cart = [];
  tableNumberInput.value = '';
  phoneNumberInput.value = '';
  updateCart();
  toggleCart();
}

// Set up event listeners
function setupEventListeners() {
  // Category buttons
  categoriesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-btn')) {
      const categoryId = e.target.dataset.category;
      
      // Update active category
      document.querySelector('.category-btn.active').classList.remove('active');
      e.target.classList.add('active');
      
      activeCategory = categoryId;
      activeSubcategory = null;
      
      displaySubcategories();
      displayMenu();
    }
  });
  
  // Subcategory buttons
  subcategoriesContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('subcategory-btn')) {
      const subcategoryId = e.target.dataset.subcategory;
      
      // Update active subcategory
      document.querySelectorAll('.subcategory-btn.active').forEach(btn => {
        btn.classList.remove('active');
      });
      e.target.classList.add('active');
      
      activeSubcategory = subcategoryId === 'all' ? null : subcategoryId;
      
      displayMenu();
    }
  });
  
  // Add to cart buttons
  menuContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const itemId = parseInt(e.target.dataset.id);
      addToCart(itemId);
    }
  });
  
  // Cart quantity buttons
  cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-btn')) {
      const itemId = parseInt(e.target.dataset.id);
      const change = e.target.classList.contains('increase') ? 1 : -1;
      updateQuantity(itemId, change);
    }
  });
  
  // Cart toggle
  cartToggleButton.addEventListener('click', toggleCart);
  closeCartButton.addEventListener('click', toggleCart);
  
  // Place order
  placeOrderButton.addEventListener('click', placeOrder);
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);



document.addEventListener("DOMContentLoaded", function () {
  const restaurantSelect = document.getElementById("restaurantSelect");

  // Replace this with an actual API call if fetching from the backend
  const restaurants = [
      { id: 1, name: "The Food Court" },
      { id: 2, name: "Spice Haven" },
      { id: 3, name: "Urban Dine" },
      { id: 4, name: "Gourmet Hub" }
  ];

  // Populate the dropdown with restaurant names
  restaurants.forEach(restaurant => {
      let option = document.createElement("option");
      option.value = restaurant.id; 
      option.textContent = restaurant.name; 
      restaurantSelect.appendChild(option);
  });
});
