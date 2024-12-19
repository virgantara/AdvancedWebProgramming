const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [
    { username: 'oddy', password: '$2b$10$IuwG2gFTCWUbfc9vSPcm3OxmrG0Qc9PvMX7o2DjReUi7fj5/tFCN.', role: 'admin' }, 
];

app.get('/nilaiku', (req, res){
    
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) 
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });

    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) 
        return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ 
        username: user.username, 
        role: user.role }, 
        'bismillah', 
        { expiresIn: '1h' }
    );
    res.json({ token });
});

const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Server sedang berjalan di port: "+PORT)
})