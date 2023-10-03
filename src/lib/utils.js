function isDom(obj) {
  return obj instanceof HTMLElement;
}

function isEmptyObject(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}
// 驼峰转 kabab-case
let toKababCase = (str) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};

// cssObj转换成行内样式
let cssObjToStyle = (obj) => {
  let styleStr = '';
  Object.keys(obj).forEach((key) => {
    styleStr += `${toKababCase(key)}:${obj[key]};`;
  });
  return styleStr;
};
// 给dom加style
let addStyle = (dom, styleObj) => {
  if (!dom || !styleObj) return;
  Object.keys(styleObj).forEach((key) => {
    dom.style[key] = styleObj[key];
  });
};
// 对一个classnam生成样式表
let generateStyle = (className, styleObj) => {
  let styleDom = document.createElement('style');
  styleDom.type = 'text/css';
  let styleStr = cssObjToStyle(styleObj);
  styleDom.innerHTML = `.${className} {${styleStr}} `;
  document.head.appendChild(styleDom);
  return styleDom;
};

export {
  isDom,
  isEmptyObject,
  toKababCase,
  cssObjToStyle,
  addStyle,
  generateStyle,
};
