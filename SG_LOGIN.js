function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Simple validation
    if (!email || !password) {
        showModal('Mohon isi semua field!');
        return;
    }
    
    // Save to localStorage if remember is checked
    if (remember) {
        localStorage.setItem('userEmail', email);
    } else {
        localStorage.removeItem('userEmail');
    }
    
    // Show success message and redirect after successful login
    showModal('Login berhasil!');
}

function showModal(message) {
    const modal = document.getElementById('alertModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('alertModal');
    modal.style.display = 'none';
    
    // Redirect to belanja page after successful login
    if (document.getElementById('modalMessage').textContent === 'Login berhasil!') {
        window.location.href = '/belanja';
    }
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '👁️';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️‍🗨️';
    }
}

// Reset password form handling
function handleResetPassword(event) {
    event.preventDefault();
    
    const resetEmail = document.getElementById('resetEmail').value;

    if (!resetEmail) {
        alert('Mohon masukkan email!');
        return;
    }

    // Logic for sending password reset link (to be handled server-side)
    alert('Link reset password telah dikirim ke: ' + resetEmail);

    // Close reset password form after submission
    closeResetPasswordForm();
}

// Show reset password form modal
function showResetPasswordForm() {
    document.getElementById('resetPasswordModal').style.display = 'block';
}

// Close reset password form modal
function closeResetPasswordForm() {
    document.getElementById('resetPasswordModal').style.display = 'none';
}

// Load saved email if exists
document.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('alertModal');
    if (event.target === modal) {
        closeModal();
    }

    const resetModal = document.getElementById('resetPasswordModal');
    if (event.target === resetModal) {
        closeResetPasswordForm();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeResetPasswordForm();
    }
});
