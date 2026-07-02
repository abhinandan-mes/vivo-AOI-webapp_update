const validateString = (val, maxLen, isRequired = false) => {
  if (val === undefined || val === null || val === '') {
    return isRequired ? 'is required' : null;
  }
  if (typeof val !== 'string') {
    return 'must be a string';
  }
  if (val.trim().length === 0 && isRequired) {
    return 'cannot be empty';
  }
  if (val.length > maxLen) {
    return `cannot exceed ${maxLen} characters`;
  }
  return null;
};

const validateDate = (val) => {
  if (!val) return 'is required';
  const d = new Date(val);
  if (isNaN(d.getTime())) {
    return 'must be a valid date';
  }
  return null;
};

const validateCreateUser = (req, res, next) => {
  const { username, password, fullName, role } = req.body;
  const errors = {};

  const userErr = validateString(username, 100, true);
  if (userErr) errors.username = userErr;
  else if (username.trim().length < 3) errors.username = 'must be at least 3 characters long';

  const passErr = validateString(password, 100, true);
  if (passErr) errors.password = passErr;
  else if (password.length < 6) errors.password = 'must be at least 6 characters long';

  const nameErr = validateString(fullName, 150, true);
  if (nameErr) errors.fullName = nameErr;

  const roleErr = validateString(role, 50, true);
  if (roleErr) errors.role = roleErr;
  else if (!['super_admin', 'admin', 'inspector', 'technician', 'operator'].includes(role.trim())) {
    errors.role = 'is invalid';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, error: 'Validation failed', validationErrors: errors });
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const { username, password, fullName, role } = req.body;
  const errors = {};

  if (username !== undefined) {
    const err = validateString(username, 100, true);
    if (err) errors.username = err;
    else if (username.trim().length < 3) errors.username = 'must be at least 3 characters long';
  }

  if (password !== undefined && password !== '') {
    const err = validateString(password, 100, true);
    if (err) errors.password = err;
    else if (password.length < 6) errors.password = 'must be at least 6 characters long';
  }

  if (fullName !== undefined) {
    const err = validateString(fullName, 150, true);
    if (err) errors.fullName = err;
  }

  if (role !== undefined) {
    const err = validateString(role, 50, true);
    if (err) errors.role = err;
    else if (!['super_admin', 'admin', 'inspector', 'technician', 'operator'].includes(role.trim())) {
      errors.role = 'is invalid';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, error: 'Validation failed', validationErrors: errors });
  }

  next();
};

const validateCheckpoint = (req, res, next) => {
  const { line, group_name, date, shift, responsible_person, time, submitted_by } = req.body;
  const errors = {};

  const lineErr = validateString(line, 50, true);
  if (lineErr) errors.line = lineErr;

  const groupErr = validateString(group_name, 100, true);
  if (groupErr) errors.group_name = groupErr;

  const dateErr = validateDate(date);
  if (dateErr) errors.date = dateErr;

  const shiftErr = validateString(shift, 50, true);
  if (shiftErr) errors.shift = shiftErr;
  else if (!['Day', 'Night'].includes(shift)) {
    errors.shift = 'must be Day or Night';
  }

  const personErr = validateString(responsible_person, 100);
  if (personErr) errors.responsible_person = personErr;

  const timeErr = validateString(time, 50);
  if (timeErr) errors.time = timeErr;

  const subByErr = validateString(submitted_by, 150);
  if (subByErr) errors.submitted_by = subByErr;

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, error: 'Validation failed', validationErrors: errors });
  }

  next();
};

const validateChecklist = (req, res, next) => {
  const {
    line,
    group_name,
    date,
    shift,
    pre_aoi_program_full_name,
    stencil_serial_no_b_side,
    stencil_serial_no_a_side,
    barcode_read_a_layer,
    barcode_read_a_spi,
    barcode_read_a_pre_aoi,
    barcode_read_b_layer,
    barcode_read_b_spi,
    barcode_read_b_pre_aoi,
    workorder_info_pre_aoi,
    workorder_info_post_aoi,
    aoi_scan_tools_workorder_traceability,
    confirmation,
    submitted_by
  } = req.body;
  const errors = {};

  const lineErr = validateString(line, 50, true);
  if (lineErr) errors.line = lineErr;

  const groupErr = validateString(group_name, 100, true);
  if (groupErr) errors.group_name = groupErr;

  const dateErr = validateDate(date);
  if (dateErr) errors.date = dateErr;

  const shiftErr = validateString(shift, 50, true);
  if (shiftErr) errors.shift = shiftErr;
  else if (!['Day', 'Night'].includes(shift)) {
    errors.shift = 'must be Day or Night';
  }

  const progErr = validateString(pre_aoi_program_full_name, 255);
  if (progErr) errors.pre_aoi_program_full_name = progErr;

  const stencilBErr = validateString(stencil_serial_no_b_side, 100);
  if (stencilBErr) errors.stencil_serial_no_b_side = stencilBErr;

  const stencilAErr = validateString(stencil_serial_no_a_side, 100);
  if (stencilAErr) errors.stencil_serial_no_a_side = stencilAErr;

  const readALErr = validateString(barcode_read_a_layer, 50);
  if (readALErr) errors.barcode_read_a_layer = readALErr;

  const readASErr = validateString(barcode_read_a_spi, 50);
  if (readASErr) errors.barcode_read_a_spi = readASErr;

  const readAPreErr = validateString(barcode_read_a_pre_aoi, 50);
  if (readAPreErr) errors.barcode_read_a_pre_aoi = readAPreErr;

  const readBLErr = validateString(barcode_read_b_layer, 50);
  if (readBLErr) errors.barcode_read_b_layer = readBLErr;

  const readBSErr = validateString(barcode_read_b_spi, 50);
  if (readBSErr) errors.barcode_read_b_spi = readBSErr;

  const readBPreErr = validateString(barcode_read_b_pre_aoi, 50);
  if (readBPreErr) errors.barcode_read_b_pre_aoi = readBPreErr;

  const woPreErr = validateString(workorder_info_pre_aoi, 255);
  if (woPreErr) errors.workorder_info_pre_aoi = woPreErr;

  const woPostErr = validateString(workorder_info_post_aoi, 255);
  if (woPostErr) errors.workorder_info_post_aoi = woPostErr;

  const traceErr = validateString(aoi_scan_tools_workorder_traceability, 255);
  if (traceErr) errors.aoi_scan_tools_workorder_traceability = traceErr;

  const isLineStop = req.body.status === 'Line Stop';

  const confErr = validateString(confirmation, 50, !isLineStop);
  if (confErr) errors.confirmation = confErr;

  const subErr = validateString(submitted_by, 150);
  if (subErr) errors.submitted_by = subErr;

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, error: 'Validation failed', validationErrors: errors });
  }

  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateCheckpoint,
  validateChecklist
};
