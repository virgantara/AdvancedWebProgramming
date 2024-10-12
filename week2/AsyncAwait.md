# Async/Await

`async` dan `await` merupakan fitur baru dari Modern JS yang memungkinkan asynchronous script berjalan seperti synchronous dan memudahkan pembacaan. Untuk implementasi ini, diperlukan sebuah fungsi `async`. Adapun `await`, syntax ini berfungsi untuk menghentikan fungsi `async` sampai ada `resolve` atau `reject`. Dengan kata lain, `await` menunggu eksekusi kode hingga tuntas. `await` hanya bisa dideklarasi di dalam fungsi `async` 

Sebagai contoh, perhatikan potongan kode berikut:
```js
function proses(){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("This code has been executed")
		},2000)
	})
}

console.log("Mulai")
proses().then(res => {
	console.log(res)
})
console.log("Selesai")
```
Contoh di atas adalah potongan fungsi asynchronous dengan Promise. Hasil dari eksekusi kode tersebut adalah:
```code
Mulai
Selesai
This code has been executed
```