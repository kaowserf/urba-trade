export const metadata = { title: 'Auto-Trading Monitor — Admin' }

const TRADES = [
  {t:'14:32:08',user:'Sarah C.',  sym:'NVDA', act:'BUY', sh:25, pr:142.30,sc:87,sig:'STRONG BUY',st:'Executed'},
  {t:'14:30:22',user:'Marcus J.', sym:'AAPL', act:'BUY', sh:50, pr:236.80,sc:74,sig:'BUY',       st:'Executed'},
  {t:'14:28:45',user:'David P.',  sym:'META', act:'SELL',sh:30, pr:612.10,sc:38,sig:'SELL',      st:'Executed'},
  {t:'14:25:11',user:'Robert K.', sym:'TSLA', act:'BUY', sh:15, pr:387.50,sc:71,sig:'BUY',       st:'Executed'},
  {t:'14:22:33',user:'Lisa N.',   sym:'MSFT', act:'BUY', sh:20, pr:431.20,sc:68,sig:'BUY',       st:'Pending'},
  {t:'14:18:09',user:'Sarah C.',  sym:'AMZN', act:'BUY', sh:10, pr:226.40,sc:82,sig:'STRONG BUY',st:'Executed'},
  {t:'14:15:41',user:'Marcus J.', sym:'JPM',  act:'SELL',sh:40, pr:251.80,sc:42,sig:'HOLD',      st:'Rejected'},
  {t:'14:12:18',user:'David P.',  sym:'GOOGL',act:'BUY', sh:35, pr:191.60,sc:65,sig:'BUY',       st:'Executed'},
]
const MODE_DIST = [
  {l:'Manual',      c:'#52525b',v:'18%'},
  {l:'Conservative',c:'#22c55e',v:'27%'},
  {l:'Balanced',    c:'#3b82f6',v:'38%'},
  {l:'Aggressive',  c:'#f59e0b',v:'17%'},
]

export default function AutoTradingPage() {
  const STATS = [
    {l:'Auto-Traders Active',v:'1,847',c:'#22c55e',ch:'Live now'},
    {l:'Trades Today',       v:'12,458',c:'#3b82f6',ch:'+847 last hour'},
    {l:'Total Volume',       v:'$4.2M', c:'#a78bfa',ch:'Across all users'},
    {l:'Success Rate',       v:'94.7%', c:'#22c55e',ch:'5.3% rejected/failed'},
  ]
  const AVG = [{l:'Avg Trade',v:'$342'},{l:'Avg Score',v:'72.4'},{l:'Buy/Sell',v:'68/32%'},{l:'Avg Conf.',v:'81%'}]

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
            <h3>Auto-Trade Volume</h3>
            <span className="adm-badge adm-b-green"><span className="adm-pulse">●</span> Live</span>
          </div>
          <div className="adm-card-p">
            <svg width="100%" height="140" viewBox="0 0 560 140" preserveAspectRatio="none">
              <defs><linearGradient id="at-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3"/><stop offset="100%" stopColor="#1d4ed8" stopOpacity="0"/></linearGradient></defs>
              <polygon points="0,100 56,90 112,95 168,80 224,85 280,65 336,70 392,50 448,55 504,35 560,25 560,140 0,140" fill="url(#at-g)"/>
              <polyline points="0,100 56,90 112,95 168,80 224,85 280,65 336,70 392,50 448,55 504,35 560,25" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
              {AVG.map(m=><div key={m.l}><p style={{fontSize:11,color:'var(--adm-text3)'}}>{m.l}</p><p style={{fontSize:15,fontWeight:700}}>{m.v}</p></div>)}
            </div>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-header"><h3>Mode Distribution</h3></div>
          <div className="adm-card-p">
            <div style={{width:130,height:130,borderRadius:'50%',margin:'0 auto 16px',background:'conic-gradient(#3b82f6 0% 38%,#22c55e 38% 65%,#f59e0b 65% 82%,#52525b 82% 100%)',position:'relative'}}>
              <div style={{position:'absolute',inset:28,borderRadius:'50%',background:'var(--adm-bg1)'}}/>
            </div>
            {MODE_DIST.map(p=>(
              <div key={p.l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'5px 0'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><span className="adm-dot" style={{background:p.c}}/><span style={{fontSize:12,color:'var(--adm-text2)'}}>{p.l}</span></div>
                <span className="adm-mono" style={{fontWeight:600}}>{p.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card-header">
          <h3>Recent Auto-Trades</h3>
          <div style={{display:'flex',gap:8}}>
            <button className="adm-btn adm-btn-ghost adm-btn-xs">Pause All</button>
            <button className="adm-btn adm-btn-ghost adm-btn-xs">Export</button>
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Time</th><th>User</th><th>Symbol</th><th>Action</th><th style={{textAlign:'right'}}>Shares</th><th style={{textAlign:'right'}}>Price</th><th style={{textAlign:'right'}}>AI Score</th><th>Signal</th><th>Status</th></tr></thead>
            <tbody>
              {TRADES.map((t,i)=>(
                <tr key={i}>
                  <td className="adm-mono" style={{color:'var(--adm-text3)'}}>{t.t}</td>
                  <td style={{fontWeight:500}}>{t.user}</td>
                  <td style={{fontWeight:600}}>{t.sym}</td>
                  <td><span className={t.act==='BUY'?'adm-badge adm-b-green':'adm-badge adm-b-red'}>{t.act}</span></td>
                  <td style={{textAlign:'right'}} className="adm-mono">{t.sh}</td>
                  <td style={{textAlign:'right'}} className="adm-mono">${t.pr.toFixed(2)}</td>
                  <td style={{textAlign:'right'}}><span className="adm-mono" style={{color:t.sc>=65?'#22c55e':t.sc>=45?'#f59e0b':'#ef4444',fontWeight:700}}>{t.sc}</span></td>
                  <td><span className={t.sig.includes('BUY')?'adm-badge adm-b-green':t.sig==='HOLD'?'adm-badge adm-b-amber':'adm-badge adm-b-red'} style={{fontSize:10}}>{t.sig}</span></td>
                  <td><span className={t.st==='Executed'?'adm-badge adm-b-green':t.st==='Pending'?'adm-badge adm-b-amber':'adm-badge adm-b-red'}>{t.st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
