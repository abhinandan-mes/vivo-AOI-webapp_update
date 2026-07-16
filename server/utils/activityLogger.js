const prisma = require('../config/db');

const cleanIp = (ip) => {
  if (!ip) return null;
  let cleaned = ip;
  if (cleaned.startsWith('::ffff:')) {
    cleaned = cleaned.substring(7);
  }
  if (cleaned.includes('.') && cleaned.includes(':')) {
    cleaned = cleaned.split(':')[0];
  }
  if (cleaned.startsWith('[') && cleaned.includes(']')) {
    cleaned = cleaned.substring(1, cleaned.indexOf(']'));
  }
  return cleaned;
};

async function logActivity(activityType, username, req, details) {
  try {
    let publicIp = req ? (req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip) : null;
    publicIp = cleanIp(publicIp);
    await prisma.appActivityLog.create({
      data: {
        activity_type: activityType,
        username: username || 'Unknown',
        public_ip: publicIp,
        details: details || null
      }
    });
  } catch (error) {
    console.error('Failed to write activity log:', error);
  }
}

module.exports = { logActivity };
