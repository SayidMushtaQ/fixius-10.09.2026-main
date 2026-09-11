const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk('.');
for (const file of files) {
    const code = fs.readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
    const parseDiagnostics = sourceFile.parseDiagnostics;
    if (parseDiagnostics.length > 0) {
        console.log(`Syntax error in ${file}`);
    }
}
console.log("Syntax check complete.");
