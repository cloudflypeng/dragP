let m = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce((t, r) => (r &= 63, r < 36 ? t += r.toString(36) : r < 62 ? t += (r - 26).toString(36).toUpperCase() : r > 62 ? t += "-" : t += "_", t), ""), n = null, o = null, c = [], d = [], g = (e) => {
  e.preventDefault();
};
const v = () => {
  n.style.position = "absolute", n.style.top = "-100vh", n.style.left = "-100vw", n.style.pointerEvents = "none", n.id = m(), o = n.id, document.body.appendChild(n);
}, f = () => {
  let e = document.getElementById(o);
  e == null || e.remove();
};
let u = (e) => {
  e.target.removeEventListener("dragend", u), c.forEach((t) => {
    t.removeEventListener("dragover", g), t.classList.remove(`${o}-active`);
  }), d.forEach((t) => {
    t.remove();
  }), c = [], d = [], f(), n = null, o = null;
}, p = (e) => {
  let t = e.clonedStyle || {};
  i(t) || Object.keys(t).forEach((l) => {
    n.style[l] = t[l];
  });
  let r = e.targetStyle || {};
  if (!i(r)) {
    let l = document.createElement("style");
    l.type = "text/css";
    let a = "";
    Object.keys(r).forEach((s) => {
      a += `${h(s)}:${r[s]};`;
    }), l.innerHTML = `.${o}-active {${a}} `, document.head.appendChild(l), d.push(l);
  }
}, y = (e = []) => {
  e.forEach((t) => {
    (E(t) ? [t] : document.querySelectorAll(t) || []).forEach((l) => {
      l.classList.add(`${o}-active`), l.addEventListener("dragover", g), c.push(l);
    });
  });
};
const D = (e, t) => (r, ...l) => {
  let a = r.target;
  n = a.cloneNode(!0), v(), i(t) || p(t), r.dataTransfer.setDragImage(n, 100, 100), a.addEventListener("dragend", u), r.remember = (s) => {
    r.dataTransfer.setData("text/plain", JSON.stringify(s));
  }, r.activeTarget = y, console.log("args :>> ", l), e(r, ...l);
};
function E(e) {
  return console.log("obj :>> ", e), e instanceof HTMLElement;
}
function i(e) {
  return e ? Object.keys(e).length === 0 : !0;
}
let h = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase();
export {
  v as addDragNode,
  n as cloneDom,
  D as dragP,
  f as removeDragNode
};
