// Variabel var, let, dan const

// Contoh var
function tesVar(flag){
	var x = 7

	if (flag){
		var x = 9
		console.log(x)
	}

	console.log(x)
}

// Contoh let
function tesLet(flag){
	let x = 7
	if (flag){
		let x = 9
		console.log(x)
	}

	console.log(x)
}

// Contoh const
function tesConst(){
	const x = 7
	
	const obj = {nama: "bejo"}
	obj.nama = "eko"
	// x = 10

	console.log(obj)
}

tesConst()