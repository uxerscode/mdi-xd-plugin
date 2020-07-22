const fs = require('fs-extra');
const minify = require('@node-minify/core');
const uglify = require('@node-minify/uglify-es');

const appId = '15d3ddbb'; // Adobe XD Extension Id
const base = './' + appId; // Base for distribution

async function compressJS(input, output) {
    await minify({
        compressor: uglify,
        input: input,
        output: output
    });
}
console.log('==== Building Distribution ====');
fs.ensureDirSync(base);
fs.emptyDirSync(base);
fs.ensureDir(base + '/images');
fs.copySync('./images', base + '/images');
compressJS('main.js', base + '/main.js');
fs.ensureDirSync(base + '/components');
compressJS('./components/createIcon.js', base + '/components/createIcon.js');
compressJS('./components/iconEvents.js', base + '/components/iconEvents.js');
compressJS('./components/panelHtml.js', base + '/components/panelHtml.js');

// TODO Build Zip File
