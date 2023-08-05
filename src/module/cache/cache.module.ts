import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { CacheService } from './cache.service';
import type { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        });

        return {
          store: {
            create: () => store as unknown as CacheStore,
          },
          ttl: 60 * 60 * 24 * 7, // 1 week
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
@Global()
export class RedisCacheModule {}
