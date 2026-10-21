import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { monsterById } from '../logic/monsters'
import type { MonsterSpecies } from '../logic/monsters'

export type MonsterMood = 'full' | 'hurt' | 'faint' | 'silhouette'

const INK = '#22332E'
/** 荧光小触手（收容所同款夜光配件） */
const TENTACLE = { stroke: '#8FE388', strokeWidth: 3, fill: 'none', strokeLinecap: 'round' as const, opacity: 0.85 }

/** Q版收容物：全部手绘 SVG，情绪由收容状态驱动（可爱优先，绝不恐怖） */
export const Monster = ({ species, mood, size = 150 }: { species: MonsterSpecies; mood: MonsterMood; size?: number }) => {
  const sil = mood === 'silhouette'
  const filter = sil ? 'grayscale(1) brightness(0.55) opacity(0.8)' : undefined
  const code = monsterById(species).code

  const eyes = (): ReactNode => {
    if (mood === 'faint')
      return (
        <g stroke={INK} strokeWidth="3" strokeLinecap="round">
          <path d="M40 55 l9 9 M49 55 l-9 9" />
          <path d="M66 55 l9 9 M75 55 l-9 9" />
        </g>
      )
    if (mood === 'hurt')
      return (
        <g fill={INK}>
          <circle cx="45" cy="58" r="4" />
          <circle cx="70" cy="58" r="4" />
          <path d="M40 51 q5 -4 10 -1" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )
    return (
      <g fill={INK}>
        <circle cx="45" cy="56" r="5.5" />
        <circle cx="70" cy="56" r="5.5" />
        <circle cx="47" cy="53.6" r="2" fill="#fff" />
        <circle cx="72" cy="53.6" r="2" fill="#fff" />
        <circle cx="43.6" cy="58.2" r="0.9" fill="#fff" />
        <circle cx="68.6" cy="58.2" r="0.9" fill="#fff" />
      </g>
    )
  }

  /** 常规嘴：full 带小獠牙（不吓人的那种） */
  const mouth = (): ReactNode => {
    if (mood === 'faint')
      return <path d="M52 76 q6 7 12 0 q-2 6 -6 6 q-4 0 -6 -6z" fill="#B85C4A" />
    if (mood === 'hurt')
      return <path d="M53 76 q5 -4 10 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    return (
      <g>
        <path d="M50 72 q8 8 16 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M53 74.5 l2.3 4 l2.3 -4 z" fill="#fff" />
        <path d="M60 75.5 l2.3 4 l2.3 -4 z" fill="#fff" />
      </g>
    )
  }

  /** 收容编号小铭牌（档案味来源） */
  const plate = (
    <g>
      <rect x={5} y={95} width={code.length * 5.6 + 9} height={14} rx={4} fill="#E8A54A" stroke="#8A5A00" strokeWidth={1.6} />
      <text
        x={5 + (code.length * 5.6 + 9) / 2}
        y={105.4}
        textAnchor="middle"
        fontSize={8.2}
        fontWeight={800}
        fill="#fff"
        style={{ fontFamily: 'var(--font-num, sans-serif)', letterSpacing: '0.04em' }}
      >
        {code}
      </text>
    </g>
  )

  const body = (children: ReactNode) => (
    <svg width={size} height={size} viewBox="0 0 115 115" style={{ filter }} aria-hidden="true">
      {children}
      {!sil && size >= 60 && plate}
    </svg>
  )

  const wrap = (inner: ReactNode) =>
    mood === 'faint' ? (
      <motion.div animate={{ rotate: [-8, 8, -6, 0] }} transition={{ duration: 0.9 }}>{body(inner)}</motion.div>
    ) : (
      body(inner)
    )

  switch (species) {
    // XL-01 屏妖·电子幽灵：从手机里探头的小幽灵，WIFI 头饰
    case 'screen':
      return wrap(
        <>
          <path d="M29 52 q-8 4 -6 13" {...TENTACLE} />
          <path d="M86 52 q8 4 6 13" {...TENTACLE} />
          <path
            d="M33 80 V47 a24.5 24.5 0 0 1 49 0 v33 q-6 -7 -12 0 q-6 7 -12 0 q-6 -7 -12.5 0 q-6 7 -12.5 0 z"
            fill="#EAF6EE"
            stroke="#5C8574"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <ellipse cx="34" cy="38" rx="6" ry="9" fill="#FFFFFF" transform="rotate(-18 34 38)" />
          <g stroke="#E8A54A" strokeWidth="2.4" fill="none" strokeLinecap="round">
            <path d="M45.5 12.5 a15 15 0 0 1 24 0" />
            <path d="M51 17 a8 8 0 0 1 13 0" />
          </g>
          <circle cx="57.5" cy="21.5" r="2.1" fill="#E8A54A" />
          {eyes()}{mouth()}
          <rect x="36" y="78" width="43" height="32" rx="6" fill="#22332E" stroke="#0E1B16" strokeWidth="3" />
          <rect x="41" y="84" width="33" height="18" rx="4" fill="#8FE388" opacity="0.16" />
          <circle cx="57.5" cy="104" r="1.9" fill="#8FE388" opacity="0.8" />
        </>,
      )
    // XL-02 数羊羊驼：数羊数到崩溃，头顶飘着「第 1024 只」
    case 'alpaca':
      return wrap(
        <>
          <ellipse cx="35" cy="42" rx="6" ry="11" fill="#F5EFE3" stroke="#C9A96B" strokeWidth="3" transform="rotate(-22 35 42)" />
          <ellipse cx="80" cy="42" rx="6" ry="11" fill="#F5EFE3" stroke="#C9A96B" strokeWidth="3" transform="rotate(22 80 42)" />
          <circle cx="48" cy="32" r="5" fill="#F5EFE3" stroke="#C9A96B" strokeWidth="3" />
          <circle cx="57" cy="29" r="5.5" fill="#F5EFE3" stroke="#C9A96B" strokeWidth="3" />
          <circle cx="66" cy="32" r="5" fill="#F5EFE3" stroke="#C9A96B" strokeWidth="3" />
          <path
            d="M25 78 a13 13 0 0 1 3 -26 a16 16 0 0 1 29 -10 a14 14 0 0 1 24 8 a12.5 12.5 0 0 1 1 28 q-24 8 -57 0 z"
            fill="#F5EFE3"
            stroke="#C9A96B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <text x="10" y="13" fontSize="7.2" fontWeight="700" fill="#8A5A00" style={{ fontFamily: 'var(--font-num, sans-serif)' }}>
            第 1024 只
          </text>
          <ellipse cx="20" cy="22" rx="6.5" ry="4.8" fill="#fff" stroke="#93A89D" strokeWidth="2" />
          <circle cx="27.5" cy="20.5" r="2.7" fill="#93A89D" />
          <path d="M17 26 v4 M22 26 v4" stroke="#93A89D" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M92 30 v6 M89 33 h6" stroke="#8FE388" strokeWidth="1.8" strokeLinecap="round" />
          {eyes()}{mouth()}
        </>,
      )
    // XL-03 冰箱怪·夜宵鼻祖：半夜发光的小冰箱长了腿，危险等级：馋
    case 'fridge':
      return wrap(
        <>
          <path d="M45 92 v9 M70 92 v9" stroke="#5C8574" strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="45" cy="103" rx="6" ry="3.2" fill="#5C8574" />
          <ellipse cx="70" cy="103" rx="6" ry="3.2" fill="#5C8574" />
          <path d="M33 76 q-11 2 -9 13" {...TENTACLE} />
          <path d="M82 76 q11 2 9 13" {...TENTACLE} />
          <rect x="33" y="28" width="49" height="66" rx="9" fill="#EAF4EE" stroke="#5C8574" strokeWidth="3.5" />
          <path d="M35 66.5 h45" stroke="#8FE388" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
          <path d="M33 64 h49" stroke="#5C8574" strokeWidth="2.5" />
          <rect x="74.5" y="36" width="4" height="13" rx="2" fill="#E8A54A" stroke="#8A5A00" strokeWidth="1.4" />
          <rect x="74.5" y="70" width="4" height="11" rx="2" fill="#E8A54A" stroke="#8A5A00" strokeWidth="1.4" />
          <rect x="39" y="40" width="6.5" height="4.5" rx="1.2" fill="#B85C4A" />
          {eyes()}{mouth()}
        </>,
      )
    // XL-04 起床气史莱姆：瘫成一滩的青绿史莱姆
    case 'slime':
      return wrap(
        <>
          <ellipse cx="12" cy="93" rx="8" ry="3.8" fill="#9BD9B4" opacity="0.75" />
          <ellipse cx="103" cy="92" rx="7" ry="3.4" fill="#9BD9B4" opacity="0.75" />
          <path
            d="M13 90 q-3 -45 44.5 -45 q47.5 0 44.5 45 q-22 8 -44.5 8 q-22.5 0 -44.5 -8 z"
            fill="#9BD9B4"
            stroke="#4C8A66"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="40" r="5.5" fill="#C9EDD4" />
          <circle cx="72" cy="34" r="3.8" fill="#C9EDD4" />
          <circle cx="54" cy="31" r="2.4" fill="#C9EDD4" />
          <text x="93" y="27" fontSize="9.5" fontWeight="800" fill="#5C7268" style={{ fontFamily: 'var(--font-num, sans-serif)' }}>
            Zz
          </text>
          {mood === 'full' && (
            <path d="M37 47 l12 4 M78 47 l-12 4" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          )}
          {eyes()}{mouth()}
        </>,
      )
    // XL-05 末班车梦游灵：抱站牌打瞌睡的小雾团
    case 'bus':
      return wrap(
        <>
          <path d="M88 26 v68" stroke="#93A89D" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="72" y="18" width="31" height="18" rx="4" fill="#1A2B26" stroke="#5C7268" strokeWidth="2.5" />
          <text x="87.5" y="30.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#8FE388">
            末班车
          </text>
          <path d="M76 33 h23" stroke="#E8A54A" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 64 q-8 7 -4 15" {...TENTACLE} strokeWidth={2.6} />
          <path
            d="M16 82 a15 15 0 0 1 6 -28 a18 18 0 0 1 32 -8 a17 17 0 0 1 24 12 a14 14 0 0 1 -3 24 q-29 8 -59 0 z"
            fill="#E7F0EA"
            stroke="#7FA793"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M28 88 q6 5 12 0 q6 5 12 0" stroke="#7FA793" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />
          <path d="M70 70 q11 6 19 1" stroke="#7FA793" strokeWidth="3" fill="none" strokeLinecap="round" />
          <text x="60" y="33" fontSize="9" fontWeight="800" fill="#5C7268" style={{ fontFamily: 'var(--font-num, sans-serif)' }}>
            Zz
          </text>
          {eyes()}{mouth()}
        </>,
      )
    // XL-000 收容物零号·「睡不着」：周末 BOSS，缠着绷带打哈欠的大眼团子
    case 'zero':
    default:
      return wrap(
        <>
          <path d="M19 68 q-10 5 -7 15" {...TENTACLE} />
          <path d="M96 68 q10 5 7 15" {...TENTACLE} />
          <ellipse cx="57.5" cy="62" rx="39" ry="36" fill="#EDF5EF" stroke="#5C8574" strokeWidth="3.5" />
          <path
            d="M66 27 q16 6 20 22 l-8.5 2.5 q-4 -13 -16 -18 z"
            fill="#F5EFE3"
            stroke="#C9B896"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="34" cy="30" r="6.5" fill="#F5EFE3" stroke="#C9B896" strokeWidth="2" />
          <circle cx="34" cy="30" r="2.4" fill="none" stroke="#C9B896" strokeWidth="1.6" />
          <ellipse cx="45" cy="64.5" rx="6" ry="3" fill="#93A89D" opacity="0.4" />
          <ellipse cx="70" cy="64.5" rx="6" ry="3" fill="#93A89D" opacity="0.4" />
          <path
            d="M20 84 q36 13 74 0 l1.5 8.5 q-38 12 -77 0 z"
            fill="#F5EFE3"
            stroke="#C9B896"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {mood === 'full' ? (
            <g fill={INK}>
              <circle cx="45" cy="56" r="6.5" />
              <circle cx="70" cy="56" r="6.5" />
              <circle cx="47.2" cy="53.4" r="2.2" fill="#fff" />
              <circle cx="72.2" cy="53.4" r="2.2" fill="#fff" />
              <circle cx="43.2" cy="58.4" r="1" fill="#fff" />
              <circle cx="68.2" cy="58.4" r="1" fill="#fff" />
            </g>
          ) : (
            eyes()
          )}
          {mood === 'full' ? (
            <g>
              <ellipse cx="57.5" cy="75" rx="6.5" ry="7.5" fill="#7A3A2E" />
              <ellipse cx="57.5" cy="78.5" rx="3.5" ry="2.8" fill="#C97B62" />
              <path d="M51.5 70.6 l2.4 4.4 l2.4 -4.4 z" fill="#fff" />
              <path d="M61.2 70.6 l2.4 4.4 l2.4 -4.4 z" fill="#fff" />
            </g>
          ) : (
            mouth()
          )}
        </>,
      )
  }
}
