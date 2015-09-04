
var spawn = require("child_process").spawnSync;

var tfs = function (path, args, opts) {
  var child = spawn(path || tfs.paths.vs2015.x86_32, args || [], opts || {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env
  });
  return child.status;
};

tfs.paths = {
  vs2015: {
    x86_32: "C:\\Program Files (x86)\\Microsoft Visual Studio 14.0\\Common7\\IDE\\TF.exe",
    x86_64: "C:\\Program Files\\Microsoft Visual Studio 14.0\\Common7\\IDE\\TF.exe"
  },
  vs2013: {
    x86_32: "C:\\Program Files (x86)\\Microsoft Visual Studio 12.0\\Common7\\IDE\\TF.exe",
    x86_64: "C:\\Program Files\\Microsoft Visual Studio 12.0\\Common7\\IDE\\TF.exe"
  },
  vs2012: {
    x86_32: "C:\\Program Files (x86)\\Microsoft Visual Studio 11.0\\Common7\\IDE\\TF.exe",
    x86_64: "C:\\Program Files\\Microsoft Visual Studio 11.0\\Common7\\IDE\\TF.exe"
  },
  vs2010: {
    x86_32: "C:\\Program Files (x86)\\Microsoft Visual Studio 10.0\\Common7\\IDE\\TF.exe",
    x86_64: "C:\\Program Files\\Microsoft Visual Studio 10.0\\Common7\\IDE\\TF.exe"
  },
  vs2008: {
    x86_32: "C:\\Program Files (x86)\\Microsoft Visual Studio 9.0\\Common7\\IDE\\TF.exe",
    x86_64: "C:\\Program Files\\Microsoft Visual Studio 9.0\\Common7\\IDE\\TF.exe"
  }
};

module.exports = tfs;
