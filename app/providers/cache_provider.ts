import { ApplicationService } from '@adonisjs/core/types'
import { BentoCache } from 'bentocache'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}
  register() {
    this.app.container.bind('cache', async (resolver) => {
      const configService = await resolver.make('config')
      const cacheConfig = configService.get<any>('cache')
      console.log(cacheConfig)
      return new BentoCache(cacheConfig)
    })
  }
}
