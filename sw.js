/* 画面の骨組みだけキャッシュする。お金のデータは絶対にキャッシュしない
   （古い残高を新しい残高として見せてしまうと、このアプリの意味がなくなる）

   HTML と manifest は「通信優先」。キャッシュ優先にすると、更新しても
   古い画面が出続けて、直したはずの不具合が携帯に永遠に残る（実際に残った）。
   画像は変わらないのでキャッシュ優先でよい。 */
const SHELL = 'banchou-shell-v3';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png',
               './assets/symbol.png', './assets/mascot-body.png',
               './assets/mascot-warn.png', './assets/mascot-ok.png'];

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

  const isPage = e.request.mode === 'navigate' ||
                 /\.(html|json|js)$/.test(u.pathname) || u.pathname.endsWith('/');
  if (isPage) {
    // 通信優先。つながらないときだけキャッシュを出す
    e.respondWith(
      fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(SHELL).then(c => c.put(e.request, copy)).catch(() => {});
        return r;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
