export const metadata = { title: 'User Management — Admin' }

const DEMO_USERS = [
  {name:'Sarah Chen',      email:'sarah.chen@gmail.com',  plan:'Enterprise',status:'Active',  mrr:99,  joined:'Jan 8, 2026',  trades:487,  avatar:'SC',color:'#3b82f6'},
  {name:'Marcus Johnson',  email:'m.johnson@outlook.com', plan:'Enterprise',status:'Active',  mrr:99,  joined:'Dec 15, 2025', trades:2341, avatar:'MJ',color:'#8b5cf6'},
  {name:'Elena Rodriguez', email:'elena.r@yahoo.com',     plan:'Free',      status:'Active',  mrr:0,   joined:'Feb 2, 2026',  trades:23,   avatar:'ER',color:'#22c55e'},
  {name:'David Park',      email:'dpark@company.io',      plan:'Pro',       status:'Active',  mrr:29,  joined:'Nov 20, 2025', trades:892,  avatar:'DP',color:'#f59e0b'},
  {name:'Aisha Williams',  email:'aisha.w@proton.me',     plan:'Pro',       status:'Active',  mrr:29,  joined:'Jan 22, 2026', trades:156,  avatar:'AW',color:'#ef4444'},
  {name:'James Mitchell',  email:'j.mitchell@mail.com',   plan:'Enterprise',status:'Past Due',mrr:99,  joined:'Oct 5, 2025',  trades:3102, avatar:'JM',color:'#06b6d4'},
  {name:'Priya Sharma',    email:'priya.s@tech.co',       plan:'Pro',       status:'Canceled',mrr:0,  joined:'Sep 12, 2025', trades:678,  avatar:'PS',color:'#a78bfa'},
  {name:'Tom Baker',       email:'tom.baker@email.com',   plan:'Free',      status:'Active',  mrr:0,   joined:'Feb 10, 2026', trades:8,    avatar:'TB',color:'#ec4899'},
  {name:'Lisa Nguyen',     email:'l.nguyen@work.com',     plan:'Pro',       status:'Active',  mrr:29,  joined:'Dec 28, 2025', trades:345,  avatar:'LN',color:'#14b8a6'},
  {name:'Robert Kim',      email:'rkim@finance.co',       plan:'Enterprise',status:'Active',  mrr:99,  joined:'Aug 30, 2025', trades:5210, avatar:'RK',color:'#f97316'},
]

async function getUsers() {
  try {
    const { prisma } = await import('@/lib/prisma')
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }, take: 50,
      select: { id:true, email:true, name:true, role:true, tier:true, createdAt:true },
    })
  } catch { return null }
}

function planBadge(p:string){ return p==='Enterprise'?'adm-badge adm-b-blue':p==='Pro'?'adm-badge adm-b-violet':'adm-badge adm-b-gray' }
function statusBadge(s:string){ return s==='Active'?'adm-badge adm-b-green':s==='Past Due'?'adm-badge adm-b-amber':'adm-badge adm-b-red' }
function fmtK(n:number){ return n>=1000?(n/1000).toFixed(1)+'K':String(n) }

export default async function AdminUsersPage() {
  const dbUsers = await getUsers()

  if (dbUsers && dbUsers.length > 0) {
    return (
      <div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div style={{display:'flex',gap:12}}>
            <div style={{position:'relative'}}>
              <input className="adm-input" placeholder="Search users..." style={{paddingLeft:34,width:260}}/>
              <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',width:16,height:16,stroke:'var(--adm-text3)',fill:'none',pointerEvents:'none'}} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>
          <button className="adm-btn adm-btn-primary adm-btn-sm">+ Add User</button>
        </div>
        <div className="adm-card">
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>User</th><th>Role</th><th>Tier</th><th>Joined</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
              <tbody>
                {dbUsers.map(u=>(
                  <tr key={u.id}>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:12}}>
                        <div className="adm-avatar" style={{background:'#3b82f6',color:'#fff'}}>{(u.name??u.email).slice(0,2).toUpperCase()}</div>
                        <div><p style={{fontWeight:550}}>{u.name??'—'}</p><p style={{fontSize:11,color:'var(--adm-text3)'}}>{u.email}</p></div>
                      </div>
                    </td>
                    <td><span className={u.role==='ADMIN'?'adm-badge adm-b-blue':'adm-badge adm-b-gray'}>{u.role}</span></td>
                    <td><span className={u.tier==='ENTERPRISE'?'adm-badge adm-b-blue':u.tier==='PRO'?'adm-badge adm-b-violet':'adm-badge adm-b-gray'}>{u.tier}</span></td>
                    <td style={{color:'var(--adm-text3)'}}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td style={{textAlign:'right'}}><div style={{display:'flex',gap:8,justifyContent:'flex-end'}}><button className="adm-btn adm-btn-ghost adm-btn-xs">Edit</button><button className="adm-btn adm-btn-danger adm-btn-xs">Suspend</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:16,color:'var(--adm-text3)',fontSize:12}}>
          <span>Showing 1–{dbUsers.length} users</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',gap:12}}>
          <div style={{position:'relative'}}>
            <input className="adm-input" placeholder="Search users..." style={{paddingLeft:34,width:260}}/>
            <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',width:16,height:16,stroke:'var(--adm-text3)',fill:'none',pointerEvents:'none'}} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <select className="adm-select"><option>All Plans</option><option>Free</option><option>Pro</option><option>Enterprise</option></select>
          <select className="adm-select"><option>All Status</option><option>Active</option><option>Past Due</option><option>Canceled</option></select>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm">+ Add User</button>
      </div>

      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>User</th><th>Plan</th><th>Status</th><th>MRR</th><th style={{textAlign:'right'}}>Trades</th><th>Joined</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
            <tbody>
              {DEMO_USERS.map(u=>(
                <tr key={u.email}>
                  <td><div style={{display:'flex',alignItems:'center',gap:12}}><div className="adm-avatar" style={{background:u.color,color:'#fff'}}>{u.avatar}</div><div><p style={{fontWeight:550}}>{u.name}</p><p style={{fontSize:11,color:'var(--adm-text3)'}}>{u.email}</p></div></div></td>
                  <td><span className={planBadge(u.plan)}>{u.plan}</span></td>
                  <td><span className={statusBadge(u.status)}>{u.status}</span></td>
                  <td className="adm-mono">${u.mrr}</td>
                  <td style={{textAlign:'right'}} className="adm-mono">{fmtK(u.trades)}</td>
                  <td style={{color:'var(--adm-text3)'}}>{u.joined}</td>
                  <td style={{textAlign:'right'}}><div style={{display:'flex',gap:8,justifyContent:'flex-end'}}><button className="adm-btn adm-btn-ghost adm-btn-xs">Edit</button><button className="adm-btn adm-btn-danger adm-btn-xs">Suspend</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:16,color:'var(--adm-text3)',fontSize:12}}>
        <span>Showing 1–10 of 14,847 users</span>
        <div style={{display:'flex',gap:8}}>
          <button className="adm-btn adm-btn-ghost adm-btn-xs">← Prev</button>
          <button className="adm-btn adm-btn-primary adm-btn-xs">1</button>
          <button className="adm-btn adm-btn-ghost adm-btn-xs">2</button>
          <button className="adm-btn adm-btn-ghost adm-btn-xs">3</button>
          <button className="adm-btn adm-btn-ghost adm-btn-xs">Next →</button>
        </div>
      </div>
    </div>
  )
}
