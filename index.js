var fs = require('fs');
var path = require('path');

readDir('./src')

function readDir(filePath) {
  fs.readdir(filePath, (err, files) => {
    files.forEach(fileName => {
      var filedir = path.join(filePath, fileName);
      fs.stat(filedir, (eror, stats) => {
        if (stats.isFile()) {
          if (filedir.indexOf('.html') > -1) {
            htmlSourceAddVersion(filedir)
          }
        } else if (stats.isDirectory()) {
          readDir(filedir)
        }
      })
    })
  })
}

function htmlSourceAddVersion(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    let timestamp = new Date().valueOf()
    let html = data.toString()
    html = html.replace(/((\.css)|(\.js))(\?.*?)?(\")/g, `$1?v=${timestamp}$5`)
    fs.writeFile(path, html, 'utf8', (err, data) => { })
  })
}
