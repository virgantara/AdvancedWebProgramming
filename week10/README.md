# Data Security with Encryption

## Introduction to Encryption
Enkripsi adalah salah satu teknik utama dalam kriptografi yang digunakan untuk menjaga kerahasiaan informasi. Enkripsi bekerja dengan mengubah data asli (plaintext) menjadi data yang tidak dapat dibaca atau dipahami (ciphertext). Proses ini dilakukan dengan menggunakan algoritma enkripsi dan sebuah kunci (key). Untuk mengembalikan ciphertext menjadi plaintext, digunakan proses kebalikan yang disebut dekripsi. Enkripsi dapat dibagi menjadi dua jenis utama:

- Enkripsi Simetris: Menggunakan satu kunci untuk proses enkripsi dan dekripsi (contoh: AES).
- Enkripsi Asimetris: Menggunakan pasangan kunci publik dan kunci privat untuk enkripsi dan dekripsi (contoh: RSA).

Dalam kriptografi, terdapat beberapa istilah penting yang sering digunakan, seperti **key (kunci)** dan **IV (Initialization Vector)**. Berikut penjelasan yang lebih mendalam mengenai istilah-istilah tersebut.

## Apa itu Key (Kunci)?

Key atau kunci adalah elemen penting dalam proses enkripsi dan dekripsi. Key berfungsi sebagai parameter yang digunakan oleh algoritma kriptografi untuk mengubah data asli (plaintext) menjadi data terenkripsi (ciphertext) dan sebaliknya. Tanpa key yang benar, data terenkripsi tidak dapat dikembalikan ke bentuk aslinya.

## Apa itu IV (Initialization Vector)?

IV (Initialization Vector) adalah nilai unik yang digunakan bersama dengan key dalam proses enkripsi untuk memastikan bahwa data yang sama akan dienkripsi menjadi ciphertext yang berbeda setiap kali proses enkripsi dilakukan. IV umumnya digunakan dalam algoritma enkripsi simetris seperti AES dengan mode operasi seperti CBC (Cipher Block Chaining) atau CFB (Cipher Feedback). Keuntungan dari menggunakan IV yaitu menghindari pola yang berulang dalam ciphertext meskipun plaintext dan key yang digunakan sama. Dalam penggunaannya, IV tidak perlu disembunyikan seperti key, tetapi harus dibuat secara acak dan unik untuk setiap sesi enkripsi.

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
2. Enkripsi dan dekripsi data dengan algoritma simetris dan asimetris
3. Membuat signature kriptografi dan verifikasi
4. Membuat angka random dan kunci yang aman

---

## Contoh Enkripsi Simetris
Di sini, saya contohkan bagaimana mengenkripsi pesan teks menggunakan salah satu teknik enkripsi simetris yaitu AES. Contoh ini saya buat dengan menggunakan NodeJS.
1. Buat sebuah file dengan nama `main.js`
2. Isikan kode berikut di file `main.js` yang telah dibuat.
3. Import library `crypto`
```javascript
const crypto = require('crypto');
```

4. Inisiasi `key` dan `IV`
```javascript
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
```

5. Membuat fungsi untuk enkrip.
```javascript
function encrypt(pesan) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(pesan, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return { 
        encryptedData: encrypted, 
        iv: iv.toString('hex') 
    }
}
```

6. Membuat fungsi dekrip
```javascript
function decrypt(pesanTerenkripsi, ivHex){
    const decipher = crypto.createDecipheriv('aes-256-cbc',key, Buffer.from(ivHex,'hex'))

    let decrypted = decipher.update(encryptedData, 'hex','utf8')

    decrypted += decipher.final('utf8')

    return decrypted
}
```

7. Penggunaan fungsi `encrypt()` dan `decrypt()`
```javascript
const {encrypt, decrypt} = require('./enkripsi_aes.js')

const teks = "Assalamualaikum"
const encrypted = encrypt(teks)

console.log("Pesan terenkripsi:", encrypted.encryptedData)

const pesanDekripsi = decrypt(encrypted.encryptedData, encrypted.iv)
console.log("Pesan asli:", pesanDekripsi)
```
8. Catatan tambahan
Fungsi `encrypt()` dan `decrypt()` serta kode pada nomor 3 hingga 6 saya taruh pada file dengan nama `enkripsi_aes.js`. File ini saya gunakan sebagai `module` untuk memudahkan pengelolaan kode dalam NodeJS