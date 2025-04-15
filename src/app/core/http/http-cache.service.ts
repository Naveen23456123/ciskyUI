import { Injectable } from '@angular/core';
import { Logger } from '../logger.service';
import { HttpResponse } from '@angular/common/http';
import { HttpCaheEntry } from '@app/shared/models/cache/CacheEntry';

const log = new Logger('HttpCacheService');
const cachePersistenceKey = 'http-cache';

@Injectable()
/**
 * Provide a cache facility for HTTP request with configurable persistance policy.
 */
export class HttpCacheService {

  private cacheData: { [key: string]: HttpCaheEntry } = {};
  private storage!: Storage | null;
  constructor() {
    this.setPersistence('local');
    this.loadCacheData();

  }

/**
 * Sets the cache data for specified request.
 * @param url The requested URL.
 * @param data The recieved Data.
 * @param lastUpdated The cache last updated date , current date is used if no date is specified.
 */
  setCacheData(url: string, data: HttpResponse<any>, lastUpdated?: Date) {
    this.cacheData[url] = ({
      lastUpdated: lastUpdated || new Date(),
      data
    } as HttpCaheEntry);
    log.debug(`Cache entry set for the key = "${url}"`);
    this.saveCacheData();
  }

  /**
   * Gets the cached entry for specified request.
   * @param url The request URL.
   * @return The cache entry or null if no cache entry exists for this request.
   */
  gethttpCacheEntry(url: string): HttpCaheEntry |null{
    return this.cacheData[url] || null;
  }
  /**
   * Get the cache data for specified request.
   * @param url The request URL.
   * @return The cache data or null if no data exists for this request.
   */
  getCacheData(url: string): HttpResponse<any> {
    const cacheEntry = this.cacheData[url];
    if (cacheEntry) {
      return cacheEntry.data;
    }
    return null as unknown as HttpResponse<any>;
  }
/**
 * Clear the cache entry (if exists) for this specified request.
 * @param url The request URL.
 */
  clearCache(url: string) {
    delete this.cacheData[url];
    log.debug(`Cache cleared for the key = "${url}"`);
    this.saveCacheData();
  }

  /**
   * Cleans the cache entries older then the specified date.
   * @param expirationDate The cache cleared date.If no date is specified all cache data is cleared.
   */
  cleanCache(expirationDate?: Date) {
    if (expirationDate) {
      Object.entries(this.cacheData).forEach(([key, value]) => {
        if (expirationDate >= value.lastUpdated) {
          delete this.cacheData[key];
        }
      });
    }
    else {
      this.cacheData = {};
    }
    this.saveCacheData();
  }

  /**
   * Set the cache persistence policy.
   * Note that changing the cache persistence will also clear the cache from its previos storage.
   * @param persistance How the cache should be persisted, it can either be local or session storage, or if no value is provided it will be only in-memory (default)
   */
  setPersistence(persistance?: 'local' | 'session') {
    this.cleanCache();
    this.storage = (persistance === 'local' || persistance === 'session') ? window[`${persistance}Storage`] : null;
    this.loadCacheData();
  }

  private loadCacheData() {
    const data = this.storage ? this.storage.getItem(cachePersistenceKey) : null;
    this.cacheData = data ? JSON.parse(data) : {};
  }

  private saveCacheData() {
    if (this.storage) {
      this.storage.setItem(cachePersistenceKey, JSON.stringify(this.cacheData));
    }
  }
}
