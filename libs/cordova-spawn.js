'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var _ = require('underscore');

function cordova(args, optOptions) {
  return new Promise(function (resolve) {
    var env = _.assign({}, process.env, {
      PATH: path.join(process.cwd(), 'node_modules', '.bin') + ':' + process.env.PATH
    });
    var options = _.assign({}, {env: env, stdio: 'inherit'}, optOptions);

    spawn('cordova', args, options)
      .on('close', function (code) {
        resolve(code);
      });
  });
}

module.exports = cordova;
