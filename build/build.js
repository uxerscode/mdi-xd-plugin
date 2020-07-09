const fs = require('fs-extra');
const path = require('path');
const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-es');
const jsonminify = require('@node-minify/jsonminify');
const AdmZip = require('adm-zip');

const dist = '15d3ddbb';
let xdx = new AdmZip();

function buildFileList(base, dest, list, source) {
    const entries = fs.readdirSync(base + source, {withFileTypes: true});
        for (const entry of entries) {
            if (entry.isDirectory()) {
                list = buildFileList(base + source + '/' + entry.name + '/', dest + source + '/' + entry.name + '/', list, '');
            } else {
                list.push({ source: base + entry.name, dest: dest + entry.name });
            }
        }
    return list;
}

function minifyFiles(source, dest) {
    let files = [];
    for (const file of source) {
        if (file.includes('/**')) {
            const dir = file.replace('/**','');
            files = buildFileList('./' + dir + '/', './' + dest + '/' + dir + '/', files, '');
        } else {
            files.push({source: './' + file, dest: './' + dest + '/' + file});
        }
    }
    for (const entry of files) {
        const dest = path.dirname(entry.dest);
        fs.ensureDirSync(dest);
        if (entry.source.includes('.json')) {
            minify({
                compressor: jsonminify,
                input: entry.source,
                output: entry.dest,
                callback: function(err, min) {}
            });
        } else {
            if (entry.source.includes('.js')) {
                minify({
                    compressor: uglifyJS,
                    input: entry.source,
                    output: entry.dest,
                    callback: function(err, min) {}
                });
            } else {
                fs.copySync(entry.source, entry.dest);
            }
        }
    }
}

function addFilesToXDX(base, dir) {
    const entries = fs.readdirSync('./' + base + '/' + dir, {withFileTypes: true});
    for (const entry of entries) {
        if (entry.isDirectory()) {
            addFilesToXDX(base + '/' + dir, entry.name);
        } else {
            const name = (base + '/' + dir + '/' + entry.name).substr(1);
            const dest = (base + '/' + dir).substr(1);
            xdx.addLocalFile(name, dest);
        }
    }
}

fs.removeSync(dist);
fs.mkdirSync(dist);

const input = [
    'main.js',
    'manifest.json',
    'components/**',
    'lib/**',
    'services/**',
    'images/**'
];

// for (const file of input) {
//     if (file.includes('/**')) {
//         const dir = file.replace('/**','');
//         fs.copySync(dir, dist + '/' + dir);
//     } else {
//         if (file.indexOf('.js') > -1) {
//             fs.createReadStream(file)
//                 .pipe(minify({ sourceMap: false}))
//                 .pipe(fs.createWriteStream(dist + '/' + file));
//         } else {
//             fs.copySync(file, dist + '/' + file);
//         }
//     }
// }
minifyFiles(input, dist);
addFilesToXDX('', dist, xdx);
xdx.writeZip('./MDI.xdx');
