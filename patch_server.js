const fs = require('fs');

let content = fs.readFileSync('server/server.js', 'utf8');

if (!content.includes("const path = require('path');")) {
  content = content.replace("const express = require('express');", "const express = require('express');\nconst path = require('path');");
}

const staticCode = `
// Serve static files from React frontend
app.use(express.static(path.join(__dirname, '../client/build')));

// Catch-all route to serve React app for non-API requests (React Router support)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

async function startServer() {`;

content = content.replace('async function startServer() {', staticCode);

fs.writeFileSync('server/server.js', content, 'utf8');
console.log("Patched server.js successfully");
