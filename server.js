const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = 3000;

app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const playersFilePath = path.join(__dirname, 'data', 'players.json');

// Middleware to log request methods
app.use((req, res, next) => {
  console.log(`Received ${req.method} request`);
  next();
});

app.get('/players', (req, res) => {
  fs.readFile(playersFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read players file' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/players', (req, res) => {
  fs.readFile(playersFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read players file' });
    }
    const players = JSON.parse(data);
    players.push(req.body);

    fs.writeFile(playersFilePath, JSON.stringify(players, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write to players file' });
      }
      res.status(201).json(req.body);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
