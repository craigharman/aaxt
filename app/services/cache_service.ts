import { BentoCache, bentostore } from 'bentocache'

import app from '@adonisjs/core/services/app'
import { memoryDriver } from 'bentocache/drivers/memory'

app.container.bind('cache', async () => {
  console.log('Binding bento')
  // const configService = await resolver.make('config')
  // const cacheConfig = configService.get<any>('cache')
  return new BentoCache({
    default: 'axxtCache',
    stores: {
      // A first cache store named "axxtCache" using
      // only L1 in-memory cache
      axxtCache: bentostore().useL1Layer(memoryDriver()),
    },
    ttl: '1h',
    gracePeriod: {
      enabled: true,
      duration: '6h',
      fallbackDuration: '5m',
    },
  })
})

const cache = await app.container.make('cache')

export { cache as default }
