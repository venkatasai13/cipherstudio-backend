const axios = require('axios');

const BASE_URL = 'http://localhost:4000';
const projectData = {
  projectId: 'abc123',  // change if needed
  name: 'My Project',
  files: {
    'index.js': "console.log('Hello World');"
  }
};

async function saveProject() {
  try {
    const res = await axios.post(`${BASE_URL}/projects`, projectData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('POST Response:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('POST Error Response:', err.response.status, err.response.data);
    } else if (err.request) {
      console.error('POST No Response:', err.request);
    } else {
      console.error('POST Error:', err.message);
    }
  }
}

async function getProject() {
  try {
    const res = await axios.get(`${BASE_URL}/projects/${projectData.projectId}`);
    console.log('GET Response:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('GET Error Response:', err.response.status, err.response.data);
    } else if (err.request) {
      console.error('GET No Response:', err.request);
    } else {
      console.error('GET Error:', err.message);
    }
  }
}

async function test() {
  await saveProject();
  await getProject();
}

test();
