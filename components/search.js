const { icons } = require('./icons');
const { iconItem } = require('./iconItem');

const _limit = 50;

function search(panel, search) {
    for(var i=0; i < _limit; i++){
        const _icon = panel.querySelector('#icon-' + i);
        _icon.classList.remove('show');
        _icon.classList.add('hide');
    }
    var total = 0;
    let lookFor = new RegExp(search.toLowerCase());
    for(var i=0; i < icons.length; i++) {
        const icon = icons[i];
        if (lookFor.test(icon.search)) {
            if(total < _limit) {
                iconItem(panel, icon, total);
            }
            total++;
        }
    }
    const _err = panel.querySelector("#err");
    if (total === 0) {
        _err.classList.remove('hide');
        _err.classList.add('show');
        _err.innerHTML = 'None found';
    } else
    if (total > _limit) {
        _err.classList.remove('hide');
        _err.classList.add('show');
        _err.innerHTML = `${_limit} of ${total} shown`;
    } else {
        _err.classList.remove('show');
        _err.classList.add('hide');
    }
}

module.exports = { search };
