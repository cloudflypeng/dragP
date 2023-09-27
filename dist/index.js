let m = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), ""), l = null, a = null, s = [], c = [], g = (e) => {
  e.preventDefault();
};
const v = () => {
  l.style.position = "absolute", l.style.top = "-100vh", l.style.left = "-100vw", l.style.pointerEvents = "none", l.id = m(), a = l.id, document.body.appendChild(l);
}, f = () => {
  let e = document.getElementById(a);
  e == null || e.remove();
};
let u = (e) => {
  e.target.removeEventListener("dragend", u), s.forEach((t) => {
    t.removeEventListener("dragover", g), t.classList.remove(`${a}-active`);
  }), c.forEach((t) => {
    t.remove();
  }), s = [], c = [], f(), l = null, a = null;
}, p = (e) => {
  let t = e.clonedStyle || {};
  d(t) || Object.keys(t).forEach((n) => {
    l.style[n] = t[n];
  });
  let r = e.targetStyle || {};
  if (!d(r)) {
    let n = document.createElement("style");
    n.type = "text/css";
    let o = "";
    Object.keys(r).forEach((i) => {
      o += `${h(i)}:${r[i]};`;
    }), n.innerHTML = `.${a}-active {${o}} `, document.head.appendChild(n), c.push(n);
  }
}, y = (e = []) => {
  e.forEach((t) => {
    (E(t) ? [t] : document.querySelectorAll(t) || []).forEach((n) => {
      n.classList.add(`${a}-active`), n.addEventListener("dragover", g), s.push(n);
    });
  });
};
const D = (e, t) => (r) => {
  let n = r.target;
  l = n.cloneNode(!0), v(), d(t) || p(t), r.dataTransfer.setDragImage(l, 100, 100), n.addEventListener("dragend", u), r.remember = (o) => {
    r.dataTransfer.setData("text/plain", JSON.stringify(o));
  }, r.activeTarget = y, e(r);
};
function E(e) {
  return e instanceof HTMLElement;
}
function d(e) {
  return Object.keys(e).length === 0;
}
let h = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase();
export {
  v as addDragNode,
  l as cloneDom,
  D as dragP,
  f as removeDragNode
};
