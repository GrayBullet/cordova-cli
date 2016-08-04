'use strict';

var cordova = require('./libs/cordova-spawn');
var optionsFactory = require('./libs/options-loader');

function parseCordovaArgs(args) {
  var params = args.filter(function (a) { return a.trim().match(/^-/); })
  var options = args.filter(function (a) { return !a.trim().match(/^-/); })

  var command = params.shift();

  return {
    command: command,
    params: params,
    options: options
  };
}

var invoke = function (args) {
  var cliOptions = optionsFactory.load();

  var options = {
    cwd: cliOptions['cordova-root']
  };

  return cordova.fromAuto()
    .then(function (cmd) {
      return cmd(args, options);
    })
    .then(function (code) {
      console.log(code);
    });
};

invoke.extra = function (args) {
  var cliOptions = optionsFactory.load();

  var options = {
    cwd: cliOptions['cordova-root']
  };

  var cordovaArgs = parseCordovaArgs(args);
  if (cordovaArgs.command === 'copy-dist') {
    var platforms = cordovaArgs.params;

    if (_.includes(platforms, 'android')) {
      path.join(cliOptions['cordova-root'], 'platforms', 'android', 'build', 'outputs', 'apk');
    }
  }

  return cordova.extra(args, options);
};

module.exports = invoke;
