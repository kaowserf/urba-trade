export const metadata = { title: 'Settings — Admin' }

const FEATURES = [
  {l:'AI Chat (Public)',  on:true },
  {l:'Backtesting',       on:true },
  {l:'Whale Tracker',     on:true },
  {l:'Crypto Module',     on:false},
  {l:'Social Trading',    on:false},
  {l:'Paper Trading',     on:true },
]
const MODEL_CFG = [
  {l:'Model Version',       v:'v3.2.1'},
  {l:'Retrain Frequency',   v:'Daily'},
  {l:'Confidence Threshold',v:'65%'},
  {l:'Max Signals/Day',     v:'2,000'},
]
const PLATFORM = [
  {l:'Platform Name',     v:'UrbaTrade',          type:'text'},
  {l:'Support Email',     v:'support@urbatrade.com',type:'text'},
  {l:'Max Free Picks/Day',v:'5',                  type:'number'},
  {l:'Signal Delay (Free)',v:'15',                type:'number'},
]

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="adm-tabs">
        {['General','API Keys','Notifications','Security','Billing'].map((t,i)=>(
          <button key={t} className={`adm-tab${i===0?' active':''}`}>{t}</button>
        ))}
      </div>

      <div className="adm-g23">
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {/* Platform Settings */}
          <div className="adm-card adm-card-p">
            <h3 style={{fontSize:14,fontWeight:600,marginBottom:16}}>Platform Settings</h3>
            {PLATFORM.map(s=>(
              <div key={s.l} style={{marginBottom:16}}>
                <label style={{fontSize:12,color:'var(--adm-text3)',display:'block',marginBottom:6}}>{s.l}</label>
                <input className="adm-input" type={s.type} defaultValue={s.v} style={{maxWidth:360}}/>
              </div>
            ))}
            <button className="adm-btn adm-btn-primary adm-btn-sm" style={{marginTop:8}}>Save Changes</button>
          </div>

          {/* Feature Toggles */}
          <div className="adm-card adm-card-p">
            <h3 style={{fontSize:14,fontWeight:600,marginBottom:16}}>Feature Toggles</h3>
            {FEATURES.map(f=>(
              <div key={f.l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                <span style={{fontSize:13}}>{f.l}</span>
                <button className={`adm-toggle${f.on?' on':''}`}/>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {/* AI Model Config */}
          <div className="adm-card adm-card-p">
            <h3 style={{fontSize:14,fontWeight:600,marginBottom:14}}>AI Model Config</h3>
            {MODEL_CFG.map(s=>(
              <div key={s.l} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                <span style={{fontSize:12,color:'var(--adm-text2)'}}>{s.l}</span>
                <span className="adm-mono" style={{fontSize:12,fontWeight:600}}>{s.v}</span>
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="adm-card adm-card-p">
            <h3 style={{fontSize:14,fontWeight:600,marginBottom:14}}>Danger Zone</h3>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{width:'fit-content'}}>Purge Cache</button>
              <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{width:'fit-content'}}>Reset Rate Limits</button>
              <button className="adm-btn adm-btn-danger adm-btn-sm" style={{width:'fit-content'}}>⚠ Force Retrain All Models</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
