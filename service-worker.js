"use strict";var precacheConfig=[["/Halo/index.html","cc4e5bf4c7a22a7762f0e1b384f0faa7"],["/Halo/static/css/main.74a81e4c.css","80eed73ae66a594a5c3c6712bdd76568"],["/Halo/static/js/0.0c1283f4.chunk.js","a691689e27bc23617863da73cec22c4a"],["/Halo/static/js/1.0ea475ed.chunk.js","8afdc331fea1dc3c479ea44ae7464816"],["/Halo/static/js/10.9a8bd5af.chunk.js","9f3f45d0c2772016bb3f798cf84889a9"],["/Halo/static/js/11.1ce92666.chunk.js","0ca0e842f099c020d5021e759528660a"],["/Halo/static/js/12.79dbd807.chunk.js","5edaa4983175133662044ca00e4895af"],["/Halo/static/js/13.4b504bbb.chunk.js","21830146970d22f043afd144d82998e2"],["/Halo/static/js/2.4bab592f.chunk.js","814218955ce9d95b03d307bcc35f3b88"],["/Halo/static/js/3.c5849266.chunk.js","83f587b3eee374cf0b84208335de7431"],["/Halo/static/js/4.eef43247.chunk.js","708090ec6abe483311cdebf955c1af01"],["/Halo/static/js/5.0598d9e7.chunk.js","26d5e8d336367549d2e87b25e7c78367"],["/Halo/static/js/6.da4bfafb.chunk.js","b8cdd9a54901bddf1eb8cb5e14ca8651"],["/Halo/static/js/7.548612e6.chunk.js","fdb42ee7c023cab240ef703474f79d88"],["/Halo/static/js/8.af5b30dc.chunk.js","ab0105e6d6f4ad68cc5c3a75a6a2e990"],["/Halo/static/js/9.e3c8b2c3.chunk.js","295356f56668f91e95dcc58758944fdf"],["/Halo/static/js/main.02fed84d.js","596d0067c0d7964ac58b844ff0e1eca3"],["/Halo/static/media/bg.d37d2fc0.jpg","d37d2fc0d9330ec36dc6f22e2111b3f8"],["/Halo/static/media/icomoon.126e4331.woff","126e4331e53423d1abb4eccece156889"],["/Halo/static/media/icomoon.2d91cfbf.eot","2d91cfbf8d15f00768ee253f34088290"],["/Halo/static/media/icomoon.b2e5b09c.ttf","b2e5b09ce21940c5a6bef6b7717319a1"],["/Halo/static/media/icomoon.c092c786.svg","c092c7869fb0f22d52658eb660e44a52"],["/Halo/static/media/logo.17eb5e9f.png","17eb5e9f4d108a46b12d2bf342c1168b"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,c),e=urlsToCacheKeys.has(a));var n="/Halo/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});