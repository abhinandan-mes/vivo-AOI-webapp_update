const os = require('os');

function getLocalIPv4() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

function getCleanIp(req) {
  if (!req) return null;
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || 'unknown';
  if (typeof ip === 'string') {
    // Handle multiple IPs in x-forwarded-for
    if (ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }
    if (ip.startsWith('::ffff:')) {
      ip = ip.substring(7);
    }
    // If it is IPv6 loopback or IPv4 loopback, replace with actual LAN IP
    if (ip === '::1' || ip === '127.0.0.1') {
      ip = getLocalIPv4();
    }
    // Strip port if present in IPv4
    if (ip.includes('.') && ip.includes(':')) {
      ip = ip.split(':')[0];
    }
    // Handle IPv6 enclosed in brackets
    if (ip.startsWith('[') && ip.includes(']')) {
      ip = ip.substring(1, ip.indexOf(']'));
    }
  }
  return ip;
}

module.exports = { getCleanIp, getLocalIPv4 };
