// Change process directory so react-scripts config finds the client folder files correctly
process.chdir('./client');

// Run react-scripts
process.argv = [process.argv[0], process.argv[1], 'start'];
require('./client/node_modules/react-scripts/bin/react-scripts.js');
