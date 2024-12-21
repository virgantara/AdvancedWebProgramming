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

Oiya, jangan lupa membuat database terlebih dahulu di MySQL. Ada empat tabel yang diperlukan:
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
  4. Tabel `oauth_authorization_codes`.

  Berikut SQL-nya:
  ```sql
START TRANSACTION;

CREATE TABLE `oauth_authorization_codes` (
  `id` int NOT NULL,
  `authorization_code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `client_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `expires_at` datetime NOT NULL,
  `redirect_uri` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  `scope` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `used` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;


ALTER TABLE `oauth_authorization_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `oauth_authorization_codes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `oauth_authorization_codes`
  ADD CONSTRAINT `oauth_authorization_codes_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `oauth_authorization_codes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;
  ```
4. Buatlah sebuah file dengan nama `db.js`, dan taruh di `root` atau `working` direktori project `oauth_server`. Adapun isi dari `db.js` adalah:
```javascript
const mysql = require('mysql2');
const config = require('./config/db.json');

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

      if(results.length === 0){
        
        return reject('client_id not found');
      }
      
      const client = {
        id: results[0].client_id,
        redirectUris: results[0].redirect_uri,
        grants: ['authorization_code']
      }
      resolve(client);
    });
  }) 
}

module.exports.saveAuthorizationCode = (code, client, user) => {
  return new Promise((resolve, reject) => {
    const query = `
    INSERT INTO oauth_authorization_codes (authorization_code, client_id, user_id, expires_at, redirect_uri,scope) 
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    let params = [code.authorizationCode, client.id, user.id, code.expiresAt, code.redirectUri,code.scope]
    db.query(query, params, (err, res)=>{
        if(err){
            console.error(err)
            return reject(err)
        }

        const authCode = {
            authorizationCode: code.authorizationCode,
            expiresAt: code.expiresAt,
            redirectUri: client.redirectUris[0],
            client: client,
            user: user,
            scope: code.scope
        };

        resolve(authCode)
    })
  })
};
```
Fungsi `getClient` mengambil data klien dari tabel `oauth_clients` berdasarkan `clientId`. Jika klien ditemukan, data klien dikembalikan dalam bentuk objek. Fungsi ini penting untuk memvalidasi klien yang ingin mendapatkan *authorization code* atau *access token*.

Selain fungsi `getClient`, di file `model.js` memerlukan fungsi lain `saveAuthorizationCode`. Fungsi ini untuk menyimpan `authorization code` yang di-*generate* oleh OAuth. Dua fungsi ini adalah mandatory dari `oauth2-server` ketika fungsi `.authorize()` dipanggil.


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
  try{

    oauth.authorize(request, response, {
      authenticateHandler: {
        handle: (req) => {
          return {id : req.query.user_id}
        }

      }
    }).then(code => {
      res.json(code)
    })
    .catch(err => {
      console.error(err)
      res.status(err.code || 500).json(err)
    });
  }
  catch(error){
    console.error(error)
    res.status(500).json("Something is wrong")
  }
});

module.exports = router;
```

Fungsi dari `authenticateHandler` dalam `oauth2-server` adalah untuk menentukan bagaimana pengguna diotentikasi selama proses otorisasi. Pada proses OAuth2, sebelum kode otorisasi diberikan, server perlu memastikan bahwa pengguna sudah diotentikasi dengan benar.

Dalam konteks metode `authorize`, `authenticateHandler` memungkinkan Anda untuk menyediakan logika kustom untuk mengautentikasi pengguna. Hal ini berguna ketika Anda ingin memberikan kebebasan lebih terkait bagaimana otentikasi pengguna dilakukan, misalnya melalui `session`, `token`, atau mekanisme lainnya.

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

### Cara mendapatkan authorization_code
Jalankan perintah berikut:
```bash
curl -X GET "http://localhost:3000/oauth/authorize?response_type=code&client_id=abc123&state=random_state&redirect_uri=http://localhost:3000/callback&user_id=1"
```

Output jika sukses:
```json
{
  "authorizationCode":"7307a253de9d9f6b17931296f0bdda333a4e28bd",
  "expiresAt":"2024-12-20T09:20:25.667Z",
  "redirectUri":"h",
  "client":{
    "id":"abc123",
    "redirectUris":"http://localhost:3000/callback",
    "grants":["authorization_code"]
  },
  "user":{
    "id":"1"
  }
}
```

## Mendapatkan Access Token dengan Authorization Code
Setelah mendapatkan `authorizationCode`, selanjutnya adalah mendapatkan `accessToken` yang nantinya digunakan untuk mengakses *resource* atau *endpoints* yang lain.

### Tahapan mendapatkan `accessToken`
1. Tambahkan endpoint berikut ke file `routes.js`:
```javascript
router.post('/token', (req, res) => {

  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  
  oauth.token(request, response)
    .then(code => {
      res.json(code)
    })
    .catch(err => {
      console.error(err)
      res.status(err.code || 500).json(err)
    });
});
```

2. Sebelum melakukan request token, ada hal-hal yang perlu diperhatikan:
  1. `Content-Type` di header request harus `application/x-www-form-urlencoded`
  2. Method harus `POST`

3. Tambahkan fungsi `getAuthorizationCode` dan `revokeAuthorizationCode` berikut di `models/model.js`:
```javascript
module.exports.getAuthorizationCode = (authorizationCode) => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM oauth_authorization_codes WHERE authorization_code = ?', [authorizationCode], (err, results) => {
          if (err) {
              console.error("getAuthorizationCode ERROR:",err)
              return reject(err)

          };

          if (results.length === 0) return resolve(false);
          
          const hasil = {
              code: results[0].authorization_code,
              scope: results[0].scope,
              expiresAt: results[0].expires_at,
              redirectUri: results[0].redirect_uri,
              client: { id: results[0].client_id },
              user: { id: results[0].user_id }
          }

          resolve(hasil);
      });
  })
};

module.exports.revokeAuthorizationCode = (code) => {
  return new Promise((resolve, reject) => {
      db.query('DELETE FROM oauth_authorization_codes WHERE authorization_code = ?', [code.authorizationCode], (err) => {
          if (err) {
              console.error("Error Deleting auth code",err)
              return reject(err)
          }

          resolve(true)
      });    
  })
    
}

module.exports.saveToken = async (token, client, user) => {
  const accessToken = {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    client: client,
    user: user,
  };

  await storeToken(token.accessToken, token.refreshToken, token.accessTokenExpiresAt, token.refreshTokenExpiresAt, user.id, client.id);
  return accessToken;
};
```