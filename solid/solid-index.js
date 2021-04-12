!function(){"use strict";const e=(e,t)=>e===t;let t=C;const n={},r={owned:null,cleanups:null,context:null,owner:null};a(!1);var o=null,l=null;let s=null,i=null,u=null,c=null,f=0;function a(t,r=!0,o){const l={value:t,observers:null,observerSlots:null,pending:n,comparator:r?"function"==typeof r?r:e:void 0};return[v.bind(l),g.bind(l)]}function d(e,t){b(y(e,t,!1))}function h(e,n){t=S;const r=y(e,n,!1);r.user=!0,u&&u.push(r)}function p(e){let t,n=l;return l=null,t=e(),l=n,t}function v(){if(this.state&&this.sources){const e=i;i=null,1===this.state?b(this):w(this),i=e}if(l){const e=this.observers?this.observers.length:0;l.sources?(l.sources.push(this),l.sourceSlots.push(e)):(l.sources=[this],l.sourceSlots=[e]),this.observers?(this.observers.push(l),this.observerSlots.push(l.sources.length-1)):(this.observers=[l],this.observerSlots=[l.sources.length-1])}return this.value}function g(e,t){return this.comparator&&this.comparator(this.value,e)?e:s?(this.pending===n&&s.push(this),this.pending=e,e):(this.value=e,!this.observers||i&&!this.observers.length||$((()=>{for(let e=0;e<this.observers.length;e+=1){const t=this.observers[e];c,t.observers&&2!==t.state&&x(t),t.state=1,t.pure?i.push(t):u.push(t)}if(i.length>1e6)throw i=[],new Error("Potential Infinite Loop Detected.")}),!1),e)}function b(e){if(!e.fn)return;A(e);const t=o,n=l,r=f;l=o=e,function(e,t,n){let r;try{r=e.fn(t)}catch(e){N(e)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?g.call(e,r,!0):e.value=r,e.updatedAt=n)}(e,e.value,r),l=n,o=t}function y(e,t,n){const l={fn:e,state:1,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:o,context:null,pure:n};return null===o||o!==r&&(o.owned?o.owned.push(l):o.owned=[l]),l}function m(e){let t,n=1===e.state&&e;if(e.suspense&&p(e.suspense.inFallback))return e.suspense.effects.push(e);for(;e.fn&&(e=e.owner);)2===e.state?t=e:1===e.state&&(n=e,t=void 0);if(t){const e=i;if(i=null,w(t),i=e,!n||1!==n.state)return}n&&b(n)}function $(e,r){if(i)return e();let o=!1;r||(i=[]),u?o=!0:u=[],f++;try{e()}catch(e){N(e)}finally{!function(e){i&&(C(i),i=null);if(e)return;u.length?function(e){if(s)return e();const t=s=[],r=e();s=null,$((()=>{for(let e=0;e<t.length;e+=1){const r=t[e];if(r.pending!==n){const e=r.pending;r.pending=n,g.call(r,e)}}}),!1)}((()=>{t(u),u=null})):u=null}(o)}}function C(e){for(let t=0;t<e.length;t++)m(e[t])}function S(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:m(r)}const r=e.length;for(t=0;t<n;t++)m(e[t]);for(t=r;t<e.length;t++)m(e[t])}function w(e){e.state=0;for(let t=0;t<e.sources.length;t+=1){const n=e.sources[t];n.sources&&(1===n.state?m(n):2===n.state&&w(n))}}function x(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=2,n.observers&&x(n))}}function A(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)A(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function N(e){throw e}function _(e,t){return p((()=>e(t)))}function T(t,r){return function(t,r,o=!0){const l=y(t,r,!0);return l.pending=n,l.observers=null,l.observerSlots=null,l.state=0,l.comparator=o?"function"==typeof o?o:e:void 0,b(l),v.bind(l)}(t,void 0,r)}function L(e,t,n){let r=n.length,o=t.length,l=r,s=0,i=0,u=t[o-1].nextSibling,c=null;for(;s<o||i<l;)if(o===s){const t=l<r?i?n[i-1].nextSibling:n[l-i]:u;for(;i<l;)e.insertBefore(n[i++],t)}else if(l===i)for(;s<o;)c&&c.has(t[s])||e.removeChild(t[s]),s++;else if(t[s]===n[i])s++,i++;else if(t[o-1]===n[l-1])o--,l--;else if(t[s]===n[l-1]&&n[i]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[i++],t[s++].nextSibling),e.insertBefore(n[--l],r),t[o]=n[l]}else{if(!c){c=new Map;let e=i;for(;e<l;)c.set(n[e],e++)}const r=c.get(t[s]);if(null!=r)if(i<r&&r<l){let u,f=s,a=1;for(;++f<o&&f<l&&null!=(u=c.get(t[f]))&&u===r+a;)a++;if(a>r-i){const o=t[s];for(;i<r;)e.insertBefore(n[i++],o)}else e.replaceChild(n[i++],t[s++])}else s++;else e.removeChild(t[s++])}}const k=Symbol("delegated-events");function E(e,t,n){const r=document.createElement("template");if(r.innerHTML=e,t&&r.innerHTML.split("<").length-1!==t)throw`Template html does not match input:\n${r.innerHTML}\n\n${e}`;let o=r.content.firstChild;return n&&(o=o.firstChild),o}function B(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return M(e,t,r,n);d((r=>M(e,t(),r,n)),r)}function P(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n});null!==n;){const r=n[t];if(r){const o=n[`${t}Data`];if(void 0!==o?r(o,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function M(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const l=typeof t,s=void 0!==r;if(e=s&&n[0]&&n[0].parentNode||e,"string"===l||"number"===l)if("number"===l&&(t=t.toString()),s){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=H(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===l)n=H(e,n,r);else{if("function"===l)return d((()=>{let o=t();for(;"function"==typeof o;)o=o();n=M(e,o,n,r)})),()=>n;if(Array.isArray(t)){const l=[];if(D(l,t,o))return d((()=>n=M(e,l,n,r,!0))),()=>n;if(0===l.length){if(n=H(e,n,r),s)return n}else Array.isArray(n)?0===n.length?F(e,l,r):L(e,n,l):null==n||""===n?F(e,l):L(e,s&&n||[e.firstChild],l);n=l}else if(t instanceof Node){if(Array.isArray(n)){if(s)return n=H(e,n,r,t);H(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}else console.warn("Skipped inserting",t)}return n}function D(e,t,n){let r=!1;for(let o=0,l=t.length;o<l;o++){let l,s=t[o];if(s instanceof Node)e.push(s);else if(null==s||!0===s||!1===s);else if(Array.isArray(s))r=D(e,s)||r;else if("string"==(l=typeof s))e.push(document.createTextNode(s));else if("function"===l)if(n){for(;"function"==typeof s;)s=s();r=D(e,Array.isArray(s)?s:[s])||r}else e.push(s),r=!0;else e.push(document.createTextNode(s.toString()))}return r}function F(e,t,n){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function H(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let l=t.length-1;l>=0;l--){const s=t[l];if(o!==s){const t=s.parentNode===e;r||l?t&&e.removeChild(s):t?e.replaceChild(o,s):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}class X{constructor(e,t){this.X=e,this.Y=t,this.buffer=new Uint32Array(Math.ceil(e*t/32))}get(e,t){const{X:n,Y:r,buffer:o}=this,l=(t<0?t%r+r:t%r)*n+(e<0?e%n+n:e%n);return o[l>>5]&1<<(31&l)?1:0}set(e,t,n){const r=t*this.X+e;n?this.buffer[r>>5]|=1<<(31&r):this.buffer[r>>5]&=~(1<<(31&r))}}const I=(e,t,n=.25)=>{const r=new X(e,t);for(let o=0;o<t;o++)for(let t=0;t<e;t++)Math.random()<n&&r.set(t,o,1);return r},W=(Y=[2,3],j=[3],(e,t,n)=>{const r=e.get(t-1,n-1)+e.get(t,n-1)+e.get(t+1,n-1)+e.get(t-1,n)+e.get(t+1,n)+e.get(t-1,n+1)+e.get(t,n+1)+e.get(t+1,n+1);return e.get(t,n)?Y.includes(r):j.includes(r)});var Y,j;const q=(e,t)=>{const n=Array(e);for(let r=0;r<e;r++)n[r]=t(r);return n},z=3,O=128,R=128,U=E("<td></td>",2),G=E("<tr></tr>",2),J=E('<table style="table-layout: fixed"></table>',2),K=E('<button type="button"></button>',2),Q=E('<aside><table><tbody><tr><td>Cell Size:</td><td><input type="number" min="0"></td></tr><tr><td>World Width:</td><td><input type="number" min="0"></td></tr><tr><td>World Height:</td><td><input type="number" min="0"></td></tr></tbody></table><div> fps</div></aside>',29),V=E('<h1 style="text-align: center"><a target="_blank" rel="noopener noreferrer" href="https://github.com/ryansolid/solid">Solid</a></h1>',4),Z=E("<main></main>",2),[ee,te]=a(z),[ne,re]=a(O),[oe,le]=a(R),[se,ie]=a(I(ne(),oe())),[ue,ce]=a(!1),[fe,ae]=a(0),de=({x:e,y:t})=>(()=>{const n=U.cloneNode(!0);return d((r=>{const o=se().get(e,t)?"cell cell-alive":"cell",l=`${ee()}px`,s=`${ee()}px`;return o!==r._v$&&(n.className=r._v$=o),l!==r._v$2&&n.style.setProperty("width",r._v$2=l),s!==r._v$3&&n.style.setProperty("height",r._v$3=s),r}),{_v$:void 0,_v$2:void 0,_v$3:void 0}),n})(),he=({y:e})=>(()=>{const t=G.cloneNode(!0);return B(t,(()=>q(ne(),(t=>_(de,{x:t,y:e}))))),t})(),pe=()=>(()=>{const e=J.cloneNode(!0);return B(e,(()=>q(oe(),(e=>_(he,{y:e}))))),e})(),ve=({onClick:e,children:t})=>(()=>{const n=K.cloneNode(!0);var r,o,l;return r=n,o="click",l=e,!0?Array.isArray(l)?(r[`$$${o}`]=l[0],r[`$$${o}Data`]=l[1]):r[`$$${o}`]=l:Array.isArray(l)?r.addEventListener(o,(e=>l[0](l[1],e))):r.addEventListener(o,l),B(n,t),n})(),ge=()=>(()=>{const e=Q.cloneNode(!0),t=e.firstChild,n=t.firstChild.firstChild,r=n.firstChild.nextSibling.firstChild,o=n.nextSibling,l=o.firstChild.nextSibling.firstChild,s=o.nextSibling.firstChild.nextSibling.firstChild,i=t.nextSibling,u=i.firstChild;return r.addEventListener("change",(e=>te(e.currentTarget.valueAsNumber))),l.addEventListener("change",(e=>re(e.currentTarget.valueAsNumber))),s.addEventListener("change",(e=>le(e.currentTarget.valueAsNumber))),B(e,(()=>{const e=T((()=>!!ue()),!0);return()=>e()?_(ve,{onClick:()=>ce(!1),children:"Stop"}):_(ve,{onClick:()=>ce(!0),children:"Start"})})(),i),B(e,_(ve,{onClick:()=>ie(I(ne(),oe())),children:"Randomize"}),i),B(i,fe,u),d((e=>{const t=ee(),n=ne(),o=oe();return t!==e._v$4&&(r.value=e._v$4=t),n!==e._v$5&&(l.value=e._v$5=n),o!==e._v$6&&(s.value=e._v$6=o),e}),{_v$4:void 0,_v$5:void 0,_v$6:void 0}),e})(),be=()=>{let e;return h((()=>ie(I(ne(),oe())))),h((()=>{ue()?e=((e,t)=>{let n=0,r=Date.now(),o=0,l=requestAnimationFrame((function t(){o||(e(),n++,l=requestAnimationFrame(t))})),s=setInterval((()=>{let e=Date.now();t(1e3*n/(e-r)|0),n=0,r=e}),512);return()=>{o=1,cancelAnimationFrame(l),clearInterval(s)}})((()=>ie(((e,t=W)=>{const{X:n,Y:r}=e,o=new X(n,r);for(let l=0;l<r;l++)for(let r=0;r<n;r++)t(e,r,l)&&o.set(r,l,1);return o})(se()))),ae):(e?.(),e=void 0)})),[V.cloneNode(!0),(()=>{const e=Z.cloneNode(!0);return B(e,_(pe,{}),null),B(e,_(ge,{}),null),e})()]};!function(e,t,n){let s;(function(e,t){t&&(o=t);const n=l,s=o,i=0===e.length?r:{owned:null,cleanups:null,context:null,owner:s,attached:!!t};let u;o=i,l=null;try{$((()=>u=e((()=>A(i)))),!0)}finally{l=n,o=s}})((r=>{s=r,B(t,e(),t.firstChild?null:void 0,n)}))}((()=>_(be,{})),document.body.appendChild(document.createElement("div"))),function(e){const t=document[k]||(document[k]=new Set);for(let n=0,r=e.length;n<r;n++){const r=e[n];t.has(r)||(t.add(r),document.addEventListener(r,P))}}(["click"])}();
