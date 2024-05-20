import { CacheService } from '../app/services/cache_service.js'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    cache: CacheService
  }
}
