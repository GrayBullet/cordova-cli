'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var _ = require('underscore');
var ProjectRootSearcher = require('./project-root-searcher');

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

function getCmd() {
  return ProjectRootSearcher.search()
    .then(function (dir) {
      return path.join(dir.bin, 'cordova')
    });
}

cordova.fromPath = function (cmd) {
  return function (args, optOptions) {
    return new Promise(function (resolve, reject) {
      var options = _.assign({}, {env: process.env, stdio: 'inherit'}, optOptions);

      try {
        spawn(cmd, args, options)
          .on('close', resolve);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
};

cordova.fromAuto = function () {
  return getCmd()
    .then(function (cmd) {
      return cordova.fromPath(cmd);
    });
};

module.exports = cordova;
