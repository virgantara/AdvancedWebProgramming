<?php
$host = "localhost";
$username = "root";
$password = "4Dm1n_2022";
$dbname = "web_sekolah";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?> 