import fs from 'fs';
import path from 'path';

import { readFileUTF16, isValidFile, calculateTranslationProgress } from './utils.mjs';

const tmpDirPath = path.resolve('tmp');
const PRECOMMIT_STRINGTABLE = 'stringtable_old.ini';
const PASTCOMMIT_STRINGTABLE = 'stringtable.ini';


const languages = {
    0: "ENG",
    1: "ITA",
    2: "FRA",
    3: "DEU",
    4: "ESP",
    5: "CZE",
    6: "HUN",
    7: "POL",
    8: "RUS",
    9: "TRC",
}





try {
    if(!fs.existsSync(tmpDirPath)) {
        console.log('tmp directory does not exist');
        process.exit(1);
    }
    fs.readdirSync(tmpDirPath).forEach(modDir => {
        const modDirPath = path.join(tmpDirPath, modDir);
        if(fs.statSync(modDirPath).isDirectory()) {
            const preCommitStringtablePath = path.join(modDirPath, PRECOMMIT_STRINGTABLE);
            const pastCommitStringtablePath = path.join(modDir, PASTCOMMIT_STRINGTABLE);
            if(fs.existsSync(preCommitStringtablePath) && fs.existsSync(pastCommitStringtablePath)) {
                const preCommitStringtableContent = readFileUTF16(preCommitStringtablePath);
                const pastCommitStringtableContent = readFileUTF16(pastCommitStringtablePath);

                const filteredPastCommitStringtableContent = pastCommitStringtableContent.filter(line => line.includes('='));
                const filteredPreCommitStringtableContent = preCommitStringtableContent.filter(line => line.includes('='));
                console.log(`Analyzing ${modDir}`);
                const validity = isValidFile(filteredPastCommitStringtableContent);
                if(validity.valid){
                    console.log(`File is valid`);
                } else {
                    console.log(`File has some missing semicolons, ${validity.invalidLines}`);
                }
                const pastCommitProgress = calculateTranslationProgress(filteredPastCommitStringtableContent);
                const preCommitProgress = calculateTranslationProgress(filteredPreCommitStringtableContent);

                if(pastCommitProgress.totalLines !== preCommitProgress.totalLines) {
                    console.log(`Total lines: ${preCommitProgress.totalLines} -> ${pastCommitProgress.totalLines}`);
                }
                const result = pastCommitProgress.progress.map((value,index) => {
                    if(value === preCommitProgress.progress[index]) return `${languages[index]}: ${value}`;
                    return `${languages[index]}: ${preCommitProgress.progress[index]} -> ${value}`;
                  });
                console.log(result.filter(value => value !== '').join('\n'));
            }
        }
    });

} catch (error) {
    console.error('Error reading directory:', error);
}


