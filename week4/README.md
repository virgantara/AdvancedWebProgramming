# Introduction to RESTful Services with ExpressJS
In this course, you will learn Node.js fundamentals, setting up Express, handling HTTP requests, and integrating APIs with HTML.

## RESTful
### Deskripsi
RESTful, atau Representational State Transfer, adalah arsitektur yang digunakan untuk merancang web service yang memungkinkan komunikasi antar sistem melalui protokol HTTP. RESTful API, atau API berbasis REST, dirancang secara sederhana, fleksibel, dan mudah digunakan, mengikuti prinsip-prinsip REST yang memperlakukan setiap sumber daya dalam sistem sebagai objek yang dapat dimanipulasi melalui URL tertentu.

### Prinsip-Prinsip REST
1. Stateless: Setiap permintaan dari klien ke server harus berisi semua informasi yang diperlukan untuk memahami permintaan tersebut. Server tidak menyimpan status atau sesi antara permintaan, sehingga setiap permintaan bersifat independen.
2. Penggunaan HTTP Method

- GET: Mengambil data dari server tanpa mengubah data. Digunakan untuk membaca sumber daya.
- POST: Menambahkan data baru ke server. Digunakan untuk membuat sumber daya baru.
- PUT: Memperbarui data yang ada di server. Digunakan untuk memperbarui sumber daya yang sudah ada.
- DELETE: Menghapus data dari server. Digunakan untuk menghapus sumber daya.
3. Resource berbasis URL
4. Representasi resource yang mudah dibaca (JSON/XML)
5. Sistem Berlapis: REST mendukung sistem berlapis di mana klien tidak harus terhubung langsung ke server utama tetapi bisa melalui perantara (seperti load balancer atau proxy). Hal ini membuat REST lebih fleksibel dan aman.

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

## `curl`
### Deskripsi
`curl` adalah alat command-line yang berguna untuk mengirim permintaan HTTP ke server. Berikut adalah beberapa contoh dasar cara menggunakan curl untuk melakukan berbagai permintaan HTTP.

### Pengecekan instalasi `curl`
1. Buka terminal atau command prompt. Untuk sistem operasi Windows, tekan tombol windows + R, ketik cmd.
1. Jalankan perintah `curl --help`

## Server dengan Response JSON
Update kode script file server.js dengan kode berikut:
```node
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {

    var data = {
      'code': 200,
      'status': 'Ok',
      'message': 'Hello World'
    };

    res.json(data);
    res.end();
});

app.post('/kirim', (req, res) => {
    var data = {
      'code': 200,
      'status': 'Ok',
      'message': req.body
    };

    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);

    res.json(data);
    res.end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Contoh HTTP Request dengan `curl`
1. GET Request: Permintaan GET digunakan untuk mengambil data dari server.
```bash
curl -X GET http://localhost:3000
```

1. POST Request: Permintaan POST digunakan untuk mengirim data ke server, seperti untuk menambah sumber daya baru.
```bash
curl -X POST  http://localhost:3000/kirim \
-H "Content-Type: application/json" \
-d '{"nama" : "Budi", "hp" : "123"}'
```
