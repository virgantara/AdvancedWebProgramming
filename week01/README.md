# PHP Dasar dan Koneksi dengan DBMS MySQL
Learning Outcomes (LO):
- Mahasiswa memahami fungsi PHP untuk pemrograman server-side (LO1)
- Mahasiswa mampu menulis script PHP dasar untuk Form Handling, Variable, dan Data Processing (LO2)
- Mahasiswa mampu mengoneksikan PHP dengan HTML dan DBMS MySQL (LO3)
- Mahasiswa mampu mengimplementasikan kode PHP untuk Request dan Response Web (LO4)

Topik Pertemuan:
- [Pengenalan PHP (Syntax PHP, struktur, fungsi, dan variabel)](week01/README.md)
- Integrasi PHP dengan HTML
- Pembuatan Form dan HTTP Method
- Koneksi ke database

Penugasan:
- Tugas Mandiri 1: Buat program sederhana dengan PHP untuk mengoleksi data seperti pendaftaran peserta atau mahasiswa dan menampilkan secara dinamis
- Kuis 1: PHP dasar, syntax, forms, dan integrasi PHP x HTML

## Konsep Dasar PHP dan konektivitas dengan MySQL
PHP adalah salah satu bahasa pemrograman yang mendukung konektivitas dengan beberapa jenis DBMS seperti MySQL, PostgreSQL, SQLServer, dll. Ada dua library yang sering digunakan untuk koneksi database, PDO dan MySQLi. PDO merupakan singkatan dari PHP Data Object. PDO mendukung kurang lebih 12 DBMS. Sedangkan MySQLi lebih spesifik untuk MySQL. 

## Koneksi Database
Untuk Linux dan Windows: Ekstensi MySQLi secara otomatis terinstal pada paket php5 mysql. Sebelum kita dapat mengakses data dalam basis data MySQL, kita harus dapat terhubung ke server. Berikut ini contoh untuk koneksi dengan database:
```php
<?php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "web_sekolah";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?> 
```
Untuk koneksi database, Anda bisa membuat sebuah file berekstensi php. Sebagai contoh, file tersebut bisa diberi nama db.php atau database.php. File ini nantinya akan diimport dengan memanggil syntax `require_once` di file php yang membutuhkan koneksi database. Jika file db.php sudah diimport, maka variabel `$conn` bisa digunakan di-scope file tersebut. 

- Script `mysqli` memiliki 4 parameter secara berurutan, yaitu: `host`, `username`, `password`, dan `database`.  
- Fungsi `if ($conn->connect_error)` berfungsi untuk mengecek apakah ada koneksi ke database yang error.
- Fungsi syntax `die` adalah untuk menghentikan eksekusi runtime PHP dengan parameter tertentu.

## Query data
Untuk query data, sebagai contoh, buatlah sebuah file dengan nama `fetch.php`. 
```php
<?php 
require_once "db.php";

$sql = "SELECT nim, nama FROM mahasiswa ORDER BY nama LIMIT 10";

$result = $conn->query($sql) or die($conn->error);

while($row = $result->fetch_assoc()){
    echo $row['nim'];
    echo "&nbsp;";
    echo $row['nama'];
    echo "<br>";
}


$conn->close();
?>
```


## Insert data