'use strict'

const html = require('choo/html')
const { contextActions } = require('../browser-action/context-actions')

module.exports = function pageActionPage(state,emit) {
  const onCopy = (copyAction) => emit('copy',copyAction)

  const onToggleSiteRedirect = () => emit('toggleSiteRedirect')

  const contextActionProps = Object.assign({onCopy, onToggleSiteRedirect },state)

  return html`
    <div class="sans-serif" style="text-rendering:optimizeLegibility;">
      ${contextActions(contextActionProps)}
    </div>
  `
}
