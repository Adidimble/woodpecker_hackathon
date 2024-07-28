const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/results', (req, res) => {
    fs.readFile('results.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading results file:', err);
            res.status(500).send('Error reading results file');
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            console.error('Error parsing JSON data:', parseErr);
            res.status(500).send('Error parsing JSON data');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
