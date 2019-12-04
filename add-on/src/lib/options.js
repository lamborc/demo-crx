'use strict'

const isFQDN = require('is-fqdn')
const { hasChromeSocketsForTcp } = require('./runtime-checks')

exports.optionDefaults = Object.freeze({
  active:true, //global ON/OFF switch
  basBootstrapIPv4:'104.238.165.23',
  basProxy:true
})
