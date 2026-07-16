const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'AOI_Digital_Checksheet',
  script: 'd:\\AOi_check_sheet\\server\\server.js'
});

// Listen for the "uninstall" event
svc.on('uninstall', function() {
  console.log('Uninstall complete.');
  console.log('The service exists:', svc.exists);
});

svc.uninstall();
