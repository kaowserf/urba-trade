export const metadata = { title: 'User Management' }
async function getUsers() {
  try {
    const { prisma } = await import('@/lib/prisma')
    return await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 50, select: { id: true, email: true, name: true, role: true, tier: true, createdAt: true } })
  } catch { return [] }
}
export default async function AdminUsersPage() {
  const users = await getUsers()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#f1f5f9]">User Management</h1>
      <div className="card overflow-hidden">
        <table className="table-base">
          <thead><tr><th>Email</th><th>Name</th><th>Role</th><th>Tier</th><th>Joined</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="text-[#00d4ff]">{u.email}</td>
                <td className="text-[#94a3b8]">{u.name ?? '—'}</td>
                <td><span className={`text-xs font-medium ${u.role === 'ADMIN' ? 'text-[#a855f7]' : 'text-[#94a3b8]'}`}>{u.role}</span></td>
                <td><span className={`text-xs font-medium ${u.tier === 'ENTERPRISE' ? 'text-[#a855f7]' : u.tier === 'PRO' ? 'text-[#00d4ff]' : 'text-[#94a3b8]'}`}>{u.tier}</span></td>
                <td className="text-xs text-[#475569]">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={5} className="text-center text-[#475569] py-8">No users yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
