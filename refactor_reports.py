import re

with open('client/src/components/Reports.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Templates State and Fetching
imports_end = content.find('export default function Reports')
content = content[:imports_end] + content[imports_end:].replace(
    'const [engineers, setEngineers] = useState([]);',
    'const [engineers, setEngineers] = useState([]);\n  const [templates, setTemplates] = useState({});'
)

use_effect = """
  useEffect(() => {
    fetchEngineers();
    fetchTemplates();
  }, []);

  const fetchEngineers = async () => {
    try {
      const res = await apiService.getEngineers();
      setEngineers(res.data.data || []);
    } catch (err) {
      console.error('Error fetching engineers:', err);
    }
  };

  const fetchTemplates = async () => {
    try {
      const [coRes, cpRes, clRes] = await Promise.all([
        apiService.getTemplateByName('Changeover'),
        apiService.getTemplateByName('FunctionCheckpoint'),
        apiService.getTemplateByName('TechnicianChecklist')
      ]);
      setTemplates({
        Changeover: coRes.data?.data?.schema_data || [],
        FunctionCheckpoint: cpRes.data?.data?.schema_data || [],
        TechnicianChecklist: clRes.data?.data?.schema_data || []
      });
    } catch (err) {
      console.error('Error fetching templates:', err);
    }
  };
"""

content = re.sub(
    r'  useEffect\(\(\) => \{\n    fetchEngineers\(\);\n  \}, \[\]\);\n\n  const fetchEngineers = async \(\) => \{[^}]+\n      console\.error\(\'Error fetching engineers:\', err\);\n    \}\n  \};',
    use_effect.strip(),
    content
)

# 2. Dynamic Columns
dynamic_cols = """
  const checkpointColumns = useMemo(() => {
    const base = [
      [t('date'), 'date'],
      [t('line'), 'line'],
      [t('group'), 'group_name'],
      [t('shift'), 'shift'],
      [t('rep_th_status'), 'status'],
      [t('rep_th_submitted_at'), 'created_at'],
      [t('rep_th_submitted_by'), 'submitted_by'],
      [language === 'zh' ? '责任人' : 'Responsible Person', 'responsible_person'],
      [language === 'zh' ? '检测时间' : 'Check Time', 'time']
    ];
    const dynamicFields = (templates['FunctionCheckpoint'] || []).map(f => [f.label, f.id]);
    return [...base, ...dynamicFields, [language === 'zh' ? '技术员备注' : 'Remarks', 'remarks'], [t('rep_th_engineer'), 'designated_engineer_id']];
  }, [templates, t, language]);

  const checklistColumns = useMemo(() => {
    const base = [
      [t('date'), 'date'],
      [t('line'), 'line'],
      [t('group'), 'group_name'],
      [t('shift'), 'shift'],
      [t('rep_th_status'), 'status'],
      [t('rep_th_submitted_at'), 'created_at'],
      [t('rep_th_submitted_by'), 'submitted_by']
    ];
    const dynamicFields = (templates['TechnicianChecklist'] || []).map(f => [f.label, f.id]);
    return [...base, ...dynamicFields, [t('rep_th_confirmed'), 'confirmation'], [language === 'zh' ? '技术员备注' : 'Remarks', 'remarks'], [t('rep_th_engineer'), 'designated_engineer_id']];
  }, [templates, t, language]);

  const changeoverColumns = useMemo(() => {
    const base = [
      [t('date'), 'date'],
      [t('line'), 'line'],
      [t('group'), 'group_name'],
      [t('shift'), 'shift'],
      [language === 'zh' ? '换线类型' : 'Changeover Type', 'changeover_type'],
      [language === 'zh' ? '文档状态' : 'Doc Status', 'approval_status'],
      [language === 'zh' ? '机种名称' : 'Model Name', 'model_name'],
      [language === 'zh' ? '机种代码' : 'Model Code', 'model_code'],
      [language === 'zh' ? '提交人员' : 'Submitted By', 'submitted_by']
    ];
    const dynamicFields = (templates['Changeover'] || []).map(f => [f.label, f.id]);
    return [...base, ...dynamicFields, [language === 'zh' ? '备注' : 'Remarks', 'remarks'], [language === 'zh' ? '指定工程师' : 'Engineer', 'designated_engineer_id']];
  }, [templates, t, language]);
"""

content = re.sub(
    r'  const checkpointColumns = useMemo\(\(\) => \{.*?\], \[language, t\]\);',
    dynamic_cols.strip(),
    content,
    flags=re.DOTALL
)

# 3. Fix detailed columns for CSV export
content = re.sub(
    r'      const detailColumns = \[[^\]]+\];\n      return \[\.\.\.changeoverColumns, \.\.\.detailColumns\];',
    '      return changeoverColumns;',
    content
)

# 4. Refactor table body mapping to handle dynamic fields dynamically in Reports components
def replace_tr(match, colName):
    # This regex is hard so let's just do simple replacements using replace
    pass

with open('client/src/components/Reports.js', 'w', encoding='utf-8') as f:
    f.write(content)
