# OpenClaw Skills for Authors

合作方阅读版架构说明书：

- [docs/项目架构说明书.md](./docs/项目架构说明书.md)

`Next.js + Tailwind CSS` 原型站，当前用于验证：

- 首页与 6 个分类页的视觉与信息层级
- 分类页第二屏的“输入场景 -> 推荐 Skills”交互
- `Supabase` 数据层、场景映射与后续登录/订阅能力的接入方式

线上地址：

- [Vercel Production](https://openclaw-skills-authors.vercel.app)

## 本地运行

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 当前数据结构

当前项目已经接好一层最小可用的数据模型，核心表如下：

- `categories`
- `scenarios`
- `scenario_aliases`
- `skills`
- `skill_scenarios`

它们对应的 SQL 文件在：

- [supabase/schema.sql](./supabase/schema.sql)
- [supabase/seed.sql](./supabase/seed.sql)

## 接入 Supabase

1. 在 Supabase 新建一个项目
2. 打开 SQL Editor，先执行 `supabase/schema.sql`
3. 再执行 `supabase/seed.sql`
4. 在项目根目录创建 `.env.local`
5. 填入下面两个前端读取变量：

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

如果你的 Supabase 控制台给的是 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`，当前项目也兼容，不必额外改逻辑。

如果你希望后续让我继续做“批量同步 Skills 数据”“后台写入”或“管理员导入脚本”，还需要额外补一个服务端密钥：

```bash
SUPABASE_SERVICE_ROLE_KEY=...
```

可直接参考：

- [.env.example](./.env.example)

如果没有配置 Supabase，站点会自动回退到当前的静态样例数据，不会影响页面预览。

## 检查数据库是否接通

填好 `.env.local` 后，可以运行：

```bash
npm run supabase:check
```

它会检查：

- 环境变量是否齐全
- `categories / scenarios / skills / skill_scenarios` 四张表能否读到数据
- 当前是否已经把 seed 成功导入数据库

## 代码入口

- 首页：[app/page.tsx](./app/page.tsx)
- 分类页：[app/categories/[slug]/page.tsx](./app/categories/[slug]/page.tsx)
- 分类页场景搜索组件：[components/category-skill-explorer.tsx](./components/category-skill-explorer.tsx)
- 静态页面文案与 hero 数据：[lib/site-data.ts](./lib/site-data.ts)
- 静态 catalog fallback 与 alias 映射：[lib/static-catalog.ts](./lib/static-catalog.ts)
- 搜索与排序逻辑：[lib/skill-search.ts](./lib/skill-search.ts)
- Supabase 读取仓库层：[lib/skills-repository.ts](./lib/skills-repository.ts)
- 搜索接口：[app/api/skills/search/route.ts](./app/api/skills/search/route.ts)

## 下一步建议

完成这版数据库接入后，最合理的下一步是：

1. 真的在 Supabase 建库并导入 seed
2. 把 `查看详情` 接成真实 Skill 详情页
3. 接用户登录
4. 再接订阅 / 付费 / 权限控制
