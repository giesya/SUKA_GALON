document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil nilai input
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validasi dasar
        if (!username || !email || !password || !confirmPassword) {
            alert('Semua field harus diisi!');
            return;
        }

        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Format email tidak valid!');
            return;
        }

        // Validasi password
        if (password.length < 6) {
            alert('Password harus minimal 6 karakter!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok!');
            return;
        }

        // Simpan data (contoh menggunakan localStorage)
        const userData = {
            username,
            email,
            password
        };
        
        try {
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Tampilkan modal success
            showSuccessModal();
            
            // Reset form
            form.reset();
            
        } catch (error) {
            alert('Terjadi kesalahan saat menyimpan data!');
            console.error('Error:', error);
        }
    });

    // Fungsi untuk menampilkan modal
    function showSuccessModal() {
        modal.style.display = 'flex';
        
        // Redirect ke halaman login setelah 2 detik
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    }

    // Tutup modal jika user klik di luar modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});