let D = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, r) => (r &= 63, r < 36 ? e += r.toString(36) : r < 62 ? e += (r - 26).toString(36).toUpperCase() : r > 62 ? e += "-" : e += "_", e), ""), a = null, n = null, c = [], d = [], m = (t) => {
  t.preventDefault();
};
const E = (t) => {
  a.style.position = "absolute", a.style.top = "-100vh", a.style.left = "-100vw", a.style.zIndex = "2147483647", a.style.pointerEvents = "none", a.id = D(), n = a.id, t.target.parentNode.appendChild(a);
}, h = () => {
  let t = document.getElementById(n);
  t == null || t.remove();
};
let v = (t) => {
  t.target.removeEventListener("dragend", v), c.forEach((e) => {
    e.removeEventListener("dragover", m), e.classList.remove(`${n}-active`);
  }), d.forEach((e) => {
    e.remove();
  }), c = [], d = [], h(), a = null, n = null;
}, L = (t) => {
  let e = t.clonedStyle || {};
  g(e) || Object.keys(e).forEach((l) => {
    a.style[l] = e[l];
  });
  let r = t.targetStyle || {};
  if (!g(r)) {
    let l = document.createElement("style");
    l.type = "text/css";
    let o = "";
    Object.keys(r).forEach((s) => {
      o += `${p(s)}:${r[s]};`;
    }), l.innerHTML = `.${n}-active {${o}} `, document.head.appendChild(l), d.push(l);
  }
}, S = (t = []) => {
  t.forEach((e) => {
    (i(e) ? [e] : document.querySelectorAll(e) || []).forEach((l) => {
      l.classList.add(`${n}-active`), l.addEventListener("dragover", m), c.push(l);
    });
  });
};
const $ = (t, e) => (r, ...l) => {
  var f;
  let o = r.target, s = (f = e.customDragDom) == null ? void 0 : f.call(e, r, ...l);
  a = i(s) ? s : o.cloneNode(!0), E(r), g(e) || L(e);
  let u = (e == null ? void 0 : e.offset) || {
    x: 0,
    y: 0
  };
  r.dataTransfer.setDragImage(a, u.x, u.y), o.addEventListener("dragend", v), r.remember = (y) => {
    r.dataTransfer.setData("text/plain", JSON.stringify(y));
  }, r.activeTarget = S, t(r, ...l);
};
function i(t) {
  return t instanceof HTMLElement;
}
function g(t) {
  return t ? Object.keys(t).length === 0 : !0;
}
let p = (t) => t.replace(/([A-Z])/g, "-$1").toLowerCase();
export {
  E as addDragNode,
  a as cloneDom,
  $ as dragP,
  h as removeDragNode
};
