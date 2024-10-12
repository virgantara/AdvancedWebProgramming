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