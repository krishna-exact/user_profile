const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { log } = require('console');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/update', async (req, res) => {
    let keyToMatch; // Declare keyToMatch here
    let valueToMatch; // Declare valueToMatch here
  try {

    keyToMatch = req.body.key; // Get the key to match from the form
    valueToMatch = req.body.value; // Get the value to match from the form
    const newValue = req.body.newValue;
    

    const apiUrl = `https://data.exactspace.co/exactapi/userprofiles?filter={%22where%22:{%22${keyToMatch}%22:%22${valueToMatch}%22}}`;
    const response = await axios.get(apiUrl);
    const jsonData = response.data[0];
    // 
    // keyToMatch in jsonData
    if ( keyToMatch in jsonData && jsonData[keyToMatch] === valueToMatch) {
      jsonData[keyToMatch] = newValue; // Update the value for the specified key

    const updateUrl = `${apiUrl}/update/${jsonData.id}`;
    const updateResponse = await axios.put(updateUrl, jsonData);

      if (updateResponse.status === 200) {
        
        // res.send(`Value updated successfully with the new email: ${newValue}`);
        const successMessage = `Value updated successfully with the new email: ${newValue}`;
        res.redirect(`/?response=${encodeURIComponent(successMessage)}&success=true`);
        return;
    } else {
        // res.send('Failed to update value.');
        const errorMessage = 'Failed to update value.';
        res.redirect(`/?response=${encodeURIComponent(errorMessage)}&success=false`);
        return;
      }
    } else {
        
        // res.send(`Key "${keyToMatch}" and value "${valueToMatch}" not found.`);
        const errorMessage = `Key "${keyToMatch}" and value "${valueToMatch}" not found.`;
        res.redirect(`/?response=${encodeURIComponent(errorMessage)}&success=false`);
        return;

    }
  } catch (error) {
    // console.error('An error occurred:', error.message);
    // // res.send(`Key "${keyToMatch}" and value "${valueToMatch}" is not found.`);
    // const errorMessage = `Key "${keyToMatch}" and value "${valueToMatch}" not found.`;
    // res.send(errorMessage);
    console.error('An error occurred:', error.message);
    const errorMessage = `Key "${keyToMatch}" and value "${valueToMatch}" not found.`;
    res.redirect(`/?response=${encodeURIComponent(errorMessage)}&success=false`);
}
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
