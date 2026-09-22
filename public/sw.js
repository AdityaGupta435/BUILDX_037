const CACHE_NAME = "scholarmatch-offline-v3";

const APP_SHELL = [
  "/",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.add("/");
      } catch (error) {
        console.error("Failed to cache app shell:", error);
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("scholarmatch-offline-") &&
                key !== CACHE_NAME
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Do not intercept Vite development/HMR requests.
  if (
    url.pathname.includes("/@vite/") ||
    url.pathname.includes("/@react-refresh") ||
    url.pathname.includes("/__vite_ping") ||
    url.pathname.includes("/node_modules/.vite/")
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          const responseCopy = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseCopy).catch(() => {});
          });
        }

        return response;
      })
      .catch(async () => {
        /*
          Offline navigation:
          /scholarships
          /career
          /dashboard
          /saved
          etc.
          
          All should load the cached React app shell.
        */
        if (request.mode === "navigate") {
          const cachedApp = await caches.match("/");

          if (cachedApp) {
            return cachedApp;
          }
        }

        // Try exact cached resource.
        const cachedResource = await caches.match(request);

        if (cachedResource) {
          return cachedResource;
        }

        return new Response(
          "ScholarMatch is offline and this page has not been cached yet.",
          {
            status: 503,
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
            },
          }
        );
      })
  );
});