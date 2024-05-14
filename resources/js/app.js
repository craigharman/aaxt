// import '../css/app.css'
import 'animate.css'

import Alpine from 'alpinejs'
import htmx from 'htmx.org'

window.hrmx = htmx
htmx.config.defaultSwapStyle = 'outerHTML'

window.Alpine = Alpine

Alpine.start()
