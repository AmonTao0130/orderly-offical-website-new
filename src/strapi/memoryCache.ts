export const TTL_MAP = {
  // 缓存半个钟的 API 结果，防止频繁第三方请求 API
  DEFAULT: 30 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  // dev 验证的时候，可以设置 5 分钟缓存，方便快速验证
  MINUTES_DEV: 5 * 60 * 1000,
};

type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

export type MemoryCache<T> = {
  get: (key: string) => T | undefined;
  set: (key: string, data: T, ttlMs?: number) => void;
};

export const createMemoryCache = <T>(
  defaultTtlMs = TTL_MAP.DEFAULT
): MemoryCache<T> => {
  const store = new Map<string, CacheEntry<T>>();

  const get = (key: string) => {
    const cached = store.get(key);
    if (!cached) {
      return undefined;
    }

    if (cached.expiresAt <= Date.now()) {
      store.delete(key);
      return undefined;
    }

    return cached.data;
  };

  const set = (key: string, data: T, ttlMs?: number) => {
    store.set(key, {
      data,
      expiresAt: Date.now() + (ttlMs || defaultTtlMs),
    });
  };

  return { get, set };
};

export const memoryCache = createMemoryCache<any>();

export const getDataFromCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs?: number
): Promise<{ data: T; hit: boolean }> => {
  const cached = memoryCache.get(key);
  if (cached !== undefined) {
    return { data: cached, hit: true };
  }

  try {
    const data = await fetcher();
    memoryCache.set(key, data, ttlMs);
    return { data, hit: false };
  } catch (error) {
    return { data: null as T, hit: false };
  }
};
