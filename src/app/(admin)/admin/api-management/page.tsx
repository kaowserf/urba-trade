export const metadata = { title: 'API Management — Admin' }

const USER_KEYS = [
  {user:'Sarah Chen',   polygon:'✓ Connected',webull:'✓ Connected',lastUsed:'2 min ago', calls:847,  status:'Active'},
  {user:'Marcus Johnson',polygon:'✓ Connected',webull:'—',         lastUsed:'5 min ago', calls:2341, status:'Active'},
  {user:'David Park',   polygon:'✓ Connected',webull:'✓ Connected',lastUsed:'12 min ago',calls:523,  status:'Active'},
  {user:'Robert Kim',   polygon:'✓ Connected',webull:'✓ Connected',lastUsed:'1h ago',    calls:1892, status:'Active'},
  {user:'Lisa Nguyen',  polygon:'—',           webull:'✓ Connected',lastUsed:'3h ago',    calls:156,  status:'Active'},
  {user:'Elena Rodriguez',polygon:'—',         webull:'—',          lastUsed:'Never',     calls:0,    status:'No Keys'},
  {user:'Aisha Williams',polygon:'✓ Connected',webull:'—',         lastUsed:'8h ago',    calls:298,  status:'Rate Limited'},
  {user:'Tom Baker',    polygon:'—',           webull:'—',          lastUsed:'Never',     calls:0,    status:'No Keys'},
]

function fmtK(n:number){ return n>=1000?(n/1000).toFixed(1)+'K':String(n) }

const PROVIDERS = [
  {name:'Polygon.io',    desc:'Market data — OHLCV bars, financials, news', st:'Active',users:'3,842',calls:'247K/day',c:'#22c55e'},
  {name:'Webull OpenAPI',desc:'Brokerage — trading, snapshots, positions',  st:'Active',users:'1,256',calls:'89K/day', c:'#22d3ee'},
]

export default function AdminApiManagementPage() {
  const STATS = [
    {l:'Polygon.io Users',v:'3,842',c:'#22c55e',ch:'Keys connected'},
    {l:'Webull Users',    v:'1,256',c:'#22d3ee',ch:'Brokerage linked'},
    {l:'API Calls Today', v:'336K', c:'#3b82f6',ch:'+12% vs yesterday'},
    {l:'Rate Limit Hits', v:'47',   c:'#f59e0b',ch:'0.01% of requests'},
  ]
  const RATE = [
    {p:'Polygon Free',    lim:'5 calls/min',       pct:62,c:'#22c55e'},
    {p:'Polygon Paid',    lim:'Unlimited',          pct:20,c:'#3b82f6'},
    {p:'Webull Standard', lim:'3 key resets/day',   pct:27,c:'#22d3ee'},
  ]

  return (
    <div>
      <div className="adm-stat-grid" style={{marginBottom:24}}>
        {STATS.map(s=>(
          <div key={s.l} className="adm-card adm-card-p">
            <p style={{fontSize:12,color:'var(--adm-text3)',marginBottom:8}}>{s.l}</p>
            <p style={{fontSize:'1.5rem',fontWeight:800,color:s.c}}>{s.v}</p>
            <p style={{fontSize:11,color:'var(--adm-text3)',marginTop:6}}>{s.ch}</p>
          </div>
        ))}
      </div>

      <div className="adm-g2" style={{marginBottom:24}}>
        {PROVIDERS.map(p=>(
          <div key={p.name} className="adm-card adm-card-p">
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:`${p.c}20`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.c} strokeWidth="2" strokeLinecap="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div style={{flex:1}}>
                <h3 style={{fontSize:15,fontWeight:700}}>{p.name}</h3>
                <p style={{fontSize:11,color:'var(--adm-text3)'}}>{p.desc}</p>
              </div>
              <span className="adm-badge adm-b-green">{p.st}</span>
            </div>
            <div style={{display:'flex',gap:16}}>
              {[{l:'Users',v:p.users},{l:'Calls/Day',v:p.calls}].map(s=>(
                <div key={s.l}><p style={{fontSize:10,color:'var(--adm-text3)'}}>{s.l}</p><p style={{fontSize:14,fontWeight:700}}>{s.v}</p></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="adm-card" style={{marginBottom:24}}>
        <div className="adm-card-header"><h3>User API Keys</h3><button className="adm-btn adm-btn-ghost adm-btn-xs">Export</button></div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>User</th><th>Polygon.io</th><th>Webull</th><th>Last Used</th><th style={{textAlign:'right'}}>Calls Today</th><th>Status</th></tr></thead>
            <tbody>
              {USER_KEYS.map(u=>(
                <tr key={u.user}>
                  <td style={{fontWeight:550}}>{u.user}</td>
                  <td><span className={u.polygon.includes('✓')?'adm-badge adm-b-green':'adm-badge adm-b-gray'}>{u.polygon}</span></td>
                  <td><span className={u.webull.includes('✓')?'adm-badge adm-b-blue':'adm-badge adm-b-gray'}>{u.webull}</span></td>
                  <td style={{color:'var(--adm-text3)'}}>{u.lastUsed}</td>
                  <td style={{textAlign:'right'}} className="adm-mono">{fmtK(u.calls)}</td>
                  <td><span className={u.status==='Active'?'adm-badge adm-b-green':u.status==='Rate Limited'?'adm-badge adm-b-amber':'adm-badge adm-b-gray'}>{u.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="adm-card adm-card-p">
        <h3 style={{fontSize:14,fontWeight:600,marginBottom:14}}>Rate Limit Config</h3>
        {RATE.map(r=>(
          <div key={r.p} style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
              <span style={{fontSize:12,color:'var(--adm-text2)'}}>{r.p} — <span style={{color:'var(--adm-text3)'}}>{r.lim}</span></span>
            </div>
            <div className="adm-progress"><div className="adm-progress-bar" style={{width:`${r.pct}%`,background:r.c}}/></div>
          </div>
        ))}
      </div>
    </div>
  )
}
