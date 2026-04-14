import { createSupabaseAdminClient } from "./skill-sync-lib.mjs";
import { buildWorkflowPackages, seedWorkflowTemplates } from "../lib/workflow-builder.ts";

async function main() {
  const supabase = createSupabaseAdminClient();
  await seedWorkflowTemplates(supabase);
  const results = await buildWorkflowPackages(supabase);
  console.log(JSON.stringify({ ok: true, results }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
