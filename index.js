'use strict';

var isObject = require('is-plain-object');
var forOwn = require('for-own');

module.exports = function deepMixin(o, objects) {
  if (!isObject(o)) return {};
  if (!isObject(objects)) return o;

  var len = arguments.length - 1;
  for (var i = 0; i < len; i++) {
    var obj = arguments[i + 1];

    if (isObject(obj)) {
      forOwn(obj, copy, o);
    }
  }

  function copy(value, key) {
    var obj = this[key];
    if (isObject(value) && isObject(obj)) {
      deepMixin(obj, value);
    } else {
      this[key] = value;
    }
  }
  return o;
};
