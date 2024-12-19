const crypto = require('crypto');
const fs = require('fs')

const publicKey = fs.readFileSync('public_key.pem', 'utf8')
const privateKey = fs.readFileSync('private_key.pem', 'utf8')

function enkrip(teks){
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(teks))
    return encrypted.toString('base64')
}

function dekrip(teksTerenkripsi){
    const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(teksTerenkripsi, 'base64'))
    return decrypted.toString('utf8')
}

module.exports = {enkrip, dekrip}