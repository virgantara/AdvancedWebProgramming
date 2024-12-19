# Week 10 - Introduction to OAuth2

Topics:
- Introduction to OAuth2
- Why OAuth2
- OAuth2 vs Traditional Username & Password

OAuth singkatan dari Open Authorization

## Introduction to OAuth2
OAuth2 adalah sebuah standar yang digunakan untuk memberikan otorisasi akses ke aplikasi tanpa harus membagikan kredensial pengguna seperti username dan password. Konsep utama dalam OAuth2 mencakup authorization code, access token, dan refresh token. Authorization code digunakan sebagai langkah pertama untuk mendapatkan izin akses. Setelah kode ini diterima, aplikasi dapat menukarnya dengan access token, yang memungkinkan aplikasi mengakses sumber daya pengguna. Jika access token kadaluarsa, refresh token digunakan untuk mendapatkan access token baru tanpa meminta izin ulang dari pengguna.

Perbedaan utama antara OAuth2 dengan metode autentikasi tradisional adalah OAuth2 memberikan kontrol akses yang lebih aman dan terstruktur. Pada metode autentikasi dasar, aplikasi pihak ketiga harus menyimpan username dan password, yang berisiko jika terjadi kebocoran data. Dengan OAuth2, pengguna hanya memberikan izin kepada aplikasi untuk mengakses data tertentu, tanpa harus menyerahkan kredensial mereka. Hal ini meningkatkan keamanan dan fleksibilitas dalam mengakses layanan antar aplikasi.

1. Pihak yang terlibat dalam alur OAuth2:
- Client: Aplikasi pihak ketiga yang ingin mengakses data milik pengguna.
- Resource Owner: Pengguna yang memiliki data atau sumber daya yang ingin diakses.
- Authorization Server: Server yang mengeluarkan access token setelah memverifikasi izin dari pengguna.
- Resource Server: Server yang menyimpan data milik pengguna dan memberikan akses jika memiliki token yang valid.

2. OAuth2 Grant Types:
- Authorization Code (most common for web applications).
- Implicit (used in legacy single-page applications).
- Client Credentials (machine-to-machine authentication).
- Password Grant (for trusted clients).

3. OAuth2 Flow:
- The client requests authorization.
- The user grants permission.
- The authorization server issues an access token.
- The client uses the access token to access protected resources.

OAuth2 adalah protokol otorisasi yang digunakan untuk memberikan akses aman ke sumber daya tanpa harus membagikan kredensial (seperti username dan password) langsung ke aplikasi pihak ketiga. Misalnya, saat login dengan akun Google di aplikasi lain, OAuth2 memungkinkan Google untuk memberikan akses terbatas kepada aplikasi tersebut tanpa mengungkapkan password pengguna.

## Why OAuth2
- Keamanan: Menghindari praktik buruk seperti berbagi password.
- Kontrol Akses: Pengguna dapat memberikan izin spesifik ke aplikasi pihak ketiga (misalnya, hanya akses ke profil, bukan semua data).
- Stateless Authentication: Token digunakan untuk menyimpan informasi, tidak perlu menyimpan sesi di server.
- Fleksibilitas: Mendukung berbagai jenis aplikasi (web, mobile, API).
- Single Sign-On (SSO): Login sekali untuk mengakses berbagai layanan.

OAuth2 lebih aman dibandingkan metode tradisional karena pengguna tidak perlu membagikan password mereka dengan aplikasi pihak ketiga. Dengan OAuth2, akses dapat dibatasi sesuai kebutuhan, misalnya hanya membaca data profil tanpa akses penuh ke akun. OAuth2 juga mendukung konsep Stateless Authentication, di mana informasi pengguna disimpan dalam token, sehingga server tidak perlu menyimpan sesi.

## OAuth2 vs Traditional Username & Password
1. Traditional Authentication:

- Login menggunakan username dan password.
- Menyimpan sesi di server.
- Risiko keamanan seperti pencurian password dan Session Hijacking.

2. OAuth2 Authentication:

- Menggunakan token sebagai pengganti sesi.
- Tidak perlu membagikan password dengan aplikasi pihak ketiga.
- Dukungan untuk izin akses yang terbatas.

3. Keunggulan OAuth2:

- Lebih Aman: Token bisa memiliki masa kadaluarsa dan hak akses terbatas.
- Skalabilitas: Cocok untuk aplikasi besar dan mikroservis.
- Kemudahan Integrasi: Mendukung login melalui penyedia pihak ketiga seperti Google atau GitHub.

Dalam metode tradisional, pengguna harus memberikan username dan password kepada setiap aplikasi yang ingin mereka akses. Ini berisiko jika aplikasi tersebut tidak aman atau mengalami kebocoran data. OAuth2 memberikan solusi dengan memungkinkan pengguna memberikan akses melalui token, tanpa harus berbagi password. Selain itu, OAuth2 mendukung kontrol izin yang lebih fleksibel dan cocok untuk aplikasi modern seperti API dan layanan mikro.

---

# Tahapan OAuth2

## 1. Registrasi Klien

Sebelum menggunakan OAuth2, aplikasi pihak ketiga (klien) harus mendaftar ke authorization server untuk mendapatkan `client_id` dan `client_secret`.

Informasi yang Diperlukan:
- Nama aplikasi.
- Redirect URI (URL tempat pengguna akan diarahkan setelah memberikan izin).

Setelah itu, Klien menerima `client_id` dan `client_secret`.

## 2. Mengarahkan Pengguna ke Authorization Server
Klien mengarahkan pengguna ke authorization server untuk meminta izin akses.
Contoh URL Permintaan:
```makefile
https://authorization-server.com/auth?
response_type=code&
client_id=CLIENT_ID&
redirect_uri=REDIRECT_URI&
scope=SCOPE&
state=STATE
```

Penjelasan Parameter:
- `response_type`: Biasanya diisi dengan `code` untuk Authorization Code Grant.
- `scope`: Data atau hak akses yang diminta (misalnya: `profile`, `email`).
- `state`: Nilai acak untuk mencegah serangan CSRF.

## 3. Pengguna Memberikan Izin
Pengguna melihat halaman izin dan memutuskan apakah akan memberikan akses ke aplikasi pihak ketiga. Lalu, pengguna menyetujui atau menolak permintaan. Jika disetujui, authorization server memberikan authorization code kepada klien melalui redirect URI.

## 4. Klien Menukar Authorization Code dengan Access Token
Klien mengirimkan *authorization code* ke authorization server untuk mendapatkan *access token*.
Contoh Permintaan Token:
```makefile
POST /token
Host: authorization-server.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTHORIZATION_CODE&
redirect_uri=REDIRECT_URI&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET
```
Lalu, Authorization server memberikan *access token* dan *refresh token*.

## 5. Menggunakan Access Token untuk Mengakses Resource Server
Klien mengirimkan access token untuk mengakses data di resource server.

Contoh Permintaan Resource:
```makefile
GET /profile
Host: resource-server.com
Authorization: Bearer ACCESS_TOKEN
```
Hasilnya, resource server memvalidasi access token dan memberikan data yang diminta jika token valid.

## 6. Menggunakan Refresh Token untuk Mendapatkan Access Token Baru
Jika *access token* kedaluwarsa, klien dapat menggunakan *refresh token* untuk mendapatkan *access token* baru tanpa meminta izin ulang dari pengguna.

Contoh permintaan token baru:
```makefile
POST /token
Host: authorization-server.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&
refresh_token=REFRESH_TOKEN&
client_id=CLIENT_ID&
client_secret=CLIENT_SECRET
```

Hasilnya, Authorization server memberikan *access token* baru.

# Implementasi OAuth2 di NodeJS

## Instalasi Paket yang Diperlukan
Sebelum memulai, instal paket yang diperlukan dengan perintah berikut:
```bash
npm init -y
npm install express oauth2-server body-parser
```

## Struktur Proyek
Buatlah sebuah direktori dengan nama tertentu, misalnya, `proyek_oauth2`. Buatlah beberapa file, yaitu: `server.js`, `model.js`. Tambahkan satu subdirektori, yaitu: `routes` dan buat file baru di dalamnya dengan nama `auth.js`. Berikut struktur kode yang telah dibuat:
```makefile
proyek_oauth2/
│-- server.js
│-- model.js
└-- routes/
    └-- auth.js
```

## Membuat Model untuk OAuth2
Edit file `model.js` untuk mendefinisikan fungsi yang diperlukan oleh `oauth2-server` 
```javascript
const crypto = require('crypto');

const clients = [
  { clientId: 'abc123', clientSecret: 'contoh_client_secret', redirectUris: ['http://localhost:3000/callback'], grants: ['authorization_code'] }
];

const tokens = {};
const authorizationCodes = {};

module.exports = {
  getClient: (clientId, clientSecret) => {
    return clients.find(client => client.clientId === clientId && client.clientSecret === clientSecret);
  },

  saveAuthorizationCode: (code, client, user) => {
    authorizationCodes[code.authorizationCode] = { client, user, expiresAt: code.expiresAt };
    return code;
  },

  getAuthorizationCode: (authorizationCode) => {
    return authorizationCodes[authorizationCode];
  },

  revokeAuthorizationCode: (code) => {
    delete authorizationCodes[code.authorizationCode];
    return true;
  },

  saveToken: (token, client, user) => {
    tokens[token.accessToken] = { client, user, expiresAt: token.accessTokenExpiresAt };
    return { accessToken: token.accessToken, accessTokenExpiresAt: token.accessTokenExpiresAt, client, user };
  },

  getAccessToken: (accessToken) => {
    return tokens[accessToken];
  }
};
```

## Membuat Server OAuth2
Edit file `server.js` untuk mengatur server Express dan middleware OAuth2 dan isikan kode berikut:
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');
const model = require('./model');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const oauth = new OAuth2Server({
  model,
  grants: ['authorization_code'],
  allowBearerTokensInQueryString: true
});


app.use('/oauth/authorize', (req, res, next) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  oauth.authorize(request, response, {
    authenticateHandler: {
      handle: () => {
        return { id: 1, username: 'user' }; // User dummy
      }
    }
  })
  .then((code) => {
    res.json(code);
  })
  .catch((err) => {
    res.status(err.code || 500).json(err);
  });
});


app.post('/oauth/token', (req, res) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  oauth.token(request, response)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
});


app.get('/secure', (req, res, next) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  oauth.authenticate(request, response)
    .then(() => {
      res.json({ message: 'Anda berhasil mengakses endpoint yang dilindungi!' });
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
```

## Menguji OAuth2 Server

### 1. Mendapatkan Authorization Code
Gunakan URL berikut untuk mendapatkan *authorization code*:
```bash
http://localhost:3000/oauth/authorize?response_type=code&client_id=abc123&redirect_uri=http://localhost:3000/callback
```

### 2. Menukar Authorization Code dengan Access Token
Gunakan Postman atau cURL untuk menukar *authorization code* dengan *access token*:
```bash
curl -X POST http://localhost:3000/oauth/token \
  -d "grant_type=authorization_code" \
  -d "code=AUTHORIZATION_CODE" \
  -d "redirect_uri=http://localhost:3000/callback" \
  -d "client_id=abc123" \
  -d "client_secret=contoh_client_secret"
```

### 3. Mengakses Endpoint yang Dilindungi
Gunakan *access token* untuk mengakses endpoint `/secure`:

```bash
curl http://localhost:3000/secure -H "Authorization: Bearer ACCESS_TOKEN"
```

Jika token valid, responnya akan berupa:
```bash
{ "message": "Anda berhasil mengakses endpoint yang dilindungi!" }
```