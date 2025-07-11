/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = globalThis, Ke = Se.ShadowRoot && (Se.ShadyCSS === void 0 || Se.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = Symbol(), ut = /* @__PURE__ */ new WeakMap();
let Dt = class {
  constructor(e, r, i) {
    if (this._$cssResult$ = !0, i !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (Ke && e === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (e = ut.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ut.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const hr = (t) => new Dt(typeof t == "string" ? t : t + "", void 0, et), pr = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((i, o, n) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1], t[0]);
  return new Dt(r, t, et);
}, ur = (t, e) => {
  if (Ke) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const i = document.createElement("style"), o = Se.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = r.cssText, t.appendChild(i);
  }
}, ft = Ke ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const i of e.cssRules) r += i.cssText;
  return hr(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: fr, defineProperty: gr, getOwnPropertyDescriptor: mr, getOwnPropertyNames: br, getOwnPropertySymbols: yr, getPrototypeOf: vr } = Object, Pe = globalThis, gt = Pe.trustedTypes, wr = gt ? gt.emptyScript : "", xr = Pe.reactiveElementPolyfillSupport, ue = (t, e) => t, Ce = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? wr : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, tt = (t, e) => !fr(t, e), mt = { attribute: !0, type: String, converter: Ce, reflect: !1, useDefault: !1, hasChanged: tt };
Symbol.metadata ??= Symbol("metadata"), Pe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ie = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = mt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, r);
      o !== void 0 && gr(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, r, i) {
    const { get: o, set: n } = mr(this.prototype, e) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: o, set(s) {
      const l = o?.call(this);
      n?.call(this, s), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ue("elementProperties"))) return;
    const e = vr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ue("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ue("properties"))) {
      const r = this.properties, i = [...br(r), ...yr(r)];
      for (const o of i) this.createProperty(o, r[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [i, o] of r) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const o = this._$Eu(r, i);
      o !== void 0 && this._$Eh.set(o, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) r.unshift(ft(o));
    } else e !== void 0 && r.push(ft(e));
    return r;
  }
  static _$Eu(e, r) {
    const i = r.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const i of r.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ur(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, r, i) {
    this._$AK(e, i);
  }
  _$ET(e, r) {
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Ce).toAttribute(r, i.type);
      this._$Em = e, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(e, r) {
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const n = i.getPropertyOptions(o), s = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Ce;
      this._$Em = o, this[o] = s.fromAttribute(r, n.type) ?? this._$Ej?.get(o) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, r, i) {
    if (e !== void 0) {
      const o = this.constructor, n = this[e];
      if (i ??= o.getPropertyOptions(e), !((i.hasChanged ?? tt)(n, r) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: i, reflect: o, wrapped: n }, s) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? r ?? this[e]), n !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (r = void 0), this._$AL.set(e, r)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: s } = n, l = this[o];
        s !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, n, l);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ie.elementStyles = [], ie.shadowRootOptions = { mode: "open" }, ie[ue("elementProperties")] = /* @__PURE__ */ new Map(), ie[ue("finalized")] = /* @__PURE__ */ new Map(), xr?.({ ReactiveElement: ie }), (Pe.reactiveElementVersions ??= []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt = globalThis, Ee = rt.trustedTypes, bt = Ee ? Ee.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ht = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, Wt = "?" + N, $r = `<${Wt}>`, ee = document, ge = () => ee.createComment(""), me = (t) => t === null || typeof t != "object" && typeof t != "function", it = Array.isArray, _r = (t) => it(t) || typeof t?.[Symbol.iterator] == "function", ze = `[ 	
\f\r]`, he = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, yt = /-->/g, vt = />/g, Y = RegExp(`>|${ze}(?:([^\\s"'>=/]+)(${ze}*=${ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), wt = /'/g, xt = /"/g, It = /^(?:script|style|textarea|title)$/i, Sr = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), L = Sr(1), ne = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), X = ee.createTreeWalker(ee, 129);
function Vt(t, e) {
  if (!it(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bt !== void 0 ? bt.createHTML(e) : e;
}
const kr = (t, e) => {
  const r = t.length - 1, i = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = he;
  for (let l = 0; l < r; l++) {
    const a = t[l];
    let c, u, h = -1, f = 0;
    for (; f < a.length && (s.lastIndex = f, u = s.exec(a), u !== null); ) f = s.lastIndex, s === he ? u[1] === "!--" ? s = yt : u[1] !== void 0 ? s = vt : u[2] !== void 0 ? (It.test(u[2]) && (o = RegExp("</" + u[2], "g")), s = Y) : u[3] !== void 0 && (s = Y) : s === Y ? u[0] === ">" ? (s = o ?? he, h = -1) : u[1] === void 0 ? h = -2 : (h = s.lastIndex - u[2].length, c = u[1], s = u[3] === void 0 ? Y : u[3] === '"' ? xt : wt) : s === xt || s === wt ? s = Y : s === yt || s === vt ? s = he : (s = Y, o = void 0);
    const g = s === Y && t[l + 1].startsWith("/>") ? " " : "";
    n += s === he ? a + $r : h >= 0 ? (i.push(c), a.slice(0, h) + Ht + a.slice(h) + N + g) : a + N + (h === -2 ? l : g);
  }
  return [Vt(t, n + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class be {
  constructor({ strings: e, _$litType$: r }, i) {
    let o;
    this.parts = [];
    let n = 0, s = 0;
    const l = e.length - 1, a = this.parts, [c, u] = kr(e, r);
    if (this.el = be.createElement(c, i), X.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = X.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Ht)) {
          const f = u[s++], g = o.getAttribute(h).split(N), m = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: m[2], strings: g, ctor: m[1] === "." ? Cr : m[1] === "?" ? Er : m[1] === "@" ? Fr : Re }), o.removeAttribute(h);
        } else h.startsWith(N) && (a.push({ type: 6, index: n }), o.removeAttribute(h));
        if (It.test(o.tagName)) {
          const h = o.textContent.split(N), f = h.length - 1;
          if (f > 0) {
            o.textContent = Ee ? Ee.emptyScript : "";
            for (let g = 0; g < f; g++) o.append(h[g], ge()), X.nextNode(), a.push({ type: 2, index: ++n });
            o.append(h[f], ge());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Wt) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(N, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += N.length - 1;
      }
      n++;
    }
  }
  static createElement(e, r) {
    const i = ee.createElement("template");
    return i.innerHTML = e, i;
  }
}
function se(t, e, r = t, i) {
  if (e === ne) return e;
  let o = i !== void 0 ? r._$Co?.[i] : r._$Cl;
  const n = me(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, r, i)), i !== void 0 ? (r._$Co ??= [])[i] = o : r._$Cl = o), o !== void 0 && (e = se(t, o._$AS(t, e.values), o, i)), e;
}
class Ar {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: i } = this._$AD, o = (e?.creationScope ?? ee).importNode(r, !0);
    X.currentNode = o;
    let n = X.nextNode(), s = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let c;
        a.type === 2 ? c = new we(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new Or(n, this, e)), this._$AV.push(c), a = i[++l];
      }
      s !== a?.index && (n = X.nextNode(), s++);
    }
    return X.currentNode = ee, o;
  }
  p(e) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, r), r += i.strings.length - 2) : i._$AI(e[r])), r++;
  }
}
class we {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, r, i, o) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && e?.nodeType === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = se(this, e, r), me(e) ? e === A || e == null || e === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : e !== this._$AH && e !== ne && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : _r(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== A && me(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ee.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: r, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = be.createElement(Vt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(r);
    else {
      const n = new Ar(o, this), s = n.u(this.options);
      n.p(r), this.T(s), this._$AH = n;
    }
  }
  _$AC(e) {
    let r = $t.get(e.strings);
    return r === void 0 && $t.set(e.strings, r = new be(e)), r;
  }
  k(e) {
    it(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, o = 0;
    for (const n of e) o === r.length ? r.push(i = new we(this.O(ge()), this.O(ge()), this, this.options)) : i = r[o], i._$AI(n), o++;
    o < r.length && (this._$AR(i && i._$AB.nextSibling, o), r.length = o);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); e && e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Re {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, i, o, n) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = e, this.name = r, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = A;
  }
  _$AI(e, r = this, i, o) {
    const n = this.strings;
    let s = !1;
    if (n === void 0) e = se(this, e, r, 0), s = !me(e) || e !== this._$AH && e !== ne, s && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = se(this, l[i + a], r, a), c === ne && (c = this._$AH[a]), s ||= !me(c) || c !== this._$AH[a], c === A ? e = A : e !== A && (e += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    s && !o && this.j(e);
  }
  j(e) {
    e === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Cr extends Re {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === A ? void 0 : e;
  }
}
class Er extends Re {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== A);
  }
}
class Fr extends Re {
  constructor(e, r, i, o, n) {
    super(e, r, i, o, n), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = se(this, e, r, 0) ?? A) === ne) return;
    const i = this._$AH, o = e === A && i !== A || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== A && (i === A || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Or {
  constructor(e, r, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    se(this, e);
  }
}
const Tr = rt.litHtmlPolyfillSupport;
Tr?.(be, we), (rt.litHtmlVersions ??= []).push("3.3.0");
const Nt = (t, e, r) => {
  const i = r?.renderBefore ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = r?.renderBefore ?? null;
    i._$litPart$ = o = new we(e.insertBefore(ge(), n), n, void 0, r ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis;
let oe = class extends ie {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Nt(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ne;
  }
};
oe._$litElement$ = !0, oe.finalized = !0, ot.litElementHydrateSupport?.({ LitElement: oe });
const Mr = ot.litElementPolyfillSupport;
Mr?.({ LitElement: oe });
(ot.litElementVersions ??= []).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pr = { attribute: !0, type: String, converter: Ce, reflect: !1, hasChanged: tt }, Rr = (t = Pr, e, r) => {
  const { kind: i, metadata: o } = r;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(r.name, t), i === "accessor") {
    const { name: s } = r;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(s, a, t);
    }, init(l) {
      return l !== void 0 && this.C(s, void 0, t, l), l;
    } };
  }
  if (i === "setter") {
    const { name: s } = r;
    return function(l) {
      const a = this[s];
      e.call(this, l), this.requestUpdate(s, a, t);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function I(t) {
  return (e, r) => typeof r == "object" ? Rr(t, e, r) : ((i, o, n) => {
    const s = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), s ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(t, e, r);
}
var jr = Object.defineProperty, zr = Object.getOwnPropertyDescriptor, nt = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? zr(e, r) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (i ? s(e, r, o) : s(o)) || o);
  return i && o && jr(e, r, o), o;
};
let ye = class extends oe {
  constructor() {
    super(...arguments), this.name = "World", this.count = 0;
  }
  _handleClick() {
    this.count++;
  }
  render() {
    return L`
      <h1>Hello, ${this.name}!</h1>
      <p>This is a Lit.js component running in your Hugo site.</p>
      <p>Button clicked: ${this.count} times</p>
      <button @click=${this._handleClick}>Click me!</button>
    `;
  }
};
ye.styles = pr`
    :host {
      display: block;
      padding: 1rem;
      background: #f3f4f6;
      border-radius: 8px;
      margin: 1rem 0;
    }

    h1 {
      color: #1f2937;
      font-size: 1.5rem;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #6b7280;
      margin: 0;
    }

    button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }

    button:hover {
      background: #2563eb;
    }
  `;
nt([
  I({ type: String })
], ye.prototype, "name", 2);
nt([
  I({ type: Number })
], ye.prototype, "count", 2);
ye = nt([
  Bt("hello-world")
], ye);
let Fe, qt = 0;
function _t(t) {
  Fe = t;
}
function St() {
  Fe = null, qt = 0;
}
function Lr() {
  return qt++;
}
const Le = Symbol("haunted.phase"), ke = Symbol("haunted.hook"), kt = Symbol("haunted.update"), At = Symbol("haunted.commit"), K = Symbol("haunted.effects"), fe = Symbol("haunted.layoutEffects"), Be = "haunted.context";
class Ur {
  update;
  host;
  virtual;
  [ke];
  [K];
  [fe];
  constructor(e, r) {
    this.update = e, this.host = r, this[ke] = /* @__PURE__ */ new Map(), this[K] = [], this[fe] = [];
  }
  run(e) {
    _t(this);
    let r = e();
    return St(), r;
  }
  _runEffects(e) {
    let r = this[e];
    _t(this);
    for (let i of r)
      i.call(this);
    St();
  }
  runEffects() {
    this._runEffects(K);
  }
  runLayoutEffects() {
    this._runEffects(fe);
  }
  teardown() {
    this[ke].forEach((r) => {
      typeof r.teardown == "function" && r.teardown();
    });
  }
}
const Dr = Promise.resolve().then.bind(Promise.resolve());
function Qt() {
  let t = [], e;
  function r() {
    e = null;
    let i = t;
    t = [];
    for (var o = 0, n = i.length; o < n; o++)
      i[o]();
  }
  return function(i) {
    t.push(i), e == null && (e = Dr(r));
  };
}
const Hr = Qt(), Ct = Qt();
class Wr {
  renderer;
  host;
  state;
  [Le];
  _updateQueued;
  constructor(e, r) {
    this.renderer = e, this.host = r, this.state = new Ur(this.update.bind(this), r), this[Le] = null, this._updateQueued = !1;
  }
  update() {
    this._updateQueued || (Hr(() => {
      let e = this.handlePhase(kt);
      Ct(() => {
        this.handlePhase(At, e), Ct(() => {
          this.handlePhase(K);
        });
      }), this._updateQueued = !1;
    }), this._updateQueued = !0);
  }
  handlePhase(e, r) {
    switch (this[Le] = e, e) {
      case At:
        this.commit(r), this.runEffects(fe);
        return;
      case kt:
        return this.render();
      case K:
        return this.runEffects(K);
    }
  }
  render() {
    return this.state.run(() => this.renderer.call(this.host, this.host));
  }
  runEffects(e) {
    this.state._runEffects(e);
  }
  teardown() {
    this.state.teardown();
  }
}
const Ir = (t = "") => t.replace(/-+([a-z])?/g, (e, r) => r ? r.toUpperCase() : "");
function Vr(t) {
  class e extends Wr {
    frag;
    constructor(o, n, s) {
      super(o, s || n), this.frag = n;
    }
    commit(o) {
      t(o, this.frag);
    }
  }
  function r(i, o, n) {
    const s = (n || o || {}).baseElement || HTMLElement, { observedAttributes: l = [], useShadowDOM: a = !0, shadowRootInit: c = {} } = n || o || {};
    class u extends s {
      _scheduler;
      static get observedAttributes() {
        return i.observedAttributes || l || [];
      }
      constructor() {
        super(), a === !1 ? this._scheduler = new e(i, this) : (this.attachShadow({ mode: "open", ...c }), this._scheduler = new e(i, this.shadowRoot, this));
      }
      connectedCallback() {
        this._scheduler.update();
      }
      disconnectedCallback() {
        this._scheduler.teardown();
      }
      attributeChangedCallback(m, y, v) {
        if (y === v)
          return;
        let _ = v === "" ? !0 : v;
        Reflect.set(this, Ir(m), _);
      }
    }
    function h(g) {
      let m = g, y = !1;
      return Object.freeze({
        enumerable: !0,
        configurable: !0,
        get() {
          return m;
        },
        set(v) {
          y && m === v || (y = !0, m = v, this._scheduler && this._scheduler.update());
        }
      });
    }
    const f = new Proxy(s.prototype, {
      getPrototypeOf(g) {
        return g;
      },
      set(g, m, y, v) {
        let _;
        return m in g ? (_ = Object.getOwnPropertyDescriptor(g, m), _ && _.set ? (_.set.call(v, y), !0) : (Reflect.set(g, m, y, v), !0)) : (typeof m == "symbol" || m[0] === "_" ? _ = {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: y
        } : _ = h(y), Object.defineProperty(v, m, _), _.set && _.set.call(v, y), !0);
      }
    });
    return Object.setPrototypeOf(u.prototype, f), u;
  }
  return r;
}
class xe {
  id;
  state;
  constructor(e, r) {
    this.id = e, this.state = r;
  }
}
function Nr(t, ...e) {
  let r = Lr(), i = Fe[ke], o = i.get(r);
  return o || (o = new t(r, Fe, ...e), i.set(r, o)), o.update(...e);
}
function $e(t) {
  return Nr.bind(null, t);
}
function Gt(t) {
  return $e(class extends xe {
    callback;
    lastValues;
    values;
    _teardown;
    constructor(e, r, i, o) {
      super(e, r), t(r, this);
    }
    update(e, r) {
      this.callback = e, this.values = r;
    }
    call() {
      const e = !this.values || this.hasChanged();
      this.lastValues = this.values, e && this.run();
    }
    run() {
      this.teardown(), this._teardown = this.callback.call(this.state);
    }
    teardown() {
      typeof this._teardown == "function" && this._teardown();
    }
    hasChanged() {
      return !this.lastValues || this.values.some((e, r) => this.lastValues[r] !== e);
    }
  });
}
function Jt(t, e) {
  t[K].push(e);
}
const Br = Gt(Jt), qr = $e(class extends xe {
  Context;
  value;
  _ranEffect;
  _unsubscribe;
  constructor(t, e, r) {
    super(t, e), this._updater = this._updater.bind(this), this._ranEffect = !1, this._unsubscribe = null, Jt(e, this);
  }
  update(t) {
    if (this.state.virtual)
      throw new Error("can't be used with virtual components");
    return this.Context !== t && (this._subscribe(t), this.Context = t), this.value;
  }
  call() {
    this._ranEffect || (this._ranEffect = !0, this._unsubscribe && this._unsubscribe(), this._subscribe(this.Context), this.state.update());
  }
  _updater(t) {
    this.value = t, this.state.update();
  }
  _subscribe(t) {
    const e = { Context: t, callback: this._updater };
    this.state.host.dispatchEvent(new CustomEvent(Be, {
      detail: e,
      bubbles: !0,
      cancelable: !0,
      composed: !0
      // to pass ShadowDOM boundaries
    }));
    const { unsubscribe: r = null, value: i } = e;
    this.value = r ? i : t.defaultValue, this._unsubscribe = r;
  }
  teardown() {
    this._unsubscribe && this._unsubscribe();
  }
});
function Qr(t) {
  return (e) => {
    const r = {
      Provider: class extends HTMLElement {
        listeners;
        _value;
        constructor() {
          super(), this.listeners = /* @__PURE__ */ new Set(), this.addEventListener(Be, this);
        }
        disconnectedCallback() {
          this.removeEventListener(Be, this);
        }
        handleEvent(i) {
          const { detail: o } = i;
          o.Context === r && (o.value = this.value, o.unsubscribe = this.unsubscribe.bind(this, o.callback), this.listeners.add(o.callback), i.stopPropagation());
        }
        unsubscribe(i) {
          this.listeners.delete(i);
        }
        set value(i) {
          this._value = i;
          for (let o of this.listeners)
            o(i);
        }
        get value() {
          return this._value;
        }
      },
      Consumer: t(function({ render: i }) {
        const o = qr(r);
        return i(o);
      }, { useShadowDOM: !1 }),
      defaultValue: e
    };
    return r;
  };
}
const Gr = $e(class extends xe {
  value;
  values;
  constructor(t, e, r, i) {
    super(t, e), this.value = r(), this.values = i;
  }
  update(t, e) {
    return this.hasChanged(e) && (this.values = e, this.value = t()), this.value;
  }
  hasChanged(t = []) {
    return t.some((e, r) => this.values[r] !== e);
  }
}), Jr = (t, e) => Gr(() => t, e);
function Yr(t, e) {
  t[fe].push(e);
}
Gt(Yr);
const Zr = $e(class extends xe {
  args;
  constructor(t, e, r) {
    super(t, e), this.updater = this.updater.bind(this), typeof r == "function" && (r = r()), this.makeArgs(r);
  }
  update() {
    return this.args;
  }
  updater(t) {
    const [e] = this.args;
    typeof t == "function" && (t = t(e)), !Object.is(e, t) && (this.makeArgs(t), this.state.update());
  }
  makeArgs(t) {
    this.args = Object.freeze([t, this.updater]);
  }
});
/**
 * @license
 * Portions Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
Promise.resolve();
$e(class extends xe {
  reducer;
  currentState;
  constructor(t, e, r, i, o) {
    super(t, e), this.dispatch = this.dispatch.bind(this), this.currentState = o !== void 0 ? o(i) : i;
  }
  update(t) {
    return this.reducer = t, [this.currentState, this.dispatch];
  }
  dispatch(t) {
    this.currentState = this.reducer(this.currentState, t), this.state.update();
  }
});
function Xr({ render: t }) {
  const e = Vr(t), r = Qr(e);
  return { component: e, createContext: r };
}
const { component: Kr } = Xr({ render: Nt });
function st(t) {
  return [
    ...t.v,
    (t.i ? "!" : "") + t.n
  ].join(":");
}
function ei(t, e = ",") {
  return t.map(st).join(e);
}
let Yt = typeof CSS < "u" && CSS.escape || // Simplified: escaping only special characters
// Needed for NodeJS and Edge <79 (https://caniuse.com/mdn-api_css_escape)
((t) => t.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
function Oe(t) {
  for (var e = 9, r = t.length; r--; ) e = Math.imul(e ^ t.charCodeAt(r), 1597334677);
  return "#" + ((e ^ e >>> 9) >>> 0).toString(36);
}
function at(t, e = "@media ") {
  return e + $(t).map((r) => (typeof r == "string" && (r = {
    min: r
  }), r.raw || Object.keys(r).map((i) => `(${i}-width:${r[i]})`).join(" and "))).join(",");
}
function $(t = []) {
  return Array.isArray(t) ? t : t == null ? [] : [
    t
  ];
}
function Et(t) {
  return t;
}
function lt() {
}
let E = {
  /**
  * 1. `default` (public)
  */
  d: (
    /* efaults */
    0
  ),
  /* Shifts.layer */
  /**
  * 2. `base` (public) — for things like reset rules or default styles applied to plain HTML elements.
  */
  b: (
    /* ase */
    134217728
  ),
  /* Shifts.layer */
  /**
  * 3. `components` (public, used by `style()`) — is for class-based styles that you want to be able to override with utilities.
  */
  c: (
    /* omponents */
    268435456
  ),
  /* Shifts.layer */
  // reserved for style():
  // - props: 0b011
  // - when: 0b100
  /**
  * 6. `aliases` (public, used by `apply()`) — `~(...)`
  */
  a: (
    /* liases */
    671088640
  ),
  /* Shifts.layer */
  /**
  * 6. `utilities` (public) — for small, single-purpose classes
  */
  u: (
    /* tilities */
    805306368
  ),
  /* Shifts.layer */
  /**
  * 7. `overrides` (public, used by `css()`)
  */
  o: (
    /* verrides */
    939524096
  )
};
function Zt(t) {
  return t.match(/[-=:;]/g)?.length || 0;
}
function qe(t) {
  return Math.min(/(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(t) ? Math.max(0, 29.63 * (+RegExp.$1 / (RegExp.$2 ? 15 : 1)) ** 0.137 - 43) : 0, 15) << 22 | /* Shifts.responsive */
  Math.min(Zt(t), 15) << 18;
}
let ti = [
  /* fi */
  "rst-c",
  /* hild: 0 */
  /* la */
  "st-ch",
  /* ild: 1 */
  // even and odd use: nth-child
  /* nt */
  "h-chi",
  /* ld: 2 */
  /* an */
  "y-lin",
  /* k: 3 */
  /* li */
  "nk",
  /* : 4 */
  /* vi */
  "sited",
  /* : 5 */
  /* ch */
  "ecked",
  /* : 6 */
  /* em */
  "pty",
  /* : 7 */
  /* re */
  "ad-on",
  /* ly: 8 */
  /* fo */
  "cus-w",
  /* ithin : 9 */
  /* ho */
  "ver",
  /* : 10 */
  /* fo */
  "cus",
  /* : 11 */
  /* fo */
  "cus-v",
  /* isible : 12 */
  /* ac */
  "tive",
  /* : 13 */
  /* di */
  "sable",
  /* d : 14 */
  /* op */
  "tiona",
  /* l: 15 */
  /* re */
  "quire"
];
function ct({ n: t, i: e, v: r = [] }, i, o, n) {
  t && (t = st({
    n: t,
    i: e,
    v: r
  })), n = [
    ...$(n)
  ];
  for (let l of r) {
    let a = i.theme("screens", l);
    for (let c of $(a && at(a) || i.v(l))) {
      var s;
      n.push(c), o |= a ? 67108864 | /* Shifts.screens */
      qe(c) : l == "dark" ? 1073741824 : (
        /* Shifts.darkMode */
        c[0] == "@" ? qe(c) : (s = c, // use first found pseudo-class
        1 << ~(/:([a-z-]+)/.test(s) && ~ti.indexOf(RegExp.$1.slice(2, 7)) || -18))
      );
    }
  }
  return {
    n: t,
    p: o,
    r: n,
    i: e
  };
}
let Xt = /* @__PURE__ */ new Map();
function Qe(t) {
  if (t.d) {
    let e = [], r = Ue(
      // merge all conditions into a selector string
      t.r.reduce((i, o) => o[0] == "@" ? (e.push(o), i) : (
        // Go over the selector and replace the matching multiple selectors if any
        o ? Ue(i, (n) => Ue(
          o,
          // If the current condition has a nested selector replace it
          (s) => {
            let l = /(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(s);
            if (l) {
              let a = n.indexOf(l[1]);
              return ~a ? (
                // [':merge(.group):hover .rule', ':merge(.group):focus &'] -> ':merge(.group):focus:hover .rule'
                // ':merge(.group)' + ':focus' + ':hover .rule'
                n.slice(0, a) + l[0] + n.slice(a + l[1].length)
              ) : (
                // [':merge(.peer):focus~&', ':merge(.group):hover &'] -> ':merge(.peer):focus~:merge(.group):hover &'
                De(n, s)
              );
            }
            return De(s, n);
          }
        )) : i
      ), "&"),
      // replace '&' with rule name or an empty string
      (i) => De(i, t.n ? "." + Yt(t.n) : "")
    );
    return r && e.push(r.replace(/:merge\((.+?)\)/g, "$1")), e.reduceRight((i, o) => o + "{" + i + "}", t.d);
  }
}
function Ue(t, e) {
  return t.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (r, i, o) => e(i) + o);
}
function De(t, e) {
  return t.replace(/&/g, e);
}
let Ft = new Intl.Collator("en", {
  numeric: !0
});
function Kt(t, e) {
  for (var r = 0, i = t.length; r < i; ) {
    let o = i + r >> 1;
    0 >= er(t[o], e) ? r = o + 1 : i = o;
  }
  return i;
}
function er(t, e) {
  let r = t.p & E.o;
  return r == (e.p & E.o) && (r == E.b || r == E.o) ? 0 : t.p - e.p || t.o - e.o || Ft.compare(Ot(t.n), Ot(e.n)) || Ft.compare(Tt(t.n), Tt(e.n));
}
function Ot(t) {
  return (t || "").split(/:/).pop().split("/").pop() || "\0";
}
function Tt(t) {
  return (t || "").replace(/\W/g, (e) => String.fromCharCode(127 + e.charCodeAt(0))) + "\0";
}
function He(t, e) {
  return Math.round(parseInt(t, 16) * e);
}
function B(t, e = {}) {
  if (typeof t == "function") return t(e);
  let { opacityValue: r = "1", opacityVariable: i } = e, o = i ? `var(${i})` : r;
  if (t.includes("<alpha-value>")) return t.replace("<alpha-value>", o);
  if (t[0] == "#" && (t.length == 4 || t.length == 7)) {
    let n = (t.length - 1) / 3, s = [
      17,
      1,
      0.062272
    ][n - 1];
    return `rgba(${[
      He(t.substr(1, n), s),
      He(t.substr(1 + n, n), s),
      He(t.substr(1 + 2 * n, n), s),
      o
    ]})`;
  }
  return o == "1" ? t : o == "0" ? "#0000" : (
    // convert rgb and hsl to alpha variant
    t.replace(/^(rgb|hsl)(\([^)]+)\)$/, `$1a$2,${o})`)
  );
}
function tr(t, e, r, i, o = []) {
  return function n(s, { n: l, p: a, r: c = [], i: u }, h) {
    let f = [], g = "", m = 0, y = 0;
    for (let w in s || {}) {
      var v, _;
      let S = s[w];
      if (w[0] == "@") {
        if (!S) continue;
        if (w[1] == "a") {
          f.push(...ht(l, a, Me("" + S), h, a, c, u, !0));
          continue;
        }
        if (w[1] == "l") {
          for (let F of $(S)) f.push(...n(F, {
            n: l,
            p: (v = E[w[7]], // Set layer (first reset, than set)
            a & -939524097 | v),
            r: w[7] == "d" ? [] : c,
            i: u
          }, h));
          continue;
        }
        if (w[1] == "i") {
          f.push(...$(S).map((F) => ({
            // before all layers
            p: -1,
            o: 0,
            r: [],
            d: w + " " + F
          })));
          continue;
        }
        if (w[1] == "k") {
          f.push({
            p: E.d,
            o: 0,
            r: [
              w
            ],
            d: n(S, {
              p: E.d
            }, h).map(Qe).join("")
          });
          continue;
        }
        if (w[1] == "f") {
          f.push(...$(S).map((F) => ({
            p: E.d,
            o: 0,
            r: [
              w
            ],
            d: n(F, {
              p: E.d
            }, h).map(Qe).join("")
          })));
          continue;
        }
      }
      if (typeof S != "object" || Array.isArray(S))
        w == "label" && S ? l = S + Oe(JSON.stringify([
          a,
          u,
          s
        ])) : (S || S === 0) && (w = w.replace(/[A-Z]/g, (F) => "-" + F.toLowerCase()), y += 1, m = Math.max(m, (_ = w)[0] == "-" ? 0 : Zt(_) + (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7,8}$)|([fl].{5}l|g.{8}$|pl))/.test(_) ? +!!RegExp.$1 || /* +1 */
        -!!RegExp.$2 : (
          /* -1 */
          0
        )) + 1), g += (g ? ";" : "") + $(S).map((F) => h.s(
          w,
          // support theme(...) function in values
          // calc(100vh - theme('spacing.12'))
          dt("" + F, h.theme) + (u ? " !important" : "")
        )).join(";"));
      else if (w[0] == "@" || w.includes("&")) {
        let F = a;
        w[0] == "@" && (w = w.replace(/\bscreen\(([^)]+)\)/g, (je, te) => {
          let U = h.theme("screens", te);
          return U ? (F |= 67108864, /* Shifts.screens */
          at(U, "")) : je;
        }), F |= qe(w)), f.push(...n(S, {
          n: l,
          p: F,
          r: [
            ...c,
            w
          ],
          i: u
        }, h));
      } else
        f.push(...n(S, {
          p: a,
          r: [
            ...c,
            w
          ]
        }, h));
    }
    return (
      // PERF: prevent unshift using `rules = [{}]` above and then `rules[0] = {...}`
      f.unshift({
        n: l,
        p: a,
        o: (
          // number of declarations (descending)
          Math.max(0, 15 - y) + // greatest precedence of properties
          // if there is no property precedence this is most likely a custom property only declaration
          // these have the highest precedence
          1.5 * Math.min(m || 15, 15)
        ),
        r: c,
        // stringified declarations
        d: g
      }), f.sort(er)
    );
  }(t, ct(e, r, i, o), r);
}
function dt(t, e) {
  return t.replace(/theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g, (r, i, o, n, s = "") => {
    let l = e(o, s);
    return typeof l == "function" && /color|fill|stroke/i.test(o) ? B(l) : "" + $(l).filter((a) => Object(a) !== a);
  });
}
function rr(t, e) {
  let r, i = [];
  for (let o of t)
    o.d && o.n ? r?.p == o.p && "" + r.r == "" + o.r ? (r.c = [
      r.c,
      o.c
    ].filter(Boolean).join(" "), r.d = r.d + ";" + o.d) : i.push(r = {
      ...o,
      n: o.n && e
    }) : i.push({
      ...o,
      n: o.n && e
    });
  return i;
}
function Te(t, e, r = E.u, i, o) {
  let n = [];
  for (let s of t) for (let l of function(a, c, u, h, f) {
    a = {
      ...a,
      i: a.i || f
    };
    let g = function(m, y) {
      let v = Xt.get(m.n);
      return v ? v(m, y) : y.r(m.n, m.v[0] == "dark");
    }(a, c);
    return g ? (
      // a list of class names
      typeof g == "string" ? ({ r: h, p: u } = ct(a, c, u, h), rr(Te(Me(g), c, u, h, a.i), a.n)) : Array.isArray(g) ? g.map((m) => {
        var y, v;
        return {
          o: 0,
          ...m,
          r: [
            ...$(h),
            ...$(m.r)
          ],
          p: (y = u, v = m.p ?? u, y & -939524097 | v)
        };
      }) : tr(g, a, c, u, h)
    ) : (
      // propagate className as is
      [
        {
          c: st(a),
          p: 0,
          o: 0,
          r: []
        }
      ]
    );
  }(s, e, r, i, o)) n.splice(Kt(n, l), 0, l);
  return n;
}
function ht(t, e, r, i, o, n, s, l) {
  return rr((l ? r.flatMap((a) => Te([
    a
  ], i, o, n, s)) : Te(r, i, o, n, s)).map((a) => (
    // do not move defaults
    // move only rules with a name unless they are in the base layer
    a.p & E.o && (a.n || e == E.b) ? {
      ...a,
      p: a.p & -939524097 | e,
      o: 0
    } : a
  )), t);
}
function ri(t, e, r, i) {
  var o;
  return o = (n, s) => {
    let { n: l, p: a, r: c, i: u } = ct(n, s, e);
    return r && ht(l, e, r, s, a, c, u, i);
  }, Xt.set(t, o), t;
}
function We(t, e, r) {
  if (t[t.length - 1] != "(") {
    let i = [], o = !1, n = !1, s = "";
    for (let l of t) if (!(l == "(" || /[~@]$/.test(l))) {
      if (l[0] == "!" && (l = l.slice(1), o = !o), l.endsWith(":")) {
        i[l == "dark:" ? "unshift" : "push"](l.slice(0, -1));
        continue;
      }
      l[0] == "-" && (l = l.slice(1), n = !n), l.endsWith("-") && (l = l.slice(0, -1)), l && l != "&" && (s += (s && "-") + l);
    }
    s && (n && (s = "-" + s), e[0].push({
      n: s,
      v: i.filter(ii),
      i: o
    }));
  }
}
function ii(t, e, r) {
  return r.indexOf(t) == e;
}
let Mt = /* @__PURE__ */ new Map();
function Me(t) {
  let e = Mt.get(t);
  if (!e) {
    let r = [], i = [
      []
    ], o = 0, n = 0, s = null, l = 0, a = (c, u = 0) => {
      o != l && (r.push(t.slice(o, l + u)), c && We(r, i)), o = l + 1;
    };
    for (; l < t.length; l++) {
      let c = t[l];
      if (n) t[l - 1] != "\\" && (n += +(c == "[") || -(c == "]"));
      else if (c == "[")
        n += 1;
      else if (s)
        t[l - 1] != "\\" && s.test(t.slice(l)) && (s = null, o = l + RegExp.lastMatch.length);
      else if (c == "/" && t[l - 1] != "\\" && (t[l + 1] == "*" || t[l + 1] == "/"))
        s = t[l + 1] == "*" ? /^\*\// : /^[\r\n]/;
      else if (c == "(")
        a(), r.push(c);
      else if (c == ":") t[l + 1] != ":" && a(!1, 1);
      else if (/[\s,)]/.test(c)) {
        a(!0);
        let u = r.lastIndexOf("(");
        if (c == ")") {
          let h = r[u - 1];
          if (/[~@]$/.test(h)) {
            let f = i.shift();
            r.length = u, We([
              ...r,
              "#"
            ], i);
            let { v: g } = i[0].pop();
            for (let m of f)
              m.v.splice(+(m.v[0] == "dark") - +(g[0] == "dark"), g.length);
            We([
              ...r,
              ri(
                // named nested
                h.length > 1 ? h.slice(0, -1) + Oe(JSON.stringify([
                  h,
                  f
                ])) : h + "(" + ei(f) + ")",
                E.a,
                f,
                /@$/.test(h)
              )
            ], i);
          }
          u = r.lastIndexOf("(", u - 1);
        }
        r.length = u + 1;
      } else /[~@]/.test(c) && t[l + 1] == "(" && // start nested block
      // ~(...) or button~(...)
      // @(...) or button@(...)
      i.unshift([]);
    }
    a(!0), Mt.set(t, e = i[0]);
  }
  return e;
}
function d(t, e, r) {
  return [
    t,
    Ge(e, r)
  ];
}
function Ge(t, e) {
  return typeof t == "function" ? t : typeof t == "string" && /^[\w-]+$/.test(t) ? (
    // a CSS property alias
    (r, i) => ({
      [t]: e ? e(r, i) : Je(r, 1)
    })
  ) : (r) => (
    // CSSObject, shortcut or apply
    t || {
      [r[1]]: Je(r, 2)
    }
  );
}
function Je(t, e, r = t.slice(e).find(Boolean) || t.$$ || t.input) {
  return t.input[0] == "-" ? `calc(${r} * -1)` : r;
}
function p(t, e, r, i) {
  return [
    t,
    oi(e, r, i)
  ];
}
function oi(t, e, r) {
  let i = typeof e == "string" ? (o, n) => ({
    [e]: r ? r(o, n) : o._
  }) : e || (({ 1: o, _: n }, s, l) => ({
    [o || l]: n
  }));
  return (o, n) => {
    let s = ir(t || o[1]), l = n.theme(s, o.$$) ?? q(o.$$, s, n);
    if (l != null) return o._ = Je(o, 0, l), i(o, n, s);
  };
}
function k(t, e = {}, r) {
  return [
    t,
    ni(e, r)
  ];
}
function ni(t = {}, e) {
  return (r, i) => {
    let { section: o = ir(r[0]).replace("-", "") + "Color" } = t, [n, s] = si(r.$$);
    if (!n) return;
    let l = i.theme(o, n) || q(n, o, i);
    if (!l || typeof l == "object") return;
    let {
      // text- -> --tw-text-opacity
      // ring-offset(?:-|$) -> --tw-ring-offset-opacity
      // TODO move this default into preset-tailwind?
      opacityVariable: a = `--tw-${r[0].replace(/-$/, "")}-opacity`,
      opacitySection: c = o.replace("Color", "Opacity"),
      property: u = o,
      selector: h
    } = t, f = i.theme(c, s || "DEFAULT") || s && q(s, c, i), g = e || (({ _: y }) => {
      let v = Ae(u, y);
      return h ? {
        [h]: v
      } : v;
    });
    r._ = {
      value: B(l, {
        opacityVariable: a || void 0,
        opacityValue: f || void 0
      }),
      color: (y) => B(l, y),
      opacityVariable: a || void 0,
      opacityValue: f || void 0
    };
    let m = g(r, i);
    if (!r.dark) {
      let y = i.d(o, n, l);
      y && y !== l && (r._ = {
        value: B(y, {
          opacityVariable: a || void 0,
          opacityValue: f || "1"
        }),
        color: (v) => B(y, v),
        opacityVariable: a || void 0,
        opacityValue: f || void 0
      }, m = {
        "&": m,
        [i.v("dark")]: g(r, i)
      });
    }
    return m;
  };
}
function si(t) {
  return (t.match(/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/) || []).slice(1);
}
function Ae(t, e) {
  let r = {};
  return typeof e == "string" ? r[t] = e : (e.opacityVariable && e.value.includes(e.opacityVariable) && (r[e.opacityVariable] = e.opacityValue || "1"), r[t] = e.value), r;
}
function q(t, e, r) {
  if (t[0] == "[" && t.slice(-1) == "]") {
    if (t = ve(dt(t.slice(1, -1), r.theme)), !e) return t;
    if (
      // Respect type hints from the user on ambiguous arbitrary values - https://tailwindcss.com/docs/adding-custom-styles#resolving-ambiguities
      !// If this is a color section and the value is a hex color, color function or color name
      (/color|fill|stroke/i.test(e) && !(/^color:/.test(t) || /^(#|((hsl|rgb)a?|hwb|lab|lch|color)\(|[a-z]+$)/.test(t)) || // url(, [a-z]-gradient(, image(, cross-fade(, image-set(
      /image/i.test(e) && !(/^image:/.test(t) || /^[a-z-]+\(/.test(t)) || // font-*
      // - fontWeight (type: ['lookup', 'number', 'any'])
      // - fontFamily (type: ['lookup', 'generic-name', 'family-name'])
      /weight/i.test(e) && !(/^(number|any):/.test(t) || /^\d+$/.test(t)) || // bg-*
      // - backgroundPosition (type: ['lookup', ['position', { preferOnConflict: true }]])
      // - backgroundSize (type: ['lookup', 'length', 'percentage', 'size'])
      /position/i.test(e) && /^(length|size):/.test(t))
    )
      return t.replace(/^[a-z-]+:/, "");
  }
}
function ir(t) {
  return t.replace(/-./g, (e) => e[1].toUpperCase());
}
function ve(t) {
  return (
    // Keep raw strings if it starts with `url(`
    t.includes("url(") ? t.replace(/(.*?)(url\(.*?\))(.*?)/g, (e, r = "", i, o = "") => ve(r) + i + ve(o)) : t.replace(/(^|[^\\])_+/g, (e, r) => r + " ".repeat(e.length - r.length)).replace(/\\_/g, "_").replace(/(calc|min|max|clamp)\(.+\)/g, (e) => e.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 "))
  );
}
function or({ presets: t = [], ...e }) {
  let r = {
    darkMode: void 0,
    darkColor: void 0,
    preflight: e.preflight !== !1 && [],
    theme: {},
    variants: $(e.variants),
    rules: $(e.rules),
    ignorelist: $(e.ignorelist),
    hash: void 0,
    stringify: (i, o) => i + ":" + o,
    finalize: []
  };
  for (let i of $([
    ...t,
    {
      darkMode: e.darkMode,
      darkColor: e.darkColor,
      preflight: e.preflight !== !1 && $(e.preflight),
      theme: e.theme,
      hash: e.hash,
      stringify: e.stringify,
      finalize: e.finalize
    }
  ])) {
    let { preflight: o, darkMode: n = r.darkMode, darkColor: s = r.darkColor, theme: l, variants: a, rules: c, ignorelist: u, hash: h = r.hash, stringify: f = r.stringify, finalize: g } = typeof i == "function" ? i(r) : i;
    r = {
      // values defined by user or previous presets take precedence
      preflight: r.preflight !== !1 && o !== !1 && [
        ...r.preflight,
        ...$(o)
      ],
      darkMode: n,
      darkColor: s,
      theme: {
        ...r.theme,
        ...l,
        extend: {
          ...r.theme.extend,
          ...l?.extend
        }
      },
      variants: [
        ...r.variants,
        ...$(a)
      ],
      rules: [
        ...r.rules,
        ...$(c)
      ],
      ignorelist: [
        ...r.ignorelist,
        ...$(u)
      ],
      hash: h,
      stringify: f,
      finalize: [
        ...r.finalize,
        ...$(g)
      ]
    };
  }
  return r;
}
function Pt(t, e, r, i, o, n) {
  for (let s of e) {
    let l = r.get(s);
    l || r.set(s, l = i(s));
    let a = l(t, o, n);
    if (a) return a;
  }
}
function ai(t) {
  var e;
  return Ye(t[0], typeof (e = t[1]) == "function" ? e : () => e);
}
function li(t) {
  var e, r;
  return Array.isArray(t) ? Ye(t[0], Ge(t[1], t[2])) : Ye(t, Ge(e, r));
}
function Ye(t, e) {
  return nr(t, (r, i, o, n) => {
    let s = i.exec(r);
    if (s) return (
      // MATCH.$_ = value
      s.$$ = r.slice(s[0].length), s.dark = n, e(s, o)
    );
  });
}
function nr(t, e) {
  let r = $(t).map(ci);
  return (i, o, n) => {
    for (let s of r) {
      let l = e(i, s, o, n);
      if (l) return l;
    }
  };
}
function ci(t) {
  return typeof t == "string" ? RegExp("^" + t + (t.includes("$") || t.slice(-1) == "-" ? "" : "$")) : t;
}
function di(t, e) {
  let r = or(t), i = function({ theme: a, darkMode: c, darkColor: u = lt, variants: h, rules: f, hash: g, stringify: m, ignorelist: y, finalize: v }) {
    let _ = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map(), je = nr(y, (x, O) => O.test(x));
    h.push([
      "dark",
      Array.isArray(c) || c == "class" ? `${$(c)[1] || ".dark"} &` : typeof c == "string" && c != "media" ? c : (
        // a custom selector
        "@media (prefers-color-scheme:dark)"
      )
    ]);
    let te = typeof g == "function" ? (x) => g(x, Oe) : g ? Oe : Et;
    te !== Et && v.push((x) => ({
      ...x,
      n: x.n && te(x.n),
      d: x.d?.replace(/--(tw(?:-[\w-]+)?)\b/g, (O, R) => "--" + te(R).replace("#", ""))
    }));
    let U = {
      theme: function({ extend: x = {}, ...O }) {
        let R = {}, cr = {
          get colors() {
            return ae("colors");
          },
          theme: ae,
          // Stub implementation as negated values are automatically infered and do _not_ need to be in the theme
          negative() {
            return {};
          },
          breakpoints(C) {
            let T = {};
            for (let M in C) typeof C[M] == "string" && (T["screen-" + M] = C[M]);
            return T;
          }
        };
        return ae;
        function ae(C, T, M, le) {
          if (C) {
            if ({ 1: C, 2: le } = // eslint-disable-next-line no-sparse-arrays
            /^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(C) || [
              ,
              C
            ], /[.[]/.test(C)) {
              let H = [];
              C.replace(/\[([^\]]+)\]|([^.[]+)/g, (J, de, dr = de) => H.push(dr)), C = H.shift(), M = T, T = H.join("-");
            }
            let D = R[C] || // two-step deref to allow extend section to reference base section
            Object.assign(Object.assign(
              // Make sure to not get into recursive calls
              R[C] = {},
              pt(O, C)
            ), pt(x, C));
            if (T == null) return D;
            T || (T = "DEFAULT");
            let G = D[T] ?? T.split("-").reduce((H, J) => H?.[J], D) ?? M;
            return le ? B(G, {
              opacityValue: dt(le, ae)
            }) : G;
          }
          let ce = {};
          for (let D of [
            ...Object.keys(O),
            ...Object.keys(x)
          ]) ce[D] = ae(D);
          return ce;
        }
        function pt(C, T) {
          let M = C[T];
          return typeof M == "function" && (M = M(cr)), M && /color|fill|stroke/i.test(T) ? function le(ce, D = []) {
            let G = {};
            for (let H in ce) {
              let J = ce[H], de = [
                ...D,
                H
              ];
              G[de.join("-")] = J, H == "DEFAULT" && (de = D, G[D.join("-")] = J), typeof J == "object" && Object.assign(G, le(J, de));
            }
            return G;
          }(M) : M;
        }
      }(a),
      e: Yt,
      h: te,
      s(x, O) {
        return m(x, O, U);
      },
      d(x, O, R) {
        return u(x, O, U, R);
      },
      v(x) {
        return _.has(x) || _.set(x, Pt(x, h, w, ai, U) || "&:" + x), _.get(x);
      },
      r(x, O) {
        let R = JSON.stringify([
          x,
          O
        ]);
        return S.has(R) || S.set(R, !je(x, U) && Pt(x, f, F, li, U, O)), S.get(R);
      },
      f(x) {
        return v.reduce((O, R) => R(O, U), x);
      }
    };
    return U;
  }(r), o = /* @__PURE__ */ new Map(), n = [], s = /* @__PURE__ */ new Set();
  e.resume((a) => o.set(a, a), (a, c) => {
    e.insert(a, n.length, c), n.push(c), s.add(a);
  });
  function l(a) {
    let c = i.f(a), u = Qe(c);
    if (u && !s.has(u)) {
      s.add(u);
      let h = Kt(n, a);
      e.insert(u, h, a), n.splice(h, 0, a);
    }
    return c.n;
  }
  return Object.defineProperties(function(c) {
    if (!o.size) for (let h of $(r.preflight))
      typeof h == "function" && (h = h(i)), h && (typeof h == "string" ? ht("", E.b, Me(h), i, E.b, [], !1, !0) : tr(h, {}, i, E.b)).forEach(l);
    c = "" + c;
    let u = o.get(c);
    if (!u) {
      let h = /* @__PURE__ */ new Set();
      for (let f of Te(Me(c), i)) h.add(f.c).add(l(f));
      u = [
        ...h
      ].filter(Boolean).join(" "), o.set(c, u).set(u, u);
    }
    return u;
  }, Object.getOwnPropertyDescriptors({
    get target() {
      return e.target;
    },
    theme: i.theme,
    config: r,
    snapshot() {
      let a = e.snapshot(), c = new Set(s), u = new Map(o), h = [
        ...n
      ];
      return () => {
        a(), s = c, o = u, n = h;
      };
    },
    clear() {
      e.clear(), s = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), n = [];
    },
    destroy() {
      this.clear(), e.destroy();
    }
  }));
}
function hi(t, e) {
  return t != e && "" + t.split(" ").sort() != "" + e.split(" ").sort();
}
function pi(t) {
  let e = new MutationObserver(r);
  return {
    observe(o) {
      e.observe(o, {
        attributeFilter: [
          "class"
        ],
        subtree: !0,
        childList: !0
      }), i(o), r([
        {
          target: o,
          type: ""
        }
      ]);
    },
    disconnect() {
      e.disconnect();
    }
  };
  function r(o) {
    for (let { type: n, target: s } of o) if (n[0] == "a")
      i(s);
    else
      for (let l of s.querySelectorAll("[class]")) i(l);
    e.takeRecords();
  }
  function i(o) {
    let n, s = o.getAttribute?.("class");
    s && hi(s, n = t(s)) && // Not using `target.className = ...` as that is read-only for SVGElements
    o.setAttribute("class", n);
  }
}
function ui(t) {
  let e = document.querySelector(t || 'style[data-twind=""]');
  return (!e || e.tagName != "STYLE") && (e = document.createElement("style"), document.head.prepend(e)), e.dataset.twind = "claimed", e;
}
function Ie(t) {
  let e = t?.cssRules ? t : (t && typeof t != "string" ? t : ui(t)).sheet;
  return {
    target: e,
    snapshot() {
      let r = Array.from(e.cssRules, (i) => i.cssText);
      return () => {
        this.clear(), r.forEach(this.insert);
      };
    },
    clear() {
      for (let r = e.cssRules.length; r--; ) e.deleteRule(r);
    },
    destroy() {
      e.ownerNode?.remove();
    },
    insert(r, i) {
      try {
        e.insertRule(r, i);
      } catch {
        e.insertRule(":root{}", i);
      }
    },
    resume: lt
  };
}
function sr(t, e = !0) {
  let r = function() {
    if (fi) try {
      let a = Ie(new CSSStyleSheet());
      return a.connect = (c) => {
        let u = Ve(c);
        u.adoptedStyleSheets = [
          ...u.adoptedStyleSheets,
          a.target
        ];
      }, a.disconnect = lt, a;
    } catch {
    }
    let n = document.createElement("style");
    n.media = "not all", document.head.prepend(n);
    let s = [
      Ie(n)
    ], l = /* @__PURE__ */ new WeakMap();
    return {
      get target() {
        return s[0].target;
      },
      snapshot() {
        let a = s.map((c) => c.snapshot());
        return () => a.forEach((c) => c());
      },
      clear() {
        s.forEach((a) => a.clear());
      },
      destroy() {
        s.forEach((a) => a.destroy());
      },
      insert(a, c, u) {
        s[0].insert(a, c, u);
        let h = this.target.cssRules[c];
        s.forEach((f, g) => g && f.target.insertRule(h.cssText, c));
      },
      resume(a, c) {
        return s[0].resume(a, c);
      },
      connect(a) {
        let c = document.createElement("style");
        Ve(a).appendChild(c);
        let u = Ie(c), { cssRules: h } = this.target;
        for (let f = 0; f < h.length; f++) u.target.insertRule(h[f].cssText, f);
        s.push(u), l.set(a, u);
      },
      disconnect(a) {
        let c = s.indexOf(l.get(a));
        c >= 0 && s.splice(c, 1);
      }
    };
  }(), i = di({
    ...t,
    // in production use short hashed class names
    hash: t.hash ?? e
  }, r), o = pi(i);
  return function(s) {
    return class extends s {
      connectedCallback() {
        super.connectedCallback?.(), r.connect(this), o.observe(Ve(this));
      }
      disconnectedCallback() {
        r.disconnect(this), super.disconnectedCallback?.();
      }
      constructor(...a) {
        super(...a), this.tw = i;
      }
    };
  };
}
let fi = typeof ShadowRoot < "u" && (typeof ShadyCSS > "u" || ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
function Ve(t) {
  return t.shadowRoot || t.attachShadow({
    mode: "open"
  });
}
var gi = /* @__PURE__ */ new Map([["align-self", "-ms-grid-row-align"], ["color-adjust", "-webkit-print-color-adjust"], ["column-gap", "grid-column-gap"], ["forced-color-adjust", "-ms-high-contrast-adjust"], ["gap", "grid-gap"], ["grid-template-columns", "-ms-grid-columns"], ["grid-template-rows", "-ms-grid-rows"], ["justify-self", "-ms-grid-column-align"], ["margin-inline-end", "-webkit-margin-end"], ["margin-inline-start", "-webkit-margin-start"], ["mask-border", "-webkit-mask-box-image"], ["mask-border-outset", "-webkit-mask-box-image-outset"], ["mask-border-slice", "-webkit-mask-box-image-slice"], ["mask-border-source", "-webkit-mask-box-image-source"], ["mask-border-repeat", "-webkit-mask-box-image-repeat"], ["mask-border-width", "-webkit-mask-box-image-width"], ["overflow-wrap", "word-wrap"], ["padding-inline-end", "-webkit-padding-end"], ["padding-inline-start", "-webkit-padding-start"], ["print-color-adjust", "color-adjust"], ["row-gap", "grid-row-gap"], ["scroll-margin-bottom", "scroll-snap-margin-bottom"], ["scroll-margin-left", "scroll-snap-margin-left"], ["scroll-margin-right", "scroll-snap-margin-right"], ["scroll-margin-top", "scroll-snap-margin-top"], ["scroll-margin", "scroll-snap-margin"], ["text-combine-upright", "-ms-text-combine-horizontal"]]);
function mi(t) {
  return gi.get(t);
}
function bi(t) {
  var e = /^(?:(text-(?:decoration$|e|or|si)|back(?:ground-cl|d|f)|box-d|mask(?:$|-[ispro]|-cl)|pr|hyphena|flex-d)|(tab-|column(?!-s)|text-align-l)|(ap)|u|hy)/i.exec(t);
  return e ? e[1] ? 1 : e[2] ? 2 : e[3] ? 3 : 5 : 0;
}
function yi(t, e) {
  var r = /^(?:(pos)|(cli)|(background-i)|(flex(?:$|-b)|(?:max-|min-)?(?:block-s|inl|he|widt))|dis)/i.exec(t);
  return r ? r[1] ? /^sti/i.test(e) ? 1 : 0 : r[2] ? /^pat/i.test(e) ? 1 : 0 : r[3] ? /^image-/i.test(e) ? 1 : 0 : r[4] ? e[3] === "-" ? 2 : 0 : /^(?:inline-)?grid$/i.test(e) ? 4 : 0 : 0;
}
let vi = [
  [
    "-webkit-",
    1
  ],
  // 0b001
  [
    "-moz-",
    2
  ],
  // 0b010
  [
    "-ms-",
    4
  ]
];
function wi() {
  return ({ stringify: t }) => ({
    stringify(e, r, i) {
      let o = "", n = mi(e);
      n && (o += t(n, r, i) + ";");
      let s = bi(e), l = yi(e, r);
      for (let a of vi)
        s & a[1] && (o += t(a[0] + e, r, i) + ";"), l & a[1] && (o += t(e, a[0] + r, i) + ";");
      return o + t(e, r, i);
    }
  });
}
let Ze = {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },
  columns: {
    auto: "auto",
    // Handled by plugin,
    // 1: '1',
    // 2: '2',
    // 3: '3',
    // 4: '4',
    // 5: '5',
    // 6: '6',
    // 7: '7',
    // 8: '8',
    // 9: '9',
    // 10: '10',
    // 11: '11',
    // 12: '12',
    "3xs": "16rem",
    "2xs": "18rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem"
  },
  spacing: {
    px: "1px",
    0: "0px",
    .../* @__PURE__ */ P(4, "rem", 4, 0.5, 0.5),
    // 0.5: '0.125rem',
    // 1: '0.25rem',
    // 1.5: '0.375rem',
    // 2: '0.5rem',
    // 2.5: '0.625rem',
    // 3: '0.75rem',
    // 3.5: '0.875rem',
    // 4: '1rem',
    .../* @__PURE__ */ P(12, "rem", 4, 5),
    // 5: '1.25rem',
    // 6: '1.5rem',
    // 7: '1.75rem',
    // 8: '2rem',
    // 9: '2.25rem',
    // 10: '2.5rem',
    // 11: '2.75rem',
    // 12: '3rem',
    14: "3.5rem",
    .../* @__PURE__ */ P(64, "rem", 4, 16, 4),
    // 16: '4rem',
    // 20: '5rem',
    // 24: '6rem',
    // 28: '7rem',
    // 32: '8rem',
    // 36: '9rem',
    // 40: '10rem',
    // 44: '11rem',
    // 48: '12rem',
    // 52: '13rem',
    // 56: '14rem',
    // 60: '15rem',
    // 64: '16rem',
    72: "18rem",
    80: "20rem",
    96: "24rem"
  },
  durations: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1e3: "1000ms"
  },
  animation: {
    none: "none",
    spin: "spin 1s linear infinite",
    ping: "ping 1s cubic-bezier(0,0,0.2,1) infinite",
    pulse: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
    bounce: "bounce 1s infinite"
  },
  aspectRatio: {
    auto: "auto",
    square: "1/1",
    video: "16/9"
  },
  backdropBlur: /* @__PURE__ */ b("blur"),
  backdropBrightness: /* @__PURE__ */ b("brightness"),
  backdropContrast: /* @__PURE__ */ b("contrast"),
  backdropGrayscale: /* @__PURE__ */ b("grayscale"),
  backdropHueRotate: /* @__PURE__ */ b("hueRotate"),
  backdropInvert: /* @__PURE__ */ b("invert"),
  backdropOpacity: /* @__PURE__ */ b("opacity"),
  backdropSaturate: /* @__PURE__ */ b("saturate"),
  backdropSepia: /* @__PURE__ */ b("sepia"),
  backgroundColor: /* @__PURE__ */ b("colors"),
  backgroundImage: {
    none: "none"
  },
  // These are built-in
  // 'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
  // 'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
  // 'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
  // 'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
  // 'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
  // 'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
  // 'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
  // 'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
  backgroundOpacity: /* @__PURE__ */ b("opacity"),
  // backgroundPosition: {
  //   // The following are already handled by the plugin:
  //   // center, right, left, bottom, top
  //   // 'bottom-10px-right-20px' -> bottom 10px right 20px
  // },
  backgroundSize: {
    auto: "auto",
    cover: "cover",
    contain: "contain"
  },
  blur: {
    none: "none",
    0: "0",
    sm: "4px",
    DEFAULT: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px"
  },
  brightness: {
    .../* @__PURE__ */ P(200, "", 100, 0, 50),
    // 0: '0',
    // 50: '.5',
    // 150: '1.5',
    // 200: '2',
    .../* @__PURE__ */ P(110, "", 100, 90, 5),
    // 90: '.9',
    // 95: '.95',
    // 100: '1',
    // 105: '1.05',
    // 110: '1.1',
    75: "0.75",
    125: "1.25"
  },
  borderColor: ({ theme: t }) => ({
    DEFAULT: t("colors.gray.200", "currentColor"),
    ...t("colors")
  }),
  borderOpacity: /* @__PURE__ */ b("opacity"),
  borderRadius: {
    none: "0px",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "1/2": "50%",
    full: "9999px"
  },
  borderSpacing: /* @__PURE__ */ b("spacing"),
  borderWidth: {
    DEFAULT: "1px",
    .../* @__PURE__ */ j(8, "px")
  },
  // 0: '0px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
    "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.05)",
    none: "0 0 #0000"
  },
  boxShadowColor: b("colors"),
  // container: {},
  // cursor: {
  //   // Default values are handled by plugin
  // },
  caretColor: /* @__PURE__ */ b("colors"),
  accentColor: ({ theme: t }) => ({
    auto: "auto",
    ...t("colors")
  }),
  contrast: {
    .../* @__PURE__ */ P(200, "", 100, 0, 50),
    // 0: '0',
    // 50: '.5',
    // 150: '1.5',
    // 200: '2',
    75: "0.75",
    125: "1.25"
  },
  content: {
    none: "none"
  },
  divideColor: /* @__PURE__ */ b("borderColor"),
  divideOpacity: /* @__PURE__ */ b("borderOpacity"),
  divideWidth: /* @__PURE__ */ b("borderWidth"),
  dropShadow: {
    sm: "0 1px 1px rgba(0,0,0,0.05)",
    DEFAULT: [
      "0 1px 2px rgba(0,0,0,0.1)",
      "0 1px 1px rgba(0,0,0,0.06)"
    ],
    md: [
      "0 4px 3px rgba(0,0,0,0.07)",
      "0 2px 2px rgba(0,0,0,0.06)"
    ],
    lg: [
      "0 10px 8px rgba(0,0,0,0.04)",
      "0 4px 3px rgba(0,0,0,0.1)"
    ],
    xl: [
      "0 20px 13px rgba(0,0,0,0.03)",
      "0 8px 5px rgba(0,0,0,0.08)"
    ],
    "2xl": "0 25px 25px rgba(0,0,0,0.15)",
    none: "0 0 #0000"
  },
  fill: ({ theme: t }) => ({
    ...t("colors"),
    none: "none"
  }),
  grayscale: {
    DEFAULT: "100%",
    0: "0"
  },
  hueRotate: {
    0: "0deg",
    15: "15deg",
    30: "30deg",
    60: "60deg",
    90: "90deg",
    180: "180deg"
  },
  invert: {
    DEFAULT: "100%",
    0: "0"
  },
  flex: {
    1: "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    none: "none"
  },
  flexBasis: ({ theme: t }) => ({
    ...t("spacing"),
    ...pe(2, 6),
    // '1/2': '50%',
    // '1/3': '33.333333%',
    // '2/3': '66.666667%',
    // '1/4': '25%',
    // '2/4': '50%',
    // '3/4': '75%',
    // '1/5': '20%',
    // '2/5': '40%',
    // '3/5': '60%',
    // '4/5': '80%',
    // '1/6': '16.666667%',
    // '2/6': '33.333333%',
    // '3/6': '50%',
    // '4/6': '66.666667%',
    // '5/6': '83.333333%',
    ...pe(12, 12),
    // '1/12': '8.333333%',
    // '2/12': '16.666667%',
    // '3/12': '25%',
    // '4/12': '33.333333%',
    // '5/12': '41.666667%',
    // '6/12': '50%',
    // '7/12': '58.333333%',
    // '8/12': '66.666667%',
    // '9/12': '75%',
    // '10/12': '83.333333%',
    // '11/12': '91.666667%',
    auto: "auto",
    full: "100%"
  }),
  flexGrow: {
    DEFAULT: 1,
    0: 0
  },
  flexShrink: {
    DEFAULT: 1,
    0: 0
  },
  fontFamily: {
    sans: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'.split(","),
    serif: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif'.split(","),
    mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'.split(",")
  },
  fontSize: {
    xs: [
      "0.75rem",
      "1rem"
    ],
    sm: [
      "0.875rem",
      "1.25rem"
    ],
    base: [
      "1rem",
      "1.5rem"
    ],
    lg: [
      "1.125rem",
      "1.75rem"
    ],
    xl: [
      "1.25rem",
      "1.75rem"
    ],
    "2xl": [
      "1.5rem",
      "2rem"
    ],
    "3xl": [
      "1.875rem",
      "2.25rem"
    ],
    "4xl": [
      "2.25rem",
      "2.5rem"
    ],
    "5xl": [
      "3rem",
      "1"
    ],
    "6xl": [
      "3.75rem",
      "1"
    ],
    "7xl": [
      "4.5rem",
      "1"
    ],
    "8xl": [
      "6rem",
      "1"
    ],
    "9xl": [
      "8rem",
      "1"
    ]
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  },
  gap: /* @__PURE__ */ b("spacing"),
  gradientColorStops: /* @__PURE__ */ b("colors"),
  gridAutoColumns: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0,1fr)"
  },
  gridAutoRows: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0,1fr)"
  },
  gridColumn: {
    // span-X is handled by the plugin: span-1 -> span 1 / span 1
    auto: "auto",
    "span-full": "1 / -1"
  },
  // gridColumnEnd: {
  //   // Defaults handled by plugin
  // },
  // gridColumnStart: {
  //   // Defaults handled by plugin
  // },
  gridRow: {
    // span-X is handled by the plugin: span-1 -> span 1 / span 1
    auto: "auto",
    "span-full": "1 / -1"
  },
  // gridRowStart: {
  //   // Defaults handled by plugin
  // },
  // gridRowEnd: {
  //   // Defaults handled by plugin
  // },
  gridTemplateColumns: {
    // numbers are handled by the plugin: 1 -> repeat(1, minmax(0, 1fr))
    none: "none"
  },
  gridTemplateRows: {
    // numbers are handled by the plugin: 1 -> repeat(1, minmax(0, 1fr))
    none: "none"
  },
  height: ({ theme: t }) => ({
    ...t("spacing"),
    ...pe(2, 6),
    // '1/2': '50%',
    // '1/3': '33.333333%',
    // '2/3': '66.666667%',
    // '1/4': '25%',
    // '2/4': '50%',
    // '3/4': '75%',
    // '1/5': '20%',
    // '2/5': '40%',
    // '3/5': '60%',
    // '4/5': '80%',
    // '1/6': '16.666667%',
    // '2/6': '33.333333%',
    // '3/6': '50%',
    // '4/6': '66.666667%',
    // '5/6': '83.333333%',
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    auto: "auto",
    full: "100%",
    screen: "100vh"
  }),
  inset: ({ theme: t }) => ({
    ...t("spacing"),
    ...pe(2, 4),
    // '1/2': '50%',
    // '1/3': '33.333333%',
    // '2/3': '66.666667%',
    // '1/4': '25%',
    // '2/4': '50%',
    // '3/4': '75%',
    auto: "auto",
    full: "100%"
  }),
  keyframes: {
    spin: {
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(360deg)"
      }
    },
    ping: {
      "0%": {
        transform: "scale(1)",
        opacity: "1"
      },
      "75%,100%": {
        transform: "scale(2)",
        opacity: "0"
      }
    },
    pulse: {
      "0%,100%": {
        opacity: "1"
      },
      "50%": {
        opacity: ".5"
      }
    },
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
      },
      "50%": {
        transform: "none",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
      }
    }
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeight: {
    .../* @__PURE__ */ P(10, "rem", 4, 3),
    // 3: '.75rem',
    // 4: '1rem',
    // 5: '1.25rem',
    // 6: '1.5rem',
    // 7: '1.75rem',
    // 8: '2rem',
    // 9: '2.25rem',
    // 10: '2.5rem',
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2"
  },
  // listStyleType: {
  //   // Defaults handled by plugin
  // },
  margin: ({ theme: t }) => ({
    auto: "auto",
    ...t("spacing")
  }),
  maxHeight: ({ theme: t }) => ({
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    screen: "100vh",
    ...t("spacing")
  }),
  maxWidth: ({ theme: t, breakpoints: e }) => ({
    ...e(t("screens")),
    none: "none",
    0: "0rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    prose: "65ch"
  }),
  minHeight: {
    0: "0px",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    screen: "100vh"
  },
  minWidth: {
    0: "0px",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  },
  // objectPosition: {
  //   // The plugins joins all arguments by default
  // },
  opacity: {
    .../* @__PURE__ */ P(100, "", 100, 0, 10),
    // 0: '0',
    // 10: '0.1',
    // 20: '0.2',
    // 30: '0.3',
    // 40: '0.4',
    // 60: '0.6',
    // 70: '0.7',
    // 80: '0.8',
    // 90: '0.9',
    // 100: '1',
    5: "0.05",
    25: "0.25",
    75: "0.75",
    95: "0.95"
  },
  order: {
    // Handled by plugin
    // 1: '1',
    // 2: '2',
    // 3: '3',
    // 4: '4',
    // 5: '5',
    // 6: '6',
    // 7: '7',
    // 8: '8',
    // 9: '9',
    // 10: '10',
    // 11: '11',
    // 12: '12',
    first: "-9999",
    last: "9999",
    none: "0"
  },
  padding: /* @__PURE__ */ b("spacing"),
  placeholderColor: /* @__PURE__ */ b("colors"),
  placeholderOpacity: /* @__PURE__ */ b("opacity"),
  outlineColor: /* @__PURE__ */ b("colors"),
  outlineOffset: /* @__PURE__ */ j(8, "px"),
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',,
  outlineWidth: /* @__PURE__ */ j(8, "px"),
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',,
  ringColor: ({ theme: t }) => ({
    ...t("colors"),
    DEFAULT: "#3b82f6"
  }),
  ringOffsetColor: /* @__PURE__ */ b("colors"),
  ringOffsetWidth: /* @__PURE__ */ j(8, "px"),
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',,
  ringOpacity: ({ theme: t }) => ({
    ...t("opacity"),
    DEFAULT: "0.5"
  }),
  ringWidth: {
    DEFAULT: "3px",
    .../* @__PURE__ */ j(8, "px")
  },
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',
  rotate: {
    .../* @__PURE__ */ j(2, "deg"),
    // 0: '0deg',
    // 1: '1deg',
    // 2: '2deg',
    .../* @__PURE__ */ j(12, "deg", 3),
    // 3: '3deg',
    // 6: '6deg',
    // 12: '12deg',
    .../* @__PURE__ */ j(180, "deg", 45)
  },
  // 45: '45deg',
  // 90: '90deg',
  // 180: '180deg',
  saturate: /* @__PURE__ */ P(200, "", 100, 0, 50),
  // 0: '0',
  // 50: '.5',
  // 100: '1',
  // 150: '1.5',
  // 200: '2',
  scale: {
    .../* @__PURE__ */ P(150, "", 100, 0, 50),
    // 0: '0',
    // 50: '.5',
    // 150: '1.5',
    .../* @__PURE__ */ P(110, "", 100, 90, 5),
    // 90: '.9',
    // 95: '.95',
    // 100: '1',
    // 105: '1.05',
    // 110: '1.1',
    75: "0.75",
    125: "1.25"
  },
  scrollMargin: /* @__PURE__ */ b("spacing"),
  scrollPadding: /* @__PURE__ */ b("spacing"),
  sepia: {
    0: "0",
    DEFAULT: "100%"
  },
  skew: {
    .../* @__PURE__ */ j(2, "deg"),
    // 0: '0deg',
    // 1: '1deg',
    // 2: '2deg',
    .../* @__PURE__ */ j(12, "deg", 3)
  },
  // 3: '3deg',
  // 6: '6deg',
  // 12: '12deg',
  space: /* @__PURE__ */ b("spacing"),
  stroke: ({ theme: t }) => ({
    ...t("colors"),
    none: "none"
  }),
  strokeWidth: /* @__PURE__ */ P(2),
  // 0: '0',
  // 1: '1',
  // 2: '2',,
  textColor: /* @__PURE__ */ b("colors"),
  textDecorationColor: /* @__PURE__ */ b("colors"),
  textDecorationThickness: {
    "from-font": "from-font",
    auto: "auto",
    .../* @__PURE__ */ j(8, "px")
  },
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',
  textUnderlineOffset: {
    auto: "auto",
    .../* @__PURE__ */ j(8, "px")
  },
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',
  textIndent: /* @__PURE__ */ b("spacing"),
  textOpacity: /* @__PURE__ */ b("opacity"),
  // transformOrigin: {
  //   // The following are already handled by the plugin:
  //   // center, right, left, bottom, top
  //   // 'bottom-10px-right-20px' -> bottom 10px right 20px
  // },
  transitionDuration: ({ theme: t }) => ({
    ...t("durations"),
    DEFAULT: "150ms"
  }),
  transitionDelay: /* @__PURE__ */ b("durations"),
  transitionProperty: {
    none: "none",
    all: "all",
    DEFAULT: "color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter",
    colors: "color,background-color,border-color,text-decoration-color,fill,stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform"
  },
  transitionTimingFunction: {
    DEFAULT: "cubic-bezier(0.4,0,0.2,1)",
    linear: "linear",
    in: "cubic-bezier(0.4,0,1,1)",
    out: "cubic-bezier(0,0,0.2,1)",
    "in-out": "cubic-bezier(0.4,0,0.2,1)"
  },
  translate: ({ theme: t }) => ({
    ...t("spacing"),
    ...pe(2, 4),
    // '1/2': '50%',
    // '1/3': '33.333333%',
    // '2/3': '66.666667%',
    // '1/4': '25%',
    // '2/4': '50%',
    // '3/4': '75%',
    full: "100%"
  }),
  width: ({ theme: t }) => ({
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    screen: "100vw",
    ...t("flexBasis")
  }),
  willChange: {
    scroll: "scroll-position"
  },
  // other options handled by rules
  // auto: 'auto',
  // contents: 'contents',
  // transform: 'transform',
  zIndex: {
    .../* @__PURE__ */ P(50, "", 1, 0, 10),
    // 0: '0',
    // 10: '10',
    // 20: '20',
    // 30: '30',
    // 40: '40',
    // 50: '50',
    auto: "auto"
  }
};
function pe(t, e) {
  let r = {};
  do
    for (var i = 1; i < t; i++) r[`${i}/${t}`] = Number((i / t * 100).toFixed(6)) + "%";
  while (++t <= e);
  return r;
}
function j(t, e, r = 0) {
  let i = {};
  for (; r <= t; r = 2 * r || 1) i[r] = r + e;
  return i;
}
function P(t, e = "", r = 1, i = 0, o = 1, n = {}) {
  for (; i <= t; i += o) n[i] = i / r + e;
  return n;
}
function b(t) {
  return ({ theme: e }) => e(t);
}
let xi = {
  /*
  1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
  2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
  */
  "*,::before,::after": {
    boxSizing: "border-box",
    /* 1 */
    borderWidth: "0",
    /* 2 */
    borderStyle: "solid",
    /* 2 */
    borderColor: "theme(borderColor.DEFAULT, currentColor)"
  },
  /* 2 */
  "::before,::after": {
    "--tw-content": "''"
  },
  /*
  1. Use a consistent sensible line-height in all browsers.
  2. Prevent adjustments of font size after orientation changes in iOS.
  3. Use a more readable tab size.
  4. Use the user's configured `sans` font-family by default.
  5. Use the user's configured `sans` font-feature-settings by default.
  */
  html: {
    lineHeight: 1.5,
    /* 1 */
    WebkitTextSizeAdjust: "100%",
    /* 2 */
    MozTabSize: "4",
    /* 3 */
    tabSize: 4,
    /* 3 */
    fontFamily: `theme(fontFamily.sans, ${Ze.fontFamily.sans})`,
    /* 4 */
    fontFeatureSettings: "theme(fontFamily.sans[1].fontFeatureSettings, normal)"
  },
  /* 5 */
  /*
  1. Remove the margin in all browsers.
  2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
  */
  body: {
    margin: "0",
    /* 1 */
    lineHeight: "inherit"
  },
  /* 2 */
  /*
  1. Add the correct height in Firefox.
  2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
  3. Ensure horizontal rules are visible by default.
  */
  hr: {
    height: "0",
    /* 1 */
    color: "inherit",
    /* 2 */
    borderTopWidth: "1px"
  },
  /* 3 */
  /*
  Add the correct text decoration in Chrome, Edge, and Safari.
  */
  "abbr:where([title])": {
    textDecoration: "underline dotted"
  },
  /*
  Remove the default font size and weight for headings.
  */
  "h1,h2,h3,h4,h5,h6": {
    fontSize: "inherit",
    fontWeight: "inherit"
  },
  /*
  Reset links to optimize for opt-in styling instead of opt-out.
  */
  a: {
    color: "inherit",
    textDecoration: "inherit"
  },
  /*
  Add the correct font weight in Edge and Safari.
  */
  "b,strong": {
    fontWeight: "bolder"
  },
  /*
  1. Use the user's configured `mono` font family by default.
  2. Use the user's configured `mono` font-feature-settings by default.
  3. Correct the odd `em` font sizing in all browsers.
  */
  "code,kbd,samp,pre": {
    fontFamily: `theme(fontFamily.mono, ${Ze.fontFamily.mono})`,
    fontFeatureSettings: "theme(fontFamily.mono[1].fontFeatureSettings, normal)",
    fontSize: "1em"
  },
  /*
  Add the correct font size in all browsers.
  */
  small: {
    fontSize: "80%"
  },
  /*
  Prevent `sub` and `sup` elements from affecting the line height in all browsers.
  */
  "sub,sup": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline"
  },
  sub: {
    bottom: "-0.25em"
  },
  sup: {
    top: "-0.5em"
  },
  /*
  1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
  2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
  3. Remove gaps between table borders by default.
  */
  table: {
    textIndent: "0",
    /* 1 */
    borderColor: "inherit",
    /* 2 */
    borderCollapse: "collapse"
  },
  /* 3 */
  /*
  1. Change the font styles in all browsers.
  2. Remove the margin in Firefox and Safari.
  3. Remove default padding in all browsers.
  */
  "button,input,optgroup,select,textarea": {
    fontFamily: "inherit",
    /* 1 */
    fontSize: "100%",
    /* 1 */
    lineHeight: "inherit",
    /* 1 */
    color: "inherit",
    /* 1 */
    margin: "0",
    /* 2 */
    padding: "0"
  },
  /* 3 */
  /*
  Remove the inheritance of text transform in Edge and Firefox.
  */
  "button,select": {
    textTransform: "none"
  },
  /*
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Remove default button styles.
  */
  "button,[type='button'],[type='reset'],[type='submit']": {
    WebkitAppearance: "button",
    /* 1 */
    backgroundColor: "transparent",
    /* 2 */
    backgroundImage: "none"
  },
  /* 4 */
  /*
  Use the modern Firefox focus style for all focusable elements.
  */
  ":-moz-focusring": {
    outline: "auto"
  },
  /*
  Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
  */
  ":-moz-ui-invalid": {
    boxShadow: "none"
  },
  /*
  Add the correct vertical alignment in Chrome and Firefox.
  */
  progress: {
    verticalAlign: "baseline"
  },
  /*
  Correct the cursor style of increment and decrement buttons in Safari.
  */
  "::-webkit-inner-spin-button,::-webkit-outer-spin-button": {
    height: "auto"
  },
  /*
  1. Correct the odd appearance in Chrome and Safari.
  2. Correct the outline style in Safari.
  */
  "[type='search']": {
    WebkitAppearance: "textfield",
    /* 1 */
    outlineOffset: "-2px"
  },
  /* 2 */
  /*
  Remove the inner padding in Chrome and Safari on macOS.
  */
  "::-webkit-search-decoration": {
    WebkitAppearance: "none"
  },
  /*
  1. Correct the inability to style clickable types in iOS and Safari.
  2. Change font properties to `inherit` in Safari.
  */
  "::-webkit-file-upload-button": {
    WebkitAppearance: "button",
    /* 1 */
    font: "inherit"
  },
  /* 2 */
  /*
  Add the correct display in Chrome and Safari.
  */
  summary: {
    display: "list-item"
  },
  /*
  Removes the default spacing and border for appropriate elements.
  */
  "blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre": {
    margin: "0"
  },
  fieldset: {
    margin: "0",
    padding: "0"
  },
  legend: {
    padding: "0"
  },
  "ol,ul,menu": {
    listStyle: "none",
    margin: "0",
    padding: "0"
  },
  /*
  Prevent resizing textareas horizontally by default.
  */
  textarea: {
    resize: "vertical"
  },
  /*
  1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
  2. Set the default placeholder color to the user's configured gray 400 color.
  */
  "input::placeholder,textarea::placeholder": {
    opacity: 1,
    /* 1 */
    color: "theme(colors.gray.400, #9ca3af)"
  },
  /* 2 */
  /*
  Set the default cursor for buttons.
  */
  'button,[role="button"]': {
    cursor: "pointer"
  },
  /*
  Make sure disabled buttons don't get the pointer cursor.
  */
  ":disabled": {
    cursor: "default"
  },
  /*
  1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
  2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
    This can trigger a poorly considered lint error in some tools but is included by design.
  */
  "img,svg,video,canvas,audio,iframe,embed,object": {
    display: "block",
    /* 1 */
    verticalAlign: "middle"
  },
  /* 2 */
  /*
  Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
  */
  "img,video": {
    maxWidth: "100%",
    height: "auto"
  },
  /* Make elements with the HTML hidden attribute stay hidden by default */
  "[hidden]": {
    display: "none"
  }
}, $i = [
  /* arbitrary properties: [paint-order:markers] */
  d("\\[([-\\w]+):(.+)]", ({ 1: t, 2: e }, r) => ({
    "@layer overrides": {
      "&": {
        [t]: q(`[${e}]`, "", r)
      }
    }
  })),
  /* Styling based on parent and peer state */
  d("(group|peer)([~/][^-[]+)?", ({ input: t }, { h: e }) => [
    {
      c: e(t)
    }
  ]),
  /* LAYOUT */
  p("aspect-", "aspectRatio"),
  d("container", (t, { theme: e }) => {
    let { screens: r = e("screens"), center: i, padding: o } = e("container"), n = {
      width: "100%",
      marginRight: i && "auto",
      marginLeft: i && "auto",
      ...s("xs")
    };
    for (let l in r) {
      let a = r[l];
      typeof a == "string" && (n[at(a)] = {
        "&": {
          maxWidth: a,
          ...s(l)
        }
      });
    }
    return n;
    function s(l) {
      let a = o && (typeof o == "string" ? o : o[l] || o.DEFAULT);
      if (a) return {
        paddingRight: a,
        paddingLeft: a
      };
    }
  }),
  // Content
  p("content-", "content", ({ _: t }) => ({
    "--tw-content": t,
    content: "var(--tw-content)"
  })),
  // Box Decoration Break
  d("(?:box-)?decoration-(slice|clone)", "boxDecorationBreak"),
  // Box Sizing
  d("box-(border|content)", "boxSizing", ({ 1: t }) => t + "-box"),
  // Display
  d("hidden", {
    display: "none"
  }),
  // Table Layout
  d("table-(auto|fixed)", "tableLayout"),
  d([
    "(block|flex|table|grid|inline|contents|flow-root|list-item)",
    "(inline-(block|flex|table|grid))",
    "(table-(caption|cell|column|row|(column|row|footer|header)-group))"
  ], "display"),
  // Floats
  "(float)-(left|right|none)",
  // Clear
  "(clear)-(left|right|none|both)",
  // Overflow
  "(overflow(?:-[xy])?)-(auto|hidden|clip|visible|scroll)",
  // Isolation
  "(isolation)-(auto)",
  // Isolation
  d("isolate", "isolation"),
  // Object Fit
  d("object-(contain|cover|fill|none|scale-down)", "objectFit"),
  // Object Position
  p("object-", "objectPosition"),
  d("object-(top|bottom|center|(left|right)(-(top|bottom))?)", "objectPosition", _e),
  // Overscroll Behavior
  d("overscroll(-[xy])?-(auto|contain|none)", ({ 1: t = "", 2: e }) => ({
    ["overscroll-behavior" + t]: e
  })),
  // Position
  d("(static|fixed|absolute|relative|sticky)", "position"),
  // Top / Right / Bottom / Left
  p("-?inset(-[xy])?(?:$|-)", "inset", ({ 1: t, _: e }) => ({
    top: t != "-x" && e,
    right: t != "-y" && e,
    bottom: t != "-x" && e,
    left: t != "-y" && e
  })),
  p("-?(top|bottom|left|right)(?:$|-)", "inset"),
  // Visibility
  d("(visible|collapse)", "visibility"),
  d("invisible", {
    visibility: "hidden"
  }),
  // Z-Index
  p("-?z-", "zIndex"),
  /* FLEXBOX */
  // Flex Direction
  d("flex-((row|col)(-reverse)?)", "flexDirection", Rt),
  d("flex-(wrap|wrap-reverse|nowrap)", "flexWrap"),
  p("(flex-(?:grow|shrink))(?:$|-)"),
  /*, 'flex-grow' | flex-shrink */
  p("(flex)-"),
  /*, 'flex' */
  p("grow(?:$|-)", "flexGrow"),
  p("shrink(?:$|-)", "flexShrink"),
  p("basis-", "flexBasis"),
  p("-?(order)-"),
  /*, 'order' */
  "-?(order)-(\\d+)",
  /* GRID */
  // Grid Template Columns
  p("grid-cols-", "gridTemplateColumns"),
  d("grid-cols-(\\d+)", "gridTemplateColumns", Ut),
  // Grid Column Start / End
  p("col-", "gridColumn"),
  d("col-(span)-(\\d+)", "gridColumn", Lt),
  p("col-start-", "gridColumnStart"),
  d("col-start-(auto|\\d+)", "gridColumnStart"),
  p("col-end-", "gridColumnEnd"),
  d("col-end-(auto|\\d+)", "gridColumnEnd"),
  // Grid Template Rows
  p("grid-rows-", "gridTemplateRows"),
  d("grid-rows-(\\d+)", "gridTemplateRows", Ut),
  // Grid Row Start / End
  p("row-", "gridRow"),
  d("row-(span)-(\\d+)", "gridRow", Lt),
  p("row-start-", "gridRowStart"),
  d("row-start-(auto|\\d+)", "gridRowStart"),
  p("row-end-", "gridRowEnd"),
  d("row-end-(auto|\\d+)", "gridRowEnd"),
  // Grid Auto Flow
  d("grid-flow-((row|col)(-dense)?)", "gridAutoFlow", (t) => _e(Rt(t))),
  d("grid-flow-(dense)", "gridAutoFlow"),
  // Grid Auto Columns
  p("auto-cols-", "gridAutoColumns"),
  // Grid Auto Rows
  p("auto-rows-", "gridAutoRows"),
  // Gap
  p("gap-x(?:$|-)", "gap", "columnGap"),
  p("gap-y(?:$|-)", "gap", "rowGap"),
  p("gap(?:$|-)", "gap"),
  /* BOX ALIGNMENT */
  // Justify Items
  // Justify Self
  "(justify-(?:items|self))-",
  // Justify Content
  d("justify-", "justifyContent", jt),
  // Align Content
  // Align Items
  // Align Self
  d("(content|items|self)-", (t) => ({
    ["align-" + t[1]]: jt(t)
  })),
  // Place Content
  // Place Items
  // Place Self
  d("(place-(content|items|self))-", ({ 1: t, $$: e }) => ({
    [t]: ("wun".includes(e[3]) ? "space-" : "") + e
  })),
  /* SPACING */
  // Padding
  p("p([xytrbl])?(?:$|-)", "padding", re("padding")),
  // Margin
  p("-?m([xytrbl])?(?:$|-)", "margin", re("margin")),
  // Space Between
  p("-?space-(x|y)(?:$|-)", "space", ({ 1: t, _: e }) => ({
    "&>:not([hidden])~:not([hidden])": {
      [`--tw-space-${t}-reverse`]: "0",
      ["margin-" + {
        y: "top",
        x: "left"
      }[t]]: `calc(${e} * calc(1 - var(--tw-space-${t}-reverse)))`,
      ["margin-" + {
        y: "bottom",
        x: "right"
      }[t]]: `calc(${e} * var(--tw-space-${t}-reverse))`
    }
  })),
  d("space-(x|y)-reverse", ({ 1: t }) => ({
    "&>:not([hidden])~:not([hidden])": {
      [`--tw-space-${t}-reverse`]: "1"
    }
  })),
  /* SIZING */
  // Width
  p("w-", "width"),
  // Min-Width
  p("min-w-", "minWidth"),
  // Max-Width
  p("max-w-", "maxWidth"),
  // Height
  p("h-", "height"),
  // Min-Height
  p("min-h-", "minHeight"),
  // Max-Height
  p("max-h-", "maxHeight"),
  /* TYPOGRAPHY */
  // Font Weight
  p("font-", "fontWeight"),
  // Font Family
  p("font-", "fontFamily", ({ _: t }) => typeof (t = $(t))[1] == "string" ? {
    fontFamily: z(t)
  } : {
    fontFamily: z(t[0]),
    ...t[1]
  }),
  // Font Smoothing
  d("antialiased", {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale"
  }),
  d("subpixel-antialiased", {
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto"
  }),
  // Font Style
  d("italic", "fontStyle"),
  d("not-italic", {
    fontStyle: "normal"
  }),
  // Font Variant Numeric
  d("(ordinal|slashed-zero|(normal|lining|oldstyle|proportional|tabular)-nums|(diagonal|stacked)-fractions)", ({ 1: t, 2: e = "", 3: r }) => (
    // normal-nums
    e == "normal" ? {
      fontVariantNumeric: "normal"
    } : {
      ["--tw-" + (r ? (
        // diagonal-fractions, stacked-fractions
        "numeric-fraction"
      ) : "pt".includes(e[0]) ? (
        // proportional-nums, tabular-nums
        "numeric-spacing"
      ) : e ? (
        // lining-nums, oldstyle-nums
        "numeric-figure"
      ) : (
        // ordinal, slashed-zero
        t
      ))]: t,
      fontVariantNumeric: "var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)",
      ...V({
        "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-numeric-spacing": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)"
      })
    }
  )),
  // Letter Spacing
  p("tracking-", "letterSpacing"),
  // Line Height
  p("leading-", "lineHeight"),
  // List Style Position
  d("list-(inside|outside)", "listStylePosition"),
  // List Style Type
  p("list-", "listStyleType"),
  d("list-", "listStyleType"),
  // Placeholder Opacity
  p("placeholder-opacity-", "placeholderOpacity", ({ _: t }) => ({
    "&::placeholder": {
      "--tw-placeholder-opacity": t
    }
  })),
  // Placeholder Color
  k("placeholder-", {
    property: "color",
    selector: "&::placeholder"
  }),
  // Text Alignment
  d("text-(left|center|right|justify|start|end)", "textAlign"),
  d("text-(ellipsis|clip)", "textOverflow"),
  // Text Opacity
  p("text-opacity-", "textOpacity", "--tw-text-opacity"),
  // Text Color
  k("text-", {
    property: "color"
  }),
  // Font Size
  p("text-", "fontSize", ({ _: t }) => typeof t == "string" ? {
    fontSize: t
  } : {
    fontSize: t[0],
    ...typeof t[1] == "string" ? {
      lineHeight: t[1]
    } : t[1]
  }),
  // Text Indent
  p("indent-", "textIndent"),
  // Text Decoration
  d("(overline|underline|line-through)", "textDecorationLine"),
  d("no-underline", {
    textDecorationLine: "none"
  }),
  // Text Underline offset
  p("underline-offset-", "textUnderlineOffset"),
  // Text Decoration Color
  k("decoration-", {
    section: "textDecorationColor",
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Text Decoration Thickness
  p("decoration-", "textDecorationThickness"),
  // Text Decoration Style
  d("decoration-", "textDecorationStyle"),
  // Text Transform
  d("(uppercase|lowercase|capitalize)", "textTransform"),
  d("normal-case", {
    textTransform: "none"
  }),
  // Text Overflow
  d("truncate", {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }),
  // Vertical Alignment
  d("align-", "verticalAlign"),
  // Whitespace
  d("whitespace-", "whiteSpace"),
  // Word Break
  d("break-normal", {
    wordBreak: "normal",
    overflowWrap: "normal"
  }),
  d("break-words", {
    overflowWrap: "break-word"
  }),
  d("break-all", {
    wordBreak: "break-all"
  }),
  d("break-keep", {
    wordBreak: "keep-all"
  }),
  // Caret Color
  k("caret-", {
    // section: 'caretColor',
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Accent Color
  k("accent-", {
    // section: 'accentColor',
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Gradient Color Stops
  d("bg-gradient-to-([trbl]|[tb][rl])", "backgroundImage", ({ 1: t }) => `linear-gradient(to ${Z(t, " ")},var(--tw-gradient-stops))`),
  k("from-", {
    section: "gradientColorStops",
    opacityVariable: !1,
    opacitySection: "opacity"
  }, ({ _: t }) => ({
    "--tw-gradient-from": t.value,
    "--tw-gradient-to": t.color({
      opacityValue: "0"
    }),
    "--tw-gradient-stops": "var(--tw-gradient-from),var(--tw-gradient-to)"
  })),
  k("via-", {
    section: "gradientColorStops",
    opacityVariable: !1,
    opacitySection: "opacity"
  }, ({ _: t }) => ({
    "--tw-gradient-to": t.color({
      opacityValue: "0"
    }),
    "--tw-gradient-stops": `var(--tw-gradient-from),${t.value},var(--tw-gradient-to)`
  })),
  k("to-", {
    section: "gradientColorStops",
    property: "--tw-gradient-to",
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  /* BACKGROUNDS */
  // Background Attachment
  d("bg-(fixed|local|scroll)", "backgroundAttachment"),
  // Background Origin
  d("bg-origin-(border|padding|content)", "backgroundOrigin", ({ 1: t }) => t + "-box"),
  // Background Repeat
  d([
    "bg-(no-repeat|repeat(-[xy])?)",
    "bg-repeat-(round|space)"
  ], "backgroundRepeat"),
  // Background Blend Mode
  d("bg-blend-", "backgroundBlendMode"),
  // Background Clip
  d("bg-clip-(border|padding|content|text)", "backgroundClip", ({ 1: t }) => t + (t == "text" ? "" : "-box")),
  // Background Opacity
  p("bg-opacity-", "backgroundOpacity", "--tw-bg-opacity"),
  // Background Color
  // bg-${backgroundColor}/${backgroundOpacity}
  k("bg-", {
    section: "backgroundColor"
  }),
  // Background Image
  // supported arbitrary types are: length, color, angle, list
  p("bg-", "backgroundImage"),
  // Background Position
  p("bg-", "backgroundPosition"),
  d("bg-(top|bottom|center|(left|right)(-(top|bottom))?)", "backgroundPosition", _e),
  // Background Size
  p("bg-", "backgroundSize"),
  /* BORDERS */
  // Border Radius
  p("rounded(?:$|-)", "borderRadius"),
  p("rounded-([trbl]|[tb][rl])(?:$|-)", "borderRadius", ({ 1: t, _: e }) => {
    let r = {
      t: [
        "tl",
        "tr"
      ],
      r: [
        "tr",
        "br"
      ],
      b: [
        "bl",
        "br"
      ],
      l: [
        "bl",
        "tl"
      ]
    }[t] || [
      t,
      t
    ];
    return {
      [`border-${Z(r[0])}-radius`]: e,
      [`border-${Z(r[1])}-radius`]: e
    };
  }),
  // Border Collapse
  d("border-(collapse|separate)", "borderCollapse"),
  // Border Opacity
  p("border-opacity(?:$|-)", "borderOpacity", "--tw-border-opacity"),
  // Border Style
  d("border-(solid|dashed|dotted|double|none)", "borderStyle"),
  // Border Spacing
  p("border-spacing(-[xy])?(?:$|-)", "borderSpacing", ({ 1: t, _: e }) => ({
    ...V({
      "--tw-border-spacing-x": "0",
      "--tw-border-spacing-y": "0"
    }),
    ["--tw-border-spacing" + (t || "-x")]: e,
    ["--tw-border-spacing" + (t || "-y")]: e,
    "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
  })),
  // Border Color
  k("border-([xytrbl])-", {
    section: "borderColor"
  }, re("border", "Color")),
  k("border-"),
  // Border Width
  p("border-([xytrbl])(?:$|-)", "borderWidth", re("border", "Width")),
  p("border(?:$|-)", "borderWidth"),
  // Divide Opacity
  p("divide-opacity(?:$|-)", "divideOpacity", ({ _: t }) => ({
    "&>:not([hidden])~:not([hidden])": {
      "--tw-divide-opacity": t
    }
  })),
  // Divide Style
  d("divide-(solid|dashed|dotted|double|none)", ({ 1: t }) => ({
    "&>:not([hidden])~:not([hidden])": {
      borderStyle: t
    }
  })),
  // Divide Width
  d("divide-([xy]-reverse)", ({ 1: t }) => ({
    "&>:not([hidden])~:not([hidden])": {
      ["--tw-divide-" + t]: "1"
    }
  })),
  p("divide-([xy])(?:$|-)", "divideWidth", ({ 1: t, _: e }) => {
    let r = {
      x: "lr",
      y: "tb"
    }[t];
    return {
      "&>:not([hidden])~:not([hidden])": {
        [`--tw-divide-${t}-reverse`]: "0",
        [`border-${Z(r[0])}Width`]: `calc(${e} * calc(1 - var(--tw-divide-${t}-reverse)))`,
        [`border-${Z(r[1])}Width`]: `calc(${e} * var(--tw-divide-${t}-reverse))`
      }
    };
  }),
  // Divide Color
  k("divide-", {
    // section: $0.replace('-', 'Color') -> 'divideColor'
    property: "borderColor",
    // opacityVariable: '--tw-border-opacity',
    // opacitySection: section.replace('Color', 'Opacity') -> 'divideOpacity'
    selector: "&>:not([hidden])~:not([hidden])"
  }),
  // Ring Offset Opacity
  p("ring-opacity(?:$|-)", "ringOpacity", "--tw-ring-opacity"),
  // Ring Offset Color
  k("ring-offset-", {
    // section: 'ringOffsetColor',
    property: "--tw-ring-offset-color",
    opacityVariable: !1
  }),
  // opacitySection: section.replace('Color', 'Opacity') -> 'ringOffsetOpacity'
  // Ring Offset Width
  p("ring-offset(?:$|-)", "ringOffsetWidth", "--tw-ring-offset-width"),
  // Ring Inset
  d("ring-inset", {
    "--tw-ring-inset": "inset"
  }),
  // Ring Color
  k("ring-", {
    // section: 'ringColor',
    property: "--tw-ring-color"
  }),
  // opacityVariable: '--tw-ring-opacity',
  // opacitySection: section.replace('Color', 'Opacity') -> 'ringOpacity'
  // Ring Width
  p("ring(?:$|-)", "ringWidth", ({ _: t }, { theme: e }) => ({
    ...V({
      "--tw-ring-offset-shadow": "0 0 #0000",
      "--tw-ring-shadow": "0 0 #0000",
      "--tw-shadow": "0 0 #0000",
      "--tw-shadow-colored": "0 0 #0000",
      // Within own declaration to have the defaults above to be merged with defaults from shadow
      "&": {
        "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-ring-offset-width": e("ringOffsetWidth", "", "0px"),
        "--tw-ring-offset-color": B(e("ringOffsetColor", "", "#fff")),
        "--tw-ring-color": B(e("ringColor", "", "#93c5fd"), {
          opacityVariable: "--tw-ring-opacity"
        }),
        "--tw-ring-opacity": e("ringOpacity", "", "0.5")
      }
    }),
    "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
    "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(${t} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
    boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)"
  })),
  /* EFFECTS */
  // Box Shadow Color
  k("shadow-", {
    section: "boxShadowColor",
    opacityVariable: !1,
    opacitySection: "opacity"
  }, ({ _: t }) => ({
    "--tw-shadow-color": t.value,
    "--tw-shadow": "var(--tw-shadow-colored)"
  })),
  // Box Shadow
  p("shadow(?:$|-)", "boxShadow", ({ _: t }) => ({
    ...V({
      "--tw-ring-offset-shadow": "0 0 #0000",
      "--tw-ring-shadow": "0 0 #0000",
      "--tw-shadow": "0 0 #0000",
      "--tw-shadow-colored": "0 0 #0000"
    }),
    "--tw-shadow": z(t),
    // replace all colors with reference to --tw-shadow-colored
    // this matches colors after non-comma char (keyword, offset) before comma or the end
    "--tw-shadow-colored": z(t).replace(/([^,]\s+)(?:#[a-f\d]+|(?:(?:hsl|rgb)a?|hwb|lab|lch|color|var)\(.+?\)|[a-z]+)(,|$)/g, "$1var(--tw-shadow-color)$2"),
    boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)"
  })),
  // Opacity
  p("(opacity)-"),
  /*, 'opacity' */
  // Mix Blend Mode
  d("mix-blend-", "mixBlendMode"),
  /* FILTERS */
  ...zt(),
  ...zt("backdrop-"),
  /* TRANSITIONS AND ANIMATION */
  // Transition Property
  p("transition(?:$|-)", "transitionProperty", (t, { theme: e }) => ({
    transitionProperty: z(t),
    transitionTimingFunction: t._ == "none" ? void 0 : z(e("transitionTimingFunction", "")),
    transitionDuration: t._ == "none" ? void 0 : z(e("transitionDuration", ""))
  })),
  // Transition Duration
  p("duration(?:$|-)", "transitionDuration", "transitionDuration", z),
  // Transition Timing Function
  p("ease(?:$|-)", "transitionTimingFunction", "transitionTimingFunction", z),
  // Transition Delay
  p("delay(?:$|-)", "transitionDelay", "transitionDelay", z),
  p("animate(?:$|-)", "animation", (t, { theme: e, h: r, e: i }) => {
    let o = z(t), n = o.split(" "), s = e("keyframes", n[0]);
    return s ? {
      ["@keyframes " + (n[0] = i(r(n[0])))]: s,
      animation: n.join(" ")
    } : {
      animation: o
    };
  }),
  /* TRANSFORMS */
  // Transform
  "(transform)-(none)",
  d("transform", Xe),
  d("transform-(cpu|gpu)", ({ 1: t }) => ({
    "--tw-transform": ar(t == "gpu")
  })),
  // Scale
  p("scale(-[xy])?-", "scale", ({ 1: t, _: e }) => ({
    ["--tw-scale" + (t || "-x")]: e,
    ["--tw-scale" + (t || "-y")]: e,
    ...Xe()
  })),
  // Rotate
  p("-?(rotate)-", "rotate", Ne),
  // Translate
  p("-?(translate-[xy])-", "translate", Ne),
  // Skew
  p("-?(skew-[xy])-", "skew", Ne),
  // Transform Origin
  d("origin-(center|((top|bottom)(-(left|right))?)|left|right)", "transformOrigin", _e),
  /* INTERACTIVITY */
  // Appearance
  "(appearance)-",
  // Columns
  p("(columns)-"),
  /*, 'columns' */
  "(columns)-(\\d+)",
  // Break Before, After and Inside
  "(break-(?:before|after|inside))-",
  // Cursor
  p("(cursor)-"),
  /*, 'cursor' */
  "(cursor)-",
  // Scroll Snap Type
  d("snap-(none)", "scroll-snap-type"),
  d("snap-(x|y|both)", ({ 1: t }) => ({
    ...V({
      "--tw-scroll-snap-strictness": "proximity"
    }),
    "scroll-snap-type": t + " var(--tw-scroll-snap-strictness)"
  })),
  d("snap-(mandatory|proximity)", "--tw-scroll-snap-strictness"),
  // Scroll Snap Align
  d("snap-(?:(start|end|center)|align-(none))", "scroll-snap-align"),
  // Scroll Snap Stop
  d("snap-(normal|always)", "scroll-snap-stop"),
  d("scroll-(auto|smooth)", "scroll-behavior"),
  // Scroll Margin
  // Padding
  p("scroll-p([xytrbl])?(?:$|-)", "padding", re("scroll-padding")),
  // Margin
  p("-?scroll-m([xytrbl])?(?:$|-)", "scroll-margin", re("scroll-margin")),
  // Touch Action
  d("touch-(auto|none|manipulation)", "touch-action"),
  d("touch-(pinch-zoom|pan-(?:(x|left|right)|(y|up|down)))", ({ 1: t, 2: e, 3: r }) => ({
    ...V({
      "--tw-pan-x": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-pan-y": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-pinch-zoom": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-touch-action": "var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)"
    }),
    // x, left, right -> pan-x
    // y, up, down -> pan-y
    // -> pinch-zoom
    [`--tw-${e ? "pan-x" : r ? "pan-y" : t}`]: t,
    "touch-action": "var(--tw-touch-action)"
  })),
  // Outline Style
  d("outline-none", {
    outline: "2px solid transparent",
    "outline-offset": "2px"
  }),
  d("outline", {
    outlineStyle: "solid"
  }),
  d("outline-(dashed|dotted|double)", "outlineStyle"),
  // Outline Offset
  p("-?(outline-offset)-"),
  /*, 'outlineOffset'*/
  // Outline Color
  k("outline-", {
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Outline Width
  p("outline-", "outlineWidth"),
  // Pointer Events
  "(pointer-events)-",
  // Will Change
  p("(will-change)-"),
  /*, 'willChange' */
  "(will-change)-",
  // Resize
  [
    "resize(?:-(none|x|y))?",
    "resize",
    ({ 1: t }) => ({
      x: "horizontal",
      y: "vertical"
    })[t] || t || "both"
  ],
  // User Select
  d("select-(none|text|all|auto)", "userSelect"),
  /* SVG */
  // Fill, Stroke
  k("fill-", {
    section: "fill",
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  k("stroke-", {
    section: "stroke",
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Stroke Width
  p("stroke-", "strokeWidth"),
  /* ACCESSIBILITY */
  // Screen Readers
  d("sr-only", {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    clip: "rect(0,0,0,0)",
    borderWidth: "0"
  }),
  d("not-sr-only", {
    position: "static",
    width: "auto",
    height: "auto",
    padding: "0",
    margin: "0",
    overflow: "visible",
    whiteSpace: "normal",
    clip: "auto"
  })
];
function _e(t) {
  return (typeof t == "string" ? t : t[1]).replace(/-/g, " ").trim();
}
function Rt(t) {
  return (typeof t == "string" ? t : t[1]).replace("col", "column");
}
function Z(t, e = "-") {
  let r = [];
  for (let i of t) r.push({
    t: "top",
    r: "right",
    b: "bottom",
    l: "left"
  }[i]);
  return r.join(e);
}
function z(t) {
  return t && "" + (t._ || t);
}
function jt({ $$: t }) {
  return ({
    // /* aut*/ o: '',
    /* sta*/
    r: (
      /*t*/
      "flex-"
    ),
    /* end*/
    "": "flex-",
    // /* cen*/ t /*er*/: '',
    /* bet*/
    w: (
      /*een*/
      "space-"
    ),
    /* aro*/
    u: (
      /*nd*/
      "space-"
    ),
    /* eve*/
    n: (
      /*ly*/
      "space-"
    )
  }[t[3] || ""] || "") + t;
}
function re(t, e = "") {
  return ({ 1: r, _: i }) => {
    let o = {
      x: "lr",
      y: "tb"
    }[r] || r + r;
    return o ? {
      ...Ae(t + "-" + Z(o[0]) + e, i),
      ...Ae(t + "-" + Z(o[1]) + e, i)
    } : Ae(t + e, i);
  };
}
function zt(t = "") {
  let e = [
    "blur",
    "brightness",
    "contrast",
    "grayscale",
    "hue-rotate",
    "invert",
    t && "opacity",
    "saturate",
    "sepia",
    !t && "drop-shadow"
  ].filter(Boolean), r = {};
  for (let i of e) r[`--tw-${t}${i}`] = "var(--tw-empty,/*!*/ /*!*/)";
  return r = {
    // move defaults
    ...V(r),
    // add default filter which allows standalone usage
    [`${t}filter`]: e.map((i) => `var(--tw-${t}${i})`).join(" ")
  }, [
    `(${t}filter)-(none)`,
    d(`${t}filter`, r),
    ...e.map((i) => p(
      // hue-rotate can be negated
      `${i[0] == "h" ? "-?" : ""}(${t}${i})(?:$|-)`,
      i,
      ({ 1: o, _: n }) => ({
        [`--tw-${o}`]: $(n).map((s) => `${i}(${s})`).join(" "),
        ...r
      })
    ))
  ];
}
function Ne({ 1: t, _: e }) {
  return {
    ["--tw-" + t]: e,
    ...Xe()
  };
}
function Xe() {
  return {
    ...V({
      "--tw-translate-x": "0",
      "--tw-translate-y": "0",
      "--tw-rotate": "0",
      "--tw-skew-x": "0",
      "--tw-skew-y": "0",
      "--tw-scale-x": "1",
      "--tw-scale-y": "1",
      "--tw-transform": ar()
    }),
    transform: "var(--tw-transform)"
  };
}
function ar(t) {
  return [
    t ? (
      // -gpu
      "translate3d(var(--tw-translate-x),var(--tw-translate-y),0)"
    ) : "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))",
    "rotate(var(--tw-rotate))",
    "skewX(var(--tw-skew-x))",
    "skewY(var(--tw-skew-y))",
    "scaleX(var(--tw-scale-x))",
    "scaleY(var(--tw-scale-y))"
  ].join(" ");
}
function Lt({ 1: t, 2: e }) {
  return `${t} ${e} / ${t} ${e}`;
}
function Ut({ 1: t }) {
  return `repeat(${t},minmax(0,1fr))`;
}
function V(t) {
  return {
    "@layer defaults": {
      "*,::before,::after": t,
      "::backdrop": t
    }
  };
}
let _i = [
  [
    "sticky",
    "@supports ((position: -webkit-sticky) or (position:sticky))"
  ],
  [
    "motion-reduce",
    "@media (prefers-reduced-motion:reduce)"
  ],
  [
    "motion-safe",
    "@media (prefers-reduced-motion:no-preference)"
  ],
  [
    "print",
    "@media print"
  ],
  [
    "(portrait|landscape)",
    ({ 1: t }) => `@media (orientation:${t})`
  ],
  [
    "contrast-(more|less)",
    ({ 1: t }) => `@media (prefers-contrast:${t})`
  ],
  [
    "(first-(letter|line)|placeholder|backdrop|before|after)",
    ({ 1: t }) => `&::${t}`
  ],
  [
    "(marker|selection)",
    ({ 1: t }) => `& *::${t},&::${t}`
  ],
  [
    "file",
    "&::file-selector-button"
  ],
  [
    "(first|last|only)",
    ({ 1: t }) => `&:${t}-child`
  ],
  [
    "even",
    "&:nth-child(2n)"
  ],
  [
    "odd",
    "&:nth-child(odd)"
  ],
  [
    "open",
    "&[open]"
  ],
  // All other pseudo classes are already supported by twind
  [
    "(aria|data)-",
    ({
      1: t,
      /* aria or data */
      $$: e
    }, r) => e && `&[${t}-${// aria-asc or data-checked -> from theme
    r.theme(t, e) || // aria-[...] or data-[...]
    q(e, "", r) || // default handling
    `${e}="true"`}]`
  ],
  /* Styling based on parent and peer state */
  // Groups classes like: group-focus and group-hover
  // these need to add a marker selector with the pseudo class
  // => '.group:focus .group-focus:selector'
  [
    "((group|peer)(~[^-[]+)?)(-\\[(.+)]|[-[].+?)(\\/.+)?",
    ({ 2: t, 3: e = "", 4: r, 5: i = "", 6: o = e }, { e: n, h: s, v: l }) => {
      let a = ve(i) || (r[0] == "[" ? r : l(r.slice(1)));
      return `${(a.includes("&") ? a : "&" + a).replace(/&/g, `:merge(.${n(s(t + o))})`)}${t[0] == "p" ? "~" : " "}&`;
    }
  ],
  // direction variants
  [
    "(ltr|rtl)",
    ({ 1: t }) => `[dir="${t}"] &`
  ],
  [
    "supports-",
    ({ $$: t }, e) => {
      if (t && (t = e.theme("supports", t) || q(t, "", e)), t) return t.includes(":") || (t += ":var(--tw)"), /^\w*\s*\(/.test(t) || (t = `(${t})`), // Chrome has a bug where `(condtion1)or(condition2)` is not valid
      // But `(condition1) or (condition2)` is supported.
      `@supports ${t.replace(/\b(and|or|not)\b/g, " $1 ").trim()}`;
    }
  ],
  [
    "max-",
    ({ $$: t }, e) => {
      if (t && (t = e.theme("screens", t) || q(t, "", e)), typeof t == "string") return `@media not all and (min-width:${t})`;
    }
  ],
  [
    "min-",
    ({ $$: t }, e) => (t && (t = q(t, "", e)), t && `@media (min-width:${t})`)
  ],
  // Arbitrary variants
  [
    /^\[(.+)]$/,
    ({ 1: t }) => /[&@]/.test(t) && ve(t).replace(/[}]+$/, "").split("{")
  ]
];
function Si({ colors: t, disablePreflight: e } = {}) {
  return {
    // allow other preflight to run
    preflight: e ? void 0 : xi,
    theme: {
      ...Ze,
      colors: {
        inherit: "inherit",
        current: "currentColor",
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        ...t
      }
    },
    variants: _i,
    rules: $i,
    finalize(r) {
      return (
        // automatically add `content: ''` to before and after so you don’t have to specify it unless you want a different value
        // ignore global, preflight, and auto added rules
        r.n && // only if there are declarations
        r.d && // and it has a ::before or ::after selector
        r.r.some((i) => /^&::(before|after)$/.test(i)) && // there is no content property yet
        !/(^|;)content:/.test(r.d) ? {
          ...r,
          d: "content:var(--tw-content);" + r.d
        } : r
      );
    }
  };
}
let ki = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a"
}, Ai = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827"
}, Ci = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b"
}, Ei = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717"
}, Fi = {
  50: "#fafaf9",
  100: "#f5f5f4",
  200: "#e7e5e4",
  300: "#d6d3d1",
  400: "#a8a29e",
  500: "#78716c",
  600: "#57534e",
  700: "#44403c",
  800: "#292524",
  900: "#1c1917"
}, Oi = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d"
}, Ti = {
  50: "#fff7ed",
  100: "#ffedd5",
  200: "#fed7aa",
  300: "#fdba74",
  400: "#fb923c",
  500: "#f97316",
  600: "#ea580c",
  700: "#c2410c",
  800: "#9a3412",
  900: "#7c2d12"
}, Mi = {
  50: "#fffbeb",
  100: "#fef3c7",
  200: "#fde68a",
  300: "#fcd34d",
  400: "#fbbf24",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
  800: "#92400e",
  900: "#78350f"
}, Pi = {
  50: "#fefce8",
  100: "#fef9c3",
  200: "#fef08a",
  300: "#fde047",
  400: "#facc15",
  500: "#eab308",
  600: "#ca8a04",
  700: "#a16207",
  800: "#854d0e",
  900: "#713f12"
}, Ri = {
  50: "#f7fee7",
  100: "#ecfccb",
  200: "#d9f99d",
  300: "#bef264",
  400: "#a3e635",
  500: "#84cc16",
  600: "#65a30d",
  700: "#4d7c0f",
  800: "#3f6212",
  900: "#365314"
}, ji = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d"
}, zi = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  300: "#6ee7b7",
  400: "#34d399",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b"
}, Li = {
  50: "#f0fdfa",
  100: "#ccfbf1",
  200: "#99f6e4",
  300: "#5eead4",
  400: "#2dd4bf",
  500: "#14b8a6",
  600: "#0d9488",
  700: "#0f766e",
  800: "#115e59",
  900: "#134e4a"
}, Ui = {
  50: "#ecfeff",
  100: "#cffafe",
  200: "#a5f3fc",
  300: "#67e8f9",
  400: "#22d3ee",
  500: "#06b6d4",
  600: "#0891b2",
  700: "#0e7490",
  800: "#155e75",
  900: "#164e63"
}, Di = {
  50: "#f0f9ff",
  100: "#e0f2fe",
  200: "#bae6fd",
  300: "#7dd3fc",
  400: "#38bdf8",
  500: "#0ea5e9",
  600: "#0284c7",
  700: "#0369a1",
  800: "#075985",
  900: "#0c4a6e"
}, Hi = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a"
}, Wi = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81"
}, Ii = {
  50: "#f5f3ff",
  100: "#ede9fe",
  200: "#ddd6fe",
  300: "#c4b5fd",
  400: "#a78bfa",
  500: "#8b5cf6",
  600: "#7c3aed",
  700: "#6d28d9",
  800: "#5b21b6",
  900: "#4c1d95"
}, Vi = {
  50: "#faf5ff",
  100: "#f3e8ff",
  200: "#e9d5ff",
  300: "#d8b4fe",
  400: "#c084fc",
  500: "#a855f7",
  600: "#9333ea",
  700: "#7e22ce",
  800: "#6b21a8",
  900: "#581c87"
}, Ni = {
  50: "#fdf4ff",
  100: "#fae8ff",
  200: "#f5d0fe",
  300: "#f0abfc",
  400: "#e879f9",
  500: "#d946ef",
  600: "#c026d3",
  700: "#a21caf",
  800: "#86198f",
  900: "#701a75"
}, Bi = {
  50: "#fdf2f8",
  100: "#fce7f3",
  200: "#fbcfe8",
  300: "#f9a8d4",
  400: "#f472b6",
  500: "#ec4899",
  600: "#db2777",
  700: "#be185d",
  800: "#9d174d",
  900: "#831843"
}, qi = {
  50: "#fff1f2",
  100: "#ffe4e6",
  200: "#fecdd3",
  300: "#fda4af",
  400: "#fb7185",
  500: "#f43f5e",
  600: "#e11d48",
  700: "#be123c",
  800: "#9f1239",
  900: "#881337"
}, Qi = {
  __proto__: null,
  slate: ki,
  gray: Ai,
  zinc: Ci,
  neutral: Ei,
  stone: Fi,
  red: Oi,
  orange: Ti,
  amber: Mi,
  yellow: Pi,
  lime: Ri,
  green: ji,
  emerald: zi,
  teal: Li,
  cyan: Ui,
  sky: Di,
  blue: Hi,
  indigo: Wi,
  violet: Ii,
  purple: Vi,
  fuchsia: Ni,
  pink: Bi,
  rose: qi
};
function Gi({ disablePreflight: t } = {}) {
  return Si({
    colors: Qi,
    disablePreflight: t
  });
}
const lr = or({
  presets: [wi(), Gi()],
  // Enhanced theme configuration with light/dark variants
  theme: {
    extend: {
      colors: {
        // Filter component specific colors
        filter: {
          // Light theme colors
          light: {
            bg: "#ffffff",
            text: "#374151",
            border: "#d1d5db",
            shadow: "rgba(0, 0, 0, 0.1)",
            hover: "#f9fafb",
            active: "#f3f4f6"
          },
          // Dark theme colors
          dark: {
            bg: "#1f2937",
            text: "#f9fafb",
            border: "#374151",
            shadow: "rgba(0, 0, 0, 0.3)",
            hover: "#374151",
            active: "#4b5563"
          }
        },
        // Icon state colors
        icon: {
          default: "#6b7280",
          active: "#3b82f6",
          filtered: "#ef4444",
          disabled: "#9ca3af",
          badge: "#dc2626"
        }
      },
      // Custom shadows for popover
      boxShadow: {
        popover: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "popover-dark": "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
      },
      // Custom spacing for consistent gaps
      spacing: {
        "popover-offset": "0.5rem",
        "caret-size": "0.375rem"
      },
      // Custom z-index values
      zIndex: {
        popover: "50",
        "popover-arrow": "51"
      },
      // Animation timings
      transitionDuration: {
        popover: "150ms"
      }
    }
  },
  // Custom rules for component-specific styles
  rules: [
    // Filter button icon states
    ["filter-icon-default", { color: "var(--icon-default, #6b7280)" }],
    ["filter-icon-active", { color: "var(--icon-active, #3b82f6)" }],
    ["filter-icon-filtered", { color: "var(--icon-filtered, #ef4444)" }],
    ["filter-icon-disabled", { color: "var(--icon-disabled, #9ca3af)" }],
    // Popover arrow caret
    ["popover-arrow", {
      position: "absolute",
      top: "-6px",
      right: "16px",
      width: "12px",
      height: "12px",
      transform: "rotate(45deg)",
      backgroundColor: "var(--popover-bg, #ffffff)",
      border: "1px solid var(--popover-border, #d1d5db)",
      borderRight: "none",
      borderBottom: "none",
      zIndex: "var(--popover-arrow-z, 51)"
    }],
    // Enhanced popover shadow
    ["popover-shadow-enhanced", {
      boxShadow: "var(--popover-shadow, 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05))"
    }],
    // Badge indicator for active filters
    ["filter-badge", {
      position: "absolute",
      top: "-4px",
      right: "-4px",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "var(--badge-color, #dc2626)",
      border: "2px solid var(--badge-border, #ffffff)"
    }],
    // Light theme variables
    ["theme-light", {
      "--popover-bg": "#ffffff",
      "--popover-border": "#d1d5db",
      "--popover-shadow": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      "--icon-default": "#6b7280",
      "--icon-active": "#3b82f6",
      "--icon-filtered": "#ef4444",
      "--icon-disabled": "#9ca3af",
      "--badge-color": "#dc2626",
      "--badge-border": "#ffffff",
      "--text-primary": "#111827",
      "--text-secondary": "#6b7280",
      "--bg-primary": "#ffffff",
      "--bg-secondary": "#f9fafb",
      "--bg-hover": "#f3f4f6",
      "--border-primary": "#d1d5db"
    }],
    // Dark theme variables
    ["theme-dark", {
      "--popover-bg": "#1f2937",
      "--popover-border": "#374151",
      "--popover-shadow": "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
      "--icon-default": "#9ca3af",
      "--icon-active": "#60a5fa",
      "--icon-filtered": "#f87171",
      "--icon-disabled": "#6b7280",
      "--badge-color": "#ef4444",
      "--badge-border": "#1f2937",
      "--text-primary": "#f9fafb",
      "--text-secondary": "#d1d5db",
      "--bg-primary": "#1f2937",
      "--bg-secondary": "#374151",
      "--bg-hover": "#4b5563",
      "--border-primary": "#374151"
    }]
  ]
}), Ji = sr(lr);
function Yi({ ignoreValue: t = !1 }) {
  const e = Jr(() => {
    this.dispatchEvent(new CustomEvent("on-click", {
      detail: { message: "Hello from child" },
      bubbles: !0,
      composed: !1
    }));
  }, []), [r, i] = Zr(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  return Br(() => {
    const o = window.matchMedia("(prefers-color-scheme: dark)"), n = (s) => i(s.matches);
    return o.addEventListener("change", n), () => o.removeEventListener("change", n);
  }, []), L`
    <button 
      class="bg-none border rounded p-1 flex items-center justify-center w-6 h-6 transition-all duration-200 ${t ? r ? "bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/30" : "bg-red-100 border-red-400 text-red-600 hover:bg-red-200" : r ? "border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-gray-500 hover:text-gray-300" : "border-gray-400 text-gray-600 hover:bg-gray-100 hover:border-gray-500 hover:text-gray-700"}"
      @click=${e}
      title="${t ? "Enable filtering" : "Ignore category"}"
      style="${t ? "background-color: var(--toggle-active-bg, #fef2f2); border-color: var(--toggle-active-border, #fca5a5); color: var(--toggle-active-text, #dc2626);" : "background-color: var(--toggle-bg, transparent); border-color: var(--toggle-border, #9ca3af); color: var(--toggle-text, #6b7280);"}"
    >
      ${t ? L`
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
          <path d="M3 13C6.6 5 17.4 5 21 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      ` : L`
        <svg class="w-3.5 h-3.5" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
          <path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `}
    </button>
  `;
}
const Zi = Ji(Kr(Yi, { observedAttributes: ["ignoreValue"] }));
customElements.define("v1-filter-in-toggle", Zi);
class Xi {
  constructor() {
    this.state = {
      categories: [],
      activeFilters: {}
    };
  }
  formatLabel(e) {
    return e.split("-").map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ");
  }
  /**
   * Parse filter attribute value into consistent format
   */
  parseFilterAttribute(e) {
    try {
      const r = JSON.parse(e), i = {};
      return Object.entries(r).forEach(([o, n]) => {
        const s = o.toLowerCase(), l = Array.isArray(n) ? n : [n];
        i[s] = l.map((a) => String(a).toLowerCase()).filter((a) => a.length > 0);
      }), i;
    } catch {
      return { category: e.split(/[,;\s]+/).map((o) => o.trim().toLowerCase()).filter((o) => o.length > 0) };
    }
  }
  /**
   * Initialize filter categories from parsed content
   */
  initializeFromContent(e) {
    const r = /* @__PURE__ */ new Map();
    e.forEach((n) => {
      Object.entries(n).forEach(([s, l]) => {
        r.has(s) || r.set(s, /* @__PURE__ */ new Set()), l.forEach((a) => {
          r.get(s).add(a);
        });
      });
    });
    const i = Array.from(r.entries()).map(([n, s]) => ({
      name: n,
      label: this.formatLabel(n),
      ignored: !1,
      // Start with all categories not ignored
      options: Array.from(s).sort().map((l) => ({
        value: l,
        label: this.formatLabel(l),
        active: !1
        // Start with no filters active
      }))
    })).sort((n, s) => n.label.localeCompare(s.label)), o = {};
    return i.forEach((n) => {
      o[n.name] = [];
    }), this.state = { categories: i, activeFilters: o }, this.getState();
  }
  /**
   * Handle filter toggle
   */
  toggleFilter(e) {
    const { categoryName: r, filterValue: i, isActive: o } = e;
    return this.state.activeFilters[r] || (this.state.activeFilters[r] = []), o ? this.state.activeFilters[r].includes(i) || (this.state.activeFilters[r] = [...this.state.activeFilters[r], i]) : this.state.activeFilters[r] = this.state.activeFilters[r].filter((n) => n !== i), this.state.categories = this.state.categories.map((n) => ({
      ...n,
      options: n.options.map((s) => ({
        ...s,
        active: this.state.activeFilters[n.name]?.includes(s.value) || !1
      }))
    })), this.getState();
  }
  /**
   * Evaluate if an element should be shown based on its filters
   */
  evaluateElement(e) {
    if (!Object.values(this.state.activeFilters).some((s) => s.length > 0))
      return {
        shouldShow: !0,
        matchedCategories: [],
        unmatchedCategories: []
      };
    const i = [], o = [];
    return {
      shouldShow: Object.entries(this.state.activeFilters).every(([s, l]) => {
        if (this.state.categories.find((h) => h.name === s)?.ignored || !l || l.length === 0)
          return !0;
        const c = e[s];
        if (!c || c.length === 0)
          return o.push(s), !1;
        const u = c.some((h) => l.includes(h));
        return u ? i.push(s) : o.push(s), u;
      }),
      matchedCategories: i,
      unmatchedCategories: o
    };
  }
  /**
   * Check if an element without filters should be shown
   */
  evaluateElementWithoutFilters() {
    return !Object.values(this.state.activeFilters).some((r) => r.length > 0);
  }
  /**
   * Get current state (immutable copy)
   */
  getState() {
    return {
      categories: this.state.categories.map((e) => ({
        ...e,
        options: e.options.map((r) => ({ ...r }))
      })),
      activeFilters: Object.fromEntries(
        Object.entries(this.state.activeFilters).map(([e, r]) => [e, [...r]])
      )
    };
  }
  /**
   * Get statistics about current filter state
   */
  getStats() {
    const e = this.state.categories.length, r = this.state.categories.reduce((n, s) => n + s.options.length, 0), i = Object.values(this.state.activeFilters).reduce((n, s) => n + s.length, 0), o = Object.values(this.state.activeFilters).filter((n) => n.length > 0).length;
    return {
      totalCategories: e,
      totalOptions: r,
      activeOptions: i,
      categoriesWithActiveFilters: o,
      hasAnyActiveFilters: i > 0
    };
  }
  /**
   * Reset all filters to active state
   */
  resetFilters() {
    return this.state.categories.forEach((e) => {
      this.state.activeFilters[e.name] = e.options.map((r) => r.value), e.options.forEach((r) => {
        r.active = !0;
      });
    }), this.getState();
  }
  /**
   * Toggle ignore state for a category
   */
  toggleIgnoreCategory(e) {
    return this.state.categories = this.state.categories.map((r) => r.name === e ? {
      ...r,
      ignored: !r.ignored
    } : r), this.getState();
  }
  /**
   * Clear all filters (set to inactive)
   */
  clearFilters() {
    return Object.keys(this.state.activeFilters).forEach((e) => {
      this.state.activeFilters[e] = [];
    }), this.state.categories = this.state.categories.map((e) => ({
      ...e,
      options: e.options.map((r) => ({
        ...r,
        active: !1
      }))
    })), this.getState();
  }
}
var Ki = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, Q = (t, e, r, i) => {
  for (var o = i > 1 ? void 0 : i ? eo(e, r) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (i ? s(e, r, o) : s(o)) || o);
  return i && o && Ki(e, r, o), o;
};
const to = sr(lr);
let W = class extends oe {
  constructor() {
    super(...arguments), this.filterAttribute = "data-filter", this.filterLabel = "Filter by", this.filterStateManager = new Xi(), this.filterState = { categories: [], activeFilters: {} }, this.isPopoverOpen = !1, this.hasActiveFilters = !1, this.theme = "auto", this.showArrow = !0, this._themeMediaQuery = null, this._themeChangeHandler = null, this._handleOutsideClick = (t) => {
      const e = t.target;
      !this.contains(e) && this.isPopoverOpen && (this.isPopoverOpen = !1);
    }, this._handleEscapeKey = (t) => {
      t.key === "Escape" && this.isPopoverOpen && (this.isPopoverOpen = !1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._initializeFilters(), this._applyFilters();
  }
  firstUpdated(t) {
    super.firstUpdated(t), this._initializeFilters(), this._applyFilters(), window.addEventListener("pointerdown", this._handleOutsideClick), window.addEventListener("keydown", this._handleEscapeKey), this._addThemeChangeListener();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("pointerdown", this._handleOutsideClick), window.removeEventListener("keydown", this._handleEscapeKey), this._removeThemeChangeListener();
  }
  _handleSlotChange() {
    this._initializeFilters(), this._applyFilters();
  }
  _initializeFilters() {
    const t = this.querySelectorAll(`[${this.filterAttribute}]`), e = Array.from(t).map((r) => {
      const i = r.getAttribute(this.filterAttribute);
      return i ? this.filterStateManager.parseFilterAttribute(i) : null;
    }).filter((r) => r !== null);
    this.filterState = this.filterStateManager.initializeFromContent(e), this._updateActiveFiltersState();
  }
  _handleFilterChange(t) {
    const e = t.target, [r, i] = e.value.split(":"), o = e.checked, n = {
      categoryName: r,
      filterValue: i,
      isActive: o
    };
    this.filterState = this.filterStateManager.toggleFilter(n), this._updateActiveFiltersState(), this._applyFilters(), this.requestUpdate();
  }
  _handleIgnoreToggle(t) {
    this.filterState = this.filterStateManager.toggleIgnoreCategory(t), this._updateActiveFiltersState(), this._applyFilters(), this.requestUpdate();
  }
  _updateActiveFiltersState() {
    this.hasActiveFilters = this._deriveHasActiveFilters();
  }
  _deriveHasActiveFilters() {
    return this.filterStateManager.getStats().hasAnyActiveFilters;
  }
  /**
   * Determines the effective theme based on the theme property and system preference.
   */
  _getEffectiveTheme() {
    return this.theme === "auto" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : this.theme;
  }
  /**
   * Gets the appropriate CSS classes for the current theme.
   */
  _getThemeClasses() {
    return `theme-${this._getEffectiveTheme()}`;
  }
  /**
   * Determines the icon state based on current filter conditions.
   */
  _getIconState() {
    const t = this.filterStateManager.getStats();
    return this.filterState.categories.length === 0 ? "disabled" : t.hasAnyActiveFilters ? "filtered" : this.isPopoverOpen ? "active" : "default";
  }
  /**
   * Gets the appropriate icon classes based on current state.
   */
  _getIconClasses() {
    return `filter-icon-${this._getIconState()}`;
  }
  /**
   * Gets the count of active filters for badge display.
   */
  _getActiveFilterCount() {
    return this.filterStateManager.getStats().activeOptions || 0;
  }
  /**
   * Adds a theme change listener for reactive theme updates.
   */
  _addThemeChangeListener() {
    this.theme === "auto" && (this._themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)"), this._themeChangeHandler = () => {
      this.requestUpdate();
    }, this._themeMediaQuery.addEventListener("change", this._themeChangeHandler));
  }
  /**
   * Removes the theme change listener.
   */
  _removeThemeChangeListener() {
    this._themeMediaQuery && this._themeChangeHandler && (this._themeMediaQuery.removeEventListener("change", this._themeChangeHandler), this._themeMediaQuery = null, this._themeChangeHandler = null);
  }
  _togglePopover() {
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  _applyFilters() {
    this.querySelectorAll(`[${this.filterAttribute}]`).forEach((e) => {
      const r = e.getAttribute(this.filterAttribute);
      let i;
      if (r) {
        const o = this.filterStateManager.parseFilterAttribute(r);
        i = this.filterStateManager.evaluateElement(o).shouldShow;
      } else
        i = this.filterStateManager.evaluateElementWithoutFilters();
      e.style.display = i ? "" : "none";
    });
  }
  render() {
    const t = this._getThemeClasses(), e = this._getIconClasses(), r = this._getActiveFilterCount(), i = this._getIconState();
    return L`
      <!-- Apply theme classes to the entire component -->
      <div class="${t}">
        <!-- Filter icon button with popover container -->
        ${this.filterState.categories.length > 0 ? L`
          <div class="max-w-7xl mx-auto mb-4 px-4">
            <!-- Relatively positioned wrapper for icon and popover -->
            <div class="relative inline-block">
              <button 
                @click=${this._togglePopover}
                class="relative inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${i === "filtered" ? "bg-red-50 text-red-700 ring-2 ring-red-200 hover:bg-red-100" : i === "active" ? "bg-blue-50 text-blue-700 ring-2 ring-blue-200 hover:bg-blue-100" : i === "disabled" ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50" : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900"} ${this._getEffectiveTheme() === "dark" ? i === "filtered" ? "dark:bg-red-900/20 dark:text-red-400 dark:ring-red-800/30 dark:hover:bg-red-900/30" : i === "active" ? "dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-800/30 dark:hover:bg-blue-900/30" : i === "disabled" ? "dark:bg-gray-800/20 dark:text-gray-600 dark:cursor-not-allowed dark:opacity-50" : "dark:bg-gray-800/20 dark:text-gray-300 dark:hover:bg-gray-800/30 dark:hover:text-gray-200" : ""}"
                ?disabled=${i === "disabled"}
                aria-label="${this.filterLabel} ${r > 0 ? `(${r} active)` : ""}"
              >
                <!-- Filter icon with dynamic styling -->
                <svg class="w-4 h-4 ${e} transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                ${this.filterLabel}
                
                <!-- Badge indicator for active filters -->
                ${r > 0 ? L`
                  <span class="filter-badge" title="${r} active filters"></span>
                ` : ""}
              </button>
              
              <!-- Popover container - absolutely positioned with enhanced styling -->
              ${this.isPopoverOpen ? L`
                <div class="absolute left-0 mt-2 w-96 max-w-sm rounded-lg z-popover popover-shadow-enhanced ${this._getEffectiveTheme() === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}" 
                  style="background-color: var(--popover-bg); border-color: var(--popover-border);">
                  
                  <!-- Optional arrow caret -->
                  ${this.showArrow ? L`
                    <div class="popover-arrow"></div>
                  ` : ""}
                  
                  <div class="max-h-96 overflow-auto">
                    <div class="flex flex-col gap-4 p-4">
                      ${this.filterState.categories.map((o) => L`
                        <div class="relative py-2 border-b last:border-b-0 ${this._getEffectiveTheme() === "dark" ? "border-gray-700" : "border-gray-200"}" style="border-color: var(--border-primary);">
                          <div class="flex justify-between items-center mb-2">
                            <span class="font-semibold whitespace-nowrap transition-colors duration-200 ${this._getEffectiveTheme() === "dark" ? "text-gray-200" : "text-gray-800"} ${o.ignored ? "opacity-50 pointer-events-none" : ""}" 
                              style="color: var(--text-primary);">${o.label}:</span>
                            <v1-filter-in-toggle .ignoreValue=${o.ignored} @on-click=${() => this._handleIgnoreToggle(o.name)}></v1-filter-in-toggle>
                          </div>
                          <div class="flex flex-wrap items-center gap-4 ${o.ignored ? "opacity-50 pointer-events-none" : ""}">
                            <div class="flex gap-4 flex-wrap">
                              ${o.options.map((n) => L`
                                <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 py-1 transition-colors duration-150" 
                                  style="--hover-bg: var(--bg-hover);">
                                  <input 
                                    type="checkbox" 
                                    id="filter-${o.name}-${n.value}" 
                                    value="${o.name}:${n.value}"
                                    .checked=${n.active}
                                    @change=${this._handleFilterChange}
                                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600"
                                  >
                                  <label for="filter-${o.name}-${n.value}" 
                                    class="text-sm cursor-pointer select-none transition-colors duration-200 ${this._getEffectiveTheme() === "dark" ? "text-gray-300 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"}" 
                                    style="color: var(--text-secondary);">${n.label}</label>
                                </div>
                              `)}
                            </div>
                          </div>
                        </div>
                      `)}
                    </div>
                  </div>
                </div>
              ` : ""}
            </div>
          </div>
        ` : ""}

        <!-- Container for slotted content -->
        <div class="max-w-7xl mx-auto px-4 flex flex-wrap gap-6">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
};
Q([
  I({ type: String })
], W.prototype, "filterAttribute", 2);
Q([
  I({ type: String })
], W.prototype, "filterLabel", 2);
Q([
  I({ type: Object })
], W.prototype, "filterState", 2);
Q([
  I({ type: Boolean })
], W.prototype, "isPopoverOpen", 2);
Q([
  I({ type: Boolean })
], W.prototype, "hasActiveFilters", 2);
Q([
  I({ type: String })
], W.prototype, "theme", 2);
Q([
  I({ type: Boolean })
], W.prototype, "showArrow", 2);
W = Q([
  Bt("v1-filter-in"),
  to
], W);
console.log("Components module loaded");
//# sourceMappingURL=web-components.es.js.map
