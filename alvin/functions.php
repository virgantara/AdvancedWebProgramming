<?php

//koneksi kedatabases
$db= mysqli_connect("localhost","root","","web_sekolah");


function query($query){
    global $db;
    $result = mysqli_query($db, $query);
    $rows = [];
    while($row = mysqli_fetch_assoc($result)){
        $rows[] = $row;
    }
    return $rows;
}

function tambah($data){
    // ambil data tiap kolom
    global $db;
    $nim = htmlspecialchars($data["nim"]);
    $nama = htmlspecialchars($data["nama"]);
    $kodeProdi = htmlspecialchars($data["kode_prodi"]);
    $kodeAktivitas = htmlspecialchars($data["status_aktivitas"]);

    $query = "INSERT INTO mahasiswa
            (nim,nama,kode_prodi,status_aktivitas)
                VALUES
                ('$nim', '$nama', '$kodeProdi','$kodeAktivitas')
                ";
    mysqli_query($db, $query);
    return mysqli_affected_rows($db);
}

function hapus($id){
    global $db;
    mysqli_query( $db, "DELETE FROM mahasiswa WHERE id = $id");
    return mysqli_affected_rows($db);
}

function ubah($data){
    // ambil data tiap kolom
    global $db;
    $id = $data["id"];
    $nim = htmlspecialchars($data["nim"]);
    $nama = htmlspecialchars($data["nama"]);
    $kodeProdi = htmlspecialchars($data["kode_prodi"]);
    $kodeAktivitas = htmlspecialchars($data["status_aktivitas"]);

    $query = "UPDATE mahasiswa SET 
                nim = '$nim',
                nama = '$nama',
                kode_prodi = '$kodeProdi',
                status_aktivitas = '$kodeAktivitas'
                WHERE id = $id
                ";
    mysqli_query($db, $query);
    return mysqli_affected_rows($db);

}












?>