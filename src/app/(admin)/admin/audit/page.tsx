export const metadata = { title: 'Audit Logs — Admin' }

const LOGS = [
  {time:'14:32:08',user:'admin@urbatrade.com',action:'Updated strategy config',    target:'Momentum Alpha',          level:'info'},
  {time:'14:28:45',user:'system',             action:'AI model retrained',         target:'stock_scorer_v3.2',       level:'success'},
  {time:'14:15:22',user:'admin@urbatrade.com',action:'Suspended user account',     target:'spam_user_42@temp.com',   level:'warning'},
  {time:'13:58:10',user:'system',             action:'Database backup completed',  target:'prod-db-primary',         level:'success'},
  {time:'13:42:33',user:'system',             action:'Rate limit triggered',       target:'API /v1/signals',         level:'warning'},
  {time:'13:30:00',user:'cron',               action:'Market data sync completed', target:'8,247 symbols updated',   level:'info'},
  {time:'13:12:18',user:'admin@urbatrade.com',action:'Published news article',     target:'Fed Rate Decision Analysis',level:'info'},
  {time:'12:55:41',user:'system',             action:'WebSocket reconnection',     target:'market-feed-ws-3',        level:'warning'},
  {time:'12:40:09',user:'system',             action:'Certificate renewal',        target:'*.urbatrade.com',         level:'success'},
  {time:'12:22:55',user:'admin@urbatrade.com',action:'Updated pricing tier',       target:'Pro plan: $29/mo',        level:'info'},
]

export default function AuditPage() {
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div style={{display:'flex',gap:12}}>
          <select className="adm-select"><option>All Levels</option><option>Info</option><option>Success</option><option>Warning</option><option>Error</option></select>
          <select className="adm-select"><option>All Users</option><option>admin@urbatrade.com</option><option>system</option><option>cron</option></select>
        </div>
        <button className="adm-btn adm-btn-ghost adm-btn-sm">Export Logs</button>
      </div>
      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th style={{width:90}}>Time</th><th>User</th><th>Action</th><th>Target</th><th>Level</th></tr></thead>
            <tbody>
              {LOGS.map((l,i)=>(
                <tr key={i}>
                  <td className="adm-mono" style={{color:'var(--adm-text3)'}}>{l.time}</td>
                  <td className="adm-mono" style={{color:'var(--adm-text2)',fontSize:12}}>{l.user}</td>
                  <td style={{fontWeight:500}}>{l.action}</td>
                  <td style={{color:'var(--adm-text2)'}}>{l.target}</td>
                  <td>
                    <span className={
                      l.level==='success'?'adm-badge adm-b-green':
                      l.level==='warning'?'adm-badge adm-b-amber':
                      l.level==='error'  ?'adm-badge adm-b-red':
                      'adm-badge adm-b-gray'
                    }>{l.level}</span>
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
