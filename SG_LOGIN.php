<?php
$servername = "localhost"; // Ganti dengan server database Anda
$username = "root"; // Ganti dengan username database Anda
$password = ""; // Ganti dengan password database Anda
$dbname = "sukagalon"; // Nama database

// Koneksi ke database
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Mendapatkan data JSON dari JavaScript
$data = json_decode(file_get_contents("php://input"), true);

// Validasi data
if (!empty($data['email']) && !empty($data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    $password = $conn->real_escape_string($data['password']);

    // Query untuk memverifikasi pengguna
    $sql = "SELECT * FROM user WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Login berhasil
        echo json_encode(["success" => true, "message" => "Login berhasil!"]);
    } else {
        // Login gagal
        echo json_encode(["success" => false, "message" => "Email atau password salah."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Mohon isi semua field!"]);
}

// Menutup koneksi
$conn->close();
?>