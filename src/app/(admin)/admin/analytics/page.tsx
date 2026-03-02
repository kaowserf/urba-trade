'use client'

import { useState } from 'react'
import AdminSparkChart from '@/components/admin/AdminSparkChart'

/* ── shared data ── */
const MRR_DATA   = [218000,224000,221000,238000,235000,252000,248000,261000,258000,270000,267000,275000,272000,284520]
const MRR_LABELS = ['Feb 1','Feb 3','Feb 5','Feb 7','Feb 9','Feb 11','Feb 13','Feb 15','Feb 17','Feb 19','Feb 21','Feb 23','Feb 25','Feb 28']

const USER_DATA   = [142100,142840,143200,143950,144300,145100,145600,146200,146550,147100,147480,147900,148100,148247]
const USER_LABELS = ['Feb 1','Feb 3','Feb 5','Feb 7','Feb 9','Feb 11','Feb 13','Feb 15','Feb 17','Feb 19','Feb 21','Feb 23','Feb 25','Feb 28']

const SIGNUP_DATA   = [38,52,45,61,57,70,63,78,72,85,80,91,87,97]
const SIGNUP_LABELS = ['Feb 1','Feb 3','Feb 5','Feb 7','Feb 9','Feb 11','Feb 13','Feb 15','Feb 17','Feb 19','Feb 21','Feb 23','Feb 25','Feb 28']

const SESSION_DATA   = [12.1,13.4,12.8,14.2,13.9,15.1,14.6,15.8,15.2,16.1,15.7,16.4,15.9,14.2]
const SESSION_LABELS = ['Feb 1','Feb 3','Feb 5','Feb 7','Feb 9','Feb 11','Feb 13','Feb 15','Feb 17','Feb 19','Feb 21','Feb 23','Feb 25','Feb 28']

const CHURN_DATA   = [2.8,2.7,2.6,2.5,2.6,2.4,2.5,2.3,2.4,2.2,2.3,2.1,2.2,2.1]
const CHURN_LABELS = MRR_LABELS

/* ── tab panels ── */
function RevenueTab() {
  const MRR_M = [{l:'MRR',v:'$284K'},{l:'ARR',v:'$3.41M'},{l:'ARPU',v:'$42.30'},{l:'LTV',v:'$890'}]
  const SUB_M = [{l:'Today',v:'47'},{l:'This Week',v:'312'},{l:'This Month',v:'1,247'},{l:'Conv. Rate',v:'4.8%'}]
  const KPI = [
    { l:'Churn Rate',  v:'2.1%',  c:'#22c55e', d:'↓ 0.3% from last month' },
    { l:'DAU/MAU',     v:'38.4%', c:'#3b82f6', d:'↑ 2.1% from last month' },
    { l:'Avg Session', v:'14.2m', c:'#a78bfa', d:'↑ 1.8m from last month' },
  ]
  return (
    <div>
      <div className="adm-g2" style={{marginBottom:24}}>
        <div className="adm-card">
          <div className="adm-card-header"><h3>MRR Growth</h3></div>
          <div className="adm-card-p">
            <AdminSparkChart data={MRR_DATA} labels={MRR_LABELS} color="#22c55e" gradientId="an-mrr" height={140}/>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
              {MRR_M.map(m=><div key={m.l}><p style={{fontSize:11,color:'var(--adm-text3)'}}>{m.l}</p><p style={{fontSize:16,fontWeight:700}}>{m.v}</p></div>)}
            </div>
          </div>
        </div>
        <div className="adm-card">
          <div className="adm-card-header"><h3>New Subscriptions</h3></div>
          <div className="adm-card-p">
            <AdminSparkChart data={SIGNUP_DATA} labels={SIGNUP_LABELS} color="#3b82f6" gradientId="an-subs" height={140} formatValue={v=>String(Math.round(v))}/>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
              {SUB_M.map(m=><div key={m.l}><p style={{fontSize:11,color:'var(--adm-text3)'}}>{m.l}</p><p style={{fontSize:16,fontWeight:700}}>{m.v}</p></div>)}
            </div>
          </div>
        </div>
      </div>
      <div className="adm-g3">
        {KPI.map(s=>(
          <div key={s.l} className="adm-card adm-card-p">
            <p style={{fontSize:12,color:'var(--adm-text3)',marginBottom:8}}>{s.l}</p>
            <p style={{fontSize:'1.8rem',fontWeight:800,color:s.c}}>{s.v}</p>
            <p style={{fontSize:11,color:'var(--adm-text3)',marginTop:6}}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function UsersTab() {
  const STATS = [
    { l:'Total Users',    v:'148,247', c:'#3b82f6', d:'↑ +312 this week' },
    { l:'New Today',      v:'97',      c:'#22c55e', d:'↑ +14% vs yesterday' },
    { l:'Active (30D)',   v:'63,420',  c:'#a78bfa', d:'42.8% of total' },
    { l:'Pro + Enterprise',v:'6,317',  c:'#22d3ee', d:'4.3% paying users' },
  ]
  const FEATURE_USAGE = [
    { f:'AI Stock Picker',  pct:78, n:'116,433', c:'#3b82f6' },
    { f:'AI Scanner',       pct:61, n:'91,030',  c:'#a78bfa' },
    { f:'Intraday Scanner', pct:44, n:'65,628',  c:'#22d3ee' },
    { f:'Screener',         pct:39, n:'57,816',  c:'#22c55e' },
    { f:'Auto-Trading',     pct:23, n:'34,097',  c:'#f59e0b' },
    { f:'Backtesting',      pct:18, n:'26,684',  c:'#ef4444' },
  ]
  const GEO = [
    { country:'United States', pct:38, users:'56,334' },
    { country:'United Kingdom', pct:12, users:'17,790' },
    { country:'Canada',         pct:9,  users:'13,342' },
    { country:'Australia',      pct:7,  users:'10,377' },
    { country:'India',          pct:6,  users:'8,895'  },
    { country:'Other',          pct:28, users:'41,509' },
  ]
  return (
    <div>
      {/* Stats */}
      <div className="adm-stat-grid" style={{marginBottom:24}}>
        {STATS.map(s=>(
          <div key={s.l} className="adm-card adm-card-p">
            <p style={{fontSize:12,color:'var(--adm-text3)',marginBottom:10}}>{s.l}</p>
            <p style={{fontSize:'1.5rem',fontWeight:800}}>{s.v}</p>
            <p style={{fontSize:11,color:s.c,marginTop:6}}>{s.d}</p>
          </div>
        ))}
      </div>

      {/* User growth chart */}
      <div className="adm-card" style={{marginBottom:24}}>
        <div className="adm-card-header">
          <h3>Total User Growth</h3>
          <span className="adm-badge adm-b-green">↑ +4.3% this month</span>
        </div>
        <div className="adm-card-p">
          <AdminSparkChart data={USER_DATA} labels={USER_LABELS} color="#3b82f6" gradientId="an-users" height={160} formatValue={v=>Math.round(v).toLocaleString()}/>
        </div>
      </div>

      <div className="adm-g2" style={{marginBottom:0}}>
        {/* Feature Usage */}
        <div className="adm-card">
          <div className="adm-card-header"><h3>Feature Usage (MAU)</h3></div>
          <div className="adm-card-p">
            {FEATURE_USAGE.map(f=>(
              <div key={f.f} style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                  <span style={{fontSize:12,color:'var(--adm-text2)'}}>{f.f}</span>
                  <div style={{display:'flex',gap:12}}>
                    <span className="adm-mono" style={{fontSize:11,color:'var(--adm-text3)'}}>{f.n}</span>
                    <span className="adm-mono" style={{fontSize:12,fontWeight:600}}>{f.pct}%</span>
                  </div>
                </div>
                <div style={{height:5,background:'var(--adm-bg4)',borderRadius:3,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${f.pct}%`,background:f.c,borderRadius:3,transition:'width 0.6s ease'}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="adm-card">
          <div className="adm-card-header"><h3>Geographic Distribution</h3></div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Country</th><th style={{textAlign:'right'}}>Users</th><th style={{textAlign:'right'}}>Share</th></tr></thead>
              <tbody>
                {GEO.map(g=>(
                  <tr key={g.country}>
                    <td style={{fontWeight:500}}>{g.country}</td>
                    <td className="adm-mono" style={{textAlign:'right'}}>{g.users}</td>
                    <td style={{textAlign:'right',width:100}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'flex-end'}}>
                        <div style={{width:50,height:4,background:'var(--adm-bg4)',borderRadius:2,overflow:'hidden'}}>
                          <div style={{height:'100%',width:`${g.pct}%`,background:'#3b82f6',borderRadius:2}}/>
                        </div>
                        <span className="adm-mono" style={{fontSize:11,width:28}}>{g.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function EngagementTab() {
  const STATS = [
    { l:'Avg Session Duration', v:'14.2m', c:'#a78bfa', d:'↑ 1.8m from last month' },
    { l:'Pages / Session',      v:'6.4',   c:'#3b82f6', d:'↑ 0.7 from last month'  },
    { l:'Bounce Rate',          v:'18.3%', c:'#22c55e', d:'↓ 2.1% from last month' },
    { l:'Daily Active Users',   v:'14,726',c:'#22d3ee', d:'↑ +9.8% week-on-week'   },
  ]
  const PAGES = [
    { page:'/picker',    views:'284,520', avg:'8.4m', bounce:'12%' },
    { page:'/scanner',   views:'198,340', avg:'11.2m',bounce:'8%'  },
    { page:'/screener',  views:'167,830', avg:'6.1m', bounce:'22%' },
    { page:'/intraday',  views:'142,100', avg:'14.8m',bounce:'7%'  },
    { page:'/dashboard', views:'134,200', avg:'4.2m', bounce:'18%' },
    { page:'/strategies',views:'98,470',  avg:'9.7m', bounce:'15%' },
  ]
  return (
    <div>
      <div className="adm-stat-grid" style={{marginBottom:24}}>
        {STATS.map(s=>(
          <div key={s.l} className="adm-card adm-card-p">
            <p style={{fontSize:12,color:'var(--adm-text3)',marginBottom:10}}>{s.l}</p>
            <p style={{fontSize:'1.5rem',fontWeight:800}}>{s.v}</p>
            <p style={{fontSize:11,color:s.c,marginTop:6}}>{s.d}</p>
          </div>
        ))}
      </div>

      <div className="adm-card" style={{marginBottom:24}}>
        <div className="adm-card-header">
          <h3>Avg Session Duration (minutes)</h3>
          <span className="adm-badge adm-b-violet">+14.6% this month</span>
        </div>
        <div className="adm-card-p">
          <AdminSparkChart data={SESSION_DATA} labels={SESSION_LABELS} color="#a78bfa" gradientId="an-sess" height={140} formatValue={v=>`${v.toFixed(1)}m`}/>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-header"><h3>Top Pages by Views</h3></div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Page</th><th style={{textAlign:'right'}}>Views</th><th style={{textAlign:'right'}}>Avg Duration</th><th style={{textAlign:'right'}}>Bounce Rate</th></tr></thead>
            <tbody>
              {PAGES.map(p=>(
                <tr key={p.page}>
                  <td className="adm-mono" style={{color:'var(--adm-accent2)',fontWeight:500}}>{p.page}</td>
                  <td className="adm-mono" style={{textAlign:'right'}}>{p.views}</td>
                  <td className="adm-mono" style={{textAlign:'right',color:'var(--adm-text2)'}}>{p.avg}</td>
                  <td className="adm-mono" style={{textAlign:'right',color:parseInt(p.bounce)<15?'#22c55e':'#f59e0b'}}>{p.bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ChurnTab() {
  const STATS = [
    { l:'Current Churn Rate', v:'2.1%',   c:'#22c55e', d:'↓ 0.3% from last month'  },
    { l:'Churned This Month', v:'82',      c:'#ef4444', d:'vs 107 last month'        },
    { l:'At-Risk Users',      v:'234',     c:'#f59e0b', d:'Inactive 14+ days'        },
    { l:'Retention (90D)',    v:'91.4%',   c:'#3b82f6', d:'↑ 1.2% from last quarter' },
  ]
  const REASONS = [
    { r:'Too expensive',       pct:34, c:'#ef4444' },
    { r:'Missing features',    pct:28, c:'#f59e0b' },
    { r:'Switched competitor', pct:19, c:'#a78bfa' },
    { r:'No longer trading',   pct:12, c:'#52525b' },
    { r:'Other',               pct:7,  c:'#3b82f6' },
  ]
  const AT_RISK = [
    { name:'Tom Baker',     email:'tom.b@mail.com',      plan:'Pro',        last:'18 days ago', score:82 },
    { name:'Lisa Chen',     email:'lisa.c@yahoo.com',    plan:'Pro',        last:'21 days ago', score:78 },
    { name:'Mark Davis',    email:'m.davis@outlook.com', plan:'Enterprise', last:'15 days ago', score:71 },
    { name:'Nina Patel',    email:'nina.p@gmail.com',    plan:'Pro',        last:'24 days ago', score:65 },
    { name:'Omar Hassan',   email:'o.hassan@mail.com',   plan:'Pro',        last:'16 days ago', score:58 },
  ]
  return (
    <div>
      <div className="adm-stat-grid" style={{marginBottom:24}}>
        {STATS.map(s=>(
          <div key={s.l} className="adm-card adm-card-p">
            <p style={{fontSize:12,color:'var(--adm-text3)',marginBottom:10}}>{s.l}</p>
            <p style={{fontSize:'1.5rem',fontWeight:800}}>{s.v}</p>
            <p style={{fontSize:11,color:s.c,marginTop:6}}>{s.d}</p>
          </div>
        ))}
      </div>

      <div className="adm-card" style={{marginBottom:24}}>
        <div className="adm-card-header">
          <h3>Churn Rate Trend (%)</h3>
          <span className="adm-badge adm-b-green">Improving</span>
        </div>
        <div className="adm-card-p">
          <AdminSparkChart data={CHURN_DATA} labels={CHURN_LABELS} color="#ef4444" gradientId="an-churn" height={140} formatValue={v=>`${v.toFixed(1)}%`}/>
        </div>
      </div>

      <div className="adm-g2">
        {/* Churn Reasons */}
        <div className="adm-card">
          <div className="adm-card-header"><h3>Churn Reasons (Exit Survey)</h3></div>
          <div className="adm-card-p">
            {REASONS.map(r=>(
              <div key={r.r} style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                  <span style={{fontSize:12,color:'var(--adm-text2)'}}>{r.r}</span>
                  <span className="adm-mono" style={{fontSize:12,fontWeight:600}}>{r.pct}%</span>
                </div>
                <div style={{height:5,background:'var(--adm-bg4)',borderRadius:3,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${r.pct}%`,background:r.c,borderRadius:3}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* At-Risk Users */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>At-Risk Users</h3>
            <span className="adm-badge adm-b-amber">234 total</span>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>User</th><th>Plan</th><th>Last Active</th><th style={{textAlign:'right'}}>Risk</th></tr></thead>
              <tbody>
                {AT_RISK.map(u=>(
                  <tr key={u.email}>
                    <td>
                      <p style={{fontWeight:550,fontSize:12}}>{u.name}</p>
                      <p style={{fontSize:11,color:'var(--adm-text3)'}}>{u.email}</p>
                    </td>
                    <td><span className={u.plan==='Enterprise'?'adm-badge adm-b-blue':'adm-badge adm-b-violet'}>{u.plan}</span></td>
                    <td style={{fontSize:11,color:'var(--adm-text3)'}}>{u.last}</td>
                    <td style={{textAlign:'right'}}>
                      <span className="adm-mono" style={{fontWeight:700,fontSize:12,color:u.score>=80?'#ef4444':u.score>=65?'#f59e0b':'#22c55e'}}>{u.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const TABS = ['Revenue', 'Users', 'Engagement', 'Churn'] as const
type Tab = typeof TABS[number]

export default function AnalyticsPage() {
  const [active, setActive] = useState<Tab>('Revenue')

  return (
    <div>
      <div className="adm-tabs" style={{marginBottom:24}}>
        {TABS.map(t => (
          <button
            key={t}
            className={`adm-tab${active === t ? ' active' : ''}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {active === 'Revenue'    && <RevenueTab />}
      {active === 'Users'      && <UsersTab />}
      {active === 'Engagement' && <EngagementTab />}
      {active === 'Churn'      && <ChurnTab />}
    </div>
  )
}
