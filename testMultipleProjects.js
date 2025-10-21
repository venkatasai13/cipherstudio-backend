const axios = require("axios");

const BASE_URL = "http://localhost:4000/projects";

// Sample projects to test
const projects = [
  {
    projectId: "abc123",
    name: "My Project",
    files: { "index.js": "console.log('Hello World');" }
  },
  {
    projectId: "def456",
    name: "Another Project",
    files: { "app.js": "console.log('Another Project');" }
  },
  {
    projectId: "ghi789",
    name: "Test Project",
    files: { "main.js": "console.log('Test Project');" }
  }
];

async function testProjects() {
  for (const proj of projects) {
    try {
      // POST project
      const postRes = await axios.post(BASE_URL, proj);
      console.log(`POST Response for ${proj.projectId}:`, postRes.data);

      // GET project
      const getRes = await axios.get(`${BASE_URL}/${proj.projectId}`);
      console.log(`GET Response for ${proj.projectId}:`, getRes.data);
      console.log("----------------------------------------------------");
    } catch (err) {
      if (err.response) {
        console.log(`Error Response for ${proj.projectId}:`, err.response.data);
      } else {
        console.log(`Error for ${proj.projectId}:`, err.message);
      }
    }
  }
}

testProjects();
