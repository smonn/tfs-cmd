
var spawn = require("child_process").spawnSync;

var tfs = function (path, args, opts) {
  var child = spawn(path || tfs.paths.vs2015, args || [], opts || {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env
  });
  return child.status;
};

tfs.paths = {
  vs2015: "%VS140COMNTOOLS%\\..\\IDE\\TF.exe",
  vs2013: "%VS120COMNTOOLS%\\..\\IDE\\TF.exe",
  vs2012: "%VS110COMNTOOLS%\\..\\IDE\\TF.exe",
  vs2010: "%VS100COMNTOOLS%\\..\\IDE\\TF.exe",
  vs2008: "%VS90COMNTOOLS%\\..\\IDE\\TF.exe",
};

module.exports = tfs;
