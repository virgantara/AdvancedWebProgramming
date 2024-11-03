<?php
require 'functions.php';

if (isset($_POST ["submit"]) ){

        // cek apakah data dapat diganti atau tidak
        if (tambah($_POST) > 0 ){
            echo "
            <script>
            alert('data berhasil ditambahkan!');
            document.location.href = 'index.php';
            </script>";
        } else{
            echo "<script>
            alert('data gagal ditambahkan');
            document.location.href = 'index.php';
            </script>";
        }
}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>tambah data mahasiswa</title>
</head>
<body>
    <h1>Tambah Data Mahasiswa</h1>
    <form action="" method="post">
        <ul>
            <li>
                <label for="nim" style="margin-right: 30px;">nim:</label>
                <input type="text" name="nim" id="nim" required>
            </li>
            <br>
            <li>
                <label for="nama" style="margin-right: 25px;">nama:</label>
                <input type="text" name="nama" id="nama" required>
            </li>
            <br>
            <li>
                <label for="kode_prodi" style="margin-right:65px;">kode_prodi:</label>
                <input type="text" name="kode_prodi" id="kode_prodi" required>
            </li>
            <br>
            <li>
                <label for="status_aktivitas" style="margin-right: 80px;">status_aktivitas:</label>
                <input type="text" name="status_aktivitas" id="statut_aktivitas" required>
            </li>
            <br>
                
            <button type="submit" name="submit">kirim</button>
   
        </ul>
    </form>


    
</body>
</html>