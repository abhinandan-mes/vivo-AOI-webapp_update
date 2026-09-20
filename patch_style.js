const fs = require('fs');

// 1. Remove borderLeftColor style from Home.js
let homeCode = fs.readFileSync('client/src/components/Home.js', 'utf8');
homeCode = homeCode.replace(
  'className="unified-stat-card accent-fuchsia" style={{ borderLeftColor: \'#d946ef\' }}',
  'className="unified-stat-card accent-fuchsia"'
);
fs.writeFileSync('client/src/components/Home.js', homeCode);

// 2. Add accent-fuchsia to Home.css
let homeCss = fs.readFileSync('client/src/components/Home.css', 'utf8');
if (!homeCss.includes('.unified-stat-card.accent-fuchsia::before')) {
  homeCss = homeCss.replace(
    '.unified-stat-card.accent-orange::before  { background: #f97316; }',
    '.unified-stat-card.accent-orange::before  { background: #f97316; }\n.unified-stat-card.accent-fuchsia::before { background: #d946ef; }'
  );
  fs.writeFileSync('client/src/components/Home.css', homeCss);
}

console.log("Card styling fixed");
