document.getElementById('editProfileForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;

    if (!nama || !email) {
        alert("Please fill out all fields.");
        return;
    }

    showModal("Profile updated successfully!");

    setTimeout(function() {
        window.location.href = "SG_BELANJA.html"; 
    }, 2000); 
    document.getElementById('editProfileForm').reset();
});

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';

    document.getElementById('closeModalBtn').addEventListener('click', function() {
        modal.style.display = 'none';
    });
}
