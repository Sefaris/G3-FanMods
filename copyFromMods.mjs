import fs from 'fs';
import path from 'path';

const STRINGTABLE = 'stringtable.ini';
const READMEPL = 'ReadmePL.rtf';
const READMERU = 'ReadmeRU.rtf';
const OUTPUT_DIR = path.resolve('D:\\Repos\\UnionMods');
const INPUT_DIR = path.resolve('C:\\Users\\Komputeriusz\\Desktop\\Union+ v1.4 Full\\Mods');

function searchAndCopyFiles(baseDir, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const directories = fs.readdirSync(baseDir).filter(file => {
        return fs.statSync(path.join(baseDir, file)).isDirectory();
    });

    directories.forEach(dir => {
        const modFilesPath = path.join(baseDir, dir, 'ModFiles', STRINGTABLE);
        const readmePLPath = path.join(baseDir, dir, 'readme', READMEPL);
        const readmeRUPath = path.join(baseDir, dir, 'readme', READMERU);
        const targetDir = path.join(outputDir, dir);

        if (fs.existsSync(modFilesPath)) {
            const targetModFilesDir = path.join(targetDir);
            if (!fs.existsSync(targetModFilesDir)) {
                fs.mkdirSync(targetModFilesDir, { recursive: true });
            }
            fs.copyFileSync(modFilesPath, path.join(targetModFilesDir, STRINGTABLE));
        }

        if (fs.existsSync(readmePLPath)) {
            const targetReadmeDir = path.join(targetDir);
            if (!fs.existsSync(targetReadmeDir)) {
                fs.mkdirSync(targetReadmeDir, { recursive: true });
            }
            fs.copyFileSync(readmePLPath, path.join(targetReadmeDir, READMEPL));
        } else if (fs.existsSync(readmeRUPath)) {
            const targetReadmeDir = path.join(targetDir);
            if (!fs.existsSync(targetReadmeDir)) {
                fs.mkdirSync(targetReadmeDir, { recursive: true });
            }
            fs.copyFileSync(readmeRUPath, path.join(targetReadmeDir, READMERU));
        }
    });
}

searchAndCopyFiles(INPUT_DIR, OUTPUT_DIR);
