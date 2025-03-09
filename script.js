// JavaScript for interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Location selector functionality
            const locationSelector = document.querySelector('.location-selector');
            locationSelector.addEventListener('click', function() {
                alert('Location selection feature coming soon!');
            });

            // Search functionality
            const searchButton = document.querySelector('.search-bar button');
            const searchInput = document.querySelector('.search-bar input');
            searchButton.addEventListener('click', function() {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}`);
                } else {
                    alert('Please enter a search term');
                }
            });

            // Cuisine item click functionality
            const cuisineItems = document.querySelectorAll('.cuisine-item');
            cuisineItems.forEach(item => {
                item.addEventListener('click', function() {
                    const cuisineName = this.querySelector('p').textContent;
                    alert(`You selected ${cuisineName} cuisine`);
                });
            });

            // Restaurant card click functionality
            const restaurantCards = document.querySelectorAll('.restaurant-card');
            restaurantCards.forEach(card => {
                card.addEventListener('click', function() {
                    const restaurantName = this.querySelector('.restaurant-name').textContent;
                    alert(`You selected ${restaurantName}`);
                });
            });
        });

        document.addEventListener("DOMContentLoaded", function () {
        const cuisineGrid = document.querySelector(".cuisine-grid");
        const leftBtn = document.querySelector(".left-btn");
        const rightBtn = document.querySelector(".right-btn");

        leftBtn.addEventListener("click", () => {
            cuisineGrid.scrollBy({ left: -200, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            cuisineGrid.scrollBy({ left: 200, behavior: "smooth" });
        });
    });

    // JavaScript for interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Location selector functionality
            const locationSelector = document.querySelector('.location-selector');
            locationSelector.addEventListener('click', function() {
                alert('Location selection feature coming soon!');
            });

            // Search functionality
            const searchButton = document.querySelector('.search-bar button');
            const searchInput = document.querySelector('.search-bar input');
            searchButton.addEventListener('click', function() {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}`);
                } else {
                    alert('Please enter a search term');
                }
            });

            // Cuisine item click functionality
            const cuisineItems = document.querySelectorAll('.cuisine-item');
            cuisineItems.forEach(item => {
                item.addEventListener('click', function() {
                    const cuisineName = this.querySelector('p').textContent;
                    alert(`You selected ${cuisineName} cuisine`);
                });
            });

            // Restaurant card click functionality
            const restaurantCards = document.querySelectorAll('.restaurant-card');
            restaurantCards.forEach(card => {
                card.addEventListener('click', function() {
                    const restaurantName = this.querySelector('.restaurant-name').textContent;
                    alert(`You selected ${restaurantName}`);
                });
            });
        });

        document.addEventListener("DOMContentLoaded", function () {
        const cuisineGrid = document.querySelector(".cuisine-grid");
        const leftBtn = document.querySelector(".left-btn");
        const rightBtn = document.querySelector(".right-btn");

        leftBtn.addEventListener("click", () => {
            cuisineGrid.scrollBy({ left: -200, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            cuisineGrid.scrollBy({ left: 200, behavior: "smooth" });
        });
    });


    document.addEventListener('DOMContentLoaded', function() {
        const searchButton = document.querySelector('.search-bar button');
        const searchInput = document.querySelector('.search-bar input');
    
        searchButton.addEventListener('click', async function() {
            const searchTerm = searchInput.value.trim();
            if (!searchTerm) {
                alert('Please enter a search term');
                return;
            }
    
            try {
                const response = await fetch(`http://localhost:3000/search?q=${searchTerm}`);
                const data = await response.json();
    
                if (data.length === 0) {
                    alert("No results found!");
                } else {
                    // Assuming we redirect to the first matching restaurant
                    const restaurantName = data[0].name.replace(/\s+/g, '-').toLowerCase(); // Convert name to a URL-friendly format
                    window.location.href = `/restaurant/${restaurantName}`;
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
                alert("An error occurred. Please try again.");
            }
        });
    });


    
    const restaurantData = {
        'delicious-bites': {
            title: 'Delicious Bites',
            cuisine: 'North Indian, Chinese',
            rating: '⭐ 4.2',
            special: 'Chilli Chicken, Butter Naan'
        },
        'spice-paradise': {
            title: 'Spice Paradise',
            cuisine: 'South Indian, Biryani',
            rating: '⭐ 4.5',
            special: 'Hyderabadi Biryani, Masala Dosa'
        },
        'pizza-heaven': {
            title: 'Pizza Heaven',
            cuisine: 'Pizza, Italian',
            rating: '⭐ 4.0',
            special: 'Margherita Pizza, Pepperoni Pizza'
        },
        'burger-bliss': {
            title: 'Burger Bliss',
            cuisine: 'Burgers, Fast Food',
            rating: '⭐ 3.8',
            special: 'Cheese Burger, Crispy Chicken Burger'
        }
    };

    function openModal(restaurantKey) {
        const modal = document.getElementById('restaurant-modal');
        const overlay = document.getElementById('overlay');
        const data = restaurantData[restaurantKey];
        
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-content').innerHTML = `
            <p><strong>Cuisine:</strong> ${data.cuisine}</p>
            <p><strong>Rating:</strong> ${data.rating}</p>
            <p><strong>Special Dish:</strong> ${data.special}</p>
            <button class="add-to-cart">🛒Add to Cart</button>
        `;
        
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }

    function closeModal() {
        document.getElementById('restaurant-modal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }