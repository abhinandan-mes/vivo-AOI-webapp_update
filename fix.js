const fs = require('fs');
let c = fs.readFileSync('client/src/components/Reports.js', 'utf8');
const h = 
  const changeTodaySubmissions = useMemo(() => {
    return changeovers.filter(r => dateKey(r.date) === changeSummaryDate && r.shift === changeSummaryShift);
  }, [changeovers, changeSummaryDate, changeSummaryShift]);
  const changeTodayDoneLines = useMemo(() => {
    return Array.from(new Set(changeTodaySubmissions.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [changeTodaySubmissions, lineOptions]);
  const changeTodayPendingLines = useMemo(() => { return []; }, []);
  const changePendingReviewLines = useMemo(() => {
    const pending = changeTodaySubmissions.filter(r => r.approval_status === 'ENG_PENDING');
    return Array.from(new Set(pending.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [changeTodaySubmissions, lineOptions]);
  const changeApprovedLines = useMemo(() => {
    const approved = changeTodaySubmissions.filter(r => r.approval_status === 'APPROVED');
    return Array.from(new Set(approved.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [changeTodaySubmissions, lineOptions]);

  const laserTodaySubmissions = useMemo(() => {
    return laserChangeovers.filter(r => dateKey(r.date) === laserSummaryDate && r.shift === laserSummaryShift);
  }, [laserChangeovers, laserSummaryDate, laserSummaryShift]);
  const laserTodayDoneLines = useMemo(() => {
    return Array.from(new Set(laserTodaySubmissions.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [laserTodaySubmissions, lineOptions]);
  const laserTodayPendingLines = useMemo(() => { return []; }, []);
  const laserPendingReviewLines = useMemo(() => {
    const pending = laserTodaySubmissions.filter(r => r.approval_status === 'ENG_PENDING');
    return Array.from(new Set(pending.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [laserTodaySubmissions, lineOptions]);
  const laserApprovedLines = useMemo(() => {
    const approved = laserTodaySubmissions.filter(r => r.approval_status === 'APPROVED');
    return Array.from(new Set(approved.map(r => String(r.line)))).filter(l => lineOptions.includes(l));
  }, [laserTodaySubmissions, lineOptions]);
;
c = c.replace('  const updateFilter = event => {', h + '\n  const updateFilter = event => {');
fs.writeFileSync('client/src/components/Reports.js', c);
