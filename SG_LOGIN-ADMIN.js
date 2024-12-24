function handleAdminLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulasi validasi admin (backend untuk validasi sebenarnya)
    const adminEmail = "admin@sukagalon.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
        document.getElementById('modalMessage').textContent = "Login berhasil!";
        document.getElementById('alertModal').style.display = "block";
        setTimeout(() => {
            window.location.href = 'SG_DASHBOARD-ADMIN.html';
        }, 2000);
    } else {
        document.getElementById('modalMessage').textContent = "Email atau password salah!";
        document.getElementById('alertModal').style.display = "block";
    }
}

function closeModal() {
    document.getElementById('alertModal').style.display = "none";
}
document.getElementById('loginForm').addEventListener('submit', handleAdminLogin);
