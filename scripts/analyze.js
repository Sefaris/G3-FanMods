const fs = require('fs');
const path = require('path');


const tmpDirPath = path.resolve('tmp');
const PRECOMMIT_STRINGTABLE = 'stringtable_old.ini';
const PASTCOMMIT_STRINGTABLE = 'stringtable.ini';


const languages = {
    0: "ENG",
    1: "ITA",
    2: "FRA",
    3: "GER",
    4: "SPA",
    5: "CZE",
    6: "HUN",
    7: "POL",
    8: "RUS",
    9: "CHI",
}

function readFileUTF16(filePath) {
  return fs.readFileSync(filePath, 'utf16le').split('\r\n');
}

function writeFileUTF16(filePath, data) {
  fs.writeFileSync(filePath, data.join('\r\n'), 'utf16le');
}

try {
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
                isValidFile(filteredPastCommitStringtableContent);
                calculateTranslationProgress(filteredPastCommitStringtableContent);
            }
        }
    });
} catch (error) {
    console.error('Error reading directory:', error);
}


function isValidFile(stringtableContent) {
    let invalidLines = 0;
    stringtableContent.forEach((line,index) => {
        if(!line.includes(';')) return;
        const semicolons = line.split(';').length;
        if (semicolons !== 20) {
            invalidLines++;
            console.log(`Wrong number of semicolons at line ${index+1}: ${semicolons}`);
        }
    });
    if(invalidLines === 0) {
        console.log('File is perfectly valid');
    } else {
        console.log(`Invalid lines: ${invalidLines}`);
    }
}

function calculateTranslationProgress(stringtableContent) {
    let totalLines = stringtableContent.length;
    let translatedLines = Array(10).fill(0);
    stringtableContent.forEach(line => {
        const key = line.split('=')[0];
  
        const translations = line.split('=')[1].split(';');
        for (const [langIndex, langName] of Object.entries(languages)){
            if(translations[langIndex*2].length !== 0 && translations[langIndex*2] !== `[${translations[langName]}]`) {
                translatedLines[langIndex]++;
            }
        }
    });
    console.log(`Total lines: ${totalLines}`);
    const progress = translatedLines.map((value, index) => `${languages[index]}: ${(value/totalLines*100).toFixed(2)}%`).join('\n');
    console.log(`Translation progress: ${progress}`);
  }