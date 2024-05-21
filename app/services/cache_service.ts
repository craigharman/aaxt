import app from '@adonisjs/core/services/app'
const cache = await app.container.make('cache')

export { cache as default }
