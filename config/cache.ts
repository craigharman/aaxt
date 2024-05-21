/**
 * You can add a BentoCache configuration here.
 * See https://bentocache.dev/docs/quick-setup for more options
 */
import { bentostore } from 'bentocache'
import { memoryDriver } from 'bentocache/drivers/memory'

export default {
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
}
