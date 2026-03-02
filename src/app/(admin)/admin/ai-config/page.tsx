export const metadata = { title: 'AI Insights Config — Admin' }

const INDICATORS = ['RSI (14)','MACD (12,26,9)','SMA 20/50 Trend','Bollinger %B','ADX (14)','Volume Ratio','Stochastic (14)','VWAP Deviation']
const FA_METRICS  = ['P/E Ratio','ROE','Revenue Growth','Profit Margin','D/E Ratio','EPS Growth','Dividend Yield']
const THRESHOLDS  = [
  {l:'STRONG BUY',  v:'≥ 80', c:'#22c55e'},
  {l:'BUY',         v:'≥ 65', c:'#4ade80'},
  {l:'HOLD',        v:'45–64',c:'#f59e0b'},
  {l:'SELL',        v:'30–44',c:'#f87171'},
  {l:'STRONG SELL', v:'< 30', c:'#ef4444'},
]
const TOP_STOCKS = [
  {s:'NVDA',q:4287,sc:87},{s:'AAPL',q:3891,sc:74},{s:'TSLA',q:3412,sc:71},{s:'MSFT',q:2856,sc:68},{s:'AMZN',q:2341,sc:82},
]
const WEIGHTS = [
  {l:'Technical Analysis',    v:45,c:'#3b82f6'},
  {l:'Fundamental Analysis',  v:40,c:'#a78bfa'},
  {l:'Sentiment Analysis',    v:15,c:'#22d3ee'},
]
const BUBBLE_CFG = [
  {l:'Max Signals Shown',    v:'4'},
  {l:'Show Bull/Bear Counts',v:'Enabled'},
  {l:'Show AI Verdict',      v:'Enabled'},
  {l:'Show Confidence %',    v:'Enabled'},
  {l:'Language Style',       v:'Conversational'},
]

function fmtK(n:number){ return n>=1000?(n/1000).toFixed(1)+'K':String(n) }

export default function AIConfigPage() {
  const STATS = [
    {l:'Bubbles Viewed Today',   v:'28,492',c:'#3b82f6',ch:'+18% vs yesterday'},
    {l:'Avg Engagement',         v:'4.2s',  c:'#a78bfa',ch:'Read time per bubble'},
    {l:'Most Queried Signal',    v:'RSI',   c:'#22c55e',ch:'34% of all queries'},
    {l:'User Satisfaction',      v:'91.2%', c:'#22c55e',ch:'Found helpful'},
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
        {/* Algorithm Weights */}
        <div className="adm-card">
          <div className="adm-card-header"><h3>Algorithm Weights</h3><button className="adm-btn adm-btn-ghost adm-btn-xs">Reset Defaults</button></div>
          <div className="adm-card-p">
            {WEIGHTS.map(w=>(
              <div key={w.l} style={{marginBottom:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:500}}>{w.l}</span>
                  <span className="adm-mono" style={{fontWeight:700,color:w.c}}>{w.v}%</span>
                </div>
                <div className="adm-progress" style={{height:8}}>
                  <div className="adm-progress-bar" style={{width:`${w.v}%`,background:w.c,borderRadius:4}}/>
                </div>
              </div>
            ))}
            <div style={{marginTop:20,paddingTop:16,borderTop:'1px solid rgba(255,255,255,0.05)'}}>
              <h4 style={{fontSize:13,fontWeight:600,marginBottom:12}}>Technical Indicators</h4>
              {INDICATORS.map(ind=>(
                <div key={ind} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                  <span style={{fontSize:12,color:'var(--adm-text2)'}}>{ind}</span>
                  <button className="adm-toggle on"/>
                </div>
              ))}
            </div>
            <div style={{marginTop:16,paddingTop:16,borderTop:'1px solid rgba(255,255,255,0.05)'}}>
              <h4 style={{fontSize:13,fontWeight:600,marginBottom:12}}>Fundamental Metrics</h4>
              {FA_METRICS.map(m=>(
                <div key={m} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                  <span style={{fontSize:12,color:'var(--adm-text2)'}}>{m}</span>
                  <button className="adm-toggle on"/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="adm-card adm-card-p">
            <h3 style={{fontSize:14,fontWeight:600,marginBottom:14}}>Explanation Bubble Config</h3>
            {BUBBLE_CFG.map(s=>(
              <div key={s.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                <span style={{fontSize:12,color:'var(--adm-text2)'}}>{s.l}</span>
                <span className="adm-mono" style={{fontSize:12,fontWeight:600}}>{s.v}</span>
              </div>
            ))}
            <button className="adm-btn adm-btn-primary adm-btn-sm" style={{marginTop:14}}>Save Config</button>
          </div>

          <div className="adm-card adm-card-p">
            <h3 style={{fontSize:14,fontWeight:600,marginBottom:14}}>Signal Thresholds</h3>
            {THRESHOLDS.map(s=>(
              <div key={s.l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}><span className="adm-dot" style={{background:s.c}}/><span style={{fontSize:12}}>{s.l}</span></div>
                <span className="adm-mono" style={{fontSize:12,color:s.c,fontWeight:600}}>{s.v}</span>
              </div>
            ))}
          </div>

          <div className="adm-card adm-card-p">
            <h3 style={{fontSize:14,fontWeight:600,marginBottom:14}}>Top Queried Stocks</h3>
            {TOP_STOCKS.map((s,i)=>(
              <div key={s.s} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <span className="adm-mono" style={{color:'var(--adm-text3)',fontSize:11}}>{i+1}</span>
                  <span style={{fontWeight:600}}>{s.s}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <span className="adm-mono" style={{fontSize:11,color:'var(--adm-text3)'}}>{fmtK(s.q)} queries</span>
                  <span className="adm-mono" style={{fontWeight:700,color:s.sc>=65?'#22c55e':'#f59e0b'}}>{s.sc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
