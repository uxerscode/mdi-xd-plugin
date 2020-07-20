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

function iconHtml(icon) {
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
    let html = `<li class="icons--item `  +  icon.name + (icon.google ? ' google' : '') +
            `" data-icon-search="` + searchTerms +
            `" data-icon-name="` + icon.name +
            `" data-icon-path="` + icon.pathData +
            `" title="` + icon.name + '\n' + icon.author +
            `">
            <span class="icon--sample">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="` + icon.pathData + `" />
                </svg>
            </span>
            <span class="icon--label">` + icon.name + `</span>
        </li>`;
    return html;
}

function buildIcons() {
    const base = './node_modules/@mdi/svg';
    let icons = [];
    const svgs = fs.readdirSync(base + '/svg', {withFileTypes: true});
    const meta = JSON.parse(fs.readFileSync(base + '/meta.json','utf-8'));
    
    for (const svg of svgs) {
        icons.push(getIcon(base + '/svg/' + svg.name, svg.name, meta));
        // if (icons.length > 50) { break; }
    }
    return icons;
}

function iconsHtml() {
    let icons = buildIcons();
    let iconSrc = '';
    icons.forEach( icon => {
        iconSrc += iconHtml(icon);
    });
    let html = fs.readFileSync('./templates/icons.html','utf-8');
    html = html.replace('<!-- Icons -->', iconSrc);
    return html;
}

module.exports = {
    iconsHtml
}