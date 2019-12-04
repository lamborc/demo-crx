'use strict'

const debug = require('debug')

const log = debug('basex:dnslink')
log.error = debug('basex:dnslink:error')

const LRU = require('lru-cache')
const { default:PQueue } = require('p-queue')

module.exports = function createDnslinkResolver (getState) {
  const cacheOptions = {max:1000,maxAge: 1000 * 60 * 60 * 12}

  const cache = new LRU(cacheOptions)

  const lookupQueue = new PQueue({concurrency: 8 })

  const dnslinkResolver = {
    get _cache () {
      return cache
    },

    setDnslink (fqdn,value) {
      cache.set(fqdn,value)
    },

    clearCache () {
      cache.reset()
    },

    cachedDnslink (fqdn) {
      return cache.get(fqdn)
    },

    canLookupURL (requestUrl) {
      const state = getState()

    }
  }

  return dnslinkResolver
}
