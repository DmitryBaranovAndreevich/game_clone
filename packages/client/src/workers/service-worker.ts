/// <reference lib="WebWorker" />

export type {}
declare const self: ServiceWorkerGlobalScope

// to test worker: yarn build => yarn preview --scope client

const CACHE_NAME = "cache-v2"

const allFilesWay = ["/", "/asset", "/static"]

const initCache = async () => {
  try {
    const cache = await caches.open(CACHE_NAME)
    return await cache.addAll(allFilesWay)
  } catch {
    return Promise.reject("Init sw cache err")
  }
}

const tryNetwork = (request: Request, time: number): Promise<Response> => {
  return new Promise((resolve, rej) => {
    const timer = setTimeout(() => rej, time)
    fetch(request).then(res => {
      clearTimeout(timer)
      const responseClone = res.clone()
      caches.open(CACHE_NAME).then(cache => {
        if (request.url.indexOf("http") === 0) {
          cache.put(request, responseClone)
        }
      })
      resolve(res)
    }, rej)
  })
}

const getFromCache = async (request: Request): Promise<Response> => {
  try {
    const cache = await caches.open(CACHE_NAME)
    const result = await cache.match(request)
    if (result) {
      return result
    }
    return Promise.reject("no match")
  } catch {
    return Promise.reject("no match")
  }
}

self.addEventListener("install", e => {
  e.waitUntil(initCache())
})

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        }),
      )
    }),
  )
})

self.addEventListener("fetch", e => {
  e.respondWith(
    tryNetwork(e.request, 400).catch(() => {
      return getFromCache(e.request)
    }),
  )
})
