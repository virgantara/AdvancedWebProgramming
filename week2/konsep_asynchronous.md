# Konsep Asynchronous Programming di JavaScript (JS)

## Synchronous
JS pada dasarnya adalah single-thread. Artinya, kode JS hanya dieksekusi sekali dalam satu waktu. 

## Asynchronous
Meskipun JS pada dasarnya synchronous, akan tetapi, JS juga bisa digunakan untuk asynchronous ketika ada beberapa proses yang perlu berjalan bersamaan tanpa mengganggu thread utama.   

```js
console.log("Mulai")

setTimeout(() => {
	console.log("Hai gaes")
}, 2000)
console.log("Selesai")
```

Menurut Anda, apa hasil ```console.log``` dari potongan kode di atas? 


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
- fungsi ``hai`` digunakan sebagai parameter pada fungsi ``cobaInput``
- baris kode `callback(nama)` dijalankan secara langsung. 


## Promises

