const prisma = require('../config/db');

class LaserChangeover {
  static async create(data) {
    return prisma.laserChangeoverChecksheet.create({
      data
    });
  }

  static async findById(id) {
    return prisma.laserChangeoverChecksheet.findUnique({
      where: { id: parseInt(id) }
    });
  }

  static async findPendingForEngineer() {
    return prisma.laserChangeoverChecksheet.findMany({
      where: { approval_status: 'ENG_PENDING' },
      orderBy: { created_at: 'desc' }
    });
  }

  static async findPendingForGroupLeader() {
    return prisma.laserChangeoverChecksheet.findMany({
      where: { approval_status: 'GRP_LDR_PENDING' },
      orderBy: { created_at: 'desc' }
    });
  }

  static async findAllFilters(whereClause) {
    return prisma.laserChangeoverChecksheet.findMany({
      where: whereClause,
      orderBy: { created_at: 'desc' },
      take: 10000000
    });
  }

  static async update(id, data) {
    return prisma.laserChangeoverChecksheet.update({
      where: { id: parseInt(id) },
      data
    });
  }
}

module.exports = LaserChangeover;
