import { useQuery } from "@tanstack/react-query";
import { Alert } from "antd";
import { Link, useParams } from "react-router-dom";
import { fetchOverview } from "../api/client";
import { M9_SPU, M9OverviewSupplement } from "../components/M9Supplement";
import { SectionCard } from "../components/SectionCard";

export function OverviewPage() {
  const { spu = "" } = useParams();
  const query = useQuery({
    queryKey: ["overview", spu],
    queryFn: () => fetchOverview(spu),
    enabled: Boolean(spu),
    retry: false,
  });

  if (query.isError) {
    return <Alert type="error" showIcon message="总览加载失败" description="商品不存在或没有查看权限。" />;
  }

  const data = query.data;
  const ready = (data?.fields ?? []).filter((item) => item.field.status === "ready" || item.field.status === "delayed").length;
  const fieldCount = data?.fields.length ?? 0;

  const sampleLine = data
    ? `样例导出里有 ${data.variantsMeta.total} 个变体，主档字段有值 ${ready}/${fieldCount}。`
    : "";

  if (spu === M9_SPU) {
    return (
      <div className="page-stack">
        <M9OverviewSupplement />
        <p className="section-note">
          {sampleLine}变体明细在<Link to={`/products/${spu}/master`}>公司商品主数据</Link>。
        </p>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <SectionCard title="资料到哪一步" loading={query.isLoading}>
        <p>{sampleLine}</p>
        <p className="section-note">
          这个商品还没有按渠道页面、素材和评论逐键核对，所以这里不列完整率。M9吸奶器有一只 SKU 做完了核对，可以拿来对照。
        </p>
        <Link to={`/products/${spu}/master`}>去看主数据和变体</Link>
      </SectionCard>
    </div>
  );
}
