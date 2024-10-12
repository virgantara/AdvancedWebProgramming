# PHP Dasar dan Koneksi dengan DBMS MySQL

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

## Query data

## Insert data