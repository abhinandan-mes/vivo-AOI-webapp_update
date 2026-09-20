const fs = require('fs');
const file = 'client/src/components/Reports.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/{language === 'zh' \? '\?\?\?\?' : 'Laser Changeover'}/g, "{language === 'zh' ? '镭雕换线' : 'Laser Changeover'}");
content = content.replace(/'\?\?\?\?\?\?' : '1. Program Name Confirmation'/g, "'1. 程序名称' : '1. Program Name Confirmation'");
content = content.replace(/'\?\?\?\?\?\?' : '2. Laser Parameter Confirmation'/g, "'2. 镭雕参数' : '2. Laser Parameter Confirmation'");
content = content.replace(/'\?\?\?\?\?\?\?\?\?\?' : '3. Laser Machine Duplicate Code Function'/g, "'3. 重码功能' : '3. Laser Machine Duplicate Code Function'");
content = content.replace(/'\?\?\?\?\?\?' : '4. PCB Anti-Reverse Confirmation'/g, "'4. PCB防反' : '4. PCB Anti-Reverse Confirmation'");
content = content.replace(/'\?\?\?\?\?\?\?\?' : '5. A\/B Side Barcode Consistency'/g, "'5. AB面条码' : '5. A/B Side Barcode Consistency'");
content = content.replace(/'\?\?\?\?\?\?' : '6. Laser Carving Sequence Confirmation'/g, "'6. 镭雕顺序' : '6. Laser Carving Sequence Confirmation'");
content = content.replace(/'\?\?\?\?\?\?' : '7. Laser Carving Position Confirmation'/g, "'7. 镭雕位置' : '7. Laser Carving Position Confirmation'");

content = content.replace(/A,\?"\?~A_A,A\?/g, "删除");

fs.writeFileSync(file, content, 'utf8');
