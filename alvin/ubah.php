<?php
require 'functions.php';

// ambil data diurl
$id = $_GET["id"];

//query data berdasarkan id
$mhs = query("SELECT * FROM mahasiswa WHERE id = $id")[0];


if ( isset($_POST ["submit"]) ){

        // cek apakah data dapat diubah atau tidak
        if ( ubah($_POST) > 0 ){
            echo "
            <script>
            alert('data berhasil diubah!');
            document.location.href = 'index.php';
            </script>";
        } else{
            echo "<script>
            alert('data gagal diubah');
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
    <title>ubah data mahasiswa</title>
</head>
<body>
    <h1>ubah Data Mahasiswa</h1>
    <form action="" method="post">

        <input type="hidden" name="id" id="id" required value="<?= $mhs['id'];?>">
        <ul>
            <li>
                <label for="nim" style="margin-right: 30px;">nim:</label>
                <input type="text" name="nim" id="nim" required value="<?= $mhs['nim'];?>">
            </li>
            <br>
            <li>
                <label for="nama" style="margin-right: 25px;">nama:</label>
                <input type="text" name="nama" id="nama" required value="<?= $mhs['nama'];?>">
            </li>
            <br>
            <li>
                <label for="kode_prodi" style="margin-right:65px;">kode_prodi:</label>
                <input type="text" name="kode_prodi" id="kode_prodi" required value="<?= $mhs['kode_prodi'];?>">
            </li>
            <br>
            <li>
                <label for="status_aktivitas" style="margin-right: 80px;">status_aktivitas:</label>
                <input type="text" name="status_aktivitas" id="status_aktivitas" required value="<?= $mhs['status_aktivitas'];?>">
            </li>
            <br>
            
            <button type="submit" name="submit">ubah data</button>
            
        </ul>
    </form>


    
</body>
</html>