let m = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), ""), n = null, a = null, s = [], c = [], g = (e) => {
  e.preventDefault();
};
const v = () => {
  n.style.position = "absolute", n.style.top = "-100vh", n.style.left = "-100vw", n.style.pointerEvents = "none", n.id = m(), a = n.id, document.body.appendChild(n);
}, f = () => {
  let e = document.getElementById(a);
  e == null || e.remove();
};
let u = (e) => {
  e.target.removeEventListener("dragend", u), s.forEach((t) => {
    t.removeEventListener("dragover", g), t.classList.remove(`${a}-active`);
  }), c.forEach((t) => {
    t.remove();
  }), s = [], c = [], f(), n = null, a = null;
}, p = (e) => {
  let t = e.clonedStyle || {};
  d(t) || Object.keys(t).forEach((l) => {
    n.style[l] = t[l];
  });
  let r = e.targetStyle || {};
  if (!d(r)) {
    let l = document.createElement("style");
    l.type = "text/css";
    let o = "";
    Object.keys(r).forEach((i) => {
      o += `${h(i)}:${r[i]};`;
    }), l.innerHTML = `.${a}-active {${o}} `, document.head.appendChild(l), c.push(l);
  }
}, y = (e = []) => {
  e.forEach((t) => {
    (E(t) ? [t] : document.querySelectorAll(t) || []).forEach((l) => {
      l.classList.add(`${a}-active`), l.addEventListener("dragover", g), s.push(l);
    });
  });
};
const D = (e, t) => (r) => {
  let l = r.target;
  n = l.cloneNode(!0), v(), d(t) || p(t), r.dataTransfer.setDragImage(n, 100, 100), l.addEventListener("dragend", u), r.remember = (o) => {
    r.dataTransfer.setData("text/plain", JSON.stringify(o));
  }, r.activeTarget = y, e(r);
};
function E(e) {
  return console.log("obj :>> ", e), e instanceof HTMLElement;
}
function d(e) {
  return Object.keys(e).length === 0;
}
let h = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase();
export {
  v as addDragNode,
  n as cloneDom,
  D as dragP,
  f as removeDragNode
};
