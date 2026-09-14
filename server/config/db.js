const { PrismaClient } = require('../prisma/generated/client');
require('dotenv').config();

const prisma = new PrismaClient();

module.exports = prisma;
