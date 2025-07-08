(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=globalThis,I=k.ShadowRoot&&(k.ShadyCSS===void 0||k.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),Q=new WeakMap;let X=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(I&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Q.set(e,t))}return t}toString(){return this.cssText}};const ut=r=>new X(typeof r=="string"?r:r+"",void 0,B),V=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new X(e,r,B)},ft=(r,t)=>{if(I)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=k.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)}},tt=I?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return ut(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:gt,defineProperty:mt,getOwnPropertyDescriptor:$t,getOwnPropertyNames:vt,getOwnPropertySymbols:_t,getPrototypeOf:bt}=Object,T=globalThis,et=T.trustedTypes,yt=et?et.emptyScript:"",At=T.reactiveElementPolyfillSupport,C=(r,t)=>r,H={toAttribute(r,t){switch(t){case Boolean:r=r?yt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},W=(r,t)=>!gt(r,t),it={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),T.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=it){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&mt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=$t(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){const l=s?.call(this);o?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??it}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,i=[...vt(e),..._t(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(tt(s))}else t!==void 0&&e.push(tt(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const o=(i.converter?.toAttribute!==void 0?i.converter:H).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const o=i.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:H;this._$Em=s,this[s]=n.fromAttribute(e,o.type)??this._$Ej?.get(s)??null,this._$Em=null}}requestUpdate(t,e,i){if(t!==void 0){const s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??W)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,o]of i){const{wrapped:n}=o,l=this[s];n!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,o,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[C("elementProperties")]=new Map,A[C("finalized")]=new Map,At?.({ReactiveElement:A}),(T.reactiveElementVersions??=[]).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=globalThis,R=q.trustedTypes,st=R?R.createPolicy("lit-html",{createHTML:r=>r}):void 0,rt="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,ot="?"+f,wt=`<${ot}>`,v=document,P=()=>v.createComment(""),O=r=>r===null||typeof r!="object"&&typeof r!="function",G=Array.isArray,St=r=>G(r)||typeof r?.[Symbol.iterator]=="function",Z=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,at=/>/g,_=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lt=/'/g,ht=/"/g,ct=/^(?:script|style|textarea|title)$/i,xt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),g=xt(1),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),pt=new WeakMap,b=v.createTreeWalker(v,129);function dt(r,t){if(!G(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return st!==void 0?st.createHTML(t):t}const Et=(r,t)=>{const e=r.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",n=F;for(let l=0;l<e;l++){const a=r[l];let c,p,h=-1,u=0;for(;u<a.length&&(n.lastIndex=u,p=n.exec(a),p!==null);)u=n.lastIndex,n===F?p[1]==="!--"?n=nt:p[1]!==void 0?n=at:p[2]!==void 0?(ct.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=_):p[3]!==void 0&&(n=_):n===_?p[0]===">"?(n=s??F,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?_:p[3]==='"'?ht:lt):n===ht||n===lt?n=_:n===nt||n===at?n=F:(n=_,s=void 0);const $=n===_&&r[l+1].startsWith("/>")?" ":"";o+=n===F?a+wt:h>=0?(i.push(c),a.slice(0,h)+rt+a.slice(h)+f+$):a+f+(h===-2?l:$)}return[dt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class j{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const l=t.length-1,a=this.parts,[c,p]=Et(t,e);if(this.el=j.createElement(c,i),b.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=b.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(rt)){const u=p[n++],$=s.getAttribute(h).split(f),D=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:D[2],strings:$,ctor:D[1]==="."?Pt:D[1]==="?"?Ot:D[1]==="@"?Ft:L}),s.removeAttribute(h)}else h.startsWith(f)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(ct.test(s.tagName)){const h=s.textContent.split(f),u=h.length-1;if(u>0){s.textContent=R?R.emptyScript:"";for(let $=0;$<u;$++)s.append(h[$],P()),b.nextNode(),a.push({type:2,index:++o});s.append(h[u],P())}}}else if(s.nodeType===8)if(s.data===ot)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(f,h+1))!==-1;)a.push({type:7,index:o}),h+=f.length-1}o++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function S(r,t,e=r,i){if(t===w)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl;const o=O(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=S(r,s._$AS(r,t.values),s,i)),t}class Ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??v).importNode(e,!0);b.currentNode=s;let o=b.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new M(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new jt(o,this,t)),this._$AV.push(c),a=i[++l]}n!==a?.index&&(o=b.nextNode(),n++)}return b.currentNode=v,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):St(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=j.createElement(dt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const o=new Ct(s,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=pt.get(t.strings);return e===void 0&&pt.set(t.strings,e=new j(t)),e}k(t){G(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new M(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class L{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(o===void 0)t=S(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==w,n&&(this._$AH=t);else{const l=t;let a,c;for(t=o[0],a=0;a<o.length-1;a++)c=S(this,l[i+a],e,a),c===w&&(c=this._$AH[a]),n||=!O(c)||c!==this._$AH[a],c===d?t=d:t!==d&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pt extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Ot extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Ft extends L{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??d)===w)return;const i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class jt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const Mt=q.litHtmlPolyfillSupport;Mt?.(j,M),(q.litHtmlVersions??=[]).push("3.3.0");const Ut=(r,t,e)=>{const i=e?.renderBefore??t;let s=i._$litPart$;if(s===void 0){const o=e?.renderBefore??null;i._$litPart$=s=new M(t.insertBefore(P(),o),o,void 0,e??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=globalThis;class y extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}}y._$litElement$=!0,y.finalized=!0,J.litElementHydrateSupport?.({LitElement:y});const kt=J.litElementPolyfillSupport;kt?.({LitElement:y}),(J.litElementVersions??=[]).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:W},Ht=(r=Tt,t,e)=>{const{kind:i,metadata:s}=e;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),i==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,r)},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(i==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+i)};function m(r){return(t,e)=>typeof e=="object"?Ht(r,t,e):((i,s,o)=>{const n=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(r,t,e)}var Rt=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,Y=(r,t,e,i)=>{for(var s=i>1?void 0:i?Lt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Rt(t,e,s),s};let U=class extends y{constructor(){super(...arguments),this.name="World",this.count=0}_handleClick(){this.count++}render(){return g`
      <h1>Hello, ${this.name}!</h1>
      <p>This is a Lit.js component running in your Hugo site.</p>
      <p>Button clicked: ${this.count} times</p>
      <button @click=${this._handleClick}>Click me!</button>
    `}};U.styles=V`
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
  `,Y([m({type:String})],U.prototype,"name",2),Y([m({type:Number})],U.prototype,"count",2),U=Y([K("hello-world")],U);class Nt{constructor(){this.state={categories:[],activeFilters:{}}}formatLabel(t){return t.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}parseFilterAttribute(t){try{const e=JSON.parse(t),i={};return Object.entries(e).forEach(([s,o])=>{const n=s.toLowerCase(),l=Array.isArray(o)?o:[o];i[n]=l.map(a=>String(a).toLowerCase()).filter(a=>a.length>0)}),i}catch{return{category:t.split(/[,;\s]+/).map(s=>s.trim().toLowerCase()).filter(s=>s.length>0)}}}initializeFromContent(t){const e=new Map;t.forEach(o=>{Object.entries(o).forEach(([n,l])=>{e.has(n)||e.set(n,new Set),l.forEach(a=>{e.get(n).add(a)})})});const i=Array.from(e.entries()).map(([o,n])=>({name:o,label:this.formatLabel(o),ignored:!1,options:Array.from(n).sort().map(l=>({value:l,label:this.formatLabel(l),active:!0}))})).sort((o,n)=>o.label.localeCompare(n.label)),s={};return i.forEach(o=>{s[o.name]=o.options.map(n=>n.value)}),this.state={categories:i,activeFilters:s},this.getState()}toggleFilter(t){const{categoryName:e,filterValue:i,isActive:s}=t;return this.state.activeFilters[e]||(this.state.activeFilters[e]=[]),s?this.state.activeFilters[e].includes(i)||(this.state.activeFilters[e]=[...this.state.activeFilters[e],i]):this.state.activeFilters[e]=this.state.activeFilters[e].filter(o=>o!==i),this.state.categories=this.state.categories.map(o=>({...o,options:o.options.map(n=>({...n,active:this.state.activeFilters[o.name]?.includes(n.value)||!1}))})),this.getState()}evaluateElement(t){if(!Object.values(this.state.activeFilters).some(n=>n.length>0))return{shouldShow:!1,matchedCategories:[],unmatchedCategories:Object.keys(this.state.activeFilters)};const i=[],s=[];return{shouldShow:Object.entries(this.state.activeFilters).every(([n,l])=>{if(this.state.categories.find(h=>h.name===n)?.ignored)return!0;if(!l||l.length===0)return s.push(n),!1;const c=t[n];if(!c||c.length===0)return s.push(n),!1;const p=c.some(h=>l.includes(h));return p?i.push(n):s.push(n),p}),matchedCategories:i,unmatchedCategories:s}}evaluateElementWithoutFilters(){return!Object.values(this.state.activeFilters).some(e=>e.length>0)}getState(){return{categories:this.state.categories.map(t=>({...t,options:t.options.map(e=>({...e}))})),activeFilters:Object.fromEntries(Object.entries(this.state.activeFilters).map(([t,e])=>[t,[...e]]))}}getStats(){const t=this.state.categories.length,e=this.state.categories.reduce((o,n)=>o+n.options.length,0),i=Object.values(this.state.activeFilters).reduce((o,n)=>o+n.length,0),s=Object.values(this.state.activeFilters).filter(o=>o.length>0).length;return{totalCategories:t,totalOptions:e,activeOptions:i,categoriesWithActiveFilters:s,hasAnyActiveFilters:i>0}}resetFilters(){return this.state.categories.forEach(t=>{this.state.activeFilters[t.name]=t.options.map(e=>e.value),t.options.forEach(e=>{e.active=!0})}),this.getState()}toggleIgnoreCategory(t){return this.state.categories=this.state.categories.map(e=>e.name===t?{...e,ignored:!e.ignored}:e),this.getState()}clearFilters(){return Object.keys(this.state.activeFilters).forEach(t=>{this.state.activeFilters[t]=[]}),this.state.categories=this.state.categories.map(t=>({...t,options:t.options.map(e=>({...e,active:!1}))})),this.getState()}}var zt=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,N=(r,t,e,i)=>{for(var s=i>1?void 0:i?Dt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&zt(t,e,s),s};let x=class extends y{constructor(){super(...arguments),this.filterAttribute="data-filter",this.filterLabel="Filter by",this.filterStateManager=new Nt,this.filterState={categories:[],activeFilters:{}}}connectedCallback(){super.connectedCallback(),this._initializeFilters(),this._applyFilters()}firstUpdated(r){super.firstUpdated(r),this._initializeFilters(),this._applyFilters()}_handleSlotChange(){this._initializeFilters(),this._applyFilters()}_initializeFilters(){const r=this.querySelectorAll(`[${this.filterAttribute}]`);console.log("Found elements with filter attribute:",r.length);const t=Array.from(r).map(e=>{const i=e.getAttribute(this.filterAttribute);return i&&console.log("Filter value:",i),i?this.filterStateManager.parseFilterAttribute(i):null}).filter(e=>e!==null);console.log("Parsed filters array:",t),this.filterState=this.filterStateManager.initializeFromContent(t),console.log("Filter state after initialization:",this.filterState)}_handleFilterChange(r){const t=r.target,[e,i]=t.value.split(":"),s=t.checked,o={categoryName:e,filterValue:i,isActive:s};this.filterState=this.filterStateManager.toggleFilter(o),this._applyFilters(),this.requestUpdate()}_handleIgnoreToggle(r){this.filterState=this.filterStateManager.toggleIgnoreCategory(r),this._applyFilters(),this.requestUpdate()}_applyFilters(){this.querySelectorAll(`[${this.filterAttribute}]`).forEach(t=>{const e=t.getAttribute(this.filterAttribute);let i;if(e){const s=this.filterStateManager.parseFilterAttribute(e);i=this.filterStateManager.evaluateElement(s).shouldShow}else i=this.filterStateManager.evaluateElementWithoutFilters();t.style.display=i?"":"none"})}render(){return g`
      <!-- Filters container -->
      ${this.filterState.categories.length>0?g`
        <div class="portfolio-header">
          <div class="portfolio-filters">
            ${this.filterState.categories.map(r=>g`
              <div class="filter-category ${r.ignored?"ignored":""}">
                <div class="filter-category-header">
                  <span class="filter-label">${r.label}:</span>
                  <button 
                    class="ignore-button ${r.ignored?"active":""}"
                    @click=${()=>this._handleIgnoreToggle(r.name)}
                    title="${r.ignored?"Enable filtering":"Ignore category"}"
                  >
                    ${r.ignored?g`
                      <!-- Eye closed SVG -->
                      <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                        <path d="M3 13C6.6 5 17.4 5 21 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    `:g`
                      <!-- Eye open SVG -->
                      <?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    `}
                  </button>
                </div>
                <div class="filter-category-content">
                  <div class="filter-options">
                    ${r.options.map(t=>g`
                      <div class="filter-option">
                        <input 
                          type="checkbox" 
                          id="filter-${r.name}-${t.value}" 
                          value="${r.name}:${t.value}"
                          .checked=${t.active}
                          @change=${this._handleFilterChange}
                        >
                        <label for="filter-${r.name}-${t.value}">${t.label}</label>
                      </div>
                    `)}
                  </div>
                </div>
              </div>
            `)}
          </div>
        </div>
      `:""}

      <!-- Container for slotted content -->
      <div class="projects-container">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `}};x.styles=V`
    :host {
      display: block;
      width: 100%;
    }

    .portfolio-header {
      max-width: 1200px;
      margin: 0 auto 2rem auto;
      padding: 0 1rem;
    }

    .portfolio-filters {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid #e5e7eb;
    }

    .filter-category {
      position: relative;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .filter-category-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .filter-category-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }

    .filter-category.ignored .filter-category-content,
    .filter-category.ignored .filter-category-header > .filter-label {
      opacity: 0.5;
      pointer-events: none;
    }

    .ignore-button {
      background: none;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      padding: 0.25rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      color: #6b7280;
      transition: all 0.2s;
    }

    .ignore-button:hover {
      background-color: #f3f4f6;
      border-color: #9ca3af;
    }

    .ignore-button.active {
      background-color: #fee2e2;
      border-color: #f87171;
      color: #dc2626;
    }

    .ignore-button svg {
      width: 0.875rem;
      height: 0.875rem;
    }

    .filter-category:last-child {
      border-bottom: none;
    }

    .filter-label {
      font-weight: 600;
      color: #374151;
      white-space: nowrap;
    }

    .filter-options {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filter-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .filter-option input {
      width: 1rem;
      height: 1rem;
      accent-color: #3b82f6;
    }

    .filter-option label {
      font-size: 0.875rem;
      color: #6b7280;
      cursor: pointer;
      user-select: none;
    }

    .projects-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
    }

    /* Target slotted project-item elements */
    ::slotted(project-item) {
      flex: 1;
      min-width: 300px;
      max-width: calc(33.333% - 1rem);
    }

    @media (max-width: 1024px) {
      ::slotted(project-item) {
        max-width: calc(50% - 0.75rem);
      }
    }

    @media (max-width: 768px) {
      ::slotted(project-item) {
        max-width: 100%;
      }
    }
  `,N([m({type:String})],x.prototype,"filterAttribute",2),N([m({type:String})],x.prototype,"filterLabel",2),N([m({type:Object})],x.prototype,"filterState",2),x=N([K("portfolio-grid")],x);var It=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,z=(r,t,e,i)=>{for(var s=i>1?void 0:i?Bt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&It(t,e,s),s};let E=class extends y{constructor(){super(...arguments),this.title="",this.complexity="medium",this.description=""}render(){return g`
      <div class="project-card">
        <!-- Complexity Badge -->
        <div class="complexity-badge complexity-${this.complexity}">
          ${this.complexity}
        </div>
        
        <!-- Project Content -->
        <h3 class="project-title">${this.title}</h3>
        <p class="project-description">${this.description}</p>
      </div>
    `}};E.styles=V`
    :host {
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
      padding-right: 4rem; /* Space for complexity badge */
    }

    .project-description {
      color: #6b7280;
      line-height: 1.6;
      margin: 0;
    }

    /* Grid layout styles */
    :host(.grid-item) {
      break-inside: avoid;
    }

    @media (min-width: 768px) {
      :host {
        width: calc(50% - 0.75rem);
        display: inline-block;
        vertical-align: top;
      }
    }

    @media (min-width: 1024px) {
      :host {
        width: calc(33.333% - 1rem);
      }
    }
  `,z([m({type:String})],E.prototype,"title",2),z([m({type:String})],E.prototype,"complexity",2),z([m({type:String})],E.prototype,"description",2),E=z([K("project-item")],E),console.log("Components module loaded")})();
//# sourceMappingURL=components.iife.js.map
