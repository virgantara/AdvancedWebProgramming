# Connect APIs to databases (e.g., MongoDB or MySQL) for CRUD operations using Express.
Pertemuan ini akan berfokus pada integrasi RESTful API yang dibangun dengan Express.js dengan database MySQL untuk melakukan operasi CRUD (Create, Read, Update, Delete).

Tujuan Pembelajaran

## Pada akhir sesi ini, siswa diharapkan dapat:

1. Memahami peran MySQL dalam aplikasi back-end.
2. Menyiapkan database MySQL dan menghubungkannya ke aplikasi Express.js.
3. Menerapkan operasi CRUD (Create, Read, Update, Delete) dengan kueri MySQL dalam RESTful API.
4. Menguji endpoint API yang didukung basis data menggunakan Postman atau curl.


## Rencana Pembelajaran 

1. Pengenalan MySQL dan Perannya dalam API (10 menit)
2. Menyiapkan Koneksi MySQL dan Basis Data (20 menit)
3. Membuat Titik Akhir CRUD dengan Integrasi MySQL (90 menit)
4. Menguji API CRUD (30 menit)

## Introduction to MySQL and Its Role in APIs
1. What is MySQL?
2. Role of MySQL in RESTful APIs:

## Setting Up MySQL and Database Connection 
1. Installing MySQL locally
2. Creating a database and a sample table

### Creating database
```sql
CREATE DATABASE sekolah;
USE sekolah;

CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(10) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    usia INT NOT NULL
);

INSERT INTO mahasiswa (nim, nama, usia) VALUES 
('101', 'Susi', 20),
('102', 'Siti', 22),
('103', 'Ayu', 21);
```

### Connecting Express to MySQL:
1. Install the MySQL package:
```bash
npm install mysql
```


2. Code for database connection:

Buatlah sebuah file dengan nama db.js

```javascript
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahasiswa'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
```

## Creating CRUD Endpoints with MySQL Integration

### GET /api/mahasiswa - Retrieve all students:
```javascript
app.get('/api/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});
```

### GET /api/students/:id - Retrieve a specific student by ID:
```javascript
app.get('/api/mahasiswa/:id', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa WHERE id = ?';
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
        } else {
            res.json(result[0]);
        }
    });
});

```

### POST /api/mahasiswa - Create a new student:
```javascript
app.post('/api/mahasiswa', (req, res) => {
    const { nim, nama, usia } = req.body;
    const sql = 'INSERT INTO mahasiswa (nim, nama, usia) VALUES (?, ?, ?)';

    db.query(sql, [nim, nama, usia], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(201).json({ message: 'Mahasiswa telah ditambah', id: result.insertId });
        }
    });
});
```

### PUT /api/mahasiswa/:id - Update an existing student:
```javascript
app.put('/api/mahasiswa/:id', (req, res) => {
    const { nama, usia } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE mahasiswa SET nama = ?, usia = ? WHERE id = ?';

    db.query(sql, [nama, usia, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Mahasiswa not found' });
        } else {
            res.json({ message: 'Mahasiswa telah diupdate' });
        }
    });
});

```

### DELETE /api/mahasiswa/:id - Delete a student:
```javascript
app.delete('/api/mahasiswa/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM mahasiswa WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Mahasiswa not found' });
        } else {
            res.json({ message: 'Mahasiswa telah dihapus' });
        }
    });
});

```

## Pembuatan Server
### Instalasi library yang diperlukan
`npm install express body-parser cors`

Buatlah file dengan nama server.js. Isinya sebagai berikut:
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// script routing taruh disini

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
````

## Testing CRUD APIs 
1. Testing APIs using curl and Postman
2. Verifying data changes in MySQL using the MySQL client or GUI tools (e.g., phpMyAdmin)

### GET semua mahasiswa:
```bash
curl -X GET http://localhost:3000/api/mahasiswa
```

### POST (tambah mahasiswa baru)
```bash
curl -X POST http://localhost:3000/api/mahasiswa \
-H "Content-Type: application/json" \
-d '{"nama": "Budi","usia": 20,"nim" : 103}' 
```

### PUT (update mahasiswa yang sudah ada)
```bash
curl -X PUT http://localhost:3000/api/mahasiswa/1 \
-H "Content-Type: application/json" \
-d '{"nama": "Contoh Ubah nama", "usia": 25}' \
```

### DELETE (hapus mahasiswa)
```bash
curl -X DELETE http://localhost:3000/api/mahasiswa/1
```