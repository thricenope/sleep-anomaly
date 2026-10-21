import { useGame } from '../store'
import { levelFromXp } from '../logic/quests'
import { Icon } from './Icon'
import type { IconName } from './Icon'

export type TabKey = 'raid' | 'corridor' | 'codex' | 'quest' | 'guild'

const TABS: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'raid', label: '夜巡', icon: 'flashlight' },
  { key: 'corridor', label: '档案', icon: 'calendar' },
  { key: 'codex', label: '收容档案', icon: 'book' },
  { key: 'quest', label: '功勋', icon: 'trophy' },
  { key: 'guild', label: '研究所', icon: 'chart' },
]

export const TabBar = ({ tab, onTab }: { tab: TabKey; onTab: (t: TabKey) => void }) => (
  <nav className="tabbar" aria-label="主导航">
    {TABS.map((t) => (
      <button
        key={t.key}
        type="button"
        className={`tab${tab === t.key ? ' on' : ''}`}
        onClick={() => onTab(t.key)}
        aria-current={tab === t.key ? 'page' : undefined}
      >
        <Icon name={t.icon} size={21} />
        {t.label}
      </button>
    ))}
  </nav>
)

export const TopBar = () => {
  const stats = useGame((s) => s.stats)
  const lv = levelFromXp(stats.xp)
  const pct = Math.round((lv.into / lv.need) * 100)

  return (
    <header className="topbar">
      <div className="logo">
        <Icon name="flashlight" size={26} style={{ color: '#2E7D6B' }} />
        <span className="name">晚安收容所</span>
      </div>
      <div className="spacer" />
      {stats.curStreak > 0 && (
        <span className="chip-stat flame">
          <Icon name="flame" size={15} />
          {stats.curStreak}
        </span>
      )}
      <span className="chip-stat">
        LV {lv.level}
      </span>
      <div className="xp-line" aria-label={`经验 ${lv.into}/${lv.need}`}>
        <i style={{ width: `${pct}%` }} />
      </div>
    </header>
  )
}
