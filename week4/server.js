const express = require('express');

const app = express();

app.get('/', (req, res) => {

    var data = {
      'code': 200,
      'status': 'Ok',
      'message': 'Hello World'
    };

    res.json(data);
    res.end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});