const {
    icons
} = require('./icons');
const {
    iconItem
} = require('./iconItem');

var _listMode = true;
var _limit = 100;
var _first = 0;
var _searched = [];

function toggleList(panel, btn, searchTerm) {
    _listMode = !_listMode;
    if (_listMode) {
        btn.firstChild.src = `./images/view-grid.png`;
    } else {
        btn.firstChild.src = `./images/format-list-bulleted-square.png`;
    }
    search(panel, searchTerm);
}

function setMessage(panel) {
    const _end = (_first + _limit) >= _searched.length;
    const _msg = panel.querySelector("#msg");
    const _prevBtn = panel.querySelector('#btn-prev');
    const _nextBtn = panel.querySelector('#btn-next');
    const _prevBtnDisabled = panel.querySelector('#btn-prev-disabled');
    const _nextBtnDisabled = panel.querySelector('#btn-next-disabled');
    _prevBtnDisabled.classList.add('hide');
    _nextBtnDisabled.classList.add('hide');
    if (_searched.length === 0) {
        _msg.classList.remove('hide');
        _msg.innerHTML = 'None found';
        _prevBtn.classList.add('hide');
        _nextBtn.classList.add('hide');
    } else {
        _msg.innerHTML = `${_first+1}-${(_end ? _searched.length : (_first+_limit))} of ${_searched.length} shown`;
        _msg.classList.remove('hide');
        if (_first === 0) {
            _prevBtnDisabled.classList.remove('hide');
            _prevBtn.classList.add('hide');
        } else {
            _prevBtn.classList.remove('hide');
        }
        if (_end) {
            _nextBtnDisabled.classList.remove('hide');
            _nextBtn.classList.add('hide');
        } else {
            _nextBtn.classList.remove('hide');
        }
    }
}

function displaySearch(panel) {
    for (var i = 0; i < _limit; i++) {
        const _icon = panel.querySelector('#icon-' + i);
        _icon.className = '';
        _icon.classList.add('hide');
    }
    const last = (_first + _limit) > (_searched.length) ? (_searched.length) : (_first + _limit);
    for (var i = _first; i < last; i++) {
        iconItem(panel, _searched[i], i - _first, _listMode);
    }
    setMessage(panel);
}

function search(panel, searchTerm) {
    _searched = [];
    _first = 0;
    let lookFor = new RegExp(searchTerm.toLowerCase());
    for (var i = 0; i < icons.length; i++) {
        const icon = icons[i];
        if (lookFor.test(icon.search)) {
            _searched.push(icon);
        }
    }
    displaySearch(panel);
}

function next(panel) {
    _first += _limit;
    displaySearch(panel);
}

function prev(panel) {
    _first -= _limit;
    if (_first < 0) _first = 0;
    displaySearch(panel);
}

module.exports = {
    search,
    toggleList,
    next,
    prev
};