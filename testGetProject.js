const axios = require('axios');

const projectId = 'abc123'; // change if needed
const BASE_URL = 'http://localhost:4000';

async function getProject() {
  try {
    const res = await axios.get(`${BASE_URL}/projects/${projectId}`);
    console.log('GET Response:', res.data);
  } catch (err) {
    if (err.response) {
      // Server responded with a status code outside 2xx
      console.error('GET Error Response:', err.response.status, err.response.data);
    } else if (err.request) {
      // Request was made but no response received
      console.error('GET No Response:', err.request);
    } else {
      // Other errors
      console.error('GET Error:', err.message);
    }
  }
}

getProject();
