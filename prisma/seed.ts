import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const adminHash = await bcrypt.hash('Admin@12345', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@urbatrade.com' },
    update: {},
    create: {
      email: 'admin@urbatrade.com',
      name: 'Admin User',
      passwordHash: adminHash,
      role: 'ADMIN',
      tier: 'ENTERPRISE',
    },
  })
  console.log('✓ Admin user:', admin.email)

  const userHash = await bcrypt.hash('User@12345', 12)
  const user = await prisma.user.upsert({
    where: { email: 'demo@urbatrade.com' },
    update: {},
    create: {
      email: 'demo@urbatrade.com',
      name: 'Demo User',
      passwordHash: userHash,
      role: 'USER',
      tier: 'PRO',
    },
  })
  console.log('✓ Demo user:', user.email)

  // Seed sample positions for demo user
  await prisma.position.upsert({
    where: { id: 'demo-pos-1' },
    update: {},
    create: {
      id: 'demo-pos-1',
      userId: user.id,
      symbol: 'AAPL',
      quantity: 100,
      avgCost: 178.50,
      currentPrice: 185.00,
    },
  })

  await prisma.position.upsert({
    where: { id: 'demo-pos-2' },
    update: {},
    create: {
      id: 'demo-pos-2',
      userId: user.id,
      symbol: 'NVDA',
      quantity: 20,
      avgCost: 750.00,
      currentPrice: 780.00,
    },
  })

  console.log('✓ Sample positions created')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
