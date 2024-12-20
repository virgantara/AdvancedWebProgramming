# Week 11 - OAuth2 with NodeJS and MySQl
## Why employ MySQL in here?
Menggunakan MySQL untuk OAuth2 server memberikan solusi penyimpanan yang stabil, skalabel, dan terstruktur untuk data autentikasi dan otorisasi. Dengan MySQL, kita dapat menyimpan klien, token, dan kode otorisasi secara persisten. Ini sangat berguna untuk aplikasi berskala besar di mana data harus tetap tersedia meskipun server restart. Selain itu, MySQL memiliki dukungan transaksi, indexing, dan fitur keamanan yang memastikan data tetap aman dan cepat diakses.

Dibandingkan penyimpanan di memori atau file, MySQL lebih cocok untuk lingkungan produksi. Penyimpanan di memori hanya cocok untuk pengujian atau aplikasi kecil karena data akan hilang saat server dimatikan. Dengan MySQL, kita memiliki fleksibilitas untuk menyimpan, memperbarui, dan mengelola data dengan lebih efektif, serta kemudahan integrasi dengan sistem yang sudah ada.

## Struktur Project
Struktur Project yang akan dibuat paling tidak seperti di bawah ini:
```makefile
project-folder/
│-- config/
│   └-- db.json               
│
│-- models/
│   └-- model.js              
│
│-- routes/
│   ├-- authorize.js          
│   └-- token.js              
│
│-- db.js                     
│-- server.js                 
│-- package.json            
```

## Tahapan yang perlu dilakukan
1. Buatlah sebuah project dengan nama direktori/folder, misalnya, `oauth_server`
2. Buatlah tiga direktori lagi di dalamnya. Adapun direktori yang dibuat adalah sebagai berikut:
  - `config`
  - `models`
  - `routes`
3. Buatlah sebuah file konfigurasi database dengan nama `db.json` dan taruh di direktori `config`. Adapun isi file `db.json` adalah:
```json
{
  "host": "localhost",
  "user": "root",
  "password": "password",
  "database": "oauth2_server"
}
```
Konfigurasi ini menyimpan informasi koneksi ke database MySQL dalam format JSON. Dengan memisahkan kredensial ke dalam file `db.json`, kode menjadi lebih rapi dan lebih mudah diubah tanpa perlu memodifikasi kode utama. Format JSON ini berisi `host`, `user`, `password`, dan `database` yang digunakan untuk menghubungkan aplikasi ke MySQL.

Oiya, jangan lupa membuat database terlebih dahulu di MySQL. Ada tiga tabel yang diperlukan:
  1. Tabel `users`

  Berikut ini SQL dari tabel `users`:
  ```sql
  START TRANSACTION;

  CREATE TABLE `users` (
    `id` int NOT NULL,
    `email` varchar(120) NOT NULL,
    `username` varchar(30) NOT NULL DEFAULT '',
    `nama_user` varchar(255) DEFAULT NULL,
    `password_hash` char(60) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

  ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
    ADD UNIQUE KEY `username` (`username`),
    ADD KEY `email` (`email`);

  ALTER TABLE `users`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
  COMMIT;
  ```
  2. Tabel `oauth_clients`

  Berikut ini adalah SQL dari tabel `oauth_clients`:
  ```sql
  START TRANSACTION;
  CREATE TABLE `oauth_clients` (
    `client_id` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
    `client_secret` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
    `redirect_uri` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
    `grant_type` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    `scope` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

  ALTER TABLE `oauth_clients` ADD PRIMARY KEY (`client_id`);
  COMMIT;
  ```
  3. Tabel `oauth_tokens`

  Berikut ini adalah SQL dari tabel `oauth_tokens`:
  ```sql
  START TRANSACTION;
  CREATE TABLE `oauth_tokens` (
    `id` int NOT NULL,
    `access_token` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    `refresh_token` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    `user_id` int DEFAULT NULL,
    `client_id` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    `access_token_expires_at` datetime DEFAULT NULL,
    `refresh_token_expires_at` datetime DEFAULT NULL,
    `scope` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
    `nonce` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

  ALTER TABLE `oauth_tokens`
    ADD PRIMARY KEY (`id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `client_id` (`client_id`);

  ALTER TABLE `oauth_tokens`
    MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

  ALTER TABLE `oauth_tokens`
    ADD CONSTRAINT `oauth_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    ADD CONSTRAINT `oauth_tokens_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

  COMMIT;
  ```
  
4. Buatlah sebuah file dengan nama `db.js`, dan taruh di `root` atau `working` direktori project `oauth_server`. Adapun isi dari `db.js` adalah:
```javascript
const mysql = require('mysql2');
const config = require('../config/db.json');

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Database connected successfully');
});

module.exports = connection;
```
File `db.js` membuat koneksi ke MySQL menggunakan pustaka `mysql2`. Fungsi `createConnection` memuat konfigurasi dari `db.json`. Jika koneksi berhasil, pesan sukses ditampilkan di konsol. Jika terjadi kesalahan, pesan error akan ditampilkan. File ini akan digunakan untuk semua operasi database dalam aplikasi.

5. Buatlah sebuah file dengan nama `model.js`, dan taruh di `root` atau `working` direktori project `oauth_server`. Sebelum membuat file ini, ada beberapa hal yang perlu diketahui terkait model ini. Jika merujuk pada dokumentasi library NodeJS [`oauth2-server`](https://oauth2-server.readthedocs.io/en/latest/model/spec.html), `model.js`, model ini bertindak sebagai jembatan antara server OAuth2 dan basis data Anda, yang memungkinkan server untuk melakukan operasi penting seperti memvalidasi klien, menyimpan dan mengambil token akses, kode otorisasi, dan data pengguna.