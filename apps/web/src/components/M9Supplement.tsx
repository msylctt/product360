import { useMemo, useState } from "react";
import { Button, Image, Input, Segmented, Table, Tag, Typography } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { SectionCard } from "./SectionCard";
import {
  AS_OF,
  SALES_WINDOW,
  answers,
  assets,
  channels,
  competitivePrice,
  designFiles,
  designTaskCount,
  missingAssets,
  product,
  progress,
  reviews,
  sales,
  stock,
  tickets,
  type Answer,
  type AnswerLink,
  type Asset,
  type DesignFile,
  type DesignFileKind,
  type ProgressRow,
} from "../mvp/m9Fixture";

export { product };
export const M9_SPU = product.spuCode;
export const M9_SKU = product.skuCode;
export const M9_HERO = product.hero;

function StatusTag({ value }: { value: string }) {
  const color = value === "已核对" || value === "本 SKU" ? "green" : value === "无法确认" ? "default" : "orange";
  return <Tag color={color}>{value}</Tag>;
}

export function M9OverviewSupplement() {
  return (
    <>
      <SectionCard
        flush
        title={`${product.skuCode} 资料到哪一步`}
        subtitle={`数仓分区 ${AS_OF}。只核对了这一只，其他变体没有这层。`}
      >
        <Table<ProgressRow>
          size="small"
          pagination={false}
          rowKey="module"
          dataSource={progress}
          columns={[
            {
              title: "模块",
              dataIndex: "name",
              width: 160,
              render: (value: string, row) => <Link to={`/products/${product.spuCode}/${row.href}`}>{value}</Link>,
            },
            { title: "已核对", dataIndex: "done", render: (items: string[]) => <ul className="plain-list">{items.map((item) => <li key={item}>{item}</li>)}</ul> },
            {
              title: "还缺",
              dataIndex: "gap",
              render: (items: string[]) => (
                <ul className="plain-list plain-list--gap">{items.map((item) => <li key={item}>{item}</li>)}</ul>
              ),
            },
          ]}
        />
      </SectionCard>
      <div className="detail-grid">
        <SectionCard title="这一只的销量" subtitle={`数仓 · ${SALES_WINDOW}`}>
          <Table
            size="small"
            pagination={false}
            rowKey="platform"
            dataSource={sales}
            columns={[
              { title: "平台", dataIndex: "platform" },
              { title: "销量", dataIndex: "qty", align: "right", render: (value: number) => <span className="num">{value}</span> },
              { title: "销售额", dataIndex: "amount", align: "right" },
            ]}
          />
        </SectionCard>
        <SectionCard title="这一只的库存" subtitle="数仓 · 按渠道和国家加总，不是单个仓库">
          <Table
            size="small"
            pagination={false}
            rowKey={(row) => `${row.channel}-${row.warehouse}`}
            dataSource={stock}
            columns={[
              { title: "渠道", dataIndex: "channel" },
              { title: "国家", dataIndex: "country" },
              { title: "仓型", dataIndex: "warehouse" },
              { title: "在库", dataIndex: "onHand", align: "right", render: (value: number) => <span className="num">{value}</span> },
              { title: "在途", dataIndex: "inbound", align: "right", render: (value: number) => <span className="num">{value}</span> },
            ]}
          />
        </SectionCard>
      </div>
    </>
  );
}

export function M9ChannelSupplement() {
  const columns = [
    { key: "shopify", name: "独立站", market: "US" },
    { key: "amazon", name: "Amazon", market: "US" },
    { key: "walmart", name: "Walmart", market: "US" },
    { key: "tiktok", name: "TikTok Shop", market: "" },
  ];
  const byPlatform = Object.fromEntries(channels.map((item) => [item.platform, item]));
  const cell = (platform: string) => byPlatform[platform];
  const rows: Array<[string, (platform: string) => string, string?]> = [
    ["当前价格", (platform) => cell(platform)?.price ?? "未接入", "m9-price"],
    ["店铺 SKU", (platform) => cell(platform)?.saleSku ?? "未接入"],
    ["外部编号", (platform) => cell(platform)?.externalId ?? "未接入"],
    ["状态", (platform) => cell(platform)?.status ?? "未接入"],
    ["归属", (platform) => cell(platform)?.bind ?? "未接入"],
  ];

  return (
    <>
      <SectionCard id="m9-matrix" title="商品全渠道对照" subtitle="只填已经核对的列。TikTok 没有挂到这条 SKU 的页面。">
        <div className="matrix-scroll">
        <table className="proto-matrix">
          <thead>
            <tr>
              <th>维度</th>
              {columns.map((column) => (
                <th key={column.key}>{column.market ? `${column.name} · ${column.market}` : column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>商品标题</td>
              {columns.map((column) => <td key={column.key}>{cell(column.name)?.title ?? "未接入"}</td>)}
            </tr>
            {rows.map(([label, pick, rowId]) => (
              <tr key={label} id={rowId}>
                <td>{label}</td>
                {columns.map((column) => <td key={column.key}>{pick(column.name)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <p className="section-note" style={{ marginTop: 12 }}>
          {competitivePrice.market}店 {competitivePrice.shop} 的竞争价是 {competitivePrice.amount}，划线价 {competitivePrice.was}。{competitivePrice.note}
        </p>
      </SectionCard>
    </>
  );
}

type AssetGroup = "open" | "files" | "missing";
const ASSET_GROUPS: AssetGroup[] = ["open", "files", "missing"];

export function M9AssetBoard() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("group");
  const group: AssetGroup = ASSET_GROUPS.includes(raw as AssetGroup) ? (raw as AssetGroup) : "open";

  return (
    <div className="page-stack">
      <div className="scope-bar">
        <span>按能不能打开分三组。渠道图来自页面，设计文件来自设计任务，两边没有对应关系。</span>
        <Segmented
          value={group}
          onChange={(value) => setParams({ group: String(value) }, { replace: true })}
          options={[
            { value: "open", label: `能打开 ${assets.length}` },
            { value: "files", label: `只有文件 key ${designFiles.length}` },
            { value: "missing", label: `缺的 ${missingAssets.length}` },
          ]}
        />
      </div>
      {group === "open" ? <OpenAssets /> : null}
      {group === "files" ? <DesignFiles /> : null}
      {group === "missing" ? (
        <SectionCard id="m9-missing" title="缺的资料" subtitle="这些不补占位图，也不按商品名生成">
          <ul className="missing-list">
            {missingAssets.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.reason}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      ) : null}
    </div>
  );
}

const FILE_KINDS: Array<"全部" | DesignFileKind> = ["全部", "图片", "文档表格", "设计源文件", "视频"];

function DesignFiles() {
  const [kind, setKind] = useState<(typeof FILE_KINDS)[number]>("全部");
  const [keyword, setKeyword] = useState("");
  const rows = useMemo(() => {
    const text = keyword.trim().toLowerCase();
    return designFiles.filter(
      (item) =>
        (kind === "全部" || item.kind === kind) &&
        (!text || item.fileName.toLowerCase().includes(text) || item.taskCode.toLowerCase().includes(text)),
    );
  }, [kind, keyword]);

  return (
    <SectionCard
      flush
      title="设计任务附件"
      subtitle={`${designTaskCount} 个设计任务挂在 ${product.spuCode} 上，共 ${designFiles.length} 个文件`}
      extra={
        <div className="toolbar-inline">
          <Input.Search
            allowClear
            size="small"
            placeholder="文件名或任务编码"
            style={{ width: 200 }}
            onSearch={setKeyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <Segmented size="small" options={FILE_KINDS} value={kind} onChange={(value) => setKind(value as typeof kind)} />
        </div>
      }
    >
      <p className="section-note design-files__note">
        oss key 不是网址，要到对象存储按 key 取文件，这里不做预览。任务挂的是整只 SPU，有些文件名看着是别的商品（托腹带、M7A&amp;M10、内衣集合页），没有删，也没有算到 {product.skuCode}。
      </p>
      <Table<DesignFile>
        size="small"
        rowKey="ossKey"
        tableLayout="fixed"
        dataSource={rows}
        pagination={{ defaultPageSize: 20, showSizeChanger: false, showTotal: (total) => `${total} 个`, style: { paddingRight: 16 } }}
        columns={[
          { title: "任务日期", dataIndex: "taskDate", width: 104, render: (value: string) => <span className="num">{value}</span> },
          { title: "文件名", dataIndex: "fileName", ellipsis: true },
          { title: "类型", dataIndex: "kind", width: 96, render: (value: DesignFileKind) => <Tag>{value}</Tag> },
          {
            title: "设计任务",
            dataIndex: "taskCode",
            width: 210,
            render: (value: string) => <Typography.Text className="mono-cell">{value}</Typography.Text>,
          },
          {
            title: "oss key",
            dataIndex: "ossKey",
            width: 220,
            render: (value: string) => (
              <Typography.Text className="mono-cell" copyable={{ text: value }} ellipsis={{ tooltip: value }}>
                {value.replace("C00000001/fileCenter/", "")}
              </Typography.Text>
            ),
          },
        ]}
      />
    </SectionCard>
  );
}

function OpenAssets() {
  const [platform, setPlatform] = useState<"全部" | "Amazon" | "Walmart" | "独立站">("全部");
  const [asset, setAsset] = useState<Asset | null>(null);
  const visibleAssets = useMemo(
    () => (platform === "全部" ? assets : assets.filter((item) => item.platform === platform)),
    [platform],
  );

  return (
    <div className="proto-ask">
      <SectionCard
        title="渠道页面上的图"
        subtitle={`${visibleAssets.length} 张`}
        extra={
          <Segmented
            size="small"
            options={["全部", "Amazon", "Walmart", "独立站"]}
            value={platform}
            onChange={(value) => setPlatform(value as typeof platform)}
          />
        }
      >
        <div className="section-note" style={{ marginBottom: 12 }}>
          独立站主图属于相邻 SKU BP266，不是这一只。
        </div>
        <div className="mvp-assets">
          {visibleAssets.map((item) => (
            <button key={item.id} type="button" className="mvp-asset" onClick={() => setAsset(item)}>
              <img src={item.url} alt={item.kind} />
              <span>{item.platform}</span>
              <strong>{item.kind}</strong>
            </button>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="使用位置">
        {asset ? (
          <>
            <Image src={asset.url} />
            <div style={{ marginTop: 12, fontWeight: 650 }}>{asset.platform} · {asset.kind}</div>
            <ul>
              {asset.usedAt.map((place) => <li key={place}>{place}</li>)}
            </ul>
          </>
        ) : (
          <p className="section-note">点左侧一张图，这里显示它用在哪个渠道页面。</p>
        )}
      </SectionCard>
    </div>
  );
}

function linkTo(link: AnswerLink) {
  const base = `/products/${product.spuCode}/${link.module}`;
  return link.module === "assets" ? `${base}?group=missing#${link.target}` : `${base}#${link.target}`;
}

export function M9Ask() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<{ asked: string; result: Answer } | null>(null);

  function ask(text: string) {
    const normalized = text.trim();
    if (!normalized) return;
    const exact = answers.find((item) => item.q === normalized);
    const byIntent =
      /几只|包装/.test(normalized) ? answers[0]
      : /多少钱|价格|卖多少/.test(normalized) ? answers[1]
      : /评论|口碑|评分/.test(normalized) ? answers[2]
      : /清洗|说明书/.test(normalized) ? answers[3]
      : null;
    setAnswer({
      asked: normalized,
      result: exact ?? byIntent ?? {
        q: normalized,
        status: "无法确认",
        text: "这句话对不上已核对的包装、价格、评论或说明书。不套用旁边的问题，也不生成结论。",
        source: "演示范围限于 BP265-NR71BA",
      },
    });
  }

  return (
    <div className="proto-ask">
      <SectionCard title="问这只商品" subtitle="演示。答案只来自已核对资料，缺少说明书时直接说明。">
      <div className="mvp-questions">
        {answers.map((item) => (
          <Button key={item.q} onClick={() => ask(item.q)}>{item.q}</Button>
        ))}
      </div>
      <Input.Search
        style={{ marginTop: 12, maxWidth: 560 }}
        placeholder="例如：说明书第几页写了清洗方法"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onSearch={(value) => ask(value.trim())}
        enterButton="提问"
      />
      {answer ? (
        <div className="mvp-answer" aria-live="polite">
          <StatusTag value={answer.result.status} />
          {answer.asked !== answer.result.q ? (
            <div className="section-note">你问的是「{answer.asked}」，按「{answer.result.q}」回答。</div>
          ) : null}
          <p>{answer.result.text}</p>
          <div className="section-note">来源：{answer.result.source}</div>
          {answer.result.links?.length ? (
            <div className="answer-links">
              {answer.result.links.map((link) => (
                <Link key={link.target} to={linkTo(link)}>去看 {link.label}</Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      </SectionCard>
      <SectionCard title="这次能回答的范围">
        <p>包装数量、美国站标价、这条 ASIN 的评论标签，以及独立站正文里有没有清洗步骤。每条答案都能跳回它用到的那一格。</p>
        <p className="section-note">不会根据商品名编造评分、BSR 或说明书页码。原型图里的那些数字，数仓没有对上的就不出现。</p>
      </SectionCard>
    </div>
  );
}

export function M9ExternalSupplement() {
  const top = reviews.factors[0]?.count ?? 1;
  return (
    <>
      <SectionCard id="m9-reviews" title="这条 ASIN 的评论" subtitle={`${reviews.asin} · ${reviews.count} 条 · 均分 ${reviews.avg}`}>
        <p className="section-note">{reviews.tagged} 条有体验标签。次数是标签被提到的次数，一条评论可以有多个标签。</p>
        <ul className="factor-list">
          {reviews.factors.map((item) => (
            <li key={item.tag}>
              <span>{item.tag}</span>
              <span className="factor-track"><span style={{ width: `${Math.round((item.count / top) * 100)}%` }} /></span>
              <span className="num">{item.count}</span>
            </li>
          ))}
        </ul>
        {reviews.excerpts.map((item) => (
          <p key={item.date}>
            <Tag>{item.rating} 星</Tag> <span className="section-note">{item.date} · 中文译文</span>
            <br />
            {item.text}
          </p>
        ))}
        <p className="section-note">评论原文链接是空的。下面样例口碑仍按整个 SPU 抽样，会混进别的 ASIN。</p>
      </SectionCard>
      <SectionCard title="工单分到这只双只装" subtitle="按店铺 SKU，不按整个 SPU">
        <Table
          size="small"
          pagination={false}
          rowKey="saleSku"
          dataSource={tickets}
          columns={[
            { title: "店铺 SKU", dataIndex: "saleSku" },
            { title: "行数", dataIndex: "rows", align: "right", render: (value: number) => <span className="num">{value}</span> },
            { title: "说明", dataIndex: "note" },
          ]}
        />
      </SectionCard>
    </>
  );
}
