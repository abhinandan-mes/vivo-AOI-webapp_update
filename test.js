const fs = require('fs'); const txt = fs.readFileSync('client/build/static/js/main.a829df96.js', 'utf8'); console.log('Index:', txt.indexOf('\u00C3'));
