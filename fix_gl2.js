const fs = require('fs');
const file = 'client/src/components/PendingModule.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /\{\s*isEngineer\s*\?\s*\(\s*<div className="engineer-action-buttons">/g,
  "{(isEngineer || (isGroupLeader && selectedItem?.type === 'laser_changeover')) ? (\n                  <div className=\"engineer-action-buttons\">"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Group Leader buttons for real');
