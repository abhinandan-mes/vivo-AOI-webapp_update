const fs = require('fs');
let content = fs.readFileSync('client/src/components/Reports.js', 'utf8');

// Replace the two occurrences of Document No
content = content.replace(
  /<div style="font-size: 10px; font-weight: bold; color: #334155;">\s*Doc No\. - INWJZ1-42026050500004\s*<\/div>/g,
  `<div style="font-size: 10px; font-weight: bold; color: #334155; text-align: right;">
                <div>AOI & SPI Doc no. - INWJZ1-42026050500004</div>
                <div>Laser Doc no. WJZD00-2021020100003</div>
              </div>`
);
content = content.replace(
  /<div style={{ fontSize: '0\.85rem', fontWeight: 'bold', color: '#64748b', textAlign: 'right', marginTop: '6px' }}>\s*Doc No\. - INWJZ1-42026050500004\s*<\/div>/g,
  `<div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b', textAlign: 'right', marginTop: '6px' }}>
            <div>AOI & SPI Doc no. - INWJZ1-42026050500004</div>
            <div>Laser Doc no. WJZD00-2021020100003</div>
          </div>`
);

fs.writeFileSync('client/src/components/Reports.js', content, 'utf8');
