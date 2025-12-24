import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { getRedirectUrl } from './logic';


declare let self: ServiceWorkerGlobalScope;

// Standard PWA cleanup and caching of index.html/css/js
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Check if this is a navigation request (browser address bar)
    // AND if it has the ?q= parameter
    if (event.request.mode === 'navigate' && url.searchParams.has('q')) {
        const query = url.searchParams.get('q');
        const redirectUrl = getRedirectUrl(query);

        if (redirectUrl) {
            // INTERCEPT: Respond immediately with a 302 Redirect
            // The browser will go straight to the target, skipping index.html entirely
            event.respondWith(Response.redirect(redirectUrl, 302));
            return;
        }
    }
});
