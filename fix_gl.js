const fs = require('fs');
const file = 'client/src/components/PendingModule.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "if (action === 'disapprove' && !engineerRemarks.trim()) {\n      setConfirmModal({",
  "if (action === 'disapprove' && ((isEngineer && !engineerRemarks.trim()) || (isGroupLeader && !pdRemarks.trim()))) {\n      setConfirmModal({"
);

content = content.replace(
  "            ? '请填写工程师备注后再驳回。' \n            : 'Please enter engineer remarks before disapproving.',",
  "            ? (isGroupLeader ? '请填写组长备注后再驳回。' : '请填写工程师备注后再驳回。') \n            : (isGroupLeader ? 'Please enter PD remarks before disapproving.' : 'Please enter engineer remarks before disapproving.'),"
);

content = content.replace(
  "{isEngineer ? (\n                  <div className=\"engineer-action-buttons\">",
  "{(isEngineer || (isGroupLeader && selectedItem?.type === 'laser_changeover')) ? (\n                  <div className=\"engineer-action-buttons\">"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Group Leader buttons');
