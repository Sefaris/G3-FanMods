const fs = require('fs');
const path = require('path');

// Przykład ścieżki do zmienionego pliku (ścieżka powinna być znana lub przekazana)

const tmpDir = path.resolve('tmp');

tmpDir.readdirSync().forEach(file => {
  console.log(file);
});
