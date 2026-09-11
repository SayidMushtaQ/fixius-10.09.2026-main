const fs = require('fs');
const path = require('path');


const pagesDirectory = path.join(process.cwd(), 'components/craftsman-near-me');
const outputFilePath = path.join(process.cwd(), 'constants/CraftsmanNearMeSiteMaps/index.json');


function getNextJsComponentFileNames(directory) {
  const componentFiles = [];

  function readDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        readDirectory(fullPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (ext === '.tsx' || ext === '.jsx') {
          componentFiles.push(item.replace(ext, ''));
        }
      }
    });
  }

  readDirectory(directory);
  return componentFiles;
}

const componentFileNames = getNextJsComponentFileNames(pagesDirectory);
fs.writeFileSync(outputFilePath, JSON.stringify(componentFileNames, null, 2));
console.log(componentFileNames);