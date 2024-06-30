const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const DATA_FILE = './data.json';

// Endpoint to get all names
app.get('/api/names', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint to add a new name
app.post('/api/names', (req, res) => {
    const newName = req.body;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }

        const names = JSON.parse(data);
        names.push(newName);

        fs.writeFile(DATA_FILE, JSON.stringify(names, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data');
            }
            res.send(newName);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});