'use strict'

const browser = require('webextension-polyfill')
const html = require('choo/html')

module.exports = function header(props) {

  return html`
    <div class="pt3 pb1">
      Header-div-logo
    </div>
  `
}
