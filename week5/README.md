# Build basic APIs, handle HTTP methods (GET, POST, PUT, DELETE) with Express.
In this course, you will focus on using Express to build and test a RESTful API with the fundamental HTTP methods.

## Introduction to HTTP Methods and RESTful APIs

Topics:<br>
Overview of RESTful API: Quick recap of REST principles and how it aligns with CRUD (Create, Read, Update, Delete).
1. HTTP Methods:<br>
    1. GET: Retrieve data.        
    2. POST: Create new data.
    3. PUT: Update existing data.
    4. DELETE: Delete data.

2. Mapping CRUD Operations to HTTP Methods:<br>
    1. Create → POST
    2. Read → GET
    3. Update → PUT
    4. Delete → DELETE

## Setting Up the Express Server
Topics:
    1. Setting up a new Node.js project.
    1. Installing Express with npm install express.
    1. Creating the basic structure of an Express application.

## Implementasi API Endpoints di ExpressJS
Apa itu endpoint? endpoint adalah URL yang berfungsi sebagai titik kontak antara klien dan server API. Klien API mengirim request ke API endpoints untuk mengakses fungsi-fungsi dari API server untuk memperoleh data. Untuk request ke endpoint dari suatu API, diperlukan method, headers, parameter, otentikasi, dan kontek (body) data.

### Cara kerja endpoint
API endpoint bekerja dengan menghubungkan API dari klien dan server termasuk mengurusi data transfer antar keduanya. Sebagai contoh, REST API untuk mahasiswa dalam sebuah sistem akademik memiliki beberapa endpoint sebagai berikut:
1. `/api/mahasiswa` - berfungsi untuk mendapatkan seluruh mahasiswa dengan method `GET`
1. `/api/mahasiswa/add` - berfungsi untuk menambahkan mahasiswa dengan method `POST`
1. `/api/mahasiswa/update/:id` - berfungsi untuk mengupdate mahasiswa dengan method `PUT` atau `PATCH`
1. `/api/mahasiswa/delete/:id` - berfungsi untuk menghapus mahasiswa dengan method `DELETE`

### Contoh endpoints
Di sini, dicontohkan beberapa penerapan endpoint sederhana untuk simulasi operasi Create, Read, Update, dan Delete (CRUD).
Tambahkan file dengan nama server.js di working directory. Jalankan perintah `npm i express`.
Berikut ini adalah kode dari server.js:
```javascript
const express = require('express');

const app = express();
app.use(express.json());

let list_mahasiswa = [
    {nim: 432022611001, nama : 'Budi'},
    {nim: 432022611002, nama : 'Agus'},
    {nim: 432022611003, nama : 'Susi'},
]

app.get('/api/mahasiswa', (req, res) => {

    
    res.json(list_mahasiswa);
    res.end();
});

app.post('/api/mahasiswa/add', (req, res) => {
    
    let mhs = {
        nim: req.body.nim,
        nama: req.body.nama
    }
    list_mahasiswa.push(mhs)
    res.json(list_mahasiswa);
    res.end();
});

app.put('/api/mahasiswa/update/:nim', (req, res) => {
    let hasil = {
        code: 404,
        message: 'Mahasiswa tidak ditemukan',
        items: []
    };

    const nim = req.params.nim
    let mahasiswaFound = false

    
    for (let i = 0; i < list_mahasiswa.length; i++) {
        if (list_mahasiswa[i].nim == nim) {
            
            list_mahasiswa[i].nama = req.body.nama
            mahasiswaFound = true

            
            hasil = {
                code: 200,
                message: 'Okay',
                items: list_mahasiswa
            }
            break;

        }
    }

    // Send the response
    res.json(hasil);
    res.end();
});


app.delete('/api/mahasiswa/delete/:nim', (req, res) => {
    let hasil = {
        code: 404,
        message: 'Mahasiswa tidak ditemukan',
        items: []
    };

    const nim = req.params.nim
    
    for (let i = 0; i < list_mahasiswa.length; i++) {
        if (list_mahasiswa[i].nim == nim) {
            
            list_mahasiswa.splice(i, 1)            
            hasil = {
                code: 200,
                message: 'Okay',
                items: list_mahasiswa
            }
            console.log(list_mahasiswa, "deleted")
            break;

        }
    }

    // Send the response
    res.json(hasil);
    res.end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Ujicoba API endpoint dengan `curl`
Contoh perintah `curl`:
- `GET` semua mahasiswa:
```bash
curl -X GET http://localhost:3000/api/mahasiswa
```

- `POST` menambahkan seorang mahasiswa:
```bash
curl -X POST http://localhost:3000/api/mahasiswa/add -H "Content-Type: application/json" -d '{"nim": 123, "nama": "Testing"}'
```

- `PUT` mengupdate nama seorang mahasiswa:
```bash
curl -X PUT http://localhost:3000/api/mahasiswa/update/123 -H "Content-Type: application/json" -d '{"nama": "Testing123"}'
```

- `DELETE` menghapus data seorang mahasiswa berdasarkan nim:
```bash
curl -X DELETE http://localhost:3000/api/mahasiswa/delete/123 -H "Content-Type: application/json" 
```