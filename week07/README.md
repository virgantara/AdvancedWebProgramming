# Authentication dan Authorization di Node.js

## Definisi
Dalam pengembangan web service, authentication dan authorization adalah dua konsep penting untuk menjaga keamanan API. Authentication (otentikasi) adalah proses memastikan bahwa pengguna yang mengakses API benar-benar siapa yang mereka klaim. Contohnya, ketika pengguna login menggunakan username dan password, sistem akan memverifikasi kredensial tersebut sebelum memberikan akses. Sementara itu, authorization (otorisasi) adalah proses memastikan bahwa pengguna yang sudah terotentikasi memiliki izin untuk mengakses sumber daya tertentu. Misalnya, seorang admin mungkin memiliki akses untuk menghapus data, sedangkan pengguna biasa hanya bisa melihat data.

Di Node.js, salah satu cara sederhana untuk mengimplementasikan authentication adalah menggunakan JWT (JSON Web Token). JWT adalah token yang dikirimkan oleh server ke klien setelah pengguna berhasil login. Token ini berisi informasi pengguna yang sudah dienkripsi dan akan dikirim kembali oleh klien dalam setiap permintaan ke server untuk memverifikasi identitasnya. Dengan JWT, kita bisa memastikan hanya pengguna yang memiliki token valid yang dapat mengakses API. Authorization bisa diimplementasikan dengan memeriksa peran atau hak akses yang ada di dalam token tersebut.

## Authentication dengan JSON Web Token (JWT)
### Apa Itu JWT?

JWT (JSON Web Token) adalah standar terbuka untuk melakukan pertukaran informasi secara aman antara dua pihak, misalnya antara server dan klien. JWT sering digunakan dalam proses authentication (otentikasi) dan authorization (otorisasi) di aplikasi web. Informasi dalam JWT disimpan dalam format JSON yang sudah di-encode dan di-sign secara digital sehingga dapat diverifikasi keasliannya.

JWT biasanya digunakan untuk memastikan bahwa hanya pengguna yang sudah terotentikasi yang dapat mengakses sumber daya atau API tertentu. Dengan JWT, proses login bisa dilakukan sekali, lalu klien menyimpan token untuk digunakan kembali saat mengakses API lain tanpa perlu login ulang.

### Struktur JWT
JWT terdiri dari tiga bagian utama:
1. Header
Berisi informasi tentang tipe token (`typ`) dan algoritma enkripsi yang digunakan (`alg`) 

Contoh:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
2. Payload
Berisi klaim (claims) atau informasi tentang pengguna, seperti `username`, `role`, dan kapan token kadaluwarsa (`exp`).

Contoh:
```json
{
  "username": "admin",
  "role": "admin",
  "exp": 1693520000
}
```
3. Signature
- Dibuat menggunakan algoritma yang disebutkan di `Header` (misalnya HS256) dan kunci rahasia (`secret key`).
- Signature memastikan bahwa token tidak diubah atau dimanipulasi.

### Cara Kerja JWT
1. Proses Login:
- Pengguna melakukan login dengan mengirimkan `username` dan `password`.
- Server memverifikasi kredensial pengguna dan jika valid, server membuat JWT dan mengirimkannya kembali ke klien.

2. Menyimpan Token:
- Klien menyimpan token (biasanya di localStorage atau cookies).

3. Mengakses API:
- Untuk mengakses API yang dilindungi, klien mengirimkan JWT di dalam header
Contoh:
```makefile
Authorization: Bearer <token>
```
4. Verifikasi di sisi server
Server memeriksa token yang dikirim. Jika valid, permintaan diizinkan. Jika tidak valid atau token kadaluwarsa, permintaan ditolak.

### Contoh Node.js untuk Authentication Menggunakan JWT
1. Instalasi Paket yang Dibutuhkan:
```bash
npm install express jsonwebtoken body-parser bcrypt cors
```
2. Buat sebuah file dengan nama `server.js`
3. Import library yang diperlukan
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
```
4. Inisiasi server
```javascript
const app = express();
app.use(bodyParser.json());
```

5. Contoh user dengan password: password123
```javascript
const users = [
    { username: 'admin', password: '$2b$10$R1M1hXaYP9Mhbm9tGv8UOOsS9tVhWTI2jpmYeoLs9hmW3gYj/F5se', role: 'admin' }, 
];
```

6. Membuat route `/login`
```javascript
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ username: user.username, role: user.role }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
});
```

7. Kode menjalankan server
```javascript
app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
```
