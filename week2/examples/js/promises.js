let promise = new Promise((resolve, reject)=>{
	console.log('Kode ini sedang dijalankan dari dalam Promise')

	resolve('Promise Fulfilled')
})

console.log('Kode dijalankan')

promise.then(res => {
	console.log(res)
})