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

// Debug: Tampilkan data yang diterima (opsional)
// file_put_contents('debug_log.txt', print_r($data, true));

// Validasi data
if (!empty($data['cart']) && isset($data['totalHarga'])) {
    // Siapkan prepared statement
    $stmt = $conn->prepare("INSERT INTO pesanan (idGalon, jumlah, totalHarga) VALUES (?, ?, ?)");
    
    foreach ($data['cart'] as $item) {
        $idGalon = $item['id']; // ID galon dari item
        $jumlah = $item['quantity']; // Jumlah yang dipesan
        $totalHarga = $data['totalHarga']; // Total harga untuk pesanan ini

        // Bind parameters
        $stmt->bind_param("iid", $idGalon, $jumlah, $totalHarga); // "i" untuk integer, "d" untuk double

        // Eksekusi statement
        if (!$stmt->execute()) {
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
            exit();
        }
    }

    echo json_encode(["success" => true, "message" => "Pesanan berhasil disimpan!"]);
} else {
    echo json_encode(["success" => false, "message" => "Data pesanan tidak valid!"]);
}

// Menutup statement dan koneksi
$stmt->close();
$conn->close();
?>