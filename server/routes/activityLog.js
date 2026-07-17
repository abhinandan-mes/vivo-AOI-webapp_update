const express = require('express');
const prisma = require('../config/db');
const { authenticateToken, requireRoles } = require('../middleware/auth');

const router = express.Router();

// Get recent submissions for home page (descending by created_at)
router.get('/activity-logs/recent-submissions', authenticateToken, async (req, res) => {
  try {
    const logs = await prisma.appActivityLog.findMany({
      where: {
        activity_type: {
          in: ['CHECKLIST_SUBMIT', 'CHECKPOINT_SUBMIT']
        }
      },
      orderBy: { created_at: 'desc' },
      take: 10
    });

    const usernames = Array.from(new Set(logs.map(l => l.username)));
    const users = await prisma.appUser.findMany({
      where: { username: { in: usernames } },
      select: { username: true, full_name: true, email: true }
    });

    const userMap = {};
    users.forEach(u => { userMap[u.username] = u; });

    const formattedLogs = logs.map(l => {
      const u = userMap[l.username];
      return {
        ...l,
        full_name: u ? u.full_name : l.username,
        email: u ? u.email : ''
      };
    });

    res.json({ success: true, logs: formattedLogs });
  } catch (error) {
    console.error('Error fetching recent submissions:', error);
    res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
});

// Get logs (descending by created_at) with pagination
router.get('/activity-logs', authenticateToken, async (req, res) => {
  try {
    const { role, username } = req.user;
    const isAdmin = role === 'super_admin' || role === 'admin';
    const isEngineer = role === 'engineer';
    
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    // Filters
    const { user, type, startDate, endDate } = req.query;

    const queryOptions = {
      orderBy: { created_at: 'desc' },
      take: limit,
      skip: skip,
      where: {}
    };

    if (type && type !== 'ALL') {
      queryOptions.where.activity_type = type;
    }

    if (startDate || endDate) {
      queryOptions.where.created_at = {};
      if (startDate) {
        queryOptions.where.created_at.gte = new Date(startDate + 'T00:00:00.000Z');
      }
      if (endDate) {
        queryOptions.where.created_at.lte = new Date(endDate + 'T23:59:59.999Z');
      }
    }

    if (isAdmin) {
      // Admins see all logs
      if (user && user !== 'ALL') {
        queryOptions.where.username = user;
      }
    } else if (isEngineer) {
      // Engineers see activity logs of other engineers, technicians, and themselves
      const targetUsers = await prisma.appUser.findMany({
        where: {
          role: { in: ['engineer', 'technician', 'inspector'] }
        },
        select: { username: true }
      });
      const allowedUsernames = targetUsers.map(u => u.username);
      if (!allowedUsernames.includes(username)) {
        allowedUsernames.push(username);
      }
      if (user && user !== 'ALL') {
        if (allowedUsernames.includes(user)) {
          queryOptions.where.username = user;
        } else {
          // If trying to filter by a user they don't have access to, return none
          queryOptions.where.username = 'INVALID_USER';
        }
      } else {
        queryOptions.where.username = { in: allowedUsernames };
      }
    } else {
      // Others can only see their own logs
      queryOptions.where.username = username;
    }

    const totalRecords = await prisma.appActivityLog.count({ where: queryOptions.where });
    
    // Auth stats
    const authStats = await prisma.appActivityLog.groupBy({
      by: ['activity_type'],
      where: { 
        ...queryOptions.where, 
        activity_type: { in: ['LOGIN_SUCCESS', 'LOGOUT', 'LOGIN_FAILURE'] } 
      },
      _count: true
    });
    
    let totalLogins = 0, totalLogouts = 0, totalFailures = 0;
    authStats.forEach(stat => {
      if (stat.activity_type === 'LOGIN_SUCCESS') totalLogins = stat._count;
      if (stat.activity_type === 'LOGOUT') totalLogouts = stat._count;
      if (stat.activity_type === 'LOGIN_FAILURE') totalFailures = stat._count;
    });
    const logs = await prisma.appActivityLog.findMany(queryOptions);

    // Fetch corresponding user full_name and email
    const usernames = Array.from(new Set(logs.map(l => l.username)));
    const users = await prisma.appUser.findMany({
      where: { username: { in: usernames } },
      select: { username: true, full_name: true, email: true }
    });

    const userMap = {};
    users.forEach(u => {
      userMap[u.username] = u;
    });

    const formattedLogs = logs.map(l => {
      const u = userMap[l.username];
      return {
        ...l,
        full_name: u ? u.full_name : l.username,
        email: u ? u.email : ''
      };
    });

    res.json({ 
      success: true, 
      logs: formattedLogs,
      totalLogins,
      totalLogouts,
      totalFailures,
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
});

module.exports = router;
