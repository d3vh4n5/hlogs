const { Router } = require('express')
const router = Router()
const {
    indexView,
    usersView,
    docsView,
    restClient
} = require('../controllers/viewsController')

router.get('/', indexView)
router.get('/users', usersView)
router.get('/docs', docsView)
router.get('/rest-client', restClient)

module.exports = router