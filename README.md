# Morph Tools UI

基于 React + TypeScript + Vite 构建的 Morph 平台数据展示应用，用于监控和分析 Morph 平台的营收和资产情况。

## 项目特点

- **营收明细展示**：按月份展示营收数据，支持展开查看每日详情
- **资产统计**：展示不同日期的资产总量
- **响应式布局**：支持侧边栏折叠，内容区域自适应调整
- **数据可视化**：根据数据性质进行颜色标记，提高可读性

## 技术栈

- **前端框架**：React 19
- **开发语言**：TypeScript
- **UI 组件库**：Ant Design 5.24.2
- **构建工具**：Vite 6.2.0
- **开发环境**：Node.js

## 安装与运行

### 环境要求

- Node.js 18.0 或更高版本
- Yarn 或 npm 包管理器

### 安装依赖

```bash
# 使用 Yarn
yarn

# 或使用 npm
npm install
```

### 开发模式

```bash
# 使用 Yarn
yarn dev

# 或使用 npm
npm run dev
```

应用将在 http://localhost:5000 启动

### 构建项目

```bash
# 使用 Yarn
yarn build

# 或使用 npm
npm run build
```

### 预览构建结果

```bash
# 使用 Yarn
yarn preview

# 或使用 npm
npm run preview
```

## 项目结构

```
morph-tools-ui/
├── src/                  # 源代码目录
│   ├── assets/           # 静态资源和数据文件
│   ├── components/       # React 组件
│   │   └── ExpandTable.tsx # 主要数据表格组件
│   ├── App.tsx           # 应用主组件
│   └── main.tsx          # 应用入口
├── public/               # 公共资源目录
├── index.html            # HTML 模板
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖和脚本
```

## 数据来源

应用数据来源于 `src/assets/` 目录下的 JSON 文件：
- `tableData.json`：营收明细数据
- `a.json`：资产统计数据

## 许可证

[MIT License](LICENSE)
