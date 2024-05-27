// import '../css/app.css'
import 'animate.css'
import 'htmx-ext-no-load'
import 'htmx-ext-no-cache'

import Alpine from 'alpinejs'
import htmx from 'htmx.org'

window.htmx = htmx
htmx.config.defaultSwapStyle = 'outerHTML'

window.Alpine = Alpine

Alpine.start()
