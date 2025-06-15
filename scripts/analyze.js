const fs = require('fs');
const path = require('path');

// Przykład ścieżki do zmienionego pliku (ścieżka powinna być znana lub przekazana)

const tmpDirPath = path.resolve('tmp');


try {
    fs.readdirSync(tmpDirPath).forEach(file => {
        const modDirPath = path.join(tmpDirPath, file);
        console.log(modDirPath);
        if(fs.statSync(modDirPath).isDirectory()) {
            console.log('Pre commit directory:', modDirPath);
            const stringtablePath = path.join(modDirPath, 'stringtable_old.ini');
            const pastcommitStringtablePath = path.join(modDirPath, 'stringtable.ini');
            if(fs.existsSync(stringtablePath) && fs.existsSync(pastcommitStringtablePath)) {
                const stringtableContent = fs.readFileSync(stringtablePath, 'utf-16le');
                const pastcommitStringtableContent = fs.readFileSync(pastcommitStringtablePath, 'utf-16le');
                console.log(stringtableContent.split('\n')[1]);
                console.log(pastcommitStringtableContent.split('\n')[1]);
            }
        }
    });
} catch (error) {
    console.error('Error reading directory:', error);
}