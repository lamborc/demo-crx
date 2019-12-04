'use strict'

const choo = require('choo')
const pageActionPage = require('./page')
const browserActionStore = require('../browser-action/store')

const app = choo()

app.use(browserActionStore)
app.route('*',pageActionPage)

app.mount('#root')
