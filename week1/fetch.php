<?php 
require_once "db.php";

$sql = "SELECT nim_mhs, nama_mahasiswa FROM simak_mastermahasiswa ORDER BY nama_mahasiswa";

$result = $conn->query($sql) or die($conn->error);

while($row = $result->fetch_assoc()){
	echo $row['nim_mhs'];
	echo "&nbsp;";
	echo $row['nama_mahasiswa'];
	echo "<br>";
}


$conn->close();
?>