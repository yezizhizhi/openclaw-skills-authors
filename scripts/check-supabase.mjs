import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const optionalServerEnv = ["SUPABASE_SERVICE_ROLE_KEY"];

function readEnv(name) {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function exitWithMessage(message) {
  console.error(`\n[Supabase Check] ${message}\n`);
  process.exit(1);
}

const supabaseUrl = readEnv("NEXT_PUBLIC_SUPABASE_URL");
const publishableKey =
  readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ||
  readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY");

const missingPublicEnv = [
  !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : "",
  !publishableKey
    ? "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY"
    : "",
].filter(Boolean);

if (missingPublicEnv.length > 0) {
  exitWithMessage(
    `缺少环境变量：${missingPublicEnv.join("、")}。\n请先在 .env.local 中补齐后再运行 npm run supabase:check。`,
  );
}

const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");

const client = createClient(supabaseUrl, serviceRoleKey || publishableKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const checks = [
  { table: "categories", label: "分类表" },
  { table: "scenarios", label: "场景表" },
  { table: "skills", label: "技能表" },
  { table: "skill_scenarios", label: "技能-场景映射表" },
];

async function main() {
  console.log("\n[Supabase Check] 开始检查数据库连接...\n");
  console.log(`- URL: ${supabaseUrl}`);
  console.log(
    `- 使用密钥: ${
      serviceRoleKey
        ? "SUPABASE_SERVICE_ROLE_KEY"
        : readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
          ? "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
          : "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY"
    }`,
  );
  console.log(
    `- 可选服务端密钥: ${optionalServerEnv.map((name) => `${name}=${readEnv(name) ? "已提供" : "未提供"}`).join("，")}\n`,
  );

  for (const check of checks) {
    const { count, error } = await client
      .from(check.table)
      .select("*", { count: "exact", head: true });

    if (error) {
      exitWithMessage(`${check.label} 读取失败：${error.message}`);
    }

    console.log(`✓ ${check.label} 可访问，当前记录数：${count ?? 0}`);
  }

  console.log("\n[Supabase Check] 数据库连接正常，可以继续接真数据。\n");
}

main().catch((error) => {
  exitWithMessage(error instanceof Error ? error.message : "未知错误");
});
