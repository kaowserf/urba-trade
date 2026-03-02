export const metadata = { title: 'AI Strategies — Admin' }

const STRATS = [
  {name:'Momentum Alpha',     status:'Active',     users:1247, win:73.2, ret:18.4, signals:42, risk:'Medium', c:'#3b82f6'},
  {name:'Value Deep Scan',    status:'Active',     users:892,  win:68.9, ret:22.1, signals:18, risk:'Low',    c:'#22c55e'},
  {name:'Swing Trader Pro',   status:'Active',     users:1534, win:71.5, ret:15.7, signals:67, risk:'Medium', c:'#f59e0b'},
  {name:'Quant Neural Net',   status:'Maintenance',users:623,  win:76.8, ret:24.3, signals:0,  risk:'High',   c:'#ef4444'},
  {name:'Dividend Compounder',status:'Active',     users:412,  win:82.1, ret:12.8, signals:5,  risk:'Low',    c:'#a78bfa'},
  {name:'Sector Rotator',     status:'Active',     users:284,  win:65.4, ret:19.2, signals:12, risk:'Medium', c:'#22d3ee'},
]

function fmtK(n:number){ return n>=1000?(n/1000).toFixed(1)+'K':String(n) }

export default function AdminStrategiesPage() {
  return (
    <div>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:16}}>
        <button className="adm-btn adm-btn-primary adm-btn-sm">+ Create Strategy</button>
      </div>
      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Strategy</th><th>Status</th>
                <th style={{textAlign:'right'}}>Users</th>
                <th style={{textAlign:'right'}}>Win Rate</th>
                <th style={{textAlign:'right'}}>Avg Return</th>
                <th style={{textAlign:'right'}}>Signals Today</th>
                <th>Risk</th>
                <th style={{textAlign:'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {STRATS.map(s=>(
                <tr key={s.name}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <div style={{width:8,height:32,borderRadius:4,background:s.c}}/>
                      <span style={{fontWeight:600}}>{s.name}</span>
                    </div>
                  </td>
                  <td><span className={s.status==='Active'?'adm-badge adm-b-green':'adm-badge adm-b-amber'}>{s.status}</span></td>
                  <td style={{textAlign:'right'}} className="adm-mono">{fmtK(s.users)}</td>
                  <td style={{textAlign:'right'}}><span className="adm-mono" style={{color:'#22c55e',fontWeight:600}}>{s.win}%</span></td>
                  <td style={{textAlign:'right'}}><span className="adm-mono" style={{fontWeight:600}}>{s.ret}%</span></td>
                  <td style={{textAlign:'right'}} className="adm-mono">{s.signals}</td>
                  <td><span className={s.risk==='Low'?'adm-badge adm-b-green':s.risk==='Medium'?'adm-badge adm-b-amber':'adm-badge adm-b-red'}>{s.risk}</span></td>
                  <td style={{textAlign:'right'}}>
                    <div style={{display:'flex',gap:8,justifyContent:'flex-end',alignItems:'center'}}>
                      <button className="adm-btn adm-btn-ghost adm-btn-xs">Config</button>
                      <button className="adm-btn adm-btn-ghost adm-btn-xs">Backtest</button>
                      <button className={`adm-toggle${s.status==='Active'?' on':''}`}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
