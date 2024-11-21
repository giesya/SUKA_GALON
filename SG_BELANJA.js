// script.js
let cart = [];
let cartBadge = document.querySelector('.cart-badge');
let cartTotal = document.getElementById('cartTotal');
let cartPopup = document.getElementById('cartPopup');

function addToCart(productName, price) {
    cart.push({
        name: productName,
        price: price
    });
    
    // Update cart badge and popup
    updateCartBadge();
    updateCartPopup();
    
    // Show notification
    showNotification(productName);
    
    // Log cart status
    console.log('Cart updated:', cart);
    console.log('Total: Rp' + calculateCartTotal().toLocaleString());
}

function updateCartBadge() {
    cartBadge.textContent = cart.length;
    
    // Reset animation
    cartBadge.style.animation = 'none';
    cartBadge.offsetHeight; // Trigger reflow
    cartBadge.style.animation = 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

function updateCartPopup() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>Rp${item.price.toLocaleString()}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    const total = calculateCartTotal();
    cartTotal.textContent = total.toLocaleString();
}

function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

function toggleCartPopup() {
    cartPopup.classList.toggle('show');
}

function showNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
        font-family: 'Nunito', sans-serif;
    `;
    
    notification.innerHTML = `✅ ${productName} telah ditambahkan ke keranjang`;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);