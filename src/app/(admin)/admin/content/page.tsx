export const metadata = { title: 'Content & News — Admin' }

const NEWS = [
  {t:'Fed Signals Rate Cuts Coming in Q2',    s:'Reuters',    sent:'Bullish', tickers:'SPY, QQQ', pub:'2h ago'},
  {t:'NVIDIA Unveils Blackwell Ultra GPUs',   s:'Bloomberg',  sent:'Bullish', tickers:'NVDA',     pub:'4h ago'},
  {t:'Apple AI Strategy Gains Enterprise',    s:'CNBC',       sent:'Bullish', tickers:'AAPL',     pub:'5h ago'},
  {t:'China Trade Tensions Escalate',         s:'WSJ',        sent:'Bearish', tickers:'BABA, NIO',pub:'6h ago'},
  {t:'Tesla Robotaxi Exceeds Demand',         s:'TechCrunch', sent:'Bullish', tickers:'TSLA',     pub:'8h ago'},
  {t:'Biotech Rally on Drug Approvals',       s:"Barron's",   sent:'Bullish', tickers:'XBI, IBB', pub:'10h ago'},
]

export default function AdminContentPage() {
  return (
    <div>
      <div className="adm-tabs">
        {['News Articles','Blog Posts','Alerts'].map((t,i)=>(
          <button key={t} className={`adm-tab${i===0?' active':''}`}>{t}</button>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',gap:12}}>
          <select className="adm-select"><option>All Sources</option><option>Reuters</option><option>Bloomberg</option><option>CNBC</option></select>
          <select className="adm-select"><option>All Sentiment</option><option>Bullish</option><option>Bearish</option></select>
        </div>
        <button className="adm-btn adm-btn-primary adm-btn-sm">+ Publish Article</button>
      </div>
      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Title</th><th>Source</th><th>Sentiment</th><th>Tickers</th><th>Published</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
            <tbody>
              {NEWS.map((n,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:550,maxWidth:300}}>{n.t}</td>
                  <td style={{color:'var(--adm-text2)'}}>{n.s}</td>
                  <td><span className={n.sent==='Bullish'?'adm-badge adm-b-green':'adm-badge adm-b-red'}>{n.sent}</span></td>
                  <td className="adm-mono" style={{color:'var(--adm-text2)'}}>{n.tickers}</td>
                  <td style={{color:'var(--adm-text3)'}}>{n.pub}</td>
                  <td style={{textAlign:'right'}}>
                    <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                      <button className="adm-btn adm-btn-ghost adm-btn-xs">Edit</button>
                      <button className="adm-btn adm-btn-danger adm-btn-xs">Remove</button>
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
