<?php
if(!isset ($_GET["nama"]) || 
    ($_GET["nik"])  
    ($_GET["kelas"])
    ($_GET["jurusan"])){
    header("Location:get.php");
    exit;

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>PAGI</h1>
    <ul>
        <li><?= $_GET ["nama"];?></li>
        <li><?= $_GET ["nik"];?></li>
        <li><?= $_GET ["jurusan"];?></li>
        <li><?= $_GET ["kelas"];?></li>
    </ul>
</body>
</html>