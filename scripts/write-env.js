const fs = require("node:fs");
const path = require("node:path");

function loadDotEnv(fileName) {
  const filePath = path.join(__dirname, "..", fileName);
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const equals = trimmed.indexOf("=");
    if (equals === -1) return;
    const key = trimmed.slice(0, equals).trim();
    const rawValue = trimmed.slice(equals + 1).trim();
    const value = rawValue.replace(/^[']|[']$/g, "").replace(/^[\"]|[\"]$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  });
}

loadDotEnv(".env");
loadDotEnv(".env.local");

const output = path.join(__dirname, "..", "src", "env.generated.js");
const env = {
  SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
};

fs.writeFileSync(output, `window.GD20_ENV = ${JSON.stringify(env, null, 2)};\n`);
console.log(`Wrote ${path.relative(process.cwd(), output)}`);
