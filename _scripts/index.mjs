import { readFileUTF16, isValidFile, calculateTranslationProgress, compareDirectoryNames, copyUnionStarterFormatToModmanagerFormat, getModInfo, copyStringtablesToRepository, copyModIniToRepository, copyModInisToRepository } from './utils.mjs';

const MODS_US = "D:\\Sefaris\\G3\\Modpack 161\\ModsUS";
const MODS_PL = "D:\\Sefaris\\G3\\Modpack 161\\Mods";
const REPOSITORY = "D:\\Sefaris\\G3\\Modpack 161\\repo";

//copyUnionStarterFormatToModmanagerFormat(MODS_US, MODS_PL);
//compareDirectoryNames(MODS_US, MODS_PL);
//console.log(JSON.stringify(getModInfo(MODS_US)));
//getModInfo(MODS_US).forEach(info => saveModInfo(info));
// copyStringtablesToRepository(MODS_US, REPOSITORY);
// copyModIniToRepository(MODS_US, REPOSITORY);
// copyModInisToRepository(MODS_US, REPOSITORY);