import { isWeekend, weekday } from './dates'

export type MonsterSpecies = 'screen' | 'alpaca' | 'fridge' | 'slime' | 'bus' | 'zero'

export interface MonsterDef {
  id: MonsterSpecies
  name: string
  /** 收容编号（档案铭牌用，仅展示） */
  code: string
  title: string
  taunt: string
  lose: string
  win: string
  boss: boolean
}

export const MONSTERS: MonsterDef[] = [
  {
    id: 'screen',
    name: '屏妖·电子幽灵',
    code: 'XL-01',
    title: '项目编号 XL-01 · 危险等级：蓝光',
    taunt: '就从手机里探个头嘛～再刷五分钟，就五分钟！',
    lose: '档…档案被盖章了！本幽灵申请回手机里静音！',
    win: '嘿嘿，屏幕亮到天亮，你不睡我也不睡～',
    boss: false,
  },
  {
    id: 'alpaca',
    name: '数羊羊驼',
    code: 'XL-02',
    title: '项目编号 XL-02 · 危险等级：数不清',
    taunt: '第 1024 只羊跳过栅栏啦～要不要一起数？',
    lose: '咩？！不数羊就直接睡着了？档案里没这一页啊！',
    win: '羊越数越精神～明晚从第一只重新数起？',
    boss: false,
  },
  {
    id: 'fridge',
    name: '冰箱怪·夜宵鼻祖',
    code: 'XL-03',
    title: '项目编号 XL-03 · 危险等级：馋',
    taunt: '开个冰箱门嘛～夜宵的灯光只为你亮！',
    lose: '收容措施「一顿好觉」生效……本怪被平稳收容。',
    win: '深夜的冰箱灯，永远为夜宵常亮～咕噜咕噜。',
    boss: false,
  },
  {
    id: 'slime',
    name: '起床气史莱姆',
    code: 'XL-04',
    title: '项目编号 XL-04 · 危险等级：瘫',
    taunt: '清晨的怨气是本史的燃料～再赖五分钟嘛！',
    lose: '咕叽……被规律作息中和了，瘫不动了……',
    win: '今晚继续瘫成一大片起床气～咕叽咕叽。',
    boss: false,
  },
  {
    id: 'bus',
    name: '末班车梦游灵',
    code: 'XL-05',
    title: '项目编号 XL-05 · 危险等级：迷糊',
    taunt: '末班车开进梦里啦～坐过站也不下车哦。',
    lose: '到站了……被守夜人的手电照下车了，呜。',
    win: '下一站：凌晨三点～请扶稳坐好咯。',
    boss: false,
  },
  {
    id: 'zero',
    name: '收容物零号·「睡不着」',
    code: 'XL-000',
    title: '项目编号 XL-000 · 危险等级：周末限定',
    taunt: '编号零号，失眠本尊。周末的长夜，归我管～',
    lose: '绷带都散了……零号申请主动归档，下周再来！',
    win: '收容失败预告：周日晚上，我还在老地方等你。',
    boss: true,
  },
]

export const monsterById = (id: string): MonsterDef =>
  MONSTERS.find((m) => m.id === id) ?? MONSTERS[0]

/** 按日期哈希固定当日收容物；周日固定 BOSS（周末收容战） */
export const monsterOf = (date: string): MonsterSpecies => {
  if (weekday(date) === 0) return 'zero'
  if (isWeekend(date)) return 'zero'
  const pool: MonsterSpecies[] = ['screen', 'alpaca', 'fridge', 'slime', 'bus']
  let h = 0
  for (const c of date) h = (h * 31 + c.charCodeAt(0)) | 0
  return pool[Math.abs(h) % pool.length]
}
