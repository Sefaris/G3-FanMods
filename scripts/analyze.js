const fs = require('fs');
const path = require('path');

// Przykład ścieżki do zmienionego pliku (ścieżka powinna być znana lub przekazana)

const tmpDirPath = path.resolve('tmp');


try {
    fs.readdirSync(tmpDirPath).forEach(modDir => {
        const modDirPath = path.join(tmpDirPath, modDir);
        console.log(modDirPath);
        if(fs.statSync(modDirPath).isDirectory()) {
            console.log('Pre commit directory:', modDirPath);
            const preCommitStringtablePath = path.join(modDirPath, 'stringtable_old.ini');
            const pastCommitStringtablePath = path.join(modDir, 'stringtable.ini');
            console.log(preCommitStringtablePath);
            console.log(pastCommitStringtablePath);
            if(fs.existsSync(preCommitStringtablePath) && fs.existsSync(pastCommitStringtablePath)) {
                const stringtableContent = fs.readFileSync(preCommitStringtablePath, 'utf-16le');
                const pastCommitStringtableContent = fs.readFileSync(pastCommitStringtablePath, 'utf-16le');
                console.log(stringtableContent.split('\n')[1]);
                console.log(pastCommitStringtableContent.split('\n')[1]);
            }
        }
    });
} catch (error) {
    console.error('Error reading directory:', error);
}