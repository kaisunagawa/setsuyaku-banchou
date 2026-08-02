/* 画面の骨組みだけキャッシュする。お金のデータは絶対にキャッシュしない
   （古い残高を新しい残高として見せてしまうと、このアプリの意味がなくなる） */
const SHELL = 'banchou-shell-v1';
const FILES = ['./', './index.html', './manifest.json',
               './assets/logo.png', './assets/mascot-warn.png', './assets/mascot-ok.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.hostname.indexOf('script.google') >= 0) return;   // ★APIは素通し。キャッシュしない
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
