const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');

  // We know the corrupted characters in the current HEAD from our previous grep:
  // ?3 or ?3 is ⏳
  content = content.replace(/\?3/g, '\u23F3');
  content = content.replace(/\?3/g, '\u23F3');
  
  // ?O or ?O is ❌
  content = content.replace(/\?O/g, '\u274C');
  content = content.replace(/\?O/g, '\u274C');
  
  // dYY or dYY is ✅
  content = content.replace(/dYY/g, '\u2705');
  content = content.replace(/dYY/g, '\u2705');

  // o" or o" is ✔️
  content = content.replace(/o"/g, '\u2714\uFE0F');
  content = content.replace(/o"/g, '\u2714\uFE0F');
  
  // o- or o- is ✗ (cross mark)
  content = content.replace(/o-/g, '\u2717');
  content = content.replace(/o-/g, '\u2717');

  // ?" or ?" is —
  content = content.replace(/\?"/g, '\u2014');
  content = content.replace(/\?"/g, '\u2014');
  
  // dY"? or dY" is 🔍
  content = content.replace(/dY"\?/g, '\uD83D\uDD0D');
  content = content.replace(/dY"/g, '\uD83D\uDD0D');

  // dY`? or dY` is 👀
  content = content.replace(/dY`\?/g, '\uD83D\uDC40');
  
  // o?,? is ✍️
  content = content.replace(/o\?\,\?/g, '\u270D\uFE0F');
  
  // dY"? is ⚡
  content = content.replace(/dY"\+/g, '\u26A1');

  // Re-write file
  fs.writeFileSync(file, content, 'utf8');
}

fix('client/src/components/Reports.js');
fix('client/src/components/PendingModule.js');
console.log("Replaced with unicode escapes.");
