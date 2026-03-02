export const metadata = { title: 'Analytics — Admin' }

export default function AnalyticsPage() {
  const KPI = [
    { l:'Churn Rate',  v:'2.1%',  c:'#22c55e', d:'↓ 0.3% from last month' },
    { l:'DAU/MAU',     v:'38.4%', c:'#3b82f6', d:'↑ 2.1% from last month' },
    { l:'Avg Session', v:'14.2m', c:'#a78bfa', d:'↑ 1.8m from last month' },
  ]
  const MRR_M = [{l:'MRR',v:'$284K'},{l:'ARR',v:'$3.41M'},{l:'ARPU',v:'$42.30'},{l:'LTV',v:'$890'}]
  const SUB_M = [{l:'Today',v:'47'},{l:'This Week',v:'312'},{l:'This Month',v:'1,247'},{l:'Conv. Rate',v:'4.8%'}]

  return (
    <div>
      <div className="adm-tabs">
        {['Revenue','Users','Engagement','Churn'].map((t,i)=>(
          <button key={t} className={`adm-tab${i===0?' active':''}`}>{t}</button>
        ))}
      </div>

      <div className="adm-g2" style={{marginBottom:24}}>
        <div className="adm-card">
          <div className="adm-card-header"><h3>MRR Growth</h3></div>
          <div className="adm-card-p">
            <svg width="100%" height="140" viewBox="0 0 500 140" preserveAspectRatio="none">
              <defs><linearGradient id="mrr-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/><stop offset="100%" stopColor="#22c55e" stopOpacity="0"/></linearGradient></defs>
              <polygon points="0,130 50,115 100,120 150,100 200,108 250,85 300,90 350,65 400,48 450,32 500,18 500,140 0,140" fill="url(#mrr-g)"/>
              <polyline points="0,130 50,115 100,120 150,100 200,108 250,85 300,90 350,65 400,48 450,32 500,18" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
              {MRR_M.map(m=><div key={m.l}><p style={{fontSize:11,color:'var(--adm-text3)'}}>{m.l}</p><p style={{fontSize:16,fontWeight:700}}>{m.v}</p></div>)}
            </div>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-header"><h3>New Subscriptions</h3></div>
          <div className="adm-card-p">
            <svg width="100%" height="140" viewBox="0 0 480 140" preserveAspectRatio="none">
              {Array.from({length:30},(_,i)=>{const h=18+((i*37+17)%80);return <rect key={i} x={i*16} y={140-h} width={14} height={h} rx="2" fill="#3b82f6" opacity={0.3+0.7*(h/98)}/>})}
            </svg>
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
