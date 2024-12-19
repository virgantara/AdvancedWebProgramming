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
