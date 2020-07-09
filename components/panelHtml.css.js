const PanelHtmlCss = `
#main {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 148px);
  // padding: 16px;
  // background: #333;
  // color: #FFF;
  border-radius: 4px;
}

header {
  display: flex;
  text-align: left;
  line-height: 48px;
}

header h1 {
  flex: 0;
  margin: 0 16px 0 0;
  padding: 0;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.0125em;
  color: #000;
  white-space: nowrap;
}

header h1 span {
  font-weight: normal;
  color: #555
}

header select {
  flex: 1;
}

.tab-set {
  display: flex;
  margin: 16px 0 8px;
  padding: 0;
  border-bottom: 1px solid #CCC;
}

.tab {
  margin-right: 2px;
  padding: 8px 16px;
  font-weight: 600;
  background: #FFF;
  border: 4px solid #FFF;
  border-width: 0 0 4px 0;
  border-radius: 2px 2px 0 0;
}
.tab:hover {
  color: #000;
  background: #FFF;
  border-color: #999;
}
.tab.active {
  color: #000;
  background: #FFF;
  border-color: #333;
}

#main > .content {
  flex: 1;
}

.add-to-assets {
  display: flex;
  justify-content: center;
}

.add-to-assets p {
  width: 100%;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: -0.25px;
  color: #FFF;
  background: green;
  border-radius: 4px;
}

.asset-category--title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 0 0;
  line-height: 32px;
}

.asset-category--title h1 {
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.125px;
  color: #333;
}

#components-fidelity .asset-group--title {
  display: flex;
}

#components-fidelity .asset-group--title span:last-child() {
  flex: 1;
  margin-left: 24px;
}

#components-fidelity select {
  width: 100%;
}

.asset-group {
  margin: 8px 0 0;
  padding: 0;
}

.asset__modified {
  font-style: italic;
}

.asset__modified .asset--label:after {
  content: ' *';
}

.asset-group--title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 300;
  text-transform: capitalize;
}

.asset-group--content {
  padding: 0 0 16px;
  border-bottom: 1px solid #CCC;
}

.asset-group--content ul {
  display: flex;
  flex-wrap: wrap;
}

.asset-group--item,
.asset-group--item-split-menu {
  display: flex;
  align-content: space-between;
  flex: 1;
  min-width: 160px;
  max-width: 300px;
  margin: 0 0 4px 4px;
  padding: 8px;
  line-height: 24px;
  background: #FFF;
  border: 1px solid #FFF;
  border-radius: 4px;
}

.asset-group--item.typography {
  flex-direction: column;
}

.asset--sample {
  height: 24px;
  width: 24px;
  border-radius: 12px;
  margin-right: 8px;
}

.asset--label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.asset--value {
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/**--- Split Menu ---**/
#components .asset-group--item {
  min-width: none;
  max-width: none;
  margin-left: 0;
}

#components .asset-group--content ul {
  display: block;
}

.asset-group--item-split-menu {
  flex: 1;
  flex-direction: column;
  min-width: none;
  max-width: none;
  margin-left: 0;
  padding: 0;
  border: 0;
}

.asset-group--item-split-menu .asset-group--item-header {
  display: flex;
  flex: 1;
  align-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.asset-group--item-split-menu .asset-group--item-header *:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.asset-group--item-split-menu .asset-group--item-header *:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.asset-group--item-split-menu .asset-group--item-header .asset-component {
  display: flex;
  flex: 1;
  padding: 8px;
  border: 1px solid #FFF;
}

.asset-group--item-split-menu .asset-group--item-header .asset-component:hover {
  border: 1px solid #999;
}
.asset-group--item-split-menu__open .asset-group--item-header *:first-child {
  border-bottom-left-radius: 0;
}

.asset-group--item-split-menu__open .asset-group--item-header *:last-child {
  border-bottom-right-radius: 0;
}

.asset--more {
  flex: 0;
  padding: 8px;
  border: 1px solid #FFF;
}

.asset--more:hover {
  // color: #FFF;
  border-color: #999;
}

.asset-group--item-split-menu .asset--more .close-menu { display: none; }
.asset-group--item-split-menu .asset--more .open-menu { display: block; }

.asset-group--item-split-menu__open .asset--more .close-menu { display: block; }
.asset-group--item-split-menu__open .asset--more .open-menu { display: none; }


/** -- Split Menu / Content -- **/

.asset-group--item-split-menu__open .asset-group--item-content {
  display: flex;
}

.asset-group--item-content {
  padding: 0 36px 16px;
}

.asset-group--item-content fieldset {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 8px 0 0;
  padding: 0;
}

.asset-group--item-content legend {
  text-transform: uppercase;
}

.asset-group--item-content select,
.asset-group--item-content label {
  margin: 2px 0;
  padding: 0;
  cursor: pointer;
}

.asset-group--item-content input[type="radio"],
.asset-group--item-content input[type="checkbox"] {
  margin-right: 8px;
}

.asset-group--item-content input[type="text"] {
  margin: 0;
}

.asset--more-options {
  display: flex;
}

.asset-group--item-content {
  display: none;
  border-top: 1px solid #EEE;
  margin: 0 8px 0;
}

.asset--options li {
  display: block;
  margin:  0 0 0 2px;
  padding: 0 6px;
  border: 1px solid lightgray;
  border-radius: 4px;
}

/**--- Icons ---**/

#icons .asset-group--title span {
  flex: 1;
}

#icons .asset-group--title span input {
  width: calc(100% - 16px);
  margin: 0;
}

#icons .asset-group--title button {
  flex: 0;
}

.assets-icons--list {
  display: flex;
  flex-wrap: wrap;
}

.assets-icons--list .asset-group--item {
  flex: 0;
  min-width: 40px;
  margin: 2px;
  cursor: pointer
}

.assets-icons--list.assets-icons--list__show-list .asset-group--item {
  flex: 1;
  min-width: 120px;
  max-width: 240px;
}

.assets-icons--list .asset--label {
  display: none;
  flex: 1;
}

.assets-icons--list.assets-icons--list__show-list .asset--label {
  display: block;
}

.asset-group--item:hover {
  // color: white;
  // background: #555;
  border-color: #999;
  cursor: pointer;
}

.asset-group--item:hover .asset--sample {
  // border: 1px solid #FFF;
}

.assets-icons--list .asset-group--item:hover .asset--sample {
  border: none;
}

button {
  margin: 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 16px 0 8px;
  border-top: 1px solid #CCC;
}

.footer-about {
  flex: 1;
  margin-right: 16px;
}

/* -------- */

.break {
  flex-wrap: wrap;
}

label.row > span {
  color: #8e8e8e;
  width: 20px;
  text-align: right;
  font-size: 9px;
}

label.row input {
  flex: 1 1 auto;
  border: 1px solid #638bec;
}

form {
  width: 90%;
  margin: -20px;
  padding: 0px;
}

.show {
  display: block;
}

.hide {
  display: none;
}

`;

function css() {
  return PanelHtmlCss;
}

module.exports = { css };
