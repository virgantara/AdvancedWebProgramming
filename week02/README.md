# Konsep Asynchronous Programming di JavaScript (JS)

Learning Outcomes (LO):
- Mahasiswa mampu memahami dan menerapkan syntax javascript modern (LO1)
- Mahasiswa mampu mengimplementasikan asynchronous programming menggunakan Promise, Async, dan Await (LO2)

Topik Pertemuan:
- [Fungsi Arrow](examples/js/arrow_func.js)
- [Deklarasi variabel dengan let dan const](examples/js/variabel.js)
- [Konsep Asynchronous Programming](README.md)
- [Promises](Promises.md)
- [Async/Await](AsyncAwait.md)

Penugasan:
- (Tugas Mandiri 2)[week2/tugas.md]

## Synchronous
JS pada dasarnya adalah single-thread. Artinya, kode JS hanya dieksekusi sekali dalam satu waktu. 

## Asynchronous
Meskipun JS pada dasarnya synchronous, akan tetapi, JS juga bisa digunakan untuk asynchronous ketika ada beberapa proses yang perlu berjalan bersamaan tanpa mengganggu thread utama.   


## Callbacks
Callback adalah sebuah fungsi yang digunakan sebagai parameter untuk fungsi lain.

### Contoh Callbacks dengan Synchronous
```js
function hai(nama){
	console.log("Hai "+nama)
}

function cobaInput(callback){
	const nama = "Budi"

	callback(nama)
}

cobaInput(hai)
```

Di contoh ini:
- fungsi `hai` digunakan sebagai parameter pada fungsi `cobaInput`
- baris kode `callback(nama)` dijalankan secara langsung. 

Contoh callback synchronous bisa diakses di [sini](examples/js/callbacks_sync.js)

### Contoh Callbacks dengan Asynchronous
```js
function fetchData(callback) {
    setTimeout(() => {
        const data = 'Data loaded';
        callback(data); 
    }, 2000); // 
}

function displayData(data) {
    console.log(data);
}

console.log('Mulai');
fetchData(displayData);
console.log('Selesai');
```

Menurut Anda, apa hasil dari potongan kode di atas? 

Contoh callback asynchronous bisa diakses di [sini](examples/js/callbacks_async.js)

Berikutnya [Promises](Promises.md)