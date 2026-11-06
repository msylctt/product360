import { useQuery } from "@tanstack/react-query";
import { Alert, Tag } from "antd";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchOverview } from "../api/client";
import { M9_HERO, M9_SKU, M9_SPU, product as m9 } from "../components/M9Supplement";
import { DataValue, MetaLine } from "../components/DataValue";
import { useFocusTarget } from "../layout/useFocusTarget";

export function ProductLayout() {
  const { spu = "" } = useParams();
  useFocusTarget();
  const query = useQuery({
    queryKey: ["overview", spu],
    queryFn: () => fetchOverview(spu),
    enabled: Boolean(spu),
    retry: false,
  });
  const header = query.data?.header;
  const hero = spu === M9_SPU ? M9_HERO : header?.spuImage;
  const metrics = header?.metrics;
  const isM9 = spu === M9_SPU;

  return (
    <div className="page-stack">
      <Link to="/products" className="section-note">返回商品列表</Link>
      <section className="product-head-card">
        {query.isError ? (
          <Alert type="error" showIcon message="无法查看这个商品" description="商品不存在，或当前账号没有查看权限。" />
        ) : null}
        {header ? (
          <div className="product-head">
            <div className="product-head__identity">
              <div
                className="product-thumb product-thumb--lg"
                style={hero ? { backgroundImage: `url(${hero})`, backgroundSize: "cover" } : undefined}
              >
                {hero ? null : "无主图"}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.4 }}>
                  {header.spuName}
                  <Tag color="green" style={{ marginLeft: 8 }}>{header.spuStateLabel}</Tag>
                </div>
                <div className="proto-meta">
                  <span>SPU {header.spuCode}</span>
                  <span>品牌 {header.brandCode ?? "暂无"}</span>
                  <span>{header.categoryPath || "类目暂无"}</span>
                  {header.listingTime ? <span>上架 {header.listingTime.slice(0, 10)}</span> : null}
                </div>
                {isM9 ? (
                  <div className="section-note" style={{ marginTop: 6 }}>
                    当前核对的一只：{M9_SKU}，{m9.color}，{m9.pack}。这不是全部变体。
                  </div>
                ) : null}
                <div style={{ marginTop: 6 }}>
                  <MetaLine source={header.source} asOf={header.asOf} />
                </div>
              </div>
            </div>
            {metrics ? (
              <div className="head-side">
                <div className="head-side__caption">整只 SPU · 样例导出{isM9 ? "，和数仓里这一只的数不是一本账" : ""}</div>
                <div className="head-metrics">
                  <div className="head-stat">
                    <div className="head-stat__label">近 30 天销售额</div>
                    <div className="head-stat__value"><DataValue field={metrics.sales30dUsd} digits={2} prefix="$" /></div>
                  </div>
                  <div className="head-stat">
                    <div className="head-stat__label">星级</div>
                    <div className="head-stat__value"><DataValue field={metrics.ratingAvg} digits={2} /></div>
                  </div>
                  <div className="head-stat">
                    <div className="head-stat__label">SKU / 渠道</div>
                    <div className="head-stat__value num">
                      <DataValue field={metrics.skuCount} /> · <DataValue field={metrics.channelCount} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
      <Outlet />
    </div>
  );
}
