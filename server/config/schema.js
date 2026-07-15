const prisma = require('./db');
const bcrypt = require('bcryptjs');
const { execSync } = require('child_process');

async function initializeDatabase() {
  try {
    // Run prisma migrate deploy
    console.log('🔄 Running Prisma migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('✅ Prisma migrations applied successfully');

    // Seed default user
    const defaultUsername = process.env.AUTH_DEFAULT_USERNAME || 'abhinandan';
    const defaultPassword = process.env.AUTH_DEFAULT_PASSWORD || '95003989';
    const defaultName = process.env.AUTH_DEFAULT_NAME || 'Abhinandan Kumar';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    await prisma.appUser.upsert({
      where: { username: defaultUsername },
      update: {
        password_hash: passwordHash,
        full_name: defaultName,
        role: 'super_admin'
      },
      create: {
        username: defaultUsername,
        password_hash: passwordHash,
        full_name: defaultName,
        role: 'super_admin'
      }
    });

    console.log('👤 Default admin user checked/created successfully');

    // Seed line status table (idempotent)
    const lineStatusModel = require('../models/LineStatus');
    await lineStatusModel.seedLines();
    console.log('🏭 Line status table seeded successfully');
  } catch (error) {
    console.error('❌ Error during database initialization:', error);
    throw error;
  }
}

module.exports = initializeDatabase;
