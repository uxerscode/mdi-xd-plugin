const fs = require('fs-extra');
const extract = require('extract-svg-path');

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
        'author': metadata.author,
        'google': (metadata.author === 'Google')
    };
    return icon;
}

function iconJS(icon) {
    let searchTerms = icon.name.toLowerCase();
    for (const alias of icon.aliases) {
        searchTerms += ',' + alias.toLowerCase();
    }
    for (const tag of icon.tags) {
        const values = tag.split('/');
        for (const value of values) {
            searchTerms += ',' + value.trim().toLowerCase();
        }
    }
    let json = `{\n` +
            `"icon": "`  +  icon.name + `",\n` +
            `"google": ` + (icon.google ? `"true",` : `"false",`) + `\n` +
            `"search": "` + searchTerms + `",\n` +
            `"name": "` + icon.name + `",\n` +
            `"path": "` + icon.pathData + `",\n` +
            `"author": "` + icon.author + `"\n` +
            `},\n`;
    return json;
}

function buildIcons() {
    const base = './node_modules/@mdi/svg';
    let icons = [];
    const svgs = fs.readdirSync(base + '/svg', {withFileTypes: true});
    const meta = JSON.parse(fs.readFileSync(base + '/meta.json','utf-8'));
    
    for (const svg of svgs) {
        icons.push(getIcon(base + '/svg/' + svg.name, svg.name, meta));
    }
    return icons;
}

function iconsJS() {
    let icons = buildIcons();
    let iconSrc = `const icons = [\n`;
    icons.forEach( icon => {
        iconSrc += iconJS(icon);
    });
    iconSrc += `];\n` +
        `module.exports = { icons };\n`;
    return iconSrc;
}

module.exports = {
    iconsJS
}