import { motion } from 'framer-motion'

/** 守夜人小侦探：风衣+鸭舌帽+大手电，夜巡时举电筒照射（晚安收容所版） */
export const Captain = ({ attacking, size = 88 }: { attacking?: boolean; size?: number }) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    aria-hidden="true"
    animate={attacking ? { x: [0, 14, 10, 0], rotate: [0, -24, 12, 0] } : { x: 0, rotate: 0 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
    style={{ transformOrigin: '60% 60%' }}
  >
    {/* 大手电（夜巡时举起照射） */}
    <motion.g
      animate={attacking ? { rotate: [0, -70, 30, 0] } : { rotate: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{ transformOrigin: '72px 52px' }}
    >
      <path d="M63 4 L77 4 L74 18 L66 18 Z" fill="#8FE388" opacity={0.45} />
      <path d="M66 16 h12 l-2.5 6 h-7 z" fill="#F5EFE3" stroke="#8A5A00" strokeWidth="2" strokeLinejoin="round" />
      <rect x="67.5" y="13" width="9" height="3" rx="1.5" fill="#8FE388" />
      <rect x="69" y="22" width="6.5" height="32" rx="3" fill="#E8A54A" stroke="#8A5A00" strokeWidth="2" />
      <path d="M70.5 30 h4 M70.5 36 h4" stroke="#8A5A00" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="72.2" cy="27" r="1.6" fill="#8A5A00" />
    </motion.g>
    {/* 小皮靴 */}
    <rect x="40.5" y="90" width="8" height="7" rx="2.5" fill="#1A2B26" />
    <rect x="53.5" y="90" width="8" height="7" rx="2.5" fill="#1A2B26" />
    {/* 风衣 */}
    <path d="M32 56 q-10 22 0 38 l10 -3 h16 l10 3 q10 -16 0 -38 q-18 8 -36 0z" fill="#E8D9B0" stroke="#A08A5A" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M44 56 h13 l-6.5 12 z" fill="#DEEDE3" stroke="#7FA793" strokeWidth="2" strokeLinejoin="round" />
    <path d="M44 56 l7 9 l-3 6 M57 56 l-7 9 l3 6" stroke="#A08A5A" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <path d="M34 72 q20 5 37 0" stroke="#A08A5A" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="48.5" y="70" width="5" height="5" rx="1.2" fill="#E8A54A" stroke="#8A5A00" strokeWidth="1.4" />
    {/* 收容所徽章 */}
    <path d="M46 61 l4.5 1.5 v3.4 q0 3.2 -4.5 4.6 q-4.5 -1.4 -4.5 -4.6 v-3.4 z" fill="#2E7D6B" stroke="#1B584A" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M43.6 64.4 l1.7 1.7 3 -3" stroke="#8FE388" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* 左手：小放大镜 */}
    <path d="M30 62 q-6 10 -2 16" stroke="#A08A5A" strokeWidth="9.5" fill="none" strokeLinecap="round" />
    <path d="M30 62 q-6 10 -2 16" stroke="#E8D9B0" strokeWidth="6" fill="none" strokeLinecap="round" />
    <circle cx="28" cy="80" r="5" fill="rgba(143,227,136,0.3)" stroke="#1B584A" strokeWidth="2.2" />
    <path d="M31.5 83.5 L36 88" stroke="#1B584A" strokeWidth="2.5" strokeLinecap="round" />
    {/* 头 */}
    <circle cx="50" cy="38" r="15.5" fill="#FFE9CB" stroke="#C9955F" strokeWidth="2.6" />
    {/* 鸭舌帽 */}
    <path d="M35.5 36 a14.5 12 0 0 1 29 0 z" fill="#2E7D6B" stroke="#1B584A" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M64 33.5 q13 1 14 5.5 q-8 -1 -14 1 z" fill="#2E7D6B" stroke="#1B584A" strokeWidth="2.2" strokeLinejoin="round" />
    <circle cx="50" cy="24.5" r="2.2" fill="#E8A54A" stroke="#8A5A00" strokeWidth="1.2" />
    {/* 脸 */}
    <circle cx="44.5" cy="40" r="2.6" fill="#22332E" />
    <circle cx="55.5" cy="40" r="2.6" fill="#22332E" />
    <circle cx="45.5" cy="39" r="0.9" fill="#fff" />
    <circle cx="56.5" cy="39" r="0.9" fill="#fff" />
    <path d="M46.5 46 q3.5 3 7 0" stroke="#C9955F" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="40" cy="44.5" rx="3" ry="2" fill="#FFB9A3" opacity="0.8" />
    <ellipse cx="60" cy="44.5" rx="3" ry="2" fill="#FFB9A3" opacity="0.8" />
  </motion.svg>
)
