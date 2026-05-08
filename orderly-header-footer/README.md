# Orderly Header & Footer — 迁移包

## 文件结构

```
orderly-header-footer/
├── components/
│   ├── SiteHeader.tsx     ← Header 组件（MorphingHeader, HeaderLogo）
│   └── SiteFooter.tsx     ← Footer 组件（SiteFooter, BuyOrderModal）
├── shared/
│   └── orderly.ts         ← 所有导航链接、社交链接数据
├── imports/
│   ├── IcSocialYoutubeS24.tsx
│   ├── UniswapLogo.tsx
│   └── CamelotLogo.tsx
├── styles/
│   ├── fonts.css          ← Atyp BL Variable 字体声明（必须）
│   └── theme.css          ← 字体映射 CSS（必须，否则字体显示异常）
└── public/
    └── images/
        ├── svg/           ← EthBadge, ArbBadge, SolBadge, PancakeLogo, WOOFiLogo
        └── logos/
            └── raydium.png
```

## 迁移步骤

### 1. 复制文件

按以下对应关系复制到新项目：

| 本包路径 | 新项目目标路径 |
|---------|--------------|
| `components/*.tsx` | `src/app/components/` (或你的组件目录) |
| `shared/orderly.ts` | `src/app/shared/orderly.ts` |
| `imports/*.tsx` | `src/imports/` |
| `styles/fonts.css` | `src/styles/fonts.css` |
| `styles/theme.css` | `src/styles/theme.css` |
| `public/images/` | `public/images/` |

### 2. 安装依赖

```bash
npm install motion posthog-js
```

> 如果不需要 PostHog 埋点，删除 `SiteHeader.tsx` 中所有 `posthog.capture(...)` 调用，并移除 `import posthog` 这行。

### 3. 引入字体 CSS

在全局 CSS 或 layout 文件中引入：

```css
@import './styles/fonts.css';
@import './styles/theme.css';
```

### 4. 使用组件

```tsx
import { MorphingHeader } from '@/app/components/SiteHeader';
import { SiteFooter }     from '@/app/components/SiteFooter';

export default function Layout({ children }) {
  return (
    <>
      {/* Header 需要 fixed/sticky 定位，放在页面顶部 */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center' }}>
        <MorphingHeader />
      </div>

      <main>{children}</main>

      <SiteFooter />
    </>
  );
}
```

### 5. 修改路径别名（如需要）

`SiteHeader.tsx` 和 `SiteFooter.tsx` 中使用 `@/` 指向 `src/`。  
如果新项目的别名不同，全局替换 `@/app/shared/orderly` 和 `@/imports/` 为对应路径。

## 导出的组件

### Header 组件（SiteHeader.tsx）
| 组件 | 断点 | 说明 |
|------|------|------|
| `MorphingHeader` | ≥ 1024px | 桌面 Header，滚动时自动隐藏/显示 |
| `TabletNav` | 600–1023px | Tablet sticky 导航栏（Logo + Launch Now + 汉堡）|
| `MobileFixedNav` | < 600px | 移动端固定顶栏（O 图标 + 汉堡按钮）|
| `MobileNavDrawer` | mobile/tablet 共用 | 全屏导航抽屉，手风琴展开，传入 `deviceLayout` 区分 |
| `HeaderLogo` | — | 单独的 Orderly Logo 链接 |
| `CampaignIcon` | — | Campaigns 火焰图标 |

### Footer 组件（SiteFooter.tsx）
| 组件 | 断点 | 说明 |
|------|------|------|
| `SiteFooter` | ≥ 1024px | 桌面 Footer（紫色大卡片，4列导航）|
| `TabletFooter` | 600–1023px | Tablet Footer（紫色卡片，2×2导航网格）|
| `MobileFooter` | < 600px | 移动端 Footer（导航行点击展开底部 Sheet）|
| `BuyOrderModal` | — | Buy ORDER 交易所弹窗，可单独复用 |

### 断点建议
| 断点 | Header | Footer |
|------|--------|--------|
| < 600px（mobile）| `MobileFixedNav` + `MobileNavDrawer` | `MobileFooter` |
| 600–1023px（tablet）| `TabletNav` + `MobileNavDrawer` | `TabletFooter` |
| ≥ 1024px（desktop）| `MorphingHeader` | `SiteFooter` |

### 完整集成示例

```tsx
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import {
  MorphingHeader,
  MobileFixedNav,
  MobileNavDrawer,
  TabletNav,
} from "@/app/components/SiteHeader";
import {
  SiteFooter,
  TabletFooter,
  MobileFooter,
} from "@/app/components/SiteFooter";

function Layout({ children }) {
  const [navOpen, setNavOpen] = useState(false);
  const isMobile = /* window.innerWidth < 600 */;
  const isTablet = /* window.innerWidth >= 600 && < 1024 */;
  const isDesktop = /* window.innerWidth >= 1024 */;

  return (
    <>
      {/* ── Header ── */}

      {/* Mobile 顶栏 — 必须放在 ScaledFrame / transform 容器外部 */}
      {isMobile && (
        <MobileFixedNav
          onMenuClick={() => setNavOpen(true)}
          bannerHeight={0}
        />
      )}

      {/* Tablet 顶栏 — sticky，无需放在外部 */}
      {isTablet && (
        <TabletNav
          onMenuClick={() => setNavOpen(true)}
          bannerOffset={0}
        />
      )}

      {/* Desktop 顶栏 — fixed，需要外部容器 */}
      {isDesktop && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", justifyContent: "center" }}>
          <MorphingHeader />
        </div>
      )}

      <main>{children}</main>

      {/* ── Footer ── */}
      {isMobile  && <MobileFooter />}
      {isTablet  && <TabletFooter />}
      {isDesktop && <SiteFooter />}

      {/* Nav Drawer — mobile 和 tablet 共用 */}
      <AnimatePresence>
        {navOpen && (
          <MobileNavDrawer
            onClose={() => setNavOpen(false)}
            deviceLayout={isTablet ? "tablet" : "mobile"}
          />
        )}
      </AnimatePresence>
    </>
  );
}
```

### MobileFooter 说明

`MobileFooter` 点击导航分类行（Builders / Ecosystem / Traders / About）会从底部弹出一个 slide-up sheet，列出该分类下的所有链接。sheet 通过 React Portal 挂载到 `document.body`，不受父容器层叠上下文影响。
