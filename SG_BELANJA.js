// script.js
let cart = [];

// Cart Functions
function toggleCart() {
    const cartPopup = document.querySelector('.cart-popup');
    const overlay = document.querySelector('.overlay');
    const isVisible = cartPopup.style.display === 'block';
    
    cartPopup.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
    
    if (isVisible) {
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
        updateCartDisplay();
    }
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    
    updateCartCount();
    updateCartDisplay();
    
    // Show notification
    showNotification(`${name} ditambahkan ke keranjang`);
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
    
    // Show notification
    showNotification(`${item.name} dihapus dari keranjang`);
}

function updateQuantity(index, change) {
    const item = cart[index];
    const newQuantity = item.quantity + change;
    
    if (newQuantity > 0) {
        item.quantity = newQuantity;
    } else {
        removeFromCart(index);
    }
    
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Rp${item.price.toLocaleString()}</p>
                <div class="quantity-controls">
                    <button class="btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="btn btn-danger" onclick="removeFromCart(${index})">Hapus</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: Rp${total.toLocaleString()}`;
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang belanja Anda kosong!', 'error');
        return;
    }
    
    // Save cart to localStorage before redirecting
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to payment page
    window.location.href = '/pembayaran';
}

// Profile Dropdown Functions
function toggleProfileMenu() {
    document.getElementById("profileDropdown").classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.profile-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Notification System
// script.js
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize cart from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
});

// Save cart to localStorage when modified
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart functions to include saving
const originalAddToCart = addToCart;
addToCart = (...args) => {
    originalAddToCart(...args);
    saveCart();
};

const originalRemoveFromCart = removeFromCart;
removeFromCart = (...args) => {
    originalRemoveFromCart(...args);
    saveCart();
};

const originalUpdateQuantity = updateQuantity;
updateQuantity = (...args) => {
    originalUpdateQuantity(...args);
    saveCart();
};

// Close cart when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const cartPopup = document.querySelector('.cart-popup');
        if (cartPopup.style.display === 'block') {
            toggleCart();
        }
    }
});

// Prevent closing cart when clicking inside it
document.querySelector('.cart-popup').addEventListener('click', (e) => {
    e.stopPropagation();
});