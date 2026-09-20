const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');

  // Revert my accidental No. overwrite from previous fix attempts
  content = content.replace(/Doc N✅/g, 'Doc No.');
  content = content.replace(/N✔️>No/g, 'No">No');
  
  // Revert original powershell UTF-8 corruption
  content = content.replace(/â ³/g, '⏳');
  content = content.replace(/â Œ/g, '❌');
  content = content.replace(/âœ…/g, '✅');
  content = content.replace(/ðŸ—‘ï¸ /g, '🗑️');
  content = content.replace(/â€”/g, '—');
  content = content.replace(/âœ”ï¸ /g, '✔️');
  
  // Chinese text replacements (they got garbled as well like çŠ¶æ€ )
  // Wait, if I replace the emojis, the UI will work and stop failing compilation.
  // Did Chinese characters get corrupted?
  // Let's just fix the compilation errors first.
  
  fs.writeFileSync(file, content, 'utf8');
}

fix('client/src/components/Reports.js');
fix('client/src/components/PendingModule.js');
console.log("Fixed emojis");
