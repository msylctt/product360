import { Empty } from "antd";
import { useParams } from "react-router-dom";
import { M9_SPU, M9Ask } from "../components/M9Supplement";

export function AskPage() {
  const { spu = "" } = useParams();
  if (spu === M9_SPU) return <M9Ask />;
  return <Empty description="这个商品还没有可核对的资料问答。不会根据商品名编造规格或说明书页码。" />;
}
