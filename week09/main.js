const {encrypt, decrypt} = require('./enkripsi_aes.js')

const teks = "Assalamualaikum"
const encrypted = encrypt(teks)

console.log("Pesan terenkripsi:", encrypted.encryptedData)

const pesanDekripsi = decrypt(encrypted.encryptedData, encrypted.iv)
console.log("Pesan asli:", pesanDekripsi)