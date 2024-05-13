/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')
router.on('/features').render('pages/features')
router.on('/blog').render('pages/blog')
router.on('/contact').render('pages/contact')
router.on('/quote').render('components/quote')
