const express = require('express');

const app = express();
const db = require('./db')
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());


app.get('/api/mahasiswa', (req, res) => {
	let txt = "SELECT * FROM mahasiswa"

	let params = []
	
	db.query(txt,params, function(err, hasilQuery){
		if(err){
			console.error('Oops, ada query yang error')
			res.status(500)
			res.json({'pesan' : 'Oops, ada query yang error'+err})
			res.end()
		}

		else{
			res.status(200)
			res.json(hasilQuery)
			res.end()
		}
	})
})

app.get('/api/mahasiswa/:id', (req, res) => {
	let txt = "SELECT * FROM mahasiswa WHERE id = ?"

	const id_mhs = req.params.id
	db.query(txt,[id_mhs], function(err, hasilQuery){
		if(err){
			console.error('Oops, ada query yang error')
			res.status(500)
			res.json({'pesan' : 'Oops, ada query yang error'+err})
			res.end()
		}

		else{
			res.status(200)
			res.json(hasilQuery)
			res.end()
		}
	})
})


const PORT = 1988
app.listen(PORT, ()=>{
	console.log('API is running on port: '+PORT)
})