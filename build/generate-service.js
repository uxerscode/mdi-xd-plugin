const fs = require('fs-extra');
const extract = require('extract-svg-path');
const { iconsHtml } = require('./generate-iconsHtml');

function getIcon(svg, filename) {
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

const base = './node_modules/@mdi/svg';
let icons = [];
const svgs = fs.readdirSync(base + '/svg', {withFileTypes: true});
const meta = JSON.parse(fs.readFileSync(base + '/meta.json','utf-8'));

for (const svg of svgs) {
    icons.push(getIcon(base + '/svg/' + svg.name, svg.name));
    if (icons.length > 10) { break; }
}

const service = 'const icons = ' +
    JSON.stringify(icons) +
    ';\n' +
    'function getIcons() { return icons; }\n' +
    'module.exports = { getIcons };\n';

fs.writeFileSync('./services/mdi.js', service);

const html = iconsHtml(icons);
const iconScript = 'const iconHtml = `' + html + '`;\nmodule.exports = { iconHtml };\n';
fs.writeFileSync('./components/iconHtml.js', iconScript);
