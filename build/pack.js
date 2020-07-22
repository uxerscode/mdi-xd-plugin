const path = require('path');
const fs = require('fs-extra');
const minify = require('@node-minify/core');
const uglify = require('@node-minify/uglify-es');
const zip = require('adm-zip');

const install = 'MDI.xdx';
const appId = '15d3ddbb'; // Adobe XD Extension Id
const base = './' + appId; // Base for distribution

async function compressJS(input, output) {
    await minify({
        compressor: uglify,
        input: input,
        output: output
    });
}

function getAppFiles(dirPath, files) {
    const fileList = fs.readdirSync(dirPath);
    fileList.forEach((file) => {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            files = getAppFiles(dirPath + "/" + file, files);
        } else {
            files.push(dirPath + '/' + file);
        }
    });
    return files;
}

console.log('==== Building Distribution ====');
fs.ensureDirSync(base);
fs.emptyDirSync(base);
fs.copySync('manifest.json', base + '/manifest.json');
fs.ensureDir(base + '/images');
fs.copySync('./images', base + '/images');
compressJS('main.js', base + '/main.js');
fs.ensureDirSync(base + '/components');
compressJS('./components/createIcon.js', base + '/components/createIcon.js');
compressJS('./components/iconEvents.js', base + '/components/iconEvents.js');
compressJS('./components/panelHtml.js', base + '/components/panelHtml.js');
fs.ensureDirSync(base + '/lib');
compressJS('./lib/utils.js', base + '/lib/utils.js');

// Build the install file
if(fs.existsSync('./' + install)) {
    fs.unlinkSync('./' + install);
}
let xdx = new zip();
let files = [];
files = getAppFiles('./' + appId, files);
files.forEach((file) => {
    const dir = path.dirname(file).replace('./', '');
    xdx.addLocalFile(file, dir);
});
xdx.writeZip(install);

console.log('==== Completed ====');
