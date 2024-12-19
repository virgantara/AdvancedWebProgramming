const {enkrip, dekrip} = require('./enkripsi_rsa_openssl.js')

const teks = "Assalamualaikum"
const encrypted = enkrip(teks)

console.log("Pesan terenkripsi:", encrypted)

const pesanDekripsi = dekrip(encrypted)
console.log("Pesan asli:", pesanDekripsi)