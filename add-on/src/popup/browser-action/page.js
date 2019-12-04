'use strict'

const html = require('choo/html')
const header = require('./header')


module.exports = function pageActionPage(state,emit) {
  const onCopy = (copyAction) => emit('copy',copyAction)

  return html`
    <div class="sans-serif" style="text-rendering: optimizeLegibility;">
      Action
    </div>
  `
}
