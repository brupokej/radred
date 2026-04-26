import { execSync } from "child_process";

const extraArgs = process.argv.slice(2).join(" ");
const cmd = `playwright test${extraArgs ? " " + extraArgs : ""}`;

let exitCode = 0;

for (const secretMode of ["false", "true"]) {
  try {
    execSync(cmd, {
      env: { ...process.env, SECRET_MODE: secretMode },
      stdio: "inherit",
    });
  } catch (e: any) {
    exitCode |= e.status ?? 1;
  }
}

process.exit(exitCode);
