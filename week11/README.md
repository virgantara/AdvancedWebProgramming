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
│   └-- routes.js                        
│
│-- db.js                     
│-- server.js                 
│-- package.json            
```
## Instalasi Library yang diperlukan
```bash
npm init -y
npm install express oauth2-server body-parser mysql2
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
    ADD CONSTRAINT `oauth_tokens_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

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

Berikut ini adalah isi dari `model.js`:
```javascript
const db = require('../db');

module.exports.getClient = (clientId, clientSecret) => {

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM oauth_clients WHERE client_id = ? and client_secret = ? ';
    db.query(query, [clientId, clientSecret], (err, results) => {

      if (err) return reject(err);

      if(results.length == 0)
        return reject(null)
      
      const client = {
        id: results[0].client_id,
        redirectUris: results[0].redirect_uri,
        grants: ['authorization_code']
      }
      resolve(client);
    });
  })
  
}
```

Fungsi `getClientById` mengambil data klien dari tabel `oauth_clients` berdasarkan `clientId` dan `clientSecret`. Jika klien ditemukan, data klien dikembalikan dalam bentuk objek. Fungsi ini penting untuk memvalidasi klien yang ingin mendapatkan *authorization code* atau *access token*.

6. Buatlah sebuah file dengan nama `routes.js`, dan taruh di `routes` direktori project `oauth_server`. Berikut isi dari `routes.js`
```javascript
const express = require('express');
const OAuth2Server = require('oauth2-server');
const model = require('../models/model');

const router = express.Router();
const oauth = new OAuth2Server({ model });

router.get('/authorize', (req, res) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  oauth.authorize(request, response, {
    authenticateHandler: {
      handle: () => ({ id: 1, username: 'user' }) // Dummy user
    }
  }).then(code => res.json(code))
    .catch(err => res.status(err.code || 500).json(err));
});

module.exports = router;
```

7. Buatlah sebuah file dengan nama `server.js`, dan taruh di `root` atau `working` direktori project `oauth_server`. Berikut isi dari `server.js`

  1. Import library yang diperlukan
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');
const model = require('./models/model');

const router = require('./routes/routes');
```
  2. Inisiasi `express`
```javascript
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
```

  3. Tambahkan routing 
```javascript
app.use('/oauth', router);
```
  4. Tambahkan script untuk listening server
```javascript
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
```
### Penjelasan
1. Endpoint /oauth/authorize:
- Digunakan untuk meminta authorization code.
- Mengautentikasi pengguna dan memproses permintaan otorisasi.
- Jika sukses, mengembalikan authorization code yang bisa digunakan untuk mendapatkan access token.

  