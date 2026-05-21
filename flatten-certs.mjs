import fs from 'fs';
import path from 'path';

const constantsPath = path.resolve('constants.ts');
const targetDir = path.resolve('public', 'assets', 'certi');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let content = fs.readFileSync(constantsPath, 'utf8');

const startIndex = content.indexOf('export const CERTIFICATE_ARCHIVE');
if (startIndex !== -1) {
  const endIndex = content.indexOf('];', startIndex) + 2;
  let archiveContent = content.substring(startIndex, endIndex);

  const fileRegex = /file:\s*["'](\/assets\/([^"']+\/)?([^"']+\.(pdf|png|jpe?g|webp|svg)))["']/g;
  let match;
  let newArchiveContent = archiveContent;

  const usedNames = new Set();

  while ((match = fileRegex.exec(archiveContent)) !== null) {
    const originalVirtualPath = match[1];
    let fileName = match[3];

    // Some filenames might have spaces or weird characters, we keep them as is
    let baseName = path.parse(fileName).name;
    const ext = path.parse(fileName).ext;
    let counter = 1;
    let uniqueName = fileName;
    while (usedNames.has(uniqueName)) {
      uniqueName = `${baseName}_${counter}${ext}`;
      counter++;
    }
    usedNames.add(uniqueName);

    // Decode URL if necessary, though paths seem literal in constants.ts
    const oldPhysicalPath = path.join(process.cwd(), 'public', ...originalVirtualPath.split('/'));
    const newPhysicalPath = path.join(targetDir, uniqueName);
    const newVirtualPath = `/assets/certi/${uniqueName}`;

    if (fs.existsSync(oldPhysicalPath)) {
      if (oldPhysicalPath !== newPhysicalPath) {
         // Copy then delete to be safe across partitions, though renameSync usually works
         fs.copyFileSync(oldPhysicalPath, newPhysicalPath);
         fs.unlinkSync(oldPhysicalPath);
         console.log(`Moved: ${originalVirtualPath} -> ${newVirtualPath}`);
      }
    } else {
      console.warn(`Warning: File not found: ${oldPhysicalPath}`);
    }

    // Replace the exact path string in the archive content
    const escapeRegex = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const replaceRegex = new RegExp(`file:\\s*["']${escapeRegex(originalVirtualPath)}["']`, 'g');
    newArchiveContent = newArchiveContent.replace(replaceRegex, `file: "${newVirtualPath}"`);
  }

  content = content.substring(0, startIndex) + newArchiveContent + content.substring(endIndex);
  fs.writeFileSync(constantsPath, content, 'utf8');
  console.log('constants.ts updated successfully.');

  // Cleanup old empty directories
  const emptyDirs = [
    'Coursera', 'Events', 'GREAT LEARNIG', 'hackathon', 'Hackerrank',
    'HP', 'Interen', 'KRCT', 'learnathon', 'Microsoft', 'NPTEL',
    'NSS', 'Patent', 'Simplilearn', 'Workshop'
  ];
  emptyDirs.forEach(dir => {
    const p = path.join(process.cwd(), 'public', 'assets', dir);
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
      console.log(`Removed old directory: ${dir}`);
    }
  });

} else {
  console.error("CERTIFICATE_ARCHIVE not found in constants.ts");
}
