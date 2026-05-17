let cache: any[] = [];
let lastFetch = 0;

const CACHE_DURATION = 1000 * 60 * 5;

export class CacheService {
  static getCache() {
    return cache;
  }

  static setCache(data: any[]) {
    cache = data;
    lastFetch = Date.now();
  }

  static isExpired() {
    return Date.now() - lastFetch > CACHE_DURATION;
  }
}