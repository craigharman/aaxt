// import '../css/app.css'
import 'animate.css'

import Alpine from 'alpinejs'
import htmx from 'htmx.org'

// If a url request matches the current path then do not fetch it
htmx.defineExtension('no-load', {
  onEvent: function (name, evt) {
    if (name === 'htmx:confirm') {
      if (evt.detail.path === window.location.pathname) {
        evt.preventDefault() // Cancel the event
      }
    }
  },
})

window.htmx = htmx
htmx.config.defaultSwapStyle = 'outerHTML'

window.Alpine = Alpine

Alpine.start()
