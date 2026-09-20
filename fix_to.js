const fs = require('fs');

function fixTo(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/name="t.*?\s+value/g, 'name="to" value');
  content = content.replace(/type="radi.*?\s+value/g, 'type="radio" value');
  fs.writeFileSync(file, content, 'utf8');
}
fixTo('client/src/components/Reports.js');
fixTo('client/src/components/PendingModule.js');
console.log("Fixed to option.");
