const fs = require('fs-extra');
const { panelHtml } = require('./generate-panelHtml');
const { iconsJS } = require('./generate-icons');

async function outputHtml() {
    let html = await panelHtml();
    html = 'const panelHtml = `' + html + '`;\nmodule.exports = {panelHtml};';
    fs.writeFileSync('./components/panelHtml.js', html);
}

async function outputIcons() {
    let js = await iconsJS();
    fs.writeFileSync('./components/icons.js', js);
}

console.log('==== Building Component ====');
outputHtml();
console.log('==== Building Data =========');
outputIcons();

