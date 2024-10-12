<?php 

require_once "db.php";

$nim = $_POST['nim'];
$nama = $_POST['nama'];

$sql = "INSERT INTO mahasiswa (nim, nama) VALUES ('".$nim."','".$nama."')";

if($conn->query($sql) === TRUE){
	echo "Data telah ditambah";
}

else{
	echo "Error ".$conn->error;
}

$conn->close();

 ?>