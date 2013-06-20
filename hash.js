"use strict"

var hashInt = require("hash-int")
var murmur = require("murmurhash-js")

var hashFunc
if(typeof Float64Array !== "undefined") {
  //Typed array version
  var DOUBLE_BUFFER = new Float64Array(1)
  var INT_VIEW = new Uint32Array(DOUBLE_BUFFER.buffer)
  hashFunc = function hashTypedArray(key, bins) {
    var d = bins.length
    if(typeof key === "number") {
      if(key === key|0) {
        var b = hashInt(key)
        bins[0] = b
        for(var i=1; i<d; ++i) {
          b = hashInt(b)
          bins[i] = b
        }
      } else {
        DOUBLE_BUFFER[0] = key
        var b = hashInt(INT_VIEW[0] + hashInt(INT_VIEW[1]))
        bins[0] = b
        for(var i=1; i<d; ++i) {
          b = hashInt(b)
          scratch[i] = b
        }
      }
    } else if(typeof key === "string") {
      for(var i=0; i<d; ++i) {
        bins[i] = murmur(key, i)
      }
    } else if(typeof key === "object") {
      var str
      if(key.toString) {
        str = key.toString()
      } else {
        str = JSON.stringify(key)
      }
      for(var i=0; i<d; ++i) {
        bins[i] = murmur(str, i)
      }
    } else {
      var str = key + ""
      for(var i=0; i<d; ++i) {
        bins[i] = murmur(str, i)
      }
    }
  }
} else {
  //Untyped version
  hashFunc = function hashNoTypedArray(key, bins) {
    var d = bins.length
    if(typeof key === "number") {
      if(key === key|0) {
        var b = hashInt(key)
        bins[0] = b
        for(var i=0; i<d; ++i) {
          b = hashInt(b)
          bins[i] = b
        }
        return
      }
    } else if(typeof key === "string") {
      for(var i=0; i<d; ++i) {
        bins[i] = murmur(key, i)
      }
      return
    } else if(typeof key === "object") {
      var str
      if(key.toString) {
        str = key.toString()
      } else {
        str = JSON.stingify(key)
      }
      for(var i=0; i<d; ++i) {
        bins[i] = murmur(str, i)
      }
      return
    }
    var str = key + ""
    for(var i=0; i<d; ++i) {
      bins[i] = murmur(str, i)
    }
  }
}

module.exports = hashFunc