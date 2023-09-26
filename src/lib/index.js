import { nanoid } from "nanoid";

let cloneDom = null;
let cloneDomId = null;
let targetDomList = []

let defDragover = e => {
  e.preventDefault();
}
let needRemoveDomList = [];


export const addDragNode = () => {
  cloneDom.style.position = 'absolute';
  cloneDom.style.top = '-100vh';
  cloneDom.style.left = '-100vw';
  cloneDom.style.pointerEvents = 'none';
  cloneDom.id = nanoid();
  cloneDomId = cloneDom.id;
  document.body.appendChild(cloneDom);
}

export const removeDragNode = () => {
  let dom = document.getElementById(cloneDomId);
  dom?.remove();
}

let clear = (e) => {

  e.target.removeEventListener('dragend', clear)
  // 移除目标节点样式
  targetDomList.forEach(item=>{
    item.removeEventListener('dragover', defDragover)
    item.classList.remove(`${cloneDomId}-active`)
  })
  // 移除中间变量
  needRemoveDomList.forEach(item=>{
    item.remove()
  })

  removeDragNode()
  cloneDom = null;
  cloneDomId = null;
}

let handleOptions = options =>{
  // 拖拽节点样式
  let clonedStyle = options.clonedStyle || {};
  if(!isEmptyObject(clonedStyle)) {
    Object.keys(clonedStyle).forEach((key) => {
      cloneDom.style[key] = clonedStyle[key];
    });
  }
  // 目标节点
  let targetStyle = options.targetStyle || {};
  if(!isEmptyObject(targetStyle)) {
    let styleDom = document.createElement('style');
    styleDom.type = 'text/css';
    let styleStr = '';
    Object.keys(targetStyle).forEach((key) => {
      styleStr += `${toKababCase(key)}:${targetStyle[key]};`;
    });
    styleDom.innerHTML = `.${cloneDomId}-active {${styleStr}} `;

    document.head.appendChild(styleDom);
    needRemoveDomList.push(styleDom)
  }

}



let activeTarget = (list = []) =>{

  list.forEach(item=>{
    let doms = isDom(item) ? [item] : document.querySelectorAll(item) || [];

    doms.forEach(item=>{ 
      item.classList.add(`${cloneDomId}-active`)
      item.addEventListener('dragover', defDragover)
      targetDomList.push(item)

    })

    
    // if(!dom) return;
    // dom.classList.add(`${cloneDomId}-active`)
    // dom.addEventListener('dragover', defDragover)

    // targetDomList.push(dom)
  })
}

export const dragP = (fn, options) => {

  return e =>{

    let originDom = e.target;
    cloneDom = originDom.cloneNode(true);
    // 添加拖拽节点
    addDragNode();
    // 处理options
    if(!isEmptyObject(options)) handleOptions(options);
    e.dataTransfer.setDragImage(cloneDom, 100, 100);

    originDom.addEventListener('dragend', clear)

    e.remember = (data)=>{
      e.dataTransfer.setData('text/plain', JSON.stringify(data));
    }

    e.activeTarget = activeTarget;

    fn(e)
  }
}

function isDom(obj) {
  return obj instanceof HTMLElement;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}
// 驼峰转 kabab-case
let toKababCase = str => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

export {
  cloneDom
}