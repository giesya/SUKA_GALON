function handleResetPassword(event) {
    event.preventDefault(); 
    const email = document.getElementById('email').value;
    document.getElementById('modalMessage').innerText = 
        `Tautan reset password berhasil dikirim ke ${email}`;
    document.getElementById('alertModal').style.display = 'block';

    // Simulate server action (replace this with an actual API call)
    setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    document.getElementById('alertModal').style.display = 'none';
}
