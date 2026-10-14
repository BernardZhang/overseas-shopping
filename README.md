# Everyday Edit

面向英文海外消费者的精选生活方式商品选购 Demo。React + TypeScript + Vite，从官方空脚手架开发；未使用网站/商城模板。12 件模拟商品、3 个类别，USD 定价，全部商品图片为项目原创本地 SVG 插画。

## 运行

推荐 Node.js 22.18+（实际验证：26.11.1）、npm（实际验证：11.20.0）。首次安装需要 npm registry 网络连接。

```sh
cd app
npm ci
npm run dev -- --host 127.0.0.1
```

终端打印本地地址，通常为 http://127.0.0.1:5173。不要直接以 file:// 打开 index.html。

```sh
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

`npm test` 使用 Node 内置 TypeScript 支持和断言，验证筛选边界、排序稳定性、购物车数量/金额、持久化数据校验。`build` 执行 TypeScript 编译检查及 Vite 生产构建；`preview` 通常使用端口 4173。

若本机默认 npm 缓存权限异常，可在命令中使用自有临时缓存，例如 `npm ci --cache /tmp/everyday-edit-cache`，无需修改系统目录权限。

## 已实现

- 12 件商品、Home / Travel / Desk 分类、商品插画和英文说明。
- 关键词实时搜索、分类与价格组合筛选、结果数量、清除与零结果状态。
- Featured 与价格升/降序；$50/$100 端点归属明确。
- 商品详情、材质、尺寸、颜色、模拟评分、详情加购。
- 购物车合并条目、增减数量、移除、1–10 上限、小计与数量徽标。
- localStorage 持久化、非法数据过滤、存储受限的会话回退。
- 桌面/手机布局、可滚动弹层、原生 dialog 焦点约束、Escape 关闭与焦点恢复。

## 使用约定

所有商品与评分为模拟数据；没有真实买家评论。金额使用整数美分计算，显示 USD。购物车数量徽标是商品总数量。购物车仅显示商品小计，不计算运费和税费，无真实支付或订单。

localStorage key：`everyday-edit:cart:v1`，结构为 `{ "version": 1, "items": { "vase": 2 } }`。无效商品 ID、非整数或超出 1–10 的数量会丢弃，结构损坏回退为空。没有个人信息；本地存储不跨设备同步，也不做多标签页实时同步。

## 源码结构

```text
AGENTS.md / spec.md / tasks.md  审核规格与实施记录
DELIVERY.md                    实际验收与交付说明
app/src/data.ts                商品数据与 USD 格式化
app/src/logic.ts               搜索筛选排序、购物车 reducer 与校验
app/src/cart.tsx               Context 状态与持久化
app/src/App.tsx                页面、详情与购物车
app/src/ProductArt.tsx         图片与失败回退
app/src/App.css / index.css    响应式样式
app/public/images/             原创插画，不依赖远程素材
app/tests/logic.test.mjs       关键逻辑断言
app/package-lock.json          锁定依赖
```

素材说明：SVG 商品插画和 favicon 均在本次任务中从零绘制，无外部图片链接，无第三方商城模板。Lucide 图标的许可证随依赖保留；项目不包含 node_modules。

## 验证与限制

实际验证见 DELIVERY.md。浏览器验证为 Codex 内置 Chromium 桌面与手机视口模拟，包含 1440×900、390×844、320×700；未进行手机真机、Safari/Firefox 或完整无障碍审计。已部署到 https://overseas-shopping.vercel.app/；仓库 https://github.com/BernardZhang/overseas-shopping。当前线上验证见 docs/VERIFICATION.md。源码包不含录屏、node_modules、临时验证页面或密钥；录屏单独交付。

## Deployment

GitHub + Vercel continuous deployment is configured for main. See [deployment guide](docs/DEPLOYMENT.md) and [verified results](docs/VERIFICATION.md). The current user authorization removes human Review requirements.
