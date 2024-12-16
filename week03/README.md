## Intro ke NodeJS

NodeJS adalah runtime environment multi platform yang kuat dan open-source yang memungkinkan para pengembang menjalankan kode JavaScript di server-side. Dulunya, JavaScript hanya digunakan...[readmore](intro.md).

## Callback Hell
Dalam JavaScript (JS), callback adalah fungsi yang diteruskan ke fungsi lain untuk dieksekusi setelah operasi asinkron selesai. Callback Hell mengacu pada masalah di mana beberapa nested callback menciptakan "Pyramid of Doom", sehingga kode sulit dibaca, di-debug, dan dimaintain.

Callback adalah fungsi yang digunakan sebagai argumen/parameter ke fungsi lain dalam JS. Fungsi ini dipanggil setelah selesainya operasi asinkron, sehingga kode dapat dijalankan setelah tugas selesai. Callback memungkinkan eksekusi tugas secara berurutan tanpa pemblokiran dalam pemrograman asinkron.

Callback Hell mengacu pada situasi dalam JS di mana beberapa nested callback membuat kode yang kompleks dan dalam, yang sering disebut "Pyramid of Doom". Struktur ini membuat kode sulit dibaca, di-debug, dan dipelihara, sehingga mengakibatkan kualitas kode yang buruk dan masalah skalabilitas.

Berikut contoh potongan dari callback hell
```js
namaFungsi1(function(hasil1){
    namaFungsi2(hasil1, function(hasil2){
        namaFungsi3(hasil2, function(hasil3){
            // Dan seterusnya....
        })
    })
})
```

### Contoh Skenario Callback Hell
Di sini, saya mencontohkan skenario sederhana untuk Callback Hell
- Koneksi ke db
- Mengambil data user berdasarkan ID
- Mengambil data yang posting oleh user
- Mencatat pesan sukses setelah semua proses berjalan

Adapun detil dari contoh ini, silakan dilihat di [sini](examples/callback_hell.js)

## Promises
Promise di JS adalah sebuah class/object yang mengurusi dan memastikan berhasil atau gagalnya suatu event asynchronous.

Promise memiliki tiga kondisi/state:
- **Pending**
Pending merupakan tahapan awal atau inisialisasi dari Promise, ketika program/kode sedang berjalan
- **Fulfilled**
Operasi berhasil dan memberikan nilai luaran atau return value
- **Rejected**:
Operasi gagal karena tidak memenuhi suatu kondisi atau bisa juga karena error

### Contoh Promise Synchronous
```js

let promise = new Promise((resolve, reject)=>{
    console.log('Kode ini sedang dijalankan dari dalam Promise')

    resolve('Promise Fulfilled')
})

console.log('Kode dijalankan')

promise.then(res => {
    console.log(res)
})
```
Di contoh ini:
- variabel `promise` merupakan instance dari `Promise`. Di dalam blok Promise, terdapat suatu perintah eksekusi kode.
- kode `.then()` digunakan untuk menhandle kondisi `Fulfilled` dari parameter `resolve`


### Contoh Promise Asynchronous
```js
let apromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let max = 10
        let min = 1
        let random_number = Math.floor(Math.random() * (max - min) + min)
        console.log("Angka yang keluar: ",random_number)
        if (random_number % 2 == 0)
            resolve("Bilangan genap")
        else
            reject("Bilangan Ganjil")
    }, 1000)
})

console.log("Mulai")

apromise.then(res => {
    console.log(res)
}).catch(error => {
    console.log("Terjadi error;", error)
})

console.log('Selesai')
```

### Promise berantai ??
```js
let apromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let max = 10
        let min = 1
        let random_number = Math.floor(Math.random() * (max - min) + min)
        console.log("Angka yang keluar: ",random_number)
        resolve(random_number)
    }, 1000)
})

console.log("Mulai Program Random antara 1 - 10")

apromise.then(res => {
    console.log(res)
    return res
}).then(res => {
    console.log(res,"+ 2 = ", res + 2)
    return res + 2
}).then(res => {
    console.log(res,"+ 5 =", res + 5)
    return res + 5
}).then(res => {
    console.log(res,"- 1 =",res - 1)
    return res - 1
}).then(res => {
    console.log("Hasil akhir", res)
}).catch(error => {
    console.log("Terjadi error;", error)
})

console.log('Selesai')
````
Lihat contoh Promise berantai di [sini](examples/js/promises_chain.js)

