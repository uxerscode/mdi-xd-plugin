const fs = require('fs-extra');
const extract = require('extract-svg-path');
const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');
// const { iconsHtml } = require('./generate-iconsHtml');

async function panelHtml() {
    
    let htmlSrc = fs.readFileSync('./templates/panel.html', 'utf-8');

    let cssSrc = fs.readFileSync('./templates/panel.css', 'utf-8');
    htmlSrc = htmlSrc.replace('/* ### Styles ### */', cssSrc);

    // let iconsSrc = iconsHtml();
    // htmlSrc = htmlSrc.replace(`<!-- ### Icons ### -->`, iconsSrc);

    htmlSrc = await minify({
        compressor: htmlMinifier,
        content: htmlSrc
    });
    return htmlSrc;
}

module.exports = { panelHtml }
