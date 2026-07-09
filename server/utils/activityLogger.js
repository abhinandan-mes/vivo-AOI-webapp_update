const prisma = require('../config/db');

async function logActivity(activityType, username, req, details) {
  try {
    const publicIp = req ? (req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip) : null;
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
