const axios = require('axios');
const fs = require('fs');

// Command line arguments
const [millenniumFalconFile, empireFile] = process.argv.slice(2);

// Check if both file paths are provided
if (!millenniumFalconFile || !empireFile) {
  console.error('Usage: node script.js <millenniumFalconFile> <empireFile>');
  process.exit(1);
}

// Read JSON files
const millenniumFalconData = JSON.parse(fs.readFileSync(millenniumFalconFile, 'utf8'));
const empireData = JSON.parse(fs.readFileSync(empireFile, 'utf8'));

// Prepare the payload for the API request
const payload = {
  empire: empireData,
  millenium: millenniumFalconData,
};

// Make a POST request to the API
axios
.patch('http://localhost:3000/calculate-probability-with-millenium-config', payload)
.then((response) => {
  const probability = response.data;
  console.log(probability);
})
.catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});