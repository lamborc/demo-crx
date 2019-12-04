'use strict'

const choo = require('choo')
const optionsPage = require('./page')
const optionsStore = require('./store')

const app = choo()

app.use(optionsStore)

app.route('*',optionsPage)

app.mount('#root')

if(window.navigator.vendor === 'Google Inc.') {
  document.querySelector('html').className = 'is-chrome'
  console.log('background > ')
}
