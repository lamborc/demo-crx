'use strict'

const browser = require('webextension-polyfill')
const html = require('choo/html')

function contextActions ({
  active,redirect
}) {


  return html`
    <div class="fade-in pv1">
      ContextMenu
    </div>
  `
}

module.exports.contextActions = contextActions

function activeTabActions (state) {

  return ;
} 

module.exports.activeTabActions = activeTabActions
