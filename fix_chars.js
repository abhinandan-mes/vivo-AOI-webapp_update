const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Common replacements for UTF-8 corruption
  // Emojis and Chinese Characters
  content = content.replace(/\?"/g, '—'); // em dash
  content = content.replace(/o\?\,\?/g, '✍️');
  content = content.replace(/dY`\?\,\?/g, '👁️');
  content = content.replace(/dY"\?/g, '🔍');
  content = content.replace(/\?3/g, '⏳');
  content = content.replace(/\?O/g, '❌');
  content = content.replace(/dYY/g, '✅');
  content = content.replace(/o\./g, '✅');
  content = content.replace(/o"/g, '✔️');
  content = content.replace(/o-/g, '✗');
  content = content.replace(/dY-\`\,\?/g, '🗑️'); // Trash can
  content = content.replace(/dY"\+/g, '⚡'); // Laser icon
  content = content.replace(/dY`\?/g, '👀');
  content = content.replace(/dYs\?/g, '🔄');

  // Some common corrupted Chinese characters from my previous regex replacements
  content = content.replace(/_\.r\,/g, '待审核');
  content = content.replace(/c3>z/g, '已驳回');
  content = content.replace(/%1\+/g, '已通过');
  content = content.replace(/o\?\?/g, '未提交');
  content = content.replace(/r"1\?\?\?/g, '修改提交');
  content = content.replace(/Yo</g, '查看');

  fs.writeFileSync(file, content, 'utf8');
}

fixFile('client/src/components/Reports.js');
fixFile('client/src/components/PendingModule.js');
console.log('Fixed corrupted characters.');
