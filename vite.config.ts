import adonisjs from '@adonisjs/vite/client'
import { defineConfig } from 'vite'
import inject from '@rollup/plugin-inject'

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['resources/css/app.css', 'resources/js/app.js'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
    inject({
      htmx: 'htmx.org',
    }),
  ],
})
