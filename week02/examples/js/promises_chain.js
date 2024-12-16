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