export const metadata = { title: 'Intraday Monitor — Admin' }

const INTRADAY_TRADES = [
  {t:'09:31:02',user:'Sarah C.',  sym:'NVDA',bias:'Long', entry:'$141.20',stop:'$139.80',target:'$144.50',rr:'1:2.4',strat:'Gap and Go',       conf:8,st:'Profit', pnl:'+$412'},
  {t:'09:32:18',user:'Marcus J.', sym:'TSLA',bias:'Long', entry:'$386.50',stop:'$383.00',target:'$393.50',rr:'1:2.0',strat:'Opening Breakout',  conf:7,st:'Profit', pnl:'+$280'},
  {t:'09:33:45',user:'David P.',  sym:'AMD', bias:'Short',entry:'$162.80',stop:'$164.50',target:'$159.40',rr:'1:2.0',strat:'Fade',              conf:6,st:'Stopped',pnl:'-$170'},
  {t:'09:35:22',user:'Lisa N.',   sym:'META',bias:'Long', entry:'$611.30',stop:'$607.00',target:'$619.00',rr:'1:1.8',strat:'VWAP Reclaim',      conf:7,st:'Profit', pnl:'+$231'},
  {t:'09:36:11',user:'Robert K.', sym:'AAPL',bias:'Long', entry:'$235.90',stop:'$234.20',target:'$239.30',rr:'1:2.0',strat:'Range Expansion',   conf:6,st:'Filled', pnl:'—'},
  {t:'09:38:44',user:'Aisha W.',  sym:'SQ',  bias:'Long', entry:'$84.20', stop:'$82.50', target:'$87.60', rr:'1:2.0',strat:'Gap and Go',        conf:8,st:'Profit', pnl:'+$510'},
  {t:'09:40:08',user:'Tom B.',    sym:'PLTR',bias:'Long', entry:'$78.40', stop:'$76.80', target:'$81.60', rr:'1:2.0',strat:'Premarket High Break',conf:7,st:'Filled',pnl:'—'},
  {t:'09:42:30',user:'Elena R.',  sym:'COIN',bias:'Short',entry:'$248.60',stop:'$252.00',target:'$241.80',rr:'1:2.0',strat:'Fade',              conf:5,st:'Stopped',pnl:'-$136'},
]
const STRAT_DIST = [
  {l:'Gap and Go',       c:'#22d3ee',v:'32%'},
  {l:'Opening Breakout', c:'#3b82f6',v:'24%'},
  {l:'VWAP Reclaim',     c:'#22c55e',v:'18%'},
  {l:'Range Expansion',  c:'#f59e0b',v:'14%'},
  {l:'Fade',             c:'#ef4444',v:'12%'},
]

export default function AdminIntradayPage() {
  const STATS = [
    {l:'Intraday Traders Active',v:'892',   c:'#22d3ee',ch:'Using intraday mode'},
    {l:'Setups Generated',       v:'4,460', c:'#3b82f6',ch:'Standard + Small-Cap'},
    {l:'Trades Executed',        v:'3,247', c:'#22c55e',ch:'+412 last hour'},
    {l:'Avg P&L per Trade',      v:'+$127', c:'#22c55e',ch:'Win rate: 68.4%'},
  ]
  const RISK = [
    {l:'Max Daily Risk (Standard)',         v:'5%',                      st:'Active',           c:'#22c55e'},
    {l:'Max Daily Risk (Small-Cap)',        v:'2%',                      st:'Active',           c:'#22c55e'},
    {l:'Max Simultaneous Positions',        v:'5 / 3',                   st:'Std / SmallCap',   c:'#3b82f6'},
    {l:'Position Sizing Model',             v:'Equal Risk + Vol Adjusted',st:'Hybrid',          c:'#3b82f6'},
    {l:'Hard Stop Enforcement',             v:'100%',                    st:'No Override',      c:'#22c55e'},
    {l:'Averaging Down Block',              v:'Enabled',                 st:'Small-Cap only',   c:'#22c55e'},
    {l:'Session Auto-Close',               v:'3:55 PM ET',               st:'All positions',    c:'#f59e0b'},
  ]
  const QUANT = [
    {l:'ATR Threshold (Standard)',v:'≥ 1.5% of price'},
    {l:'ATR Threshold (Small-Cap)',v:'≥ 4% of price'},
    {l:'Min RVOL',               v:'1.3x (Std) / 2.0x (SC)'},
    {l:'Momentum Probability',   v:'≥ 60%'},
    {l:'Min Gap (Small-Cap)',     v:'≥ 8%'},
    {l:'Liquidity Floor',        v:'2M shares (Std) / 500K (SC)'},
    {l:'Spread Limit (Small-Cap)',v:'< 0.5%'},
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

      <div className="adm-g23" style={{marginBottom:24}}>
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Intraday Execution Volume</h3>
            <span className="adm-badge adm-b-green"><span className="adm-pulse">●</span> Live Session</span>
          </div>
          <div className="adm-card-p">
            <svg width="100%" height="140" viewBox="0 0 560 140" preserveAspectRatio="none">
              <defs><linearGradient id="id-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3"/><stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/></linearGradient></defs>
              <polygon points="0,110 56,95 112,100 168,85 224,90 280,70 336,75 392,55 448,60 504,40 560,30 560,140 0,140" fill="url(#id-g)"/>
              <polyline points="0,110 56,95 112,100 168,85 224,90 280,70 336,75 392,55 448,60 504,40 560,30" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
              {[{l:'Avg R:R',v:'1:2.1'},{l:'Std Mode',v:'67%'},{l:'SmallCap',v:'33%'},{l:'Halt Events',v:'3'}].map(m=>(
                <div key={m.l}><p style={{fontSize:11,color:'var(--adm-text3)'}}>{m.l}</p><p style={{fontSize:15,fontWeight:700}}>{m.v}</p></div>
              ))}
            </div>
          </div>
        </div>
        <div className="adm-card">
          <div className="adm-card-header"><h3>Strategy Breakdown</h3></div>
          <div className="adm-card-p">
            <div style={{width:130,height:130,borderRadius:'50%',margin:'0 auto 16px',background:'conic-gradient(#22d3ee 0% 32%,#3b82f6 32% 56%,#22c55e 56% 74%,#f59e0b 74% 88%,#ef4444 88% 100%)',position:'relative'}}>
              <div style={{position:'absolute',inset:28,borderRadius:'50%',background:'var(--adm-bg1)'}}/>
            </div>
            {STRAT_DIST.map(p=>(
              <div key={p.l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'5px 0'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><span className="adm-dot" style={{background:p.c}}/><span style={{fontSize:12,color:'var(--adm-text2)'}}>{p.l}</span></div>
                <span className="adm-mono" style={{fontWeight:600}}>{p.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="adm-g2" style={{marginBottom:24}}>
        <div className="adm-card adm-card-p">
          <h3 style={{fontSize:14,fontWeight:600,marginBottom:14}}>Intraday Risk Controls</h3>
          {RISK.map(r=>(
            <div key={r.l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
              <span style={{fontSize:12,color:'var(--adm-text2)'}}>{r.l}</span>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <span className="adm-mono" style={{fontSize:12,fontWeight:600}}>{r.v}</span>
                <span className="adm-badge" style={{fontSize:10,background:`${r.c}20`,color:r.c,border:`1px solid ${r.c}30`}}>{r.st}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="adm-card adm-card-p">
          <h3 style={{fontSize:14,fontWeight:600,marginBottom:14}}>Quantitative Factors</h3>
          {QUANT.map(r=>(
            <div key={r.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
              <span style={{fontSize:12,color:'var(--adm-text2)'}}>{r.l}</span>
              <span className="adm-mono" style={{fontSize:12,fontWeight:600}}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Recent Intraday Trades</h3>
          <div style={{display:'flex',gap:8}}>
            <button className="adm-btn adm-btn-ghost adm-btn-xs">Pause Intraday</button>
            <button className="adm-btn adm-btn-ghost adm-btn-xs">Export Log</button>
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Time</th><th>User</th><th>Symbol</th><th>Bias</th><th>Entry</th><th>Stop</th><th>Target</th><th>R:R</th><th>Strategy</th><th>Conf</th><th>Status</th><th style={{textAlign:'right'}}>P&L</th></tr></thead>
            <tbody>
              {INTRADAY_TRADES.map((t,i)=>(
                <tr key={i}>
                  <td className="adm-mono" style={{color:'var(--adm-text3)'}}>{t.t}</td>
                  <td style={{fontWeight:500}}>{t.user}</td>
                  <td style={{fontWeight:600}}>{t.sym}</td>
                  <td><span className={t.bias==='Long'?'adm-badge adm-b-green':'adm-badge adm-b-red'}>{t.bias}</span></td>
                  <td className="adm-mono">{t.entry}</td>
                  <td className="adm-mono" style={{color:'#ef4444'}}>{t.stop}</td>
                  <td className="adm-mono" style={{color:'#22c55e'}}>{t.target}</td>
                  <td className="adm-mono">{t.rr}</td>
                  <td><span className="adm-badge adm-b-blue" style={{fontSize:10}}>{t.strat}</span></td>
                  <td><span className="adm-mono" style={{fontWeight:700,color:t.conf>=7?'#22c55e':t.conf>=5?'#f59e0b':'#ef4444'}}>{t.conf}/10</span></td>
                  <td><span className={t.st==='Profit'?'adm-badge adm-b-green':t.st==='Stopped'?'adm-badge adm-b-red':'adm-badge adm-b-amber'}>{t.st}</span></td>
                  <td className="adm-mono" style={{textAlign:'right',fontWeight:700,color:t.pnl.startsWith('+')?'#22c55e':t.pnl.startsWith('-')?'#ef4444':'var(--adm-text3)'}}>{t.pnl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
