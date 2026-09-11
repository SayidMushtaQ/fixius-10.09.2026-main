const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components', 'constants', 'lib', 'helper', 'backend', 'scripts'];
const exts = ['.ts', '.tsx', '.js', '.jsx', '.md', '.json', '.html'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (exts.includes(path.extname(file))) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = targetDirs.reduce((acc, dir) => {
  const fullPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullPath)) {
    return acc.concat(walk(fullPath));
  }
  return acc;
}, []);

let changedFilesCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Replace Variations
  content = content.replace(/Oficios24/g, 'Fixius');
  content = content.replace(/oficios24/g, 'fixius');
  content = content.replace(/OFICIOS24/g, 'FIXIUS');
  content = content.replace(/Oficios 24/g, 'Fixius');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFilesCount++;
  }
});

console.log(`Replaced Oficios24 with Fixius in ${changedFilesCount} files.`);
