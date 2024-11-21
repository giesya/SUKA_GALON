// script.js
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.style.opacity = "0.8";
    } else {
        passwordInput.type = "password";
        toggleBtn.style.opacity = "1";
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('ingatsaya').checked;

    // Basic validation
    if (!email || !password) {
        alert('Email dan password harus diisi');
        return;
    }

    // Here you would typically send the data to a server
    console.log('Form submitted:', {
        email,
        password,
        rememberMe
    });
    
    // For demo purposes
    alert('Login berhasil!');
});