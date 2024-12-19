const {enkrip, dekrip} = require('./enkripsi_rsa.js')

const teks = "Assalamualaikum"
const encrypted = enkrip(teks)

console.log("Pesan terenkripsi:", encrypted)

const pesanDekripsi = dekrip(encrypted)
console.log("Pesan asli:", pesanDekripsi)