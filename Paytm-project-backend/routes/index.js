const express = require('express')
const routerUser = require("./user")
const accRouter = require("./account")
const router = express.Router()

router.use('/user',routerUser)

router.use('/account',accRouter)

module.exports = router