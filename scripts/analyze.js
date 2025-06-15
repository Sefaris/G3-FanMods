const fs = require('fs');

const inputPath = process.env.FILE_DIFFS_PATH;
const content = fs.readFileSync(inputPath, 'utf8');
const files = JSON.parse(content);

for (const { path, before, after } of files) {
  console.log(`=== ${path} ===`);
  console.log('--- BEFORE ---');
  console.log(before);
  console.log('--- AFTER ---');
  console.log(after);
}
