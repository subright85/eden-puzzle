const C = 'eden-v41';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C)
    .then(c => c.addAll(['/', '/manifest.webmanifest', '/icon-180.png', '/icon-512.png', '/assets/title.jpg',
      '/assets/puzzles/space.kid.jpg', '/assets/puzzles/sea.kid.jpg', '/assets/puzzles/dino.kid.jpg',
      '/assets/puzzles/balloon.kid.jpg', '/assets/puzzles/farm.kid.jpg', '/assets/puzzles/fire.kid.jpg',
      '/assets/puzzles/construction.kid.jpg', '/assets/puzzles/train.kid.jpg', '/assets/puzzles/candy.kid.jpg', '/assets/puzzles/safari.kid.jpg',
      '/assets/arts/starry.jpg', '/assets/arts/wave.jpg', '/assets/arts/jungle.jpg']))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// 네트워크 우선(업데이트 전파) + 캐시 폴백(오프라인 플레이)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const cp = r.clone();
      caches.open(C).then(c => c.put(e.request, cp));
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('/')))
  );
});
