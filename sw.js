// SW: network-first para HTML/JS (cambios al instante), cache-first para assets
const CACHE = 'mundial-2026-v9';
const ASSETS = ['./', './index.html', './data.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isAppCode(req){
  if (req.mode === 'navigate') return true;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return false;
  return /\.(html|js|webmanifest)$/i.test(url.pathname) || url.pathname.endsWith('/');
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (isAppCode(e.request)) {
    // network-first: intenta red, cae a cache si offline
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
    );
  } else {
    // cache-first para imágenes/iconos
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
        return res;
      }))
    );
  }
});
