import fs from 'fs';
import path from 'path';

const constantsPath = path.resolve('constants.ts');
const content = fs.readFileSync(constantsPath, 'utf8');

// Match everything inside quotes that starts with /assets/
const regex = /["'](\/assets\/[^"']+)["']/g;
const keepPaths = new Set();

let match;
while ((match = regex.exec(content)) !== null) {
  // Store the exact path as written in constants.ts
  keepPaths.add(match[1]);
}

const assetsDir = path.resolve('public', 'assets');
const targetDirs = [
  'Coursera', 'Events', 'GREAT LEARNIG', 'hackathon', 'Hackerrank',
  'HP', 'Interen', 'KRCT', 'learnathon', 'Microsoft', 'NPTEL',
  'NSS', 'Patent', 'Simplilearn', 'Workshop'
];

let deletedCount = 0;

function cleanDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      cleanDir(fullPath);
    } else {
      // Reconstruct the virtual path to match the format in constants.ts
      // e.g., e:\GDs-Portfolio\public\assets\Simplilearn\KRCT\file.pdf -> /assets/Simplilearn/KRCT/file.pdf
      const relPath = path.relative(assetsDir, fullPath).replace(/\\/g, '/');
      const virtualPath = `/assets/${relPath}`;

      if (!keepPaths.has(virtualPath)) {
        console.log(`Deleting: ${virtualPath}`);
        fs.unlinkSync(fullPath);
        deletedCount++;
      }
    }
  }
}

targetDirs.forEach(subDir => {
  const fullPath = path.join(assetsDir, subDir);
  if (fs.existsSync(fullPath)) {
    cleanDir(fullPath);
  }
});

console.log(`\nDeleted ${deletedCount} unused certificate files.`);
