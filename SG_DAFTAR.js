document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil nilai input dari form
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

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

        // Contoh daftar email yang sudah terdaftar
        const registeredEmails = ['test@example.com', 'user@example.com'];

        if (registeredEmails.includes(email)) {
            document.getElementById('emailError').style.display = 'block';
        } else {
            document.getElementById('emailError').style.display = 'none';
            // Tampilkan modal sukses atau proses lainnya
            showSuccessModal();
            form.reset();
        }
    });

    // Fungsi untuk menampilkan modal
    function showSuccessModal() {
        modal.style.display = 'flex';

        // Redirect ke halaman login setelah 2 detik
        setTimeout(function() {
            window.location.href = 'SG_LOGIN.html';
        }, 2000);
    }

    // Tutup modal jika user klik di luar modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
