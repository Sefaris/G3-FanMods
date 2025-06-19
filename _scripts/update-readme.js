const fs = require('fs');
const path = require('path');

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
    9: "TRC",
}

const STRINGTABLE = 'stringtable.ini';
const MOD = 'mod.json';
const readmePath = path.join('readme.md');
const basePath = path.resolve('..');
// Fragment do wstawienia – możesz później wygenerować dynamicznie


const START_MARKER = '<!-- START:translation-progress -->';
const END_MARKER = '<!-- END:translation-progress -->';

function updateReadme() {
    const pattern = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`, 'gm');
    let readme = fs.readFileSync(readmePath, 'utf8');
    if (!pattern.test(readme)) {
        console.error('Markers not found in readme.md');
        process.exit(1);
    }

    const translationStats = getTranslationProgress(getMods());
    const newContent = translationStats.map(mod => {
        const modName = mod.mod;
        return `### ${modName}\n${mod.progress.map(item => {
            return `![${item.lang}](https://progress-bar.xyz/${item.value}?title=${item.lang})`;
        }).join(`\n`)}\n`;
    }).join(`\n`);

    console.log(translationStats.map(item=>item.progress));

    // const replacement = `${START_MARKER}\n${newContent.trim()}\n${END_MARKER}`;
    // readme = readme.replace(pattern, replacement);
    // fs.writeFileSync(readmePath, readme);
    // console.log('✅ README.md updated successfully.');
}

function getMods() {
    const mods = [];
    const stringtablesFiles = fs.readdirSync(basePath);
    stringtablesFiles.forEach(file => {
        if (fs.statSync(path.join(basePath, file)).isDirectory()) {
            const stringtablePath = path.join(basePath, file, STRINGTABLE);
            const modPath = path.join(basePath, file, MOD);
            if (fs.existsSync(stringtablePath) && fs.existsSync(modPath)) {
                mods.push({ stringtable: stringtablePath, mod: modPath });
            }
        }
    })
    return mods;
}

function getTranslationProgress(mods) {
    const progresses = [];
    mods.forEach(mod => {
        const stringtable = fs.readFileSync(mod.stringtable, 'utf16le');
        const modJson = fs.readFileSync(mod.mod, 'utf8');
        const lines = stringtable.split('\r\n');
        const filteredLines = lines.filter(line => line.includes('='));
        const progress = calculateTranslationProgress(filteredLines);
        progresses.push({ mod: getModName(modJson), progress: progress.progress });
    })
    return progresses;
}

function getModName(modContent) {
    const modJson = JSON.parse(modContent);
    return modJson.title;
}

function calculateTranslationProgress(stringtableContent) {
    let totalLines = stringtableContent.length;
    let translatedLines = Array(10).fill(0);
    stringtableContent.forEach(line => {
        const key = line.split('=')[0];
        const translations = line.split('=')[1].split(';');
        if (translations.length !== 20) {
            return;
        }
        for (const [langIndex, langName] of Object.entries(languages)) {
            if (translations[langIndex * 2].length !== 0 && translations[langIndex * 2] !== `[${langName}]` && translations[langIndex * 2] !== '-') {
                translatedLines[langIndex]++;
            }
        }
    });
    return { totalLines, progress: translatedLines.map((value, index) => {return {lang: languages[index], value: (value/totalLines*100).toFixed(0)}}) };
}

updateReadme();
