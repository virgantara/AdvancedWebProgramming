const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4Dm1n_2022',
    database: 'sekolah'
});

db.connect( err => {
	if(err){
		console.error(" Koneksi database error" + err)
	}

	else{
		console.log('Koneksi database berhasil')
	}


})

module.exports = db