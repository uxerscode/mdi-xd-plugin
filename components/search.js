const { icons } = require('./icons');


function search(panel, search) {
    const _iconList = panel.querySelectorAll('#icons .icons--item');
    const _warn = panel.querySelector("#warn");
    const _err = panel.querySelector("#err");
    var total = 0;
    let lookFor = new RegExp(search.toLowerCase());
    icons.forEach(icon => {
        if (lookFor.test(icon.search)) {
            total++;
        }
    });
    if (total === 0) {
        _err.classList.remove('hide');
        _err.classList.add('show');
    } else
    if (total > 25) {
        _warn.classList.remove('hide');
        _warn.classList.add('show');
        _err.classList.remove('show');
    } else {
        _warn.classList.remove('show');
        _warn.classList.add('hide');
        _err.classList.remove('show');
    }
}

module.exports = { search };
 