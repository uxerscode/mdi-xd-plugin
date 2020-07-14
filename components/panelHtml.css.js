const PanelHtmlCss = `
#main {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 148px);
  border-radius: 4px;
}

#main > .content {
  flex: 1;
}

.icons {
  margin: 8px 0 0;
  padding: 0;
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
