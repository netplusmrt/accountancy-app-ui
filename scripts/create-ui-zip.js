const fs = require('fs');
const path = require('path');
const { ZipArchive } = require('archiver');

const version = require('E:\\Apps\\AccountancyApp\\accountancy-app-ng16\\package.json').version 

const distFolder = path.join(
  __dirname,
  '..',
  'accountancy-app'
);

const outputFolder = path.join(
  __dirname,
  '..',
  'releases'
);

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

const zipName = `accountancy-app-ui-v${version}.zip`;

const output = fs.createWriteStream(
  path.join(outputFolder, zipName)
);

const archive = new ZipArchive({
  zlib: { level: 9 }
});

output.on('close', () => {
  console.log('');
  console.log('ZIP Created Successfully');
  console.log(`File: ${zipName}`);
  console.log(
    `Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`
  );
});

archive.on('error', err => {
  throw err;
});

archive.pipe(output);

// IMPORTANT:
// Adds only contents of dist/accountancy-app
archive.directory(distFolder, false);

archive.finalize();