/**
 * 编程语言教程系统 - Service Worker
 * 支持离线访问和缓存管理
 */

const CACHE_NAME = 'tutorial-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/programming-languages-tutorial.html',
    '/tutorial-hub.html',
    '/tutorial-python.html',
    '/tutorial-javascript.html',
    '/tutorial-java.html',
    '/tutorial-cpp.html',
    '/tutorial-csharp.html',
    '/tutorial-go.html',
    '/tutorial-rust.html',
    '/tutorial-typescript.html',
    '/tutorial-php.html',
    '/tutorial-swift.html',
    '/tutorial-style.css',
    '/tutorial-features.css',
    '/tutorial-common.js'
];

// 安装事件 - 预缓存静态资源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('预缓存静态资源');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// 请求拦截 - 缓存优先策略
self.addEventListener('fetch', (event) => {
    // 只缓存GET请求
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // 如果有缓存，返回缓存
                if (cachedResponse) {
                    // 同时在后台更新缓存
                    fetchAndUpdate(event.request);
                    return cachedResponse;
                }
                
                // 没有缓存，从网络获取
                return fetchAndCache(event.request);
            })
            .catch(() => {
                // 网络失败，返回离线页面
                if (event.request.destination === 'document') {
                    return caches.match('/offline.html');
                }
            })
    );
});

// 从网络获取并缓存
async function fetchAndCache(request) {
    try {
        const response = await fetch(request);
        
        // 检查响应是否有效
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }
        
        // 克隆响应并缓存
        const responseToCache = response.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, responseToCache);
        
        return response;
    } catch (error) {
        console.log('Fetch failed:', error);
        throw error;
    }
}

// 后台更新缓存
async function fetchAndUpdate(request) {
    try {
        const response = await fetch(request);
        
        if (!response || response.status !== 200) return;
        
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response);
    } catch (error) {
        // 静默失败，不影响用户
        console.log('Background update failed:', error);
    }
}

// 消息处理 - 手动更新缓存
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
    
    if (event.data === 'clearCache') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('Cache cleared');
        });
    }
});

// 后台同步（用于离线时保存的数据）
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-progress') {
        event.waitUntil(syncProgress());
    }
});

async function syncProgress() {
    // 在实际应用中，这里会将离线数据同步到服务器
    console.log('Syncing offline progress...');
}

// 推送通知
self.addEventListener('push', (event) => {
    const options = {
        body: event.data?.text() || '该继续学习啦！',
        icon: '/favicon.ico',
        badge: '/badge.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'open', title: '开始学习' },
            { action: 'close', title: '稍后' }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('学习提醒', options)
    );
});

// 通知点击处理
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('/tutorial-hub.html')
        );
    }
});