# Konsep Asynchronous Programming di JavaScript

JavaScript (JS) pada dasarnya adalah single-thread. Artinya, kode JS hanya dieksekusi sekali dalam satu waktu. Tetapi, JS bisa digunakan untuk asynchronous ketika ada beberapa proses yang perlu berjalan bersamaan tanpa mengganggu thread utama.   

```js
console.log("Mulai")

setTimeout(() => {
	console.log("Hai gaes")
}, 2000)
console.log("Selesai")
```

Menurut Anda, apa hasil ```console.log``` dari potongan kode di atas? 