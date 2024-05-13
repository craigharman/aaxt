import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import crypto from 'node:crypto'

export default class CacheControlMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const eTag = crypto.createHash('md5', ctx.response.getBody()).digest('hex') // Create a hash based on the page content
    /**
     * Append some Cache-Control related headers
     */
    ctx.response.append('Cache-Control', 'private, max-age=300') // Max age is 5 minutes, before eTag will be checked
    ctx.response.append('ETag', eTag) // ETag is a hash of the page being requested

    /*
     * Server renders the full HTML when the HX-Request header is missing or false, and it renders a fragment of that HTML when HX-Request: true
     */
    ctx.response.append('Vary', 'HX-Request')

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
