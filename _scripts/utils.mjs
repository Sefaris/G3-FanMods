import fs from 'fs'
import path from 'path'

export function readFileUTF16(filePath) {
  return fs.readFileSync(filePath, 'utf16le').split('\n');
}

export function writeFileUTF16(filePath, data) {
  fs.writeFileSync(filePath, data.join('\r\n'), 'utf16le');
}

export function getKeys(stringContent) {
  const filteredLines = stringContent.filter(line => line.includes('='));
  return filteredLines.map(line => line.split('=')[0]);
}

export function countOccurrencesInList(elements) {
  let occurrences = {};

  elements.forEach( (element) =>{
    occurrences[element] = (occurrences[element] || 0) + 1;
  });

  return occurrences;
}

export function checkForDuplicates(occurrences) {
  let duplicates = {};
  for (let element in occurrences) {
    if (occurrences[element] > 1) {
      duplicates[element] = occurrences[element];
    }
  }
  return duplicates;
}

export function validateFile(filePath) {
  if (fs.statSync(filePath).isDirectory() || !filePath.endsWith('.ini')) {
    return;
  }
  const fileLines = readFileUTF16(filePath);
  const duplicates = checkForDuplicates(countOccurrencesInList(getKeys(fileLines)));
  if (Object.keys(duplicates).length) {
    console.log(`${filePath} has key duplicates`);
    console.log(duplicates)
  }
  fileLines.forEach((line, index) => {
    if (!line.includes('=')) return;
    const splitted = line.split(';');
    const length = splitted.length;
    if (length !== 20) {
      console.log(filePath, index + 1, length);
    }
  });
}

export function validateFilesInDirectory(directoryPath) {
  if (fs.statSync(directoryPath).isDirectory()) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const filePath = path.join(directoryPath, file);
      validateFile(filePath);
    });
  }
}

export function validateAllDirectories(rootPath) {
  fs.readdirSync(rootPath).forEach((directory) => {
    const directoryPath = path.join(rootPath, directory);
    validateFilesInDirectory(directoryPath);
  });
}


export function checkMods(rootPath) {
  fs.readdirSync(rootPath).forEach((directory) => {
    const directoryPath = path.join(rootPath, directory);
    const file = path.join(directoryPath, 'mod.json');
    if (!fs.statSync(directoryPath).isDirectory()) return;
    if (!fs.existsSync(file)) {
      console.log(file);
    }
  });
}

export function isValidFile(stringtableContent) {
  let invalidLines = 0;
  stringtableContent.forEach((line,index) => {
      if(!line.includes(';')) return;
      const semicolons = line.split(';').length;
      if (semicolons !== 20) {
          invalidLines++;
          console.log(`Wrong number of semicolons at line ${index+1}: ${semicolons}`);
      }
  });
  return {valid: invalidLines===0, invalidLines};
}

export function calculateTranslationProgress(stringtableContent) {
  let totalLines = stringtableContent.length;
  let translatedLines = Array(10).fill(0);
  stringtableContent.forEach(line => {
      const key = line.split('=')[0];

      const translations = line.split('=')[1].split(';');
      if(translations.length !== 20) return;
      for (const [langIndex, langName] of Object.entries(languages)){
          if(translations[langIndex*2].length !== 0 && translations[langIndex*2] !== `[${translations[langName]}]`) {
              translatedLines[langIndex]++;
          }
      }
  });
  return {totalLines, progress: translatedLines.map((value) => `${(value/totalLines*100).toFixed(2)}%`)};
}

export function copyUnionStarterFormatToModmanagerFormat(USDirPath, MMDirPath){
  fs.readdirSync(USDirPath).forEach((directory) => {
    console.log("Preparing directory", directory)
    const directoryPath = path.join(USDirPath, directory);
    if (!fs.statSync(directoryPath).isDirectory()) return;
    copyPictures(directoryPath, path.join(MMDirPath, directory));
    copyModFiles(directoryPath, path.join(MMDirPath, directory));
    copyScripts(directoryPath, path.join(MMDirPath, directory));
  });

}

export function copyPictures(USDirPath, MMDirPath) {
  const picturesPath = path.join(USDirPath, 'pictures');
  if (!fs.existsSync(picturesPath)) return;

  const targetImagesPath = path.join(MMDirPath, 'images');

  fs.readdirSync(picturesPath).forEach((file) => {
    const sourcePath = path.join(picturesPath, file);
    const targetPath = path.join(targetImagesPath, file);

    if (!fs.existsSync(sourcePath)) return;

    try {
      ensureDirectoryExists(targetImagesPath);
      fs.copyFileSync(sourcePath, targetPath);
    } catch (error) {
      console.error(`Error copying ${file}:`, error.message);
    }
  });
}

export function copyModFiles(USDirPath, MMDirPath){
  const modFilesPath = path.join(USDirPath, 'ModFiles');
  if (!fs.existsSync(modFilesPath)) return;
  fs.readdirSync(modFilesPath).forEach((file) => {
    try {
      if(file.endsWith('.ini')) return;
      const filePath = path.join(modFilesPath, file);
      if (!fs.existsSync(filePath)) return;
      ensureDirectoryExists(path.join(MMDirPath));
      fs.copyFileSync(filePath, path.join(MMDirPath, file));
    } catch (error) {
      console.error(`Error copying ${file}:`, error.message);
    }
  });
}

export function copyScripts(USDirPath, MMDirPath){
  const scriptsRootPath = path.join(USDirPath, 'ScriptFiles');
  if (!fs.existsSync(scriptsRootPath)) return;
  const scriptsPath = path.join(scriptsRootPath, 'scripts');
  if (!fs.existsSync(scriptsPath)) return;
  fs.readdirSync(scriptsPath).forEach((file) => {
    try {
      const filePath = path.join(scriptsPath, file);
      if (!fs.existsSync(filePath)) return;
      ensureDirectoryExists(path.join(MMDirPath));
      fs.copyFileSync(filePath, path.join(MMDirPath, file));
    } catch (error) {
      console.error(`Error copying ${file}:`, error.message); 
    }
  });
  const iniPath = path.join(scriptsRootPath, 'ini');
  if (!fs.existsSync(iniPath)) return;
  fs.readdirSync(iniPath).forEach((file) => {
    try {
      const filePath = path.join(iniPath, file);
      if (!fs.existsSync(filePath)) return;
      ensureDirectoryExists(path.join(MMDirPath));
      fs.copyFileSync(filePath, path.join(MMDirPath, file));
    } catch (error) {
      console.error(`Error copying ${file}:`, error.message); 
    }
  });
}


export function compareDirectoryNames(MODS_US, MODS_PL){
  const usDirs = fs.readdirSync(MODS_US);
  const plDirs = fs.readdirSync(MODS_PL);
  const missingDirs = plDirs.filter(dir => !usDirs.includes(dir));
  const extraDirs = usDirs.filter(dir => !plDirs.includes(dir));
  console.log('Missing directories:', JSON.stringify(missingDirs));
  console.log('Extra directories:', JSON.stringify(extraDirs).replace(',', '\n'));
}



export function getModInfo(MODS_US) {
  const usDirs = fs.readdirSync(MODS_US);
  const modInfo = [];
  usDirs.forEach(dir => {
    const modPath = path.join(MODS_US, dir);
    const iniPath = path.join(modPath, 'Mod.ini');
    const iniInfo = parseIni(iniPath);
    modInfo.push({
      name: iniInfo['Name'] ?? 'Unknown',
      category: iniInfo['Category'] ?? 'Unknown',
      required: iniInfo['Required'] ?? 'Unknown',
      incompatible: iniInfo['Incompatible'] ?? 'Unknown',
    });
  });
  return modInfo.map(item=>{
    return {
      name: item.name,
      category: item.category,
      required: item.required.split(';'),
      incompatible: item.incompatible.split(';'),
    }
  }).filter(item=>item.required.length > 0 && item.incompatible.length > 0);
}

export function parseIni(iniPath) {
  const iniContent = fs.readFileSync(iniPath, 'utf8');
  const iniLines = iniContent.split('\r\n');
  const iniInfo = {};
  iniLines.forEach(line => {
    const key = line.split('=')[0];
    const value = line.split('=')[1];
    iniInfo[key] = value;
  });
  return iniInfo;
}


export  function saveModInfo(info) {
  fs.writeFileSync(path.join("D:\\Repos\\Union+ v1.5.4\\infos", `${info.name}.json`), JSON.stringify(info, null, 2));
}



export function copyStringtablesToRepository(USDirPath, RepositoryDirPath) {
  const modsFilesPath = fs.readdirSync(USDirPath);
  modsFilesPath.forEach(dir => {
    if(!fs.statSync(path.join(USDirPath, dir)).isDirectory()) return;
      const modPath = path.join(USDirPath, dir);
      const stringtablePath = path.join(modPath, "ModFiles","stringtable.ini");
      if (!fs.existsSync(stringtablePath)) return;
      try {
        ensureDirectoryExists(path.join(RepositoryDirPath, dir));
        fs.copyFileSync(stringtablePath, path.join(RepositoryDirPath, dir, "stringtable.ini"));
        console.log(`Copying stringtable for ${dir}`);
      } catch (error) {
        console.error(`Error copying ${dir}:`, error.message);
      }
  }); 
}

export function copyModIniToRepository(USDirPath, RepositoryDirPath){
  const modsFilesPath = fs.readdirSync(USDirPath);
  modsFilesPath.forEach(dir => {
    if(!fs.statSync(path.join(USDirPath, dir)).isDirectory()) return;
      const modPath = path.join(USDirPath, dir);
      const modIniPath = path.join(modPath, "Mod.ini");
      if (!fs.existsSync(modIniPath)) return;
      try {
        ensureDirectoryExists(path.join(RepositoryDirPath, dir));
        fs.copyFileSync(modIniPath, path.join(RepositoryDirPath, dir, "Mod.ini"));
        console.log(`Copying mod.ini for ${dir}`);
      } catch (error) {
        console.error(`Error copying ${dir}:`, error.message);
      }
  }); 
}

export function copyModInisToRepository(USDirPath, RepositoryDirPath){
  const modsFilesPath = fs.readdirSync(USDirPath);
  modsFilesPath.forEach(dir => {
    if(!fs.statSync(path.join(USDirPath, dir)).isDirectory()) return;
      const modPath = path.join(USDirPath, dir);
      const inisFolderPath = path.join(modPath,"ScriptFiles","Ini");
      if (!fs.existsSync(inisFolderPath)) return;
      fs.readdirSync(inisFolderPath).forEach(file => {
        const filePath = path.join(inisFolderPath, file);
        if (!fs.statSync(filePath).isFile() || !file.endsWith('.ini')) return;
        try {
          ensureDirectoryExists(path.join(RepositoryDirPath, dir));
          fs.copyFileSync(filePath, path.join(RepositoryDirPath, dir, file));
          console.log(`Copying ${file} for ${dir}`);
        } catch (error) {
          console.error(`Error copying ${file} for ${dir}:`, error.message);
        }
      });
  }); 
}

export function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}