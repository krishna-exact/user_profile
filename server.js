// // const express = require('express');
// // const fs = require('fs');

// // const app = express();
// // const port = 3000; // Choose a port number

// // app.get('/', (req, res) => {
// //   fs.readFile('data.json', 'utf8', (error, data) => {
// //     if (error) {
// //       console.error('An error occurred while reading the file:', error.message);
// //       res.send('An error occurred.');
// //       return;
// //     }

// //     try {
// //       const jsonData = JSON.parse(data);
// //       res.send(`<pre>${JSON.stringify(jsonData, null, 2)}</pre>`);
// //     } catch (parseError) {
// //       console.error('Error parsing JSON:', parseError.message);
// //       res.send('Error parsing JSON.');
// //     }
// //   });
// // });

// // app.listen(port, () => {
// //   console.log(`Server is running at http://localhost:${port}`);
// // });



const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser'); // Import body-parser middleware


const app = express();
const port = 3000; // Choose a port number

// Replace with the actual API endpoint
const apiUrl = 'https://data.exactspace.co/exactapi/userprofiles?filter={%22where%22:{%22email%22:%22peeyushsrj@gmail.com%22}}';
const desiredKey = "email"; 
const newValue = 'peeyushsrj2@gmail.com';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Serve the HTML page
  });

// app.get('/', async (req, res) => {
// //   try {
// //     const response = await axios.get(apiUrl);
// //     const jsonData = response.data;

// //     res.send(`<pre>${JSON.stringify(jsonData, null, 2)}</pre>`);
// //   } catch (error) {
// //     console.error('An error occurred:', error.message);
// //     res.send('An error occurred.');
// //   }

// // try {
// //     const response = await axios.get(apiUrl);
// //     const jsonData = response.data[0];
// //     console.log(jsonData);
// //     // Check if the desired key exists in the JSON data
// //     if (desiredKey in jsonData) {
// //         const value = jsonData[desiredKey];
// //         res.send(`<pre>"${desiredKey}": ${JSON.stringify(value)}</pre>`);
// //       } else {
// //         res.send(`Key "${desiredKey}" not found.`);
// //       }
// //     } catch (error) {
// //       console.error('An error occurred:', error.message);
// //       res.send('An error occurred.');
// //     }

// try {
//     const response = await axios.get(apiUrl);
//     const jsonData = response.data[0];

//     // Check if the desired key exists in the JSON data
//     if (desiredKey in jsonData) {
//       // Update the value of the desired key
//       jsonData[desiredKey] = newValue;
//       console.log(jsonData);

//       // Send a POST request to the same endpoint to update the data
//       const updateResponse = await axios.post(apiUrl, jsonData);

//       if (updateResponse.status === 200) {
//         res.send('Value updated successfully.');
//       } else {
//         res.send('Failed to update value.');
//       }
//     } else {
//       res.send(`Key "${desiredKey}" not found.`);
//     }
//   } catch (error) {
//     console.error('An error occurred:', error.message);
//     res.send('An error occurred.');
//   }
// });


app.post('/update', async (req, res) => {
    try {
      const response = await axios.get(apiUrl);
      const jsonData = response.data[0];
  
      // Check if the desired key exists in the JSON data
      if (desiredKey in jsonData) {
        const newValue = req.body.newValue; // Get the new value from the form
  
        // Update the value of the desired key
        jsonData[desiredKey] = newValue;
              console.log(jsonData);

  
        // Send a POST request to the same endpoint to update the data
        const updateResponse = await axios.post(apiUrl, jsonData);
  
        if (updateResponse.status === 200) {
          res.send('Value updated successfully.');
        } else {
          res.send('Failed to update value.');
        }
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



