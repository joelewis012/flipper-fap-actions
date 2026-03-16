// FlipperFAP Service Worker
const CACHE = 'flipperfap-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Handle push notifications
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || 'FlipperFAP', {
      body:  data.body  || 'Your .fap is ready!',
      icon:  '/flipper-fap-actions/icon.png',
      badge: '/flipper-fap-actions/icon.png',
      tag:   data.tag   || 'fap-compile',
      data:  data.url   ? { url: data.url } : {},
      actions: data.url ? [{ action:'download', title:'View Result' }] : [],
    })
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || '/flipper-fap-actions/';
  e.waitUntil(
    clients.matchAll({ type:'window' }).then(list => {
      for (const c of list) {
        if (c.url.includes('flipper-fap-actions') && 'focus' in c) return c.focus();
      }
      return clients.openWindow(url);
    })
  );
});

// Message from main thread: compile finished, show notification
self.addEventListener('message', e => {
  if (e.data?.type === 'COMPILE_DONE') {
    const { success, repoUrl, firmware } = e.data;
    const short = repoUrl.replace(/^https?:\/\//, '').replace(/\.git$/, '');
    self.registration.showNotification(
      success ? '✅ Compile Successful!' : '❌ Compile Failed',
      {
        body:  success
          ? `${short} compiled for ${firmware}. Tap to download.`
          : `${short} failed to compile. Tap to see the error.`,
        icon:  '/flipper-fap-actions/icon.png',
        badge: '/flipper-fap-actions/icon.png',
        tag:   'fap-' + Date.now(),
      }
    );
  }
});
