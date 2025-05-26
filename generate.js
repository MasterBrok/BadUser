// generateLaunchJson.js
const fs = require('fs');
const path = require('path');

const launchJsonPath = path.join('.vscode', 'launch.json');

// پیکربندی پیش‌فرض Angular با Chrome
const launchConfig = {
  version: "0.2.0",
  configurations: [
    {
      type: "chrome",
      request: "launch",
      name: "Launch Angular (localhost:4200)",
      url: "http://localhost:4200",
      webRoot: "${workspaceFolder}"
    }
  ]
};

// ساخت دایرکتوری .vscode در صورت نیاز
if (!fs.existsSync('.vscode')) {
  fs.mkdirSync('.vscode');
}

// نوشتن فایل launch.json
fs.writeFileSync(launchJsonPath, JSON.stringify(launchConfig, null, 2));

console.log('✅ launch.json با موفقیت ایجاد شد.');
