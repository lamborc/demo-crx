'use strict'

const choo = require('choo')
const browserActionPage = require('./page')
const browserActionStore = require('./store')

const app = choo()

app.use(browserActionStore)
app.route('*',browserActionPage)
app.mount('#root')
