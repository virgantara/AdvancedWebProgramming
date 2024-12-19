# Node.js app using RSA keys generated with OpenSSL and bcrypt hashing

Pada akhir pertemuan ini, mahasiswa diharapkan dapat:

1. Memahami konsep dasar enkripsi dan hashing.
2. Mengetahui perbedaan antara enkripsi dan hashing.
3. Menjelaskan berbagai algoritma enkripsi dan hashing.
4. Menentukan kapan harus menggunakan enkripsi dan hashing.
5. Mengimplementasikan contoh enkripsi dan hashing dalam Node.js.

## Introduction to Encryption
Enkripsi adalah proses mengubah data asli (plaintext) menjadi bentuk yang tidak dapat dibaca (ciphertext) untuk melindungi data dari akses yang tidak diizinkan. Enkripsi dapat dibagi menjadi dua jenis utama:

- Enkripsi Simetris: Menggunakan satu kunci untuk proses enkripsi dan dekripsi (contoh: AES).
- Enkripsi Asimetris: Menggunakan pasangan kunci publik dan kunci privat untuk enkripsi dan dekripsi (contoh: RSA).

Contoh Penggunaan:

- Mengamankan data saat dikirim melalui jaringan.
- Melindungi informasi sensitif seperti kartu kredit.

## Introduction to Hash
Penjelasan:

Hashing adalah proses mengubah data menjadi rangkaian karakter tetap (hash) menggunakan fungsi hash. Berbeda dengan enkripsi, hashing bersifat one-way (tidak dapat dikembalikan ke bentuk aslinya).
Contoh Algoritma Hashing:

- MD5 (sudah tidak direkomendasikan).
- SHA-256 (umum digunakan).
- bcrypt (untuk hashing password).

Contoh Penggunaan:

- Menyimpan password di database.
- Memeriksa integritas file.

## Encryption vs Hash
Encryption:
1. Bertujuan mengamankan data agar dapat dikembalikan
2. Prosesnya Two-way (bisa dienkripsi & didekripsi).
3. Contoh penggunaannya adalah ketika pengiriman data aman melalui jaringan.
4. Algoritma: AES, RSA

Hashing:
1. Mengubah bentuk data untuk tujuan verifikasi.
2. One-way (tidak bisa dikembalikan).
3. Digunakan untuk menyimpan password atau verifikasi data.
4. Contoh algoritma yang umum: MD5, SHA-256, bcrypt

## Algoritma di Encryption and Hash
Algoritma Enkripsi:

1. AES (Advanced Encryption Standard):
- Enkripsi simetris yang cepat dan aman.
2. RSA (Rivest-Shamir-Adleman):
- Enkripsi asimetris yang menggunakan kunci publik dan kunci privat.

Algoritma Hashing:

1. SHA-256 (Secure Hash Algorithm):
- Menghasilkan hash sepanjang 256-bit.
2. bcrypt:
- Digunakan untuk hashing password dengan tambahan salt untuk keamanan ekstra.

## Encryption and Hash Example in Node.js
Contoh Encryption:

```javascript
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: iv.toString('hex') };
}

function decrypt(encryptedData, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

const text = 'Hello, world!';
const encrypted = encrypt(text);
console.log('Encrypted:', encrypted);

const decrypted = decrypt(encrypted.encryptedData, encrypted.iv);
console.log('Decrypted:', decrypted);

```

Contoh Hashing:
1. Instal `bcrypt`
```bash
npm install bcrypt
```

2. Ketik kode berikut:
```javascript
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
}

async function verifyPassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    if (match) {
        console.log('Password cocok!');
    } else {
        console.log('Password salah!');
    }
}

// Contoh penggunaan
const password = 'mypassword123';

(async () => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password Terhash:', hashedPassword);
    await verifyPassword('mypassword123', hashedPassword); // Output: Password cocok!
})();
```

# Tugas
## Program Enkripsi dan Dekripsi dengan AES
1. Buat program Node.js yang melakukan hal berikut:
- Menggunakan modul crypto untuk mengenkripsi teks menggunakan algoritma AES-256-CBC.
- Menghasilkan kunci (key) dan vektor inisialisasi (iv) secara acak.
- Menerima input teks dan mengenkripsi teks tersebut.
- Mendekripsi teks yang sudah dienkripsi dan menampilkan hasil dekripsinya.

Contoh output:
```bash
Teks Asli: Halo, dunia!
Hasil Enkripsi: 3f4d5e9a7c1b6d...
Hasil Dekripsi: Halo, dunia!
```

## Program Hashing dan Verifikasi Password dengan bcrypt
1. Buat program Node.js yang melakukan hal berikut:
- Menggunakan modul bcrypt untuk meng-hash password.
- Menerima input password dari pengguna.
- Menghasilkan hash password dengan salt.
- Memverifikasi apakah input password sesuai dengan hash yang dihasilkan.

Contoh output:
```bash
Password: mypassword123
Hash: $2b$10$e0Xq2...
Verifikasi Berhasil: Password cocok!
```
### **Tabel Penilaian Tugas**

| **Aspek Penilaian**           | **Deskripsi**                                                                 | **Skor Maksimal** |
|-------------------------------|-------------------------------------------------------------------------------|-------------------|
| **Fungsi Enkripsi dan Dekripsi** | Program dapat mengenkripsi dan mendekripsi teks dengan benar menggunakan AES. | 25                |
| **Penggunaan Kunci dan IV**      | Menghasilkan kunci dan vektor inisialisasi secara acak dan menggunakannya dengan benar. | 10                |
| **Fungsi Hashing Password**      | Program dapat meng-hash password dengan bcrypt dan menampilkan hash.         | 20                |
| **Fungsi Verifikasi Hash**       | Program dapat memverifikasi password dengan hash yang sesuai.                | 20                |
| **Kualitas Kode**                | Kode rapi, terstruktur, dan memiliki komentar yang menjelaskan setiap bagian penting. | 15                |
| **Dokumentasi Singkat**          | Dokumentasi menjelaskan cara kerja program dan langkah-langkah yang diambil. | 10                |

**Total Skor**: 100

### **Rubrik Penilaian**

| **Aspek**                    | **Skor Penuh (100%)**                                                       | **Skor Sebagian (50%)**                                              | **Tidak Memenuhi (0%)**                                 |
|-------------------------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------|
| **Enkripsi dan Dekripsi**    | Program mengenkripsi dan mendekripsi teks dengan benar menggunakan AES.    | Hanya bisa mengenkripsi atau mendekripsi, tidak keduanya.            | Program tidak mengenkripsi atau mendekripsi.           |
| **Kunci dan IV**             | Menghasilkan kunci dan IV secara acak dan digunakan dengan benar.          | Menggunakan kunci dan IV statis.                                      | Tidak menggunakan kunci atau IV dengan benar.          |
| **Hashing Password**         | Password di-hash dengan bcrypt dan hash ditampilkan.                       | Hash dibuat, tetapi tidak menggunakan bcrypt atau tidak ditampilkan. | Tidak ada proses hashing.                              |
| **Verifikasi Hash**          | Verifikasi berhasil membandingkan password dengan hash.                    | Verifikasi hanya bekerja sebagian (misalnya, kasus tertentu saja).    | Verifikasi gagal atau tidak diimplementasikan.         |
| **Kualitas Kode**            | Kode bersih, terstruktur, dan memiliki komentar yang menjelaskan.          | Kode berfungsi tetapi kurang rapi atau tidak memiliki komentar.       | Kode sulit dibaca, tidak terstruktur, atau error.      |
| **Dokumentasi**              | Dokumentasi jelas menjelaskan cara kerja program.                          | Dokumentasi ada tetapi tidak lengkap atau membingungkan.              | Tidak ada dokumentasi.                                 |


## Pengumpulan Tugas

1. Format Pengumpulan:
- Kode dalam format .js.
- Dokumentasi dalam format .pdf atau .md.

2. Cara Pengumpulan:
- Unggah melalui platform pembelajaran atau kirim ke email dosen.