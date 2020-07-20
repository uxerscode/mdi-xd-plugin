const fs = require('fs-extra');

const appId = '15d3ddbb'; // Adobe XD Extension Id
const base = './' + appId; // Base for distribution

console.log('==== Building Distribution ====');
fs.ensureDirSync(base);
fs.emptyDirSync(base);
fs.copySync('main.js', base + '/main.js');
fs.ensureDir(base + '/components');
fs.copySync('./components', base + '/components');
fs.ensureDir(base + '/images');
fs.copySync('./images', base + '/images');


// TODO Build Zip File
