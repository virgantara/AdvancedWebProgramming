const crypto = require('crypto');

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(pesan) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(pesan, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return { 
        encryptedData: encrypted, 
        iv: iv.toString('hex') 
    }
}

function decrypt(pesanTerenkripsi, ivHex){
    const decipher = crypto.createDecipheriv('aes-256-cbc',key, Buffer.from(ivHex,'hex'))

    let decrypted = decipher.update(pesanTerenkripsi, 'hex','utf8')

    decrypted += decipher.final('utf8')

    return decrypted
}

module.exports = {encrypt, decrypt}