'use strict'

const browser = require('webextension-polyfill')

function createNotifier(getState) {
  return (titleKey,messageKey,messageParam) => {
    const title = browser.i18n.getMessage(titleKey)||titleKey

    let message 
    if(messageKey.startsWith('notify_')) {
      message = messageParam ? browser.i18n.getMessage(messageKey,messageParam) : 
        browser.i18n.getMessage(messageKey)
    }else {
      message = messageKey
    }

    if(getState().displayNotifications && browser && browser.notifications.create) {
      browser.notifications.create({
        type:'basic',
        iconUrl:browser.extension.getURL('icons/bas-httb.svg'),
        title:title,
        message:message
      }).catch(err => console.warn(`[basex] Browser notification failed: ${err.message}`))
    }
  }
  console.info(`[basex] Browser notification ${title} : ${message}`)
}

module.exports = createNotifier
