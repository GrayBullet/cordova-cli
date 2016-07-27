'use strict';

var optionsLoader = require('../../libs/options-loader');

describe('options-loader', function () {
  describe('load', function () {
    it('load from two sources', function () {
      var result = optionsLoader.load([
        {load: function () { return {a: 1, b: 2}}},
        {load: function () { return {b: 3, c: 4}}}
      ])

      expect(result).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
    });

    it('return value is copy', function () {
      var obj = {a: 1};

      var result = optionsLoader.load([{load: function () { return obj; }}]);

      expect(result).not.toBe(obj);
    })
  });
});
