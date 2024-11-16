const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {

    let data = {
      'code': 200,
      'status': 'Ok',
      'message': 'Hello World'
    };

    res.json(data);
    res.end();
});

app.post('/kirim', (req, res) => {
    var data = {
      'code': 200,
      'status': 'Ok',
      'message': req.body
    };

    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    
    res.json(data);
    res.end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});