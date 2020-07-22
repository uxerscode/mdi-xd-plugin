const fs = require('fs-extra');
const { panelHtml } = require('./generate-panelHtml');

async function outputHtml() {
    let html = await panelHtml();
    html = 'const panelHtml = `' + html + '`;\nmodule.exports = {panelHtml};';
    fs.writeFileSync('./components/panelHtml.js', html);
}

console.log('==== Building Component ====');
outputHtml();

