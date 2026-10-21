import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { NightPlan, NightReport } from '../types'
import { useGame } from '../store'
import {
  EMPTY_PLAN, EMPTY_REPORT, VERDICT_META, damageOf, evaluateReport,
  isRecorded, isWin, planScore,
} from '../logic/scoring'
import type { EvaluateResult } from '../logic/scoring'
import { monsterById, monsterOf } from '../logic/monsters'
import { comboTitle, planOf } from '../logic/quests'
import { titleFor } from '../logic/quests'
import { dateCn, today, ymd, addDays, parseYmd, weekCn } from '../logic/dates'
import { bigCelebration, burstAt } from '../celebrate'
import { Monster } from './Monster'
import { Captain } from './Captain'
import { ReportEditor } from './ReportEditor'
import { PlanEditor } from './PlanEditor'
import { Icon } from './Icon'

const BATTLE_LINES = {
  pending: ['档案页还空着呢，守夜人今晚布置结界了吗？', '结界报告还没交，收容物在档案柜里偷笑～', '先填结界报告啦，收容物都等困了！'],
  perfect: ['哇——收容印章啪地盖下！「异常听话」认证！', '档案直接贴上荧光贴纸，收容所都传开了！', '太强了！收容物们连夜给自己写好了档案！'],
  win: ['收容成功！收容物乖乖躺进档案页～', '手电一照，当场归档，守夜人威武！', '今晚也是安安稳稳的守夜！'],
  plain: ['唔…收容进度卡在一半……', '差一点点就收容成功啦，明晚再巡？', '势均力敌，收容物在档案柜门口探头探脑。'],
  fail: ['收容物溜了！还冲你比了个耶……', '呜，这晚收容失败。今晚早点上床，收回来！', '收容物得意中：嘿嘿，档案上见～'],
}

const evMeta = (ev: EvaluateResult) => VERDICT_META[ev.verdict]

/** 主视图：夜巡（收容舞台 + 昨晚结界报告 + 今晚结界布置） */
export const RaidView = () => {
  const setReport = useGame((s) => s.setReport)
  const setPlan = useGame((s) => s.setPlan)
  const clearReport = useGame((s) => s.clearReport)
  const reports = useGame((s) => s.reports)
  const plans = useGame((s) => s.plans)
  const stats = useGame((s) => s.stats)

  const t = today()
  /** 昨晚收容日期 = 今天 −1 */
  const raidDate = useMemo(() => ymd(addDays(parseYmd(t), -1)), [t])
  const saved = reports[raidDate]
  const savedPlan = plans[t] // 今晚结界布置的已存值（今天日期键）

  const [draft, setDraft] = useState<NightReport>(saved ?? { ...EMPTY_REPORT })
  const [plan, setPlanState] = useState<NightPlan>(savedPlan ?? { ...EMPTY_PLAN })
  const [attacking, setAttacking] = useState(false)
  const [hit, setHit] = useState<{ id: number; text: string; crit: boolean } | null>(null)
  const [shake, setShake] = useState(0)
  const [combo, setCombo] = useState<{ n: number; title: string } | null>(null)
  const [levelUp, setLevelUp] = useState<number | null>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  // 与 store 结算同源：昨晚结界报告用 planOf(昨晚) 判定「契约生效」，与真正入库的分数一致
  const ev = useMemo(() => evaluateReport(draft, planOf(plans, raidDate)), [draft, plans, raidDate])
  const meta = evMeta(ev)
  const touched = isRecorded(draft)
  const recorded = !!saved

  const monsterId = monsterOf(raidDate)
  const skin = monsterById(monsterId)

  const hpLeft = recorded
    ? isWin(saved ? ev.verdict : 'pending')
      ? 0
      : Math.max(8, 100 - damageOf(ev.score))
    : touched && ev.score > 0
      ? Math.max(8, 100 - damageOf(ev.score))
      : 100

  const mood = !touched ? 'full' : ev.verdict === 'fail' || ev.verdict === 'plain' ? 'full' : ev.verdict === 'win' ? 'hurt' : 'faint'
  const line = recorded
    ? ev.verdict === 'fail'
      ? skin.win
      : ev.verdict === 'plain'
        ? '档案还没盖章！本物在柜子里蹦跶！'
        : skin.lose
    : touched && ev.score >= 2
      ? '等等——你怎么先预读了档案？！'
      : skin.taunt

  const planBonus = planScore(plan)

  const doRaid = () => {
    const result = setReport(raidDate, draft)

    setAttacking(true)
    setTimeout(() => setAttacking(false), 600)
    setShake((n) => n + 1)

    const dmg = damageOf(result.verdict === 'fail' ? Math.min(result.score, -1) : result.score)
    setHit({
      id: Date.now(),
      text: result.verdict === 'perfect' ? '「异常听话」！' : `收容强度 ${Math.min(dmg, 100)}`,
      crit: result.verdict === 'perfect',
    })
    setTimeout(() => setHit(null), 1400)

    if (result.verdict === 'win' || result.verdict === 'perfect') {
      bigCelebration()
      burstAt(ctaRef.current)
      const cur = useGame.getState().stats.curStreak
      if (cur >= 2) {
        setCombo({ n: cur, title: comboTitle(cur) })
        setTimeout(() => setCombo(null), 1900)
      }
    } else if (result.xpGained > 0) {
      burstAt(ctaRef.current)
    }

    if (result.levelAfter > result.levelBefore) {
      setTimeout(() => setLevelUp(result.levelAfter), 700)
    }
  }

  return (
    <div>
      {stats.totalDays === 0 && (
        <div className="card guide-card">
          <div className="g-title">欢迎入职晚安收容所！</div>
          <ol>
            <li>睡前布置<b>今晚结界</b>，立下上床契约</li>
            <li>早上回来交<b>昨晚结界报告</b>——睡得越好，收容强度越高</li>
            <li>≥2 分收容成功，≥6 分档案标注<b>「异常听话」</b>；连守推进<b>守夜资历</b></li>
          </ol>
        </div>
      )}

      <div className="card battle-card">
        <div className="battle-date">
          <Icon name="calendar" size={15} />
          {dateCn(raidDate)}（{weekCn(raidDate)}）的收容对象
        </div>
        <div className="battle-scene night-scene">
          <div className="battle-stars" aria-hidden="true" />
          <div className="battle-cloud" aria-hidden="true" />
          <div className="battle-hero">
            <Captain attacking={attacking} size={88} />
          </div>
          <motion.div
            key={shake}
            className="battle-monster"
            initial={shake > 0 ? { x: 0 } : false}
            animate={shake > 0 ? { x: [0, -8, 7, -5, 0] } : undefined}
            transition={{ duration: 0.4 }}
          >
            <Monster species={monsterId} mood={mood} size={150} />
          </motion.div>
          <AnimatePresence>
            {hit && (
              <motion.div
                key={hit.id}
                className={`dmg-float${hit.crit ? ' crit' : ''}`}
                initial={{ y: 10, opacity: 0, scale: 0.6 }}
                animate={{ y: -46, opacity: 1, scale: 1.15 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {hit.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hp-row">
          <span className="hp-name">
            {skin.name}
            {skin.boss && <b className="boss-tag">BOSS</b>}
          </span>
          <div className="hp-track" role="img" aria-label={`收容进度 ${Math.round(hpLeft)}%`}>
            <motion.div className="hp-fill" animate={{ width: `${hpLeft}%` }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} />
            {[25, 50, 75].map((p) => (
              <span key={p} className="hp-tick" style={{ left: `${p}%` }} />
            ))}
          </div>
          <span className="hp-num">{Math.round(hpLeft)}%</span>
        </div>

        <div className="bubble">
          <AnimatePresence mode="wait">
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              <div className="hi">{line}</div>
              <div className="sub">
                {recorded ? `结界报告已归档：${meta.title}` : touched ? '预览收容中 · 按「夜巡！」归档' : '收容物探头中 · 填完报告就夜巡'}
                {stats.curStreak > 0 && ` · 连守 ${stats.curStreak} 夜`}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {recorded && (
        <div className="done-banner">
          <Icon name="check" size={20} style={{ color: '#2E7D6B' }} />
          <span className="t">该晚已归档：{meta.title}</span>
          <span className="s">{ev.score} 分</span>
        </div>
      )}

      <div className="sec-head" style={{ marginTop: 20 }}>
        <h2>🌙 昨晚结界报告</h2>
        <span className="note">晨起回忆，结算 {dateCn(raidDate)} 的收容</span>
      </div>
      <ReportEditor value={draft} onChange={(p) => setDraft((d) => ({ ...d, ...p }))} />

      <div className="sec-head" style={{ marginTop: 8 }}>
        <h2>🛏️ 今晚结界布置</h2>
        <span className="note">立下契约 · 明早兑现 +3</span>
      </div>
      {/* 结界布置即改即存（setPlan 幂等）：睡前只填布置、不点夜巡也不会丢 */}
      <PlanEditor
        value={plan}
        onChange={(p) => {
          setPlanState((d) => ({ ...d, ...p }))
          setPlan(t, { ...plan, ...p })
        }}
      />

      <div className="card live-verdict">
        <div className="row">
          <span className={`vpill ${meta.cls}`}>{meta.title}</span>
          <span
            className={`score-num ${ev.score > 0 ? 'pos' : ev.score < 0 ? 'neg' : 'zero'}`}
            aria-label={`收容强度 ${ev.score}`}
          >
            {ev.score > 0 ? `+${ev.score}` : ev.score}
          </span>
        </div>
        <div className="parts">
          {ev.parts.map((p, i) => (
            <div className="p" key={i}>
              <span>{p.label}</span>
              <b className={p.pts > 0 ? 'plus' : p.pts < 0 ? 'minus' : 'zero'}>
                {p.pts > 0 ? `+${p.pts}` : p.pts}
              </b>
            </div>
          ))}
          {ev.parts.length === 0 && (
            <div className="p">
              <span style={{ color: 'var(--ink-3)' }}>填了结界报告才会出收容强度</span>
            </div>
          )}
          <div className="p">
            <span style={{ color: 'var(--ink-3)' }}>≥ 2 分收容成功 · ≥ 6 分档案标注「异常听话」</span>
          </div>
          {planBonus >= 2 && !recorded && (
            <div className="p">
              <span style={{ color: 'var(--amber-deep, #8A5A00)' }}>✨ 今晚结界已达标，明早契约生效 +3</span>
            </div>
          )}
        </div>
      </div>

      <motion.button
        ref={ctaRef}
        type="button"
        className="cta"
        whileTap={{ scale: 0.97 }}
        disabled={!touched}
        onClick={doRaid}
      >
        <Icon name="flashlight" size={22} />
        {recorded ? '重新归档' : '夜巡！'}
      </motion.button>

      {recorded && (
        <div style={{ textAlign: 'center' }}>
          <button
            className="ghost-link"
            onClick={() => {
              if (window.confirm('撤销该晚结界报告吗？')) {
                clearReport(raidDate)
                setDraft({ ...EMPTY_REPORT })
              }
            }}
          >
            <Icon name="trash" size={14} /> 撤销报告
          </button>
        </div>
      )}

      <AnimatePresence>
        {combo && (
          <motion.div
            className="combo-banner"
            initial={{ scale: 0.3, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
          >
            ×{combo.n} 连守！
            <small>{combo.title}</small>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {levelUp !== null && (
          <motion.div
            className="cele-mask z-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLevelUp(null)}
          >
            <motion.div
              className="cele-card"
              initial={{ scale: 0.5, y: 60 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rays" />
              <div className="cele-kind">等 级 提 升</div>
              <motion.div
                className="cele-emoji"
                initial={{ rotate: -20, scale: 0.4 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.15 }}
              >
                <Icon name="crown" size={72} style={{ color: '#e8a54a' }} />
              </motion.div>
              <div className="cele-title">LV {levelUp}</div>
              <div className="cele-desc">获得称号「{titleFor(levelUp)}」</div>
              <div className="cele-xp">收容所越来越安稳！</div>
              <button type="button" className="cta mint" onClick={() => setLevelUp(null)}>
                太棒了！
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { BATTLE_LINES }
