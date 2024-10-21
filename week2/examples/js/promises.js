let p = new Promise((responOke, responGagal) => {
	responOke("Promise sudah oke")
})

p.then(res => {
	console.log("Log oke")
	console.log(res)
}).catch(errornyaapa => {
	console.log("Log tidak oke")
	console.log(errornyaapa)
})