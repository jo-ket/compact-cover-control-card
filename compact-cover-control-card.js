function t(t,e,i,o){var n,s=arguments.length,r=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(s<3?n(r):s>3?n(e,i,r):n(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r}function e(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=window,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}}const a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const h=window,c=h.trustedTypes,d=c?c.emptyScript:"",u=h.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),_={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:v},m="finalized";class $ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))})),t}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||_}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{o?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const o=document.createElement("style"),n=i.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,t.appendChild(o)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=_){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;$[m]=!0,$.elementProperties=new Map,$.elementStyles=[],$.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:$}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.6.3");const g=window,y=g.trustedTypes,A=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",E=`lit$${(Math.random()+"").slice(9)}$`,S="?"+E,w=`<${S}>`,C=document,x=()=>C.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,R="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,T=/>/g,M=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,U=/"/g,D=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),z=new WeakMap,B=C.createTreeWalker(C,129,null,!1);function V(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",r=k;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===k?"!--"===l[1]?r=N:void 0!==l[1]?r=T:void 0!==l[2]?(D.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=M):void 0!==l[3]&&(r=M):r===M?">"===l[0]?(r=null!=n?n:k,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?M:'"'===l[3]?U:I):r===U||r===I?r=M:r===N||r===T?r=k:(r=M,n=void 0);const d=r===M&&t[e+1].startsWith("/>")?" ":"";s+=r===k?i+w:h>=0?(o.push(a),i.slice(0,h)+b+i.slice(h)+E+d):i+E+(-2===h?(o.push(void 0),e):d)}return[V(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),o]};class X{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[l,h]=W(t,e);if(this.el=X.createElement(l,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=B.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(b)||e.startsWith(E)){const i=h[s++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+b).split(E),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?Q:"@"===e[1]?Y:K})}else a.push({type:6,index:n})}for(const e of t)o.removeAttribute(e)}if(D.test(o.tagName)){const t=o.textContent.split(E),e=t.length-1;if(e>0){o.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],x()),B.nextNode(),a.push({type:2,index:++n});o.append(t[e],x())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,o){var n,s,r,a;if(e===H)return e;let l=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const h=O(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,o)),void 0!==o?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(e=G(t,l._$AS(t,e.values),l,o)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);B.currentNode=n;let s=B.nextNode(),r=0,a=0,l=o[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new q(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new tt(s,this,t)),this._$AV.push(e),l=o[++a]}r!==(null==l?void 0:l.index)&&(s=B.nextNode(),r++)}return B.currentNode=C,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class q{constructor(t,e,i,o){var n;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),O(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&O(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=X.createElement(V(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new F(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=z.get(t.strings);return void 0===e&&z.set(t.strings,e=new X(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new q(this.k(x()),this.k(x()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,i,o,n){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=G(this,t,e,0),s=!O(t)||t!==this._$AH&&t!==H,s&&(this._$AH=t);else{const o=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,o[i+r],e,r),a===H&&(a=this._$AH[r]),s||(s=!O(a)||a!==this._$AH[r]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}s&&!o&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Z=y?y.emptyScript:"";class Q extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class Y extends K{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=G(this,t,e,0))&&void 0!==i?i:j)===H)return;const o=this._$AH,n=t===j&&o!==j||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==j&&(o===j||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const et=g.litHtmlPolyfillSupport;null==et||et(X,q),(null!==(f=g.litHtmlVersions)&&void 0!==f?f:g.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it,ot;class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let r=s._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=r=new q(e.insertBefore(x(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return H}}nt.finalized=!0,nt._$litElement$=!0,null===(it=globalThis.litElementHydrateSupport)||void 0===it||it.call(globalThis,{LitElement:nt});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:nt}),(null!==(ot=globalThis.litElementVersions)&&void 0!==ot?ot:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):rt(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var lt,ht;null===(lt=window.HTMLSlotElement)||void 0===lt||lt.prototype.assignedElements;class ct{constructor(t,e){this.sensorStates=new Map,this.initialCheckDone=!1,this.hass=e,this.config=this.validateConfig(t)}validateConfig(t){var e;const i=t.invert_percentage?Object.assign(Object.assign({},t),{lux_automation:null===(e=t.lux_automation)||void 0===e?void 0:e.map((t=>Object.assign(Object.assign({},t),{position:100-t.position}))),rooms:t.rooms.map((t=>{var e;return Object.assign(Object.assign({},t),{lux_automation:null===(e=t.lux_automation)||void 0===e?void 0:e.map((t=>Object.assign(Object.assign({},t),{position:100-t.position}))),covers:t.covers.map((t=>{var e;return Object.assign(Object.assign({},t),{lux_automation:null===(e=t.lux_automation)||void 0===e?void 0:e.map((t=>Object.assign(Object.assign({},t),{position:100-t.position})))})}))})}))}):t;return i.lux_automation&&this.validateAutomations(i.lux_automation,"Card"),i.rooms.forEach((t=>{t.lux_automation&&this.validateAutomations(t.lux_automation,`Room ${t.name}`),t.covers.forEach((e=>{e.lux_automation&&this.validateAutomations(e.lux_automation,`Cover ${e.name} in room ${t.name}`)}))})),i}getAllSensors(){const t=new Set;return this.config.lux_automation&&this.config.lux_automation.forEach((e=>t.add(e.entity))),this.config.rooms.forEach((e=>{e.lux_automation&&e.lux_automation.forEach((e=>t.add(e.entity))),e.covers.forEach((e=>{e.lux_automation&&e.lux_automation.forEach((e=>t.add(e.entity)))}))})),t}updateHass(t){this.hass=t}handleAutomation(){if(!this.hasAnyAutomation())return;let t=!this.initialCheckDone;this.initialCheckDone=!0,this.getAllSensors().forEach((e=>{var i;const o=null===(i=this.hass.states[e])||void 0===i?void 0:i.state,n=this.sensorStates.get(e);console.log(`Checking sensor ${e}: current=${o}, previous=${n}`),o!==n&&(console.log(`Change detected for ${e}`),t=!0,this.sensorStates.set(e,o))})),t&&(console.log("Processing automations due to changes"),this.config.rooms.forEach((t=>{t.covers.forEach((e=>{this.processCoverAutomation(e,t)}))})))}hasAnyAutomation(){var t;return!!(null===(t=this.config.lux_automation)||void 0===t?void 0:t.length)||this.config.rooms.some((t=>{var e;return!!(null===(e=t.lux_automation)||void 0===e?void 0:e.length)||t.covers.some((t=>{var e;return null===(e=t.lux_automation)||void 0===e?void 0:e.length}))}))}validateAutomations(t,e){t.forEach(((t,i)=>{if(!t.entity)throw new Error(`${e} automation ${i} is missing entity`);if(void 0===t.position)throw new Error(`${e} automation ${i} is missing position`);this.validatePosition(t.position,`${e} automation ${i} has invalid position`),t.before&&this.validateTime(t.before,`${e} automation ${i} before time`),t.after&&this.validateTime(t.after,`${e} automation ${i} after time`)}))}processCoverAutomation(t,e){const i=this.getCoverAutomations(t,e);if(!i.length)return;const o=this.hass.states[t.entity];if(!o||"unavailable"===o.state)return;const n=o.attributes.current_position;for(const e of i)if(this.shouldAutomationRun(e,n)){this.executeAutomation(t.entity,e.position);break}}getCoverAutomations(t,e){return[...t.lux_automation||[],...e.lux_automation||[],...this.config.lux_automation||[]]}shouldAutomationRun(t,e){if(Math.round(e)===t.position)return!1;if(!this.isWithinTimeWindow(t))return!1;const i=this.hass.states[t.entity];if(!i||"unavailable"===i.state)return!1;const o=Number(i.state);return!isNaN(o)&&(!(void 0!==t.above&&o<=t.above)&&!(void 0!==t.below&&o>=t.below))}isWithinTimeWindow(t){if(!t.before&&!t.after)return!0;const e=new Date,i=e.getHours(),o=e.getMinutes();if(t.after){if(!(i>t.after.hour||i===t.after.hour&&o>=t.after.minute))return!1}if(t.before){if(!(i<t.before.hour||i===t.before.hour&&o<=t.before.minute))return!1}return!0}executeAutomation(t,e){try{this.hass.callService("cover","set_cover_position",{entity_id:t,position:e})}catch(t){console.error("Error in automation:",t)}}validatePosition(t,e){if(void 0!==t&&(t<0||t>100))throw new Error(`${e}. Must be between 0 and 100`)}validateTime(t,e){if(void 0===t.hour||t.hour<0||t.hour>23)throw new Error(`${e} has invalid hour`);if(void 0===t.minute||t.minute<0||t.minute>59)throw new Error(`${e} has invalid minute`)}}let dt=ht=class extends nt{shouldUpdate(t){return t.has("hass")||t.has("config")}render(){return this.hass?L`
      <ha-card>
        <div class="card-content">
          ${this.config.title?L`
            <div class="floor-title">${this.config.title}</div>
          `:j}
          ${this.config.rooms.map((t=>this._renderRoom(t)))}
        </div>
      </ha-card>
    `:L``}_renderRoom(t){return L`
      <div class="room">
        <div class="room-header">
          <div class="room-name">${t.name}</div>
          <div class="control-buttons">
            <button 
              class="control-button" 
              @click=${()=>this._handleRoomButtonClick(t,"up")}
            >☀️</button>
            <button 
              class="control-button" 
              @click=${()=>this._handleRoomButtonClick(t,"middle")}
            >⛅</button>
            <button 
              class="control-button" 
              @click=${()=>this._handleRoomButtonClick(t,"down")}
            >🌙</button>
          </div>
        </div>
        ${t.covers.map((t=>this._renderCover(t)))}
      </div>
    `}_renderCover(t){var e,i;const o=this.hass.states[t.entity],n=!!t.lock_entity&&"on"===(null===(e=this.hass.states[t.lock_entity])||void 0===e?void 0:e.state),s=null!==(i=null==o?void 0:o.attributes.current_position)&&void 0!==i?i:0,r=this._invertPercentage(s),a=void 0!==(null==o?void 0:o.attributes.current_position)?`${r}%`:"---";return L`
      <div class="cover-control">
        <span class="name-label" @click=${()=>this._handleNameClick(t.entity)}>
          ${t.name}
        </span>
        <input 
          type="range" 
          min="${ht.SLIDER_MIN}"
          max="${ht.SLIDER_MAX}"
          .value=${s}
          @change=${e=>this._handleSliderChange(e,t.entity)}
          class="slider"
          style="
            direction: ${this.config.invert_percentage?"rtl":"ltr"};
            background: ${this._calculateGradient(s)};
          "
          ?disabled=${n||!o||"unavailable"===o.state}
        />
        <span class="value-label">
          ${a}
          ${t.lock_entity&&n?L`<span class="lock-icon">🔒</span>`:""}
        </span>
      </div>
    `}_calculateGradient(t){const e=this.config.invert_percentage?ht.SLIDER_MAX-t:t,i=this.config.invert_percentage?ht.GRADIENT_COLORS.CLOSED:ht.GRADIENT_COLORS.OPEN,o=this.config.invert_percentage?ht.GRADIENT_COLORS.OPEN:ht.GRADIENT_COLORS.CLOSED;return`linear-gradient(to right, \n      ${i} ${ht.SLIDER_MIN}%, \n      ${i} ${e}%, \n      ${o} ${e}%, \n      ${o} ${ht.SLIDER_MAX}%)`}_handleNameClick(t){const e=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_invertPercentage(t){return this.config.invert_percentage?ht.SLIDER_MAX-t:t}_getMiddlePosition(t,e){var i,o,n;return null!==(n=null!==(o=null!==(i=t.middle_position)&&void 0!==i?i:e.middle_position)&&void 0!==o?o:this.config.middle_position)&&void 0!==n?n:ht.DEFAULT_MIDDLE_POSITION}_getSunPosition(t,e){var i,o,n;return null!==(n=null!==(o=null!==(i=t.sun_position)&&void 0!==i?i:e.sun_position)&&void 0!==o?o:this.config.sun_position)&&void 0!==n?n:ht.DEFAULT_SUN_POSITION}_getMoonPosition(t,e){var i,o,n;return null!==(n=null!==(o=null!==(i=t.moon_position)&&void 0!==i?i:e.moon_position)&&void 0!==o?o:this.config.moon_position)&&void 0!==n?n:ht.DEFAULT_MOON_POSITION}_handleRoomButtonClick(t,e){for(const i of t.covers){let o="up"===e?this._getSunPosition(i,t):"down"===e?this._getMoonPosition(i,t):this._getMiddlePosition(i,t);this.config.invert_percentage&&(o=ht.SLIDER_MAX-o);try{this.hass.callService("cover","set_cover_position",{entity_id:i.entity,position:o})}catch(t){console.error("Error in room button update:",t)}}}_handleSliderChange(t,e){const i=t.target,o=parseInt(i.value,10);try{this.hass.callService("cover","set_cover_position",{entity_id:e,position:o})}catch(t){console.error("Error in slider update:",t)}}_validatePosition(t,e){if(void 0!==t&&(t<ht.SLIDER_MIN||t>ht.SLIDER_MAX))throw new Error(`${e}. Must be between ${ht.SLIDER_MIN} and ${ht.SLIDER_MAX}`)}updated(t){super.updated(t),t.has("hass")&&(this.automationHandler||(this.automationHandler=new ct(this.config,this.hass)),this.automationHandler.updateHass(this.hass),this.automationHandler.handleAutomation())}setConfig(t){if(!t.rooms)throw new Error("Please define rooms");t.rooms.forEach(((t,e)=>{if(!t.name)throw new Error(`Room ${e} is missing a name`);if(!t.covers||!t.covers.length)throw new Error(`Room ${t.name} has no covers defined`);t.covers.forEach(((e,i)=>{if(!e.name)throw new Error(`Cover ${i} in room ${t.name} is missing a name`);if(!e.entity)throw new Error(`Cover ${e.name} in room ${t.name} is missing an entity`);this._validatePosition(e.middle_position,`Cover ${e.name} in room ${t.name} has invalid middle_position`),this._validatePosition(e.sun_position,`Cover ${e.name} in room ${t.name} has invalid sun_position`),this._validatePosition(e.moon_position,`Cover ${e.name} in room ${t.name} has invalid moon_position`)})),this._validatePosition(t.middle_position,`Room ${t.name} has invalid middle_position`),this._validatePosition(t.sun_position,`Room ${t.name} has invalid sun_position`),this._validatePosition(t.moon_position,`Room ${t.name} has invalid moon_position`)})),this._validatePosition(t.middle_position,"Card has invalid middle_position"),this._validatePosition(t.sun_position,"Card has invalid sun_position"),this._validatePosition(t.moon_position,"Card has invalid moon_position"),new ct(t,this.hass),this.config=Object.assign({invert_percentage:!1},t)}};dt.DEFAULT_MIDDLE_POSITION=50,dt.DEFAULT_SUN_POSITION=100,dt.DEFAULT_MOON_POSITION=0,dt.SLIDER_MIN=0,dt.SLIDER_MAX=100,dt.GRADIENT_COLORS={CLOSED:"rgb(59, 130, 246)",OPEN:"rgb(250, 204, 21)"},dt.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new r(i,t,n)})`
    .card-content {
      padding: 16px;
    }
    .floor-title {
      font-size: 1.2em;
      font-weight: 500;
      margin-bottom: 16px;
    }
    .room {
      background: var(--card-background-color, white);
      border-radius: var(--ha-card-border-radius, 4px);
      box-shadow: var(--ha-card-box-shadow, none);
      padding: 12px;
      margin-bottom: 8px;
    }
    .room-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .room-name {
      font-size: 1.1em;
      font-weight: 500;
    }
    .cover-control {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 4px 0;
    }
    .control-buttons {
      display: flex;
      gap: 4px;
    }
    .control-button {
      border: none;
      background: none;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    .control-button:hover {
      background-color: var(--secondary-background-color);
    }
    .slider {
      flex-grow: 1;
      height: 6px;
      -webkit-appearance: none;
      appearance: none;
      border-radius: 3px;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--primary-color);
      cursor: pointer;
      z-index: 2;
    }
    .slider:disabled {
      opacity: 0.5;
    }
    .lock-icon {
      opacity: 0.5;
      margin-left: 4px;
    }
    .name-label {
      min-width: 120px;
      cursor: pointer;
      color: var(--primary-text-color);
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    .name-label:hover {
      opacity: 1;
    }
    .value-label {
      min-width: 48px;
      text-align: right;
    }
  `,t([at({attribute:!1}),e("design:type",Object)],dt.prototype,"hass",void 0),t([at({type:Object}),e("design:type",Object)],dt.prototype,"config",void 0),dt=ht=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e))("compact-cover-control-card")],dt);export{dt as CompactCoverControlCard};
//# sourceMappingURL=compact-cover-control-card.js.map
