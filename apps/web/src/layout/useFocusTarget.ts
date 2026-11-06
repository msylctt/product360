import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** 按 URL hash 滚到对应区块并短暂描边；目标可能等数据加载后才出现，所以轮询几次 */
export function useFocusTarget() {
  const { hash, pathname, search } = useLocation();

  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;
    let tries = 0;
    let clearTimer: number | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pollTimer = window.setInterval(() => {
      const element = document.getElementById(id);
      tries += 1;
      if (!element && tries < 30) return;
      window.clearInterval(pollTimer);
      if (!element) return;
      element.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      element.classList.add("is-focused");
      clearTimer = window.setTimeout(() => element.classList.remove("is-focused"), 2400);
    }, 120);
    return () => {
      window.clearInterval(pollTimer);
      if (clearTimer) window.clearTimeout(clearTimer);
    };
  }, [hash, pathname, search]);
}
