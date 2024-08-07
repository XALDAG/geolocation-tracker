const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to receive location data
app.post('/location', (req, res) => {
    const locationData = req.body;
    console.log('Received location data:', locationData);

    // Save the data to a file (or you can use a database)
    fs.appendFile('locations.txt', JSON.stringify(locationData) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Location data received');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
