// /*
// CryptoJS v3.1.2
// code.google.com/p/crypto-js
// (c) 2009-2013 by Jeff Mott. All rights reserved.
// code.google.com/p/crypto-js/wiki/License
// */
// var CryptoJS =
//   CryptoJS ||
//   (function (g, l) {
//     const e = {}
//     const d = (e.lib = {})
//     const m = function () {}
//     const k = (d.Base = {
//       extend(a) {
//         m.prototype = this
//         const c = new m()
//         a && c.mixIn(a)
//         c.hasOwnProperty('init') ||
//           (c.init = function () {
//             c.$super.init.apply(this, arguments)
//           })
//         c.init.prototype = c
//         c.$super = this
//         return c
//       },
//       create() {
//         const a = this.extend()
//         a.init.apply(a, arguments)
//         return a
//       },
//       init() {},
//       mixIn(a) {
//         for (const c in a) a.hasOwnProperty(c) && (this[c] = a[c])
//         a.hasOwnProperty('toString') && (this.toString = a.toString)
//       },
//       clone() {
//         return this.init.prototype.extend(this)
//       },
//     })
//     var p = (d.WordArray = k.extend({
//       init(a, c) {
//         a = this.words = a || []
//         this.sigBytes = c != l ? c : 4 * a.length
//       },
//       toString(a) {
//         return (a || n).stringify(this)
//       },
//       concat(a) {
//         const c = this.words
//         const q = a.words
//         const f = this.sigBytes
//         a = a.sigBytes
//         this.clamp()
//         if (f % 4)
//           for (var b = 0; b < a; b++)
//             c[(f + b) >>> 2] |=
//               ((q[b >>> 2] >>> (24 - 8 * (b % 4))) & 255) <<
//               (24 - 8 * ((f + b) % 4))
//         else if (q.length > 65535)
//           for (b = 0; b < a; b += 4) c[(f + b) >>> 2] = q[b >>> 2]
//         else c.push.apply(c, q)
//         this.sigBytes += a
//         return this
//       },
//       clamp() {
//         const a = this.words
//         const c = this.sigBytes
//         a[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4))
//         a.length = g.ceil(c / 4)
//       },
//       clone() {
//         const a = k.clone.call(this)
//         a.words = this.words.slice(0)
//         return a
//       },
//       random(a) {
//         for (var c = [], b = 0; b < a; b += 4)
//           c.push((4294967296 * g.random()) | 0)
//         return new p.init(c, a)
//       },
//     }))
//     const b = (e.enc = {})
//     var n = (b.Hex = {
//       stringify(a) {
//         const c = a.words
//         a = a.sigBytes
//         for (var b = [], f = 0; f < a; f++) {
//           const d = (c[f >>> 2] >>> (24 - 8 * (f % 4))) & 255
//           b.push((d >>> 4).toString(16))
//           b.push((d & 15).toString(16))
//         }
//         return b.join('')
//       },
//       parse(a) {
//         for (var c = a.length, b = [], f = 0; f < c; f += 2)
//           b[f >>> 3] |= parseInt(a.substr(f, 2), 16) << (24 - 4 * (f % 8))
//         return new p.init(b, c / 2)
//       },
//     })
//     const j = (b.Latin1 = {
//       stringify(a) {
//         const c = a.words
//         a = a.sigBytes
//         for (var b = [], f = 0; f < a; f++)
//           b.push(String.fromCharCode((c[f >>> 2] >>> (24 - 8 * (f % 4))) & 255))
//         return b.join('')
//       },
//       parse(a) {
//         for (var c = a.length, b = [], f = 0; f < c; f++)
//           b[f >>> 2] |= (a.charCodeAt(f) & 255) << (24 - 8 * (f % 4))
//         return new p.init(b, c)
//       },
//     })
//     const h = (b.Utf8 = {
//       stringify(a) {
//         try {
//           return decodeURIComponent(escape(j.stringify(a)))
//         } catch (c) {
//           throw new Error('Malformed UTF-8 data')
//         }
//       },
//       parse(a) {
//         return j.parse(unescape(encodeURIComponent(a)))
//       },
//     })
//     const r = (d.BufferedBlockAlgorithm = k.extend({
//       reset() {
//         this._data = new p.init()
//         this._nDataBytes = 0
//       },
//       _append(a) {
//         typeof a === 'string' && (a = h.parse(a))
//         this._data.concat(a)
//         this._nDataBytes += a.sigBytes
//       },
//       _process(a) {
//         const c = this._data
//         const b = c.words
//         let f = c.sigBytes
//         const d = this.blockSize
//         var e = f / (4 * d)
//         var e = a ? g.ceil(e) : g.max((e | 0) - this._minBufferSize, 0)
//         a = e * d
//         f = g.min(4 * a, f)
//         if (a) {
//           for (var k = 0; k < a; k += d) this._doProcessBlock(b, k)
//           k = b.splice(0, a)
//           c.sigBytes -= f
//         }
//         return new p.init(k, f)
//       },
//       clone() {
//         const a = k.clone.call(this)
//         a._data = this._data.clone()
//         return a
//       },
//       _minBufferSize: 0,
//     }))
//     d.Hasher = r.extend({
//       cfg: k.extend(),
//       init(a) {
//         this.cfg = this.cfg.extend(a)
//         this.reset()
//       },
//       reset() {
//         r.reset.call(this)
//         this._doReset()
//       },
//       update(a) {
//         this._append(a)
//         this._process()
//         return this
//       },
//       finalize(a) {
//         a && this._append(a)
//         return this._doFinalize()
//       },
//       blockSize: 16,
//       _createHelper(a) {
//         return function (b, d) {
//           return new a.init(d).finalize(b)
//         }
//       },
//       _createHmacHelper(a) {
//         return function (b, d) {
//           return new s.HMAC.init(a, d).finalize(b)
//         }
//       },
//     })
//     var s = (e.algo = {})
//     return e
//   })(Math)
// ;(function () {
//   const g = CryptoJS
//   var l = g.lib
//   const e = l.WordArray
//   const d = l.Hasher
//   const m = []
//   var l = (g.algo.SHA1 = d.extend({
//     _doReset() {
//       this._hash = new e.init([
//         1732584193,
//         4023233417,
//         2562383102,
//         271733878,
//         3285377520,
//       ])
//     },
//     _doProcessBlock(d, e) {
//       for (
//         var b = this._hash.words,
//           n = b[0],
//           j = b[1],
//           h = b[2],
//           g = b[3],
//           l = b[4],
//           a = 0;
//         a < 80;
//         a++
//       ) {
//         if (a < 16) m[a] = d[e + a] | 0
//         else {
//           var c = m[a - 3] ^ m[a - 8] ^ m[a - 14] ^ m[a - 16]
//           m[a] = (c << 1) | (c >>> 31)
//         }
//         c = ((n << 5) | (n >>> 27)) + l + m[a]
//         c =
//           a < 20
//             ? c + (((j & h) | (~j & g)) + 1518500249)
//             : a < 40
//             ? c + ((j ^ h ^ g) + 1859775393)
//             : a < 60
//             ? c + (((j & h) | (j & g) | (h & g)) - 1894007588)
//             : c + ((j ^ h ^ g) - 899497514)
//         l = g
//         g = h
//         h = (j << 30) | (j >>> 2)
//         j = n
//         n = c
//       }
//       b[0] = (b[0] + n) | 0
//       b[1] = (b[1] + j) | 0
//       b[2] = (b[2] + h) | 0
//       b[3] = (b[3] + g) | 0
//       b[4] = (b[4] + l) | 0
//     },
//     _doFinalize() {
//       const d = this._data
//       const e = d.words
//       const b = 8 * this._nDataBytes
//       const g = 8 * d.sigBytes
//       e[g >>> 5] |= 128 << (24 - (g % 32))
//       e[(((g + 64) >>> 9) << 4) + 14] = Math.floor(b / 4294967296)
//       e[(((g + 64) >>> 9) << 4) + 15] = b
//       d.sigBytes = 4 * e.length
//       this._process()
//       return this._hash
//     },
//     clone() {
//       const e = d.clone.call(this)
//       e._hash = this._hash.clone()
//       return e
//     },
//   }))
//   g.SHA1 = d._createHelper(l)
//   g.HmacSHA1 = d._createHmacHelper(l)
// })()
// ;(function () {
//   const g = CryptoJS
//   const l = g.enc.Utf8
//   g.algo.HMAC = g.lib.Base.extend({
//     init(e, d) {
//       e = this._hasher = new e.init()
//       typeof d === 'string' && (d = l.parse(d))
//       const g = e.blockSize
//       const k = 4 * g
//       d.sigBytes > k && (d = e.finalize(d))
//       d.clamp()
//       for (
//         var p = (this._oKey = d.clone()),
//           b = (this._iKey = d.clone()),
//           n = p.words,
//           j = b.words,
//           h = 0;
//         h < g;
//         h++
//       )
//         (n[h] ^= 1549556828), (j[h] ^= 909522486)
//       p.sigBytes = b.sigBytes = k
//       this.reset()
//     },
//     reset() {
//       const e = this._hasher
//       e.reset()
//       e.update(this._iKey)
//     },
//     update(e) {
//       this._hasher.update(e)
//       return this
//     },
//     finalize(e) {
//       const d = this._hasher
//       e = d.finalize(e)
//       d.reset()
//       return d.finalize(this._oKey.clone().concat(e))
//     },
//   })
// })()

// export { CryptoJS }
