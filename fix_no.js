const fs = require('fs');

function fixNo(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/value="N.*?>No<\/option>/g, 'value="No">No</option>');
  content = content.replace(/Doc N.*?-/g, 'Doc No. -');
  fs.writeFileSync(file, content, 'utf8');
}
fixNo('client/src/components/PendingModule.js');
fixNo('client/src/components/Reports.js');
console.log("Fixed No option.");
