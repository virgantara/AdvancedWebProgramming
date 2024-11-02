# Introduction to RESTful Services with ExpressJS
In this course, you will learn Node.js fundamentals, setting up Express, handling HTTP requests, and integrating APIs with HTML.

## ExpressJS
Express.js adalah kerangka kerja aplikasi web untuk Node.js yang dirancang untuk memudahkan pengembangan aplikasi dan API web. Express.js adalah salah satu framework web yang populer karena kemudahan penggunaannya dan kemampuannya untuk menangani aplikasi skala besar dengan cepat dan efisien. Berikut adalah beberapa poin utama tentang Express.js:

1. **Ringan dan Minimalis**: Express dirancang dengan prinsip minimalis, tanpa menambahkan banyak komponen bawaan yang tidak diperlukan. Ini memungkinkan pengembang untuk menambah fitur sesuai kebutuhan tanpa beban tambahan.

2. **Routing yang Kuat**: Express menyediakan sistem routing yang kuat dan fleksibel yang memungkinkan pengembang untuk menangani berbagai jenis permintaan HTTP, seperti GET, POST, PUT, dan DELETE. Dengan routing ini, pengembang bisa dengan mudah membuat berbagai endpoint dalam aplikasi mereka.

3. **Middleware**: Express mendukung konsep middleware, yang memungkinkan pengembang untuk menambahkan fungsi yang dijalankan di antara permintaan masuk dan respons yang dikirim. Middleware dapat digunakan untuk berbagai keperluan, seperti autentikasi, logging, pengolahan data permintaan, dan lainnya.

4. **Dukungan untuk Templating**: Express bisa dikombinasikan dengan berbagai mesin templating seperti EJS, Pug, atau Handlebars untuk membuat tampilan dinamis dalam aplikasi web, sehingga cocok untuk aplikasi yang memerlukan tampilan HTML yang dihasilkan secara dinamis.

5. **Kaya Ekosistem**: Karena sangat populer, Express memiliki ekosistem paket yang luas. Banyak modul dan library tersedia untuk memperluas fungsionalitas Express, seperti untuk autentikasi, database, manajemen file, dan lainnya.

6. **Mudah Dikombinasikan dengan Teknologi Lain**: Express mudah dikombinasikan dengan database seperti MongoDB, MySQL, atau PostgreSQL, dan sering digunakan dalam aplikasi full-stack bersama framework front-end seperti React, Angular, atau Vue.js.

7. **Kompatibel dengan RESTful API**: Express sangat cocok untuk membangun RESTful API, menjadikannya pilihan umum untuk membangun backend aplikasi berbasis REST atau layanan web yang menyediakan data untuk aplikasi front-end.

8. **Performance dan Skala**: Karena berjalan di Node.js, Express memiliki kinerja yang cepat dan dapat menangani banyak permintaan secara simultan, menjadikannya pilihan populer untuk aplikasi yang memerlukan skala besar atau performa tinggi.

Express.js sangat cocok untuk aplikasi backend dan layanan REST API, baik untuk proyek kecil maupun besar.

## Instalasi ExpressJS

```code
npm install express
```

## Server
Petunjuk menjalankan server:
1. Buatlah sebuah file dengan nama apapun, misalnya server.js.
1. Simpan file tersebut ke folder/direktori tertentu.
1. Edit file tersebut, isikan kode berikut
```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```
1. Buka terminal atau command prompt. Untuk sistem operasi Windows, tekan tombol windows + R, ketik cmd.
1. Pindah ke direktori di mana file server.js tersimpan. 
1. Jalankan perintah `node server.js`

## Postman
### Deskripsi
Postman adalah software yang digunakan untuk menguji, mengembangkan, dan mendokumentasikan API (Application Programming Interface). Postman menyediakan interface untuk membuat dan mengirim permintaan HTTP, seperti GET, POST, PUT, dan DELETE, serta melihat respons yang dikembalikan oleh server. 

### Instalasi
Silakan unduh Postman di [sini](https://www.postman.com/downloads/)

### Cara penggunaan Postman
Terkait cara penggunaan, akan dipraktikkan secara langsung di kelas/lab