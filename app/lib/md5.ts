import crypto from 'node:crypto'

export const md5 = (toEncode: any): string => {
  return crypto.createHash('md5').update(toEncode.toString()).digest('hex') // Create a hash based on the page content
}
