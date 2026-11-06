---
target: 商品详情工作台 ProductLayout
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/lute/Downloads/product360/apps/web/src/pages/ProductLayout.tsx"
target_fingerprint: "sha256:e3e63c53877fd7dfd618c60d11254559be13f8d5408fca0aba445b9f55f3de33"
target_path: /Users/lute/Downloads/product360/apps/web/src/pages/ProductLayout.tsx
timestamp: 2026-11-06T09-18-59Z
slug: apps-web-src-pages-productlayout-tsx
---
Method: dual-agent (A: 065eda70-9f58-44b1-a658-452f5524e19f · B: a68c8f67-6f5c-47ee-9c13-0c69ba73ace7)

# 商品详情工作台设计走查

目标：apps/web/src/pages/ProductLayout.tsx，对照 docs/20261026 原型图。模式 Operate。检测器对 12 个 tsx 退出码 0，无命中。浏览器覆盖层未注入：新开标签停在登录页，按约定没有填密码。

## 设计特异性

骨架是给这个商品中心的：左导航六个模块、商品头、缺数停住。视觉仍是通用白卡片。页头曾把整只 SPU 说成 BP265 一只。

## Nielsen

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | 模块有高亮，字段有日期。问商品命中后原先不标明答的是哪句。 |
| 2 | Match System / Real World | 2 | 页头用一只 SKU 代表 31 个变体。 |
| 3 | User Control and Freedom | 2 | 未选商品时侧栏会跳进写死的 SPU000168。 |
| 4 | Consistency and Standards | 2 | 销量、星级、工单各有两套。 |
| 5 | Error Prevention | 2 | 缺资料会停。自由提问曾用前四字误匹配。 |
| 6 | Recognition Rather Than Recall | 2 | 核对 SKU 不在变体第一页。 |
| 7 | Flexibility and Efficiency | 1 | 长表没有搜索。 |
| 8 | Aesthetic and Minimalist Design | 2 | 同一屏两本账，重量接近。 |
| 9 | Error Recovery | 2 | 对不上之后没有交给负责人。 |
| 10 | Help and Documentation | 2 | 副标题在解释口径，库表条件仍出现在界面上。 |
| **Total** | | **20/40** | 可接受，离好用还差一截 |

## 优先问题

P1 页头把一族商品说成一只 SKU。
P1 同一屏多套销量、星级、工单。
P1 外部信息和渠道各叠两本账。
P2 素材还不是按「能打开 / 只有 key / 未接入」分组。
P2 问商品自由输入会答偏。

## 人设

运营分不清哪套销售额能报。内容岗在素材页看不到 63 个设计文件名。客服问价格可能得到评论答案。
