const crypto = require('crypto')

const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding:{
        type: 'pkcs1',
        format: 'pem'
    }
})

function enkrip(teks){
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(teks))
    return encrypted.toString('base64')
}

function dekrip(teksTerenkripsi){
    const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(teksTerenkripsi, 'base64'))
    return decrypted.toString('utf8')
}

module.exports = {enkrip, dekrip}