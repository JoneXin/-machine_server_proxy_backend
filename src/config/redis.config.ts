import { join, resolve } from 'path';
import { readFileSync } from 'fs-extra';
const buffConfig = readFileSync(resolve('./config/redis.config.json'));
const redisConfig = JSON.parse(buffConfig.toString());

interface RedisConf {
    password: string;
    host: string;
    expire: number;
}

export const redisConf = {
    password: process.env.REDIS_PASSWORD || redisConfig.password,
    host: process.env.REDIS_HOST || redisConfig.host,
    expire: process.env.REDIS_EXPIRE || redisConfig.expire,
} as RedisConf;
