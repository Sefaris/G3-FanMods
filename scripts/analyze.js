console.log('DIFF_JSON_PATH:', process.env.DIFF_JSON_PATH);

const fs = require('fs');

const diffPath = process.env.DIFF_JSON_PATH;
if (!diffPath) {
  throw new Error('DIFF_JSON_PATH is not defined!');
}

const diffs = JSON.parse(fs.readFileSync(diffPath, 'utf8'));