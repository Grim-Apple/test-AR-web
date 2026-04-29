const fs = require('fs');
const path = require('path');
// script to create a models.json file from the module folder it must auto search the glb files and create a usdz file if there is a same name usdz file
// node build-models.js

const moduleDir = path.join(__dirname, 'module');
const outputFile = path.join(moduleDir, 'models.json');

try {
    const files = fs.readdirSync(moduleDir);

    const usdzFiles = files.filter(f => f.toLowerCase().endsWith('.usdz'));

    const models = [];
    let idCounter = 1;

    files.forEach(file => {
        if (file.toLowerCase().endsWith('.glb')) {
            const name = file.replace(/\.glb$/i, '');
            const usdzFilename = name + '.usdz';
            const hasUsdz = usdzFiles.includes(usdzFilename);

            const modelObj = {
                id: String(idCounter++),
                name: name,
                glb: `module/${file}`
            };

            if (hasUsdz) {
                modelObj.usdz = `module/${usdzFilename}`;
            }

            models.push(modelObj);
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(models, null, 2));
    console.log(`Successfully generated models.json with ${models.length} models.`);
} catch (error) {
    console.error("Error generating models.json:", error);
}
