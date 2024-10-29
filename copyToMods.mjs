import fs from 'fs'
import path from 'path'

const STRINGTABLEMOD = 'stringtableMod.ini'
const STRINGTABLE = 'stringtable.ini'
const readme = 'ReadmePL.rtf'

const repoPath = path.resolve('D:\\Repos\\G3-FanMods')
const modsPath = path.resolve('C:\\Users\\Komputeriusz\\Desktop\\Union+ v1.3.3 Full\\Mods')


function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Skopiowano ${src} do ${dest}`);
}


const directories = fs.readdirSync(repoPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

directories.forEach(dir => {
  const srcPath = path.join(repoPath, dir, STRINGTABLEMOD);
  const readmePath = path.join(repoPath,dir, readme)
  const destPath = path.join(modsPath, dir, 'ModFiles', STRINGTABLE);
  const readmeDestPath = path.join(modsPath, dir, 'Readme', readme);
  if (fs.existsSync(srcPath)) {
    copyFile(srcPath, destPath);
  } else {
    console.log(`Plik ${srcPath} nie istnieje`);
  }

  if (fs.existsSync(readmePath)) {
    copyFile(readmePath, readmeDestPath);
  } else {
    console.log(`Plik ${readmePath} nie istnieje`);
  }
});