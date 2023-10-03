import { nanoid } from 'nanoid';
import {
  isEmptyObject,
  isDom,
  addStyle,
  cssObjToStyle,
  generateStyle,
} from './utils';
import { DRAGING_NODE, DEFAULT_OFFSET } from './constant';

let cloneDom = null;
let cloneDomId = null;
let targetDomList = [];
let needRemoveDomList = [];

let customClear = null;

let defDragover = (e) => {
  e.preventDefault();
};

export const addDragNode = (e) => {
  // 拖拽节点样式
  addStyle(cloneDom, DRAGING_NODE);

  cloneDom.id = nanoid();
  cloneDomId = cloneDom.id;
  // 在当前节点位置加, 防止后代选择器样式问题
  // document.body.appendChild(cloneDom);s
  e.target.parentNode.appendChild(cloneDom);
};

export const removeDragNode = () => {
  let dom = document.getElementById(cloneDomId);
  dom?.remove();
};

let clear = (e) => {
  e.target.removeEventListener('dragend', clear);
  // 移除目标节点样式
  targetDomList.forEach((item) => {
    item.removeEventListener('dragover', defDragover);
    item.classList.remove(`${cloneDomId}-active`);
  });
  // 移除中间变量
  needRemoveDomList.forEach((item) => {
    item.remove();
  });
  // 在清理之前执行自定义清理
  customClear?.();
  // 清理中间变量
  customClear = null;

  targetDomList = [];
  needRemoveDomList = [];

  removeDragNode();
  cloneDom = null;
  cloneDomId = null;
};

let handleOptions = (options) => {
  // TODO: targetClass 暂时保留
  const { clonedStyle, targetStyle, clonedClass, targetClass } = options;
  // 拖拽节点样式
  if (clonedClass) cloneDom.classList.add(clonedClass);

  if (!isEmptyObject(clonedStyle)) {
    Object.keys(clonedStyle).forEach((key) => {
      cloneDom.style[key] = clonedStyle[key];
    });
  }
  // 目标节点
  if (!isEmptyObject(targetStyle)) {
    // 生成样式表
    let styleDom = generateStyle(`${cloneDomId}-active`, targetStyle);
    // 添加并收集
    document.head.appendChild(styleDom);
    needRemoveDomList.push(styleDom);
  }
};

let activeTarget = (list = []) => {
  list.forEach((item) => {
    let doms = isDom(item) ? [item] : document.querySelectorAll(item) || [];

    doms.forEach((item) => {
      item.classList.add(`${cloneDomId}-active`);
      item.addEventListener('dragover', defDragover);
      targetDomList.push(item);
    });

    // if(!dom) return;
    // dom.classList.add(`${cloneDomId}-active`)
    // dom.addEventListener('dragover', defDragover)

    // targetDomList.push(dom)
  });
};

export const dragP = (fn, options) => {
  return (e, ...args) => {
    let originDom = e.target;
    // 自定义拖拽节点
    let customDragDom = options.customDragDom?.(e, ...args);
    cloneDom = isDom(customDragDom) ? customDragDom : originDom.cloneNode(true); //  target为拖拽节点
    // 添加拖拽节点
    addDragNode(e);

    // 处理options
    if (!isEmptyObject(options)) handleOptions(options);

    // 偏移量
    let offset = options?.offset || DEFAULT_OFFSET;

    e.dataTransfer.setDragImage(cloneDom, offset.x, offset.y);

    originDom.addEventListener('dragend', clear);

    e.remember = (data) => {
      e.dataTransfer.setData('text/plain', JSON.stringify(data));
    };

    e.activeTarget = activeTarget;

    fn(e, ...args);
  };
};
