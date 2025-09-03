# Cr3dify Admin Dashboard | Cr3dify 管理面板

<div align="center">
  <h3>🚀 Modern Next.js Admin Panel with Supabase Integration</h3>
  <h3>🚀 基于 Supabase 集成的现代 Next.js 管理面板</h3>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
</div>

---

## 📖 Project Description | 项目描述

**English:**
Cr3dify Admin Dashboard is a modern, responsive admin panel built with Next.js 14, TypeScript, and Tailwind CSS. It features a comprehensive client management system with Supabase backend integration, providing a seamless experience for managing business operations.

**中文:**
Cr3dify 管理面板是一个基于 Next.js 14、TypeScript 和 Tailwind CSS 构建的现代化响应式管理面板。它具有完整的客户管理系统和 Supabase 后端集成，为业务运营管理提供无缝体验。

## ✨ Features | 功能特性

### 🎯 Core Features | 核心功能
- **Dashboard Analytics** | 仪表板分析
- **Client Management System** | 客户管理系统
  - Client List with Search & Filter | 客户列表搜索和筛选
  - Add New Clients | 添加新客户
  - Client Details & Edit | 客户详情和编辑
  - Client Status Management | 客户状态管理
- **Account Settings** | 账户设置
- **Responsive Design** | 响应式设计
- **Dark/Light Theme Support** | 深色/浅色主题支持

### 🛠️ Technical Features | 技术特性
- **Real-time Data** with Supabase | 基于 Supabase 的实时数据
- **Type-safe Development** with TypeScript | TypeScript 类型安全开发
- **Modern UI Components** | 现代化 UI 组件
- **Form Validation** | 表单验证
- **Error Handling** | 错误处理
- **Loading States** | 加载状态

## 🚀 Technology Stack | 技术栈

| Technology | Version | Purpose | 用途 |
|------------|---------|---------|------|
| **Next.js** | 14.x | React Framework | React 框架 |
| **TypeScript** | 5.x | Type Safety | 类型安全 |
| **Tailwind CSS** | 3.x | Styling | 样式设计 |
| **Material-UI** | 5.x | UI Components | UI 组件 |
| **Supabase** | Latest | Backend & Database | 后端和数据库 |
| **React Hook Form** | 7.x | Form Management | 表单管理 |
| **Zod** | 3.x | Schema Validation | 模式验证 |

## 📦 Installation | 安装指南

### Prerequisites | 前置要求
- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account | Supabase 账户

### Setup Steps | 安装步骤

1. **Clone the repository | 克隆仓库**
   ```bash
   git clone https://github.com/mrtonymu/Cr3dify-Final.git
   cd Cr3dify-Final
   ```

2. **Install dependencies | 安装依赖**
   ```bash
   npm install
   # or | 或者
   yarn install
   # or | 或者
   pnpm install
   ```

3. **Environment Setup | 环境配置**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables in `.env.local` | 在 `.env.local` 中更新以下变量:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup | 数据库设置**
   - Create a new Supabase project | 创建新的 Supabase 项目
   - Run the SQL migrations in `/supabase/migrations` | 运行 `/supabase/migrations` 中的 SQL 迁移
   - Configure Row Level Security (RLS) | 配置行级安全 (RLS)

5. **Start Development Server | 启动开发服务器**
   ```bash
   npm run dev
   # or | 或者
   yarn dev
   # or | 或者
   pnpm dev
   ```

6. **Open Application | 打开应用**
   Navigate to [http://localhost:3000](http://localhost:3000) | 访问 [http://localhost:3000](http://localhost:3000)

## 📚 Usage Guidelines | 使用指南

### Development | 开发
```bash
npm run dev          # Start development server | 启动开发服务器
npm run build        # Build for production | 生产环境构建
npm run start        # Start production server | 启动生产服务器
npm run lint         # Run ESLint | 运行 ESLint
npm run type-check   # TypeScript type checking | TypeScript 类型检查
```

### Project Structure | 项目结构
```
src/
├── app/                 # Next.js App Router | Next.js 应用路由
├── components/          # Reusable Components | 可复用组件
├── views/              # Page Components | 页面组件
├── libs/               # Third-party Libraries | 第三方库
├── types/              # TypeScript Types | TypeScript 类型
├── utils/              # Utility Functions | 工具函数
└── configs/            # Configuration Files | 配置文件
```

## 🤝 Contributing | 贡献指南

**English:**
We welcome contributions from the community! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**中文:**
我们欢迎社区贡献！请遵循以下指南：

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

### Code Style | 代码风格
- Follow TypeScript best practices | 遵循 TypeScript 最佳实践
- Use Prettier for code formatting | 使用 Prettier 进行代码格式化
- Follow ESLint rules | 遵循 ESLint 规则
- Write meaningful commit messages | 编写有意义的提交信息

## 📄 License | 许可证

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 📞 Contact | 联系方式

**Repository Owner | 仓库所有者:** mrtonymu

**Email | 邮箱:** [timiemarketing@gmail.com](mailto:timiemarketing@gmail.com)

**GitHub Repository | GitHub 仓库:** [https://github.com/mrtonymu/Cr3dify-Final](https://github.com/mrtonymu/Cr3dify-Final)

---

## 🙏 Acknowledgments | 致谢

- [Next.js](https://nextjs.org/) for the amazing React framework | 感谢 Next.js 提供的优秀 React 框架
- [Supabase](https://supabase.com/) for the backend infrastructure | 感谢 Supabase 提供的后端基础设施
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework | 感谢 Tailwind CSS 提供的实用优先 CSS 框架
- [Material-UI](https://mui.com/) for the beautiful components | 感谢 Material-UI 提供的精美组件

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/mrtonymu">mrtonymu</a></p>
  <p>由 <a href="https://github.com/mrtonymu">mrtonymu</a> 用 ❤️ 制作</p>
</div>
