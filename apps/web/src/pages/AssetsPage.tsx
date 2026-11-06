import { Empty } from "antd";
import { useParams } from "react-router-dom";
import { M9_SPU, M9AssetBoard } from "../components/M9Supplement";
import { SectionCard } from "../components/SectionCard";

export function AssetsPage() {
  const { spu = "" } = useParams();
  if (spu === M9_SPU) return <M9AssetBoard />;
  return (
    <SectionCard title="商品素材">
      <Empty description="这个商品还没有接入图片、视频或说明书。公司主图如果打不开，不会用 0 或占位图冒充。" />
    </SectionCard>
  );
}
