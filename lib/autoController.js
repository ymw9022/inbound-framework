var express = require('express');
var fs = require('fs');

var app = express();

var controllers = {
  maxFloor : 0
};

function walk(dir, floor, handleFile) {
  floor++;
  fs.readdir(dir, function(err, files) {
    if (err) {
      console.log('read dir error');
    } else {
      files.forEach(function(item) {
        var tmpPath = dir + '/' + item;
        fs.stat(tmpPath, function(err1, stats) {
          if (err1) {
            console.log('stat error');
          } else {
            if (stats.isDirectory()) {
              walk(tmpPath, floor, handleFile);
            } else {
              handleFile(tmpPath, floor);
            }
          }
        })
      });
    }
  });
}

walk("../routes", 0, function(path, floor) {
  controllers[floor] === undefined && controllers[floor] = [];
  controllers[floor].push(path);
  controllers.maxFloor < floor && controllers.maxFloor = floor;

//  var p = path.substr((__dirname + "/routes").length);
//  var urlPath, filePath;
//  if (new RegExp("index\\.js$").test(p)) {
//    urlPath = p.substr(0, p.length - 8);
//  } else {
//    urlPath = p.substr(0, p.length - 3);
//  }
//
//  app.use(urlPath, require("./routes" + p));
});

