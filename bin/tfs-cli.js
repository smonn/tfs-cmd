#!/usr/bin/env node

var commandLineArgs = require("command-line-args");
var dot = require("dot-object");
var fs = require("fs");
var tfs = require("../tfs");

function listPaths() {
  var out = "\n";
  for (version in tfs.paths) {
    if (tfs.paths.hasOwnProperty(version)) {
      out += version + ".x86_32 : " + tfs.paths[version]["x86_32"] + "\n";
      out += version + ".x86_64 : " + tfs.paths[version]["x86_64"] + "\n\n";
    }
  }
  return out;
}

function VsPath(path) {
  var stats;

  if (!(this instanceof VsPath)) {
    return new VsPath(path);
  }

  if (VsPath.isPredefinedPath(path)) {
    this.value = dot.pick(path, tfs.paths);
  } else {
    this.value = path;
  }

  try {
    stats = fs.statSync(this.value);
  } catch (e) {
    throw "No such file or directory: '" + this.value + "'";
  }

  if (!stats.isFile()) {
    throw "Not a file: '" + this.value + "'";
  }
}

VsPath.isPredefinedPath = function (path) {
  return (/^vs20[0-9]{2}\.x86_(32|64)$/).test(path);
};

var cli = commandLineArgs([
  { name: "args", alias: "a", type: String, multiple: true, defaultOption: true, description: "The arguments to pass on to TF.exe" },
  { name: "path", alias: "p", type: VsPath, defaultValue: "vs2015.x86_32", description: "The full path to TF.exe or predefined values, defaults to vs2015.x86_32" },
  { name: "help", alias: "h", type: Boolean, description: "Display this help text" },
  { name: "ignore", alias: "i", type: Boolean, description: "Ignore the child process' exit status"},
  { name: "list", alias: "l", type: Boolean, description: "List pre-defined paths" }
]);

var options = cli.parse();

if (options.help) {
  console.log(cli.getUsage({
    title: "TFS command line",
    description: "Wrapper for TFS for use in npm scripts.",
    footer: "Website: [underline]{https://github.com/smonn/tfs-cli}\n\n  Examples:\n\n    tfs-cli checkout file.txt\n    tfs-cli status ."
  }));
} else if (options.list) {
  process.stdout.write(listPaths());
} else {
  var status = tfs(options.path.value, options.args);
  process.exit(options.ignore ? 0 : status);
}
