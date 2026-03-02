export const metadata = { title: 'Signals & Models — Admin' }

const RECENT_SIGNALS = [
  {t:'14:32',sym:'NVDA',sig:'STRONG BUY',sc:96,conf:92,strat:'Momentum Alpha', st:'Sent'},
  {t:'14:28',sym:'AAPL',sig:'BUY',       sc:92,conf:87,strat:'Value Deep Scan', st:'Sent'},
  {t:'14:15',sym:'META',sig:'HOLD',      sc:82,conf:78,strat:'Swing Trader',     st:'Sent'},
  {t:'14:02',sym:'TSLA',sig:'HOLD',      sc:74,conf:71,strat:'Quant Neural',     st:'Pending'},
  {t:'13:48',sym:'JPM', sig:'BUY',       sc:87,conf:84,strat:'Sector Rotator',   st:'Sent'},
]
const DIST = [
  {l:'STRONG BUY', v:142,pct:11,c:'#22c55e'},
  {l:'BUY',        v:387,pct:31,c:'#4ade80'},
  {l:'HOLD',       v:512,pct:41,c:'#f59e0b'},
  {l:'SELL',       v:168,pct:13,c:'#f87171'},
  {l:'STRONG SELL',v:38, pct:3, c:'#ef4444'},
]

export default function SignalsPage() {
  const STATS = [
    {l:'Signals Today',        v:'1,247',  c:'#3b82f6'},
    {l:'Model Accuracy (30D)', v:'76.8%',  c:'#22c55e'},
    {l:'Avg Confidence',       v:'82.3%',  c:'#a78bfa'},
    {l:'Model Version',        v:'v3.2.1', c:'#22d3ee'},
  ]
  return (
    <div>
      <div className="adm-stat-grid" style={{marginBottom:24}}>
        {STATS.map(s=>(
          <div key={s.l} className="adm-card adm-card-p">
            <p style={{fontSize:12,color:'var(--adm-text3)',marginBottom:8}}>{s.l}</p>
            <p style={{fontSize:'1.5rem',fontWeight:800,color:s.c}}>{s.v}</p>
          </div>
        ))}
      </div>
      <div className="adm-g23" style={{marginBottom:24}}>
        <div className="adm-card">
          <div className="adm-card-header"><h3>Model Performance</h3></div>
          <div className="adm-card-p">
            <svg width="100%" height="140" viewBox="0 0 560 140" preserveAspectRatio="none">
              <defs><linearGradient id="mod-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/><stop offset="100%" stopColor="#22c55e" stopOpacity="0"/></linearGradient></defs>
              <polygon points="0,80 56,75 112,78 168,70 224,72 280,65 336,68 392,60 448,55 504,50 560,45 560,140 0,140" fill="url(#mod-g)"/>
              <polyline points="0,80 56,75 112,78 168,70 224,72 280,65 336,68 392,60 448,55 504,50 560,45" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
              {[{l:'Precision',v:'0.81'},{l:'Recall',v:'0.74'},{l:'F1 Score',v:'0.77'},{l:'Sharpe',v:'1.82'}].map(m=>(
                <div key={m.l}><p style={{fontSize:11,color:'var(--adm-text3)'}}>{m.l}</p><p style={{fontSize:16,fontWeight:700}}>{m.v}</p></div>
              ))}
            </div>
          </div>
        </div>
        <div className="adm-card">
          <div className="adm-card-header"><h3>Signal Distribution</h3></div>
          <div className="adm-card-p">
            {DIST.map(s=>(
              <div key={s.l} style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:12,color:'var(--adm-text2)'}}>{s.l}</span>
                  <span className="adm-mono" style={{fontSize:12}}>{s.v} ({s.pct}%)</span>
                </div>
                <div className="adm-progress"><div className="adm-progress-bar" style={{width:`${s.pct}%`,background:s.c}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="adm-card">
        <div className="adm-card-header"><h3>Recent Signals</h3><button className="adm-btn adm-btn-ghost adm-btn-xs">Export CSV</button></div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Time</th><th>Symbol</th><th>Signal</th><th>AI Score</th><th>Confidence</th><th>Strategy</th><th>Status</th></tr></thead>
            <tbody>
              {RECENT_SIGNALS.map(s=>(
                <tr key={`${s.t}-${s.sym}`}>
                  <td className="adm-mono" style={{color:'var(--adm-text3)'}}>{s.t}</td>
                  <td style={{fontWeight:600}}>{s.sym}</td>
                  <td><span className={s.sig.includes('BUY')?'adm-badge adm-b-green':s.sig==='HOLD'?'adm-badge adm-b-amber':'adm-badge adm-b-red'}>{s.sig}</span></td>
                  <td className="adm-mono" style={{fontWeight:600}}>{s.sc}</td>
                  <td className="adm-mono">{s.conf}%</td>
                  <td style={{color:'var(--adm-text2)'}}>{s.strat}</td>
                  <td><span className={s.st==='Sent'?'adm-badge adm-b-blue':'adm-badge adm-b-amber'}>{s.st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
