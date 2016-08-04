'use strict';

var cordova = require('./libs/cordova-spawn');
var optionsFactory = require('./libs/options-loader');

var invoke = function (args) {
  var cliOptions = optionsFactory.load();

  var options = {
    cwd: cliOptions['cordova-root']
  };

  return cordova(args, options);
};

module.exports = invoke;
