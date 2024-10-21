## Understanding let, const, var, and Asynchronous Programming with async/await
Tugas ini akan menguatkan pemahaman mahasiswa terhadap JavaScript variabel seperti `let`, `const`, dan `var` dan asynchronous programming dengan `async/await`. 

## Tugas:
### Task 1: Memahami scope variabel
Berikut ini adalah contoh kode yang kurang tepat dalam penggunaan `var` sehingga mengakibatkan kendala scope variabel. Refactor/ubah kode berikut hanya dengan `let` atau `const` dengan tepat.

```js
function cetakAngka() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}

cetakAngka();  
```
Instruksi:
- Identifikasi permasalahan dengan cara jalankan kode dan perhatikan outputnya. Jelaskan kenapa outputnya diluar ekspektasi.
- Refactor kode: Ubah kode dengan menggunakan `let` dan `const` dengan tepat. Pastikan setiap iterasi mencetak/print angka yang sesuai dengan waktu/time.
- Berikan komentar pada kode (beri tanda `//`) dan jelaskan kenapa menggunakan `let` atau `const` dibeberapa bagian yang berbeda

### Task 2: Refactoring (Mengubah Struktur Kode) Callback ke async/await
Berikut ini adalah kode yang disediakan yang menggunakan callback. Refactor kode ini menggunakan `async/await`.
```js
function fetchData(callback) {
    setTimeout(() => {
        console.log('Data fetched');
        callback(null, { data: 'Some data' });
    }, 2000);
}

function processData(data, callback) {
    setTimeout(() => {
        console.log('Processing data:', data);
        callback(null, `Processed: ${data.data}`);
    }, 2000);
}

function saveData(processedData, callback) {
    setTimeout(() => {
        console.log('Data saved:', processedData);
        callback(null, 'Success');
    }, 2000);
}

fetchData((fetchErr, fetchedData) => {
    if (fetchErr) {
        console.error('Error fetching data:', fetchErr);
        return;
    }

    processData(fetchedData, (processErr, processedData) => {
        if (processErr) {
            console.error('Error processing data:', processErr);
            return;
        }

        saveData(processedData, (saveErr, result) => {
            if (saveErr) {
                console.error('Error saving data:', saveErr);
                return;
            }

            console.log('All operations completed:', result);
        });
    });
});

```

Instruksi:
- Ubah Callbacks ke async/await:
- Refactor kode yang disediakan dengan async/await.
- Berikan komentar pada kodemu seperti penjelasan setiap perubahan yang dibuat dan jelaskan kenapa `async/await` bisa meningkatkan readability kode

## Pengumpulan Tugas
- Kirimkan tugasmu dalam bentuk file `.js` lewat Google Classroom
- Pastikan kodemu sudah diberikan komentar `//` yang menjelaskan alasan pada tiap-tiap Task.
- Patikan kodemu tidak ada error.

## Rubrik Penilaian
- Task 1 (40%): Ketepatan penggunaan dan penjelasan `let` dan `const`.
- Task 2 (60%): Ketepatan refactoring kode dari callback ke `async/await`