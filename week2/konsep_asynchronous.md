# Konsep Asynchronous Programming di JavaScript (JS)

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