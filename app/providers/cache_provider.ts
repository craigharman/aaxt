import { ApplicationService } from '@adonisjs/core/types'
import { BentoCache } from 'bentocache'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}
  register() {
    this.app.container.bind('cache', async (resolver) => {
      const configService = await resolver.make('config')
      const cacheConfig = configService.get<any>('cache')
      return new BentoCache(cacheConfig)
    })
  }
  boot() {
    // Could also do this but doing in a service instead
    // this.app.container.make('cache')
  }
}
