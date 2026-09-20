const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
  name: 'AOI_Frontend_Service',
  script: path.join(__dirname, 'server.js')
});

svc.on('uninstall',function(){
  console.log('Frontend service uninstalled');
});

svc.uninstall();
