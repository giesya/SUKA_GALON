// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Simulasi login (pastikan email dan password sesuai)
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Cek email dan password (ini hanya simulasi, pastikan disesuaikan dengan sistem autentikasi yang benar)
    if (email === "admin@sukagalon.com" && password === "admin123") {
        document.getElementById('modalMessage').textContent = 'Login berhasil!';
        document.getElementById('alertModal').style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'SG_DASHBOARD-ADMIN.html';
        }, 1500); 
    } else {
        document.getElementById('modalMessage').textContent = 'Email atau Password salah!';
        document.getElementById('alertModal').style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('alertModal').style.display = 'none';
}

document.getElementById('loginForm').addEventListener('submit', handleLogin);
