var stateHandler=function(n){"use strict";var t=Object.defineProperties,e=Object.keys,r=function(n,t,e,r,o){return{configurable:!0,get:function(){return r},set:function(u){(n||u!==r||t&&"object"==typeof u&&u)&&(r=u,e?o(r):o())}}},o=function(n,t,o,i,c,a){for(var f={},l=c!==u,v=[o,i,l],s=e(n),d=0;d<s.length;d++){var b=t(n,s[d]),g=l?c(b):[b,c];a&&(g[1]=a),f[s[d]]=r.apply(null,v.concat(g))}return f},u=function(){},i=function(n,t){return n[t]};return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=n.all,r=void 0!==e&&e,c=n.shallow,a=void 0===c||c,f=n.useState,l=void 0===f?u:f;return function(n,e){return t({},o(n,i,r,a,l,e))}}}();