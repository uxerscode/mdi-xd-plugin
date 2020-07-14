const fs = require('fs-extra');
const { panelHtml } = require('./generate-panelHtml');

// panelHtml()
// .then((html) => {
//     html = 'const PanelHtml = `' + html + '`; module.exports = {PanelHtml};';
//     fs.writeFileSync('./components/panelHtml-test.js', html);
// });

let html = panelHtml();
html = 'const PanelHtml = `' + html + '`; module.exports = {PanelHtml};';
fs.writeFileSync('./components/panelHtml-test.js', html);
