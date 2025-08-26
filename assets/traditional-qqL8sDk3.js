import{b as M,d as U,R as C}from"./index-BW0KzlOM.js";var R={exports:{}},g={},j={exports:{}},x={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var V;function G(){if(V)return x;V=1;var e=M();function u(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var c=typeof Object.is=="function"?Object.is:u,s=e.useState,S=e.useEffect,h=e.useLayoutEffect,y=e.useDebugValue;function m(t,r){var o=r(),f=s({inst:{value:o,getSnapshot:r}}),i=f[0].inst,d=f[1];return h(function(){i.value=o,i.getSnapshot=r,v(i)&&d({inst:i})},[t,o,r]),S(function(){return v(i)&&d({inst:i}),t(function(){v(i)&&d({inst:i})})},[t]),y(o),o}function v(t){var r=t.getSnapshot;t=t.value;try{var o=r();return!c(t,o)}catch{return!0}}function n(t,r){return r()}var a=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?n:m;return x.useSyncExternalStore=e.useSyncExternalStore!==void 0?e.useSyncExternalStore:a,x}var O;function L(){return O||(O=1,j.exports=G()),j.exports}/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _;function $(){if(_)return g;_=1;var e=M(),u=L();function c(n,a){return n===a&&(n!==0||1/n===1/a)||n!==n&&a!==a}var s=typeof Object.is=="function"?Object.is:c,S=u.useSyncExternalStore,h=e.useRef,y=e.useEffect,m=e.useMemo,v=e.useDebugValue;return g.useSyncExternalStoreWithSelector=function(n,a,t,r,o){var f=h(null);if(f.current===null){var i={hasValue:!1,value:null};f.current=i}else i=f.current;f=m(function(){function w(l){if(!W){if(W=!0,b=l,l=r(l),o!==void 0&&i.hasValue){var E=i.value;if(o(E,l))return p=E}return p=l}if(E=p,s(b,l))return E;var I=r(l);return o!==void 0&&o(E,I)?(b=l,E):(b=l,p=I)}var W=!1,b,p,q=t===void 0?null:t;return[function(){return w(a())},q===null?void 0:function(){return w(q())}]},[a,t,r,o]);var d=S(n,f[0],f[1]);return y(function(){i.hasValue=!0,i.value=d},[d]),v(d),d},g}var D;function k(){return D||(D=1,R.exports=$()),R.exports}var B=k();const A=U(B),F=e=>{let u;const c=new Set,s=(n,a)=>{const t=typeof n=="function"?n(u):n;if(!Object.is(t,u)){const r=u;u=a??(typeof t!="object"||t===null)?t:Object.assign({},u,t),c.forEach(o=>o(u,r))}},S=()=>u,m={setState:s,getState:S,getInitialState:()=>v,subscribe:n=>(c.add(n),()=>c.delete(n))},v=u=e(s,S,m);return m},H=e=>e?F(e):F,{useSyncExternalStoreWithSelector:J}=A,K=e=>e;function N(e,u=K,c){const s=J(e.subscribe,e.getState,e.getInitialState,u,c);return C.useDebugValue(s),s}const z=(e,u)=>{const c=H(e),s=(S,h=u)=>N(c,S,h);return Object.assign(s,c),s},Q=(e,u)=>e?z(e,u):z;export{H as a,Q as c,A as u};
