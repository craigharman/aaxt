import { BentoCache, bentostore } from 'bentocache'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    cache: BentoCache<Record<string, typeof bentostore>>
  }
}
