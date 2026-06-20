const { execSync } = require('child_process');
const packageJson = require('../package.json');

const version = require('E:\\Apps\\AccountancyApp\\accountancy-app-ng16\\package.json').version 

const zipFile =`releases/accountancy-app-ui-v${version}.zip`;

// check the zip file exists
const fs = require('fs');
if (!fs.existsSync(zipFile)) {
  console.error(`Error: ZIP file ${zipFile} does not exist.`);
  process.exit(1);
}

execSync(
  `gh release create ui-v${version} "${zipFile}" --title "UI Version ${version}" --notes "Angular UI Update"`,
  {
    stdio: 'inherit'
  }
);