const CACHE_NAME = "hm-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./analysis.html",
  "./style.css",
  "./script-quiz.js",
  "./script-analysis.js",
  "./questions1.json",
  "./logo.jpg",
  "https://cdn.jsdelivr.net/npm/chart.js@4.4.1",
  "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
  "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
];

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS))
  );
  self.skipWaiting();
});
self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
    ))
  );
});
self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request).then(res=>res||fetch(e.request))
  );
});
