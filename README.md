# k-hash
Generic k-wise independent generic hasher for JavaScript

## Example

```javascript
var kHash = require("k-hash")

var bins = new Array(8)

kHash("foo", bins)
console.log(bins)

kHash(15, bins)
console.log(bins)

kHash({"test": true}, bins)
console.log(bins)
```

## Install
    
    npm install k-hash

## `require("k-hash")(key, bins)`
Hashes `key` into a collection of different bins.  Each value in `bins` is a 32-bit unsigned integer

* `key` is the key to hash
* `bins` is an array of values which get the output of the hash

## Credits
(c) 2013 Mikola Lysenko. MIT License
