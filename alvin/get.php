<?php 
$mahasiswa = [
    [
        "nim" => "432022611030",
        "nama" => "mohamad farhat",
        "kode_prodi" => "bis AC",
        "status_aktivitas" => "teknik Informatika"
    ],
    [
        "nim" => "76535454",
        "nama" => "adimas",
        "kode_prodi" => "ekonomi",
        "status_aktivitas" => "Elektro"
    ],
    [
         "nim" => "76535454",
        "nama" => "adimas",
        "kode_prodi" => "ekonomi",
        "status_aktivitas" => "Elektro"
    ],
    [
       "nim" => "432022611030",
        "nama" => "mohamad farhat",
        "kode_prodi" => "bis AC",
        "status_aktivitas" => "teknik Informatika"
    ],
    ],
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dokumen</title>
</head>
<body>
<h1>get</h1>
<?php foreach($mahasiswa as $mhs):?>
    <ul>
        <a href="get2.php?nama=<?= $mhs["nama"];?>&nik=<?=$mhs["nik"];?>&kelas=<?=$mhs["kelas"];?>&jurusan=<?= $mhs["jurusan"];?>"><?= $mhs["nik"];?></a>
    </ul>


<?php endforeach?>
    
</body>
</html>
