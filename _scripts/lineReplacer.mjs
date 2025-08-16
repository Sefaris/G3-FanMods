import fs from 'fs'
import path from 'path'

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

const qe = "D:\\Repos\\G3-FanMods\\Y_05_TotalRebalance\\stringtable.ini"
const qeo = "D:\\Repos\\G3-FanMods\\Y_05_TotalRebalance\\stringtable.ini"


function readFileUTF16(filePath) {
  return fs.readFileSync(filePath, 'utf16le').split('\r\n');
}

function writeFileUTF16(filePath, data) {
  fs.writeFileSync(filePath, data.join('\r\n'), 'utf16le');
}

function filterLines(oldFilePath, newFilePath) {
  const oldFileLines = readFileUTF16(oldFilePath);
  const newFileLines = readFileUTF16(newFilePath);

  const filteredOldLines = oldFileLines.filter(line => line.includes('='));
  const filteredNewLines = newFileLines.filter(line => line.includes('='));

  const oldKeys = filteredOldLines.map(line => line.split('=')[0]);
  const newKeys = filteredNewLines.map(line => line.split('=')[0]);

  const missingKeys = oldKeys.filter(key => !newKeys.includes(key));

  return { filteredOldLines, filteredNewLines, newFileLines };
}

function checkIfTranslationIsTheSame(oldFileLines, newFileLines, modName) {
  let differentTranslations = Array(20).fill(0);
  let differentKeys = Array(20).fill([]);
  let missingKeys = 0;
  const totalLines = oldFileLines.length;

  for (let i = 0; i < oldFileLines.length; i++) {
    try {


      const line = oldFileLines[i];
      const progress = Math.round((i + 1) / totalLines * 100);

      // Clear line and show progress
      process.stdout.write(`\r${modName} Progress: ${progress}%`);

      const oldKey = line.split('=')[0];
      const newLine = newFileLines.find(newLine => newLine.split('=')[0] === oldKey);
      if (!newLine) {
        console.log(`Missing key: ${oldKey}`);
        missingKeys++;
        continue;
      }
      const oldTranslation = line.split(';');
      const newTranslation = newLine.split(';');

      for (const [langIndex, langName] of Object.entries(languages)) {
        if (oldTranslation[langIndex * 2] !== newTranslation[langIndex * 2]) {
          //console.log(`Line: ${oldKey}`)
          if (langName === "POL") {
            console.log(`\nPol change: ${oldKey}`);
          }
          if (langName === "RUS") {
            console.log(`\nRus change: ${oldKey}`);
          }
          differentTranslations[langIndex]++;
          differentKeys[langIndex].push(oldKey);
        }
      }

    } catch (error) {
      console.error(`Error processing line ${i}:`, error);
    }
  }

  // Clear progress line and show final results
  process.stdout.write('\r');
  console.log(' '.repeat(100)); // Clear remaining characters
  console.log(`Changed lines in ${modName}:`, differentTranslations.map((value, index) => `${languages[index]}: ${value}`).filter(value => value !== 'undefined: 0'));
  console.log(`${modName}, missingKeys: ${missingKeys}`);
  //console.log(`${modName}, differentKeys: ${differentKeys[0].join('\n')}`);
  // write differentKeys to file
}

function checkMods() {
  const immersive_lines = filterLines(qeo, qe);
  countSemicols(immersive_lines.newFileLines);
  checkIfTranslationIsTheSame(immersive_lines.filteredOldLines, immersive_lines.filteredNewLines, "Immersive");


  const progress = calculateTranslationProgress(immersive_lines.filteredNewLines);
  const oldprogress = calculateTranslationProgress(immersive_lines.filteredNewLines);
  oldprogress.progress[1] = '100.00%';
  const result = progress.progress.map((value, index) => {
    if (value === oldprogress.progress[index]) return `${languages[index]}: ${value}`;
    return `${languages[index]}: ${oldprogress.progress[index]} -> ${value}`;
  });
  console.log(result.filter(value => value !== '').join('\n'));
}




function countSemicols(lines) {
  lines.forEach((line, index) => {
    if (!line.includes(';')) return;
    const semicolons = line.split(';').length;
    if (semicolons !== 20) {
      console.log(`Wrong number of semicolons at line ${index + 1}: ${semicolons}`);
    }
  });
}

checkMods();

function calculateTranslationProgress(stringtableContent) {
  let totalLines = stringtableContent.length;
  let translatedLines = Array(10).fill(0);
  stringtableContent.forEach(line => {
    const key = line.split('=')[0];

    const translations = line.split('=')[1].split(';');
    for (const [langIndex, langName] of Object.entries(languages)) {
      if (translations[langIndex * 2].length !== 0 && translations[langIndex * 2] !== `[${translations[langName]}]`) {
        translatedLines[langIndex]++;
      }
    }
  });
  return { totalLines, progress: translatedLines.map((value) => `${(value / totalLines * 100).toFixed(2)}%`) };
}

