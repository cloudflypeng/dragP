let h = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, r) => (r &= 63, r < 36 ? e += r.toString(36) : r < 62 ? e += (r - 26).toString(36).toUpperCase() : r > 62 ? e += "-" : e += "_", e), "");
function m(t) {
  return t instanceof HTMLElement;
}
function d(t) {
  return t ? Object.keys(t).length === 0 : !0;
}
let y = (t) => t.replace(/([A-Z])/g, "-$1").toLowerCase(), L = (t) => {
  let e = "";
  return Object.keys(t).forEach((r) => {
    e += `${y(r)}:${t[r]};`;
  }), e;
}, S = (t, e) => {
  !t || !e || Object.keys(e).forEach((r) => {
    t.style[r] = e[r];
  });
}, p = (t, e) => {
  let r = document.createElement("style");
  r.type = "text/css";
  let l = L(e);
  return r.innerHTML = `.${t} {${l}} `, document.head.appendChild(r), r;
};
const T = 2147483647, N = {
  position: "absolute",
  top: "-100vh",
  left: "-100vw",
  zIndex: T,
  pointerEvents: "none"
}, O = {
  x: 0,
  y: 0
};
let a = null, s = null, u = [], f = [], o = null, v = (t) => {
  t.preventDefault();
};
const $ = (t) => {
  S(a, N), a.id = h(), s = a.id, t.target.parentNode.appendChild(a);
}, C = () => {
  let t = document.getElementById(s);
  t == null || t.remove();
};
let D = (t) => {
  t.target.removeEventListener("dragend", D), u.forEach((e) => {
    e.removeEventListener("dragover", v), e.classList.remove(`${s}-active`);
  }), f.forEach((e) => {
    e.remove();
  }), o == null || o(), o = null, u = [], f = [], C(), a = null, s = null;
}, x = (t) => {
  const { clonedStyle: e, targetStyle: r, clonedClass: l, targetClass: c } = t;
  if (l && a.classList.add(l), d(e) || Object.keys(e).forEach((n) => {
    a.style[n] = e[n];
  }), !d(r)) {
    let n = p(`${s}-active`, r);
    document.head.appendChild(n), f.push(n);
  }
}, A = (t = []) => {
  t.forEach((e) => {
    (m(e) ? [e] : document.querySelectorAll(e) || []).forEach((l) => {
      l.classList.add(`${s}-active`), l.addEventListener("dragover", v), u.push(l);
    });
  });
};
const I = (t, e) => (r, ...l) => {
  var i;
  let c = r.target, n = (i = e.customDragDom) == null ? void 0 : i.call(e, r, ...l);
  a = m(n) ? n : c.cloneNode(!0), $(r), d(e) || x(e);
  let g = (e == null ? void 0 : e.offset) || O;
  r.dataTransfer.setDragImage(a, g.x, g.y), c.addEventListener("dragend", D), r.remember = (E) => {
    r.dataTransfer.setData("text/plain", JSON.stringify(E));
  }, r.activeTarget = A, t(r, ...l);
};
export {
  $ as addDragNode,
  I as dragP,
  C as removeDragNode
};
