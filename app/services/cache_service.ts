import app from '@adonisjs/core/services/app'

export class CacheService {
  cache: { [key: string]: any } = {}

  set(key: string, value: any) {
    this.cache[key] = value
  }
  get(key: string): any {
    return this.cache[key]
  }
}

app.container.bind('cache', function () {
  return new CacheService()
})

const cache = await app.container.make('cache')

export { cache as default }
