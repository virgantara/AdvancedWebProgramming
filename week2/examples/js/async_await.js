function proses(teks){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("This code has been executed "+teks)
		},2000)
	})
}

console.log("Mulai")
proses("asynchronous").then(res => {
	console.log(res)
})
console.log("Selesai")

// Uncomment ini untuk mencoba async dan await
// async function coba(){
// 	console.log("Mulai await")
// 	const hasil = await proses("async dan await")
// 	console.log(hasil)
// 	console.log("Selesai await")
// }

// coba()