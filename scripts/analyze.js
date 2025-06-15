const fs = require('fs');
const path = require('path');

// Przykład ścieżki do zmienionego pliku (ścieżka powinna być znana lub przekazana)

const tmpDirPath = path.resolve('tmp');


try {
    fs.readdirSync(tmpDirPath).forEach(file => {
        const modDirPath = path.join(tmpDirPath, file);
        console.log(modDirPath);
        if(fs.statSync(modDirPath).isDirectory()) {
            console.log('Directory:', modDirPath);
            const stringtablePath = path.join(modDirPath, 'stringtable_old.ini');
            console.log('Stringtable:', stringtablePath);
            if(fs.existsSync(stringtablePath)) {
                console.log('Stringtable exists:', stringtablePath);
            }
        }
    });
} catch (error) {
    console.error('Error reading directory:', error);
}