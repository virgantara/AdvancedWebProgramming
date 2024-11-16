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
3. Topics:
    1. Setting up a new Node.js project.
    1. Installing Express with npm install express.
    1. Creating the basic structure of an Express application.

## Implementing Basic API Endpoints in Express
Apa itu endpoint? endpoint adalah URL yang berfungsi sebagai titik kontak antara klien dan server API. Klien API mengirim request ke API endpoints untuk mengakses fungsi-fungsi dari API server untuk memperoleh data. Untuk request ke endpoint dari suatu API, diperlukan method, headers, parameter, otentikasi, dan kontek (body) data.

### Cara kerja endpoint
API endpoint bekerja dengan menghubungkan API dari klien dan server termasuk mengurusi data transfer antar keduanya. Sebagai contoh, REST API untuk komentar dalam sebuah media sosial memiliki beberapa endpoint sebagai berikut:
1. `/comments` - berfungsi untuk mendapatkan seluruh komentar dengan method `GET`
1. `/comments/add` - berfungsi untuk menambahkan komentar dengan method `POST`
1. `/comments/update/:id` - berfungsi untuk mengupdate komentar dengan method `PUT` atau `PATCH`
1. `/comments/delete/:id` - berfungsi untuk menghapus komentar dengan method `DELETE`