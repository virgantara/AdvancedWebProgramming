# Mini Project: CRUD RESTful API dengan Node.js dan MySQL

## Deskripsi Proyek

Buat aplikasi RESTful API sederhana menggunakan Node.js, Express, dan MySQL yang mendukung operasi CRUD (Create, Read, Update, Delete). 

## Fitur Aplikasi

1. CRUD untuk Data Mahasiswa:
- Create: Menambahkan data mahasiswa baru.
- Read: Melihat semua data mahasiswa atau data mahasiswa berdasarkan ID.
- Update: Memperbarui data mahasiswa.
- Delete: Menghapus data mahasiswa.

2. Struktur Database:
- Tabel students dengan kolom berikut:
- id (INT, Primary Key, Auto Increment)
- nim (VARCHAR, Nomor Induk Mahasiswa)
- nama (VARCHAR, Nama Mahasiswa)
- jurusan (VARCHAR, Jurusan Mahasiswa)

3. Endpoint RESTful API:
- GET /api/students - Mendapatkan semua data mahasiswa.
- GET /api/students/:id - Mendapatkan data mahasiswa berdasarkan ID.
- POST /api/students - Menambahkan data mahasiswa baru.
- PUT /api/students/:id - Memperbarui data mahasiswa berdasarkan ID.
- DELETE /api/students/:id - Menghapus data mahasiswa berdasarkan ID.

## **Rubrik Penilaian Mini Project**

| **Aspek Penilaian**          | **Deskripsi**                                                              | **Skor Maksimal** |
|-------------------------------|----------------------------------------------------------------------------|-------------------|
| **Fungsi CRUD**              | Semua operasi CRUD (Create, Read, Update, Delete) berfungsi dengan baik.  | 30                |
| **Koneksi ke Database**      | Aplikasi berhasil terhubung dengan database MySQL.                        | 20                |
| **Struktur Endpoint RESTful**| Endpoint mengikuti konvensi RESTful dengan baik.                          | 20                |
| **Pengolahan Error**         | Menangani error dengan baik dan memberikan pesan yang informatif.         | 10                |
| **Kualitas Kode**            | Kode rapi, terstruktur, dan memiliki komentar yang menjelaskan fungsi.    | 10                |
| **Dokumentasi**              | Dokumentasi jelas menjelaskan cara menjalankan dan menggunakan API.       | 10                |

**Total Skor**: 100

## **Kriteria Penilaian Detail**

| **Skor**        | **Deskripsi**                                                                                                     |
|-----------------|--------------------------------------------------------------------------------------------------------------------|
| **90 - 100**   | Semua fitur CRUD berfungsi dengan baik, kode rapi, dokumentasi lengkap, dan error ditangani dengan baik.          |
| **75 - 89**    | Sebagian besar fitur CRUD berfungsi, ada sedikit kekurangan, kode cukup rapi, dokumentasi ada namun kurang detail.|
| **60 - 74**    | Beberapa fitur CRUD berfungsi, ada error, kode kurang rapi, dokumentasi minim.                                     |
| **< 60**       | Banyak fitur tidak berfungsi, kode berantakan, dan tidak ada dokumentasi.                                          |


---
## Panduan Automated Testing untuk Mini Project Node.js dengan MySQL
Untuk memudahkan evaluasi mini project CRUD RESTful API dengan Node.js dan MySQL, automated testing sangat berguna untuk memastikan bahwa semua endpoint berfungsi dengan baik. Automated testing adalah proses menjalankan skrip untuk menguji aplikasi secara otomatis. Untuk mini project ini, siswa akan membuat tes untuk memastikan bahwa semua operasi CRUD berjalan dengan baik. Dengan testing otomatis, dosen dapat dengan cepat mengevaluasi apakah semua fitur sudah sesuai spesifikasi.

### Tools dan Framework yang Digunakan
1. **Mocha**: Framework untuk menjalankan tes di Node.js.
2. **Chai**: Library untuk membuat asersi (assertions) dalam tes.
3. **Supertest**: Library untuk menguji HTTP endpoints secara mudah.

### Instalasi
```bash
npm install --save-dev mocha chai supertest
```

Tambahkan skrip untuk menjalankan tes di `package.json`:
```json
"scripts": {
  "test": "mocha"
}
```
### Langkah-langkah Implementasi Testing
1. Struktur Direktori/Folder
```bash
mini-project/
├── package.json
├── server.js
├── db.js
└── test/
    └── students.test.js
```

### Contoh Kode Testing
1. Buat file `students.test.js` di folder `test/` untuk mengetes endpoint CRUD.

```javascript
const request = require('supertest');
const { expect } = require('chai');
const app = require('../server'); // Pastikan server.js mengekspor `app`

describe('CRUD API untuk Mahasiswa', () => {

  it('GET /api/students harus mengembalikan semua data mahasiswa', (done) => {
    request(app)
      .get('/api/students')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });


  it('POST /api/students harus menambahkan mahasiswa baru', (done) => {
    request(app)
      .post('/api/students')
      .send({ nim: '123456', nama: 'Budi', jurusan: 'Informatika' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').equal('Mahasiswa ditambahkan');
        done();
      });
  });

  it('PUT /api/students/:id harus memperbarui data mahasiswa', (done) => {
    request(app)
      .put('/api/students/1')
      .send({ nim: '654321', nama: 'Andi', jurusan: 'Sistem Informasi' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').equal('Data mahasiswa diperbarui');
        done();
      });
  });

  it('DELETE /api/students/:id harus menghapus data mahasiswa', (done) => {
    request(app)
      .delete('/api/students/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message').equal('Data mahasiswa dihapus');
        done();
      });
  });
});

```
### Menjalankan Testing
Jalankan perintah berikut di terminal:
```bash
npm test
```
Output seharusnya menunjukkan hasil pengujian untuk setiap endpoint CRUD.

---

## 🔗 **Pengumpulan Tugas dan Evaluasi**

### **Pengumpulan di GitHub**

1. **Repository GitHub**:
   - Siswa harus menyimpan kode proyek di repository GitHub.
   - Sertakan:
     - Folder `test/` berisi file tes.
     - File `README.md` dengan petunjuk lengkap untuk menjalankan proyek dan tes.

2. **Branch dan Commit**:
   - Gunakan nama branch yang deskriptif, misalnya `feature/testing`.
   - Lakukan commit secara berkala dengan pesan yang jelas.

### **Checklist Evaluasi**

| **Kriteria**                             | **Deskripsi**                                              | **Penilaian**  |
|------------------------------------------|-----------------------------------------------------------|----------------|
| **Kode CRUD Berfungsi**                  | Semua endpoint CRUD bekerja sesuai spesifikasi.           | ✅ / ❌         |
| **Automated Tests**                      | Tes mencakup semua operasi CRUD (`GET`, `POST`, `PUT`, `DELETE`). | ✅ / ❌         |
| **Semua Tes Lulus**                      | Semua tes berjalan tanpa error.                          | ✅ / ❌         |
| **Dokumentasi Lengkap**                  | Petunjuk menjalankan proyek dan tes jelas di `README.md`. | ✅ / ❌         |
| **Struktur Repository GitHub**           | Kode terstruktur dengan folder `test/` untuk tes.         | ✅ / ❌         |

---

### 🎯 **Manfaat Automated Testing**

1. **Memudahkan Evaluasi**:
   - Dosen dapat menjalankan tes otomatis untuk memverifikasi fungsi proyek dengan cepat.
2. **Mengurangi Error Manual**:
   - Memastikan semua fitur CRUD berfungsi tanpa perlu pengujian manual berulang.
3. **Meningkatkan Kualitas Kode**:
   - Mendorong praktik pengembangan yang baik dengan menulis tes dan dokumentasi.

Dengan pendekatan ini, siswa akan belajar praktik profesional dalam pengembangan aplikasi dan dosen dapat melakukan evaluasi dengan lebih efisien. 🚀
