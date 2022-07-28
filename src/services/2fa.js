const notp = require('notp')
const b32 = require('thirty-two') // node-2fa

const generateToken = secret => {
    if (!secret || !secret.length) return null

    const unformatted = secret.replace(/\W+/g, '').toUpperCase()
    const bin = b32.decode(unformatted)

    return {
        code: notp.totp.gen(bin),
        remaining: (30 - Math.floor(new Date().getTime() / 1000 % 30))
    }
}

module.exports = { generateToken }