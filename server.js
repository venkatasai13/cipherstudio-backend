require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // optional timeout
      tls: true,                       // required for Atlas
      tlsAllowInvalidCertificates: false // recommended for production
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB connection fails
  }
}
connectDB();


// Define Project Schema
const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  name: String,
  files: Object,
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

// Get project by ID
app.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.id });
    if (project) res.json(project);
    else res.status(404).json({ error: "Project not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save or update project
app.post('/projects', async (req, res) => {
  try {
    const { projectId, name, files } = req.body;
    const project = await Project.findOneAndUpdate(
      { projectId },
      { name, files },
      { new: true, upsert: true }
    );
    res.json({ message: "✅ Project saved successfully", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
