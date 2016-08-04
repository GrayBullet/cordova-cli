'use strict';

var cordova = require('./libs/cordova-spawn');
var optionsFactory = require('./libs/options-loader');
var cordovaArguments = require('./libs/cordova-arguments');

var invoke = function (args) {
  var cliOptions = optionsFactory.load();

  var options = {
    cwd: cliOptions['cordova-root']
  };

  return cordova(args, options)
    .then(function () {
      if (cordovaArguments.isCreate(args)) {
        var root = cordovaArguments.getRoot(args);

        // Create .cordova-clirc and set `cordova-root`.
        var fs = require('fs');
        fs.writeFile('.cordova-clirc', JSON.stringify({
          'cordova-root': root
        }), 'utf8');
      }
    });
};

module.exports = invoke;
