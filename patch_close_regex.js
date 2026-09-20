const fs = require('fs');
let code = fs.readFileSync('client/src/components/Reports.js', 'utf8');
code = code.replace(
  /<\/div>\s*\{!loading && !error && \(/,
  '</div>\n        </div>\n\n        {!loading && !error && ('
);
fs.writeFileSync('client/src/components/Reports.js', code);
