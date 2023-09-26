let m = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), ""), l = null, a = null, d = [], i = (e) => {
  e.preventDefault();
}, g = [];
const v = () => {
  l.style.position = "absolute", l.style.top = "-100vh", l.style.left = "-100vw", l.style.pointerEvents = "none", l.id = m(), a = l.id, document.body.appendChild(l);
}, f = () => {
  let e = document.getElementById(a);
  e == null || e.remove();
};
let u = (e) => {
  e.target.removeEventListener("dragend", u), d.forEach((t) => {
    t.removeEventListener("dragover", i), t.classList.remove(`${a}-active`);
  }), g.forEach((t) => {
    t.remove();
  }), f(), l = null, a = null;
}, p = (e) => {
  let t = e.clonedStyle || {};
  s(t) || Object.keys(t).forEach((n) => {
    l.style[n] = t[n];
  });
  let r = e.targetStyle || {};
  if (!s(r)) {
    let n = document.createElement("style");
    n.type = "text/css";
    let o = "";
    Object.keys(r).forEach((c) => {
      o += `${h(c)}:${r[c]};`;
    }), n.innerHTML = `.${a}-active {${o}} `, document.head.appendChild(n), g.push(n);
  }
}, y = (e = []) => {
  e.forEach((t) => {
    (E(t) ? [t] : document.querySelectorAll(t) || []).forEach((n) => {
      n.classList.add(`${a}-active`), n.addEventListener("dragover", i), d.push(n);
    });
  });
};
const D = (e, t) => (r) => {
  let n = r.target;
  l = n.cloneNode(!0), v(), s(t) || p(t), r.dataTransfer.setDragImage(l, 0, 0), n.addEventListener("dragend", u), r.remember = (o) => {
    r.dataTransfer.setData("text/plain", JSON.stringify(o));
  }, r.activeTarget = y, e(r);
};
function E(e) {
  return e instanceof HTMLElement;
}
function s(e) {
  return Object.keys(e).length === 0;
}
let h = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase();
export {
  v as addDragNode,
  l as cloneDom,
  D as dragP,
  f as removeDragNode
};
