var kHash = require("../hash.js")

var bins = new Array(8)

kHash("foo", bins)
console.log(bins)

kHash(15, bins)
console.log(bins)

kHash(15717.33451, bins)
console.log(bins)

kHash({"test": true}, bins)
console.log(bins)

kHash(true, bins)
console.log(bins)
