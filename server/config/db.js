const { PrismaClient } = require('../prisma/generated/client2');
require('dotenv').config();

const prisma = new PrismaClient();

module.exports = prisma;
