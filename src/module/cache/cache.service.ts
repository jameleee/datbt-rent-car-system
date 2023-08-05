import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Paging } from 'src/utils/types/paging.types';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async saveCarData(userId: string, car: any): Promise<void> {
    await this.cacheManager.set(userId, car, 60 * 60 * 2 * 1000);
  }

  async getCarData(userId: string): Promise<Paging | undefined> {
    return await this.cacheManager.get(userId);
  }
}
