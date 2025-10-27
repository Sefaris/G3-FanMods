import { readFileUTF16,checkMods, isValidFile, calculateTranslationProgress, compareDirectoryNames, validateAllDirectories, copyUnionStarterFormatToModmanagerFormat, getModInfo, copyStringtablesToRepository, copyModIniToRepository, copyModInisToRepository } from './utils.mjs';
import { replaceTranslation } from './lineReplacer.mjs';

const MODS_US = "D:\\Sefaris\\G3\\Modpack 161\\ModsUS";
const MODS_PL = "D:\\Sefaris\\G3\\Modpack 161\\Mods";
const REPOSITORY = "D:\\Sefaris\\G3\\Modpack 161\\repo";
const gitRepo = "D:\\Repos\\G3-FanMods";
//copyUnionStarterFormatToModmanagerFormat(MODS_US, MODS_PL);
//compareDirectoryNames(MODS_US, MODS_PL);
//console.log(JSON.stringify(getModInfo(MODS_US)));
//getModInfo(MODS_US).forEach(info => saveModInfo(info));
// copyStringtablesToRepository(MODS_US, REPOSITORY);
// copyModIniToRepository(MODS_US, REPOSITORY);
// copyModInisToRepository(MODS_US, REPOSITORY);

//validateAllDirectories(gitRepo);

const source = "D:\\Repos\\GermanG3\\N_Main\\ModFiles\\stringtable.ini";
const destination = "D:\\Repos\\G3-FanMods\\A_2_BaseMod\\stringtable.ini";


//replaceTranslation(source, destination, destination, "GER");

//checkMods(gitRepo);