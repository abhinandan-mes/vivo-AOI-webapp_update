const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
  name: 'AOI_Frontend_Service',
  description: 'AOI Digital Checksheet React Frontend (Port 3000)',
  script: path.join(__dirname, 'server.js'),
  env: [{
    name: "NODE_ENV",
    value: "production"
  }]
});

// Listen for the "install" event, which indicates the process is available as a service.
svc.on('install', function() {
  console.log('Frontend Service installed successfully!');
  svc.start();
  console.log('Frontend Service started on port 3000.');
});

svc.on('alreadyinstalled', function() {
  console.log('This service is already installed.');
  console.log('Attempting to restart it...');
  svc.restart();
});

svc.on('error', function(err) {
  console.error('Error:', err);
});

console.log('Installing AOI Frontend Service...');
svc.install();
