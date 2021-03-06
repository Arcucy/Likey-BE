const ar = require('arweave')

const Arweave = ar.init({
  host: 'arweave.arcucy.io',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
})

module.exports = Arweave
