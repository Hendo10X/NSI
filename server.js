const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Load slang data from JSON file
let slangData = [];
fs.readFile("slang.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading slang data:", err);
  } else {
    slangData = JSON.parse(data);
  }
});

// Endpoint to get all slang definitions
app.get("/api/slang", (req, res) => {
  res.json(slangData);
});

// Endpoint to get a specific slang definition by slang term
app.get("/api/slang/:term", (req, res) => {
  const term = req.params.term.toLowerCase();
  const slang = slangData.find((item) => item.slang.toLowerCase() === term);
  if (slang) {
    res.json(slang);
  } else {
    res.status(404).json({ message: "Slang term not found" });
  }
});

// Render the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(
    `Nigerian Slang Dictionary is running on http://localhost:${PORT}`
  );
});
