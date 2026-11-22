// Chord Sketch — service worker (offline support).
// - On install, every file of the app is stored on the device.
// - The page itself: network first (so an update on GitHub Pages is picked up
//   when online), falling back to the stored copy when offline or after 3 s.
// - Everything else (icons, manifest): the stored copy first.
// Bump VERSION only when the list of files changes; index.html updates itself.
const VERSION = 'chord-sketch-v1';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if(req.mode === 'navigate'){
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try{
        const res = await Promise.race([fetch(req), new Promise((_, no) => setTimeout(() => no(new Error('timeout')), 3000))]);
        if(res.ok) cache.put('index.html', res.clone());
        return res;
      }catch(_){
        return (await cache.match('index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
