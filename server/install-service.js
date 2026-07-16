const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'AOI_Digital_Checksheet',
  description: 'Vivo AOI Digital Checksheet App Service',
  script: 'd:\\AOi_check_sheet\\server\\server.js',
  env: [{
    name: "NODE_ENV",
    value: "production"
  }]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
  console.log('Service installation complete. Starting service...');
  svc.start();
});

svc.on('alreadyinstalled', function() {
  console.log('Service is already installed.');
});

svc.on('start', function() {
  console.log('Service started successfully!');
});

svc.install();
