import { exec } from "child_process";
import path from "path";

const scriptPath = path.join(__dirname, "send-weekly-email.ts");

// Use ts-node to run the script
const child = exec(`npx ts-node ${scriptPath}`);

child.stdout?.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr?.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

child.on("close", (code) => {
  console.log(`Email scheduler process exited with code ${code}`);
});

console.log("Email scheduler started in background");