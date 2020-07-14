const fs = require('fs-extra');
const extract = require('extract-svg-path');
const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');
const { iconsHtml } = require('./generate-iconsHtml');

function getIcon(svg, filename, meta) {
    const name = filename.replace('.svg','');
    const contents = fs.readFileSync(svg, 'utf-8');
    const path = extract.parse(contents);
    const metadata = meta.find(entry => entry.name == name);
    const icon = {
        'name': name,
        'aliases': metadata.aliases,
        'pathData': path,
        'tags': metadata.tags,
        'community': (metadata.author != 'Google')
    };
    return icon;
}

function buildIcons() {
    const base = './node_modules/@mdi/svg';
    let icons = [];
    const svgs = fs.readdirSync(base + '/svg', {withFileTypes: true});
    const meta = JSON.parse(fs.readFileSync(base + '/meta.json','utf-8'));
    
    for (const svg of svgs) {
        icons.push(getIcon(base + '/svg/' + svg.name, svg.name, meta));
        // if (icons.length > 10) { break; }
    }
    return icons;
}

function panelHtml() {
    
    let htmlSrc = fs.readFileSync('./templates/panel.html', 'utf-8');
    let cssSrc = fs.readFileSync('./templates/panel.css', 'utf-8');

    let iconsSrc = iconsHtml(buildIcons());

    htmlSrc = htmlSrc.replace('/* ### Styles ### */', cssSrc);
    htmlSrc = htmlSrc.replace(`<!-- ### Icons ### -->`, iconsSrc);

    // return minify({
    //     compressor: htmlMinifier,
    //     content: htmlSrc
    // });
    return htmlSrc;
}

module.exports = { panelHtml }
