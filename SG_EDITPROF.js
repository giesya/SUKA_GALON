const editProfileForm = document.getElementById('editProfileForm');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.querySelector('.cancel-btn');

editProfileForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('alamat').value; 

    if (!username && !email && !address) {
        modalMessage.textContent = 'Harap isi setidaknya satu field untuk diubah!';
        modal.style.display = 'flex';
        return;
    }

    let changes = [];
    if (username) changes.push(`Username: ${username}`);
    if (email) changes.push(`Email: ${email}`);
    if (address) changes.push(`Alamat: ${address}`); 

    modalMessage.textContent = `Profil berhasil diperbarui:\n${changes.join('\n')}`;
    modal.style.display = 'flex';

    editProfileForm.reset();
});

cancelBtn.addEventListener('click', function () {
    if (confirm('Apakah Anda yakin ingin membatalkan perubahan?')) {
        editProfileForm.reset();
    }
});

closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
