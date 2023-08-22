const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Choose a port number

// Replace with the actual API endpoint
const apiUrl = 'https://data.exactspace.co/exactapi/userprofiles?filter={%22where%22:{%22email%22:%22peeyushsrj@gmail.com%22}}';

const desiredKey = 'email'; // Replace with the key you're looking for

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    const jsonData = response.data;

    // Check if the desired key exists in the JSON data
    if (jsonData.hasOwnProperty(desiredKey)) {
      const value = jsonData[desiredKey];
      res.send(`<pre>Value of "${desiredKey}": ${JSON.stringify(value)}</pre>`);
    } else {
      res.send(`Key "${desiredKey}" not found.`);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    res.send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
