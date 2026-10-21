import { isWin, isPerfect } from './scoring'
import type { NightPlan, NightReport, Stats, Verdict } from '../types'

export const STORAGE_KEY = 'sleep-anomaly-v1'

/** 功勋定义（与 slim-hero 同构、文案收容所化） */
export interface Quest {
  id: string
  name: string
  desc: string
  goal: number
  /** 进度取值维度 */
  kind: 'streak' | 'total' | 'perfect' | 'boss' | 'kills' | 'xp'
  tier: 1 | 2 | 3 | 4
  icon: string
}

export const QUESTS: Quest[] = [
  { id: 's1', name: '初次收容', desc: '第一次把收容物收进档案', goal: 1, kind: 'total', tier: 1, icon: 'star' },
  { id: 's3', name: '三夜连守', desc: '连守 ×3', goal: 3, kind: 'streak', tier: 1, icon: 'flame' },
  { id: 's7', name: '一周值守', desc: '连守 ×7', goal: 7, kind: 'streak', tier: 2, icon: 'flame' },
  { id: 's14', name: '双周夜班', desc: '连守 ×14', goal: 14, kind: 'streak', tier: 2, icon: 'flame' },
  { id: 's30', name: '月度守则', desc: '连守 ×30', goal: 30, kind: 'streak', tier: 3, icon: 'flame' },
  { id: 's60', name: '收容所常驻', desc: '连守 ×60', goal: 60, kind: 'streak', tier: 3, icon: 'flame' },
  { id: 's100', name: '百夜档案', desc: '连守 ×100', goal: 100, kind: 'streak', tier: 3, icon: 'flame' },
  { id: 's180', name: '半年守望', desc: '连守 ×180', goal: 180, kind: 'streak', tier: 4, icon: 'crown' },
  { id: 's365', name: '周年守望', desc: '连守 ×365', goal: 365, kind: 'streak', tier: 4, icon: 'crown' },
  { id: 's730', name: '双年传说', desc: '连守 ×730', goal: 730, kind: 'streak', tier: 4, icon: 'crown' },
  { id: 'p1', name: '异常听话', desc: '首次档案标注「异常听话」（≥6 分）', goal: 1, kind: 'perfect', tier: 1, icon: 'sparkle' },
  { id: 'p10', name: '十连标注', desc: '累计「异常听话」10 次', goal: 10, kind: 'perfect', tier: 2, icon: 'sparkle' },
  { id: 'p50', name: '档案管理学大师', desc: '累计「异常听话」50 次', goal: 50, kind: 'perfect', tier: 3, icon: 'crown' },
  { id: 't10', name: '收容新丁', desc: '累计收容 10 晚', goal: 10, kind: 'total', tier: 1, icon: 'shield' },
  { id: 't50', name: '收容熟手', desc: '累计收容 50 晚', goal: 50, kind: 'total', tier: 2, icon: 'shield' },
  { id: 't150', name: '档案库主人', desc: '累计收容 150 晚', goal: 150, kind: 'total', tier: 3, icon: 'shield' },
  { id: 't365', name: '全年守夜', desc: '累计收容 365 晚', goal: 365, kind: 'total', tier: 4, icon: 'crown' },
  { id: 'b1', name: '零号初收', desc: '首次收容周末 BOSS 收容物零号', goal: 1, kind: 'boss', tier: 2, icon: 'trophy' },
  { id: 'b10', name: '零号克星', desc: '收容零号 10 次', goal: 10, kind: 'boss', tier: 3, icon: 'trophy' },
  { id: 'k30', name: '全档案收录', desc: '收容档案收录全部 6 只', goal: 6, kind: 'kills', tier: 2, icon: 'book' },
  { id: 'k100', name: '百次收容', desc: '累计收容 100 只收容物', goal: 100, kind: 'kills', tier: 3, icon: 'book' },
  { id: 'x200', name: '研究所学徒', desc: '累计经验 200', goal: 200, kind: 'xp', tier: 1, icon: 'star' },
  { id: 'x800', name: '荧光勋章', desc: '累计经验 800', goal: 800, kind: 'xp', tier: 2, icon: 'star' },
  { id: 'x2000', name: '传说守夜人', desc: '累计经验 2000', goal: 2000, kind: 'xp', tier: 3, icon: 'crown' },
]

export const ROAD: { days: number; title: string }[] = [
  { days: 2, title: '第一夜' },
  { days: 4, title: '小夜班' },
  { days: 7, title: '一周值守' },
  { days: 14, title: '双周夜班' },
  { days: 21, title: '三周巡查' },
  { days: 30, title: '月度守则' },
  { days: 60, title: '收容所常驻' },
  { days: 100, title: '百夜档案' },
  { days: 180, title: '半年守望' },
  { days: 365, title: '周年守望' },
]

export const nextRoad = (streak: number): { days: number; title: string } | null =>
  ROAD.find((r) => streak < r.days) ?? null

export const comboTitle = (streak: number): string => {
  const next = nextRoad(streak)
  const cur = [...ROAD].reverse().find((r) => streak >= r.days)
  return cur ? `${cur.title}·${next ? `距${next.title}还差 ${next.days - streak} 夜` : '传说达成！'}` : '结界待布置'
}

/** 当日经验（重复结算取差值由 store 处理） */
export const dayXp = (v: Verdict, r: NightReport, planOk: boolean): number => {
  let xp = 0
  if (isWin(v)) xp += 20
  if (isPerfect(v)) xp += 10
  if (r.wakes !== 'many' && r.duration === 'h7plus') xp += 2
  if (planOk) xp += 5
  return xp
}

export const xpForLevel = (level: number): number => 40 + 15 * (level - 1)

export const levelFromXp = (xp: number): { level: number; into: number; need: number } => {
  let level = 1
  let rest = xp
  while (rest >= xpForLevel(level)) {
    rest -= xpForLevel(level)
    level += 1
  }
  return { level, into: rest, need: xpForLevel(level) }
}

const TITLES = [
  '实习守夜人', '正式守夜人', '资深守夜人', '收容专家', '档案管理大师', '收容所支柱', '传说守夜人',
]

export const titleFor = (level: number): string =>
  TITLES[Math.min(Math.floor((level - 1) / 3), TITLES.length - 1)]

export const questProgress = (q: Quest, stats: Stats): number => {
  switch (q.kind) {
    case 'streak': return Math.max(stats.curStreak, stats.bestStreak)
    case 'total': return stats.winDays
    case 'perfect': return stats.perfectDays
    case 'boss': return stats.killsByMonster['zero'] ?? 0
    case 'kills': return q.id === 'k30'
      ? Object.keys(stats.killsByMonster).length
      : Object.values(stats.killsByMonster).reduce((a, b) => a + b, 0)
    case 'xp': return stats.xp
  }
}

/** 功勋经验（发放与弹窗展示共用，勿在别处硬编码 tier×25） */
export const questXp = (q: Quest): number => q.tier * 25

/**
 * 夜 D 的结界报告对应「夜 D 睡前」填的结界布置：布置按当晚日期键写入（填布置时 today() 即当晚日期 D）。
 * 只看键 D 本身——回看 D-1 会拿到前一晚已被消费的布置，回看 D+1 会把今晚的新布置错配给昨晚。
 */
export const planOf = (plans: Record<string, NightPlan>, reportDate: string): NightPlan | undefined =>
  plans[reportDate]
