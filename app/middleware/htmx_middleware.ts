import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import cache from '#services/cache_service'
import { md5 } from '../lib/md5.js'
import { parse } from 'node-html-parser'

export default class HtmxMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /** Check if we will return components or the whole page? */
    let isHTMLXRequest = false
    let targets: string | undefined

    let cacheKey = ctx.route?.pattern

    if ('hx-request' in ctx.request.headers()) {
      isHTMLXRequest = true

      const headers = ctx.request.headers()

      // A specific target has been selected
      if ('hx-target' in headers) {
        targets = `#${ctx.request.headers()['hx-target']!.toString()}`
      }

      // Specific out of bounds headers have been requested
      if (ctx.request.qs()['elements']) {
        targets = ctx.request.qs()['elements']
      }

      if (!targets) {
        throw new Error('Missing hx-target or hx-select-oob')
      }
      cacheKey += targets
    }
    console.log('Cache key unhashed', cacheKey)
    cacheKey = md5(cacheKey)
    console.log('Cache key hashed', cacheKey)
    const cachedHTML = await cache.get(cacheKey)
    console.log('Cached data', cachedHTML)
    if (cachedHTML) {
      console.log('Getting from cache!')
      return ctx.response.send(cachedHTML)
    }

    /**
     * Call next method in the pipeline and return its output
     */

    // use AST to process the rendered output generated by edge and only return the @mata component requested
    await next()

    const response = ctx.response
    if (response.hasContent && isHTMLXRequest) {
      // Set the page URL path
      // response.header('Hx-Push-Url', ctx.request.url()) // Now doing this via the client

      let html = ''
      const page = parse(response.content![0])
      const title = page.querySelector('title')
      // Only send the data element if title/description fields require updating
      if (title) {
        html += `<title>${title.innerText}</title>`
      }
      let components = ''

      if (targets) {
        targets.split(',').forEach((target) => {
          components += page.querySelector(target)?.removeWhitespace().toString() || ''
        })
        response.header('HX-Reselect', targets)
      }

      html += components
      console.log('Setting cache')
      await cache.set(cacheKey, html)

      response.send(html)
    }

    return response
  }
}
