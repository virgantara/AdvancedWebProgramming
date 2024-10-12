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