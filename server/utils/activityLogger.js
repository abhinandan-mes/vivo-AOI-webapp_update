const prisma = require('../config/db');
const { getCleanIp } = require('./ipHelper');

async function logActivity(activityType, username, req, details) {
  try {
    const publicIp = getCleanIp(req);
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
