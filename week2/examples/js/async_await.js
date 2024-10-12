function proses(){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("This code has been executed")
		},2000)
	})
}

console.log("Mulai")
proses().then(res => {
	console.log(res)
})
console.log("Selesai")