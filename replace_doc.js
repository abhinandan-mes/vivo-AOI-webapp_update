const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /Doc No\. - INWJZ1-42026050500004/g,
  '<div>AOI & SPI Doc no. - INWJZ1-42026050500004</div>\n          <div>Laser Doc no. WJZD00-2021020100003</div>'
);

fs.writeFileSync(file, content, 'utf8');
console.log("Regex replaced Doc No texts.");
