import { useGame } from '../store'
import { MONSTERS } from '../logic/monsters'
import { Icon } from './Icon'
import { Monster } from './Monster'

/** 收容档案：收容过的贴上档案页（编号+危险等级），没收容过的是「资料缺失」 */
export const CodexView = () => {
  const stats = useGame((s) => s.stats)
  const unlockedCount = Object.keys(stats.killsByMonster).length
  const totalKills = Object.values(stats.killsByMonster).reduce((a, b) => a + b, 0)

  return (
    <div>
      <div className="card" style={{ background: 'linear-gradient(150deg,#fff,#EFF5F0)', borderColor: '#C2D6C9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="book" size={40} style={{ color: 'var(--eerie-deep, #1B584A)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.25 }}>
              档案收录 <span style={{ color: '#1B584A', fontFamily: 'var(--font-num)', fontSize: 27 }}>{unlockedCount}</span>/{MONSTERS.length} 只
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 2 }}>
              累计收容 <b style={{ fontFamily: 'var(--font-num)' }}>{totalKills}</b> 只收容物
            </div>
          </div>
        </div>
      </div>

      <div className="codex-grid">
        {MONSTERS.map((m) => {
          const kills = stats.killsByMonster[m.id] ?? 0
          const got = kills > 0
          return (
            <div key={m.id} className={`codex-card${got ? ' got' : ''}`}>
              <div className="codex-avatar">
                <Monster species={m.id} mood={got ? 'full' : 'silhouette'} size={82} />
                {!got && <span className="codex-unk">?</span>}
              </div>
              <div className="codex-name">{got ? m.name : '???'}</div>
              <div className="codex-title">{got ? m.title : '资料缺失 · 尚未收容'}</div>
              {m.boss && <span className="boss-tag">周末 BOSS</span>}
              {got && <span className="codex-kills">×{kills}</span>}
            </div>
          )
        })}
      </div>

      {unlockedCount < MONSTERS.length && (
        <p className="empty-tip">周末作乱的 XL-000「收容物零号·睡不着」最难收 —— 收容它，档案柜才算圆满！</p>
      )}
    </div>
  )
}
