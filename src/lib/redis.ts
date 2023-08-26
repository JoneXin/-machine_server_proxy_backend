import Redis from 'ioredis';
import { redisConf as redis_conf } from '../config/redis.config';

export class NodeRedis {
    redis = null;

    constructor() {
        this.redis = new Redis({ host: redis_conf.host, password: redis_conf.password });
    }

    async get(key: string) {
        return await this.redis.get(key);
    }
    /**
     *
     * @param key
     * @param value
     * @param ttl // ttl==0的时候，代表永久
     * @returns
     */
    async set<T>(key: string, value: T, ttl?: number) {
        await this.redis.set(key, value);
        if (ttl !== 0) {
            await this.redis.expire(key, ttl || redis_conf.expire);
        }
        return true;
    }

    async del(key: string) {
        return await this.redis.del(key);
    }
}
