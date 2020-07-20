const fs = require('fs-extra');
const { panelHtml } = require('./generate-panelHtml');

console.log('==== Building Component ====');
let html = panelHtml();
html = 'const panelHtml = `' + html + '`;\nmodule.exports = {panelHtml};';
fs.writeFileSync('./components/panelHtml.js', html);

