# Data Security with Encryption

## Introduction to Encryption
Enkripsi adalah proses mengubah data asli (plaintext) menjadi bentuk yang tidak dapat dibaca (ciphertext) untuk melindungi data dari akses yang tidak diizinkan. Enkripsi dapat dibagi menjadi dua jenis utama:

- Enkripsi Simetris: Menggunakan satu kunci untuk proses enkripsi dan dekripsi (contoh: AES).
- Enkripsi Asimetris: Menggunakan pasangan kunci publik dan kunci privat untuk enkripsi dan dekripsi (contoh: RSA).

## Symmetric Encryption
 **Symmetric Encryption** atau enkripsi simetris adalah metode enkripsi yang menggunakan satu kunci yang sama untuk proses enkripsi dan dekripsi. Artinya, baik saat mengubah data asli (plaintext) menjadi data terenkripsi (ciphertext) maupun saat mengembalikan data terenkripsi menjadi data asli, kunci yang digunakan tetap sama. Contoh algoritma enkripsi simetris yang populer adalah **AES (Advanced Encryption Standard)**. AES banyak digunakan karena kecepatan dan keamanannya, terutama dalam mengamankan komunikasi data yang berlangsung secara real-time, seperti komunikasi antara server dan klien.

Dalam praktiknya, ketika dua pihak ingin bertukar informasi secara aman menggunakan enkripsi simetris, mereka harus memastikan bahwa kunci yang digunakan untuk enkripsi dan dekripsi disimpan dengan aman. Jika kunci ini jatuh ke tangan yang tidak berwenang, data yang dienkripsi dapat dengan mudah didekripsi. Oleh karena itu, keamanan penyimpanan dan distribusi kunci menjadi tantangan utama dalam enkripsi simetris. Contoh penerapan enkripsi simetris adalah dalam protokol keamanan jaringan seperti **HTTPS** dan **VPN**.

**Use Case** dari enkripsi simetris adalah untuk mengamankan data yang dikirimkan dalam jaringan internal, seperti transfer file antar server dalam organisasi. Karena proses enkripsi dan dekripsi menggunakan kunci yang sama, enkripsi simetris sangat cepat dan efisien untuk mengenkripsi data dalam jumlah besar. Namun, karena kunci harus dibagikan di antara pihak-pihak yang berkomunikasi, metode ini kurang cocok untuk skenario di mana kunci sulit untuk didistribusikan secara aman.

---

## Asymmetric Encryption
**Asymmetric Encryption** atau enkripsi asimetris adalah metode enkripsi yang menggunakan dua kunci yang berbeda namun terkait satu sama lain: **kunci publik (public key)** dan **kunci privat (private key)**. Kunci publik digunakan untuk mengenkripsi data, sementara kunci privat digunakan untuk mendekripsi data. Contoh algoritma enkripsi asimetris yang populer adalah **RSA (Rivest-Shamir-Adleman)**. RSA sering digunakan untuk mengamankan komunikasi yang memerlukan pertukaran kunci secara aman, seperti saat melakukan autentikasi dalam proses login atau saat mengirim data sensitif melalui internet.

Dalam enkripsi asimetris, kunci publik dapat dibagikan secara bebas kepada siapa saja yang ingin mengirim data terenkripsi. Namun, hanya pemilik kunci privat yang dapat mendekripsi data tersebut. Hal ini menjadikan enkripsi asimetris lebih aman dalam skenario di mana pengiriman kunci secara rahasia tidak memungkinkan. Salah satu penerapan nyata enkripsi asimetris adalah dalam **SSL/TLS** untuk mengamankan komunikasi antara browser dan server web.

Use Case dari enkripsi asimetris adalah untuk mengamankan transfer data antar pihak yang belum saling mengenal, seperti mengirim email terenkripsi atau melakukan transaksi online. Enkripsi asimetris juga sering digunakan dalam **digital signatures (tanda tangan digital)** untuk memverifikasi keaslian dokumen atau pesan. Meskipun lebih aman untuk pertukaran kunci, enkripsi asimetris lebih lambat dibandingkan enkripsi simetris, sehingga biasanya digunakan bersama-sama dalam protokol keamanan modern.

---

## Perbandingan Enkripsi Simetris dengan Asimetris
Enkripsi simetris dan enkripsi asimetris memiliki kelebihan dan kekurangan masing-masing. Enkripsi simetris unggul dalam hal kecepatan dan efisiensi, terutama untuk mengenkripsi data dalam jumlah besar. Namun, tantangan utama enkripsi simetris adalah bagaimana mendistribusikan kunci dengan aman kepada pihak-pihak yang berkomunikasi. Jika kunci simetris dicuri atau bocor, keamanan data menjadi terancam.

Sebaliknya, enkripsi asimetris lebih aman dalam hal distribusi kunci karena hanya kunci publik yang dibagikan, sementara kunci privat tetap rahasia. Ini membuat enkripsi asimetris ideal untuk komunikasi antara pihak-pihak yang belum saling mengenal. Namun, enkripsi asimetris lebih lambat karena proses komputasinya lebih kompleks. Oleh karena itu, dalam praktiknya, kedua metode ini sering digunakan bersama: enkripsi asimetris untuk mendistribusikan kunci simetris, dan enkripsi simetris untuk mengenkripsi data utama.

Contohnya, dalam komunikasi **HTTPS**, proses awal menggunakan enkripsi asimetris untuk bertukar kunci simetris antara browser dan server. Setelah kunci simetris diterima dengan aman, komunikasi selanjutnya menggunakan enkripsi simetris untuk kecepatan dan efisiensi. Dengan memahami perbedaan ini, kita dapat memilih metode enkripsi yang paling sesuai dengan kebutuhan keamanan dalam berbagai skenario.

---

Singkatnya:
1. Symmetric Encryption:

- Menggunakan satu kunci untuk enkripsi dan dekripsi.
- Contoh: **AES** (Advanced Encryption Standard).
- Use Case: Mengamankan komunikasi data dalam jaringan.

2. Asymmetric Encryption:

- Menggunakan dua kunci: kunci publik untuk enkripsi dan kunci privat untuk dekripsi.
- Contoh: **RSA** (Rivest-Shamir-Adleman).
- Use Case: Mengamankan transfer data seperti pertukaran kunci enkripsi.

## Pengenalan modul `crypto` di NodeJS
Modul `crypto` di NodeJS menyediakan fungsionalitas kriptografi yang mencakup sekumpulan pembungkus untuk fungsi `hash`, `HMAC`, `cipher`, `decipher`, `sign`, dan verifikasi OpenSSL. Modul ini memungkinkan untuk melakukan berbagai operasi keamanan, seperti hashing, enkripsi, dan dekripsi, secara langsung dalam aplikasi NodeJS. Kita akan mengeksplorasi apa itu modul `crypto`, fitur-fitur utamanya, dan cara menggunakannya untuk melakukan operasi kriptografi yang umum. Modul `crypto` di NodeJS adalah sudah bawaan dari NodeJS, yang berarti modul ini dibangun di dalam NodeJS dan tidak memerlukan dependensi eksternal apa pun.

### Fitur-fitur `crypto`
`crypto` memiliki beberapa fitur berikut:
1. Hashing data.
2. Encrypting and decrypting data using symmetric and asymmetric algorithms.
3. Generating cryptographic signatures dan verifying them.
4. Creating secure random numbers and keys.


## Contoh Enkripsi Simetris
Di sini, saya contohkan bagaimana mengenkripsi pesan teks menggunakan salah satu teknik enkripsi simetris yaitu AES. Contoh ini saya buat dengan menggunakan NodeJS.
1. Buat sebuah file dengan nama `main.js`
2. Isikan kode berikut di file `main.js` yang telah dibuat.
3. Import library `crypto`
```javascript
const crypto = require('crypto');
```

