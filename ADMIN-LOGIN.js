// Simulasi data pengguna yang terdaftar di database
const usersDatabase = [
    { email: "admin@sukagalon.com", password: "admin123" },
    { email: "user1@example.com", password: "userpass1" }
];

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Ambil email dan password dari form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validasi password minimal 6 karakter
    if (password.length < 6) {
        document.getElementById('modalMessage').textContent = 'Password harus terdiri dari minimal 6 karakter!';
        document.getElementById('alertModal').style.display = 'flex';
        return;
    }

    // Cek email dan password di database (simulasi)
    const user = usersDatabase.find(user => user.email === email && user.password === password);

    if (user) {
        // Jika ditemukan, login berhasil
        document.getElementById('modalMessage').textContent = 'Login berhasil!';
        document.getElementById('alertModal').style.display = 'flex';
        setTimeout(() => {
            // Redirect ke dashboard admin jika admin yang login
            if (user.email === "admin@sukagalon.com") {
                window.location.href = 'ADMIN-DASHBOARD.html';
            } else {
                window.location.href = 'ADMIN-LOGIN.html'; // Ganti dengan halaman pengguna biasa
            }
        }, 1500); 
    } else {
        // Jika email atau password salah
        document.getElementById('modalMessage').textContent = 'Email atau Password salah!';
        document.getElementById('alertModal').style.display = 'flex';
    }
}

// Function untuk menutup modal pesan
function closeModal() {
    document.getElementById('alertModal').style.display = 'none';
}

// Menambahkan event listener untuk form login
document.getElementById('loginForm').addEventListener('submit', handleLogin);