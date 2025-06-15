const fs = require('fs');
const path = require('path');

// Przykład ścieżki do zmienionego pliku (ścieżka powinna być znana lub przekazana)

const tmpDirPath = path.resolve('.');

fs.readdirSync(tmpDirPath).forEach(file => {
  console.log(file);
});