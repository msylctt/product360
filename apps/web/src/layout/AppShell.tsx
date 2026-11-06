import { Input, Layout } from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useAuth } from "../auth";

const { Header, Sider, Content } = Layout;

const modules = [
  ["overview", "商品总览"],
  ["master", "公司商品主数据"],
  ["channels", "商品全渠道信息"],
  ["assets", "商品素材中心"],
  ["external", "商品外部信息"],
  ["ask", "问商品"],
] as const;

export function AppShell() {
  const { user, logout } = useAuth();
  const [params] = useSearchParams();
  const [keyword, setKeyword] = useState(params.get("q") ?? "");
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split("/");
  const spu = parts[1] === "products" && parts[2] ? parts[2] : "";
  const current = parts[3] || (spu ? "overview" : "library");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={196}
        breakpoint="lg"
        collapsedWidth={0}
        theme="light"
        className="app-sider"
        style={{ borderRight: "1px solid var(--border)" }}
      >
        <div className="logo">商品多模态数据库</div>
        <nav className="proto-nav">
          <Link className={!spu || current === "overview" ? "is-active" : ""} to={spu ? `/products/${spu}/overview` : "/products"}>
            商品总览
          </Link>
          <div className="proto-nav__group">{spu ? "当前商品" : "先打开一个商品"}</div>
          {modules.slice(1).map(([key, label]) =>
            spu ? (
              <Link key={key} className={current === key ? "is-active" : ""} to={`/products/${spu}/${key}`}>
                {label}
              </Link>
            ) : (
              <span key={key} className="section-note" style={{ padding: "8px 12px" }}>
                {label}
              </span>
            ),
          )}
        </nav>
      </Sider>
      <Layout>
        <Header
          className="app-header"
          style={{
            height: 56,
            lineHeight: "56px",
            background: "var(--bg-card)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "0 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Input.Search
            allowClear
            placeholder="搜索商品、SPU、SKU、ASIN、关键词"
            style={{ maxWidth: 480 }}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onSearch={(value) => {
              const next = new URLSearchParams();
              if (value) next.set("q", value);
              navigate(`/products?${next.toString()}`);
            }}
          />
          <div style={{ marginLeft: "auto", color: "var(--text-2)", fontSize: 13 }}>
            {user?.name}
            {user && user.roleLabel !== user.name ? ` · ${user.roleLabel}` : ""}
            <a
              style={{ marginLeft: 12 }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              退出
            </a>
          </div>
        </Header>
        <Content id="app-content" style={{ padding: 16, overflow: "auto", height: "calc(100vh - 56px)" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
