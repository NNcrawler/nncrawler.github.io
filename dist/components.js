/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = globalThis, $t = ze.ShadowRoot && (ze.ShadyCSS === void 0 || ze.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, St = Symbol(), Nt = /* @__PURE__ */ new WeakMap();
let Er = class {
  constructor(e, r, i) {
    if (this._$cssResult$ = !0, i !== St) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if ($t && e === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (e = Nt.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Nt.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const gi = (t) => new Er(typeof t == "string" ? t : t + "", void 0, St), mi = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((i, n, o) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return new Er(r, t, St);
}, _i = (t, e) => {
  if ($t) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const i = document.createElement("style"), n = ze.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, t.appendChild(i);
  }
}, It = $t ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const i of e.cssRules) r += i.cssText;
  return gi(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bi, defineProperty: yi, getOwnPropertyDescriptor: vi, getOwnPropertyNames: wi, getOwnPropertySymbols: xi, getPrototypeOf: $i } = Object, Je = globalThis, Vt = Je.trustedTypes, Si = Vt ? Vt.emptyScript : "", ki = Je.reactiveElementPolyfillSupport, ve = (t, e) => t, We = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Si : null;
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
} }, kt = (t, e) => !bi(t, e), Bt = { attribute: !0, type: String, converter: We, reflect: !1, useDefault: !1, hasChanged: kt };
Symbol.metadata ??= Symbol("metadata"), Je.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ce = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Bt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, r);
      n !== void 0 && yi(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, r, i) {
    const { get: n, set: o } = vi(this.prototype, e) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: n, set(s) {
      const a = n?.call(this);
      o?.call(this, s), this.requestUpdate(e, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Bt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ve("elementProperties"))) return;
    const e = $i(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ve("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ve("properties"))) {
      const r = this.properties, i = [...wi(r), ...xi(r)];
      for (const n of i) this.createProperty(n, r[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [i, n] of r) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const n = this._$Eu(r, i);
      n !== void 0 && this._$Eh.set(n, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) r.unshift(It(n));
    } else e !== void 0 && r.push(It(e));
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
    return _i(e, this.constructor.elementStyles), e;
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
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : We).toAttribute(r, i.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, r) {
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), s = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : We;
      this._$Em = n, this[n] = s.fromAttribute(r, o.type) ?? this._$Ej?.get(n) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, r, i) {
    if (e !== void 0) {
      const n = this.constructor, o = this[e];
      if (i ??= n.getPropertyOptions(e), !((i.hasChanged ?? kt)(o, r) || i.useDefault && i.reflect && o === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, i)))) return;
      this.C(e, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: i, reflect: n, wrapped: o }, s) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? r ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (r = void 0), this._$AL.set(e, r)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) {
        const { wrapped: s } = o, a = this[n];
        s !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, o, a);
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
ce.elementStyles = [], ce.shadowRootOptions = { mode: "open" }, ce[ve("elementProperties")] = /* @__PURE__ */ new Map(), ce[ve("finalized")] = /* @__PURE__ */ new Map(), ki?.({ ReactiveElement: ce }), (Je.reactiveElementVersions ??= []).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = globalThis, Ne = At.trustedTypes, qt = Ne ? Ne.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Fr = "$lit$", Y = `lit$${Math.random().toFixed(9).slice(2)}$`, Or = "?" + Y, Ai = `<${Or}>`, se = document, $e = () => se.createComment(""), Se = (t) => t === null || typeof t != "object" && typeof t != "function", Ct = Array.isArray, Ci = (t) => Ct(t) || typeof t?.[Symbol.iterator] == "function", et = `[ 	
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Gt = /-->/g, Jt = />/g, te = RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Yt = /'/g, Qt = /"/g, Tr = /^(?:script|style|textarea|title)$/i, Ei = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), Q = Ei(1), pe = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), Zt = /* @__PURE__ */ new WeakMap(), ne = se.createTreeWalker(se, 129);
function Pr(t, e) {
  if (!Ct(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return qt !== void 0 ? qt.createHTML(e) : e;
}
const Fi = (t, e) => {
  const r = t.length - 1, i = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = be;
  for (let a = 0; a < r; a++) {
    const l = t[a];
    let d, u, c = -1, g = 0;
    for (; g < l.length && (s.lastIndex = g, u = s.exec(l), u !== null); ) g = s.lastIndex, s === be ? u[1] === "!--" ? s = Gt : u[1] !== void 0 ? s = Jt : u[2] !== void 0 ? (Tr.test(u[2]) && (n = RegExp("</" + u[2], "g")), s = te) : u[3] !== void 0 && (s = te) : s === te ? u[0] === ">" ? (s = n ?? be, c = -1) : u[1] === void 0 ? c = -2 : (c = s.lastIndex - u[2].length, d = u[1], s = u[3] === void 0 ? te : u[3] === '"' ? Qt : Yt) : s === Qt || s === Yt ? s = te : s === Gt || s === Jt ? s = be : (s = te, n = void 0);
    const p = s === te && t[a + 1].startsWith("/>") ? " " : "";
    o += s === be ? l + Ai : c >= 0 ? (i.push(d), l.slice(0, c) + Fr + l.slice(c) + Y + p) : l + Y + (c === -2 ? a : p);
  }
  return [Pr(t, o + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
let dt = class jr {
  constructor({ strings: e, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const a = e.length - 1, l = this.parts, [d, u] = Fi(e, r);
    if (this.el = jr.createElement(d, i), ne.currentNode = this.el.content, r === 2 || r === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = ne.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(Fr)) {
          const g = u[s++], p = n.getAttribute(c).split(Y), m = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: o, name: m[2], strings: p, ctor: m[1] === "." ? Ti : m[1] === "?" ? Pi : m[1] === "@" ? ji : Ye }), n.removeAttribute(c);
        } else c.startsWith(Y) && (l.push({ type: 6, index: o }), n.removeAttribute(c));
        if (Tr.test(n.tagName)) {
          const c = n.textContent.split(Y), g = c.length - 1;
          if (g > 0) {
            n.textContent = Ne ? Ne.emptyScript : "";
            for (let p = 0; p < g; p++) n.append(c[p], $e()), ne.nextNode(), l.push({ type: 2, index: ++o });
            n.append(c[g], $e());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Or) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = n.data.indexOf(Y, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += Y.length - 1;
      }
      o++;
    }
  }
  static createElement(e, r) {
    const i = se.createElement("template");
    return i.innerHTML = e, i;
  }
};
function fe(t, e, r = t, i) {
  if (e === pe) return e;
  let n = i !== void 0 ? r._$Co?.[i] : r._$Cl;
  const o = Se(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(t), n._$AT(t, r, i)), i !== void 0 ? (r._$Co ??= [])[i] = n : r._$Cl = n), n !== void 0 && (e = fe(t, n._$AS(t, e.values), n, i)), e;
}
let Oi = class {
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
    const { el: { content: r }, parts: i } = this._$AD, n = (e?.creationScope ?? se).importNode(r, !0);
    ne.currentNode = n;
    let o = ne.nextNode(), s = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new Fe(o, o.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (d = new Mi(o, this, e)), this._$AV.push(d), l = i[++a];
      }
      s !== l?.index && (o = ne.nextNode(), s++);
    }
    return ne.currentNode = se, n;
  }
  p(e) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, r), r += i.strings.length - 2) : i._$AI(e[r])), r++;
  }
};
class Fe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, r, i, n) {
    this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = fe(this, e, r), Se(e) ? e === O || e == null || e === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : e !== this._$AH && e !== pe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ci(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== O && Se(this._$AH) ? this._$AA.nextSibling.data = e : this.T(se.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: r, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = dt.createElement(Pr(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n) this._$AH.p(r);
    else {
      const o = new Oi(n, this), s = o.u(this.options);
      o.p(r), this.T(s), this._$AH = o;
    }
  }
  _$AC(e) {
    let r = Zt.get(e.strings);
    return r === void 0 && Zt.set(e.strings, r = new dt(e)), r;
  }
  k(e) {
    Ct(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const o of e) n === r.length ? r.push(i = new Fe(this.O($e()), this.O($e()), this, this.options)) : i = r[n], i._$AI(o), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
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
let Ye = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, i, n, o) {
    this.type = 1, this._$AH = O, this._$AN = void 0, this.element = e, this.name = r, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = O;
  }
  _$AI(e, r = this, i, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = fe(this, e, r, 0), s = !Se(e) || e !== this._$AH && e !== pe, s && (this._$AH = e);
    else {
      const a = e;
      let l, d;
      for (e = o[0], l = 0; l < o.length - 1; l++) d = fe(this, a[i + l], r, l), d === pe && (d = this._$AH[l]), s ||= !Se(d) || d !== this._$AH[l], d === O ? e = O : e !== O && (e += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    s && !n && this.j(e);
  }
  j(e) {
    e === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
class Ti extends Ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === O ? void 0 : e;
  }
}
let Pi = class extends Ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== O);
  }
}, ji = class extends Ye {
  constructor(e, r, i, n, o) {
    super(e, r, i, n, o), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = fe(this, e, r, 0) ?? O) === pe) return;
    const i = this._$AH, n = e === O && i !== O || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== O && (i === O || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}, Mi = class {
  constructor(e, r, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    fe(this, e);
  }
};
const Ri = At.litHtmlPolyfillSupport;
Ri?.(dt, Fe), (At.litHtmlVersions ??= []).push("3.3.0");
const Mr = (t, e, r) => {
  const i = r?.renderBefore ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = r?.renderBefore ?? null;
    i._$litPart$ = n = new Fe(e.insertBefore($e(), o), o, void 0, r ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = globalThis;
let ue = class extends ce {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Mr(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return pe;
  }
};
ue._$litElement$ = !0, ue.finalized = !0, Et.litElementHydrateSupport?.({ LitElement: ue });
const zi = Et.litElementPolyfillSupport;
zi?.({ LitElement: ue });
(Et.litElementVersions ??= []).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rr = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = { attribute: !0, type: String, converter: We, reflect: !1, hasChanged: kt }, Li = (t = Ui, e, r) => {
  const { kind: i, metadata: n } = r;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(r.name, t), i === "accessor") {
    const { name: s } = r;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, l, t);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, t, a), a;
    } };
  }
  if (i === "setter") {
    const { name: s } = r;
    return function(a) {
      const l = this[s];
      e.call(this, a), this.requestUpdate(s, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Oe(t) {
  return (e, r) => typeof r == "object" ? Li(t, e, r) : ((i, n, o) => {
    const s = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, i), s ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(t, e, r);
}
var Di = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, Ft = (t, e, r, i) => {
  for (var n = i > 1 ? void 0 : i ? Hi(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (i ? s(e, r, n) : s(n)) || n);
  return i && n && Di(e, r, n), n;
};
let ke = class extends ue {
  constructor() {
    super(...arguments), this.name = "World", this.count = 0;
  }
  _handleClick() {
    this.count++;
  }
  render() {
    return Q`
      <h1>Hello, ${this.name}!</h1>
      <p>This is a Lit.js component running in your Hugo site.</p>
      <p>Button clicked: ${this.count} times</p>
      <button @click=${this._handleClick}>Click me!</button>
    `;
  }
};
ke.styles = mi`
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
Ft([
  Oe({ type: String })
], ke.prototype, "name", 2);
Ft([
  Oe({ type: Number })
], ke.prototype, "count", 2);
ke = Ft([
  Rr("hello-world")
], ke);
let Ie, zr = 0;
function Xt(t) {
  Ie = t;
}
function Kt() {
  Ie = null, zr = 0;
}
function Wi() {
  return zr++;
}
const tt = Symbol("haunted.phase"), Ue = Symbol("haunted.hook"), er = Symbol("haunted.update"), tr = Symbol("haunted.commit"), oe = Symbol("haunted.effects"), we = Symbol("haunted.layoutEffects"), ut = "haunted.context";
class Ni {
  update;
  host;
  virtual;
  [Ue];
  [oe];
  [we];
  constructor(e, r) {
    this.update = e, this.host = r, this[Ue] = /* @__PURE__ */ new Map(), this[oe] = [], this[we] = [];
  }
  run(e) {
    Xt(this);
    let r = e();
    return Kt(), r;
  }
  _runEffects(e) {
    let r = this[e];
    Xt(this);
    for (let i of r)
      i.call(this);
    Kt();
  }
  runEffects() {
    this._runEffects(oe);
  }
  runLayoutEffects() {
    this._runEffects(we);
  }
  teardown() {
    this[Ue].forEach((r) => {
      typeof r.teardown == "function" && r.teardown();
    });
  }
}
const Ii = Promise.resolve().then.bind(Promise.resolve());
function Ur() {
  let t = [], e;
  function r() {
    e = null;
    let i = t;
    t = [];
    for (var n = 0, o = i.length; n < o; n++)
      i[n]();
  }
  return function(i) {
    t.push(i), e == null && (e = Ii(r));
  };
}
const Vi = Ur(), rr = Ur();
class Bi {
  renderer;
  host;
  state;
  [tt];
  _updateQueued;
  constructor(e, r) {
    this.renderer = e, this.host = r, this.state = new Ni(this.update.bind(this), r), this[tt] = null, this._updateQueued = !1;
  }
  update() {
    this._updateQueued || (Vi(() => {
      let e = this.handlePhase(er);
      rr(() => {
        this.handlePhase(tr, e), rr(() => {
          this.handlePhase(oe);
        });
      }), this._updateQueued = !1;
    }), this._updateQueued = !0);
  }
  handlePhase(e, r) {
    switch (this[tt] = e, e) {
      case tr:
        this.commit(r), this.runEffects(we);
        return;
      case er:
        return this.render();
      case oe:
        return this.runEffects(oe);
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
const qi = (t = "") => t.replace(/-+([a-z])?/g, (e, r) => r ? r.toUpperCase() : "");
function Gi(t) {
  class e extends Bi {
    frag;
    constructor(n, o, s) {
      super(n, s || o), this.frag = o;
    }
    commit(n) {
      t(n, this.frag);
    }
  }
  function r(i, n, o) {
    const s = (o || n || {}).baseElement || HTMLElement, { observedAttributes: a = [], useShadowDOM: l = !0, shadowRootInit: d = {} } = o || n || {};
    class u extends s {
      _scheduler;
      static get observedAttributes() {
        return i.observedAttributes || a || [];
      }
      constructor() {
        super(), l === !1 ? this._scheduler = new e(i, this) : (this.attachShadow({ mode: "open", ...d }), this._scheduler = new e(i, this.shadowRoot, this));
      }
      connectedCallback() {
        this._scheduler.update();
      }
      disconnectedCallback() {
        this._scheduler.teardown();
      }
      attributeChangedCallback(m, v, b) {
        if (v === b)
          return;
        let y = b === "" ? !0 : b;
        Reflect.set(this, qi(m), y);
      }
    }
    function c(p) {
      let m = p, v = !1;
      return Object.freeze({
        enumerable: !0,
        configurable: !0,
        get() {
          return m;
        },
        set(b) {
          v && m === b || (v = !0, m = b, this._scheduler && this._scheduler.update());
        }
      });
    }
    const g = new Proxy(s.prototype, {
      getPrototypeOf(p) {
        return p;
      },
      set(p, m, v, b) {
        let y;
        return m in p ? (y = Object.getOwnPropertyDescriptor(p, m), y && y.set ? (y.set.call(b, v), !0) : (Reflect.set(p, m, v, b), !0)) : (typeof m == "symbol" || m[0] === "_" ? y = {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: v
        } : y = c(v), Object.defineProperty(b, m, y), y.set && y.set.call(b, v), !0);
      }
    });
    return Object.setPrototypeOf(u.prototype, g), u;
  }
  return r;
}
class Te {
  id;
  state;
  constructor(e, r) {
    this.id = e, this.state = r;
  }
}
function Ji(t, ...e) {
  let r = Wi(), i = Ie[Ue], n = i.get(r);
  return n || (n = new t(r, Ie, ...e), i.set(r, n)), n.update(...e);
}
function Pe(t) {
  return Ji.bind(null, t);
}
function Lr(t) {
  return Pe(class extends Te {
    callback;
    lastValues;
    values;
    _teardown;
    constructor(e, r, i, n) {
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
function Dr(t, e) {
  t[oe].push(e);
}
Lr(Dr);
const Yi = Pe(class extends Te {
  Context;
  value;
  _ranEffect;
  _unsubscribe;
  constructor(t, e, r) {
    super(t, e), this._updater = this._updater.bind(this), this._ranEffect = !1, this._unsubscribe = null, Dr(e, this);
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
    this.state.host.dispatchEvent(new CustomEvent(ut, {
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
function Qi(t) {
  return (e) => {
    const r = {
      Provider: class extends HTMLElement {
        listeners;
        _value;
        constructor() {
          super(), this.listeners = /* @__PURE__ */ new Set(), this.addEventListener(ut, this);
        }
        disconnectedCallback() {
          this.removeEventListener(ut, this);
        }
        handleEvent(i) {
          const { detail: n } = i;
          n.Context === r && (n.value = this.value, n.unsubscribe = this.unsubscribe.bind(this, n.callback), this.listeners.add(n.callback), i.stopPropagation());
        }
        unsubscribe(i) {
          this.listeners.delete(i);
        }
        set value(i) {
          this._value = i;
          for (let n of this.listeners)
            n(i);
        }
        get value() {
          return this._value;
        }
      },
      Consumer: t(function({ render: i }) {
        const n = Yi(r);
        return i(n);
      }, { useShadowDOM: !1 }),
      defaultValue: e
    };
    return r;
  };
}
const Zi = Pe(class extends Te {
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
}), Xi = (t, e) => Zi(() => t, e);
function Ki(t, e) {
  t[we].push(e);
}
Lr(Ki);
Pe(class extends Te {
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
Pe(class extends Te {
  reducer;
  currentState;
  constructor(t, e, r, i, n) {
    super(t, e), this.dispatch = this.dispatch.bind(this), this.currentState = n !== void 0 ? n(i) : i;
  }
  update(t) {
    return this.reducer = t, [this.currentState, this.dispatch];
  }
  dispatch(t) {
    this.currentState = this.reducer(this.currentState, t), this.state.update();
  }
});
function en({ render: t }) {
  const e = Gi(t), r = Qi(e);
  return { component: e, createContext: r };
}
const { component: tn } = en({ render: Mr });
function Ot(t) {
  return [
    ...t.v,
    (t.i ? "!" : "") + t.n
  ].join(":");
}
function rn(t, e = ",") {
  return t.map(Ot).join(e);
}
let Hr = typeof CSS < "u" && CSS.escape || // Simplified: escaping only special characters
// Needed for NodeJS and Edge <79 (https://caniuse.com/mdn-api_css_escape)
((t) => t.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));
function Ve(t) {
  for (var e = 9, r = t.length; r--; ) e = Math.imul(e ^ t.charCodeAt(r), 1597334677);
  return "#" + ((e ^ e >>> 9) >>> 0).toString(36);
}
function Tt(t, e = "@media ") {
  return e + k(t).map((r) => (typeof r == "string" && (r = {
    min: r
  }), r.raw || Object.keys(r).map((i) => `(${i}-width:${r[i]})`).join(" and "))).join(",");
}
function k(t = []) {
  return Array.isArray(t) ? t : t == null ? [] : [
    t
  ];
}
function ir(t) {
  return t;
}
function Pt() {
}
let j = {
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
function Wr(t) {
  return t.match(/[-=:;]/g)?.length || 0;
}
function pt(t) {
  return Math.min(/(?:^|width[^\d]+)(\d+(?:.\d+)?)(p)?/.test(t) ? Math.max(0, 29.63 * (+RegExp.$1 / (RegExp.$2 ? 15 : 1)) ** 0.137 - 43) : 0, 15) << 22 | /* Shifts.responsive */
  Math.min(Wr(t), 15) << 18;
}
let nn = [
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
function jt({ n: t, i: e, v: r = [] }, i, n, o) {
  t && (t = Ot({
    n: t,
    i: e,
    v: r
  })), o = [
    ...k(o)
  ];
  for (let a of r) {
    let l = i.theme("screens", a);
    for (let d of k(l && Tt(l) || i.v(a))) {
      var s;
      o.push(d), n |= l ? 67108864 | /* Shifts.screens */
      pt(d) : a == "dark" ? 1073741824 : (
        /* Shifts.darkMode */
        d[0] == "@" ? pt(d) : (s = d, // use first found pseudo-class
        1 << ~(/:([a-z-]+)/.test(s) && ~nn.indexOf(RegExp.$1.slice(2, 7)) || -18))
      );
    }
  }
  return {
    n: t,
    p: n,
    r: o,
    i: e
  };
}
let Nr = /* @__PURE__ */ new Map();
function ft(t) {
  if (t.d) {
    let e = [], r = rt(
      // merge all conditions into a selector string
      t.r.reduce((i, n) => n[0] == "@" ? (e.push(n), i) : (
        // Go over the selector and replace the matching multiple selectors if any
        n ? rt(i, (o) => rt(
          n,
          // If the current condition has a nested selector replace it
          (s) => {
            let a = /(:merge\(.+?\))(:[a-z-]+|\\[.+])/.exec(s);
            if (a) {
              let l = o.indexOf(a[1]);
              return ~l ? (
                // [':merge(.group):hover .rule', ':merge(.group):focus &'] -> ':merge(.group):focus:hover .rule'
                // ':merge(.group)' + ':focus' + ':hover .rule'
                o.slice(0, l) + a[0] + o.slice(l + a[1].length)
              ) : (
                // [':merge(.peer):focus~&', ':merge(.group):hover &'] -> ':merge(.peer):focus~:merge(.group):hover &'
                it(o, s)
              );
            }
            return it(s, o);
          }
        )) : i
      ), "&"),
      // replace '&' with rule name or an empty string
      (i) => it(i, t.n ? "." + Hr(t.n) : "")
    );
    return r && e.push(r.replace(/:merge\((.+?)\)/g, "$1")), e.reduceRight((i, n) => n + "{" + i + "}", t.d);
  }
}
function rt(t, e) {
  return t.replace(/ *((?:\(.+?\)|\[.+?\]|[^,])+) *(,|$)/g, (r, i, n) => e(i) + n);
}
function it(t, e) {
  return t.replace(/&/g, e);
}
let nr = new Intl.Collator("en", {
  numeric: !0
});
function Ir(t, e) {
  for (var r = 0, i = t.length; r < i; ) {
    let n = i + r >> 1;
    0 >= Vr(t[n], e) ? r = n + 1 : i = n;
  }
  return i;
}
function Vr(t, e) {
  let r = t.p & j.o;
  return r == (e.p & j.o) && (r == j.b || r == j.o) ? 0 : t.p - e.p || t.o - e.o || nr.compare(or(t.n), or(e.n)) || nr.compare(sr(t.n), sr(e.n));
}
function or(t) {
  return (t || "").split(/:/).pop().split("/").pop() || "\0";
}
function sr(t) {
  return (t || "").replace(/\W/g, (e) => String.fromCharCode(127 + e.charCodeAt(0))) + "\0";
}
function nt(t, e) {
  return Math.round(parseInt(t, 16) * e);
}
function Z(t, e = {}) {
  if (typeof t == "function") return t(e);
  let { opacityValue: r = "1", opacityVariable: i } = e, n = i ? `var(${i})` : r;
  if (t.includes("<alpha-value>")) return t.replace("<alpha-value>", n);
  if (t[0] == "#" && (t.length == 4 || t.length == 7)) {
    let o = (t.length - 1) / 3, s = [
      17,
      1,
      0.062272
    ][o - 1];
    return `rgba(${[
      nt(t.substr(1, o), s),
      nt(t.substr(1 + o, o), s),
      nt(t.substr(1 + 2 * o, o), s),
      n
    ]})`;
  }
  return n == "1" ? t : n == "0" ? "#0000" : (
    // convert rgb and hsl to alpha variant
    t.replace(/^(rgb|hsl)(\([^)]+)\)$/, `$1a$2,${n})`)
  );
}
function Br(t, e, r, i, n = []) {
  return function o(s, { n: a, p: l, r: d = [], i: u }, c) {
    let g = [], p = "", m = 0, v = 0;
    for (let _ in s || {}) {
      var b, y;
      let S = s[_];
      if (_[0] == "@") {
        if (!S) continue;
        if (_[1] == "a") {
          g.push(...Rt(a, l, qe("" + S), c, l, d, u, !0));
          continue;
        }
        if (_[1] == "l") {
          for (let A of k(S)) g.push(...o(A, {
            n: a,
            p: (b = j[_[7]], // Set layer (first reset, than set)
            l & -939524097 | b),
            r: _[7] == "d" ? [] : d,
            i: u
          }, c));
          continue;
        }
        if (_[1] == "i") {
          g.push(...k(S).map((A) => ({
            // before all layers
            p: -1,
            o: 0,
            r: [],
            d: _ + " " + A
          })));
          continue;
        }
        if (_[1] == "k") {
          g.push({
            p: j.d,
            o: 0,
            r: [
              _
            ],
            d: o(S, {
              p: j.d
            }, c).map(ft).join("")
          });
          continue;
        }
        if (_[1] == "f") {
          g.push(...k(S).map((A) => ({
            p: j.d,
            o: 0,
            r: [
              _
            ],
            d: o(A, {
              p: j.d
            }, c).map(ft).join("")
          })));
          continue;
        }
      }
      if (typeof S != "object" || Array.isArray(S))
        _ == "label" && S ? a = S + Ve(JSON.stringify([
          l,
          u,
          s
        ])) : (S || S === 0) && (_ = _.replace(/[A-Z]/g, (A) => "-" + A.toLowerCase()), v += 1, m = Math.max(m, (y = _)[0] == "-" ? 0 : Wr(y) + (/^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7,8}$)|([fl].{5}l|g.{8}$|pl))/.test(y) ? +!!RegExp.$1 || /* +1 */
        -!!RegExp.$2 : (
          /* -1 */
          0
        )) + 1), p += (p ? ";" : "") + k(S).map((A) => c.s(
          _,
          // support theme(...) function in values
          // calc(100vh - theme('spacing.12'))
          Mt("" + A, c.theme) + (u ? " !important" : "")
        )).join(";"));
      else if (_[0] == "@" || _.includes("&")) {
        let A = l;
        _[0] == "@" && (_ = _.replace(/\bscreen\(([^)]+)\)/g, (G, D) => {
          let M = c.theme("screens", D);
          return M ? (A |= 67108864, /* Shifts.screens */
          Tt(M, "")) : G;
        }), A |= pt(_)), g.push(...o(S, {
          n: a,
          p: A,
          r: [
            ...d,
            _
          ],
          i: u
        }, c));
      } else
        g.push(...o(S, {
          p: l,
          r: [
            ...d,
            _
          ]
        }, c));
    }
    return (
      // PERF: prevent unshift using `rules = [{}]` above and then `rules[0] = {...}`
      g.unshift({
        n: a,
        p: l,
        o: (
          // number of declarations (descending)
          Math.max(0, 15 - v) + // greatest precedence of properties
          // if there is no property precedence this is most likely a custom property only declaration
          // these have the highest precedence
          1.5 * Math.min(m || 15, 15)
        ),
        r: d,
        // stringified declarations
        d: p
      }), g.sort(Vr)
    );
  }(t, jt(e, r, i, n), r);
}
function Mt(t, e) {
  return t.replace(/theme\((["'`])?(.+?)\1(?:\s*,\s*(["'`])?(.+?)\3)?\)/g, (r, i, n, o, s = "") => {
    let a = e(n, s);
    return typeof a == "function" && /color|fill|stroke/i.test(n) ? Z(a) : "" + k(a).filter((l) => Object(l) !== l);
  });
}
function qr(t, e) {
  let r, i = [];
  for (let n of t)
    n.d && n.n ? r?.p == n.p && "" + r.r == "" + n.r ? (r.c = [
      r.c,
      n.c
    ].filter(Boolean).join(" "), r.d = r.d + ";" + n.d) : i.push(r = {
      ...n,
      n: n.n && e
    }) : i.push({
      ...n,
      n: n.n && e
    });
  return i;
}
function Be(t, e, r = j.u, i, n) {
  let o = [];
  for (let s of t) for (let a of function(l, d, u, c, g) {
    l = {
      ...l,
      i: l.i || g
    };
    let p = function(m, v) {
      let b = Nr.get(m.n);
      return b ? b(m, v) : v.r(m.n, m.v[0] == "dark");
    }(l, d);
    return p ? (
      // a list of class names
      typeof p == "string" ? ({ r: c, p: u } = jt(l, d, u, c), qr(Be(qe(p), d, u, c, l.i), l.n)) : Array.isArray(p) ? p.map((m) => {
        var v, b;
        return {
          o: 0,
          ...m,
          r: [
            ...k(c),
            ...k(m.r)
          ],
          p: (v = u, b = m.p ?? u, v & -939524097 | b)
        };
      }) : Br(p, l, d, u, c)
    ) : (
      // propagate className as is
      [
        {
          c: Ot(l),
          p: 0,
          o: 0,
          r: []
        }
      ]
    );
  }(s, e, r, i, n)) o.splice(Ir(o, a), 0, a);
  return o;
}
function Rt(t, e, r, i, n, o, s, a) {
  return qr((a ? r.flatMap((l) => Be([
    l
  ], i, n, o, s)) : Be(r, i, n, o, s)).map((l) => (
    // do not move defaults
    // move only rules with a name unless they are in the base layer
    l.p & j.o && (l.n || e == j.b) ? {
      ...l,
      p: l.p & -939524097 | e,
      o: 0
    } : l
  )), t);
}
function on(t, e, r, i) {
  var n;
  return n = (o, s) => {
    let { n: a, p: l, r: d, i: u } = jt(o, s, e);
    return r && Rt(a, e, r, s, l, d, u, i);
  }, Nr.set(t, n), t;
}
function ot(t, e, r) {
  if (t[t.length - 1] != "(") {
    let i = [], n = !1, o = !1, s = "";
    for (let a of t) if (!(a == "(" || /[~@]$/.test(a))) {
      if (a[0] == "!" && (a = a.slice(1), n = !n), a.endsWith(":")) {
        i[a == "dark:" ? "unshift" : "push"](a.slice(0, -1));
        continue;
      }
      a[0] == "-" && (a = a.slice(1), o = !o), a.endsWith("-") && (a = a.slice(0, -1)), a && a != "&" && (s += (s && "-") + a);
    }
    s && (o && (s = "-" + s), e[0].push({
      n: s,
      v: i.filter(sn),
      i: n
    }));
  }
}
function sn(t, e, r) {
  return r.indexOf(t) == e;
}
let ar = /* @__PURE__ */ new Map();
function qe(t) {
  let e = ar.get(t);
  if (!e) {
    let r = [], i = [
      []
    ], n = 0, o = 0, s = null, a = 0, l = (d, u = 0) => {
      n != a && (r.push(t.slice(n, a + u)), d && ot(r, i)), n = a + 1;
    };
    for (; a < t.length; a++) {
      let d = t[a];
      if (o) t[a - 1] != "\\" && (o += +(d == "[") || -(d == "]"));
      else if (d == "[")
        o += 1;
      else if (s)
        t[a - 1] != "\\" && s.test(t.slice(a)) && (s = null, n = a + RegExp.lastMatch.length);
      else if (d == "/" && t[a - 1] != "\\" && (t[a + 1] == "*" || t[a + 1] == "/"))
        s = t[a + 1] == "*" ? /^\*\// : /^[\r\n]/;
      else if (d == "(")
        l(), r.push(d);
      else if (d == ":") t[a + 1] != ":" && l(!1, 1);
      else if (/[\s,)]/.test(d)) {
        l(!0);
        let u = r.lastIndexOf("(");
        if (d == ")") {
          let c = r[u - 1];
          if (/[~@]$/.test(c)) {
            let g = i.shift();
            r.length = u, ot([
              ...r,
              "#"
            ], i);
            let { v: p } = i[0].pop();
            for (let m of g)
              m.v.splice(+(m.v[0] == "dark") - +(p[0] == "dark"), p.length);
            ot([
              ...r,
              on(
                // named nested
                c.length > 1 ? c.slice(0, -1) + Ve(JSON.stringify([
                  c,
                  g
                ])) : c + "(" + rn(g) + ")",
                j.a,
                g,
                /@$/.test(c)
              )
            ], i);
          }
          u = r.lastIndexOf("(", u - 1);
        }
        r.length = u + 1;
      } else /[~@]/.test(d) && t[a + 1] == "(" && // start nested block
      // ~(...) or button~(...)
      // @(...) or button@(...)
      i.unshift([]);
    }
    l(!0), ar.set(t, e = i[0]);
  }
  return e;
}
function f(t, e, r) {
  return [
    t,
    ht(e, r)
  ];
}
function ht(t, e) {
  return typeof t == "function" ? t : typeof t == "string" && /^[\w-]+$/.test(t) ? (
    // a CSS property alias
    (r, i) => ({
      [t]: e ? e(r, i) : gt(r, 1)
    })
  ) : (r) => (
    // CSSObject, shortcut or apply
    t || {
      [r[1]]: gt(r, 2)
    }
  );
}
function gt(t, e, r = t.slice(e).find(Boolean) || t.$$ || t.input) {
  return t.input[0] == "-" ? `calc(${r} * -1)` : r;
}
function h(t, e, r, i) {
  return [
    t,
    an(e, r, i)
  ];
}
function an(t, e, r) {
  let i = typeof e == "string" ? (n, o) => ({
    [e]: r ? r(n, o) : n._
  }) : e || (({ 1: n, _: o }, s, a) => ({
    [n || a]: o
  }));
  return (n, o) => {
    let s = Gr(t || n[1]), a = o.theme(s, n.$$) ?? X(n.$$, s, o);
    if (a != null) return n._ = gt(n, 0, a), i(n, o, s);
  };
}
function F(t, e = {}, r) {
  return [
    t,
    ln(e, r)
  ];
}
function ln(t = {}, e) {
  return (r, i) => {
    let { section: n = Gr(r[0]).replace("-", "") + "Color" } = t, [o, s] = cn(r.$$);
    if (!o) return;
    let a = i.theme(n, o) || X(o, n, i);
    if (!a || typeof a == "object") return;
    let {
      // text- -> --tw-text-opacity
      // ring-offset(?:-|$) -> --tw-ring-offset-opacity
      // TODO move this default into preset-tailwind?
      opacityVariable: l = `--tw-${r[0].replace(/-$/, "")}-opacity`,
      opacitySection: d = n.replace("Color", "Opacity"),
      property: u = n,
      selector: c
    } = t, g = i.theme(d, s || "DEFAULT") || s && X(s, d, i), p = e || (({ _: v }) => {
      let b = Le(u, v);
      return c ? {
        [c]: b
      } : b;
    });
    r._ = {
      value: Z(a, {
        opacityVariable: l || void 0,
        opacityValue: g || void 0
      }),
      color: (v) => Z(a, v),
      opacityVariable: l || void 0,
      opacityValue: g || void 0
    };
    let m = p(r, i);
    if (!r.dark) {
      let v = i.d(n, o, a);
      v && v !== a && (r._ = {
        value: Z(v, {
          opacityVariable: l || void 0,
          opacityValue: g || "1"
        }),
        color: (b) => Z(v, b),
        opacityVariable: l || void 0,
        opacityValue: g || void 0
      }, m = {
        "&": m,
        [i.v("dark")]: p(r, i)
      });
    }
    return m;
  };
}
function cn(t) {
  return (t.match(/^(\[[^\]]+]|[^/]+?)(?:\/(.+))?$/) || []).slice(1);
}
function Le(t, e) {
  let r = {};
  return typeof e == "string" ? r[t] = e : (e.opacityVariable && e.value.includes(e.opacityVariable) && (r[e.opacityVariable] = e.opacityValue || "1"), r[t] = e.value), r;
}
function X(t, e, r) {
  if (t[0] == "[" && t.slice(-1) == "]") {
    if (t = Ae(Mt(t.slice(1, -1), r.theme)), !e) return t;
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
function Gr(t) {
  return t.replace(/-./g, (e) => e[1].toUpperCase());
}
function Ae(t) {
  return (
    // Keep raw strings if it starts with `url(`
    t.includes("url(") ? t.replace(/(.*?)(url\(.*?\))(.*?)/g, (e, r = "", i, n = "") => Ae(r) + i + Ae(n)) : t.replace(/(^|[^\\])_+/g, (e, r) => r + " ".repeat(e.length - r.length)).replace(/\\_/g, "_").replace(/(calc|min|max|clamp)\(.+\)/g, (e) => e.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 "))
  );
}
function Jr({ presets: t = [], ...e }) {
  let r = {
    darkMode: void 0,
    darkColor: void 0,
    preflight: e.preflight !== !1 && [],
    theme: {},
    variants: k(e.variants),
    rules: k(e.rules),
    ignorelist: k(e.ignorelist),
    hash: void 0,
    stringify: (i, n) => i + ":" + n,
    finalize: []
  };
  for (let i of k([
    ...t,
    {
      darkMode: e.darkMode,
      darkColor: e.darkColor,
      preflight: e.preflight !== !1 && k(e.preflight),
      theme: e.theme,
      hash: e.hash,
      stringify: e.stringify,
      finalize: e.finalize
    }
  ])) {
    let { preflight: n, darkMode: o = r.darkMode, darkColor: s = r.darkColor, theme: a, variants: l, rules: d, ignorelist: u, hash: c = r.hash, stringify: g = r.stringify, finalize: p } = typeof i == "function" ? i(r) : i;
    r = {
      // values defined by user or previous presets take precedence
      preflight: r.preflight !== !1 && n !== !1 && [
        ...r.preflight,
        ...k(n)
      ],
      darkMode: o,
      darkColor: s,
      theme: {
        ...r.theme,
        ...a,
        extend: {
          ...r.theme.extend,
          ...a?.extend
        }
      },
      variants: [
        ...r.variants,
        ...k(l)
      ],
      rules: [
        ...r.rules,
        ...k(d)
      ],
      ignorelist: [
        ...r.ignorelist,
        ...k(u)
      ],
      hash: c,
      stringify: g,
      finalize: [
        ...r.finalize,
        ...k(p)
      ]
    };
  }
  return r;
}
function lr(t, e, r, i, n, o) {
  for (let s of e) {
    let a = r.get(s);
    a || r.set(s, a = i(s));
    let l = a(t, n, o);
    if (l) return l;
  }
}
function dn(t) {
  var e;
  return mt(t[0], typeof (e = t[1]) == "function" ? e : () => e);
}
function un(t) {
  var e, r;
  return Array.isArray(t) ? mt(t[0], ht(t[1], t[2])) : mt(t, ht(e, r));
}
function mt(t, e) {
  return Yr(t, (r, i, n, o) => {
    let s = i.exec(r);
    if (s) return (
      // MATCH.$_ = value
      s.$$ = r.slice(s[0].length), s.dark = o, e(s, n)
    );
  });
}
function Yr(t, e) {
  let r = k(t).map(pn);
  return (i, n, o) => {
    for (let s of r) {
      let a = e(i, s, n, o);
      if (a) return a;
    }
  };
}
function pn(t) {
  return typeof t == "string" ? RegExp("^" + t + (t.includes("$") || t.slice(-1) == "-" ? "" : "$")) : t;
}
function fn(t, e) {
  let r = Jr(t), i = function({ theme: l, darkMode: d, darkColor: u = Pt, variants: c, rules: g, hash: p, stringify: m, ignorelist: v, finalize: b }) {
    let y = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), G = Yr(v, (x, C) => C.test(x));
    c.push([
      "dark",
      Array.isArray(d) || d == "class" ? `${k(d)[1] || ".dark"} &` : typeof d == "string" && d != "media" ? d : (
        // a custom selector
        "@media (prefers-color-scheme:dark)"
      )
    ]);
    let D = typeof p == "function" ? (x) => p(x, Ve) : p ? Ve : ir;
    D !== ir && b.push((x) => ({
      ...x,
      n: x.n && D(x.n),
      d: x.d?.replace(/--(tw(?:-[\w-]+)?)\b/g, (C, P) => "--" + D(P).replace("#", ""))
    }));
    let M = {
      theme: function({ extend: x = {}, ...C }) {
        let P = {}, H = {
          get colors() {
            return N("colors");
          },
          theme: N,
          // Stub implementation as negated values are automatically infered and do _not_ need to be in the theme
          negative() {
            return {};
          },
          breakpoints(T) {
            let R = {};
            for (let z in T) typeof T[z] == "string" && (R["screen-" + z] = T[z]);
            return R;
          }
        };
        return N;
        function N(T, R, z, ge) {
          if (T) {
            if ({ 1: T, 2: ge } = // eslint-disable-next-line no-sparse-arrays
            /^(\S+?)(?:\s*\/\s*([^/]+))?$/.exec(T) || [
              ,
              T
            ], /[.[]/.test(T)) {
              let q = [];
              T.replace(/\[([^\]]+)\]|([^.[]+)/g, (ee, _e, hi = _e) => q.push(hi)), T = q.shift(), z = R, R = q.join("-");
            }
            let V = P[T] || // two-step deref to allow extend section to reference base section
            Object.assign(Object.assign(
              // Make sure to not get into recursive calls
              P[T] = {},
              Wt(C, T)
            ), Wt(x, T));
            if (R == null) return V;
            R || (R = "DEFAULT");
            let K = V[R] ?? R.split("-").reduce((q, ee) => q?.[ee], V) ?? z;
            return ge ? Z(K, {
              opacityValue: Mt(ge, N)
            }) : K;
          }
          let me = {};
          for (let V of [
            ...Object.keys(C),
            ...Object.keys(x)
          ]) me[V] = N(V);
          return me;
        }
        function Wt(T, R) {
          let z = T[R];
          return typeof z == "function" && (z = z(H)), z && /color|fill|stroke/i.test(R) ? function ge(me, V = []) {
            let K = {};
            for (let q in me) {
              let ee = me[q], _e = [
                ...V,
                q
              ];
              K[_e.join("-")] = ee, q == "DEFAULT" && (_e = V, K[V.join("-")] = ee), typeof ee == "object" && Object.assign(K, ge(ee, _e));
            }
            return K;
          }(z) : z;
        }
      }(l),
      e: Hr,
      h: D,
      s(x, C) {
        return m(x, C, M);
      },
      d(x, C, P) {
        return u(x, C, M, P);
      },
      v(x) {
        return y.has(x) || y.set(x, lr(x, c, _, dn, M) || "&:" + x), y.get(x);
      },
      r(x, C) {
        let P = JSON.stringify([
          x,
          C
        ]);
        return S.has(P) || S.set(P, !G(x, M) && lr(x, g, A, un, M, C)), S.get(P);
      },
      f(x) {
        return b.reduce((C, P) => P(C, M), x);
      }
    };
    return M;
  }(r), n = /* @__PURE__ */ new Map(), o = [], s = /* @__PURE__ */ new Set();
  e.resume((l) => n.set(l, l), (l, d) => {
    e.insert(l, o.length, d), o.push(d), s.add(l);
  });
  function a(l) {
    let d = i.f(l), u = ft(d);
    if (u && !s.has(u)) {
      s.add(u);
      let c = Ir(o, l);
      e.insert(u, c, l), o.splice(c, 0, l);
    }
    return d.n;
  }
  return Object.defineProperties(function(d) {
    if (!n.size) for (let c of k(r.preflight))
      typeof c == "function" && (c = c(i)), c && (typeof c == "string" ? Rt("", j.b, qe(c), i, j.b, [], !1, !0) : Br(c, {}, i, j.b)).forEach(a);
    d = "" + d;
    let u = n.get(d);
    if (!u) {
      let c = /* @__PURE__ */ new Set();
      for (let g of Be(qe(d), i)) c.add(g.c).add(a(g));
      u = [
        ...c
      ].filter(Boolean).join(" "), n.set(d, u).set(u, u);
    }
    return u;
  }, Object.getOwnPropertyDescriptors({
    get target() {
      return e.target;
    },
    theme: i.theme,
    config: r,
    snapshot() {
      let l = e.snapshot(), d = new Set(s), u = new Map(n), c = [
        ...o
      ];
      return () => {
        l(), s = d, n = u, o = c;
      };
    },
    clear() {
      e.clear(), s = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), o = [];
    },
    destroy() {
      this.clear(), e.destroy();
    }
  }));
}
function hn(t, e) {
  return t != e && "" + t.split(" ").sort() != "" + e.split(" ").sort();
}
function gn(t) {
  let e = new MutationObserver(r);
  return {
    observe(n) {
      e.observe(n, {
        attributeFilter: [
          "class"
        ],
        subtree: !0,
        childList: !0
      }), i(n), r([
        {
          target: n,
          type: ""
        }
      ]);
    },
    disconnect() {
      e.disconnect();
    }
  };
  function r(n) {
    for (let { type: o, target: s } of n) if (o[0] == "a")
      i(s);
    else
      for (let a of s.querySelectorAll("[class]")) i(a);
    e.takeRecords();
  }
  function i(n) {
    let o, s = n.getAttribute?.("class");
    s && hn(s, o = t(s)) && // Not using `target.className = ...` as that is read-only for SVGElements
    n.setAttribute("class", o);
  }
}
function mn(t) {
  let e = document.querySelector(t || 'style[data-twind=""]');
  return (!e || e.tagName != "STYLE") && (e = document.createElement("style"), document.head.prepend(e)), e.dataset.twind = "claimed", e;
}
function st(t) {
  let e = t?.cssRules ? t : (t && typeof t != "string" ? t : mn(t)).sheet;
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
    resume: Pt
  };
}
function Qr(t, e = !0) {
  let r = function() {
    if (_n) try {
      let l = st(new CSSStyleSheet());
      return l.connect = (d) => {
        let u = at(d);
        u.adoptedStyleSheets = [
          ...u.adoptedStyleSheets,
          l.target
        ];
      }, l.disconnect = Pt, l;
    } catch {
    }
    let o = document.createElement("style");
    o.media = "not all", document.head.prepend(o);
    let s = [
      st(o)
    ], a = /* @__PURE__ */ new WeakMap();
    return {
      get target() {
        return s[0].target;
      },
      snapshot() {
        let l = s.map((d) => d.snapshot());
        return () => l.forEach((d) => d());
      },
      clear() {
        s.forEach((l) => l.clear());
      },
      destroy() {
        s.forEach((l) => l.destroy());
      },
      insert(l, d, u) {
        s[0].insert(l, d, u);
        let c = this.target.cssRules[d];
        s.forEach((g, p) => p && g.target.insertRule(c.cssText, d));
      },
      resume(l, d) {
        return s[0].resume(l, d);
      },
      connect(l) {
        let d = document.createElement("style");
        at(l).appendChild(d);
        let u = st(d), { cssRules: c } = this.target;
        for (let g = 0; g < c.length; g++) u.target.insertRule(c[g].cssText, g);
        s.push(u), a.set(l, u);
      },
      disconnect(l) {
        let d = s.indexOf(a.get(l));
        d >= 0 && s.splice(d, 1);
      }
    };
  }(), i = fn({
    ...t,
    // in production use short hashed class names
    hash: t.hash ?? e
  }, r), n = gn(i);
  return function(s) {
    return class extends s {
      connectedCallback() {
        super.connectedCallback?.(), r.connect(this), n.observe(at(this));
      }
      disconnectedCallback() {
        r.disconnect(this), super.disconnectedCallback?.();
      }
      constructor(...l) {
        super(...l), this.tw = i;
      }
    };
  };
}
let _n = typeof ShadowRoot < "u" && (typeof ShadyCSS > "u" || ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
function at(t) {
  return t.shadowRoot || t.attachShadow({
    mode: "open"
  });
}
var bn = /* @__PURE__ */ new Map([["align-self", "-ms-grid-row-align"], ["color-adjust", "-webkit-print-color-adjust"], ["column-gap", "grid-column-gap"], ["forced-color-adjust", "-ms-high-contrast-adjust"], ["gap", "grid-gap"], ["grid-template-columns", "-ms-grid-columns"], ["grid-template-rows", "-ms-grid-rows"], ["justify-self", "-ms-grid-column-align"], ["margin-inline-end", "-webkit-margin-end"], ["margin-inline-start", "-webkit-margin-start"], ["mask-border", "-webkit-mask-box-image"], ["mask-border-outset", "-webkit-mask-box-image-outset"], ["mask-border-slice", "-webkit-mask-box-image-slice"], ["mask-border-source", "-webkit-mask-box-image-source"], ["mask-border-repeat", "-webkit-mask-box-image-repeat"], ["mask-border-width", "-webkit-mask-box-image-width"], ["overflow-wrap", "word-wrap"], ["padding-inline-end", "-webkit-padding-end"], ["padding-inline-start", "-webkit-padding-start"], ["print-color-adjust", "color-adjust"], ["row-gap", "grid-row-gap"], ["scroll-margin-bottom", "scroll-snap-margin-bottom"], ["scroll-margin-left", "scroll-snap-margin-left"], ["scroll-margin-right", "scroll-snap-margin-right"], ["scroll-margin-top", "scroll-snap-margin-top"], ["scroll-margin", "scroll-snap-margin"], ["text-combine-upright", "-ms-text-combine-horizontal"]]);
function yn(t) {
  return bn.get(t);
}
function vn(t) {
  var e = /^(?:(text-(?:decoration$|e|or|si)|back(?:ground-cl|d|f)|box-d|mask(?:$|-[ispro]|-cl)|pr|hyphena|flex-d)|(tab-|column(?!-s)|text-align-l)|(ap)|u|hy)/i.exec(t);
  return e ? e[1] ? 1 : e[2] ? 2 : e[3] ? 3 : 5 : 0;
}
function wn(t, e) {
  var r = /^(?:(pos)|(cli)|(background-i)|(flex(?:$|-b)|(?:max-|min-)?(?:block-s|inl|he|widt))|dis)/i.exec(t);
  return r ? r[1] ? /^sti/i.test(e) ? 1 : 0 : r[2] ? /^pat/i.test(e) ? 1 : 0 : r[3] ? /^image-/i.test(e) ? 1 : 0 : r[4] ? e[3] === "-" ? 2 : 0 : /^(?:inline-)?grid$/i.test(e) ? 4 : 0 : 0;
}
let xn = [
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
function $n() {
  return ({ stringify: t }) => ({
    stringify(e, r, i) {
      let n = "", o = yn(e);
      o && (n += t(o, r, i) + ";");
      let s = vn(e), a = wn(e, r);
      for (let l of xn)
        s & l[1] && (n += t(l[0] + e, r, i) + ";"), a & l[1] && (n += t(e, l[0] + r, i) + ";");
      return n + t(e, r, i);
    }
  });
}
let _t = {
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
    .../* @__PURE__ */ U(4, "rem", 4, 0.5, 0.5),
    // 0.5: '0.125rem',
    // 1: '0.25rem',
    // 1.5: '0.375rem',
    // 2: '0.5rem',
    // 2.5: '0.625rem',
    // 3: '0.75rem',
    // 3.5: '0.875rem',
    // 4: '1rem',
    .../* @__PURE__ */ U(12, "rem", 4, 5),
    // 5: '1.25rem',
    // 6: '1.5rem',
    // 7: '1.75rem',
    // 8: '2rem',
    // 9: '2.25rem',
    // 10: '2.5rem',
    // 11: '2.75rem',
    // 12: '3rem',
    14: "3.5rem",
    .../* @__PURE__ */ U(64, "rem", 4, 16, 4),
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
  backdropBlur: /* @__PURE__ */ w("blur"),
  backdropBrightness: /* @__PURE__ */ w("brightness"),
  backdropContrast: /* @__PURE__ */ w("contrast"),
  backdropGrayscale: /* @__PURE__ */ w("grayscale"),
  backdropHueRotate: /* @__PURE__ */ w("hueRotate"),
  backdropInvert: /* @__PURE__ */ w("invert"),
  backdropOpacity: /* @__PURE__ */ w("opacity"),
  backdropSaturate: /* @__PURE__ */ w("saturate"),
  backdropSepia: /* @__PURE__ */ w("sepia"),
  backgroundColor: /* @__PURE__ */ w("colors"),
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
  backgroundOpacity: /* @__PURE__ */ w("opacity"),
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
    .../* @__PURE__ */ U(200, "", 100, 0, 50),
    // 0: '0',
    // 50: '.5',
    // 150: '1.5',
    // 200: '2',
    .../* @__PURE__ */ U(110, "", 100, 90, 5),
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
  borderOpacity: /* @__PURE__ */ w("opacity"),
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
  borderSpacing: /* @__PURE__ */ w("spacing"),
  borderWidth: {
    DEFAULT: "1px",
    .../* @__PURE__ */ W(8, "px")
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
  boxShadowColor: w("colors"),
  // container: {},
  // cursor: {
  //   // Default values are handled by plugin
  // },
  caretColor: /* @__PURE__ */ w("colors"),
  accentColor: ({ theme: t }) => ({
    auto: "auto",
    ...t("colors")
  }),
  contrast: {
    .../* @__PURE__ */ U(200, "", 100, 0, 50),
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
  divideColor: /* @__PURE__ */ w("borderColor"),
  divideOpacity: /* @__PURE__ */ w("borderOpacity"),
  divideWidth: /* @__PURE__ */ w("borderWidth"),
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
    ...ye(2, 6),
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
    ...ye(12, 12),
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
  gap: /* @__PURE__ */ w("spacing"),
  gradientColorStops: /* @__PURE__ */ w("colors"),
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
    ...ye(2, 6),
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
    ...ye(2, 4),
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
    .../* @__PURE__ */ U(10, "rem", 4, 3),
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
    .../* @__PURE__ */ U(100, "", 100, 0, 10),
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
  padding: /* @__PURE__ */ w("spacing"),
  placeholderColor: /* @__PURE__ */ w("colors"),
  placeholderOpacity: /* @__PURE__ */ w("opacity"),
  outlineColor: /* @__PURE__ */ w("colors"),
  outlineOffset: /* @__PURE__ */ W(8, "px"),
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',,
  outlineWidth: /* @__PURE__ */ W(8, "px"),
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',,
  ringColor: ({ theme: t }) => ({
    ...t("colors"),
    DEFAULT: "#3b82f6"
  }),
  ringOffsetColor: /* @__PURE__ */ w("colors"),
  ringOffsetWidth: /* @__PURE__ */ W(8, "px"),
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
    .../* @__PURE__ */ W(8, "px")
  },
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',
  rotate: {
    .../* @__PURE__ */ W(2, "deg"),
    // 0: '0deg',
    // 1: '1deg',
    // 2: '2deg',
    .../* @__PURE__ */ W(12, "deg", 3),
    // 3: '3deg',
    // 6: '6deg',
    // 12: '12deg',
    .../* @__PURE__ */ W(180, "deg", 45)
  },
  // 45: '45deg',
  // 90: '90deg',
  // 180: '180deg',
  saturate: /* @__PURE__ */ U(200, "", 100, 0, 50),
  // 0: '0',
  // 50: '.5',
  // 100: '1',
  // 150: '1.5',
  // 200: '2',
  scale: {
    .../* @__PURE__ */ U(150, "", 100, 0, 50),
    // 0: '0',
    // 50: '.5',
    // 150: '1.5',
    .../* @__PURE__ */ U(110, "", 100, 90, 5),
    // 90: '.9',
    // 95: '.95',
    // 100: '1',
    // 105: '1.05',
    // 110: '1.1',
    75: "0.75",
    125: "1.25"
  },
  scrollMargin: /* @__PURE__ */ w("spacing"),
  scrollPadding: /* @__PURE__ */ w("spacing"),
  sepia: {
    0: "0",
    DEFAULT: "100%"
  },
  skew: {
    .../* @__PURE__ */ W(2, "deg"),
    // 0: '0deg',
    // 1: '1deg',
    // 2: '2deg',
    .../* @__PURE__ */ W(12, "deg", 3)
  },
  // 3: '3deg',
  // 6: '6deg',
  // 12: '12deg',
  space: /* @__PURE__ */ w("spacing"),
  stroke: ({ theme: t }) => ({
    ...t("colors"),
    none: "none"
  }),
  strokeWidth: /* @__PURE__ */ U(2),
  // 0: '0',
  // 1: '1',
  // 2: '2',,
  textColor: /* @__PURE__ */ w("colors"),
  textDecorationColor: /* @__PURE__ */ w("colors"),
  textDecorationThickness: {
    "from-font": "from-font",
    auto: "auto",
    .../* @__PURE__ */ W(8, "px")
  },
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',
  textUnderlineOffset: {
    auto: "auto",
    .../* @__PURE__ */ W(8, "px")
  },
  // 0: '0px',
  // 1: '1px',
  // 2: '2px',
  // 4: '4px',
  // 8: '8px',
  textIndent: /* @__PURE__ */ w("spacing"),
  textOpacity: /* @__PURE__ */ w("opacity"),
  // transformOrigin: {
  //   // The following are already handled by the plugin:
  //   // center, right, left, bottom, top
  //   // 'bottom-10px-right-20px' -> bottom 10px right 20px
  // },
  transitionDuration: ({ theme: t }) => ({
    ...t("durations"),
    DEFAULT: "150ms"
  }),
  transitionDelay: /* @__PURE__ */ w("durations"),
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
    ...ye(2, 4),
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
    .../* @__PURE__ */ U(50, "", 1, 0, 10),
    // 0: '0',
    // 10: '10',
    // 20: '20',
    // 30: '30',
    // 40: '40',
    // 50: '50',
    auto: "auto"
  }
};
function ye(t, e) {
  let r = {};
  do
    for (var i = 1; i < t; i++) r[`${i}/${t}`] = Number((i / t * 100).toFixed(6)) + "%";
  while (++t <= e);
  return r;
}
function W(t, e, r = 0) {
  let i = {};
  for (; r <= t; r = 2 * r || 1) i[r] = r + e;
  return i;
}
function U(t, e = "", r = 1, i = 0, n = 1, o = {}) {
  for (; i <= t; i += n) o[i] = i / r + e;
  return o;
}
function w(t) {
  return ({ theme: e }) => e(t);
}
let Sn = {
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
    fontFamily: `theme(fontFamily.sans, ${_t.fontFamily.sans})`,
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
    fontFamily: `theme(fontFamily.mono, ${_t.fontFamily.mono})`,
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
}, kn = [
  /* arbitrary properties: [paint-order:markers] */
  f("\\[([-\\w]+):(.+)]", ({ 1: t, 2: e }, r) => ({
    "@layer overrides": {
      "&": {
        [t]: X(`[${e}]`, "", r)
      }
    }
  })),
  /* Styling based on parent and peer state */
  f("(group|peer)([~/][^-[]+)?", ({ input: t }, { h: e }) => [
    {
      c: e(t)
    }
  ]),
  /* LAYOUT */
  h("aspect-", "aspectRatio"),
  f("container", (t, { theme: e }) => {
    let { screens: r = e("screens"), center: i, padding: n } = e("container"), o = {
      width: "100%",
      marginRight: i && "auto",
      marginLeft: i && "auto",
      ...s("xs")
    };
    for (let a in r) {
      let l = r[a];
      typeof l == "string" && (o[Tt(l)] = {
        "&": {
          maxWidth: l,
          ...s(a)
        }
      });
    }
    return o;
    function s(a) {
      let l = n && (typeof n == "string" ? n : n[a] || n.DEFAULT);
      if (l) return {
        paddingRight: l,
        paddingLeft: l
      };
    }
  }),
  // Content
  h("content-", "content", ({ _: t }) => ({
    "--tw-content": t,
    content: "var(--tw-content)"
  })),
  // Box Decoration Break
  f("(?:box-)?decoration-(slice|clone)", "boxDecorationBreak"),
  // Box Sizing
  f("box-(border|content)", "boxSizing", ({ 1: t }) => t + "-box"),
  // Display
  f("hidden", {
    display: "none"
  }),
  // Table Layout
  f("table-(auto|fixed)", "tableLayout"),
  f([
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
  f("isolate", "isolation"),
  // Object Fit
  f("object-(contain|cover|fill|none|scale-down)", "objectFit"),
  // Object Position
  h("object-", "objectPosition"),
  f("object-(top|bottom|center|(left|right)(-(top|bottom))?)", "objectPosition", Me),
  // Overscroll Behavior
  f("overscroll(-[xy])?-(auto|contain|none)", ({ 1: t = "", 2: e }) => ({
    ["overscroll-behavior" + t]: e
  })),
  // Position
  f("(static|fixed|absolute|relative|sticky)", "position"),
  // Top / Right / Bottom / Left
  h("-?inset(-[xy])?(?:$|-)", "inset", ({ 1: t, _: e }) => ({
    top: t != "-x" && e,
    right: t != "-y" && e,
    bottom: t != "-x" && e,
    left: t != "-y" && e
  })),
  h("-?(top|bottom|left|right)(?:$|-)", "inset"),
  // Visibility
  f("(visible|collapse)", "visibility"),
  f("invisible", {
    visibility: "hidden"
  }),
  // Z-Index
  h("-?z-", "zIndex"),
  /* FLEXBOX */
  // Flex Direction
  f("flex-((row|col)(-reverse)?)", "flexDirection", cr),
  f("flex-(wrap|wrap-reverse|nowrap)", "flexWrap"),
  h("(flex-(?:grow|shrink))(?:$|-)"),
  /*, 'flex-grow' | flex-shrink */
  h("(flex)-"),
  /*, 'flex' */
  h("grow(?:$|-)", "flexGrow"),
  h("shrink(?:$|-)", "flexShrink"),
  h("basis-", "flexBasis"),
  h("-?(order)-"),
  /*, 'order' */
  "-?(order)-(\\d+)",
  /* GRID */
  // Grid Template Columns
  h("grid-cols-", "gridTemplateColumns"),
  f("grid-cols-(\\d+)", "gridTemplateColumns", fr),
  // Grid Column Start / End
  h("col-", "gridColumn"),
  f("col-(span)-(\\d+)", "gridColumn", pr),
  h("col-start-", "gridColumnStart"),
  f("col-start-(auto|\\d+)", "gridColumnStart"),
  h("col-end-", "gridColumnEnd"),
  f("col-end-(auto|\\d+)", "gridColumnEnd"),
  // Grid Template Rows
  h("grid-rows-", "gridTemplateRows"),
  f("grid-rows-(\\d+)", "gridTemplateRows", fr),
  // Grid Row Start / End
  h("row-", "gridRow"),
  f("row-(span)-(\\d+)", "gridRow", pr),
  h("row-start-", "gridRowStart"),
  f("row-start-(auto|\\d+)", "gridRowStart"),
  h("row-end-", "gridRowEnd"),
  f("row-end-(auto|\\d+)", "gridRowEnd"),
  // Grid Auto Flow
  f("grid-flow-((row|col)(-dense)?)", "gridAutoFlow", (t) => Me(cr(t))),
  f("grid-flow-(dense)", "gridAutoFlow"),
  // Grid Auto Columns
  h("auto-cols-", "gridAutoColumns"),
  // Grid Auto Rows
  h("auto-rows-", "gridAutoRows"),
  // Gap
  h("gap-x(?:$|-)", "gap", "columnGap"),
  h("gap-y(?:$|-)", "gap", "rowGap"),
  h("gap(?:$|-)", "gap"),
  /* BOX ALIGNMENT */
  // Justify Items
  // Justify Self
  "(justify-(?:items|self))-",
  // Justify Content
  f("justify-", "justifyContent", dr),
  // Align Content
  // Align Items
  // Align Self
  f("(content|items|self)-", (t) => ({
    ["align-" + t[1]]: dr(t)
  })),
  // Place Content
  // Place Items
  // Place Self
  f("(place-(content|items|self))-", ({ 1: t, $$: e }) => ({
    [t]: ("wun".includes(e[3]) ? "space-" : "") + e
  })),
  /* SPACING */
  // Padding
  h("p([xytrbl])?(?:$|-)", "padding", ae("padding")),
  // Margin
  h("-?m([xytrbl])?(?:$|-)", "margin", ae("margin")),
  // Space Between
  h("-?space-(x|y)(?:$|-)", "space", ({ 1: t, _: e }) => ({
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
  f("space-(x|y)-reverse", ({ 1: t }) => ({
    "&>:not([hidden])~:not([hidden])": {
      [`--tw-space-${t}-reverse`]: "1"
    }
  })),
  /* SIZING */
  // Width
  h("w-", "width"),
  // Min-Width
  h("min-w-", "minWidth"),
  // Max-Width
  h("max-w-", "maxWidth"),
  // Height
  h("h-", "height"),
  // Min-Height
  h("min-h-", "minHeight"),
  // Max-Height
  h("max-h-", "maxHeight"),
  /* TYPOGRAPHY */
  // Font Weight
  h("font-", "fontWeight"),
  // Font Family
  h("font-", "fontFamily", ({ _: t }) => typeof (t = k(t))[1] == "string" ? {
    fontFamily: I(t)
  } : {
    fontFamily: I(t[0]),
    ...t[1]
  }),
  // Font Smoothing
  f("antialiased", {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale"
  }),
  f("subpixel-antialiased", {
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto"
  }),
  // Font Style
  f("italic", "fontStyle"),
  f("not-italic", {
    fontStyle: "normal"
  }),
  // Font Variant Numeric
  f("(ordinal|slashed-zero|(normal|lining|oldstyle|proportional|tabular)-nums|(diagonal|stacked)-fractions)", ({ 1: t, 2: e = "", 3: r }) => (
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
      ...J({
        "--tw-ordinal": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-slashed-zero": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-numeric-figure": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-numeric-spacing": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-numeric-fraction": "var(--tw-empty,/*!*/ /*!*/)"
      })
    }
  )),
  // Letter Spacing
  h("tracking-", "letterSpacing"),
  // Line Height
  h("leading-", "lineHeight"),
  // List Style Position
  f("list-(inside|outside)", "listStylePosition"),
  // List Style Type
  h("list-", "listStyleType"),
  f("list-", "listStyleType"),
  // Placeholder Opacity
  h("placeholder-opacity-", "placeholderOpacity", ({ _: t }) => ({
    "&::placeholder": {
      "--tw-placeholder-opacity": t
    }
  })),
  // Placeholder Color
  F("placeholder-", {
    property: "color",
    selector: "&::placeholder"
  }),
  // Text Alignment
  f("text-(left|center|right|justify|start|end)", "textAlign"),
  f("text-(ellipsis|clip)", "textOverflow"),
  // Text Opacity
  h("text-opacity-", "textOpacity", "--tw-text-opacity"),
  // Text Color
  F("text-", {
    property: "color"
  }),
  // Font Size
  h("text-", "fontSize", ({ _: t }) => typeof t == "string" ? {
    fontSize: t
  } : {
    fontSize: t[0],
    ...typeof t[1] == "string" ? {
      lineHeight: t[1]
    } : t[1]
  }),
  // Text Indent
  h("indent-", "textIndent"),
  // Text Decoration
  f("(overline|underline|line-through)", "textDecorationLine"),
  f("no-underline", {
    textDecorationLine: "none"
  }),
  // Text Underline offset
  h("underline-offset-", "textUnderlineOffset"),
  // Text Decoration Color
  F("decoration-", {
    section: "textDecorationColor",
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Text Decoration Thickness
  h("decoration-", "textDecorationThickness"),
  // Text Decoration Style
  f("decoration-", "textDecorationStyle"),
  // Text Transform
  f("(uppercase|lowercase|capitalize)", "textTransform"),
  f("normal-case", {
    textTransform: "none"
  }),
  // Text Overflow
  f("truncate", {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }),
  // Vertical Alignment
  f("align-", "verticalAlign"),
  // Whitespace
  f("whitespace-", "whiteSpace"),
  // Word Break
  f("break-normal", {
    wordBreak: "normal",
    overflowWrap: "normal"
  }),
  f("break-words", {
    overflowWrap: "break-word"
  }),
  f("break-all", {
    wordBreak: "break-all"
  }),
  f("break-keep", {
    wordBreak: "keep-all"
  }),
  // Caret Color
  F("caret-", {
    // section: 'caretColor',
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Accent Color
  F("accent-", {
    // section: 'accentColor',
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Gradient Color Stops
  f("bg-gradient-to-([trbl]|[tb][rl])", "backgroundImage", ({ 1: t }) => `linear-gradient(to ${re(t, " ")},var(--tw-gradient-stops))`),
  F("from-", {
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
  F("via-", {
    section: "gradientColorStops",
    opacityVariable: !1,
    opacitySection: "opacity"
  }, ({ _: t }) => ({
    "--tw-gradient-to": t.color({
      opacityValue: "0"
    }),
    "--tw-gradient-stops": `var(--tw-gradient-from),${t.value},var(--tw-gradient-to)`
  })),
  F("to-", {
    section: "gradientColorStops",
    property: "--tw-gradient-to",
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  /* BACKGROUNDS */
  // Background Attachment
  f("bg-(fixed|local|scroll)", "backgroundAttachment"),
  // Background Origin
  f("bg-origin-(border|padding|content)", "backgroundOrigin", ({ 1: t }) => t + "-box"),
  // Background Repeat
  f([
    "bg-(no-repeat|repeat(-[xy])?)",
    "bg-repeat-(round|space)"
  ], "backgroundRepeat"),
  // Background Blend Mode
  f("bg-blend-", "backgroundBlendMode"),
  // Background Clip
  f("bg-clip-(border|padding|content|text)", "backgroundClip", ({ 1: t }) => t + (t == "text" ? "" : "-box")),
  // Background Opacity
  h("bg-opacity-", "backgroundOpacity", "--tw-bg-opacity"),
  // Background Color
  // bg-${backgroundColor}/${backgroundOpacity}
  F("bg-", {
    section: "backgroundColor"
  }),
  // Background Image
  // supported arbitrary types are: length, color, angle, list
  h("bg-", "backgroundImage"),
  // Background Position
  h("bg-", "backgroundPosition"),
  f("bg-(top|bottom|center|(left|right)(-(top|bottom))?)", "backgroundPosition", Me),
  // Background Size
  h("bg-", "backgroundSize"),
  /* BORDERS */
  // Border Radius
  h("rounded(?:$|-)", "borderRadius"),
  h("rounded-([trbl]|[tb][rl])(?:$|-)", "borderRadius", ({ 1: t, _: e }) => {
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
      [`border-${re(r[0])}-radius`]: e,
      [`border-${re(r[1])}-radius`]: e
    };
  }),
  // Border Collapse
  f("border-(collapse|separate)", "borderCollapse"),
  // Border Opacity
  h("border-opacity(?:$|-)", "borderOpacity", "--tw-border-opacity"),
  // Border Style
  f("border-(solid|dashed|dotted|double|none)", "borderStyle"),
  // Border Spacing
  h("border-spacing(-[xy])?(?:$|-)", "borderSpacing", ({ 1: t, _: e }) => ({
    ...J({
      "--tw-border-spacing-x": "0",
      "--tw-border-spacing-y": "0"
    }),
    ["--tw-border-spacing" + (t || "-x")]: e,
    ["--tw-border-spacing" + (t || "-y")]: e,
    "border-spacing": "var(--tw-border-spacing-x) var(--tw-border-spacing-y)"
  })),
  // Border Color
  F("border-([xytrbl])-", {
    section: "borderColor"
  }, ae("border", "Color")),
  F("border-"),
  // Border Width
  h("border-([xytrbl])(?:$|-)", "borderWidth", ae("border", "Width")),
  h("border(?:$|-)", "borderWidth"),
  // Divide Opacity
  h("divide-opacity(?:$|-)", "divideOpacity", ({ _: t }) => ({
    "&>:not([hidden])~:not([hidden])": {
      "--tw-divide-opacity": t
    }
  })),
  // Divide Style
  f("divide-(solid|dashed|dotted|double|none)", ({ 1: t }) => ({
    "&>:not([hidden])~:not([hidden])": {
      borderStyle: t
    }
  })),
  // Divide Width
  f("divide-([xy]-reverse)", ({ 1: t }) => ({
    "&>:not([hidden])~:not([hidden])": {
      ["--tw-divide-" + t]: "1"
    }
  })),
  h("divide-([xy])(?:$|-)", "divideWidth", ({ 1: t, _: e }) => {
    let r = {
      x: "lr",
      y: "tb"
    }[t];
    return {
      "&>:not([hidden])~:not([hidden])": {
        [`--tw-divide-${t}-reverse`]: "0",
        [`border-${re(r[0])}Width`]: `calc(${e} * calc(1 - var(--tw-divide-${t}-reverse)))`,
        [`border-${re(r[1])}Width`]: `calc(${e} * var(--tw-divide-${t}-reverse))`
      }
    };
  }),
  // Divide Color
  F("divide-", {
    // section: $0.replace('-', 'Color') -> 'divideColor'
    property: "borderColor",
    // opacityVariable: '--tw-border-opacity',
    // opacitySection: section.replace('Color', 'Opacity') -> 'divideOpacity'
    selector: "&>:not([hidden])~:not([hidden])"
  }),
  // Ring Offset Opacity
  h("ring-opacity(?:$|-)", "ringOpacity", "--tw-ring-opacity"),
  // Ring Offset Color
  F("ring-offset-", {
    // section: 'ringOffsetColor',
    property: "--tw-ring-offset-color",
    opacityVariable: !1
  }),
  // opacitySection: section.replace('Color', 'Opacity') -> 'ringOffsetOpacity'
  // Ring Offset Width
  h("ring-offset(?:$|-)", "ringOffsetWidth", "--tw-ring-offset-width"),
  // Ring Inset
  f("ring-inset", {
    "--tw-ring-inset": "inset"
  }),
  // Ring Color
  F("ring-", {
    // section: 'ringColor',
    property: "--tw-ring-color"
  }),
  // opacityVariable: '--tw-ring-opacity',
  // opacitySection: section.replace('Color', 'Opacity') -> 'ringOpacity'
  // Ring Width
  h("ring(?:$|-)", "ringWidth", ({ _: t }, { theme: e }) => ({
    ...J({
      "--tw-ring-offset-shadow": "0 0 #0000",
      "--tw-ring-shadow": "0 0 #0000",
      "--tw-shadow": "0 0 #0000",
      "--tw-shadow-colored": "0 0 #0000",
      // Within own declaration to have the defaults above to be merged with defaults from shadow
      "&": {
        "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
        "--tw-ring-offset-width": e("ringOffsetWidth", "", "0px"),
        "--tw-ring-offset-color": Z(e("ringOffsetColor", "", "#fff")),
        "--tw-ring-color": Z(e("ringColor", "", "#93c5fd"), {
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
  F("shadow-", {
    section: "boxShadowColor",
    opacityVariable: !1,
    opacitySection: "opacity"
  }, ({ _: t }) => ({
    "--tw-shadow-color": t.value,
    "--tw-shadow": "var(--tw-shadow-colored)"
  })),
  // Box Shadow
  h("shadow(?:$|-)", "boxShadow", ({ _: t }) => ({
    ...J({
      "--tw-ring-offset-shadow": "0 0 #0000",
      "--tw-ring-shadow": "0 0 #0000",
      "--tw-shadow": "0 0 #0000",
      "--tw-shadow-colored": "0 0 #0000"
    }),
    "--tw-shadow": I(t),
    // replace all colors with reference to --tw-shadow-colored
    // this matches colors after non-comma char (keyword, offset) before comma or the end
    "--tw-shadow-colored": I(t).replace(/([^,]\s+)(?:#[a-f\d]+|(?:(?:hsl|rgb)a?|hwb|lab|lch|color|var)\(.+?\)|[a-z]+)(,|$)/g, "$1var(--tw-shadow-color)$2"),
    boxShadow: "var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)"
  })),
  // Opacity
  h("(opacity)-"),
  /*, 'opacity' */
  // Mix Blend Mode
  f("mix-blend-", "mixBlendMode"),
  /* FILTERS */
  ...ur(),
  ...ur("backdrop-"),
  /* TRANSITIONS AND ANIMATION */
  // Transition Property
  h("transition(?:$|-)", "transitionProperty", (t, { theme: e }) => ({
    transitionProperty: I(t),
    transitionTimingFunction: t._ == "none" ? void 0 : I(e("transitionTimingFunction", "")),
    transitionDuration: t._ == "none" ? void 0 : I(e("transitionDuration", ""))
  })),
  // Transition Duration
  h("duration(?:$|-)", "transitionDuration", "transitionDuration", I),
  // Transition Timing Function
  h("ease(?:$|-)", "transitionTimingFunction", "transitionTimingFunction", I),
  // Transition Delay
  h("delay(?:$|-)", "transitionDelay", "transitionDelay", I),
  h("animate(?:$|-)", "animation", (t, { theme: e, h: r, e: i }) => {
    let n = I(t), o = n.split(" "), s = e("keyframes", o[0]);
    return s ? {
      ["@keyframes " + (o[0] = i(r(o[0])))]: s,
      animation: o.join(" ")
    } : {
      animation: n
    };
  }),
  /* TRANSFORMS */
  // Transform
  "(transform)-(none)",
  f("transform", bt),
  f("transform-(cpu|gpu)", ({ 1: t }) => ({
    "--tw-transform": Zr(t == "gpu")
  })),
  // Scale
  h("scale(-[xy])?-", "scale", ({ 1: t, _: e }) => ({
    ["--tw-scale" + (t || "-x")]: e,
    ["--tw-scale" + (t || "-y")]: e,
    ...bt()
  })),
  // Rotate
  h("-?(rotate)-", "rotate", lt),
  // Translate
  h("-?(translate-[xy])-", "translate", lt),
  // Skew
  h("-?(skew-[xy])-", "skew", lt),
  // Transform Origin
  f("origin-(center|((top|bottom)(-(left|right))?)|left|right)", "transformOrigin", Me),
  /* INTERACTIVITY */
  // Appearance
  "(appearance)-",
  // Columns
  h("(columns)-"),
  /*, 'columns' */
  "(columns)-(\\d+)",
  // Break Before, After and Inside
  "(break-(?:before|after|inside))-",
  // Cursor
  h("(cursor)-"),
  /*, 'cursor' */
  "(cursor)-",
  // Scroll Snap Type
  f("snap-(none)", "scroll-snap-type"),
  f("snap-(x|y|both)", ({ 1: t }) => ({
    ...J({
      "--tw-scroll-snap-strictness": "proximity"
    }),
    "scroll-snap-type": t + " var(--tw-scroll-snap-strictness)"
  })),
  f("snap-(mandatory|proximity)", "--tw-scroll-snap-strictness"),
  // Scroll Snap Align
  f("snap-(?:(start|end|center)|align-(none))", "scroll-snap-align"),
  // Scroll Snap Stop
  f("snap-(normal|always)", "scroll-snap-stop"),
  f("scroll-(auto|smooth)", "scroll-behavior"),
  // Scroll Margin
  // Padding
  h("scroll-p([xytrbl])?(?:$|-)", "padding", ae("scroll-padding")),
  // Margin
  h("-?scroll-m([xytrbl])?(?:$|-)", "scroll-margin", ae("scroll-margin")),
  // Touch Action
  f("touch-(auto|none|manipulation)", "touch-action"),
  f("touch-(pinch-zoom|pan-(?:(x|left|right)|(y|up|down)))", ({ 1: t, 2: e, 3: r }) => ({
    ...J({
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
  f("outline-none", {
    outline: "2px solid transparent",
    "outline-offset": "2px"
  }),
  f("outline", {
    outlineStyle: "solid"
  }),
  f("outline-(dashed|dotted|double)", "outlineStyle"),
  // Outline Offset
  h("-?(outline-offset)-"),
  /*, 'outlineOffset'*/
  // Outline Color
  F("outline-", {
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Outline Width
  h("outline-", "outlineWidth"),
  // Pointer Events
  "(pointer-events)-",
  // Will Change
  h("(will-change)-"),
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
  f("select-(none|text|all|auto)", "userSelect"),
  /* SVG */
  // Fill, Stroke
  F("fill-", {
    section: "fill",
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  F("stroke-", {
    section: "stroke",
    opacityVariable: !1,
    opacitySection: "opacity"
  }),
  // Stroke Width
  h("stroke-", "strokeWidth"),
  /* ACCESSIBILITY */
  // Screen Readers
  f("sr-only", {
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
  f("not-sr-only", {
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
function Me(t) {
  return (typeof t == "string" ? t : t[1]).replace(/-/g, " ").trim();
}
function cr(t) {
  return (typeof t == "string" ? t : t[1]).replace("col", "column");
}
function re(t, e = "-") {
  let r = [];
  for (let i of t) r.push({
    t: "top",
    r: "right",
    b: "bottom",
    l: "left"
  }[i]);
  return r.join(e);
}
function I(t) {
  return t && "" + (t._ || t);
}
function dr({ $$: t }) {
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
function ae(t, e = "") {
  return ({ 1: r, _: i }) => {
    let n = {
      x: "lr",
      y: "tb"
    }[r] || r + r;
    return n ? {
      ...Le(t + "-" + re(n[0]) + e, i),
      ...Le(t + "-" + re(n[1]) + e, i)
    } : Le(t + e, i);
  };
}
function ur(t = "") {
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
    ...J(r),
    // add default filter which allows standalone usage
    [`${t}filter`]: e.map((i) => `var(--tw-${t}${i})`).join(" ")
  }, [
    `(${t}filter)-(none)`,
    f(`${t}filter`, r),
    ...e.map((i) => h(
      // hue-rotate can be negated
      `${i[0] == "h" ? "-?" : ""}(${t}${i})(?:$|-)`,
      i,
      ({ 1: n, _: o }) => ({
        [`--tw-${n}`]: k(o).map((s) => `${i}(${s})`).join(" "),
        ...r
      })
    ))
  ];
}
function lt({ 1: t, _: e }) {
  return {
    ["--tw-" + t]: e,
    ...bt()
  };
}
function bt() {
  return {
    ...J({
      "--tw-translate-x": "0",
      "--tw-translate-y": "0",
      "--tw-rotate": "0",
      "--tw-skew-x": "0",
      "--tw-skew-y": "0",
      "--tw-scale-x": "1",
      "--tw-scale-y": "1",
      "--tw-transform": Zr()
    }),
    transform: "var(--tw-transform)"
  };
}
function Zr(t) {
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
function pr({ 1: t, 2: e }) {
  return `${t} ${e} / ${t} ${e}`;
}
function fr({ 1: t }) {
  return `repeat(${t},minmax(0,1fr))`;
}
function J(t) {
  return {
    "@layer defaults": {
      "*,::before,::after": t,
      "::backdrop": t
    }
  };
}
let An = [
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
    X(e, "", r) || // default handling
    `${e}="true"`}]`
  ],
  /* Styling based on parent and peer state */
  // Groups classes like: group-focus and group-hover
  // these need to add a marker selector with the pseudo class
  // => '.group:focus .group-focus:selector'
  [
    "((group|peer)(~[^-[]+)?)(-\\[(.+)]|[-[].+?)(\\/.+)?",
    ({ 2: t, 3: e = "", 4: r, 5: i = "", 6: n = e }, { e: o, h: s, v: a }) => {
      let l = Ae(i) || (r[0] == "[" ? r : a(r.slice(1)));
      return `${(l.includes("&") ? l : "&" + l).replace(/&/g, `:merge(.${o(s(t + n))})`)}${t[0] == "p" ? "~" : " "}&`;
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
      if (t && (t = e.theme("supports", t) || X(t, "", e)), t) return t.includes(":") || (t += ":var(--tw)"), /^\w*\s*\(/.test(t) || (t = `(${t})`), // Chrome has a bug where `(condtion1)or(condition2)` is not valid
      // But `(condition1) or (condition2)` is supported.
      `@supports ${t.replace(/\b(and|or|not)\b/g, " $1 ").trim()}`;
    }
  ],
  [
    "max-",
    ({ $$: t }, e) => {
      if (t && (t = e.theme("screens", t) || X(t, "", e)), typeof t == "string") return `@media not all and (min-width:${t})`;
    }
  ],
  [
    "min-",
    ({ $$: t }, e) => (t && (t = X(t, "", e)), t && `@media (min-width:${t})`)
  ],
  // Arbitrary variants
  [
    /^\[(.+)]$/,
    ({ 1: t }) => /[&@]/.test(t) && Ae(t).replace(/[}]+$/, "").split("{")
  ]
];
function Cn({ colors: t, disablePreflight: e } = {}) {
  return {
    // allow other preflight to run
    preflight: e ? void 0 : Sn,
    theme: {
      ..._t,
      colors: {
        inherit: "inherit",
        current: "currentColor",
        transparent: "transparent",
        black: "#000",
        white: "#fff",
        ...t
      }
    },
    variants: An,
    rules: kn,
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
let En = {
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
}, Fn = {
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
}, On = {
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
}, Tn = {
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
}, Pn = {
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
}, jn = {
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
}, Mn = {
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
}, Rn = {
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
}, zn = {
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
}, Un = {
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
}, Ln = {
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
}, Dn = {
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
}, Hn = {
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
}, Wn = {
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
}, Nn = {
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
}, In = {
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
}, Vn = {
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
}, Bn = {
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
}, qn = {
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
}, Gn = {
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
}, Jn = {
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
}, Yn = {
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
}, Qn = {
  __proto__: null,
  slate: En,
  gray: Fn,
  zinc: On,
  neutral: Tn,
  stone: Pn,
  red: jn,
  orange: Mn,
  amber: Rn,
  yellow: zn,
  lime: Un,
  green: Ln,
  emerald: Dn,
  teal: Hn,
  cyan: Wn,
  sky: Nn,
  blue: In,
  indigo: Vn,
  violet: Bn,
  purple: qn,
  fuchsia: Gn,
  pink: Jn,
  rose: Yn
};
function Zn({ disablePreflight: t } = {}) {
  return Cn({
    colors: Qn,
    disablePreflight: t
  });
}
const Xr = Jr({
  presets: [$n(), Zn()]
}), Xn = Qr(Xr);
function Kn({ ignoreValue: t = !1 }) {
  const e = Xi(() => {
    this.dispatchEvent(new CustomEvent("on-click", {
      detail: { message: "Hello from child" },
      bubbles: !0,
      composed: !1
    }));
  }, []);
  return Q`
    <button 
      class="bg-none border border-gray-400 rounded p-1 flex items-center justify-center w-6 h-6 text-gray-600 transition ${t ? "bg-red-100 border-red-400 text-red-600" : "hover:bg-gray-100 hover:border-gray-500"}"
      @click=${e}
      title="${t ? "Enable filtering" : "Ignore category"}"
    >
      ${t ? Q`
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
          <path d="M3 13C6.6 5 17.4 5 21 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      ` : Q`
        <?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      `}
    </button>
  `;
}
const eo = Xn(tn(Kn, { observedAttributes: ["ignoreValue"] }));
customElements.define("portfolio-toggle", eo);
class to {
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
      return Object.entries(r).forEach(([n, o]) => {
        const s = n.toLowerCase(), a = Array.isArray(o) ? o : [o];
        i[s] = a.map((l) => String(l).toLowerCase()).filter((l) => l.length > 0);
      }), i;
    } catch {
      return { category: e.split(/[,;\s]+/).map((n) => n.trim().toLowerCase()).filter((n) => n.length > 0) };
    }
  }
  /**
   * Initialize filter categories from parsed content
   */
  initializeFromContent(e) {
    const r = /* @__PURE__ */ new Map();
    e.forEach((o) => {
      Object.entries(o).forEach(([s, a]) => {
        r.has(s) || r.set(s, /* @__PURE__ */ new Set()), a.forEach((l) => {
          r.get(s).add(l);
        });
      });
    });
    const i = Array.from(r.entries()).map(([o, s]) => ({
      name: o,
      label: this.formatLabel(o),
      ignored: !1,
      // Start with all categories not ignored
      options: Array.from(s).sort().map((a) => ({
        value: a,
        label: this.formatLabel(a),
        active: !0
        // Start with all filters active
      }))
    })).sort((o, s) => o.label.localeCompare(s.label)), n = {};
    return i.forEach((o) => {
      n[o.name] = o.options.map((s) => s.value);
    }), this.state = { categories: i, activeFilters: n }, this.getState();
  }
  /**
   * Handle filter toggle
   */
  toggleFilter(e) {
    const { categoryName: r, filterValue: i, isActive: n } = e;
    return this.state.activeFilters[r] || (this.state.activeFilters[r] = []), n ? this.state.activeFilters[r].includes(i) || (this.state.activeFilters[r] = [...this.state.activeFilters[r], i]) : this.state.activeFilters[r] = this.state.activeFilters[r].filter((o) => o !== i), this.state.categories = this.state.categories.map((o) => ({
      ...o,
      options: o.options.map((s) => ({
        ...s,
        active: this.state.activeFilters[o.name]?.includes(s.value) || !1
      }))
    })), this.getState();
  }
  /**
   * Evaluate if an element should be shown based on its filters
   */
  evaluateElement(e) {
    if (!Object.values(this.state.activeFilters).some((s) => s.length > 0))
      return {
        shouldShow: !1,
        matchedCategories: [],
        unmatchedCategories: Object.keys(this.state.activeFilters)
      };
    const i = [], n = [];
    return {
      shouldShow: Object.entries(this.state.activeFilters).every(([s, a]) => {
        if (this.state.categories.find((c) => c.name === s)?.ignored)
          return !0;
        if (!a || a.length === 0)
          return n.push(s), !1;
        const d = e[s];
        if (!d || d.length === 0)
          return n.push(s), !1;
        const u = d.some((c) => a.includes(c));
        return u ? i.push(s) : n.push(s), u;
      }),
      matchedCategories: i,
      unmatchedCategories: n
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
    const e = this.state.categories.length, r = this.state.categories.reduce((o, s) => o + s.options.length, 0), i = Object.values(this.state.activeFilters).reduce((o, s) => o + s.length, 0), n = Object.values(this.state.activeFilters).filter((o) => o.length > 0).length;
    return {
      totalCategories: e,
      totalOptions: r,
      activeOptions: i,
      categoriesWithActiveFilters: n,
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
var ro = Object.defineProperty, io = Object.getOwnPropertyDescriptor, Qe = (t, e, r, i) => {
  for (var n = i > 1 ? void 0 : i ? io(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (i ? s(e, r, n) : s(n)) || n);
  return i && n && ro(e, r, n), n;
};
const no = Qr(Xr);
let Ce = class extends ue {
  constructor() {
    super(...arguments), this.filterAttribute = "data-filter", this.filterLabel = "Filter by", this.filterStateManager = new to(), this.filterState = { categories: [], activeFilters: {} };
  }
  connectedCallback() {
    super.connectedCallback(), this._initializeFilters(), this._applyFilters();
  }
  firstUpdated(t) {
    super.firstUpdated(t), this._initializeFilters(), this._applyFilters();
  }
  _handleSlotChange() {
    this._initializeFilters(), this._applyFilters();
  }
  _initializeFilters() {
    const t = this.querySelectorAll(`[${this.filterAttribute}]`);
    console.log("Found elements with filter attribute:", t.length);
    const e = Array.from(t).map((r) => {
      const i = r.getAttribute(this.filterAttribute);
      return i && console.log("Filter value:", i), i ? this.filterStateManager.parseFilterAttribute(i) : null;
    }).filter((r) => r !== null);
    console.log("Parsed filters array:", e), this.filterState = this.filterStateManager.initializeFromContent(e), console.log("Filter state after initialization:", this.filterState);
  }
  _handleFilterChange(t) {
    const e = t.target, [r, i] = e.value.split(":"), n = e.checked, o = {
      categoryName: r,
      filterValue: i,
      isActive: n
    };
    this.filterState = this.filterStateManager.toggleFilter(o), this._applyFilters(), this.requestUpdate();
  }
  _handleIgnoreToggle(t) {
    this.filterState = this.filterStateManager.toggleIgnoreCategory(t), this._applyFilters(), this.requestUpdate();
  }
  _applyFilters() {
    this.querySelectorAll(`[${this.filterAttribute}]`).forEach((e) => {
      const r = e.getAttribute(this.filterAttribute);
      let i;
      if (r) {
        const n = this.filterStateManager.parseFilterAttribute(r);
        i = this.filterStateManager.evaluateElement(n).shouldShow;
      } else
        i = this.filterStateManager.evaluateElementWithoutFilters();
      e.style.display = i ? "" : "none";
    });
  }
  render() {
    return Q`
      <!-- Filters container -->
      ${this.filterState.categories.length > 0 ? Q`
        <div class="max-w-7xl mx-auto mb-8 px-4">
          <div class="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg border border-gray-300">
            ${this.filterState.categories.map((t) => Q`
              <div class="relative py-2 border-b border-gray-300 last:border-b-0">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-semibold text-gray-800 whitespace-nowrap ${t.ignored ? "opacity-50 pointer-events-none" : ""}">${t.label}:</span>
                  <portfolio-toggle .ignoreValue=${t.ignored} @on-click=${() => this._handleIgnoreToggle(t.name)}></portfolio-toggle>
                </div>
                <div class="flex flex-wrap items-center gap-4 ${t.ignored ? "opacity-50 pointer-events-none" : ""}">
                  <div class="flex gap-4 flex-wrap">
                    ${t.options.map((e) => Q`
                      <div class="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          id="filter-${t.name}-${e.value}" 
                          value="${t.name}:${e.value}"
                          .checked=${e.active}
                          @change=${this._handleFilterChange}
                        >
                        <label for="filter-${t.name}-${e.value}" class="text-sm text-gray-600 cursor-pointer select-none">${e.label}</label>
                      </div>
                    `)}
                  </div>
                </div>
              </div>
            `)}
          </div>
        </div>
      ` : ""}

      <!-- Container for slotted content -->
      <div class="max-w-7xl mx-auto px-4 flex flex-wrap gap-6">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
};
Qe([
  Oe({ type: String })
], Ce.prototype, "filterAttribute", 2);
Qe([
  Oe({ type: String })
], Ce.prototype, "filterLabel", 2);
Qe([
  Oe({ type: Object })
], Ce.prototype, "filterState", 2);
Ce = Qe([
  Rr("portfolio-grid"),
  no
], Ce);
var je, $, Kr, ie, hr, ei, ti, ri, zt, yt, vt, Ee = {}, ii = [], oo = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Ze = Array.isArray;
function B(t, e) {
  for (var r in e) t[r] = e[r];
  return t;
}
function Ut(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function de(t, e, r) {
  var i, n, o, s = {};
  for (o in e) o == "key" ? i = e[o] : o == "ref" ? n = e[o] : s[o] = e[o];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? je.call(arguments, 2) : r), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) s[o] === void 0 && (s[o] = t.defaultProps[o]);
  return xe(t, s, i, n, null);
}
function xe(t, e, r, i, n) {
  var o = { type: t, props: e, key: r, ref: i, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: n ?? ++Kr, __i: -1, __u: 0 };
  return n == null && $.vnode != null && $.vnode(o), o;
}
function Xe(t) {
  return t.children;
}
function De(t, e) {
  this.props = t, this.context = e;
}
function he(t, e) {
  if (e == null) return t.__ ? he(t.__, t.__i + 1) : null;
  for (var r; e < t.__k.length; e++) if ((r = t.__k[e]) != null && r.__e != null) return r.__e;
  return typeof t.type == "function" ? he(t) : null;
}
function ni(t) {
  var e, r;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((r = t.__k[e]) != null && r.__e != null) {
      t.__e = t.__c.base = r.__e;
      break;
    }
    return ni(t);
  }
}
function gr(t) {
  (!t.__d && (t.__d = !0) && ie.push(t) && !Ge.__r++ || hr != $.debounceRendering) && ((hr = $.debounceRendering) || ei)(Ge);
}
function Ge() {
  for (var t, e, r, i, n, o, s, a = 1; ie.length; ) ie.length > a && ie.sort(ti), t = ie.shift(), a = ie.length, t.__d && (r = void 0, n = (i = (e = t).__v).__e, o = [], s = [], e.__P && ((r = B({}, i)).__v = i.__v + 1, $.vnode && $.vnode(r), Lt(e.__P, r, i, e.__n, e.__P.namespaceURI, 32 & i.__u ? [n] : null, o, n ?? he(i), !!(32 & i.__u), s), r.__v = i.__v, r.__.__k[r.__i] = r, ai(o, r, s), r.__e != n && ni(r)));
  Ge.__r = 0;
}
function oi(t, e, r, i, n, o, s, a, l, d, u) {
  var c, g, p, m, v, b, y = i && i.__k || ii, _ = e.length;
  for (l = so(r, e, y, l, _), c = 0; c < _; c++) (p = r.__k[c]) != null && (g = p.__i == -1 ? Ee : y[p.__i] || Ee, p.__i = c, b = Lt(t, p, g, n, o, s, a, l, d, u), m = p.__e, p.ref && g.ref != p.ref && (g.ref && Dt(g.ref, null, p), u.push(p.ref, p.__c || m, p)), v == null && m != null && (v = m), 4 & p.__u || g.__k === p.__k ? l = si(p, l, t) : typeof p.type == "function" && b !== void 0 ? l = b : m && (l = m.nextSibling), p.__u &= -7);
  return r.__e = v, l;
}
function so(t, e, r, i, n) {
  var o, s, a, l, d, u = r.length, c = u, g = 0;
  for (t.__k = new Array(n), o = 0; o < n; o++) (s = e[o]) != null && typeof s != "boolean" && typeof s != "function" ? (l = o + g, (s = t.__k[o] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? xe(null, s, null, null, null) : Ze(s) ? xe(Xe, { children: s }, null, null, null) : s.constructor == null && s.__b > 0 ? xe(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = t, s.__b = t.__b + 1, a = null, (d = s.__i = ao(s, r, l, c)) != -1 && (c--, (a = r[d]) && (a.__u |= 2)), a == null || a.__v == null ? (d == -1 && (n > u ? g-- : n < u && g++), typeof s.type != "function" && (s.__u |= 4)) : d != l && (d == l - 1 ? g-- : d == l + 1 ? g++ : (d > l ? g-- : g++, s.__u |= 4))) : t.__k[o] = null;
  if (c) for (o = 0; o < u; o++) (a = r[o]) != null && (2 & a.__u) == 0 && (a.__e == i && (i = he(a)), ci(a, a));
  return i;
}
function si(t, e, r) {
  var i, n;
  if (typeof t.type == "function") {
    for (i = t.__k, n = 0; i && n < i.length; n++) i[n] && (i[n].__ = t, e = si(i[n], e, r));
    return e;
  }
  t.__e != e && (e && t.type && !r.contains(e) && (e = he(t)), r.insertBefore(t.__e, e || null), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function ao(t, e, r, i) {
  var n, o, s = t.key, a = t.type, l = e[r];
  if (l === null && t.key == null || l && s == l.key && a == l.type && (2 & l.__u) == 0) return r;
  if (i > (l != null && (2 & l.__u) == 0 ? 1 : 0)) for (n = r - 1, o = r + 1; n >= 0 || o < e.length; ) {
    if (n >= 0) {
      if ((l = e[n]) && (2 & l.__u) == 0 && s == l.key && a == l.type) return n;
      n--;
    }
    if (o < e.length) {
      if ((l = e[o]) && (2 & l.__u) == 0 && s == l.key && a == l.type) return o;
      o++;
    }
  }
  return -1;
}
function mr(t, e, r) {
  e[0] == "-" ? t.setProperty(e, r ?? "") : t[e] = r == null ? "" : typeof r != "number" || oo.test(e) ? r : r + "px";
}
function Re(t, e, r, i, n) {
  var o, s;
  e: if (e == "style") if (typeof r == "string") t.style.cssText = r;
  else {
    if (typeof i == "string" && (t.style.cssText = i = ""), i) for (e in i) r && e in r || mr(t.style, e, "");
    if (r) for (e in r) i && r[e] == i[e] || mr(t.style, e, r[e]);
  }
  else if (e[0] == "o" && e[1] == "n") o = e != (e = e.replace(ri, "$1")), s = e.toLowerCase(), e = s in t || e == "onFocusOut" || e == "onFocusIn" ? s.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = r, r ? i ? r.u = i.u : (r.u = zt, t.addEventListener(e, o ? vt : yt, o)) : t.removeEventListener(e, o ? vt : yt, o);
  else {
    if (n == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t) try {
      t[e] = r ?? "";
      break e;
    } catch {
    }
    typeof r == "function" || (r == null || r === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && r == 1 ? "" : r));
  }
}
function _r(t) {
  return function(e) {
    if (this.l) {
      var r = this.l[e.type + t];
      if (e.t == null) e.t = zt++;
      else if (e.t < r.u) return;
      return r($.event ? $.event(e) : e);
    }
  };
}
function Lt(t, e, r, i, n, o, s, a, l, d) {
  var u, c, g, p, m, v, b, y, _, S, A, G, D, M, x, C, P, H = e.type;
  if (e.constructor != null) return null;
  128 & r.__u && (l = !!(32 & r.__u), o = [a = e.__e = r.__e]), (u = $.__b) && u(e);
  e: if (typeof H == "function") try {
    if (y = e.props, _ = "prototype" in H && H.prototype.render, S = (u = H.contextType) && i[u.__c], A = u ? S ? S.props.value : u.__ : i, r.__c ? b = (c = e.__c = r.__c).__ = c.__E : (_ ? e.__c = c = new H(y, A) : (e.__c = c = new De(y, A), c.constructor = H, c.render = co), S && S.sub(c), c.props = y, c.state || (c.state = {}), c.context = A, c.__n = i, g = c.__d = !0, c.__h = [], c._sb = []), _ && c.__s == null && (c.__s = c.state), _ && H.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = B({}, c.__s)), B(c.__s, H.getDerivedStateFromProps(y, c.__s))), p = c.props, m = c.state, c.__v = e, g) _ && H.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), _ && c.componentDidMount != null && c.__h.push(c.componentDidMount);
    else {
      if (_ && H.getDerivedStateFromProps == null && y !== p && c.componentWillReceiveProps != null && c.componentWillReceiveProps(y, A), !c.__e && c.shouldComponentUpdate != null && c.shouldComponentUpdate(y, c.__s, A) === !1 || e.__v == r.__v) {
        for (e.__v != r.__v && (c.props = y, c.state = c.__s, c.__d = !1), e.__e = r.__e, e.__k = r.__k, e.__k.some(function(N) {
          N && (N.__ = e);
        }), G = 0; G < c._sb.length; G++) c.__h.push(c._sb[G]);
        c._sb = [], c.__h.length && s.push(c);
        break e;
      }
      c.componentWillUpdate != null && c.componentWillUpdate(y, c.__s, A), _ && c.componentDidUpdate != null && c.__h.push(function() {
        c.componentDidUpdate(p, m, v);
      });
    }
    if (c.context = A, c.props = y, c.__P = t, c.__e = !1, D = $.__r, M = 0, _) {
      for (c.state = c.__s, c.__d = !1, D && D(e), u = c.render(c.props, c.state, c.context), x = 0; x < c._sb.length; x++) c.__h.push(c._sb[x]);
      c._sb = [];
    } else do
      c.__d = !1, D && D(e), u = c.render(c.props, c.state, c.context), c.state = c.__s;
    while (c.__d && ++M < 25);
    c.state = c.__s, c.getChildContext != null && (i = B(B({}, i), c.getChildContext())), _ && !g && c.getSnapshotBeforeUpdate != null && (v = c.getSnapshotBeforeUpdate(p, m)), C = u, u != null && u.type === Xe && u.key == null && (C = li(u.props.children)), a = oi(t, Ze(C) ? C : [C], e, r, i, n, o, s, a, l, d), c.base = e.__e, e.__u &= -161, c.__h.length && s.push(c), b && (c.__E = c.__ = null);
  } catch (N) {
    if (e.__v = null, l || o != null) if (N.then) {
      for (e.__u |= l ? 160 : 128; a && a.nodeType == 8 && a.nextSibling; ) a = a.nextSibling;
      o[o.indexOf(a)] = null, e.__e = a;
    } else for (P = o.length; P--; ) Ut(o[P]);
    else e.__e = r.__e, e.__k = r.__k;
    $.__e(N, e, r);
  }
  else o == null && e.__v == r.__v ? (e.__k = r.__k, e.__e = r.__e) : a = e.__e = lo(r.__e, e, r, i, n, o, s, l, d);
  return (u = $.diffed) && u(e), 128 & e.__u ? void 0 : a;
}
function ai(t, e, r) {
  for (var i = 0; i < r.length; i++) Dt(r[i], r[++i], r[++i]);
  $.__c && $.__c(e, t), t.some(function(n) {
    try {
      t = n.__h, n.__h = [], t.some(function(o) {
        o.call(n);
      });
    } catch (o) {
      $.__e(o, n.__v);
    }
  });
}
function li(t) {
  return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : Ze(t) ? t.map(li) : B({}, t);
}
function lo(t, e, r, i, n, o, s, a, l) {
  var d, u, c, g, p, m, v, b = r.props, y = e.props, _ = e.type;
  if (_ == "svg" ? n = "http://www.w3.org/2000/svg" : _ == "math" ? n = "http://www.w3.org/1998/Math/MathML" : n || (n = "http://www.w3.org/1999/xhtml"), o != null) {
    for (d = 0; d < o.length; d++) if ((p = o[d]) && "setAttribute" in p == !!_ && (_ ? p.localName == _ : p.nodeType == 3)) {
      t = p, o[d] = null;
      break;
    }
  }
  if (t == null) {
    if (_ == null) return document.createTextNode(y);
    t = document.createElementNS(n, _, y.is && y), a && ($.__m && $.__m(e, o), a = !1), o = null;
  }
  if (_ == null) b === y || a && t.data == y || (t.data = y);
  else {
    if (o = o && je.call(t.childNodes), b = r.props || Ee, !a && o != null) for (b = {}, d = 0; d < t.attributes.length; d++) b[(p = t.attributes[d]).name] = p.value;
    for (d in b) if (p = b[d], d != "children") {
      if (d == "dangerouslySetInnerHTML") c = p;
      else if (!(d in y)) {
        if (d == "value" && "defaultValue" in y || d == "checked" && "defaultChecked" in y) continue;
        Re(t, d, null, p, n);
      }
    }
    for (d in y) p = y[d], d == "children" ? g = p : d == "dangerouslySetInnerHTML" ? u = p : d == "value" ? m = p : d == "checked" ? v = p : a && typeof p != "function" || b[d] === p || Re(t, d, p, b[d], n);
    if (u) a || c && (u.__html == c.__html || u.__html == t.innerHTML) || (t.innerHTML = u.__html), e.__k = [];
    else if (c && (t.innerHTML = ""), oi(e.type == "template" ? t.content : t, Ze(g) ? g : [g], e, r, i, _ == "foreignObject" ? "http://www.w3.org/1999/xhtml" : n, o, s, o ? o[0] : r.__k && he(r, 0), a, l), o != null) for (d = o.length; d--; ) Ut(o[d]);
    a || (d = "value", _ == "progress" && m == null ? t.removeAttribute("value") : m != null && (m !== t[d] || _ == "progress" && !m || _ == "option" && m != b[d]) && Re(t, d, m, b[d], n), d = "checked", v != null && v != t[d] && Re(t, d, v, b[d], n));
  }
  return t;
}
function Dt(t, e, r) {
  try {
    if (typeof t == "function") {
      var i = typeof t.__u == "function";
      i && t.__u(), i && e == null || (t.__u = t(e));
    } else t.current = e;
  } catch (n) {
    $.__e(n, r);
  }
}
function ci(t, e, r) {
  var i, n;
  if ($.unmount && $.unmount(t), (i = t.ref) && (i.current && i.current != t.__e || Dt(i, null, e)), (i = t.__c) != null) {
    if (i.componentWillUnmount) try {
      i.componentWillUnmount();
    } catch (o) {
      $.__e(o, e);
    }
    i.base = i.__P = null;
  }
  if (i = t.__k) for (n = 0; n < i.length; n++) i[n] && ci(i[n], e, r || typeof t.type != "function");
  r || Ut(t.__e), t.__c = t.__ = t.__e = void 0;
}
function co(t, e, r) {
  return this.constructor(t, r);
}
function Ke(t, e, r) {
  var i, n, o, s;
  e == document && (e = document.documentElement), $.__ && $.__(t, e), n = (i = typeof r == "function") ? null : r && r.__k || e.__k, o = [], s = [], Lt(e, t = (!i && r || e).__k = de(Xe, null, [t]), n || Ee, Ee, e.namespaceURI, !i && r ? [r] : n ? null : e.firstChild ? je.call(e.childNodes) : null, o, !i && r ? r : n ? n.__e : e.firstChild, i, s), ai(o, t, s);
}
function di(t, e) {
  Ke(t, e, di);
}
function ui(t, e, r) {
  var i, n, o, s, a = B({}, t.props);
  for (o in t.type && t.type.defaultProps && (s = t.type.defaultProps), e) o == "key" ? i = e[o] : o == "ref" ? n = e[o] : a[o] = e[o] === void 0 && s != null ? s[o] : e[o];
  return arguments.length > 2 && (a.children = arguments.length > 3 ? je.call(arguments, 2) : r), xe(t.type, a, i || t.key, n || t.ref, null);
}
je = ii.slice, $ = { __e: function(t, e, r, i) {
  for (var n, o, s; e = e.__; ) if ((n = e.__c) && !n.__) try {
    if ((o = n.constructor) && o.getDerivedStateFromError != null && (n.setState(o.getDerivedStateFromError(t)), s = n.__d), n.componentDidCatch != null && (n.componentDidCatch(t, i || {}), s = n.__d), s) return n.__E = n;
  } catch (a) {
    t = a;
  }
  throw t;
} }, Kr = 0, De.prototype.setState = function(t, e) {
  var r;
  r = this.__s != null && this.__s != this.state ? this.__s : this.__s = B({}, this.state), typeof t == "function" && (t = t(B({}, r), this.props)), t && B(r, t), t != null && this.__v && (e && this._sb.push(e), gr(this));
}, De.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), gr(this));
}, De.prototype.render = Xe, ie = [], ei = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ti = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, Ge.__r = 0, ri = /(PointerCapture)$|Capture$/i, zt = 0, yt = _r(!1), vt = _r(!0);
var uo = 0;
function le(t, e, r, i, n, o) {
  e || (e = {});
  var s, a, l = e;
  if ("ref" in l) for (a in l = {}, e) a == "ref" ? s = e[a] : l[a] = e[a];
  var d = { type: t, props: l, key: r, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --uo, __i: -1, __u: 0, __source: n, __self: o };
  if (typeof t == "function" && (s = t.defaultProps)) for (a in s) l[a] === void 0 && (l[a] = s[a]);
  return $.vnode && $.vnode(d), d;
}
var wt, L, ct, br, yr = 0, pi = [], E = $, vr = E.__b, wr = E.__r, xr = E.diffed, $r = E.__c, Sr = E.unmount, kr = E.__;
function po(t, e) {
  E.__h && E.__h(L, t, yr || e), yr = 0;
  var r = L.__H || (L.__H = { __: [], __h: [] });
  return t >= r.__.length && r.__.push({}), r.__[t];
}
function fo(t, e) {
  var r = po(wt++, 7);
  return mo(r.__H, e) && (r.__ = t(), r.__H = e, r.__h = t), r.__;
}
function ho() {
  for (var t; t = pi.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(He), t.__H.__h.forEach(xt), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], E.__e(e, t.__v);
  }
}
E.__b = function(t) {
  L = null, vr && vr(t);
}, E.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), kr && kr(t, e);
}, E.__r = function(t) {
  wr && wr(t), wt = 0;
  var e = (L = t.__c).__H;
  e && (ct === L ? (e.__h = [], L.__h = [], e.__.forEach(function(r) {
    r.__N && (r.__ = r.__N), r.u = r.__N = void 0;
  })) : (e.__h.forEach(He), e.__h.forEach(xt), e.__h = [], wt = 0)), ct = L;
}, E.diffed = function(t) {
  xr && xr(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (pi.push(e) !== 1 && br === E.requestAnimationFrame || ((br = E.requestAnimationFrame) || go)(ho)), e.__H.__.forEach(function(r) {
    r.u && (r.__H = r.u), r.u = void 0;
  })), ct = L = null;
}, E.__c = function(t, e) {
  e.some(function(r) {
    try {
      r.__h.forEach(He), r.__h = r.__h.filter(function(i) {
        return !i.__ || xt(i);
      });
    } catch (i) {
      e.some(function(n) {
        n.__h && (n.__h = []);
      }), e = [], E.__e(i, r.__v);
    }
  }), $r && $r(t, e);
}, E.unmount = function(t) {
  Sr && Sr(t);
  var e, r = t.__c;
  r && r.__H && (r.__H.__.forEach(function(i) {
    try {
      He(i);
    } catch (n) {
      e = n;
    }
  }), r.__H = void 0, e && E.__e(e, r.__v));
};
var Ar = typeof requestAnimationFrame == "function";
function go(t) {
  var e, r = function() {
    clearTimeout(i), Ar && cancelAnimationFrame(e), setTimeout(t);
  }, i = setTimeout(r, 35);
  Ar && (e = requestAnimationFrame(r));
}
function He(t) {
  var e = L, r = t.__c;
  typeof r == "function" && (t.__c = void 0, r()), L = e;
}
function xt(t) {
  var e = L;
  t.__c = t.__(), L = e;
}
function mo(t, e) {
  return !t || t.length !== e.length || e.some(function(r, i) {
    return r !== t[i];
  });
}
function Ht() {
  return (Ht = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }).apply(this, arguments);
}
var _o = ["context", "children"];
function bo(t) {
  this.getChildContext = function() {
    return t.context;
  };
  var e = t.children, r = function(i, n) {
    if (i == null) return {};
    var o, s, a = {}, l = Object.keys(i);
    for (s = 0; s < l.length; s++) n.indexOf(o = l[s]) >= 0 || (a[o] = i[o]);
    return a;
  }(t, _o);
  return ui(e, r);
}
function yo() {
  var t = new CustomEvent("_preact", { detail: {}, bubbles: !0, cancelable: !0 });
  this.dispatchEvent(t), this._vdom = de(bo, Ht({}, this._props, { context: t.detail.context }), function e(r, i) {
    if (r.nodeType === 3) return r.data;
    if (r.nodeType !== 1) return null;
    var n = [], o = {}, s = 0, a = r.attributes, l = r.childNodes;
    for (s = a.length; s--; ) a[s].name !== "slot" && (o[a[s].name] = a[s].value, o[fi(a[s].name)] = a[s].value);
    for (s = l.length; s--; ) {
      var d = e(l[s], null), u = l[s].slot;
      u ? o[u] = de(Cr, { name: u }, d) : n[s] = d;
    }
    var c = i ? de(Cr, null, n) : n;
    return de(i || r.nodeName.toLowerCase(), o, c);
  }(this, this._vdomComponent)), (this.hasAttribute("hydrate") ? di : Ke)(this._vdom, this._root);
}
function fi(t) {
  return t.replace(/-(\w)/g, function(e, r) {
    return r ? r.toUpperCase() : "";
  });
}
function vo(t, e, r) {
  if (this._vdom) {
    var i = {};
    i[t] = r = r ?? void 0, i[fi(t)] = r, this._vdom = ui(this._vdom, i), Ke(this._vdom, this._root);
  }
}
function wo() {
  Ke(this._vdom = null, this._root);
}
function Cr(t, e) {
  var r = this;
  return de("slot", Ht({}, t, { ref: function(i) {
    i ? (r.ref = i, r._listener || (r._listener = function(n) {
      n.stopPropagation(), n.detail.context = e;
    }, i.addEventListener("_preact", r._listener))) : r.ref.removeEventListener("_preact", r._listener);
  } }));
}
function xo(t, e, r, i) {
  function n() {
    var o = Reflect.construct(HTMLElement, [], n);
    return o._vdomComponent = t, o._root = o, o;
  }
  return (n.prototype = Object.create(HTMLElement.prototype)).constructor = n, n.prototype.connectedCallback = yo, n.prototype.attributeChangedCallback = vo, n.prototype.disconnectedCallback = wo, r = r || t.observedAttributes || Object.keys(t.propTypes || {}), n.observedAttributes = r, r.forEach(function(o) {
    Object.defineProperty(n.prototype, o, { get: function() {
      return this._vdom.props[o];
    }, set: function(s) {
      this._vdom ? this.attributeChangedCallback(o, null, s) : (this._props || (this._props = {}), this._props[o] = s, this.connectedCallback());
      var a = typeof s;
      s != null && a !== "string" && a !== "boolean" && a !== "number" || this.setAttribute(o, s);
    } });
  }), customElements.define(e, n);
}
const $o = `
  <style>
    .project-item-container {
      display: block;
      margin-bottom: 1.5rem;
    }

    .project-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
      position: relative;
      height: 100%;
    }

    .project-card:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .complexity-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .complexity-low {
      background: #dcfce7;
      color: #166534;
    }

    .complexity-medium {
      background: #fef3c7;
      color: #92400e;
    }

    .complexity-high {
      background: #fee2e2;
      color: #991b1b;
    }

    .project-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
      padding-right: 4rem;
    }

    .project-description {
      color: #6b7280;
      line-height: 1.6;
      margin: 0;
    }

    @media (min-width: 768px) {
      .project-item-container {
        display: inline-block;
        vertical-align: top;
      }
    }

    @media (min-width: 1024px) {
      .project-item-container {
      }
    }
  </style>
`, So = ({
  title: t = "",
  complexity: e = "medium",
  description: r = ""
}) => {
  const i = fo(() => `complexity-badge complexity-${e}`, [e]);
  return /* @__PURE__ */ le("div", { class: "project-item-container", children: [
    /* @__PURE__ */ le(
      "div",
      {
        dangerouslySetInnerHTML: { __html: $o }
      }
    ),
    /* @__PURE__ */ le("div", { class: "project-card", children: [
      /* @__PURE__ */ le("div", { class: i, children: e }),
      /* @__PURE__ */ le("h3", { class: "project-title", children: t }),
      /* @__PURE__ */ le("p", { class: "project-description", children: r })
    ] })
  ] });
};
xo(So, "project-item", ["title", "complexity", "description"]);
console.log("Components module loaded");
//# sourceMappingURL=components.js.map
