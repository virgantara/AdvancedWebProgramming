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