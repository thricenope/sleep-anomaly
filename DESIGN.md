---
name: 晚安收容所 SleepAnomaly
description: 诡异萌收容所主题的睡眠打卡设计系统
colors:
  bg: "#EFF5F0"
  bg-deep: "#DEEDE3"
  ink: "#22332E"
  ink-2: "#5C7268"
  ink-3: "#93A89D"
  card: "#FFFFFF"
  line: "#D8E6DC"
  line-strong: "#C2D6C9"
  eerie: "#2E7D6B"
  eerie-deep: "#1B584A"
  radium: "#8FE388"
  radium-deep: "#3D8B3F"
  amber: "#E8A54A"
  amber-deep: "#8A5A00"
  seal: "#B85C4A"
  night: "#1A2B26"
typography:
  display:
    fontFamily: "'ZCOOL QingKe HuangYou', 'PingFang SC', sans-serif"
  body:
    fontFamily: "ui-rounded, -apple-system, 'PingFang SC', sans-serif"
    fontSize: "15px"
  num:
    fontFamily: "'Baloo 2', sans-serif"
    fontWeight: 800
---

# Design System: 晚安收容所 SleepAnomaly

## Overview

**Creative North Star: 「档案馆档案纸 + 荧光贴纸的诡异萌」**

睡前布置结界，晨起收容夜里作乱的收容物，贴一页档案。档案纸淡青绿底 + 荧光绿（收容成功/印章）+ 琥珀（编号标签）+ 封蜡红（危险等级）。伪档案元素：项目编号、危险等级、收容措施——全部用搞笑口吻。**Q版诡异萌**：大眼睛、小獠牙、荧光小触手，可爱优先，绝不恐怖。

**Key Characteristics:**
- 结界预告 = 两项布置（上床时辰 / 手机安排），可兑现（契约生效 +3）
- 结界报告 = 五项晨起申报，收容强度=分数
- 收容档案：收容过的贴上档案页（编号+危险等级），未收容="资料缺失"
- 守夜资历 = 夜数节点链

## Art Direction

- Captain：Q版守夜人小侦探——风衣+鸭舌帽+大手电（收容时举电筒照射动画）
- 6 个收容物全手绘 SVG、参数化（lurk/hurt/contained 三态 + 剪影）：
  1. 屏妖·电子幽灵（XL-01，从手机里探头的小幽灵，WIFI 头饰）
  2. 数羊羊驼（XL-02，数羊数到崩溃的羊驼，头顶飘着"第 1024 只"）
  3. 冰箱怪·夜宵鼻祖（XL-03，半夜发光的小冰箱长了腿）
  4. 起床气史莱姆（XL-04，瘫成一滩的青绿史莱姆）
  5. 末班车梦游灵（XL-05，抱站牌打瞌睡的小雾团）
  6. BOSS 收容物零号·"睡不着"（XL-000，周末作乱，缠着绷带打哈欠的大眼团子）
- 收容卡：档案纸质感 + 收容进度条（荧光绿）+ 收容印章动画

## Copy Map（世界观词汇表）

| 通用 | 收容所化 |
|---|---|
| 出征/攻击 | 夜巡 / 收容 |
| 怪物血量 | 收容进度 |
| 击退/暴击 | 收容成功 / 档案标注「异常听话」 |
| 战败 | 收容失败（收容物溜了，冲你比耶） |
| 预告 | 结界布置 |
| 战报 | 结界报告 |
| 回廊（日历） | 档案日历（每格一晚） |
| 图鉴 | 收容档案 |
| 战功 | 功勋 |
| 公会 | 研究所（守夜统计） |
| 用户称呼 | 守夜人 |
| 言出必行 | 契约生效 |

## Views

1. 夜巡（主视图）：收容卡 + 结界报告五项 + 结界布置两项 + 实时收容强度 + 「夜巡！」
2. 档案日历：日历即档案，点任意晚补收容
3. 收容档案：6 收容物档案页网格
4. 功勋：守夜资历链 + 功勋墙
5. 研究所：大数字 + 14 日收容强度柱状图 + 月条 + 数据管理

## Do's and Don'ts

- **Do** 伪档案口吻搞笑化（"危险等级：馋""收容措施：一顿好觉"）。
- **Do** 评分规则与 sleep-raid 完全一致（含契约生效/深度好眠），仅文案换皮。
- **Don't** 恐怖、血腥、jump scare；诡异必须落在"萌"上。
- **Don't** 用 emoji 当控件图标（全部手绘 SVG；文案里可以）。
- **Don't** 出现羞辱性文案；收容失败=收容物卖萌逃跑。
