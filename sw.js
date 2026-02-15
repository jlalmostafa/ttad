// ملف sw.js - سيرفس ووركر لتطبيق الطلبات (PWA)

const CACHE_NAME = 'talabat-cache-v1';
const urlsToCache = [
  '.',
  'index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// تثبيت السيرفس ووركر وتخزين الملفات في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// استراتيجية الجلب: البحث في الكاش أولاً، ثم طلب الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});

// تفعيل السيرفس ووركر وحذف الكاشات القديمة
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
        .map(name => caches.delete(name))
      );
    })
  );
});