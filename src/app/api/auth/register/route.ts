import { NextRequest } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { ok, err } from '@/lib/api/response'

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(100).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = RegisterSchema.safeParse(body)
    if (!parsed.success) return err(parsed.error.issues[0].message, 422)

    const { email, password, name } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return err('Email already registered', 409)

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, passwordHash, name, role: 'USER', tier: 'FREE' },
      select: { id: true, email: true, name: true, role: true, tier: true },
    })

    await prisma.auditLog.create({
      data: { userId: user.id, action: 'USER_REGISTERED', resource: 'auth', severity: 'INFO' },
    })

    return ok(user, 201)
  } catch (e) {
    console.error('[register]', e)
    return err('Server error', 500)
  }
}
