function hai(nama){
	console.log("Hai "+nama)
}

function cobaInput(callback){
	const nama = "Budi"

	callback(nama)
}

cobaInput(hai)