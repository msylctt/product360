/** 2026-11-05 数仓只读拉取，商品 SKU BP265-NR71BA。缺的字段保持空，页面显示未接入。 */

export const AS_OF = "2026-11-05";
export const SALES_WINDOW = "2026-10-06 至 2026-11-04";

export const product = {
  skuCode: "BP265-NR71BA",
  skuName: "Momcozy可穿戴式吸奶器 M9-新版 豆沙色 双只装 US",
  spuCode: "SPU000168",
  spuName: "M9吸奶器",
  spuNameEn: "Mobile Flow™ Hands-Free Breast Pump | M9",
  brand: "Momcozy",
  color: "豆沙色",
  pack: "双只装",
  state: "在销售",
  suggestPrice: "269.99 USD",
  size: "28 × 19 × 15.5 cm",
  weight: "1.698 kg",
  cartonNum: 12,
  scm: [
    { code: "BP265-NR71BA-A", supplier: "东莞长城开发 CC0820", price: "280.60 CNY" },
    { code: "BP265-NR71BA-B", supplier: "东莞蓝创捷特佳电子 BOI20240710", price: "280.60 CNY" },
  ],
  hero: "https://m.media-amazon.com/images/I/617IWrNbRFL.jpg",
  masterImage: "公司主图是 Excel DISPIMG 公式，不能打开",
};

export type Channel = {
  platform: string;
  market: string;
  shop: string;
  saleSku: string;
  externalId: string;
  title: string;
  price: string;
  status: string;
  link: string | null;
  note: string;
  bind: "本 SKU" | "相邻 SKU" | "价格冲突";
};

export const channels: Channel[] = [
  {
    platform: "Amazon",
    market: "US",
    shop: "root_hk_US",
    saleSku: "RT-US-M9NEW-B",
    externalId: "B0DTYSLFLX",
    title: "Momcozy Wearable Breast Pump M9, Hospital Grade Medical App-Controlled Hands-Free Electric Breast Pump Red 2 Count",
    price: "269.99 USD",
    status: "BUYABLE, DISCOVERABLE",
    link: null,
    note: "在线商品表没有这条的页面链接。同 ASIN 的 conglin_US / CL-US-M9NW-Pink2 也是 269.99 USD，状态 DISCOVERABLE。",
    bind: "本 SKU",
  },
  {
    platform: "Walmart",
    market: "US",
    shop: "Momcozy_Choice",
    saleSku: "WM-MC-US-01-BP223-NR71BA",
    externalId: "5468700454",
    title: "Momcozy M9 Breast Pump Hands Free Mobile Flow, App Discreet Wearable Breast Pump M9, Control Personalized 2 Pack, Cozy Red",
    price: "242.99 USD",
    status: "PUBLISHED",
    link: "https://www.walmart.com/ip/Momcozy M9 Breast Pump Hands Free Mobile Flow, App Discreet Wearable Breast Pump M9, Control Personalized 2 Pack, Cozy Red/5468700454",
    note: "店铺 SKU 文字里嵌着 BP223，美国站映射仍落到 BP265-NR71BA。不能按字符串里的编码去认商品。",
    bind: "本 SKU",
  },
  {
    platform: "独立站",
    market: "US",
    shop: "shopifymomcozy_US",
    saleSku: "BP266-NR71BA-A",
    externalId: "43846410830022",
    title: "Momcozy Mobile Flow™ Hands-Free Breast Pump | M9 · Double / Cozy Red",
    price: "变体表 269.99 USD",
    status: "active",
    link: "https://momcozy.com/products/momcozy-mobile-flow-hands-free-breast-pump?variant=43846410830022",
    note: "维表映回 BP266-NR71BA，不是 BP265。句柄表同一变体价格是 228.99 USD。",
    bind: "相邻 SKU",
  },
];

export type Asset = {
  id: string;
  platform: "Amazon" | "Walmart" | "独立站";
  kind: string;
  url: string;
  usedAt: string[];
};

export const assets: Asset[] = [
  {
    id: "amz-main",
    platform: "Amazon",
    kind: "主图",
    url: "https://m.media-amazon.com/images/I/617IWrNbRFL.jpg",
    usedAt: ["Amazon 美国站 ASIN B0DTYSLFLX", "店铺 root_hk_US / RT-US-M9NEW-B"],
  },
  {
    id: "amz-pt01",
    platform: "Amazon",
    kind: "附图 PT01",
    url: "https://m.media-amazon.com/images/I/71pCVlDc3UL.jpg",
    usedAt: ["Amazon 目录 ASIN B0DTYSLFLX"],
  },
  {
    id: "amz-pt02",
    platform: "Amazon",
    kind: "附图 PT02",
    url: "https://m.media-amazon.com/images/I/61niYqXmviL.jpg",
    usedAt: ["Amazon 目录 ASIN B0DTYSLFLX"],
  },
  {
    id: "amz-pt03",
    platform: "Amazon",
    kind: "附图 PT03",
    url: "https://m.media-amazon.com/images/I/61kMe4DTilL.jpg",
    usedAt: ["Amazon 目录 ASIN B0DTYSLFLX"],
  },
  {
    id: "amz-pt04",
    platform: "Amazon",
    kind: "附图 PT04",
    url: "https://m.media-amazon.com/images/I/716l7OqebML.jpg",
    usedAt: ["Amazon 目录 ASIN B0DTYSLFLX"],
  },
  {
    id: "wmt-main",
    platform: "Walmart",
    kind: "主图",
    url: "https://i5.walmartimages.com/asr/a6d51c0d-b43e-4ae3-a4fc-b5d8bf3f369d.033db739ffb355e731a3369911193ef2.png",
    usedAt: ["Walmart 美国站 Item 5468700454", "店铺 Momcozy_Choice"],
  },
  {
    id: "shopify-main",
    platform: "独立站",
    kind: "主图 · 相邻 SKU",
    url: "https://cdn.shopify.com/s/files/1/0559/2321/2486/files/MomcozyMoblieFlow_BreastPump_7.jpg?v=1776163451",
    usedAt: ["独立站商品 8189195354310", "SKU 是 BP266-NR71BA，不是这条 BP265"],
  },
];

export const sales = [
  { platform: "亚马逊", qty: 1222, amount: "259,591.67 USD" },
  { platform: "TikTok", qty: 160, amount: "42,795.10 USD" },
  { platform: "线下-新平台", qty: 121, amount: "66,767.95 USD" },
  { platform: "线下", qty: 22, amount: "2,433.37 USD" },
];

export const stock = [
  { channel: "Amazon", country: "US", warehouse: "平台仓", onHand: 2219, inbound: 360 },
  { channel: "Walmart", country: "US", warehouse: "海外仓", onHand: 2148, inbound: 0 },
];

export type ProgressRow = {
  module: "master" | "channels" | "assets" | "external";
  name: string;
  done: string[];
  gap: string[];
  href: string;
};

export const progress: ProgressRow[] = [
  {
    module: "master",
    name: "公司商品主数据",
    done: ["主档 1/1：名称、包装、建议价", "供应链编码 2 个"],
    gap: ["样例变体表里没有这一只", "公司主图只有 Excel 公式"],
    href: "master#m9-sku",
  },
  {
    module: "channels",
    name: "商品全渠道信息",
    done: ["Amazon 页面 11/13 个店铺 SKU 组合", "Walmart 页面 3/3"],
    gap: ["独立站页面属于相邻 SKU BP266", "TikTok 未接入"],
    href: "channels#m9-matrix",
  },
  {
    module: "assets",
    name: "商品素材中心",
    done: ["渠道图 7 张", "设计任务附件 63 个（只有 oss key）"],
    gap: ["Walmart 图片 1/3", "说明书、商品视频未接入"],
    href: "assets?group=missing#m9-missing",
  },
  {
    module: "external",
    name: "商品外部信息",
    done: ["评论 4/7 个 ASIN 有", "工单 2/3 个美国站店铺 SKU 有"],
    gap: ["没有竞品 ASIN 名单，竞品评论不接"],
    href: "external#m9-reviews",
  },
];

export const reviews = {
  asin: "B0DTYSLFLX",
  count: 214,
  tagged: 212,
  avg: 2.55,
  factors: [
    { tag: "不耐用", count: 69 },
    { tag: "质量差", count: 56 },
    { tag: "吸力不足", count: 27 },
    { tag: "泵奶功能好", count: 24 },
    { tag: "产品缺陷", count: 21 },
    { tag: "性价比低", count: 20 },
  ],
  excerpts: [
    { rating: 3, date: "2026-10-05", text: "还行吧。出奶量不错。但从五月底开始用，法兰已经换了 6 次。把法兰和集乳器拆开的卡扣不好用。" },
    { rating: 2, date: "2026-09-28", text: "用手动吸奶器吸出的奶都比这款多。不推荐。" },
    { rating: 1, date: "2026-09-22", text: "配件每 2 到 4 个月就要换，塑料件容易坏，吸力也不够。最后还是得用手动或 Spectra。" },
  ],
};

export const competitivePrice = {
  shop: "root_hk_MX",
  market: "墨西哥",
  amount: "5,399.80 MXN",
  was: "4,279.78 MXN",
  note: "这是墨西哥店的竞争价快照，不是美国站成交价，也不能和 269.99 USD 放在一起比较。相似商品列表这次是空的。",
};

export const siteCopy = {
  sku: "BP266-NR71BA",
  text: "独立站正文把 M9 写成可穿戴、免手持、能放进哺乳文胸里的吸奶器。没有清洗步骤。",
};

export const tickets = [
  { saleSku: "RT-US-M9NEW-Pink2", rows: 683, note: "ASIN 全是 B0DTYSLFLX" },
  { saleSku: "RT-US-M9NEW-B", rows: 155, note: "同一产品 SKU 的另一个店铺 SKU" },
  { saleSku: "CL-US-M9NW-Pink2", rows: 0, note: "工单表没有这个店铺 SKU" },
];

export const missingAssets = [
  { name: "公司主图", reason: "商品中心有这个字段，值是 Excel 的 DISPIMG 公式，打不开。" },
  { name: "说明书", reason: "商品物料表里 BP265-NR71BA 和 SPU000168 都是 0 行。" },
  { name: "商品视频", reason: "渠道页没有接视频。设计任务里有两个 mp4，文件名像社媒下载，没写用途。" },
];

/** [设计任务编码, 文件名, oss key 尾段]；oss key 前缀都是 C00000001/fileCenter/ */
const designFileRows: Array<[string, string, string]> = [
  ["DT2024060417061822784461", "11.jpg", "66631a2c60b27e0e0e799932.jpg"],
  ["DT2024060417061822784461", "画板 1 拷贝.jpg", "66631a2ae4b0827c50c72ee5.jpg"],
  ["DT2024061417490516621961", "2271718885809_.pic.jpg", "66751842e4b065da9d7b3e25.jpg"],
  ["DT2024061417490516621961", "M9吸奶器上线锁屏壁纸文案及要求.docm", "6670e4a960b2fc998d85cac4.docm"],
  ["DT2024080211593692945260", "42a490533beea806e6d39fcad4ca3af4.png", "6851558be4b03f4342f84aca.png"],
  ["DT2024080211593692945260", "工业设计——设计输入模板_M7A&M10.xlsx", "66ac594ada14e90b4f5b2218.xlsx"],
  ["DT2024080817134369548121", "@glamour_girlz_usa2_musicaldown.com_1723107262.mp4", "66b48b87e4b0a0739dfa3d38.mp4"],
  ["DT2024080817152699163718", "@glamour_girlz_usa2_musicaldown.com_1723107262.mp4", "66b48c78da146eca7cdb9bda.mp4"],
  ["DT2024081319105130091014", "EDM手动邮件策划.xlsx", "66bb3ef4da14464756a07d11.xlsx"],
  ["DT2024081616075933228578", "M9套图优化-20240815.xlsx", "66bf08afe4b04efb10def652.xlsx"],
  ["DT2024082111080776021801", "lQDPKeHPKRtXJAPNEEjNAliwc2LNjxmlBakGtkip6EW3AA_600_4168.jpg", "66cd7cece4b071f14d225d22.jpg"],
  ["DT2024082718350290873227", "2024_6_25_momcozy托腹带_广州upstairs_1128.jpg", "66cdab9fda147850a3982b23.jpg"],
  ["DT2024082718350290873227", "图需尺寸调整.JPG", "66cdab94da147850a3982b22.JPG"],
  ["DT2024103109260154511015", "M9单独售卖配件（全套奶碗+防尘盖）彩盒刀线VER1.pdf", "67235b21e4b02d0a2c092e0a.pdf"],
  ["DT2024103109260154511015", "momcozyM9单独售卖配件彩盒20240418A1(转曲).pdf", "6722dc86e4b02d0a2c092da4.pdf"],
  ["DT2024103109260154511015", "momcozyM9单独售卖配件彩盒20240418A1(转曲)2.ai", "6722dca6e4b02d0a2c092da5.ai"],
  ["DT2024103109260154511015", "momcozyM9单独售卖配件彩盒20240418A1(转曲)2.ai", "672359e8e4b02d0a2c092e08.ai"],
  ["DT2024111515143985492082", "17国语言营销卖点文件.xlsx", "6736f3d2da142fcb6c0787e5.xlsx"],
  ["DT2025010915293447135473", "M9&M6吸奶器图片优化需求.xlsx", "677f7ac1da14c8d4358316e7.xlsx"],
  ["DT2025012011270522842877", "M9页面需求.xlsx", "678dc274e4b073ef54fedeca.xlsx"],
  ["DT2025031309472528407572", "3.jpg", "67dd5cc8e4b0bb1ecb8e5bde.jpg"],
  ["DT2025031309472528407572", "313.jpg", "67dd5cc8e4b044e5b8d7e8fe.jpg"],
  ["DT2025031309472528407572", "用户场景素材设计小语种12001200.jpg", "67dd5cc8e4b044e5b8d7e8ff.jpg"],
  ["DT2025031309472528407572", "用户场景素材设计小语种1200628.jpg", "67dd5cc8e4b0bb1ecb8e5bdf.jpg"],
  ["DT2025031309472528407572", "用户场景素材设计小语种9601200.jpg", "67dd5cc8e4b044e5b8d7e8fd.jpg"],
  ["DT2025031309472528407572", "用户场景素材设计需求-小语种.xlsx", "67d15f47e4b07cc257cb3b74.xlsx"],
  ["DT2025032016443208857989", "奖章-设计需求.xlsx", "67dbd3bde4b0278dc81cc205.xlsx"],
  ["DT2025032016443208857989", "產品lbp獎章圖-20250325(1).pdf", "67e3552ee4b06549911f9b78.pdf"],
  ["DT2025040310331195736255", "M9_Scene_9.jpg", "67edf325e4b08c22a7f3e0eb.jpg"],
  ["DT2025050915174454854648", "M9亚马逊套图.png", "681dac14e4b04af58822b09c.png"],
  ["DT2025050915174454854648", "M9卖点海报 1920_1080px-1.png", "6822ecdee4b0858b2a9d7282.png"],
  ["DT2025050915174454854648", "M9卖点海报 1920_1080px-2.png", "6822ecdee4b0858b2a9d7283.png"],
  ["DT2025050915174454854648", "M9卖点海报 1920_1080px-3.png", "6822ecdee4b0858b2a9d7281.png"],
  ["DT2025050915174454854648", "M9卖点海报 1920_1080px-4.png", "6822ecdee4b0783d2db0b9bc.png"],
  ["DT2025050915174454854648", "M9卖点海报 1920_1080px-5.png", "6822ecdee4b0783d2db0b9bd.png"],
  ["DT2025050915174454854648", "M9卖点海报 1920_1080px-6.png", "6822ecdee4b0858b2a9d7284.png"],
  ["DT2025050915174454854648", "M9卖点海报 1920_1080px.png", "6822ecdee4b0783d2db0b9bb.png"],
  ["DT2025071411492697172074", "内衣集合页框架.xlsx", "68747dede4b089114bf1a68a.xlsx"],
  ["DT2025080412220765446185", "1.jpg", "68ad90dee4b0e0deec88c8b6.jpg"],
  ["DT2025080412220765446185", "1.jpg", "68ad90d9e4b09f9501901bc0.jpg"],
  ["DT2025080412220765446185", "1.jpg", "68ad90d2e4b0e0deec88c8b4.jpg"],
  ["DT2025080412220765446185", "2.jpg", "68ad90d9e4b0e0deec88c8b5.jpg"],
  ["DT2025080412220765446185", "2.jpg", "68ad90dee4b09f9501901bc2.jpg"],
  ["DT2025080412220765446185", "2.jpg", "68ad90d2e4b09f9501901bbf.jpg"],
  ["DT2025080412220765446185", "3.jpg", "68ad90dee4b09f9501901bc3.jpg"],
  ["DT2025080412220765446185", "3.jpg", "68ad90d9e4b09f9501901bc1.jpg"],
  ["DT2025080412220765446185", "3.jpg", "68ad90d2e4b09f9501901bbe.jpg"],
  ["DT2025080412220765446185", "Q3产品媒体图需 (1).xlsx", "689034bae4b01eb8efdb07d8.xlsx"],
  ["DT2025090811471899412676", "设计需求 Registration Form for Graphic Design Requirements  Ads BebeRoyal magazine.xlsx", "68be5168e4b0c87c789bf17b.xlsx"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片1 1201_1201.jpg", "692e3f59e4b0bf9b82b97d70.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片10 1201_1201.jpg", "692e3fbde4b0c4016d3b1846.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片2 1201_1201.jpg", "692e3f59e4b0bf9b82b97d6f.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片3 1201_1201.jpg", "692e3f59e4b0c4016d3b1843.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片4 1201_1201.jpg", "692e3f59e4b0c4016d3b1841.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片5 1201_1201.jpg", "692e3f59e4b0c4016d3b1842.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片6 1201_1201.jpg", "692e3fbde4b0bf9b82b97d71.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片7 1201_1201.jpg", "692e3fbde4b0c4016d3b1844.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片8 1201_1201.jpg", "692e3fbde4b0c4016d3b1845.jpg"],
  ["DT2025103114315255926408", "11.12 吸奶器黑五广告图片9 1201_1201.jpg", "692e3fbde4b0bf9b82b97d72.jpg"],
  ["DT2025103114315255926408", "黑五大促吸奶器项目素材需求.xlsx", "69045722e4b05dd76ef7ed5f.xlsx"],
  ["DT2026030412170590175591", "欧洲_线下渠道_平面设计brief_260304.xlsx", "69a7b193e4b08266e354e391.xlsx"],
  ["DT2026030412170590175591", "欧洲线下门店易拉宝转曲_800*2000mm_20260306.pdf", "69aaae33e4b0ab06ce0088f8.pdf"],
  ["DT2026031311045887603558", "中国区线下陈列展架设计方案0108.pptx", "69b8d90de4b08476b95e21f2.pptx"],
];

export type DesignFileKind = "图片" | "文档表格" | "设计源文件" | "视频";

function fileKind(name: string): DesignFileKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png"].includes(ext)) return "图片";
  if (["ai", "psd"].includes(ext)) return "设计源文件";
  if (ext === "mp4") return "视频";
  return "文档表格";
}

export type DesignFile = {
  taskCode: string;
  taskDate: string;
  fileName: string;
  kind: DesignFileKind;
  ossKey: string;
};

export const designFiles: DesignFile[] = designFileRows.map(([taskCode, fileName, key]) => ({
  taskCode,
  taskDate: `${taskCode.slice(2, 6)}-${taskCode.slice(6, 8)}-${taskCode.slice(8, 10)}`,
  fileName,
  kind: fileKind(key),
  ossKey: `C00000001/fileCenter/${key}`,
}));

export const designTaskCount = new Set(designFileRows.map(([taskCode]) => taskCode)).size;

export type AnswerLink = {
  label: string;
  module: "master" | "channels" | "assets" | "external";
  target: string;
};

export type Answer = {
  q: string;
  status: "已核对" | "无法确认" | "资料冲突";
  text: string;
  source: string;
  links?: AnswerLink[];
};

export const answers: Answer[] = [
  {
    q: "包装里有几只？",
    status: "已核对",
    text: "主档包装是双只装，商品名也写着双只装。没有说明书原件，不能指到某一页。",
    source: "lute_edw.dim_pd_sku_info_df.sku_pack · 2026-11-05",
    links: [{ label: "主数据 · BP265 这一行", module: "master", target: "m9-sku" }],
  },
  {
    q: "美国站现在卖多少钱？",
    status: "资料冲突",
    text: "Amazon root_hk_US 这条是 269.99 USD。Walmart 美国站是 242.99 USD。独立站变体表是 269.99 USD，句柄表同一变体是 228.99 USD，而且商品编码是 BP266，不是这一条。",
    source: "Amazon 在线商品、Walmart item、Shopify 变体表与句柄表",
    links: [{ label: "全渠道对照 · 当前价格", module: "channels", target: "m9-price" }],
  },
  {
    q: "这只吸奶器评论怎么样？",
    status: "已核对",
    text: "只看 ASIN B0DTYSLFLX：214 条评论，均分 2.55。212 条有体验标签，提得最多的是不耐用 69 次、质量差 56 次、吸力不足 27 次，也有 24 次说泵奶功能好。独立站 Okendo 属于 BP266，不算进来。",
    source: "lute_edw.dws_cs_voc_nps_review_df · ASIN B0DTYSLFLX",
    links: [{ label: "外部信息 · 这条 ASIN 的评论", module: "external", target: "m9-reviews" }],
  },
  {
    q: "说明书里怎么清洗？",
    status: "无法确认",
    text: "没有说明书文件，不能编清洗步骤。独立站正文只说它是可穿戴、免手持的吸奶器，而且那一页属于 BP266。",
    source: "没有说明书文件。独立站 body_html 只介绍产品，且属于 BP266",
    links: [
      { label: "素材 · 缺的资料", module: "assets", target: "m9-missing" },
      { label: "全渠道对照 · 独立站列", module: "channels", target: "m9-matrix" },
    ],
  },
];
